package PI.dsi32.ToDoAppBack.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
// Importation de l'interface JpaRepository
import org.springframework.stereotype.Repository;
// Importation de l'annotation Repository
import PI.dsi32.ToDoAppBack.Entities.Task;
// Importation de la classe Task
@Repository
public interface EntityRepository extends JpaRepository<Task, Integer> {

}
/**
 * Interface représentant le dépôt (repository) pour l'entité Task.
 * Elle étend JpaRepository pour fournir des opérations CRUD (Create, Read, Update, Delete)

 */
