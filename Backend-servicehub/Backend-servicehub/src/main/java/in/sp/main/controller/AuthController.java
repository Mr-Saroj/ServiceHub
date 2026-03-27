package in.sp.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


import in.sp.main.dto.LoginRequestDTO;

import in.sp.main.dto.RegisterRequestDTO;
import in.sp.main.dto.UserProfileDTO;
import in.sp.main.entity.User;
import in.sp.main.service.UserService;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestDTO dto) {

        String response = userService.registerUser(dto);

        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO dto) {
        String token = userService.loginUser(dto);
        return ResponseEntity.ok(token);   // ✅ return token only
    }
   @GetMapping("/profile")
   public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
       User user = userService.getUserByEmail(userDetails.getUsername());
       return ResponseEntity.ok(user);
   }
    
    
    // @GetMapping("/profile")
    // public ResponseEntity<UserProfileDTO> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
    //     User user = userService.getUserByEmail(userDetails.getUsername());

    //     String categoryName = null;
    //     if (user.getCategory() != null) {
    //         categoryName = user.getCategory().getCategoryName();
    //     }

    //     UserProfileDTO profileDTO = new UserProfileDTO(
    //             user.getName(),
    //             user.getEmail(),
    //             user.getRole(),
    //             categoryName
    //     );

    //     return ResponseEntity.ok(profileDTO);
    // }
}