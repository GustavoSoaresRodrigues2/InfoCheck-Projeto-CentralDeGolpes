// src/pages/Estatisticas.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Estatisticas.css";

function Estatisticas() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDenuncias: 12453,
    denunciasHoje: 347,
    bancoMaisDenunciado: "Nubank",
    tipoMaisComum: "Phishing",
    crescimento: "+15%"
  });

  return (
    <div className="estatisticas-container">
      <header className="estat-header">
        <div className="header-content">
          <h1 className="logo" onClick={() => navigate("/")}>
            InfoCheck
            <svg className="logo-check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </h1>
          <button className="btn-voltar" onClick={() => navigate("/")}>
            ← Voltar
          </button>
        </div>
      </header>

      <main className="estat-main">
        <h2>Estatísticas de Golpes</h2>
        
        <div className="stats-cards">
          <div className="stat-card blue">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>{stats.totalDenuncias.toLocaleString()}</h3>
              <p>Total de Denúncias</p>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <h3>{stats.denunciasHoje}</h3>
              <p>Denúncias Hoje</p>
            </div>
          </div>

          <div className="stat-card purple">
            <div className="stat-icon">🏦</div>
            <div className="stat-info">
              <h3>{stats.bancoMaisDenunciado}</h3>
              <p>Banco Mais Denunciado</p>
            </div>
          </div>

          <div className="stat-card red">
            <div className="stat-icon">⚠️</div>
            <div className="stat-info">
              <h3>{stats.tipoMaisComum}</h3>
              <p>Tipo Mais Comum</p>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>Denúncias por Mês (2024)</h3>
            <div className="simple-chart">
              <div className="bar" style={{height: "60%"}}><span>Jan</span></div>
              <div className="bar" style={{height: "75%"}}><span>Fev</span></div>
              <div className="bar" style={{height: "85%"}}><span>Mar</span></div>
              <div className="bar" style={{height: "70%"}}><span>Abr</span></div>
              <div className="bar" style={{height: "90%"}}><span>Mai</span></div>
              <div className="bar" style={{height: "95%"}}><span>Jun</span></div>
              <div className="bar" style={{height: "88%"}}><span>Jul</span></div>
              <div className="bar" style={{height: "92%"}}><span>Ago</span></div>
              <div className="bar" style={{height: "100%"}}><span>Set</span></div>
              <div className="bar" style={{height: "97%"}}><span>Out</span></div>
              <div className="bar" style={{height: "89%"}}><span>Nov</span></div>
            </div>
          </div>

          <div className="chart-card">
            <h3>Top 5 Bancos Denunciados</h3>
            <div className="ranking-list">
              <div className="ranking-item">
                <span className="rank">1º</span>
                <span className="name">Nubank</span>
                <div className="progress-bar"><div style={{width: "85%"}}></div></div>
                <span className="value">2.340</span>
              </div>
              <div className="ranking-item">
                <span className="rank">2º</span>
                <span className="name">Bradesco</span>
                <div className="progress-bar"><div style={{width: "70%"}}></div></div>
                <span className="value">1.890</span>
              </div>
              <div className="ranking-item">
                <span className="rank">3º</span>
                <span className="name">Itaú</span>
                <div className="progress-bar"><div style={{width: "65%"}}></div></div>
                <span className="value">1.750</span>
              </div>
              <div className="ranking-item">
                <span className="rank">4º</span>
                <span className="name">Santander</span>
                <div className="progress-bar"><div style={{width: "55%"}}></div></div>
                <span className="value">1.480</span>
              </div>
              <div className="ranking-item">
                <span className="rank">5º</span>
                <span className="name">Caixa</span>
                <div className="progress-bar"><div style={{width: "45%"}}></div></div>
                <span className="value">1.200</span>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3>Tipos de Golpes</h3>
            <div className="donut-chart">
              <div className="donut-item" style={{background: "#3b82f6"}}>
                <span>Phishing</span>
                <strong>35%</strong>
              </div>
              <div className="donut-item" style={{background: "#8b5cf6"}}>
                <span>WhatsApp</span>
                <strong>25%</strong>
              </div>
              <div className="donut-item" style={{background: "#ef4444"}}>
                <span>Boleto Falso</span>
                <strong>20%</strong>
              </div>
              <div className="donut-item" style={{background: "#f59e0b"}}>
                <span>PIX</span>
                <strong>15%</strong>
              </div>
              <div className="donut-item" style={{background: "#10b981"}}>
                <span>Outros</span>
                <strong>5%</strong>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Estatisticas;
