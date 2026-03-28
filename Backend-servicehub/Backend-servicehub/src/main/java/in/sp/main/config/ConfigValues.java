package in.sp.main.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ConfigValues {

    @Value("${DB_URL}")
    private String dbUrl;

    @Value("${JWT_SECRET}")
    private String jwtSecret;

    // getters
    public String getDbUrl() { return dbUrl; }
    public String getJwtSecret() { return jwtSecret; }
}
