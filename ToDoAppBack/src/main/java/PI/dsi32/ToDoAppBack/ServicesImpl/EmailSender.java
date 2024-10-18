package PI.dsi32.ToDoAppBack.ServicesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import PI.dsi32.ToDoAppBack.Entities.User;

@Service
public class EmailSender {

    private final JavaMailSender mailSender; 

    public EmailSender(JavaMailSender mailSender) {
		super();
		this.mailSender = mailSender;
	}

    @Async
	public void sendSimpleEmail() { // Remove the static keyword
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("cyrine.zahaar@gmail.com");
        message.setSubject("Test Email");
        message.setText("Hello, this is a test email!");
        message.setFrom("hello@demomailtrap.com");

        try {
             mailSender.send(message);
            System.out.println("Email sent successfully");
        } catch (Exception e) {
            System.out.println("Failed to send email: " + e.getMessage());
        }
    }
}
