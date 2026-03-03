package in.sp.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import in.sp.main.dto.LoginRequestDTO;

import in.sp.main.dto.RegisterRequestDTO;
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
    
}
