package com.limefood.Mappers;

import com.limefood.vo.CustInfoVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {

    public CustInfoVO getPassword(CustInfoVO vo);
    public void updateLoginTime(CustInfoVO vo);
    
}