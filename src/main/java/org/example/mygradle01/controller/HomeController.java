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

    // HTML 페이지를 반환하기 위한 메서드 (Read)
    @GetMapping("/view") // HTML 뷰를 반환하는 경로
    public ModelAndView index() {
        List<Home> items = homeService.getAllHomes(); // HomeService를 통해 모든 HomeDto를 가져옴
        ModelAndView modelAndView = new ModelAndView("index");
        modelAndView.addObject("items", items); // 아이템 목록을 모델에 추가
        return modelAndView;
    }

    // JSON 형식으로 모든 Home을 반환하는 메서드 (Read)
    @GetMapping("/home") // 기본 경로에 대한 GET 요청
    @ResponseBody // 자동으로 JSON 형식으로 변환하기 위한 어노테이션
    public List<Home> getAllHomes() {
        return homeService.getAllHomes(); // List<Home>가 자동으로 JSON으로 변환되어 클라이언트로 전송됨
    }
    // Json으로 리턴하고 싶으면 이렇게 JsonObject와 JsonArray를 사용해서 Json객체에 데이터를 담아 리턴해주어야 하겠지요 ?
    // 위에 처럼 데이터만 넘겨준다고 JSON 형식으로 절대 뿌려주지 않습니다~ 내가 이렇게 넘겨준다고 다 명시 해주어야지요.

    /*
    @GetMapping("/home")
    public String getAllHomes() throws JSONException {
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        List<Home> list = homeService.getAllHomes();

        for (Home home : list) {
            JSONObject homeJson = new JSONObject();
            homeJson.put("id", home.getId()); // Home의 id 필드
            homeJson.put("item", home.getItem()); // Home의 item 필드
            homeJson.put("createDate", home.getCreateDate()); // Home의 createDate 필드
            homeJson.put("deleted", home.getDeleted()); // Home의 deleted 필드
            jsonArray.put(homeJson); // JSON 객체를 배열에 추가
        }
        jsonObject.put("homes", jsonArray); // 'homes' 키에 배열 추가
        System.out.println(jsonObject.toString()); // JSON 출력
        return jsonObject.toString(); //JSON 문자열 반환
    }
*/
    // 새로운 Home 항목을 추가하는 메서드 (Create)
    @PostMapping("/home") // 기본 경로에 대한 POST 요청
    public Home addHome(@RequestBody Home newHome) {
        return homeService.addHome(newHome); // 새 Home 항목 추가 후 반환
    }

    // 내용 수정 메서드 (Update)
    @PutMapping("/home/update/{id}") // 경로 변수 {id} 사용
    public Home updateHome(@PathVariable Long id, @RequestBody Home updateHome) {
        return homeService.updateHome(id, updateHome); // 업데이트된 Home 객체 반환
    }

    // 내용 삭제 메서드 (Delete)
    @PutMapping("/home/delete/{id}")
    public Home deleteHome(@PathVariable Long id) {
        return homeService.deleteHome(id);
    }

    // 검색 메서드 (Search)
    @GetMapping("/home/search")
    @ResponseBody
    public List<Home> searchItem(@RequestParam(required = false) String item, @RequestParam(required = false) String process) {
        if (item != null) { // 항목으로 검색
            return homeService.getSearchText(item);
        } else { // 나머지는 진행 상태로 검색
            return homeService.getSearchProc(process);
        }
    }
}