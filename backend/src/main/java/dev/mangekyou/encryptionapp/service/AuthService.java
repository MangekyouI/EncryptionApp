package dev.mangekyou.encryptionapp.service;

import dev.mangekyou.encryptionapp.dto.AuthResponse;
import dev.mangekyou.encryptionapp.dto.LoginRequest;
import dev.mangekyou.encryptionapp.dto.RegisterRequest;
import dev.mangekyou.encryptionapp.entity.Role;
import dev.mangekyou.encryptionapp.entity.User;
import dev.mangekyou.encryptionapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request){
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        String token= jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }
    public AuthResponse login(LoginRequest request){

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();
        String token = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }
}
