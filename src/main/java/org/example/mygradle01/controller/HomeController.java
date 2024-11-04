package org.example.mygradle01.controller;

import lombok.Getter;
import org.example.mygradle01.entity.Home;
import org.example.mygradle01.service.HomeService;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
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
//    @GetMapping ("/home") // 기본 경로에 대한 GET 요청
//    public List<Home> getAllHomes(){
//        return homeService.getAllHomes(); // HomeService를 통해 모든 HomeDto를 가져옴
//    }
    // Json으로 리턴하고 싶으면 이렇게 JsonObject와 JsonArray를 사용해서 Json객체에 데이터를 담아 리턴해주어야 하겠지요 ?
    // 위에 처럼 데이터만 넘겨준다고 JSON 형식으로 절대 뿌려주지 않습니다~ 내가 이렇게 넘겨준다고 다 명시 해주어야지요.
    @GetMapping("/home")
    public String getAllHomes() throws JSONException {
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        List<Home> list = homeService.getAllHomes();
        for(int i = 0; i < list.size(); i++) {
            jsonArray.put(list.get(i));
        }
        jsonObject.put("homes", jsonArray);
        return jsonObject.toString();
    }

    // 새로운 Home 항목을 추가하는 메서드
    @PostMapping ("/home") // 기본 경로에 대한 POST 요청
    public Home addHome(@RequestBody Home newHome){
        return homeService.addHome(newHome); // 새 Home 항목 추가 후 반환
    }
}