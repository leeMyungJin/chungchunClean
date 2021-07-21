package com.chungchunClean.Controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.chungchunClean.Service.ObjectService;
import com.chungchunClean.Util.Encrypt;
import com.chungchunClean.vo.BldgVo;
import com.chungchunClean.vo.CodeVo;
import com.chungchunClean.vo.StaffVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/object")
public class ObjectController {
	
	@Autowired
	ObjectService objectService;
    
    @RequestMapping(value = "/building", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveBuilding(Model model) {
        model.addAttribute("maxBldgCd",objectService.getMaxBldgCd());
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
    
    /**
     * 건물 조회
     */
    @RequestMapping(value = "/getBuildingList")
    @ResponseBody
    public List<BldgVo> getBuildingList(@RequestParam HashMap<String,Object> params){
    	return objectService.getBuildingList(params);
    }  
    
    
    /**
     * 코드 리스트 가져오기
     * @param params
     * @return
     */
    @RequestMapping(value="/getBuildingQrList", method = {RequestMethod.POST , RequestMethod.GET})
    public String getBuildingQrList(@RequestParam HashMap<String,Object> params, Model model){
    	List<CodeVo> codeVo = objectService.getBuildingQrList(params);
        
    	model.addAttribute("qrList", codeVo);
        model.addAttribute("qrCnt",codeVo.size());
        
    	return "object/p_building_qr";
    }


    /**
     * 주소검색 팝업 띄우기
     */
    @RequestMapping(value = "/p_addr")
    public String addrPopup(@RequestParam HashMap<String,Object> params){
        return "object/p_addr";
    } 

    /**
     * 건물 중복 체크
     */
    @RequestMapping(value = "/dupCheckBuilding")
    @ResponseBody
    public String dupCheckBuilding(@RequestParam HashMap<String,Object> params){
        return  objectService.dupCheckBuilding(params);
    } 

    /**
     * 건물 마스터 등록 
     */
    @RequestMapping(value = "/addBuildingBas")
    @ResponseBody
    public void addBuildingBas(@RequestParam HashMap<String,Object> params, HttpServletRequest req){
        // params.put("id",req.getSession().getAttribute("id").toString());
        params.put("id","test");
        // BLDG_BAS 등록
        objectService.addBuildingBas(params);
    } 

     /**
     * 건물 상세 등록 
     */
    @RequestMapping(value = "/addBuildingDetail")
    @ResponseBody
    public void addBuildingDetail(@RequestBody List<BldgVo> detailParams, HttpServletRequest req){
        //req.getSession().getAttribute("id").toString()
        // BLDG_BAS 등록
        objectService.addBuildingDetail(detailParams, "test");
    } 

    /**
     * 건물 정보 조회
     * @return
     */
    @RequestMapping(value = "/getBuildingInfo")
    @ResponseBody
    public HashMap<String,Long> getBldgInfo(){
        return objectService.getBldgInfo();
    } 
    /**
     * 계약서 팝업
     */
    @RequestMapping(value = "/contract")
    public String contract(){
        return "object/p_contract";
    } 
  
}
