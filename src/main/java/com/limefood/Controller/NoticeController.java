package com.limefood.Controller;

import java.util.HashMap;
import java.util.List;

import com.limefood.Service.NoticeService;
import com.limefood.vo.NoticeInfoVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    NoticeService noticeService; 

    /**공지 저장 */
    @RequestMapping(value = "/writeNotice" , method = RequestMethod.POST)
    @ResponseBody
    public void writeNotice(@RequestParam HashMap<String,Object> params) throws Exception {
        // Integer count = noticeService.getNotice(params);
        if(params.get("width").equals(""))
            params.replace("width", "450");
        if(params.get("height").equals(""))
            params.replace("height","750");
        if(!params.get("index").equals(""))
            noticeService.updateNotice(params);
        else
            noticeService.writeNotice(params);
    }

    /**공지 찾기 */
    @RequestMapping(value = "/searchNotice" , method = RequestMethod.POST)
    @ResponseBody
    public List<NoticeInfoVO> searchNotcie(@RequestParam HashMap<String,String> params) throws Exception {
            return  noticeService.searchNotice(params);
    } 
    

    /**공지 삭제 */
    @RequestMapping(value = "/deleteNotice" , method = RequestMethod.POST)
    @ResponseBody
    public void deleteNotice(@RequestParam HashMap<String,Object> params) throws Exception {
             noticeService.deleteNotice(params);
    }      
    

    /**공지 리스트 가져오기 */
    @RequestMapping(value = "/getNoticeList" , method = RequestMethod.POST)
    @ResponseBody
    public List<NoticeInfoVO> getNoticeList(@RequestParam HashMap<String,Object> params) throws Exception {
        return  noticeService.getNoticeList();
    }  
}