package com.chungchunClean.Controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.chungchunClean.Service.TermService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/terms")
public class TermsController {

    @Autowired
    TermService termService;
    
    @RequestMapping(value = "/termseditor", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveTermsEditor() {
    	return "terms/term_editor";
    }

    /**이용약관 등록 */
    @RequestMapping(value = "/saveTermService")
    @ResponseBody
    public void saveTermService(@RequestParam HashMap<String,String> params, HttpServletRequest req){  
        termService.saveTermService(params, req.getSession().getAttribute("staffId").toString());
    }

    @RequestMapping(value = "/getTermService")
    @ResponseBody
    public String getTermService(){   	
    	return termService.getTermService();
    }

    /**개인정보수집약관 등록 */
    @RequestMapping(value = "/saveTermPrivacy")
    @ResponseBody
    public void saveTermPrivacy(@RequestParam HashMap<String,String> params, HttpServletRequest req){  
        termService.saveTermPrivacy(params, req.getSession().getAttribute("staffId").toString());
    }

    @RequestMapping(value = "/getTermPrivacy")
    @ResponseBody
    public String getTermPrivacy(){   	
    	return termService.getTermPrivacy();
    }

    /**이용약관 */
    @RequestMapping(value = "/service", method = {RequestMethod.POST , RequestMethod.GET})
    public String terms(HttpServletRequest  request, HttpServletResponse response) {

        request.setAttribute("termService", termService.getTermService());

        return "terms/term_service";
    }

    /**개인정보수집약관 */
    @RequestMapping(value = "/privacy", method = {RequestMethod.POST , RequestMethod.GET})
    public String personalTerms(HttpServletRequest  request, HttpServletResponse response) {

        request.setAttribute("termPrivacy", termService.getTermPrivacy());

        return "terms/term_privacy";
    }
}
