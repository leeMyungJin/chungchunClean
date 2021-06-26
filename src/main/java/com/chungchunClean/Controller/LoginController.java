package com.chungchunClean.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/login")
public class LoginController {
    
    @RequestMapping(value = "/main", method = RequestMethod.POST)
    public String moveMain() {
        return "statistics/statistics";
    }
}
