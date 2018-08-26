package server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import server.dao.TaskDao;
import server.model.Task;

@Service
@Transactional(readOnly = true)
public class TaskServiceImp implements TaskService {

   @Autowired
   private TaskDao taskDao;

   @Transactional
   @Override
   public long save(Task task) {
      return taskDao.save(task);
   }

   @Override
   public Task get(long id) {
      return taskDao.get(id);
   }

   @Override
   public List<Task> list() {
      return taskDao.list();
   }

   @Transactional
   @Override
   public void update(long id, Task task) {
      taskDao.update(id, task);
   }

   @Transactional
   @Override
   public void delete(long id) {
      taskDao.delete(id);
   }

}
