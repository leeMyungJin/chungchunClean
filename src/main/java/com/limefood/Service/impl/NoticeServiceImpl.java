package com.limefood.Service.impl;

import java.util.HashMap;
import java.util.List;

import com.limefood.Mappers.NoticeMapper;
import com.limefood.Service.NoticeService;
import com.limefood.vo.NoticeInfoVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    NoticeMapper noticeMapper;

	@Override
	public void writeNotice(HashMap<String, Object> params) throws Exception {
            noticeMapper.writeNotice(params);        
    }

	@Override
	public List<NoticeInfoVO> searchNotice(HashMap<String, String> params) throws Exception {
		return noticeMapper.searchNotice(params);
	}

	@Override
	public Integer getNotice(HashMap<String, Object> params) throws Exception {
		return noticeMapper.getNotice(params);
	}

	@Override
	public void updateNotice(HashMap<String, Object> params) throws Exception {
		noticeMapper.updateNotice(params);
	}

	@Override
	public void deleteNotice(HashMap<String, Object> params) throws Exception {
		noticeMapper.deleteNotice(params);
	}

	@Override
	public List<NoticeInfoVO> getNoticeList() throws Exception {
		return noticeMapper.getNoticeList();
	}

    
}