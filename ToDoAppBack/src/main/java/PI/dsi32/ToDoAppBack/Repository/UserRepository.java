package PI.dsi32.ToDoAppBack.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import PI.dsi32.ToDoAppBack.Entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	User findByEmail(String email);
	
	@Query(value = "SELECT * FROM user WHERE id IN (SELECT user_id FROM task WHERE id = :taskId)", nativeQuery = true)
	Optional<User> findUserByTaskId(@Param("taskId") Integer taskId);


	@Query(value = "SELECT * FROM user WHERE id IN (SELECT user_id FROM user_groups WHERE group_id = :groupId)", nativeQuery = true)
    List<User> findUsersByGroupId(@Param("groupId") Integer groupId);
}
