package com.chungchunClean.Mappers;


import com.chungchunClean.vo.StaffVo;

import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper  {
	public StaffVo getPassword(StaffVo vo);
    public void updateLoginTime(StaffVo vo);
    
    public String getUserToken(HashMap<String, String> params);
}
