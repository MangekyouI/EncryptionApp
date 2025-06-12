package dev.mangekyou.encryptionapp.controller;

import dev.mangekyou.encryptionapp.dto.MessageRequest;
import dev.mangekyou.encryptionapp.dto.MessageResponse;
import dev.mangekyou.encryptionapp.service.EncryptionService;
import dev.mangekyou.encryptionapp.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;
    private final EncryptionService encryptionService;

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody MessageRequest messageRequest) {
        messageService.save(messageRequest);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) throws AccessDeniedException {
        messageService.deleteMessage(id);
        return ResponseEntity.ok("Wiadomość usunięta");
    }


        @GetMapping
    public ResponseEntity<List<MessageResponse>> getAllMessages() {
        return ResponseEntity.ok(messageService.getMessages());
    }



    @PostMapping("/encrypt")
    public ResponseEntity<String> encrypt(@RequestBody MessageRequest request) {
        return ResponseEntity.ok(encryptionService.encrypt(request.getContent()));
    }

    @PostMapping("/decrypt")
    public ResponseEntity<String> decrypt(@RequestBody MessageRequest request) {
        return ResponseEntity.ok(encryptionService.decrypt(request.getContent()));
    }
}
