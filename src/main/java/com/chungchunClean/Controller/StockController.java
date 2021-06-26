package com.chungchunClean.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/stock")
public class StockController {
    
    @RequestMapping(value = "/code", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveCode() {
        return "stock/stock_code";
    }
    
    @RequestMapping(value = "/current", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveCurrent() {
        return "stock/stock_current";
    }
    
    @RequestMapping(value = "/stock", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveStock() {
        return "stock/stock_stock";
    }
}
