package in.sp.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class BackendServicehubApplication {

	public static void main(String[] args) {
		 Dotenv dotenv = Dotenv.load();

	        System.setProperty("DB_URL", dotenv.get("DB_URL"));
	        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
	        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
	        System.setProperty("SERVER_PORT", dotenv.get("SERVER_PORT"));
	        System.setProperty("MAIL_USERNAME", dotenv.get("MAIL_USERNAME"));
	        System.setProperty("MAIL_PASSWORD", dotenv.get("MAIL_PASSWORD"));
		SpringApplication.run(BackendServicehubApplication.class, args);
	}
}
