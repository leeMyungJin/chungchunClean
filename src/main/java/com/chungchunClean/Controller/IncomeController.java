package com.chungchunClean.Controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.chungchunClean.Service.IncomeService;
import com.chungchunClean.vo.CalculateVo;

@Controller
@RequestMapping("/income")
public class IncomeController {
	
    
	@Autowired
	IncomeService incomeService;
    
    @RequestMapping(value = "/", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveHistory(Model model) {
    	
    	model.addAttribute("totalCost", incomeService.getMonTodayCost());
    	
        return "income/income";
    }
    
    @RequestMapping(value = "/getIncomeList")
    @ResponseBody
    public List<CalculateVo> getIncomeList(@RequestParam HashMap<String,Object> params){
    	
    	List<CalculateVo> calculateList = incomeService.getIncomeList(params);
    	
    	return calculateList;
    }
    
    @RequestMapping(value = "/getIncomelableCost")
    @ResponseBody
    public HashMap<String,Object> getIncomelableCost(@RequestParam HashMap<String,Object> params){
    	
    	return incomeService.getIncomelableCost(params);
    }
}
