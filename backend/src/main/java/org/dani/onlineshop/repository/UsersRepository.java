package org.dani.onlineshop.repository;

import org.dani.onlineshop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<User, Long> {
    User save(User save);


}
