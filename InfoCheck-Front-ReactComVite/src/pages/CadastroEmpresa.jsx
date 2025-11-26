import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiPost } from "../api";

const CadastroEmpresa = () => {
  const navigate = useNavigate();

  const [cnpj, setCnpj] = useState("");
  const [nomeBanco, setNomeBanco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [site, setSite] = useState("");


  function handleCNPJ(e) {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
    setCnpj(v);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      cnpj,
      nome_banco: nomeBanco,
      descricao,
      site_oficial: site,
    };

    try {
      const response = await apiPost("/api/bancos", data);
      alert("Empresa cadastrada com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar empresa");
    }
  }


  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo-container">
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h1 className="logo-text" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>InfoCheck</h1>
              <svg className="logo-check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="auth-subtitle">Sua segurança em primeiro lugar</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">
                <svg className="label-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                CNPJ
              </label>
              <input
                className="form-input"
                type="text"
                value={cnpj}
                onChange={handleCNPJ}
                placeholder="00.000.000/0000.00"
                maxLength="18"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <svg className="label-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Nome da Empresa
              </label>
              <input
                className="form-input"
                type="text"
                value={nomeBanco}
                onChange={(e) => setNomeBanco(e.target.value)}
                placeholder="Nome da empresa..."
                maxLength="100"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <svg className="label-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Descrição
              </label>
              <input
                className="form-input"
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva a sua empresa..."
                maxLength="200"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <svg
                  className="label-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 1 7 0l1 1a5 5 0 0 1-7 7l-1-1" />
                  <path d="M14 11a5 5 0 0 0-7 0l-1 1a5 5 0 0 0 7 7l1-1" />
                </svg>

                Site Oficinal
              </label>
              <input
                className="form-input"
                type="text"
                value={site}
                onChange={(e) => setSite(e.target.value)}
                placeholder="Site oficial da sua empresa..."
                maxLength="100"
                required
              />
            </div>

            <button type="submit" className="btnSalvar">
              Cadastrar
            </button>
          </form>
        </div>

        <div className="auth-info">
          <div className="info-card">
            <div className="info-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Proteja-se contra golpes</h3>
            <p>Consulte e denuncie contatos suspeitos de forma rápida e segura.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CadastroEmpresa