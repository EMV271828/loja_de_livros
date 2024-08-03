package com.trabalho_03.lojaDeLivros.repository;

import com.trabalho_03.lojaDeLivros.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
