package org.dani.onlineshop.model;


import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
}