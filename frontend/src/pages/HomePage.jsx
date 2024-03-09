import { Link } from "react-router-dom";
import logo2Img from "../assets/Logo2.png";

function App() {
  return (
    <>
      <div className="container home-page__container">
        <h4 className="subtitle">Welcome to our Web App</h4>
        <img src={logo2Img} alt="Logo" className="logo2" />
        
        <div className="home__buttons">
          <Link to="/login" className="btn btn-secondary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Sign up</Link>
        </div>
      </div>
    </>
  );
}

export default App;
