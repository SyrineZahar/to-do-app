package PI.dsi32.ToDoAppBack; // Déclaration du package pour l'application.

import org.springframework.boot.SpringApplication; // Importation de la classe SpringApplication pour démarrer l'application.
import org.springframework.boot.autoconfigure.SpringBootApplication; // Importation de l'annotation SpringBootApplication.
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration; // Importation pour exclure la configuration de sécurité.

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class}) // Annotation indiquant que c'est une application Spring Boot, en excluant la sécurité.
public class ToDoAppBackApplication { // Classe principale de l'application.

    public static void main(String[] args) { // Méthode principale qui est le point d'entrée de l'application.
        SpringApplication.run(ToDoAppBackApplication.class, args); // Démarre l'application Spring Boot.
    }
}
