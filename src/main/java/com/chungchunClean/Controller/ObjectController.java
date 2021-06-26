package com.chungchunClean.Controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.chungchunClean.Service.ObjectService;
import com.chungchunClean.vo.StaffVo;
import com.chungchunClean.Util.Encrypt;


@Controller
@RequestMapping("/object")
public class ObjectController {
	
	@Autowired
	ObjectService objectService;
    
    @RequestMapping(value = "/building", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveBuilding() {
        return "object/building";
    }
    
    @RequestMapping(value = "/staff", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveStaff(HttpServletRequest req, HttpServletResponse res) {
    	
    	req.setAttribute("totalStaff", objectService.getTotalStaff());
    	req.setAttribute("totalAdmin", objectService.getTotalAdmin());
    	
        return "object/staff";
    }
    
    @RequestMapping(value = "/getStaffList")
    @ResponseBody
    public List<StaffVo> getStaffList(@RequestParam HashMap<String,Object> params){
    	
    	List<StaffVo> staffList = objectService.getStaffList(params);
    	
    	return staffList;
    }
    
    /** 아이디 중복확인 */
    @RequestMapping(value = "/dupCheckId")
    @ResponseBody
    public String dupCheckId(@RequestParam HashMap<String,String> params){
            return objectService.dupCheckId(params);
    }    
    
    /**직원 등록 */
    @RequestMapping(value = "/saveNewStaff")
    public void saveNewStaff(HttpServletRequest req, HttpServletResponse res){
    	StaffVo staffInfo = new StaffVo();
        HttpSession session = req.getSession();


        // salt + SHA512 암호화 적용
        String password = req.getParameter("password");
        String password_key = Encrypt.getSaltKey();
        password = Encrypt.setSHA512(password, password_key);

        staffInfo.setStaffId(req.getParameter("id"));
        staffInfo.setStaffPass(password);
        staffInfo.setStaffName(req.getParameter("name"));
        staffInfo.setStaffPnum(req.getParameter("telPhone"));
        staffInfo.setStaffEmail((req.getParameter("mail")));
        staffInfo.setMemo(req.getParameter("memo"));
        staffInfo.setPasswordKey(password_key);
       // staffInfo.setCretId(session.getAttribute("id").toString());
        staffInfo.setCretId("testUser");
        try{
        	objectService.saveNewStaff(staffInfo);
        }catch(Exception e){
            e.toString();
        }
    }
    
    /* 직원 삭제 */
    @RequestMapping(value = "/deleteStaff")  
    @ResponseBody
    public void deleteStaff(@RequestParam HashMap<String,String> params){
    	objectService.deleteStaff(params);
    }
    
    /* 직원 수정 */
    @RequestMapping(value = "/updateStaff")
    @ResponseBody
    public void updateStaff(@RequestParam HashMap<String,String> params){
    	objectService.updateStaff(params);
    }    
    
  
}
