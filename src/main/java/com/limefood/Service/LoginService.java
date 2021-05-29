package com.limefood.Service;

import javax.servlet.http.HttpServletRequest;

import com.limefood.vo.CustInfoVO;

public interface LoginService {
    public String logIn();
    public String getPasswordCheck(CustInfoVO vo, HttpServletRequest request);
    public String logOut(HttpServletRequest request);
    public void updateLoginTime(CustInfoVO vo);
    public void autoLogin(String id, HttpServletRequest request);
}