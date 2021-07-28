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

import com.chungchunClean.Service.DailyService;
import com.chungchunClean.vo.DailyVo;

@Controller
@RequestMapping("/daily")
public class DailyController {
    
	@Autowired
	DailyService dailyService;
	
    @RequestMapping(value = "/", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveDaily(Model model) {
    	return "daily/daily";
    }
    
    @RequestMapping(value = "/getDailylable")
    @ResponseBody
    public HashMap<String,Object> getDailylable(@RequestParam HashMap<String,Object> params){
    	
    	return dailyService.getDailylable(params);
    }
    
    @RequestMapping(value = "/getDailyList")
    @ResponseBody
    public List<DailyVo> getStaffList(@RequestParam HashMap<String,Object> params){
    	
    	List<DailyVo> dailyList = dailyService.getDailyList(params);
    	
    	return dailyList;
    }
    
    @RequestMapping(value = "/p_site")
    public String popSite(@RequestParam HashMap<String, String> params, Model model){
    	
    	DailyVo dailyInfo = dailyService.getDailyInfo(params);
    	
    	model.addAttribute("dailyInfo", dailyInfo);
    	model.addAttribute("imgPath", dailyInfo.getImgPath());
    	
    	return "daily/p_site";
    }
}
