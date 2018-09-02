package server.controller;

import java.util.List;
import java.io.*;
import java.nio.file.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.IOUtils;
import org.springframework.web.context.support.ServletContextResource;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.Base64;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import server.model.Task;
import server.service.TaskService;

@RestController
public class TaskController {

  @Autowired
  private TaskService taskService;
  private ServletContext servletContext;

  /*---Add new task---*/
  @PostMapping("/task")
  public ResponseEntity<?> save(@RequestBody Task task) {
    long id = taskService.save(task);
    return ResponseEntity.ok().body("New Task has been saved with ID:" + id);
  }

  /*---Get a task by id---*/
  @GetMapping("/task/{id}")
  public ResponseEntity<Task> get(@PathVariable("id") long id) throws IOException {
    Task task = taskService.get(id);
    getBase64(task);
    return ResponseEntity.ok().body(task);
  }

  /*---get all tasks---*/
  @GetMapping("/task")
  public ResponseEntity<List<Task>> list() throws IOException {
    List<Task> tasks = taskService.list();
    for (Task task : tasks) {
      getBase64(task);
    }
    return ResponseEntity.ok().body(tasks);
  }

  /*---Update a task by id---*/
  @PutMapping("/task/{id}")
  public ResponseEntity<?> update(@PathVariable("id") long id, @RequestBody Task task) {
    taskService.update(id, task);
    return ResponseEntity.ok().body("Task has been updated successfully.");
  }

  /*---Delete a task by id---*/
  @DeleteMapping("/task/{id}")
  public ResponseEntity<?> delete(@PathVariable("id") long id) throws IOException {
    Task task = taskService.get(id);
    if (task.url != null) {
      deleteImage(task.url);
    }
    taskService.delete(id);
    return ResponseEntity.ok().body("Task has been deleted successfully.");
  }

  @PostMapping("/uploadImage/{id}")
  public ResponseEntity<?> uploadFile(@PathVariable("id") long taskId, @RequestParam("file") MultipartFile file)
      throws IOException {
    byte[] bytes = file.getBytes();
    String name = "./src/images/task_" + taskId + file.getOriginalFilename();
    Path path = Paths.get(name);
    Files.write(path, bytes);
    Task task = taskService.get(taskId);
    task.setUrl(path.toAbsolutePath().toString());
    taskService.update(taskId, task);

    return ResponseEntity.ok().body("Image has been uploaded.");
  }

  public void getBase64(Task task) throws IOException {
    if (task.url != null) {
      File image = Paths.get(task.getUrl()).toFile();
      byte[] bytes = Files.readAllBytes(image.toPath());
      task.url = "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(bytes);
    }
  }

  public void deleteImage(String url) throws IOException {
    File image = Paths.get(url).toFile();
    image.delete();
  }
}