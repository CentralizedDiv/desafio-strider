package server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import server.model.Task;
import server.service.TaskService;

@RestController
public class TaskController {

   @Autowired
   private TaskService taskService;

   /*---Add new task---*/
   @PostMapping("/task")
   public ResponseEntity<?> save(@RequestBody Task task) {
      long id = taskService.save(task);
      return ResponseEntity.ok().body("New Task has been saved with ID:" + id);
   }

   /*---Get a task by id---*/
   @GetMapping("/task/{id}")
   public ResponseEntity<Task> get(@PathVariable("id") long id) {
      Task task = taskService.get(id);
      return ResponseEntity.ok().body(task);
   }

   /*---get all tasks---*/
   @GetMapping("/task")
   public ResponseEntity<List<Task>> list() {
      List<Task> tasks = taskService.list();
      return ResponseEntity.ok().body(tasks);
   }

   /*---Update a task by id---*/
   @PutMapping("/task/{id}")
   public ResponseEntity<?> update(@PathVariable("id") long id, @RequestParam(value="imageRaw", defaultValue="") String imageRaw, @RequestBody Task task) {
      taskService.update(id, imageRaw, task);
      return ResponseEntity.ok().body("Task has been updated successfully.");
   }

   /*---Delete a task by id---*/
   @DeleteMapping("/task/{id}")
   public ResponseEntity<?> delete(@PathVariable("id") long id) {
      taskService.delete(id);
      return ResponseEntity.ok().body("Task has been deleted successfully.");
   }
}