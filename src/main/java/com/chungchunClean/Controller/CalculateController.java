package com.chungchunClean.Controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.chungchunClean.Service.CalculateService;
import com.chungchunClean.Service.DailyService;
import com.chungchunClean.vo.CalculateVo;
import com.chungchunClean.vo.DailyVo;

@Controller
@RequestMapping("/calculate")
public class CalculateController {
    
	@Autowired
	CalculateService calculateService;
	
    @RequestMapping(value = "/process", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveProcess() {
        return "calculate/calculate_process";
    }
    
    @RequestMapping(value = "/history", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveHistory(Model model) {
    	
    	model.addAttribute("totalCost", calculateService.getMonTodayCost());
    	model.addAttribute("totalAddCost", calculateService.getAddTodayCost());
    	
        return "calculate/calculate_history";
    }
    
    @RequestMapping(value = "/getMonList")
    @ResponseBody
    public List<CalculateVo> getMonList(@RequestParam HashMap<String,Object> params){
    	
    	List<CalculateVo> calculateList = calculateService.getMonList(params);
    	
    	return calculateList;
    }
    
    @RequestMapping(value = "/getMonlableCost")
    @ResponseBody
    public HashMap<String,Object> getMonlableCost(@RequestParam HashMap<String,Object> params){
    	
    	return calculateService.getMonlableCost(params);
    }
    
    @RequestMapping(value = "/getAddList")
    @ResponseBody
    public List<CalculateVo> getAddList(@RequestParam HashMap<String,Object> params){
    	
    	List<CalculateVo> calculateList = calculateService.getAddList(params);
    	
    	return calculateList;
    }
    
    @RequestMapping(value = "/getAddlableCost")
    @ResponseBody
    public HashMap<String,Object> getAddlableCost(@RequestParam HashMap<String,Object> params){
    	
    	return calculateService.getAddlableCost(params);
    }
}

