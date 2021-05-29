package com.limefood.Mappers;

import java.util.List;

import com.limefood.vo.ProdInfoVO;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ProdInfoMapper {
    public List<ProdInfoVO> getProdInfoList(@Param(value="id")String id, @Param(value="prod")List<String> prod, @Param(value="date") String date);


    
}