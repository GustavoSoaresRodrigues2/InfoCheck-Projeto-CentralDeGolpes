// src/pages/Home.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");

  const handleBusca = (e) => {
    e.preventDefault();
    if (busca.trim()) {
      navigate(`/consultar?termo=${busca}`);
    }
  };

  return (
    <div className="home-container">
      {/* Header com busca e botões */}
      <header className="home-header">
        <div className="header-content">
          <h1 className="logo">
            InfoCheck
            <svg className="logo-check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </h1>

          <form onSubmit={handleBusca} className="search-bar-header">
            <input
              type="text"
              placeholder="Digite aqui o nome do banco ou um número suspeito..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <button type="submit">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </form>

          <div className="header-actions">
            <button className="btn-icon" title="Idioma">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <button className="btn-entrar" onClick={() => navigate("/login")}>
              Entrar
            </button>
          </div>
        </div>
      </header>

      {/* Banner principal */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>Sofreu um golpe e precisa de ajuda?</h2>
          <p>
            O Brasil registra aproximadamente 4.678 tentativas de golpes financeiros por hora.
            Isso totaliza cerca de 112.272 tentativas por dia.
          </p>
          <p className="hero-subtitle">
            Se você foi vítima de um golpe, faça sua denúncia.
          </p>
          <button className="btn-denuncia" onClick={() => navigate("/denuncia-elaborada")}>
            Denuncie agora
          </button>
        </div>
      </section>

      {/* Cards de navegação */}
      <section className="cards-section">
        <div className="cards-container">
          <div className="info-card" onClick={() => navigate("/golpes-por-banco")}>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Contatos Oficiais dos Bancos</h3>
            <p>Veja os canais oficiais de atendimento</p>
          </div>

          <div className="info-card" onClick={() => navigate("/denuncia-elaborada")}>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Registro de Golpes</h3>
            <p>Registre e consulte denúncias</p>
          </div>

          <div className="info-card" onClick={() => navigate("/feed-alertas")}>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Feed de Alertas</h3>
            <p>Últimas notícias sobre golpes</p>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="home-footer">
        <p>© 2024 InfoCheck - Central de Denúncias de Golpes Financeiros</p>
        <div className="footer-links">
          <button onClick={() => navigate("/estatisticas")}>Estatísticas</button>
          <span>•</span>
          <button onClick={() => navigate("/sobre")}>Sobre</button>
          <span>•</span>
          <button onClick={() => navigate("/ajuda")}>Ajuda</button>
        </div>
      </footer>
    </div>
  );
}

export default Home;
