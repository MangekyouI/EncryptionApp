import React, { useEffect, useState } from "react";
import { getMessages } from "../../api/messages";
import "./Messages.css";

function Messages() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error("Błąd podczas pobierania wiadomości:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="messages-container">
      <h2>Twoje wiadomości</h2>
      {messages.length === 0 ? (
        <p>Brak zapisanych wiadomości.</p>
      ) : (
        <ul className="messages-list">
          {messages.map((msg) => (
            <li key={msg.id} className="message-item">
              <span>{msg.content}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Messages;
