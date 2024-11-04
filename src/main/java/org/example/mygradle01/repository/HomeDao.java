package org.example.mygradle01.repository;

import org.example.mygradle01.entity.Home;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HomeDao extends JpaRepository<Home, Integer> {

}
