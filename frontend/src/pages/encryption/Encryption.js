import React, { useState } from "react";
import { encryptMessage, decryptMessage } from "../../api/encryption";
import { saveMessage } from "../../api/messages";
import "./Encryption.css";

function Encryption() {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);  
  const handleEncrypt = async () => {
    try {
    
      const response = await encryptMessage(inputText);
      setResultText(response);
      setShowSaveButton(true);
    } catch (err) {
      setError("Błąd podczas szyfrowania.");
      console.error(err);
    }
  };

  const handleDecrypt = async () => {
    try {
      const response = await decryptMessage(inputText);
      setResultText(response);
      setShowSaveButton(false);
    } catch (err) {
      setError("Błąd podczas deszyfrowania.");
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      await saveMessage({ content: resultText });
      alert("Zaszyfrowana wiadomość została zapisana");
      setShowSaveButton(false);
    } catch (err) {
      alert("Nie udało się zapisać wiadomości.");
    }
  };

  return (
    <div className="encryption-container">
      <textarea
        className="encryption-input"
        placeholder="Wprowadź tekst do zaszyfrowania"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <div className="encryption-buttons">
        <button onClick={handleEncrypt}>Szyfruj</button>
        <button onClick={handleDecrypt}>Deszyfruj</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <textarea
        className="encryption-output"
        value={resultText}
        readOnly
        placeholder="Wynik operacji pojawi się tutaj"
      />
      {showSaveButton && (
        <div className="encryption-buttons">
          <button className="save-button" onClick={handleSave}>Zapisz</button>
        </div>
      )}
    </div>
  );
}

export default Encryption;
