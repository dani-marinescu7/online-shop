package org.dani.onlineshop.service;

import org.dani.onlineshop.enums.Roles;
import org.dani.onlineshop.exceptions.UserNotFoundException;
import org.dani.onlineshop.model.User;
import org.dani.onlineshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void addUser(User user) {
        user.setRole(Roles.USER);
        userRepository.save(user);
    }

   public void deleteUserById(Long id) {
        userRepository.deleteById(id);
   }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUserById(Long userId, User updatedUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        user.setName(updatedUser.getName());
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        user.setAddress(updatedUser.getAddress());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        user.setPaymentInfo(updatedUser.getPaymentInfo());
        user.setImagePath(updatedUser.getImagePath());
        user.setRole(updatedUser.getRole());

        return userRepository.save(user);
    }
}
