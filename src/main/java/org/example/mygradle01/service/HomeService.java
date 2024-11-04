package org.example.mygradle01.service;

import org.example.mygradle01.entity.Home;
import org.example.mygradle01.repository.HomeDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HomeService {
    @Autowired
    private HomeDao homeDao;

    public HomeService(HomeDao homeDao){
        this.homeDao = homeDao; // 생성자 주입
    }

    public List<Home> getAllHomes() {
        return homeDao.findAll(); // HomeDao에서 모든 Home을 가져옴
    }

    public Home addHome(Home newHome) {
        return homeDao.save(newHome); // HomeDao를 통해 새 Home 항목을 저장하고 반환
    }
}
