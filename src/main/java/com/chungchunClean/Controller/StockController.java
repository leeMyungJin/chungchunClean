package com.chungchunClean.Controller;

import java.util.HashMap;
import java.util.List;

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
        model.addAttribute("LCategoryList", stockService.getLCategoryList());
        model.addAttribute("MCategoryList", stockService.getMCategoryList());
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
}
