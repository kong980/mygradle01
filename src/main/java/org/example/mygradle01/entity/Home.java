package org.example.mygradle01.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@Table(name="Home")
public class Home {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String item;

    @Column(nullable = false)
    private Timestamp createDate;

    @Column(insertable = false)
    private Timestamp updateDate;

    @Column(nullable = false)
    private String deleted;

    @Column(nullable = false)
    private String process;
}
