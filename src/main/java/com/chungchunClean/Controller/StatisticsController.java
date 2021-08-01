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

import com.chungchunClean.Service.StatisticsService;
import com.chungchunClean.vo.CalculateVo;
import com.chungchunClean.vo.StatisticsVo;

@Controller
@RequestMapping("/statistics")
public class StatisticsController {
	
	@Autowired
	StatisticsService statisticsService;
    
    @RequestMapping(value = "/", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveStatistics() {
        return "statistics/statistics";
    }
    
    @RequestMapping(value = "/getStatisticsTotal")
    @ResponseBody
    public List<StatisticsVo> getStatisticsTotal(){
    	return statisticsService.getStatisticsTotal();
    }
    
    @RequestMapping(value = "/getStatisticsTotalPercent")
    @ResponseBody
    public List<StatisticsVo> getStatisticsTotalPercent(){
    	return statisticsService.getStatisticsTotalPercent();
    }
    
    @RequestMapping(value = "/getStatisticsTotal3Month")
    @ResponseBody
    public List<StatisticsVo> getStatisticsTotal3Month(){
    	return statisticsService.getStatisticsTotal3Month();
    }
    
    @RequestMapping(value = "/getStatisticsTotalCost")
    @ResponseBody
    public List<StatisticsVo> getStatisticsTotalCost(){
    	return statisticsService.getStatisticsTotalCost();
    }
    
    @RequestMapping(value = "/getStatisticsAddSubCost")
    @ResponseBody
    public List<StatisticsVo> getStatisticsAddSubCost(){
    	return statisticsService.getStatisticsAddSubCost();
    }
    
}
