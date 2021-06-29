package com.chungchunClean.Service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chungchunClean.Service.DailyService;
import com.chungchunClean.Util.Util;
import com.chungchunClean.vo.DailyVo;
import com.chungchunClean.Mappers.DailyMapper;

@Service
public class DailyServiceImpl implements DailyService {

	@Autowired
	private DailyMapper dailyMapper;
	
	@Override
	public List<DailyVo> getDailyList(HashMap<String,Object> params){
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		                		
		List<DailyVo> dailyList = dailyMapper.getDailyList(params);
		return dailyList;
	}
	
}