package dev.mangekyou.encryptionapp.controller;

import dev.mangekyou.encryptionapp.dto.LoginRequest;
import dev.mangekyou.encryptionapp.dto.RegisterRequest;
import dev.mangekyou.encryptionapp.repository.UserRepository;
import dev.mangekyou.encryptionapp.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest authRequest) {
        if(userRepository.existsByUsername((authRequest.getUsername()))){
            return ResponseEntity.badRequest().body("Nazwa użytkownika już istnieje");
        }
        if(userRepository.existsByEmail((authRequest.getEmail()))){
            return ResponseEntity.badRequest().body("Email jest już używany");
        }
        return ResponseEntity.ok(authService.register(authRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest authRequest) {

        try {
            return ResponseEntity.ok(authService.login(authRequest));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nieprawidłowy login lub hasło");
        }
    }
}
