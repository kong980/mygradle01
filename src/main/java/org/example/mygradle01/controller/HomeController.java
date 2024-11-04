package org.example.mygradle01.controller;

import lombok.Getter;
import org.example.mygradle01.entity.Home;
import org.example.mygradle01.service.HomeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
public class HomeController {
	@Autowired
    private HomeService homeService;

    // HTML 페이지를 반환하기 위한 메서드
    @GetMapping("/view") // HTML 뷰를 반환하는 경로
    public ModelAndView index() {
        List<Home> items = homeService.getAllHomes(); // HomeService를 통해 모든 HomeDto를 가져옴
        ModelAndView modelAndView = new ModelAndView("index");
        modelAndView.addObject("items", items); // 아이템 목록을 모델에 추가
        return modelAndView;
    }

    // JSON 형식으로 모든 Home을 반환하는 메서드
    @GetMapping ("/home") // 기본 경로에 대한 GET 요청
    public List<Home> getAllHomes(){
        return homeService.getAllHomes(); // HomeService를 통해 모든 HomeDto를 가져옴
    }

    // 새로운 Home 항목을 추가하는 메서드
    @PostMapping ("/home") // 기본 경로에 대한 POST 요청
    public Home addHome(@RequestBody Home newHome){
        return homeService.addHome(newHome); // 새 Home 항목 추가 후 반환
    }
}