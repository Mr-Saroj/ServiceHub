package in.sp.main.service;

import java.util.Map;

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

        return jwtUtil.generateToken(user.getEmail(), user.getRole());
    }

    // ================= GET PROFILE =================
    public UserProfileDTO getUserProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String categoryName = null;

        if (user.getCategory() != null) {
            categoryName = user.getCategory().getCategoryName();
        }

        return new UserProfileDTO(
                user.getName(),
                user.getEmail(),
                user.getRole(),
                categoryName,
                user.getMobileNumber(),
                user.getProfileImageUrl()
        );
    }

    // ================= UPDATE PROFILE =================
    public UserProfileDTO updateProfile(String email,
                                        String name,
                                        String mobileNumber,
                                        MultipartFile profileImage) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ update fields
        user.setName(name);
        user.setMobileNumber(mobileNumber);

        // ✅ Cloudinary upload
        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                Map uploadResult = cloudinary.uploader().upload(
                        profileImage.getBytes(),
                        ObjectUtils.emptyMap()
                );

                String imageUrl = uploadResult.get("secure_url").toString();
                user.setProfileImageUrl(imageUrl);

            } catch (Exception e) {
                throw new RuntimeException("Image upload failed");
            }
        }

        User updatedUser = userRepository.save(user);

        String categoryName = null;
        if (updatedUser.getCategory() != null) {
            categoryName = updatedUser.getCategory().getCategoryName();
        }

        // ✅ return DTO (IMPORTANT)
        return new UserProfileDTO(
                updatedUser.getName(),
                updatedUser.getEmail(),
                updatedUser.getRole(),
                categoryName,
                updatedUser.getMobileNumber(),
                updatedUser.getProfileImageUrl()
        );
    }
}