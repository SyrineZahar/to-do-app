package PI.dsi32.ToDoAppBack.Controllers;
import java.time.LocalDateTime;
// importation de la classe LocalDateTime
import java.util.List;
// Importation de la classe List
import org.springframework.beans.factory.annotation.Autowired;
// Annotation pour l'injection de dépendance
import org.springframework.http.HttpStatus;
// importation de la classe HttpStatus
import org.springframework.http.ResponseEntity;
// Importation de la classe ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin;
// Importation pour la gestion des CORS
import org.springframework.web.bind.annotation.GetMapping;
// Importation de l'annotation GetMapping
import org.springframework.web.bind.annotation.PostMapping;
// Importation de l'annotation PostMapping
import org.springframework.web.bind.annotation.RequestBody;
// Importation pour le corps de la requête
import org.springframework.web.bind.annotation.RequestMapping;
// Importation de l'annotation RequestMapping
import org.springframework.web.bind.annotation.RestController;
// Importation de l'annotation RestController
import PI.dsi32.ToDoAppBack.Entities.Task;
// Importation de la classe Task
import PI.dsi32.ToDoAppBack.ServicesImpl.TaskServiceImpl;
// Importation de la classe TaskServiceImpl
//Contrôleur REST pour gérer les opérations liées aux tâches.
@CrossOrigin(origins = "*")
// Permet les requêtes CORS depuis n'importe quelle origine
@RestController
// Marque le contrôleur comme un contrôleur REST
@RequestMapping("/tasks")
// Définit l'URI de base pour les requêtes
public class TaskController {
	
	@Autowired
    private TaskServiceImpl taskService;
    // Injection de dépendance pour l'implémentation de la service de tâche
	
    @GetMapping()
    public ResponseEntity<List<Task>> getAllTasks() {
        try {
            List<Task> tasks = taskService.getAllTasks();
            // Récupère la liste des tâches
            return new ResponseEntity<>(tasks, HttpStatus.OK);
            // Retourne la liste des tâches avec un statut HTTP OK
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            // Retourne un statut HTTP Erreur interne du serveur si  une erreur 500
        }
    }
	
    @PostMapping()// Mapping pour les requêtes POST
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        try {
        	task.setCreatedAt(LocalDateTime.now());
            // Définit la date de création
            Task newTask = taskService.addTask(task);
            // Ajoute la tâche
            return new ResponseEntity<>(newTask, HttpStatus.CREATED);
            // Retourne la tâche ajoutée avec un statut HTTP Créé
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            // Retourne un statut HTTP Erreur interne du serveur si  une erreur 500
        }
    }

	
}
