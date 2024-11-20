package PI.dsi32.ToDoAppBack.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository; // Importation de l'interface JpaRepository.
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository; // Importation de l'annotation Repository.

import PI.dsi32.ToDoAppBack.Entities.GroupEntity; // Importation de l'entité Group.
import jakarta.transaction.Transactional;

@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, Integer> {

	@Query(value = "SELECT * FROM group_entity WHERE id IN (SELECT group_id FROM user_groups WHERE user_id = :userId)", nativeQuery = true)
    List<GroupEntity> findGroupsByUserId(@Param("userId") Integer userId);
	
	Optional<GroupEntity> findById(Integer groupId);
}
