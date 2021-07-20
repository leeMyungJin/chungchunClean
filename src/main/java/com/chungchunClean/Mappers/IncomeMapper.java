package com.chungchunClean.Mappers;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.CalculateVo;
import com.chungchunClean.vo.DailyVo;
import com.chungchunClean.vo.StaffVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IncomeMapper  {
	
	public List<CalculateVo> getIncomeList(HashMap<String,Object> params);
	public HashMap<String, Object> getIncomeTodayCost();
	public HashMap<String, Object> getIncomelableCost(HashMap<String,Object> params);

}
