import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Wszystkie pola są wymagane.");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      
      const data = await loginUser(formData);
      login(data.token); 
      navigate("/home")
    } catch (error) {
      
      setError("Błędny login lub hasło.");
    }
  };

  return (
  <div className="login-page">
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Logowanie</h2>
        <input
          name="username"
          placeholder="Nazwa użytkownika"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Hasło"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Zaloguj</button>
        {error && <div className="error-message">{error}</div>}
        <div className="register-link">
          <p>Nie masz konta? <Link to="/register">Zarejestruj się</Link></p>
        </div>
      </form>
    </div>
  </div>
);
}

export default Login;
