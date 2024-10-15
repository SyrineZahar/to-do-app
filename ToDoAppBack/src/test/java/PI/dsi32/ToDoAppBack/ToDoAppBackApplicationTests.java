package PI.dsi32.ToDoAppBack; // Déclaration du package pour les tests de l'application.

import org.junit.jupiter.api.Test; // Importation de l'annotation de test JUnit.
import org.springframework.boot.test.context.SpringBootTest; // Importation de l'annotation pour les tests Spring Boot.

@SpringBootTest // Annotation qui indique que c'est un test Spring Boot et charge le contexte de l'application.
class ToDoAppBackApplicationTests { // Classe de test pour l'application ToDoAppBack.

    @Test // Annotation qui indique que cette méthode est un test.
    void contextLoads() { // Méthode de test qui vérifie le chargement du contexte de l'application.
        // Cette méthode est vide car elle ne nécessite aucune assertion. 
        // Si le contexte ne se charge pas correctement, le test échouera automatiquement.
    }

}
