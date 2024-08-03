package com.trabalho_03.util.validacaoAutores;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ValidacaoDeAutores.class)
@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface AutoresConstraint {
    String message() default "O livro possui autores repetidos";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
