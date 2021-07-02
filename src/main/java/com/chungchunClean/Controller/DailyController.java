package com.chungchunClean.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/daily")
public class DailyController {
    
    @RequestMapping(value = "/", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveDaily() {
        return "daily/daily";
    }
}
