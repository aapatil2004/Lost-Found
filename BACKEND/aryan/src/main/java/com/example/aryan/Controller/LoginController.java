package com.example.aryan.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.aryan.Model.Login;
import com.example.aryan.Service.LoginService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LoginController {

    @Autowired
    private LoginService loginService;

    // Sign Up Endpoint
    @PostMapping("/SignUp") // Conventionally use lowercase for paths
    public ResponseEntity<String> signUpUser(@RequestBody Login loginRequest) {
        String username = loginRequest.getUsername();
        String email = loginRequest.getEmail(); // Assuming there's a getEmail() method in Login
        String password = loginRequest.getPassword();

        boolean isRegistered = loginService.register(username, email, password);

        if (isRegistered) {
            return ResponseEntity.ok("Sign up successful");
        } else {
            return ResponseEntity.status(400).body("User already exists or invalid data");
        }
    }

    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Login loginRequest) {
        String identifier = loginRequest.getEmail(); // Use email as identifier
        String password = loginRequest.getPassword();

        Login user = loginService.login(identifier, password);
        if (user != null) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}
