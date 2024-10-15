package PI.dsi32.ToDoAppBack.Repository; // Déclaration du package pour les dépôts.

import org.springframework.data.jpa.repository.JpaRepository; // Importation de l'interface JpaRepository.
import org.springframework.stereotype.Repository; // Importation de l'annotation Repository.

import PI.dsi32.ToDoAppBack.Entities.Task; // Importation de l'entité Task.

@Repository // Annotation indiquant que cette interface est un dépôt Spring.
public interface TaskRepository extends JpaRepository<Task, Integer> { // Interface étendant JpaRepository.

    // L'interface hérite des méthodes CRUD de JpaRepository pour l'entité Task avec Integer comme type d'ID.
}
