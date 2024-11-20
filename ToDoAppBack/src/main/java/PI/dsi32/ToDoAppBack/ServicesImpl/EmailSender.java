package PI.dsi32.ToDoAppBack.ServicesImpl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import PI.dsi32.ToDoAppBack.Entities.User;

@Service
public class EmailSender {

    //utilisation du JavaMailSender pour l'envoi des mails
    private final JavaMailSender mailSender; 

    //creation de l'instance mail sender
    public EmailSender(JavaMailSender mailSender) {
		super();
		this.mailSender = mailSender;
	}

    //Envoi de l'email à un utilisateur d'une façon asynchrone
    @Async
	public void sendSimpleEmail(User user, String subject) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(user.getEmail());
        message.setSubject("Work Together Application");
        message.setText(subject);
        message.setFrom("hello@demomailtrap.com");

        try {
             mailSender.send(message);
            System.out.println("Email sent successfully");
        } catch (Exception e) {
            System.out.println("Failed to send email: " + e.getMessage());
        }
    }
}
