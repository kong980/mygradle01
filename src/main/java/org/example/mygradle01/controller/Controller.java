package org.example.mygradle01.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "성준이") String name){
        return String.format("%s 안녕!", name);
    }
}
