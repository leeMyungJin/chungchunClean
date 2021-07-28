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
    public String moveProcess() {
        return "calculate/calculate_process";
    }
    
    @RequestMapping(value = "/history", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveHistory(Model model) {
    	
    	model.addAttribute("totalCost", calculateService.getMonTotalCost());
    	model.addAttribute("totalAddCost", calculateService.getAddTotalCost());
    	
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
    
    
    @RequestMapping(value = "/getMonTotalCost")
    @ResponseBody
    public HashMap<String,Object> getMonTotalCost(){
    	return calculateService.getMonTotalCost();
    }
    
    @RequestMapping(value = "/getAddList")
    @ResponseBody
    public List<CalculateVo> getAddList(@RequestParam HashMap<String,Object> params){
    	
    	List<CalculateVo> calculateList = calculateService.getAddList(params);
    	
    	return calculateList;
    }
     
    @RequestMapping(value = "/getAddlableCost")
    @ResponseBody
    public HashMap<String,Object> getAddlableCost(@RequestParam HashMap<String,Object> params,Model model){
    	return calculateService.getAddlableCost(params);
    }
    
    @RequestMapping(value = "/getAddTotalCost")
    @ResponseBody
    public HashMap<String,Object> getAddTotalCost(){
    	return calculateService.getAddTotalCost();
    }
    
    @RequestMapping(value = "/getClassifiList")
    @ResponseBody
    public List<CalculateVo> getClassifiList(@RequestParam HashMap<String,Object> params){
    	
    	List<CalculateVo> calculateList = calculateService.getClassifiList(params);
    	
    	return calculateList;
    }
    
    @RequestMapping(value = "/getItemList")
    @ResponseBody
    public List<CalculateVo> getItemList(@RequestParam HashMap<String,Object> params){
    	
    	List<CalculateVo> calculateList = calculateService.getItemList(params);
    	
    	return calculateList;
    }
    
    
    @RequestMapping(value = "/getBldgList")
    @ResponseBody
    public List<CalculateVo> getBldgList(@RequestParam HashMap<String,Object> params){
    	
    	List<CalculateVo> calculateList = calculateService.getBldgList(params);
    	
    	return calculateList;
    }
    
    
    @RequestMapping(value="/deleteAdd", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void deleteAdd(@RequestBody List<CalculateVo> params){
    	calculateService.deleteAdd(params);
    }
    
    @RequestMapping(value="/deleteClassifi", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void deleteClassifi(@RequestBody List<CalculateVo> params){
    	calculateService.deleteClassifi(params);
    }
    
    @RequestMapping(value="/deleteItem", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void deleteItem(@RequestBody List<CalculateVo> params){
    	calculateService.deleteItem(params);
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
        // return stockService.getStockList(params); // 카테고리 저장 후 다시 조회
    }

    @RequestMapping(value="/saveUpdateAdd", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveUpdateAdd(@RequestBody List<CalculateVo> params){
    	calculateService.saveUpdateAdd(params);
    }
  

    @RequestMapping(value="/saveClassifi", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveClassifi(@RequestBody List<CalculateVo> params){
    	calculateService.saveClassifi(params);
    }
    
    @RequestMapping(value="/saveItem", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveItem(@RequestBody List<CalculateVo> params){
    	calculateService.saveItem(params);
    }

    @RequestMapping(value = "/getPopSpecification")
    public String getPopSpecification(HttpServletRequest req, Model model){
    	String bldgNm = req.getParameter("bldgNm");
    	
    	List<CalculateVo> calculateList = calculateService.getPopSpecification(bldgNm);
    	model.addAttribute("cretDt", calculateList.get(0).getCretDt());
    	model.addAttribute("totalCost", calculateList.get(0).getTotalCost());
    	model.addAttribute("bldgNm", calculateList.get(0).getBldgNm());
    	model.addAttribute("addSpecInfo", calculateList);
    	
    	return "calculate/p_specification";
    }
    


}

