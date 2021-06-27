package com.chungchunClean.Service;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.StockVo;


public interface StockService {
    public List<StockVo> getStockList(HashMap<String,Object> params);
    
}