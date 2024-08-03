package com.trabalho_03.util.validacaoAutores;

import com.trabalho_03.lojaDeLivros.models.Autor;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class ValidacaoDeAutores implements ConstraintValidator<AutoresConstraint, List<Autor>> {

    @Override
    public void initialize(AutoresConstraint autores) {
    }

    @Override
    public boolean isValid(List<Autor> autores, ConstraintValidatorContext context) {

        ArrayList<String> nomes = new ArrayList<>();

        for (Autor a : autores) {
            nomes.add(a.getNome());
        }

        return new HashSet<>(nomes).size() == nomes.size();

    }
}
