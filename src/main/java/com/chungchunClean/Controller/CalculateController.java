package com.chungchunClean.Controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.chungchunClean.Service.CalculateService;
import com.chungchunClean.Service.DailyService;
import com.chungchunClean.vo.CalculateVo;
import com.chungchunClean.vo.DailyVo;
import com.chungchunClean.vo.StockVo;

@Controller
@RequestMapping("/calculate")
public class CalculateController {
    
	@Autowired
	CalculateService calculateService;
	
    @RequestMapping(value = "/process", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveProcess(Model model) {
    	
    	model.addAttribute("totalCost", calculateService.getMonTodayCost());
    	model.addAttribute("totalAddCost", calculateService.getAddTodayCost());
    	
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
    
    @RequestMapping(value = "/getClassifiList")
    @ResponseBody
    public List<CalculateVo> getClassifiList(){
    	
    	List<CalculateVo> calculateList = calculateService.getClassifiList();
    	
    	return calculateList;
    }
    
    
    @RequestMapping(value="/deleteMonItem", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void deleteMonItem(@RequestBody List<CalculateVo> params){
    	calculateService.deleteMonItem(params);
    }
    
    @RequestMapping(value="/deleteAddItem", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void deleteAddItem(@RequestBody List<CalculateVo> params){
    	calculateService.deleteAddItem(params);
    }
    
    @RequestMapping(value="/deleteClassifiItem", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void deleteClassifiItem(@RequestBody List<CalculateVo> params){
    	calculateService.deleteClassifiItem(params);
    }
    
    @RequestMapping(value="/saveMon", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveMon(@RequestBody List<CalculateVo> params){
    	calculateService.saveMon(params);
    }
    
    @RequestMapping(value="/saveAdd", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveAdd(@RequestBody List<CalculateVo> params){
    	calculateService.saveAdd(params);
    }

    @RequestMapping(value="/saveClassifi", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveClassifi(@RequestBody List<CalculateVo> params){
    	calculateService.saveClassifi(params);
    }
    
    @RequestMapping(value="/dupCheckClassifi", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public String dupCheckClassifi(@RequestParam HashMap<String,String> params){
        return calculateService.dupCheckClassifi(params); 
    }



}

