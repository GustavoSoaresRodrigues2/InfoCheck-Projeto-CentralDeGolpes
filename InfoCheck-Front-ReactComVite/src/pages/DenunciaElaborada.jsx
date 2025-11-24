// src/pages/DenunciaElaborada.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";
import "../styles/DenunciaElaborada.css";

function DenunciaElaborada() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(1);
  const [sucesso, setSucesso] = useState(false);
  const [numeroDenuncia, setNumeroDenuncia] = useState("");
  
  const [form, setForm] = useState({
    contato: "",
    tipoGolpe: "",
    tipoGolpeOutro: "",
    banco: "",
    nomeBanco: "",
    valor: "",
    dataOcorrido: "",
    descricao: "",
    comoFicouSabendo: "",
    jaDenunciouPolicia: "nao",
    boletimOcorrencia: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const proximaEtapa = () => {
    if (etapa < 3) setEtapa(etapa + 1);
  };

  const voltarEtapa = () => {
    if (etapa > 1) setEtapa(etapa - 1);
  };

  const enviarDenuncia = async (e) => {
    e.preventDefault();
    
    try {
      const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
      
      const dados = {
        idUsuario: usuario.id_usuario || 1,
        contatoDenunciado: form.contato,
        idTipoGolpe: form.tipoGolpe !== "outro" ? parseInt(form.tipoGolpe) : null,
        tipoGolpeOutro: form.tipoGolpe === "outro" ? form.tipoGolpeOutro : null,
        idBanco: form.banco !== "outro" ? parseInt(form.banco) : null,
        nomeBanco: form.banco === "outro" ? form.nomeBanco : null,
        descricao: `${form.descricao}\n\nValor: R$ ${form.valor}\nData: ${form.dataOcorrido}\nComo soube: ${form.comoFicouSabendo}\nBO: ${form.jaDenunciouPolicia === "sim" ? form.boletimOcorrencia : "Não registrado"}`
      };

      await apiPost("/api/denuncias", dados);
      
      const numero = `000${Date.now()}`.slice(-13);
      setNumeroDenuncia(numero);
      setSucesso(true);
    } catch (err) {
      console.error("Erro ao enviar denúncia:", err);
      alert("Erro ao enviar denúncia. Tente novamente.");
    }
  };

  if (sucesso) {
    return (
      <div className="sucesso-container">
        <div className="sucesso-card">
          <h2>Denúncia Registrada</h2>
          <p className="numero">N°: {numeroDenuncia}</p>
          
          <div className="check-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2" fill="none"/>
              <path d="M8 12L11 15L16 9" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <p className="msg-principal">Sua denúncia foi registrada com sucesso.</p>
          <p className="msg-secundaria">
            Nossa equipe analisará as informações e, se necessário, entrará em contato para complementar os dados.
          </p>
          <p className="msg-final">
            Sua ação ajuda a prevenir que outras pessoas também sejam vítimas. Obrigado por confiar no InfoCheck.
          </p>

          <div className="botoes-finais">
            <button className="btn-acompanhar" onClick={() => navigate("/dashboard")}>
              Acompanhar denúncia
            </button>
            <button className="btn-voltar-inicio" onClick={() => navigate("/")}>
              Voltar ao início
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="denuncia-elaborada-container">
      <header className="denuncia-header">
        <h1 className="logo" onClick={() => navigate("/")}>
          InfoCheck
          <svg className="logo-check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </h1>
      </header>

      <main className="denuncia-main">
        <div className="denuncia-card">
          <h2>Registrar Denúncia Detalhada</h2>
          <p className="subtitulo">Ajude a comunidade com informações completas</p>

          {/* Indicador de etapas */}
          <div className="etapas-indicador">
            <div className={`etapa ${etapa >= 1 ? 'active' : ''}`}>
              <span>1</span>
              <p>Básico</p>
            </div>
            <div className={`linha ${etapa >= 2 ? 'active' : ''}`}></div>
            <div className={`etapa ${etapa >= 2 ? 'active' : ''}`}>
              <span>2</span>
              <p>Detalhes</p>
            </div>
            <div className={`linha ${etapa >= 3 ? 'active' : ''}`}></div>
            <div className={`etapa ${etapa >= 3 ? 'active' : ''}`}>
              <span>3</span>
              <p>Confirmação</p>
            </div>
          </div>

          <form onSubmit={enviarDenuncia}>
            {/* ETAPA 1 */}
            {etapa === 1 && (
              <div className="etapa-content">
                <h3>Informações Básicas</h3>
                
                <div className="form-group">
                  <label>Contato Suspeito *</label>
                  <input
                    type="text"
                    name="contato"
                    value={form.contato}
                    onChange={handleChange}
                    placeholder="Telefone, e-mail, PIX, link..."
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Tipo de Golpe *</label>
                    <select name="tipoGolpe" value={form.tipoGolpe} onChange={handleChange} required>
                      <option value="">Selecione...</option>
                      <option value="1">Phishing</option>
                      <option value="2">Golpe do WhatsApp</option>
                      <option value="3">Falso Boleto</option>
                      <option value="4">Clonagem de Cartão</option>
                      <option value="outro">🖊️ Outro (especificar)</option>
                    </select>
                    {form.tipoGolpe === "outro" && (
                      <input
                        type="text"
                        name="tipoGolpeOutro"
                        value={form.tipoGolpeOutro}
                        onChange={handleChange}
                        placeholder="Especifique o tipo de golpe..."
                        className="mt-2"
                        required
                      />
                    )}
                  </div>

                  <div className="form-group">
                    <label>Banco Envolvido *</label>
                    <select name="banco" value={form.banco} onChange={handleChange} required>
                      <option value="">Selecione...</option>
                      <option value="1">Bradesco</option>
                      <option value="2">Itaú</option>
                      <option value="3">Santander</option>
                      <option value="outro">🖊️ Outro banco</option>
                    </select>
                    {form.banco === "outro" && (
                      <input
                        type="text"
                        name="nomeBanco"
                        value={form.nomeBanco}
                        onChange={handleChange}
                        placeholder="Digite o nome do banco..."
                        className="mt-2"
                        required
                      />
                    )}
                  </div>
                </div>

                <button type="button" className="btn-proximo" onClick={proximaEtapa}>
                  Próximo →
                </button>
              </div>
            )}

            {/* ETAPA 2 */}
            {etapa === 2 && (
              <div className="etapa-content">
                <h3>Detalhes do Golpe</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label>Valor Envolvido (R$)</label>
                    <input
                      type="number"
                      name="valor"
                      value={form.valor}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>

                  <div className="form-group">
                    <label>Data do Ocorrido</label>
                    <input
                      type="date"
                      name="dataOcorrido"
                      value={form.dataOcorrido}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Descrição Detalhada *</label>
                  <textarea
                    name="descricao"
                    value={form.descricao}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Descreva como o golpe aconteceu, quais mensagens recebeu, etc..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Como ficou sabendo que era golpe?</label>
                  <input
                    type="text"
                    name="comoFicouSabendo"
                    value={form.comoFicouSabendo}
                    onChange={handleChange}
                    placeholder="Ex: Liguei para o banco e confirmaram..."
                  />
                </div>

                <div className="botoes-navegacao">
                  <button type="button" className="btn-voltar" onClick={voltarEtapa}>
                    ← Voltar
                  </button>
                  <button type="button" className="btn-proximo" onClick={proximaEtapa}>
                    Próximo →
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 3 */}
            {etapa === 3 && (
              <div className="etapa-content">
                <h3>Confirmação</h3>

                <div className="form-group">
                  <label>Já registrou Boletim de Ocorrência?</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="jaDenunciouPolicia"
                        value="sim"
                        checked={form.jaDenunciouPolicia === "sim"}
                        onChange={handleChange}
                      />
                      <span>Sim</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="jaDenunciouPolicia"
                        value="nao"
                        checked={form.jaDenunciouPolicia === "nao"}
                        onChange={handleChange}
                      />
                      <span>Não</span>
                    </label>
                  </div>
                </div>

                {form.jaDenunciouPolicia === "sim" && (
                  <div className="form-group">
                    <label>Número do Boletim de Ocorrência</label>
                    <input
                      type="text"
                      name="boletimOcorrencia"
                      value={form.boletimOcorrencia}
                      onChange={handleChange}
                      placeholder="Ex: 123456/2024"
                    />
                  </div>
                )}

                <div className="resumo-denuncia">
                  <h4>Resumo da Denúncia</h4>
                  <p><strong>Contato:</strong> {form.contato}</p>
                  <p><strong>Tipo:</strong> {form.tipoGolpe === "outro" ? form.tipoGolpeOutro : "Selecionado da lista"}</p>
                  <p><strong>Banco:</strong> {form.banco === "outro" ? form.nomeBanco : "Selecionado da lista"}</p>
                  {form.valor && <p><strong>Valor:</strong> R$ {form.valor}</p>}
                  {form.dataOcorrido && <p><strong>Data:</strong> {new Date(form.dataOcorrido).toLocaleDateString()}</p>}
                </div>

                <div className="botoes-navegacao">
                  <button type="button" className="btn-voltar" onClick={voltarEtapa}>
                    ← Voltar
                  </button>
                  <button type="submit" className="btn-enviar">
                    ✓ Enviar Denúncia
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default DenunciaElaborada;
