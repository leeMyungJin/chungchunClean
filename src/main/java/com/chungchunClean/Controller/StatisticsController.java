package com.chungchunClean.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/statistics")
public class StatisticsController {
    
    @RequestMapping(value = "/", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveStatistics() {
        return "statistics/statistics";
    }
}
