package com.limefood.Controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.limefood.Service.LoginService;
import com.limefood.vo.CustInfoVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService ;

    //로그인 처리 함수
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@ModelAttribute CustInfoVO vo, HttpServletRequest  request, HttpServletResponse response, Model model) throws Exception {
        String autoLogin = request.getParameter("login_chk");
        request.setAttribute("login_chk", autoLogin);
        String pwdCheck = loginService.getPasswordCheck(vo, request);
        String pageUrl = null;
        switch(pwdCheck){
            case "login_fail" :  // 아이디 , 패스워드 오류
                pageUrl = "/login_fail";
                break;
            case "lock" :  // 유저잠금상태
                pageUrl = "/login_block";
                break;
            case "login" :  // 로그인 성공
                loginService.updateLoginTime(vo);
                pageUrl = "/login_ok";
                break;
            // case "admin":  // 관리자 로그인
            //     System.out.println("관리자 로그인 입니다.");
            //     pageUrl = "/login_admin";
            //     break;
            case "firstLogin" :
                loginService.updateLoginTime(vo);
                model.addAttribute("id", vo.getId());
                pageUrl = "/agree";
                break;
        }
        return pageUrl;
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logout(@ModelAttribute CustInfoVO vo, HttpServletRequest  request, HttpServletResponse response) throws Exception {  
        Cookie[] cookies = request.getCookies();
        if(cookies != null){
            for(Cookie tmpCookie : cookies){
                if(tmpCookie.getName().equals("limefood_id")){
                    tmpCookie.setMaxAge(0);
                    tmpCookie.setPath("/");
                    response.addCookie(tmpCookie);
                }
            }
        }
        loginService.logOut(request);
        return "/logout";

    }  


    @RequestMapping(value = "/autoLogin", method = RequestMethod.POST)
    public String autoLogin(String id, HttpServletRequest  request, HttpServletResponse response) throws Exception {
        loginService.autoLogin(id, request);
        return "/customer/customer01";

    }

}
