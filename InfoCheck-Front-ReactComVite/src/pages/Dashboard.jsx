// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../api";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("consultar"); // consultar, denunciar, historico
  
  // Estados para Consulta
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [resultadoConsulta, setResultadoConsulta] = useState(null);
  const [carregandoConsulta, setCarregandoConsulta] = useState(false);

  // Estados para Denúncia
  const [formDenuncia, setFormDenuncia] = useState({
    contato: "",
    idTipo: "",
    tipoOutro: "",
    opcaoBanco: "selecionar", // "selecionar" ou "digitar"
    idBanco: "",
    nomeBanco: "",
    descricao: ""
  });
  const [tiposGolpe, setTiposGolpe] = useState([]);
  const [bancos, setBancos] = useState([]);
  const [carregandoDenuncia, setCarregandoDenuncia] = useState(false);

  // Estados para Histórico
  const [historico, setHistorico] = useState([]);
  const [carregandoHistorico, setCarregandoHistorico] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("usuarioLogado");
    if (!stored) {
      navigate("/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setUsuario(parsed);
      carregarDadosIniciais();
    } catch (e) {
      console.error("Erro ao ler usuário:", e);
      localStorage.removeItem("usuarioLogado");
      navigate("/login");
    }
  }, [navigate]);

  async function carregarDadosIniciais() {
    try {
      const [tiposResp, bancosResp] = await Promise.all([
        apiGet("/api/tipos-golpe"),
        apiGet("/api/bancos")
      ]);
      setTiposGolpe(tiposResp || []);
      setBancos(bancosResp || []);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    }
  }

  function handleLogout() {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  }

  async function handleConsultar(e) {
    e.preventDefault();
    setCarregandoConsulta(true);
    setResultadoConsulta(null);

    try {
      const resp = await apiPost("/api/consultas", {
        idUsuario: usuario.id_usuario,
        termoPesquisado: termoPesquisa
      });

      setResultadoConsulta(resp);
    } catch (err) {
      console.error("Erro na consulta:", err);
      setResultadoConsulta({
        encontrado: false,
        mensagem: "Erro ao realizar consulta"
      });
    } finally {
      setCarregandoConsulta(false);
    }
  }

  async function handleDenunciar(e) {
    e.preventDefault();
    setCarregandoDenuncia(true);

    try {
      // Preparar os dados conforme a escolha do usuário
      const dadosDenuncia = {
        idUsuario: usuario.id_usuario,
        contatoDenunciado: formDenuncia.contato,
        descricao: formDenuncia.descricao
      };

      // Tipo de golpe: se for "outro", envia o texto customizado
      if (formDenuncia.idTipo === "outro") {
        dadosDenuncia.tipoGolpeOutro = formDenuncia.tipoOutro;
        dadosDenuncia.idTipo = null; // ou crie um ID especial para "Outro"
      } else {
        dadosDenuncia.idTipo = parseInt(formDenuncia.idTipo);
      }

      // Banco: se escolheu digitar, envia o nome; senão, envia o ID
      if (formDenuncia.opcaoBanco === "digitar") {
        dadosDenuncia.nomeBanco = formDenuncia.nomeBanco;
        dadosDenuncia.idBanco = null;
      } else {
        dadosDenuncia.idBanco = parseInt(formDenuncia.idBanco);
      }

      await apiPost("/api/denuncias", dadosDenuncia);

      alert("✅ Denúncia registrada com sucesso!");
      
      // Limpar formulário
      setFormDenuncia({
        contato: "",
        idTipo: "",
        tipoOutro: "",
        opcaoBanco: "selecionar",
        idBanco: "",
        nomeBanco: "",
        descricao: ""
      });
    } catch (err) {
      console.error("Erro ao denunciar:", err);
      alert("❌ Erro ao registrar denúncia. Tente novamente.");
    } finally {
      setCarregandoDenuncia(false);
    }
  }

  async function carregarHistorico() {
    setCarregandoHistorico(true);
    try {
      const resp = await apiGet(`/api/consultas/usuario/${usuario.id_usuario}`);
      setHistorico(resp || []);
    } catch (err) {
      console.error("Erro ao carregar histórico:", err);
      setHistorico([]);
    } finally {
      setCarregandoHistorico(false);
    }
  }

  useEffect(() => {
    if (abaAtiva === "historico" && usuario) {
      carregarHistorico();
    }
  }, [abaAtiva, usuario]);

  if (!usuario) return null;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-logo">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>InfoCheck</span>
          </div>

          <div className="header-user">
            <div className="user-info">
              <div className="user-avatar">
                {usuario.nome.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <span className="user-name">{usuario.nome}</span>
                <span className="user-cpf">{usuario.cpf}</span>
              </div>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Sidebar de navegação */}
        <nav className="dashboard-sidebar">
          <button
            className={`nav-item ${abaAtiva === "consultar" ? "active" : ""}`}
            onClick={() => setAbaAtiva("consultar")}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Consultar</span>
          </button>

          <button
            className={`nav-item ${abaAtiva === "denunciar" ? "active" : ""}`}
            onClick={() => setAbaAtiva("denunciar")}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Denunciar</span>
          </button>

          <button
            className={`nav-item ${abaAtiva === "historico" ? "active" : ""}`}
            onClick={() => setAbaAtiva("historico")}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>Histórico</span>
          </button>
        </nav>

        {/* Área principal */}
        <main className="dashboard-main">
          {abaAtiva === "consultar" && (
            <div className="section">
              <div className="section-header">
                <h2>Consultar Contato</h2>
                <p>Verifique se um número, e-mail ou conta já foi denunciado</p>
              </div>

              <form onSubmit={handleConsultar} className="consulta-form">
                <div className="search-box">
                  <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Digite telefone, e-mail ou PIX..."
                    value={termoPesquisa}
                    onChange={(e) => setTermoPesquisa(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="search-button"
                    disabled={carregandoConsulta}
                  >
                    {carregandoConsulta ? "Buscando..." : "Consultar"}
                  </button>
                </div>
              </form>

              {resultadoConsulta && (
                <div className={`resultado-card ${resultadoConsulta.encontrado ? "danger" : "success"}`}>
                  <div className="resultado-icon">
                    {resultadoConsulta.encontrado ? (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div className="resultado-content">
                    <h3>{resultadoConsulta.encontrado ? "⚠️ Alerta!" : "✅ Tudo certo!"}</h3>
                    <p>
                      {resultadoConsulta.encontrado
                        ? `Este contato foi denunciado ${resultadoConsulta.totalDenuncias || 0} vez(es). Cuidado!`
                        : "Nenhuma denúncia encontrada para este contato."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {abaAtiva === "denunciar" && (
            <div className="section">
              <div className="section-header">
                <h2>Registrar Denúncia</h2>
                <p>Ajude a comunidade reportando tentativas de golpe</p>
              </div>

              <form onSubmit={handleDenunciar} className="denuncia-form">
                <div className="form-group">
                  <label>Contato Suspeito</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Telefone, e-mail, PIX..."
                    value={formDenuncia.contato}
                    onChange={(e) => setFormDenuncia({...formDenuncia, contato: e.target.value})}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Tipo de Golpe</label>
                    <select
                      className="form-control"
                      value={formDenuncia.idTipo}
                      onChange={(e) => setFormDenuncia({...formDenuncia, idTipo: e.target.value, tipoOutro: ""})}
                      required
                    >
                      <option value="">Selecione...</option>
                      {tiposGolpe.map(tipo => (
                        <option key={tipo.id_tipo} value={tipo.id_tipo}>
                          {tipo.nome_tipo}
                        </option>
                      ))}
                      <option value="outro">🖊️ Outro (especificar)</option>
                    </select>

                    {/* Campo condicional para "Outro" */}
                    {formDenuncia.idTipo === "outro" && (
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Especifique o tipo de golpe..."
                        value={formDenuncia.tipoOutro}
                        onChange={(e) => setFormDenuncia({...formDenuncia, tipoOutro: e.target.value})}
                        required
                      />
                    )}
                  </div>

                  <div className="form-group">
                    <label>Banco Envolvido</label>
                    
                    {/* Opção: Selecionar ou Digitar */}
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="opcaoBanco"
                          value="selecionar"
                          checked={formDenuncia.opcaoBanco === "selecionar"}
                          onChange={(e) => setFormDenuncia({...formDenuncia, opcaoBanco: e.target.value, nomeBanco: ""})}
                        />
                        <span>Selecionar da lista</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="opcaoBanco"
                          value="digitar"
                          checked={formDenuncia.opcaoBanco === "digitar"}
                          onChange={(e) => setFormDenuncia({...formDenuncia, opcaoBanco: e.target.value, idBanco: ""})}
                        />
                        <span>Digitar nome</span>
                      </label>
                    </div>

                    {/* Select ou Input conforme escolha */}
                    {formDenuncia.opcaoBanco === "selecionar" ? (
                      <select
                        className="form-control mt-2"
                        value={formDenuncia.idBanco}
                        onChange={(e) => setFormDenuncia({...formDenuncia, idBanco: e.target.value})}
                        required
                      >
                        <option value="">Selecione...</option>
                        {bancos.map(banco => (
                          <option key={banco.id_banco} value={banco.id_banco}>
                            {banco.nome_banco}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Digite o nome do banco..."
                        value={formDenuncia.nomeBanco}
                        onChange={(e) => setFormDenuncia({...formDenuncia, nomeBanco: e.target.value})}
                        required
                      />
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>Descrição (opcional)</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Descreva o que aconteceu..."
                    value={formDenuncia.descricao}
                    onChange={(e) => setFormDenuncia({...formDenuncia, descricao: e.target.value})}
                  />
                </div>

                <button
                  type="submit"
                  disabled={carregandoDenuncia}
                  className="submit-button"
                >
                  {carregandoDenuncia ? "Enviando..." : "Registrar Denúncia"}
                </button>
              </form>
            </div>
          )}

          {abaAtiva === "historico" && (
            <div className="section">
              <div className="section-header">
                <h2>Histórico de Consultas</h2>
                <p>Suas consultas recentes</p>
              </div>

              {carregandoHistorico ? (
                <div className="loading-state">
                  <div className="spinner-large"></div>
                  <p>Carregando histórico...</p>
                </div>
              ) : historico.length === 0 ? (
                <div className="empty-state">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <h3>Nenhuma consulta ainda</h3>
                  <p>Suas consultas aparecerão aqui</p>
                </div>
              ) : (
                <div className="historico-list">
                  {historico.map((item, index) => (
                    <div key={index} className="historico-item">
                      <div className="historico-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                          <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="historico-content">
                        <strong>{item.termo_pesquisado}</strong>
                        <span className="historico-resultado">
                          {item.resultado_encontrado === "encontrado" ? "⚠️ Denunciado" : "✅ Sem denúncias"}
                        </span>
                        <small>{new Date(item.data_consulta).toLocaleString()}</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
