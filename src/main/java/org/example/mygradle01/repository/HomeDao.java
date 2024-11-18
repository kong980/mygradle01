package org.example.mygradle01.repository;

import org.example.mygradle01.entity.Home;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HomeDao extends JpaRepository<Home, Long> {
    // ID로 항목 찾기
    Optional<Home> findById(Long id);

    @Query("SELECT h FROM Home h WHERE h.deleted= 'N'")
    List<Home> getAllHomes();

    @Query("SELECT h FROM Home h WHERE h.item LIKE CONCAT('%',:item, '%') AND h.deleted='N' ")
    List<Home> getSearchTexts(@Param("item") String item);

    @Query("SELECT h FROM Home h WHERE h.process = :process AND h.deleted='N' ")
    List<Home> getSearchProc(@Param("process") String process);
}
