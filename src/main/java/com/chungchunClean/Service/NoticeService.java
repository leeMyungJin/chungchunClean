package com.chungchunClean.Service;

import com.chungchunClean.vo.NoticeVo;

import java.util.HashMap;
import java.util.List;

public interface NoticeService {
    public HashMap<String, Long> getNoticeMainInfo();

    public List<NoticeVo> getNoticeList(HashMap<String, String> params);

    public void saveNewNotice(HashMap<String,String> params);

    public void updateNotice(HashMap<String, String> params);

    public void deleteNotice(HashMap<String, String> params);

    public List<NoticeVo> getMustNotiList();

    public List<NoticeVo> getFirstNotiList();

    public List<NoticeVo> getNotice(HashMap<String, String> params);
}
