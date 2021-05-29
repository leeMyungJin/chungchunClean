package com.limefood.Service;

import java.util.HashMap;
import java.util.List;

import com.limefood.vo.NoticeInfoVO;

public interface NoticeService {

    public void writeNotice(HashMap<String,Object> params) throws Exception;

    public void updateNotice(HashMap<String,Object> params) throws Exception;

    public Integer getNotice(HashMap<String,Object> params) throws Exception;
    
    public List<NoticeInfoVO> searchNotice(HashMap<String,String> params) throws Exception;
    
    public void deleteNotice(HashMap<String,Object> params) throws Exception;

    public List<NoticeInfoVO> getNoticeList() throws Exception;
}
