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

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DenunciaService {

    private final DenunciaRepository denunciaRepo;
    private final UsuarioRepository usuarioRepo;
    private final BancoRepository bancoRepo;
    private final TipoGolpeRepository tipoGolpeRepo;

    public DenunciaService(
            DenunciaRepository denunciaRepo,
            UsuarioRepository usuarioRepo,
            BancoRepository bancoRepo,
            TipoGolpeRepository tipoGolpeRepo) {
        this.denunciaRepo = denunciaRepo;
        this.usuarioRepo = usuarioRepo;
        this.bancoRepo = bancoRepo;
        this.tipoGolpeRepo = tipoGolpeRepo;
    }

    // ==========================================
    // 🔹 CRIAR DENÚNCIA
    // ==========================================
    public Denuncia criar(DenunciaDTO dto) {

        // Buscar usuário (obrigatório)
        Usuario usuario = usuarioRepo.findById(dto.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Denuncia denuncia = new Denuncia();

        denuncia.setUsuario(usuario);
        denuncia.setContatoDenunciado(dto.getContatoDenunciado());
        denuncia.setDescricao(dto.getDescricao());
        denuncia.setValor(dto.getValor());
        denuncia.setBoletim(dto.getBoletim());
        denuncia.setComoSoube(dto.getComoSoube());
        denuncia.setDataGolpeOcorrido(dto.getDataGolpeOcorrido());

        // ============================
        // TIPO DE GOLPE
        // ============================
        if (dto.getIdTipoGolpe() != null) {
            TipoGolpe tipo = tipoGolpeRepo.findById(dto.getIdTipoGolpe())
                    .orElse(null);

            denuncia.setTipoGolpe(tipo);
            denuncia.setTipoGolpeOutro(null);
        } else {
            denuncia.setTipoGolpe(null);
            denuncia.setTipoGolpeOutro(dto.getTipoGolpeOutro());
        }

        // ============================
        // BANCO
        // ============================
        if (dto.getIdBanco() != null) {
            Banco banco = bancoRepo.findById(dto.getIdBanco())
                    .orElse(null);

            denuncia.setBanco(banco);
            denuncia.setNomeBancoOutro(null);
        } else {
            denuncia.setBanco(null);
            denuncia.setNomeBancoOutro(dto.getNomeBancoOutro());
        }

        return denunciaRepo.save(denuncia);
    }

    // ==========================================
    // 🔹 LISTAR
    // ==========================================
    public List<Denuncia> listarTodas() {
        return denunciaRepo.findAll();
    }

    public List<Denuncia> listarPorBanco(Integer idBanco) {
        return denunciaRepo.findByBancoId(idBanco);
    }

    public List<Denuncia> listarPorCpf(String cpf) {
        return denunciaRepo.findByUsuarioCpf(cpf);
    }

    public List<Denuncia> listarPorIdUsuario(Integer idUsuario) {
        return denunciaRepo.findByUsuarioId(idUsuario);
    }

    public List<Denuncia> listarPorTipo(Integer idTipo) {
        return denunciaRepo.findByTipoId(idTipo);
    }

    // ==========================================
    // 🔹 BUSCA POR DATA
    // ==========================================
    public List<Denuncia> listarPorMesAno(int ano, int mes) {
        return denunciaRepo.findByAnoMes(ano, mes);
    }

    public List<Denuncia> listarEntreDatas(LocalDate inicio, LocalDate fim) {

        LocalDateTime inicioDT = inicio.atStartOfDay();
        LocalDateTime fimDT = fim.atTime(23, 59, 59);

        return denunciaRepo.findBetweenDates(inicioDT, fimDT);
    }

    public List<Denuncia> buscarPorUsuario(Integer idUsuario) {
        return denunciaRepo.findByUsuarioId(idUsuario);
    }

    public List<Denuncia> listarDenunciasPorUsuario(Integer idUsuario) {
        return denunciaRepo.findByUsuarioOrderByDataDenunciaDesc(idUsuario);
    }

}
