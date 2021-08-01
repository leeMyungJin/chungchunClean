package com.chungchunClean.Mappers;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.BldgVo;
import com.chungchunClean.vo.CodeVo;
import com.chungchunClean.vo.StaffVo;
import com.chungchunClean.vo.StatisticsVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StatisticsMapper  {
	
	public List<StatisticsVo> getStatisticsTotal();
	public List<StatisticsVo> getStatisticsTotalPercent();
	public List<StatisticsVo> getStatisticsTotal3Month();
	public List<StatisticsVo> getStatisticsTotalCost();
	public List<StatisticsVo> getStatisticsAddSubCost();

}
