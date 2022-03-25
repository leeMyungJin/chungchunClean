package com.chungchunClean.Service.impl;

import com.chungchunClean.Mappers.NoticeMapper;
import com.chungchunClean.Service.NoticeService;
import com.chungchunClean.vo.NoticeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    NoticeMapper noticeMapper;

    @Override
    public HashMap<String, Long> getNoticeMainInfo() {
        return noticeMapper.getNoticeMainInfo();
    }

    @Override
    public List<NoticeVo> getNoticeList(HashMap<String, String> params) {
        return noticeMapper.getNoticeList(params);
    }

    @Override
    public void saveNewNotice(HashMap<String, String> params) {
        noticeMapper.saveNewNotice(params);
    }

    @Override
    public void updateNotice(HashMap<String, String> params) {
        noticeMapper.updateNotice(params);
    }

    @Override
    public void deleteNotice(HashMap<String, String> params) {
        noticeMapper.deleteNotice(params);
    }

    @Override
    public List<NoticeVo> getMustNotiList() {
        return noticeMapper.getMustNotiList();
    }

    @Override
    public List<NoticeVo> getFirstNotiList() {
        return noticeMapper.getFirstNotiList();
    }

    @Override
    public List<NoticeVo> getNotice(HashMap<String, String> params) {
        return noticeMapper.getNotice(params);
    }
}
