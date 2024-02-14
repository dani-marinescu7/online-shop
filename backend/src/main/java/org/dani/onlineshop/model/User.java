package org.dani.onlineshop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.dani.onlineshop.enums.Roles;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "User")
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String username;
    private String email;
    @JsonIgnore
    private String password;
    private String address;
    private String phoneNumber;
    private String paymentInfo;
    private String imagePath;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Cart> carts = new ArrayList<>();
    private Roles role;

    @Override
    public String toString() {
        return "Id: " + id + "\n" +
                "User: " + username + "\n" +
                "Email: " + email + "\n" +
                "Password: " + password + "\n" +
                "Address: " + address + "\n" +
                "Phone number: " + phoneNumber + "\n" +
                "Payment info: " + paymentInfo;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ADMIN"), new SimpleGrantedAuthority("MANAGER"), new SimpleGrantedAuthority("USER"));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getUsername() {
        return email;
    }
}

