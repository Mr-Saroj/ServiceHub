package in.sp.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.sp.main.dto.AuthResponseDTO;
import in.sp.main.dto.LoginRequestDTO;
import in.sp.main.dto.LoginResponseDTO;
import in.sp.main.dto.RegisterRequestDTO;
import in.sp.main.entity.ServiceCategory;
import in.sp.main.entity.User;
import in.sp.main.repository.ServiceCategoryRepository;
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
    @Autowired
    private ServiceCategoryRepository categoryRepo;

    public String registerUser(RegisterRequestDTO dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            return "Email already registered!";
        }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());

        // ✅ If technician, assign category
        if ("TECHNICIAN".equals(dto.getRole())) {

            ServiceCategory category = categoryRepo.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            user.setCategory(category);
        }

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
 // ================= GET USER BY EMAIL =================
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}