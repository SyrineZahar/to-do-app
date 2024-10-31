package PI.dsi32.ToDoAppBack.Repository; // Déclaration du package pour les dépôts.

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository; // Importation de l'interface JpaRepository.
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository; // Importation de l'annotation Repository.

import PI.dsi32.ToDoAppBack.Entities.GroupEntity; // Importation de l'entité Group.

@Repository // Annotation indiquant que cette interface est un dépôt Spring.
public interface GroupRepository extends JpaRepository<GroupEntity, Integer> { // Interface étendant JpaRepository.

    // L'interface hérite des méthodes CRUD de JpaRepository pour l'entité Group avec Integer comme type d'ID.
	@Query(value = "SELECT * FROM group_entity WHERE id IN (SELECT group_id FROM user_groups WHERE user_id = :userId)", nativeQuery = true)
    List<GroupEntity> findGroupsByUserId(@Param("userId") Integer userId);
}
