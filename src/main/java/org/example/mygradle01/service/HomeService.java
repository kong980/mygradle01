package org.example.mygradle01.service;

import org.example.mygradle01.repository.HomeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomeService {
    @Autowired
    private HomeDao homeDao;

    public HomeService(HomeDao homeDao){
        this.homeDao = homeDao;
    }

}
