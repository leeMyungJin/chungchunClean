package com.chungchunClean.Service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chungchunClean.Mappers.ObjectMapper;
import com.chungchunClean.Mappers.StatisticsMapper;
import com.chungchunClean.Service.ObjectService;
import com.chungchunClean.Service.StatisticsService;
import com.chungchunClean.Util.Util;
import com.chungchunClean.vo.BldgVo;
import com.chungchunClean.vo.CalculateVo;
import com.chungchunClean.vo.CodeVo;
import com.chungchunClean.vo.StaffVo;
import com.chungchunClean.vo.StatisticsVo;
import com.chungchunClean.Mappers.LoginMapper;
import com.chungchunClean.Util.Encrypt;

@Service
public class StatisticsServiceImpl implements StatisticsService {

	@Autowired
	private StatisticsMapper statisticsMapper;
	
	@Override
	public List<StatisticsVo> getStatisticsTotal(){
		return statisticsMapper.getStatisticsTotal();
	}
	
	@Override
	public List<StatisticsVo> getStatisticsTotalPercent(){
		return statisticsMapper.getStatisticsTotalPercent();
	}
	
	@Override
	public List<StatisticsVo> getStatisticsTotal3Month(){
		return statisticsMapper.getStatisticsTotal3Month();
	}
	
	@Override
	public List<StatisticsVo> getStatisticsTotalCost(){
		return statisticsMapper.getStatisticsTotalCost();
	}
	
	@Override
	public List<StatisticsVo> getStatisticsAddSubCost(){
		return statisticsMapper.getStatisticsAddSubCost();
	}

	
	
	
}