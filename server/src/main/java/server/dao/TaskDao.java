package server.dao;

import java.util.List;

import server.model.Task;

public interface TaskDao {

  long save(Task task);

  Task get(long id);

  List<Task> list();

  List<Task> listPending();

  void update(long id, Task task);

  void delete(long id);
}
