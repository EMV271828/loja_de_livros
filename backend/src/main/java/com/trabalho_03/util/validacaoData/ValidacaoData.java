package com.trabalho_03.util.validacaoData;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;
import java.time.Month;

public class ValidacaoData implements ConstraintValidator<DataConstraint, LocalDate> {

    @Override
    public void initialize(DataConstraint data) {
    }
    @Override
    public boolean isValid(LocalDate data, ConstraintValidatorContext context) {
        return data.isAfter(LocalDate.of(1800, Month.JANUARY, 1));
    }
}
