package com.chungchunClean.Controller;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.Service.StockService;
import com.chungchunClean.vo.StockVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/stock")
public class StockController {

    @Autowired
    StockService stockService;
    
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

    @RequestMapping(value="/getStockList", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public List<StockVo> getStockList(@RequestParam HashMap<String,Object> params){
        return stockService.getStockList(params);
    }

}
