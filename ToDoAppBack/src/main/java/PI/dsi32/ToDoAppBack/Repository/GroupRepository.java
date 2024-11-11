package PI.dsi32.ToDoAppBack.Repository; // Déclaration du package pour les dépôts.

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository; // Importation de l'interface JpaRepository.
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository; // Importation de l'annotation Repository.

import PI.dsi32.ToDoAppBack.Entities.GroupEntity; // Importation de l'entité Group.
import jakarta.transaction.Transactional;

@Repository // Annotation indiquant que cette interface est un dépôt Spring.
public interface GroupRepository extends JpaRepository<GroupEntity, Integer> { // Interface étendant JpaRepository.

    // L'interface hérite des méthodes CRUD de JpaRepository pour l'entité Group avec Integer comme type d'ID.
	@Query(value = "SELECT * FROM group_entity WHERE id IN (SELECT group_id FROM user_groups WHERE user_id = :userId)", nativeQuery = true)
    List<GroupEntity> findGroupsByUserId(@Param("userId") Integer userId);
	
	@Modifying
    @Transactional
    @Query(value = "INSERT INTO group_entity (background_image, profile_picture, nom, description) " +
                   "VALUES (:backgroundImage, :profilePicture, :nom, :description)", nativeQuery = true)
    void addGroupWithSQL(
            @Param("backgroundImage") String backgroundImage,
            @Param("profilePicture") String profilePicture,
            @Param("nom") String nom,
            @Param("description") String description
    );
	
	Optional<GroupEntity> findById(Integer groupId);
}
