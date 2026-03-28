package in.sp.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendServicehubApplication {

    public static void main(String[] args) {
        // Remove Dotenv entirely — Render environment variables will be used
        SpringApplication.run(BackendServicehubApplication.class, args);
    }
}