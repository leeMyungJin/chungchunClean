package com.chungchunClean.Mappers;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.StaffVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ObjectMapper  {

	public List<StaffVo> getStaffList(HashMap<String,Object> params);
	
	public String dupCheckId(HashMap<String,String>params);

	public void saveNewStaff(StaffVo vo);
}
