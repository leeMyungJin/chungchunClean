package com.chungchunClean.Mappers;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.StockVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StockMapper  {
	public List<StockVo> getStockList(HashMap<String, Object> params);
}
