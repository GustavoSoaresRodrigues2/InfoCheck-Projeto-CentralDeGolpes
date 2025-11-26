package com.example.InfoCheck.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.InfoCheck.entities.Banco;
import com.example.InfoCheck.repository.BancoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BancoService {

    @Autowired
    private BancoRepository repo;

    public List<Banco> listarTodos(){
        return repo.findAll();
    }

    public Banco salvar(Banco banco){
        return repo.save(banco);
    }

    public Banco buscarPorId(Integer id){
        return repo.findById(id).orElse(null);
    }
    
    // NOVO: Buscar banco por nome (case-insensitive)
    public Banco buscarPorNome(String nome) {
        return repo.findByNomeBancoIgnoreCase(nome).orElse(null);
    }
    
    // NOVO: Buscar bancos que contenham o termo (para autocomplete)
    public List<Banco> buscarPorNomeContendo(String termo) {
        return repo.buscarPorNomeContendo(termo);
    }
}
