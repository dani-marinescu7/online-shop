package org.dani.onlineshop.controller;

import org.dani.onlineshop.model.Transaction;
import org.dani.onlineshop.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping()
    public List<Transaction> getAllUsers() {
        return transactionService.getAllTransactions();
    }

    @PostMapping
    public void addTransaction(@RequestBody Transaction transaction) {
        transactionService.addTransaction(transaction);
    }
}
