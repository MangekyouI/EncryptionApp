package dev.mangekyou.encryptionapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Nazwa użytkownika jest wymagana")
    @Size(min = 5, message = "Nazwa użytkownika musi mieć co najmniej 5 znaki")
    private String username;

    @NotBlank(message = "Hasło jest wymagane")
    @Size(min = 10, message = "Hasło musi mieć co najmniej 10 znaków")
    private String password;

    @NotBlank(message = "Email jest wymagany")
    @Email(message = "Nieprawidłowy adres email")
    private String email;
}
