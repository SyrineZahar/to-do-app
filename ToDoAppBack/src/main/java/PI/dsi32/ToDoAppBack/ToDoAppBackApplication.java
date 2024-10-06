package PI.dsi32.ToDoAppBack;

import org.springframework.boot.SpringApplication;
// Importation de la classe SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication;
// Importation de l'annotation SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
// Importation de la configuration de sécurité
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})

public class ToDoAppBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToDoAppBackApplication.class, args);
	}
	

}
/**
 Classe principale de l'application ToDoAppBack.
Cette classe contient la méthode main qui sert de point d'entrée à l'application Spring Boot.
 */
