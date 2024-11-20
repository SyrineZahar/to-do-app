package PI.dsi32.ToDoAppBack;

import org.springframework.boot.SpringApplication; // Importation de la classe SpringApplication pour démarrer l'application.
import org.springframework.boot.autoconfigure.SpringBootApplication; // Importation de l'annotation SpringBootApplication.
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration; // Importation pour exclure la configuration de sécurité.

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class ToDoAppBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(ToDoAppBackApplication.class, args);
    }
}
