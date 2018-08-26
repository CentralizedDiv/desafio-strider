package server.service;

import java.util.List;

import server.model.Task;

public interface TaskService {

   long save(Task task);
   Task get(long id);
   List<Task> list();
   void update(long id, String imageRaw, Task task);
   void delete(long id);
}
