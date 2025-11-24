// src/pages/GolpesPorBanco.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet } from "../api";
import "../styles/GolpesPorBanco.css";

function GolpesPorBanco() {
  const navigate = useNavigate();
  const { idBanco } = useParams();
  
  const [bancoSelecionado, setBancoSelecionado] = useState(null);
  const [bancos, setBancos] = useState([]);
  const [golpes, setGolpes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarBancos();
  }, []);

  useEffect(() => {
    if (idBanco && bancos.length > 0) {
      const banco = bancos.find(b => b.id_banco === parseInt(idBanco));
      if (banco) {
        setBancoSelecionado(banco);
        carregarGolpesDoBanco(banco.id_banco);
      }
    }
  }, [idBanco, bancos]);

  async function carregarBancos() {
    try {
      const dados = await apiGet("/api/bancos");
      setBancos(dados || []);
      
      // Se não tem ID na URL, seleciona o primeiro banco
      if (!idBanco && dados && dados.length > 0) {
        setBancoSelecionado(dados[0]);
        carregarGolpesDoBanco(dados[0].id_banco);
      }
    } catch (err) {
      console.error("Erro ao carregar bancos:", err);
    } finally {
      setLoading(false);
    }
  }

  async function carregarGolpesDoBanco(idBanco) {
    try {
      setLoading(true);
      // Aqui você pode criar um endpoint específico ou usar denúncias filtradas
      // Por enquanto, vou simular dados
      
      // Simulação de golpes
      const golpesSimulados = [
        {
          id: 1,
          usuario: "Guilherme",
          tipo: "Golpe da ligação",
          descricao: "O número +55 11 99999-1111 ligou em nome do Nubank pedindo meus dados pessoais para atualizar meu cadastro no banco. Ações falando que se eu não passasse as informações minha conta seria cancelada...",
          data: "2024-11-20"
        },
        {
          id: 2,
          usuario: "Neuza",
          tipo: "Golpe da notificação falsa",
          descricao: "Recebi um SMS dizendo que minha conta com valor de 5000 mil reais mas não fiz nenhuma compra nesse valor. Quero saber por que estão me mandando essa mensagem...",
          data: "2024-11-19"
        },
        {
          id: 3,
          usuario: "Roberto",
          tipo: "Golpe da site falso",
          descricao: "Recebi um e-mail do NuBank informando que eu havia feito um investimento no valor de 10 mil reais e que para confirmar o investimento eu devia clicar no link presente no e-mail...",
          data: "2024-11-18"
        }
      ];

      setGolpes(golpesSimulados);
    } catch (err) {
      console.error("Erro ao carregar golpes:", err);
      setGolpes([]);
    } finally {
      setLoading(false);
    }
  }

  function selecionarBanco(banco) {
    setBancoSelecionado(banco);
    navigate(`/golpes-por-banco/${banco.id_banco}`);
  }

  return (
    <div className="golpes-banco-container">
      {/* Header */}
      <header className="golpes-header">
        <div className="header-content">
          <h1 className="logo" onClick={() => navigate("/")}>
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
            <button>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <button className="btn-entrar" onClick={() => navigate("/login")}>
            Entrar
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="golpes-content">
        {/* Sidebar com bancos */}
        <aside className="bancos-sidebar">
          <h3>Bancos relacionados:</h3>
          <div className="bancos-list">
            {bancos.map(banco => (
              <button
                key={banco.id_banco}
                className={`banco-item ${bancoSelecionado?.id_banco === banco.id_banco ? 'active' : ''}`}
                onClick={() => selecionarBanco(banco)}
              >
                <div className="banco-logo">
                  {banco.nome_banco.charAt(0).toUpperCase()}
                </div>
                <span>{banco.nome_banco}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main - Detalhes do banco e golpes */}
        <main className="banco-main">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Carregando...</p>
            </div>
          ) : bancoSelecionado ? (
            <>
              {/* Header do banco */}
              <div className="banco-header">
                <div className="banco-logo-grande">
                  {bancoSelecionado.nome_banco.charAt(0).toUpperCase()}
                </div>
                <div className="banco-info">
                  <h2>{bancoSelecionado.nome_banco}</h2>
                  <p className="banco-descricao">
                    Veja os últimos golpes reportados envolvendo o {bancoSelecionado.nome_banco}
                  </p>
                </div>
              </div>

              {/* Botão de denunciar */}
              <div className="denuncia-box">
                <h3>Deseja registrar um golpe sobre o {bancoSelecionado.nome_banco}?</h3>
                <button 
                  className="btn-registrar-golpe"
                  onClick={() => navigate("/denuncia-elaborada")}
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Registre agora!
                </button>
              </div>

              {/* Lista de golpes */}
              <section className="golpes-section">
                <h3>Últimos golpes informados</h3>

                {golpes.length === 0 ? (
                  <div className="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <p>Nenhum golpe reportado ainda para este banco</p>
                  </div>
                ) : (
                  <div className="golpes-list">
                    {golpes.map(golpe => (
                      <article key={golpe.id} className="golpe-card">
                        <div className="golpe-header">
                          <div className="usuario-avatar">
                            {golpe.usuario.charAt(0).toUpperCase()}
                          </div>
                          <div className="golpe-meta">
                            <strong>{golpe.usuario}</strong>
                            <span className="golpe-tipo">{golpe.tipo}</span>
                          </div>
                        </div>

                        <p className="golpe-descricao">
                          {golpe.descricao.length > 200 
                            ? golpe.descricao.substring(0, 200) + "..." 
                            : golpe.descricao}
                        </p>

                        <button className="btn-ver-mais">
                          Ver Mais...
                        </button>

                        <div className="golpe-footer">
                          <span className="golpe-data">
                            {new Date(golpe.data).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>

              {/* Sobre o Banco (lado direito) */}
              <aside className="banco-sobre">
                <h3>Sobre o {bancoSelecionado.nome_banco}</h3>
                <p>
                  {bancoSelecionado.descricao || 
                   `O ${bancoSelecionado.nome_banco} é uma instituição financeira com milhões de clientes no Brasil. Fique atento a golpes que utilizam o nome do banco.`}
                </p>

                <div className="contato-oficial">
                  <h4>Contato Oficial</h4>
                  <p>
                    <strong>SAC:</strong> {bancoSelecionado.sac || "Não informado"}
                  </p>
                  <p>
                    <strong>Ouvidoria:</strong> {bancoSelecionado.ouvidoria || "Não informado"}
                  </p>
                </div>

                <button className="btn-reportar-erro">
                  Reportar informação incorreta
                </button>
              </aside>
            </>
          ) : (
            <div className="empty-state">
              <p>Selecione um banco para ver os golpes reportados</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default GolpesPorBanco;
