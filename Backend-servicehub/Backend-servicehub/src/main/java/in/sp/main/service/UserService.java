package in.sp.main.service;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import in.sp.main.dto.LoginRequestDTO;
import in.sp.main.dto.RegisterRequestDTO;
import in.sp.main.dto.UserProfileDTO;
import in.sp.main.entity.ServiceCategory;
import in.sp.main.entity.User;
import in.sp.main.repository.ServiceCategoryRepository;
import in.sp.main.repository.UserRepository;
import in.sp.main.security.JwtUtil;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ServiceCategoryRepository categoryRepo;

    // ================= REGISTER =================
    public String registerUser(RegisterRequestDTO dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            log.warn("Registration failed - Email already exists: {}", dto.getEmail());
            return "Email already registered!";
        }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());

        // ✅ Assign category if technician
        if ("TECHNICIAN".equalsIgnoreCase(dto.getRole())) {

            if (dto.getCategoryId() == null) {
                throw new RuntimeException("Category is required for technician");
            }

            ServiceCategory category = categoryRepo.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            user.setCategory(category);
        }

        userRepository.save(user);

        log.info("User registered successfully: {}", dto.getEmail());
        return "User Registered Successfully!";
    }

    // ================= LOGIN =================
    public String loginUser(LoginRequestDTO dto) {

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> {
                    log.error("Login failed - User not found: {}", dto.getEmail());
                    return new RuntimeException("User not found");
                });

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            log.error("Login failed - Invalid password for: {}", dto.getEmail());
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        log.info("User logged in successfully: {}", dto.getEmail());
        return token;
    }

    // ================= GET PROFILE =================
    public UserProfileDTO getUserProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.error("Profile fetch failed - User not found: {}", email);
                    return new RuntimeException("User not found");
                });

        return mapToDTO(user);
    }

    // ================= UPDATE PROFILE =================
    public UserProfileDTO updateProfile(String email,
                                        String name,
                                        String mobileNumber,
                                        MultipartFile profileImage) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.error("Profile update failed - User not found: {}", email);
                    return new RuntimeException("User not found");
                });

        // ✅ Update basic fields
        user.setName(name);
        user.setMobileNumber(mobileNumber);

        // ✅ Upload image (Cloudinary)
        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                Map<?, ?> uploadResult = cloudinary.uploader().upload(
                        profileImage.getBytes(),
                        ObjectUtils.asMap("folder", "servicehub/profile")
                );

                String imageUrl = uploadResult.get("secure_url").toString();
                user.setProfileImageUrl(imageUrl);

                log.info("Profile image uploaded for user: {}", email);

            } catch (IOException e) {
                log.error("Image upload failed for user: {}", email, e);
                throw new RuntimeException("Image upload failed");
            }
        }

        User updatedUser = userRepository.save(user);

        log.info("Profile updated successfully: {}", email);

        return mapToDTO(updatedUser);
    }

    // ================= HELPER METHOD =================
    private UserProfileDTO mapToDTO(User user) {

        String categoryName = Optional.ofNullable(user.getCategory())
                .map(ServiceCategory::getCategoryName)
                .orElse(null);

        return new UserProfileDTO(
                user.getName(),
                user.getEmail(),
                user.getRole(),
                categoryName,
                user.getMobileNumber(),
                user.getProfileImageUrl()
        );
    }
}