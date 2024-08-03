package com.trabalho_03.util.validacaoData;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;


@Documented
@Constraint(validatedBy = ValidacaoData.class)
@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface DataConstraint {
    String message() default "A data não poder anterior a 01/01/1800";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

