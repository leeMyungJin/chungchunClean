package com.chungchunClean.Service;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.StockVo;


public interface StockService {
    public List<StockVo> getStockList(HashMap<String,Object> params);
    public List<StockVo> getCategoryList();
    public void deleteCategory(List<StockVo> params);
    public void saveCategory(List<StockVo> params);
    public List<StockVo> getLCategoryList();
    public List<StockVo> getMCategoryList();
    public String dupCheckItem(HashMap<String, String> params);
    public void addItem(HashMap<String, String> params);
    public void deleteItem(List<StockVo> params);
}

