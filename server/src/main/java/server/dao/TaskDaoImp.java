package server.dao;

import java.util.List;

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
   public void update(long id, Task task) {
      Session session = sessionFactory.getCurrentSession();
      Task task2 = session.byId(Task.class).load(id);
      if(task.getStatus() != null)
        task2.setStatus(task.getStatus());
      if(task.getDescription() != null)
        task2.setDescription(task.getDescription());
      if(task.getUrl() != null)
        task2.setUrl(task.getUrl());
      session.flush();
   }

   @Override
   public void delete(long id) {
      Session session = sessionFactory.getCurrentSession();
      Task task = session.byId(Task.class).load(id);
      session.delete(task);
   }

}
