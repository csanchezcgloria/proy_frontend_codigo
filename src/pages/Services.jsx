import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Asistente Virtual Inteligente',
      description: 'Chatbot personalizado capaz de mantener conversaciones naturales y resolver consultas de manera eficiente.',
      icon: '🤖'
    },
    {
      id: 2,
      title: 'Análisis de Texto',
      description: 'Herramientas de procesamiento de lenguaje natural para analizar grandes volúmenes de texto y extraer información valiosa.',
      icon: '📊'
    },
    {
      id: 3,
      title: 'Generación de Contenido',
      description: 'Creación automática de contenido de alta calidad para diferentes propósitos y plataformas.',
      icon: '✍️'
    },
    {
      id: 4,
      title: 'Traducción Automática',
      description: 'Servicio de traducción precisa y contextualizada entre múltiples idiomas.',
      icon: '🌐'
    }
  ];

  return (
    <div className="services-container">
      <div className="navbar">
        <Link to="/" className="nav-logo">ChatGPT Clone</Link>
        <div className="nav-links">
          <Link to="/about" className="nav-link">Quiénes Somos</Link>
          <Link to="/services" className="nav-link active">Servicios</Link>
          <Link to="/login" className="nav-link">Iniciar Sesión</Link>
        </div>
      </div>
      
      <div className="services-header">
        <h1>Nuestros Servicios</h1>
        <p>Descubre cómo nuestra tecnología de inteligencia artificial puede transformar tu negocio</p>
      </div>
      
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
      
      <div className="cta-section">
        <h2>¿Interesado en nuestras soluciones?</h2>
        <Link to="/register" className="btn btn-primary">Prueba Gratis</Link>
      </div>
    </div>
  );
};

export default Services;