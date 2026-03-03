package in.sp.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.sp.main.dto.AuthResponseDTO;
import in.sp.main.dto.LoginRequestDTO;
import in.sp.main.dto.LoginResponseDTO;
import in.sp.main.dto.RegisterRequestDTO;
import in.sp.main.entity.User;
import in.sp.main.repository.UserRepository;
import in.sp.main.security.JwtUtil;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ================= REGISTER =================
    public String registerUser(RegisterRequestDTO dto) {

        // Check if email already exists
        if (userRepository.existsByEmail(dto.getEmail())) {
            return "Email already registered!";
        }

        // Create new user
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());

        userRepository.save(user);

        return "User Registered Successfully!";
    }

    // ================= LOGIN =================
    public String loginUser(LoginRequestDTO dto) {

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // ✅ Return JWT token only
        return jwtUtil.generateToken(user.getEmail(), user.getRole());
    }
}