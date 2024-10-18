/**
 * TaskTest est une classe de test unitaire pour l'entité Task dans l'application ToDo.
 * Cette classe vérifie la fonctionnalité des méthodes de la classe Task.
 * Elle utilise JUnit 5 comme framework de test.
 */

package PI.dsi32.ToDoAppBack.Entities;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import PI.dsi32.ToDoAppBack.enums.TaskStatus;

public class TaskTest {

    private Task task; // Instance de Task à tester
    private LocalDateTime now; // Date et heure actuelles pour les tests

    /**
     * Prépare l'environnement de test avant chaque test.
     * Initialise une instance de Task avec des valeurs de test.
     */
    @BeforeEach
    public void setUp() {
        now = LocalDateTime.now();
        task = new Task(1, "Test Title", "Test Description", TaskStatus.INPROGRESS, now, now, now, false, null, null);
    }

    /**
     * Teste la méthode getId de la classe Task.
     * Vérifie que l'ID est correctement défini.
     */
    @Test
    public void testGetId() {
        assertEquals(1, task.getId());
    }

    /**
     * Teste la méthode setId de la classe Task.
     * Vérifie que l'ID peut être mis à jour correctement.
     */
    @Test
    public void testSetId() {
        task.setId(2);
        assertEquals(2, task.getId());
    }

    /**
     * Teste la méthode getTitle de la classe Task.
     * Vérifie que le titre est correctement défini.
     */
    @Test
    public void testGetTitle() {
        assertEquals("Test Title", task.getTitle());
    }

    /**
     * Teste la méthode setTitle de la classe Task.
     * Vérifie que le titre peut être mis à jour correctement.
     */
    @Test
    public void testSetTitle() {
        task.setTitle("New Title");
        assertEquals("New Title", task.getTitle());
    }

    /**
     * Teste la méthode getDescription de la classe Task.
     * Vérifie que la description est correctement définie.
     */
    @Test
    public void testGetDescription() {
        assertEquals("Test Description", task.getDescription());
    }

    /**
     * Teste la méthode setDescription de la classe Task.
     * Vérifie que la description peut être mise à jour correctement.
     */
    @Test
    public void testSetDescription() {
        task.setDescription("New Description");
        assertEquals("New Description", task.getDescription());
    }

    /**
     * Teste la méthode getStatus de la classe Task.
     * Vérifie que le statut est correctement défini.
     */
    @Test
    public void testGetStatus() {
        assertEquals(TaskStatus.INPROGRESS, task.getStatus());
    }

    /**
     * Teste la méthode setStatus de la classe Task.
     * Vérifie que le statut peut être mis à jour correctement.
     */
    @Test
    public void testSetStatus() {
        task.setStatus(TaskStatus.DONE);
        assertEquals(TaskStatus.DONE, task.getStatus());
    }

    /**
     * Teste la méthode getDeadline de la classe Task.
     * Vérifie que la date limite est correctement définie.
     */
    @Test
    public void testGetDeadline() {
        assertEquals(now, task.getDeadline());
    }

    /**
     * Teste la méthode setDeadline de la classe Task.
     * Vérifie que la date limite peut être mise à jour correctement.
     */
    @Test
    public void testSetDeadline() {
        LocalDateTime newDeadline = now.plusDays(1);
        task.setDeadline(newDeadline);
        assertEquals(newDeadline, task.getDeadline());
    }

    /**
     * Teste la méthode getCreatedAt de la classe Task.
     * Vérifie que la date de création est correctement définie.
     */
    @Test
    public void testGetCreatedAt() {
        assertEquals(now, task.getCreatedAt());
    }

    /**
     * Teste la méthode setCreatedAt de la classe Task.
     * Vérifie que la date de création peut être mise à jour correctement.
     */
    @Test
    public void testSetCreatedAt() {
        LocalDateTime newCreatedAt = now.plusDays(1);
        task.setCreatedAt(newCreatedAt);
        assertEquals(newCreatedAt, task.getCreatedAt());
    }

    /**
     * Teste la méthode getUpdatedAt de la classe Task.
     * Vérifie que la date de mise à jour est correctement définie.
     */
    @Test
    public void testGetUpdatedAt() {
        assertEquals(now, task.getUpdatedAt());
    }

    /**
     * Teste la méthode setUpdatedAt de la classe Task.
     * Vérifie que la date de mise à jour peut être mise à jour correctement.
     */
    @Test
    public void testSetUpdatedAt() {
        LocalDateTime newUpdatedAt = now.plusDays(1);
        task.setUpdatedAt(newUpdatedAt);
        assertEquals(newUpdatedAt, task.getUpdatedAt());
    }

    /**
     * Teste la méthode isDestactive de la classe Task.
     * Vérifie que la tâche n'est pas marquée comme désactivée par défaut.
     */
    @Test
    public void testIsDestactive() {
        assertFalse(task.isDestactive());
    }

    /**
     * Teste la méthode setDestactive de la classe Task.
     * Vérifie que la tâche peut être marquée comme désactivée.
     */
    @Test
    public void testSetDestactive() {
        task.setDestactive(true);
        assertTrue(task.isDestactive());
    }
}
