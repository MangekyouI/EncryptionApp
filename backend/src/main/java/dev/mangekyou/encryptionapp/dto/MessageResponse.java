package dev.mangekyou.encryptionapp.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MessageResponse {
    private int id;
    private String content;
    private LocalDateTime creationDate;
}
