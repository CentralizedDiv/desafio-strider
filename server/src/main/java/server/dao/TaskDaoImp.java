package server.dao;

import java.util.List;
import java.util.Base64;
import java.io.*;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import server.model.Task;

@Repository
public class TaskDaoImp implements TaskDao {

   @Autowired
   private SessionFactory sessionFactory;

   @Override
   public long save(Task task) {
      sessionFactory.getCurrentSession().save(task);
      return task.getId();
   }

   @Override
   public Task get(long id) {
      return sessionFactory.getCurrentSession().get(Task.class, id);
   }

   @Override
   public List<Task> list() {
      Session session = sessionFactory.getCurrentSession();
      CriteriaBuilder cb = session.getCriteriaBuilder();
      CriteriaQuery<Task> cq = cb.createQuery(Task.class);
      Root<Task> root = cq.from(Task.class);
      cq.select(root);
      Query<Task> query = session.createQuery(cq);
      return query.getResultList();
   }

   @Override
   public void update(long id, String imageRaw, Task task) {
      Session session = sessionFactory.getCurrentSession();
      Task task2 = session.byId(Task.class).load(id);
      task2.setStatus(task.getStatus());
      task2.setDescription(task.getDescription());
      System.err.println(task2.getStatus());
      byte[] data = Base64.getEncoder().encode(imageRaw.getBytes());
      String url = "src/images/completeImage" + id + ".png";
      try (OutputStream stream = new FileOutputStream(url)) {
          stream.write(data);
          stream.close();
          task2.setUrl(url);
      } catch (IOException e) {
          System.err.println("Caught IOException: " + e.getMessage());
      }
      session.flush();
   }

   @Override
   public void delete(long id) {
      Session session = sessionFactory.getCurrentSession();
      Task task = session.byId(Task.class).load(id);
      session.delete(task);
   }

}
