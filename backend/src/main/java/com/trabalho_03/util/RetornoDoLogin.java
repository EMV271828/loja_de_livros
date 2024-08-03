 package com.trabalho_03.util;

 import com.trabalho_03.lojaDeLivros.models.Carrinho;

 public record RetornoDoLogin(TokenResponse tokenResponse, Long usuarioId, Carrinho carrinho){
 }



