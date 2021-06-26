package com.chungchunClean.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/income")
public class IncomeController {
    
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String moveIncome() {
        return "income/income";
    }
}
