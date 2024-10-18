package PI.dsi32.ToDoAppBack.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import PI.dsi32.ToDoAppBack.Entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
