package com.limefood.Service;

import java.util.List;

import com.limefood.vo.ProdInfoVO;

public interface ProdInfoService {
    public List<ProdInfoVO> getProdInfoList(String id,String prod, String date);
  
}