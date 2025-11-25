// src/pages/FeedAlertas.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FeedAlertas.css";

function FeedAlertas() {
  const navigate = useNavigate();
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    // Dados mockados de alertas (depois você pode buscar da API)
    setAlertas([
      {
        id: 1,
        titulo: "Novo golpe usa números muito parecidos com os de bancos oficiais",
        descricao: "Criminosos estão utilizando números quase idênticos aos de centrais de atendimento para enganar clientes. Especialistas alertam para sempre verificar o contato antes de responder.",
        imagem: "/images/alerta1.jpg",
        categoria: "Phishing",
        data: "2024-11-24",
        tags: ["Telefone", "Bancos", "Alerta Máximo"]
      },
      {
        id: 2,
        titulo: "Aumento expressivo de tentativas de phishing por SMS em todo o Brasil",
        descricao: 'SMS falsos obtém sucesso elevado em "desbloqueio imediato do cartão". Ao clicar, vítimas são levadas a páginas falsas que solicitam dados bancários.',
        imagem: "/images/alerta2.jpg",
        categoria: "SMS Falso",
        data: "2024-11-23",
        tags: ["SMS", "Dados", "Urgente"]
      },
      {
        id: 3,
        titulo: "Falso atendente se passa por setor antifraude",
        descricao: 'Novo golpe detectado: criminosos se passam por atendentes de bancos dizendo que o cliente "confirme dados" para cancelar "transações suspeitas". Bancos reforçam que nunca solicitam senhas.',
        imagem: "/images/alerta3.jpg",
        categoria: "Engenharia Social",
        data: "2024-11-22",
        tags: ["Telefone", "Senha", "Antifraude"]
      },
      {
        id: 4,
        titulo: "Golpe do boleto falso cresce durante pagamento de impostos",
        descricao: "Criminosos criam boletos adulterados com código de barras similares. Especialistas alertam para sempre verificar o destinatário antes de realizar o pagamento.",
        imagem: "/images/alerta4.jpg",
        categoria: "Boleto Falso",
        data: "2024-11-21",
        tags: ["Boleto", "Impostos", "Código de barras"]
      },
      {
        id: 5,
        titulo: "E-mails falsos imitam notificações de cartão de crédito",
        descricao: "Golpistas enviam mensagens convincentes sobre 'cartão bloqueado', levando usuários a clicar em links falsos. Ao clicar, usuários são levados a sites que clonal credenciais.",
        imagem: "/images/alerta5.jpg",
        categoria: "Phishing Email",
        data: "2024-11-20",
        tags: ["E-mail", "Cartão", "Link Falso"]
      }
    ]);
  }, []);

  return (
    <div className="feed-container">
      {/* Header */}
      <header className="feed-header">
        <div className="header-content">
          <h1 className="logo" onClick={() => navigate("/")}>
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            InfoCheck
            <svg className="logo-check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </h1>

          <div className="search-bar-header">
            <input
              type="text"
              placeholder="Digite aqui o nome do banco ou um número suspeito..."
            />
            <button type="button">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="header-actions">
            <button className="btn-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <button className="btn-user">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="feed-main">
        <div className="feed-content">
          <h2 className="feed-title">Feed de Alertas</h2>

          <div className="alertas-grid">
            {alertas.map(alerta => (
              <article key={alerta.id} className="alerta-card">
                {/* Imagem/Ícone */}
                <div className="alerta-image">
                  <div className="alerta-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="alerta-content">
                  <div className="alerta-header-info">
                    <span className="alerta-categoria">{alerta.categoria}</span>
                    <span className="alerta-data">
                      {new Date(alerta.data).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <h3 className="alerta-titulo">{alerta.titulo}</h3>
                  <p className="alerta-descricao">{alerta.descricao}</p>

                  <div className="alerta-tags">
                    {alerta.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>

                  <button className="btn-leia-mais">
                    Leia mais →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default FeedAlertas;
