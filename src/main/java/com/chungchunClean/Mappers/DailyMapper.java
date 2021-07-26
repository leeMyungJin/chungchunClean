package com.chungchunClean.Mappers;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.DailyVo;
import com.chungchunClean.vo.StaffVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DailyMapper  {
	
	public List<DailyVo> getDailyList(HashMap<String,Object> params);
	
	public DailyVo getDailyInfo(HashMap<String,String> params);
	public HashMap<String, Object> getDailylable(HashMap<String,Object> params);
	
}
