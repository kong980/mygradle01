package org.example.mygradle01.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HomeDto {
    private Integer id;
    private String item;
    private Timestamp createDate;
    private Timestamp updateDate;
    private String deleted;

}
