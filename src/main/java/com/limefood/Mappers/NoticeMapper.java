package com.limefood.Mappers;

import java.util.HashMap;
import java.util.List;

import com.limefood.vo.NoticeInfoVO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NoticeMapper {

    public void writeNotice(HashMap<String,Object> params);

    public void updateNotice(HashMap<String,Object> params);

    public Integer getNotice(HashMap<String,Object> params);

    public List<NoticeInfoVO> searchNotice(HashMap<String,String> params);

    public void deleteNotice(HashMap<String,Object> params);
    
    public List<NoticeInfoVO> getNoticeList();
    
}