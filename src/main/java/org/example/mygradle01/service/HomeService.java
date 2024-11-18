package org.example.mygradle01.service;

import org.example.mygradle01.entity.Home;
import org.example.mygradle01.repository.HomeDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class HomeService {
    @Autowired
    private HomeDao homeDao;

    public HomeService(HomeDao homeDao) {
        this.homeDao = homeDao; // 생성자 주입
    }

    // 조회 (Read)
    public List<Home> getAllHomes() {
        return homeDao.getAllHomes(); // HomeDao에서 모든 Home을 가져옴
    }

    // 추가 (Create)
    public Home addHome(Home newHome) {
        return homeDao.save(newHome); // HomeDao를 통해 새 Home 항목을 저장하고 반환
    }

    // 수정 (Update)
    public Home updateHome(Long id, Home updateHome) {
        // DB에서 항목 찾기
        Home existingHome = homeDao.findById(id).orElse(null);

        // 항목이 존재하지 않을 경우 예외 처리
        if (existingHome == null) {
            // 예외 처리 함수 호출
            handleNotFound(id);
        }

        // 항목 수정
        existingHome.setItem(updateHome.getItem()); // 내용 수정
        existingHome.setProcess(updateHome.getProcess()); // 진행 상태 수정
        existingHome.setUpdateDate(new Timestamp(System.currentTimeMillis())); // updateDate를 현재 시간으로 설정

        // 수정된 객체 저장
        return homeDao.save(existingHome); // HomeDao의 save 메서드 사용
    }

    // 삭제(Delete)
    public Home deleteHome(Long id) {
        // DB에서 항목 찾기
        Home existingHome = homeDao.findById(id).orElse(null);

        // 항목이 존재하지 않을 경우 예외 처리
        if (existingHome == null) {
            // 예외 처리 함수 호출
            handleNotFound(id);
        }

        // 항목 수정
        existingHome.setDeleted("Y");
        existingHome.setUpdateDate(new Timestamp(System.currentTimeMillis())); // 현재 시간으로 설정

        return homeDao.save(existingHome);
    }

        // 항목 검색
    public List<Home> getSearchText(String item){
        return homeDao.getSearchTexts(item);
    }

        // 진행 상태 검색
    public List<Home> getSearchProc(String process){
        return homeDao.getSearchProc(process);
    }

    private void handleNotFound(Long id) {
        // 예외 처리 로직
        System.out.println("Home not found with id : " + id);
        throw new RuntimeException("Home not found with id : " + id); // 예외 던지기
    }
}
