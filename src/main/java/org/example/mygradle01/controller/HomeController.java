package org.example.mygradle01.controller;

import org.example.mygradle01.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
	@Autowired
    private HomeService homeService;

    @GetMapping("/")
    public String index() {
        return "index";
    }
}

