package dev.mangekyou.encryptionapp.service;

import dev.mangekyou.encryptionapp.dto.MessageRequest;
import dev.mangekyou.encryptionapp.dto.MessageResponse;
import dev.mangekyou.encryptionapp.entity.Message;
import dev.mangekyou.encryptionapp.entity.User;
import dev.mangekyou.encryptionapp.repository.MessageRepository;
import dev.mangekyou.encryptionapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public void save(MessageRequest messageRequest) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow();

        Message message = Message.builder()
                .content(messageRequest.getContent())
                .creationDate(LocalDateTime.now())
                .user(user)
                .build();

        messageRepository.save(message);
    }

    public List<MessageResponse> getMessages() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow();

        return messageRepository.findByUser(user).stream()
                .map(m -> MessageResponse.builder()
                        .id(m.getId())
                        .content(m.getContent())
                        .creationDate(m.getCreationDate())
                        .build())
                .collect(Collectors.toList());
    }
    public void deleteMessage(int id) throws AccessDeniedException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow();

        Message message = messageRepository.findById(id);
        if(!message.getUser().equals(user)) {
            throw new AccessDeniedException("Nie masz uprawnień");
        }
        messageRepository.delete(message);
    }

}
