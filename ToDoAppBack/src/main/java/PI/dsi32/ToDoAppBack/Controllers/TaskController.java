package PI.dsi32.ToDoAppBack.Controllers; // Déclaration du package pour le contrôleur.

import java.time.LocalDateTime; // Importation de la classe pour gérer les dates et heures.
import java.util.List; // Importation de la classe List pour les collections.

import org.springframework.beans.factory.annotation.Autowired; // Annotation pour l'injection de dépendances.
import org.springframework.http.HttpStatus; // Importation des statuts HTTP.
import org.springframework.http.ResponseEntity; // Importation de la classe ResponseEntity pour les réponses HTTP.
import org.springframework.web.bind.annotation.CrossOrigin; // Annotation pour gérer les politiques CORS.
import org.springframework.web.bind.annotation.GetMapping; // Annotation pour les requêtes GET.
import org.springframework.web.bind.annotation.PostMapping; // Annotation pour les requêtes POST.
import org.springframework.web.bind.annotation.PutMapping; // Annotation pour les requêtes PUT.
import org.springframework.web.bind.annotation.RequestBody; // Annotation pour indiquer que le corps de la requête contient des données.
import org.springframework.web.bind.annotation.RequestMapping; // Annotation pour définir le chemin de la requête.
import org.springframework.web.bind.annotation.RestController; // Annotation pour indiquer que c'est un contrôleur REST.

import PI.dsi32.ToDoAppBack.Entities.Task; // Importation de l'entité Task.
import PI.dsi32.ToDoAppBack.ServicesImpl.TaskServiceImpl; // Importation du service des tâches.

@CrossOrigin(origins = "*") // Permet les requêtes cross-origin depuis n'importe quelle origine.
@RestController // Indique que ce contrôleur gère des requêtes REST.
@RequestMapping("/tasks") // Définit le chemin de base pour toutes les méthodes de ce contrôleur.
public class TaskController {
	
	@Autowired // Injection du service des tâches.
    private TaskServiceImpl taskService;
	
    @GetMapping() // Gère les requêtes GET sur le chemin /tasks.
    public ResponseEntity<List<Task>> getAllTasks() {
        try {
            List<Task> tasks = taskService.getAllTasks(); // Récupère toutes les tâches via le service.
            return new ResponseEntity<>(tasks, HttpStatus.OK); // Retourne les tâches avec un statut HTTP 200.
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Retourne un statut 500 en cas d'erreur.
        }
    }
	
    @PostMapping() // Gère les requêtes POST sur le chemin /tasks.
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        try {
        	task.setCreatedAt(LocalDateTime.now()); // Définit la date de création.
            Task newTask = taskService.addTask(task); // Ajoute la tâche via le service.
            return new ResponseEntity<>(newTask, HttpStatus.CREATED); // Retourne la nouvelle tâche avec un statut HTTP 201.
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Retourne un statut 500 en cas d'erreur.
        }
    }
    
    @PutMapping("/{id}") // Gère les requêtes PUT sur le chemin /tasks/{id}.
    public ResponseEntity<Task> updateTask(@RequestBody Task task) {
        try {
        	task.setUpdatedAt(LocalDateTime.now()); // Définit la date de mise à jour.
            Task updatedTask = taskService.editTask(task); // Met à jour la tâche via le service.
            return new ResponseEntity<>(updatedTask, HttpStatus.OK); // Retourne la tâche mise à jour avec un statut HTTP 200.
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Retourne un statut 500 en cas d'erreur.
        }
    }
}
