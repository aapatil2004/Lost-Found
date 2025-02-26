package com.example.aryan.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.aryan.Model.Login;
import com.example.aryan.Repository.LoginRepository;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    // Method to register a new user
    public boolean register(String username, String email, String password) {
        // Check if the user already exists
        if (loginRepository.findByUsername(username) != null || loginRepository.findByEmail(email) != null) {
            return false; // User already exists
        }

        // Create a new user object
        Login newUser = new Login();
        newUser.setUsername(username);
        newUser.setPassword(password); // Consider hashing the password
        newUser.setEmail(email);

        // Save the user to the repository
        loginRepository.save(newUser);
        return true; // Registration successful
    }

    // Method to log in a user
    public Login login(String identifier, String password) {
        // Try to find the user by username
        Login user = loginRepository.findByEmail(identifier);

        // Validate user credentials
        if (user != null && user.getPassword().equals(password))

        { // Consider using password hashing
            return user; // Return the user if login is successful
        }

        return null; // Login failed
    }
}
