package com.example.InfoCheck.service;

import com.example.InfoCheck.dtos.DenunciaDTO;
import com.example.InfoCheck.entities.Banco;
import com.example.InfoCheck.entities.Denuncia;
import com.example.InfoCheck.entities.TipoGolpe;
import com.example.InfoCheck.entities.Usuario;
import com.example.InfoCheck.repository.BancoRepository;
import com.example.InfoCheck.repository.DenunciaRepository;
import com.example.InfoCheck.repository.TipoGolpeRepository;
import com.example.InfoCheck.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DenunciaService {

    @Autowired
    private DenunciaRepository denunciaRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private BancoRepository bancoRepo;

    @Autowired
    private TipoGolpeRepository tipoGolpeRepo;

    /**
     * Cria uma denúncia com suporte a valores customizados
     * 
     * LÓGICA:
     * - Tipo de Golpe: Se idTipoGolpe = null, usa tipoGolpeOutro (campo de texto)
     * - Banco: Se idBanco = null, usa nomeBanco (campo de texto)
     */
    public Denuncia criar(DenunciaDTO dto) {
        // Buscar usuário (obrigatório)
        Usuario usuario = usuarioRepo.findById(dto.getIdUsuario())
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Denuncia denuncia = new Denuncia();
        denuncia.setUsuario(usuario);
        denuncia.setContatoDenunciado(dto.getContatoDenunciado());
        denuncia.setDescricao(dto.getDescricao());

        // ===== LÓGICA PARA TIPO DE GOLPE =====
        if (dto.getIdTipoGolpe() != null) {
            // Usuário selecionou da lista
            TipoGolpe tipo = tipoGolpeRepo.findById(dto.getIdTipoGolpe())
                .orElse(null);
            denuncia.setTipoGolpe(tipo);
            denuncia.setTipoGolpeOutro(null); // Garante que está vazio
        } else {
            // Usuário escolheu "Outro" e digitou
            denuncia.setTipoGolpe(null);
            denuncia.setTipoGolpeOutro(dto.getTipoGolpeOutro());
        }

        // ===== LÓGICA PARA BANCO =====
        if (dto.getIdBanco() != null) {
            // Usuário selecionou da lista
            Banco banco = bancoRepo.findById(dto.getIdBanco())
                .orElse(null);
            denuncia.setBanco(banco);
            denuncia.setNomeBancoOutro(null); // Garante que está vazio
        } else {
            // Usuário digitou o nome do banco
            denuncia.setBanco(null);
            denuncia.setNomeBancoOutro(dto.getNomeBanco());
        }

        return denunciaRepo.save(denuncia);
    }

    public List<Denuncia> listarTodas() {
        return denunciaRepo.findAll();
    }

    public List<Denuncia> listarPorBanco(Integer idBanco) {
        return denunciaRepo.findByBancoId(idBanco);
    }

    public List<Denuncia> listarPorCpf(String cpf) {
        return denunciaRepo.findByUsuarioCpf(cpf);
    }
}
