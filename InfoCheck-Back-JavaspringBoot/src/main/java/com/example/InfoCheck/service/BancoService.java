package com.example.InfoCheck.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.InfoCheck.dtos.BancoDTO;
import com.example.InfoCheck.entities.Banco;
import com.example.InfoCheck.repository.BancoRepository;

import java.util.List;

@Service
public class BancoService {

    @Autowired
    private BancoRepository repo;

    public List<Banco> listarTodos() {
        return repo.findAll();
    }

    public Banco salvar(Banco banco) {
        return repo.save(banco);
    }

    public Banco buscarPorId(Integer id) {
        return repo.findById(id).orElse(null);
    }

    public Banco buscarPorNome(String nome) {
        return repo.findByNomeBancoIgnoreCase(nome).orElse(null);
    }

    public List<Banco> buscarPorNomeContendo(String termo) {
        return repo.buscarPorNomeContendo(termo);
    }

    public Banco criar(BancoDTO dto) {
        Banco banco = new Banco();
        banco.setCnpj(dto.getCnpj());
        banco.setDescricao(dto.getDescricao());
        banco.setNome_banco(dto.getNome_banco());
        banco.setSite_oficial(dto.getSite_oficial());
        return repo.save(banco);
    }
}
