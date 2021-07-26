package com.chungchunClean.Service;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.DailyVo;


public interface DailyService {
	
	public List<DailyVo> getDailyList(HashMap<String,Object> params);
	
	public DailyVo getDailyInfo(HashMap<String,String> params);
	public HashMap<String, Object> getDailylable(HashMap<String,Object> params);

    
}