import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (username.length < 5) {
      setError("Nazwa użytkownika musi mieć co najmniej 5 znaków.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Nieprawidłowy adres e-mail.");
      return;
    }

    if (password.length < 10) {
      setError("Hasło musi mieć co najmniej 10 znaków.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Hasła się nie zgadzają.");
      return;
    }

    try {
      await registerUser({ username, email, password });
      navigate("/login");
    } catch (err) {
      setError("Błąd rejestracji.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Rejestracja</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            name="username"
            placeholder="Nazwa użytkownika"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="password"
            placeholder="Hasło"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            name="confirmPassword"
            placeholder="Powtórz hasło"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Zarejestruj się</button>
        </form>
        <div className="login-link">
          <p>Masz już konto? <a href="/login">Zaloguj się</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
