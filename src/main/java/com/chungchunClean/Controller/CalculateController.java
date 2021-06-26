package com.chungchunClean.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/calculate")
public class CalculateController {
    
    @RequestMapping(value = "/process", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveProcess() {
        return "calculate/calculate_process";
    }
    
    @RequestMapping(value = "/history", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveHistory() {
        return "calculate/calculate_history";
    }
}
