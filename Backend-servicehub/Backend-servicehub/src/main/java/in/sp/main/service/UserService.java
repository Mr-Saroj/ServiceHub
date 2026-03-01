package in.sp.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.sp.main.dto.RegisterRequestDTO;
import in.sp.main.entity.User;
import in.sp.main.repository.UserRepository;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(RegisterRequestDTO dto) {

        // Check if email already exists
        if (userRepository.existsByEmail(dto.getEmail())) {
            return "Email already registered!";
        }

        // Create new user
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword()); // (Plain text for now)
        user.setRole(dto.getRole());

        userRepository.save(user);

        return "User Registered Successfully!";
    }
}
