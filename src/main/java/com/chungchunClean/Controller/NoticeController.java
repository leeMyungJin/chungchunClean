package com.chungchunClean.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/notice")
public class NoticeController {
    /**
     * 공지관리 화면
     */
    @RequestMapping(value = "/", method = {RequestMethod.POST , RequestMethod.GET})
    public String disNotice(Model model) {
        return "notice/notice";
    }

}
