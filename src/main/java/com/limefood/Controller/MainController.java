package com.limefood.Controller;

import java.util.HashMap;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.limefood.Mappers.CustInfoMapper;
import com.limefood.vo.CustInfoVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController{

    @Autowired
    CustInfoMapper custInfoMapper;

    //로그인 화면.
    @RequestMapping(value = "/", method = {RequestMethod.POST , RequestMethod.GET})
    public String intro(HttpServletRequest  request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if(cookies != null){
            for(Cookie tmpCookie : cookies){
                if(tmpCookie.getName().equals("limefood_id")){
                    System.out.println("cookie is exist!!");
                    CustInfoVO regCust = new CustInfoVO();
                    regCust.setId(tmpCookie.getValue());
                    regCust = custInfoMapper.getCustInfo(regCust);
                }
            }
        }
        return "intro";
    }

    /**이용약관 */
    @RequestMapping(value = "/terms", method = {RequestMethod.POST , RequestMethod.GET})
    public String terms(HttpServletRequest  request, HttpServletResponse response) {
        return "customer/terms01";
    }

    /**개인정보보수집약관 */
    @RequestMapping(value = "/personalTerms", method = {RequestMethod.POST , RequestMethod.GET})
    public String personalTerms(HttpServletRequest  request, HttpServletResponse response) {
        return "customer/terms02";

    }

    /**최초 로그인 화면 */
    @RequestMapping(value = "/agree" )
    public String agree(HttpServletRequest req, HttpServletResponse res, HashMap<String,String> params){
        return "/agree";
    }


}
