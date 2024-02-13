package org.dani.onlineshop.repository;

import org.dani.onlineshop.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Item save(Item item);


}
