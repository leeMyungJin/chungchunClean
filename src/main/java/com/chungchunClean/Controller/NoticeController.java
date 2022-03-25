package com.chungchunClean.Controller;

import com.chungchunClean.Service.NoticeService;
import com.chungchunClean.vo.ImageLink;
import com.chungchunClean.vo.NoticeVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    NoticeService noticeService;

    /**
     * 공지관리 화면
     */
    @RequestMapping(value = "/", method = {RequestMethod.POST , RequestMethod.GET})
    public String disNotice(Model model) {
        HashMap<String, Long> param = noticeService.getNoticeMainInfo();

        model.addAttribute("totalNotice", param.get("totalnotice"));
        model.addAttribute("mustNotice", param.get("mustnotice"));

        return "notice/notice";
    }

    /**
     * 공지 조회
     */
    @GetMapping(value = "/getNoticeList")
    @ResponseBody
    public List<NoticeVo> getNoticeList(@RequestParam HashMap<String, String> params) {
        return noticeService.getNoticeList(params);
    }

    /**
     * 모바일 공지화면
     */
    @GetMapping("/mobile")
    public String mobileNotice(Model model){
        List<NoticeVo> mustNotices = noticeService.getMustNotiList();
        List<NoticeVo> firstNotices = noticeService.getFirstNotiList();

        model.addAttribute("MustInfo", mustNotices);
        model.addAttribute("firstNotice", firstNotices);

        return "/notice/mobile_notice";
    }

    /**
     * 모바일 공지화면 데이터 조회
     */
    @GetMapping(value = "/getNotice")
    @ResponseBody
    public List<NoticeVo> getNotice(@RequestParam HashMap<String, String> params) {
        return noticeService.getNotice(params);
    }

    /**
     * 공지 등록
     */
    @PostMapping(value = "/saveNewNotice")
    @ResponseBody
    public void saveNewNotice(@RequestParam HashMap<String, String> params, HttpServletRequest req) {
        params.put("cretId",req.getSession().getAttribute("staffId").toString());

        noticeService.saveNewNotice(params);
    }

    /**
     * 공지 이미지 업로드
     */
    @PostMapping(value = "/uploadImg")
    @ResponseBody
    public ImageLink uploadImg(@RequestParam("file") MultipartFile multi) {
        try {
            String uploadpath = "/var/upload/img/editor";
            String originFilename = multi.getOriginalFilename();
            String extName = originFilename.substring(originFilename.lastIndexOf("."),originFilename.length());
            long size = multi.getSize();
            String saveFileName = genSaveFileName("") + "_" + originFilename;

            System.out.println("uploadpath : " + uploadpath);
            System.out.println("originFilename : " + originFilename);
            System.out.println("extensionName : " + extName);
            System.out.println("size : " + size);
            System.out.println("saveFileName : " + saveFileName);
            ImageLink link = new ImageLink();
            if(!multi.isEmpty())
            {
                File file = new File(uploadpath, saveFileName);
                if(!file.exists()) // 해당 경로가 없을 경우
                    file.mkdirs();  // 폴더 생성
                multi.transferTo(file);
                String url = "https://chungchunclean.co.kr/img/editor/"+saveFileName;
                link.setFileName(saveFileName);
                link.setUrl(url);
            }
            return link;
        }catch(Exception e)
        {
            System.out.println(e);
        }
        return null;
    }

    /**
     * 공지 수정
     */
    @PutMapping(value = "/updateNotice")
    @ResponseBody
    public void updateNotice(@RequestParam HashMap<String, String> params, HttpServletRequest req) {
        params.put("updtId",req.getSession().getAttribute("staffId").toString());

        noticeService.updateNotice(params);
    }

    /**
     * 공지 삭제
     */
    @DeleteMapping(value = "/deleteNotice")
    @ResponseBody
    public void deleteNotice(@RequestParam HashMap<String, String> params) {
        noticeService.deleteNotice(params);
    }

    // 현재 시간을 기준으로 파일 이름 생성
    private String genSaveFileName(String extName) {
        String fileName = "";

        Calendar calendar = Calendar.getInstance();
        fileName += calendar.get(Calendar.YEAR);
        fileName += calendar.get(Calendar.MONTH);
        fileName += calendar.get(Calendar.DATE);
        fileName += calendar.get(Calendar.HOUR);
        fileName += calendar.get(Calendar.MINUTE);
        fileName += calendar.get(Calendar.SECOND);
        fileName += calendar.get(Calendar.MILLISECOND);
        fileName += extName;

        return fileName;
    }
}
