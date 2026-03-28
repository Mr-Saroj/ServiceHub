package in.sp.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import in.sp.main.dto.UserProfileDTO;
import in.sp.main.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class UserController {

    @Autowired
    private UserService userService;

    // ✅ GET PROFILE
    @GetMapping("/profile")
    public UserProfileDTO getProfile(Authentication authentication) {

        String email = authentication.getName();

        return userService.getUserProfile(email);
    }

    // ✅ UPDATE PROFILE (NEW)
    @PutMapping("/profile")
    public UserProfileDTO updateProfile(
            Authentication authentication,
            @RequestParam("name") String name,
            @RequestParam("mobileNumber") String mobileNumber,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage
    ) {

        String email = authentication.getName();

        return userService.updateProfile(email, name, mobileNumber, profileImage);
    }
}