package com.chungchunClean.Service;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.BldgVo;
import com.chungchunClean.vo.CalculateVo;
import com.chungchunClean.vo.CodeVo;
import com.chungchunClean.vo.StaffVo;
import com.chungchunClean.vo.StatisticsVo;


public interface StatisticsService {
	
	public List<StatisticsVo> getStatisticsTotal();
	public List<StatisticsVo> getStatisticsTotalPercent();
	public List<StatisticsVo> getStatisticsTotal3Month();
	public List<StatisticsVo> getStatisticsTotalCost();
	public List<StatisticsVo> getStatisticsAddSubCost();


}