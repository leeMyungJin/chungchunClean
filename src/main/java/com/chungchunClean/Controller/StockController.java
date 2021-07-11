package com.chungchunClean.Controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chungchunClean.Service.StockService;
import com.chungchunClean.vo.StockVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
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
    public String moveCode( Model model) {
        model.addAttribute("totalItemCnt", stockService.getTotalItemCnt());
        return "stock/stock_code";
    }
    
    @RequestMapping(value = "/current", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveCurrent(HttpServletRequest req, HttpServletResponse res) {
    	//stored and released
    	req.setAttribute("todayStore", stockService.getTodayStore());
    	req.setAttribute("todayRelease", stockService.getTodayRelease());
    	req.setAttribute("todayReturnStore", stockService.getTodayReturnStore());
    	req.setAttribute("todayReturnRelease", stockService.getTodayReturnRelease());
    	
        return "stock/stock_current";
    }
    
    @RequestMapping(value = "/stock", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveStock() {
        return "stock/stock_stock";
    }
    /**
     * 코드 리스트 가져오기
     * @param params
     * @return
     */
    @RequestMapping(value="/getStockList", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public List<StockVo> getStockList(@RequestParam HashMap<String,Object> params){
        return stockService.getStockList(params);
    }

    /**
     * 카테고리 리스트 가져오기
     * 
     * @return
     */
    @RequestMapping(value="/getCategoryList", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public List<StockVo> getCategoryList(){
        return stockService.getCategoryList();
    }

     /**
     * 카테고리 삭제하기
     * 
     * @return
     */
    @RequestMapping(value="/deleteCategory", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void deleteCategory(@RequestBody List<StockVo> params){
        stockService.deleteCategory(params);
    }

    /**
     * 카테고리 저장하기
     * 
     * @return
     */
    @RequestMapping(value="/saveCategory", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public List<StockVo> saveCategory(@RequestBody List<StockVo> params){
        stockService.saveCategory(params);
        return stockService.getCategoryList(); // 카테고리 저장 후 다시 조회
    }

    /**
     * 대카테고리 리스트 가져오기
     */
    @RequestMapping(value="/getLCategoryList", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public List<StockVo> getLCategoryList(){
        return stockService.getLCategoryList(); // 카테고리 저장 후 다시 조회
    }

    /**
     * 중카테고리 리스트 가져오기
     */
    @RequestMapping(value="/getMCategoryList", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public List<StockVo> getMCategoryList(){
        return stockService.getMCategoryList(); // 카테고리 저장 후 다시 조회
    }    

    /**
     * 물품 중복 확인
     */
    @RequestMapping(value="/dupCheckItem", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public String dupCheckItem(@RequestParam HashMap<String,String> params){
        return stockService.dupCheckItem(params); // 카테고리 저장 후 다시 조회
    }

    /**
     * 물품 등록 
     */
    @RequestMapping(value="/addItem", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void addItem(@RequestParam HashMap<String,String> params){
        
        stockService.addItem(params); // 카테고리 저장 후 다시 조회
    }

    /**
     * 물품 삭제하기
     * 
     * @return
     */
    @RequestMapping(value="/deleteItem", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void deleteItem(@RequestBody List<StockVo> params){
        stockService.deleteItem(params);
    }

    /**
     * 물품 저장하기
     * 
     * @return
     */
    @RequestMapping(value="/saveStock", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveStock(@RequestBody List<StockVo> params){
        stockService.saveStock(params);
        // return stockService.getStockList(params); // 카테고리 저장 후 다시 조회
    }

    /**
     * 재고수량 저장하기
     * @param params
     * @return
     */
    @RequestMapping(value="/saveQuantity", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveQuantity(@RequestBody StockVo params){
        stockService.saveQuantity(params);
        // return stockService.getStockList(params); // 카테고리 저장 후 다시 조회
    }
    // 재고관리 - 입출관리 화면
    /**
     * 입출 리스트 가져오기
     * @param params
     * @return
     */
    @RequestMapping(value="/getStockCurrentList", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public List<StockVo> getStockCurrentList(@RequestParam HashMap<String,Object> params){
        return stockService.getStockCurrentList(params);
    }
    

    /**
     * 입출 삭제
     * 
     * @return
     */
    @RequestMapping(value="/deleteStockCurrent", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void deleteStockCurrent(@RequestBody List<StockVo> params){
        stockService.deleteStockCurrent(params);
    }

    /**
     * 입출 저장
     * 
     * @return
     */
    @RequestMapping(value="/saveStockCurrent", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveStockCurrent(@RequestBody List<StockVo> params){
        stockService.saveStockCurrent(params);
        // return stockService.getStockList(params); // 카테고리 저장 후 다시 조회
    }
    



}
