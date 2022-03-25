package com.chungchunClean.Mappers;

import com.chungchunClean.vo.NoticeVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface NoticeMapper {
    public HashMap<String, Long> getNoticeMainInfo();

    public List<NoticeVo> getNoticeList(HashMap<String, String> params);

    public void saveNewNotice(HashMap<String,String> params);

    public void updateNotice(HashMap<String, String> params);

    public void deleteNotice(HashMap<String, String> params);

    public List<NoticeVo> getMustNotiList();

    public List<NoticeVo> getFirstNotiList();

    public List<NoticeVo> getNotice(HashMap<String, String> params);

}
