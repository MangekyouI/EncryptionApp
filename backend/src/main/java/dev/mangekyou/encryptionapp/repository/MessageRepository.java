package dev.mangekyou.encryptionapp.repository;

import dev.mangekyou.encryptionapp.entity.Message;
import dev.mangekyou.encryptionapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findByUser(User user);
    Message findById(int id);
}
