package com.chungchunClean.Service;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.DailyVo;


public interface DailyService {
	
	public List<DailyVo> getDailyList(HashMap<String,Object> params);
    
}