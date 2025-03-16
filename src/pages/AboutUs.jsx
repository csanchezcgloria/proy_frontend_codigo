import { Link } from 'react-router-dom';
import '../styles/pages/about.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="navbar">
        <Link to="/" className="nav-logo">ChatGPT Clone</Link>
        <div className="nav-links">
          <Link to="/about" className="nav-link active">Quiénes Somos</Link>
          <Link to="/services" className="nav-link">Servicios</Link>
          <Link to="/login" className="nav-link">Iniciar Sesión</Link>
        </div>
      </div>
      
      <div className="about-content">
        <h1>Quiénes Somos</h1>
        <div className="about-section">
          <h2>Nuestra Misión</h2>
          <p>
            Somos una empresa dedicada a revolucionar la forma en que las personas interactúan con la tecnología. 
            Nuestro objetivo es hacer que la inteligencia artificial sea accesible para todos, proporcionando 
            herramientas conversacionales avanzadas que mejoren la productividad y la experiencia del usuario.
          </p>
        </div>
        
        <div className="about-section">
          <h2>Nuestra Historia</h2>
          <p>
            Fundada en 2023, nuestra startup ha crecido rápidamente gracias a la innovación constante y al 
            compromiso con la excelencia. Hemos desarrollado tecnologías pioneras en el campo del procesamiento 
            del lenguaje natural y el aprendizaje automático.
          </p>
        </div>
        
        <div className="about-section">
          <h2>Nuestro Equipo</h2>
          <p>
            Contamos con un equipo diverso de expertos en inteligencia artificial, desarrollo de software y 
            experiencia de usuario, todos trabajando juntos para crear soluciones que transformen la manera 
            en que interactuamos con las máquinas.
          </p>
        </div>
      </div>
      
      <div className="cta-section">
        <h2>¿Listo para probar nuestro chatbot?</h2>
        <Link to="/register" className="btn btn-primary">Comenzar Ahora</Link>
      </div>
    </div>
  );
};

export default AboutUs;