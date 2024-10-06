package PI.dsi32.ToDoAppBack.ServicesImpl;

import java.util.List;
// Importation de la classe List
import org.springframework.beans.factory.annotation.Autowired;
// Annotation pour l'injection de dépendance
import org.springframework.stereotype.Service;
// Annotation pour définir une classe de service
import PI.dsi32.ToDoAppBack.Entities.Task;
// Importation de la classe Task
import PI.dsi32.ToDoAppBack.Repository.EntityRepository;
// Importation de l'interface de dépôt
import PI.dsi32.ToDoAppBack.Services.ITaskService;
// Importation de l'interface de service
/**
 * Classe d'implémentation de l'interface ITaskService.
 * Fournit des méthodes pour interagir avec les entités Task via le dépôt EntityRepository.
 */
@Service
public class TaskServiceImpl implements ITaskService {
	
	@Autowired
	private EntityRepository entityRepo;
// Dépôt pour gérer les opérations sur les tâches
	@Override
	// Cette méthode récupère toutes les tâches à partir du dépôt entityRepo et les retourne sous forme de liste.
	public List<Task> getAllTasks() {
		// TODO Auto-generated method stub
		return entityRepo.findAll();
	}

	@Override
	// Cette méthode prend un objet Task en entrée, l'ajoute au dépôt entityRepo, et retourne l'objet Task après l'ajout.
	public Task addTask(Task task) {
		// TODO Auto-generated method stub
		return entityRepo.save(task);
	}


}
//La classe TaskServiceImpl encapsule la logique métier liée à la gestion des tâches, en fournissant des méthodes pour interagir avec la base de données via le dépôt.
