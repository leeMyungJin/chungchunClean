package com.limefood.Service.impl;

import java.util.List;

import com.limefood.Mappers.ProdInfoMapper;
import com.limefood.Service.ProdInfoService;
import com.limefood.Util.Util;
import com.limefood.vo.ProdInfoVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProdInfoServiceImpl implements ProdInfoService {

    @Autowired
	ProdInfoMapper prodInfoMapper ;

	@Override
	public List<ProdInfoVO> getProdInfoList(String id, String prod, String date) {
		return prodInfoMapper.getProdInfoList(id, Util.makeForeach(prod, ","), date);
	}
	
 
}