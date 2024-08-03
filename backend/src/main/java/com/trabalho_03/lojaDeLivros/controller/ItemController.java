package com.trabalho_03.lojaDeLivros.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trabalho_03.lojaDeLivros.models.Item;
import com.trabalho_03.lojaDeLivros.models.ItemDTO;
import com.trabalho_03.lojaDeLivros.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("itens")
public class ItemController {

    @Autowired
    private ItemService itemService;


    @PostMapping
    public Item criarItem(@RequestBody Map<String, Map<String, String>> map) throws JsonProcessingException {
        return itemService.criarItem(
                new ObjectMapper().readValue(map.get("data").get("itemDTO"), ItemDTO.class),
                Long.parseLong(map.get("data").get("idDoUsuario"))
        );
    }

    @DeleteMapping("{idItem}")
    public Item deletarItem(@PathVariable("idItem") Long id,
                            @RequestBody Map<String, Long> map) {
        return itemService.deletarItem(id, map.get("usuarioId"));
    }

    @PutMapping
    public ResponseEntity<Item> alterarItem(@RequestBody Item item) {
        Item itemAlterado = itemService.alterarItem(item);
        return new ResponseEntity<>(itemAlterado, HttpStatus.OK);
    }
}
