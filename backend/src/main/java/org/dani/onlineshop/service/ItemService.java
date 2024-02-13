package org.dani.onlineshop.service;


import org.dani.onlineshop.exceptions.ItemNotFoundException;
import org.dani.onlineshop.model.Item;
import org.dani.onlineshop.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }
    public void addItem(Item item) {
        itemRepository.save(item);
    }
    public void addItems(List<Item> items) {
        itemRepository.saveAll(items);
    }
    public void deleteItemById(Long id) {
        itemRepository.deleteById(id);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Optional<Item> getItemById(Long itemId) {
        return itemRepository.findById(itemId);
    }

    public Item updateItem(Long itemId, Item updatedItem) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ItemNotFoundException("Item not found with ID: " + itemId));

        item.setName(updatedItem.getName());
        item.setPrice(updatedItem.getPrice());
        item.setImagePath(updatedItem.getImagePath());
        item.setCategory(updatedItem.getCategory());
        item.setDescription(updatedItem.getDescription());

        return itemRepository.save(item);
    }

    public Item visibilityToggle(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ItemNotFoundException("Item not found with ID: " + itemId));

        item.setVisibility(!item.isVisibility());

        return itemRepository.save(item);
    }

}
