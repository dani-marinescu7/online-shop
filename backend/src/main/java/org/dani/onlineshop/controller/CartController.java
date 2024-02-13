package org.dani.onlineshop.controller;

import org.dani.onlineshop.model.Cart;
import org.dani.onlineshop.model.Item;
import org.dani.onlineshop.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carts")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public List<Cart> getAllCarts() {
        return cartService.getAllCarts();
    }

    @PostMapping
    public void addCart(@RequestBody Cart cart) {
        cartService.addCart(cart);
    }

    @GetMapping("/{cartId}")
    public Cart getCartById(@PathVariable Long cartId) {
        return cartService.getCardById(cartId);
    }

    @PutMapping
    public Cart addItem(@RequestBody Cart cart, @RequestBody Item item) {
        cartService.addToCart(cart, item);
        return cart;
    }
}
