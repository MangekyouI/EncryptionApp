import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const navigateToMessages = () => navigate("/messages");
  const navigateToEncryption = () => navigate("/encryption");

  return (
    <div id="main-content">
      <div id="main-navigation">
        <div className="navigation-button" onClick={navigateToMessages}>
          <h1>Wiadomości</h1>
        </div>
        <div className="navigation-button" onClick={navigateToEncryption}>
          <h1>Szyfrowanie</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
