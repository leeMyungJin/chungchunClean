package com.chungchunClean.Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.chungchunClean.Service.CalculateService;
import com.chungchunClean.Service.DailyService;
import com.chungchunClean.vo.BldgVo;
import com.chungchunClean.vo.CalculateVo;
import com.chungchunClean.vo.CodeVo;
import com.chungchunClean.vo.DailyVo;
import com.chungchunClean.vo.StockVo;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.body.MultipartBody;

@Controller
@RequestMapping("/calculate")
public class CalculateController {
    
	@Autowired
	CalculateService calculateService;
	
    @RequestMapping(value = "/process", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveProcess() {
        return "calculate/calculate_process";
    }
    
    @RequestMapping(value = "/history", method = {RequestMethod.POST , RequestMethod.GET})
    public String moveHistory(Model model) {
    	
    	model.addAttribute("totalCost", calculateService.getMonTotalCost());
    	model.addAttribute("totalAddCost", calculateService.getAddTotalCost());
    	
        return "calculate/calculate_history";
    }
    
    @RequestMapping(value = "/getMonList")
    @ResponseBody
    public List<CalculateVo> getMonList(@RequestParam HashMap<String,Object> params){
    	
    	List<CalculateVo> calculateList = calculateService.getMonList(params);
    	
    	return calculateList;
    }
    
    
    @RequestMapping(value = "/getMonErrorList")
    @ResponseBody
    public List<CalculateVo> getMonErrorList(@RequestParam HashMap<String,Object> params){
    	
    	List<CalculateVo> calculateList = calculateService.getMonErrorList(params);
    	
    	return calculateList;
    }
    
    
    @RequestMapping(value = "/getMonlableCost")
    @ResponseBody
    public HashMap<String,Object> getMonlableCost(@RequestParam HashMap<String,Object> params){
    	
    	return calculateService.getMonlableCost(params);
    }
    
    
    @RequestMapping(value = "/getMonTotalCost")
    @ResponseBody
    public HashMap<String,Object> getMonTotalCost(){
    	return calculateService.getMonTotalCost();
    }
    
    @RequestMapping(value = "/getAddList")
    @ResponseBody
    public List<CalculateVo> getAddList(@RequestParam HashMap<String,Object> params){
    	
    	List<CalculateVo> calculateList = calculateService.getAddList(params);
    	
    	return calculateList;
    }
     
    @RequestMapping(value = "/getAddlableCost")
    @ResponseBody
    public HashMap<String,Object> getAddlableCost(@RequestParam HashMap<String,Object> params,Model model){
    	return calculateService.getAddlableCost(params);
    }
    
    @RequestMapping(value = "/getAddTotalCost")
    @ResponseBody
    public HashMap<String,Object> getAddTotalCost(){
    	return calculateService.getAddTotalCost();
    }
    
    @RequestMapping(value = "/getClassifiList")
    @ResponseBody
    public List<CalculateVo> getClassifiList(@RequestParam HashMap<String,Object> params){
    	
    	List<CalculateVo> calculateList = calculateService.getClassifiList(params);
    	
    	return calculateList;
    }
    
    @RequestMapping(value = "/getItemList")
    @ResponseBody
    public List<CalculateVo> getItemList(@RequestParam HashMap<String,Object> params){
    	
    	List<CalculateVo> calculateList = calculateService.getItemList(params);
    	
    	return calculateList;
    }
    
    
    @RequestMapping(value = "/getBldgList")
    @ResponseBody
    public List<CalculateVo> getBldgList(@RequestParam HashMap<String,Object> params){
    	
    	List<CalculateVo> calculateList = calculateService.getBldgList(params);
    	
    	return calculateList;
    }
    
    @RequestMapping(value="/deleteMonError", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void deleteMonError(@RequestBody List<CalculateVo> params, HttpServletRequest req){
    	calculateService.deleteMonError(params, req.getSession().getAttribute("staffId").toString());
    }
    
    @RequestMapping(value="/deleteAdd", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void deleteAdd(@RequestBody List<CalculateVo> params, HttpServletRequest req){
    	calculateService.deleteAdd(params, req.getSession().getAttribute("staffId").toString());
    }
    
    @RequestMapping(value="/deleteClassifi", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void deleteClassifi(@RequestBody List<CalculateVo> params, HttpServletRequest req){
    	calculateService.deleteClassifi(params, req.getSession().getAttribute("staffId").toString());
    }
    
    @RequestMapping(value="/deleteItem", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void deleteItem(@RequestBody List<CalculateVo> params, HttpServletRequest req){
    	calculateService.deleteItem(params, req.getSession().getAttribute("staffId").toString());
    }
    
    @RequestMapping(value="/saveMon", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveMon(@RequestBody List<CalculateVo> params, HttpServletRequest req){
    	calculateService.saveMon(params, req.getSession().getAttribute("staffId").toString());
    }
    
    @RequestMapping(value="/saveAdd", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveAdd(@RequestBody List<CalculateVo> params, HttpServletRequest req){
    	calculateService.saveAdd(params, req.getSession().getAttribute("staffId").toString());
        // return stockService.getStockList(params); // 카테고리 저장 후 다시 조회
    }
    
    @RequestMapping(value="/saveMonExcel", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public Integer saveMonExcel(@RequestBody List<CalculateVo> params, HttpServletRequest req){
    	int cnt = 0;
        for(CalculateVo vo : params){
            vo.setCretId(req.getSession().getAttribute("staffId").toString());
            vo.setUpdtId(req.getSession().getAttribute("staffId").toString());
            try {
            	calculateService.saveMonExcel(vo);
                cnt++;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return cnt;
    	
    }
    
    @RequestMapping(value="/saveMonErrorExcel", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public Integer saveMonErrorExcel(@RequestBody List<CalculateVo> params, HttpServletRequest req){
    	int cnt = 0;
        for(CalculateVo vo : params){
            vo.setCretId(req.getSession().getAttribute("staffId").toString());
            vo.setUpdtId(req.getSession().getAttribute("staffId").toString());
            try {
            	calculateService.saveMonErrorExcel(vo);
                cnt++;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return cnt;
    	
    }
    
    @RequestMapping(value="/saveAddExcel", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public Integer saveAddExcel(@RequestBody List<CalculateVo> params, HttpServletRequest req){
    	int cnt = 0;
        for(CalculateVo vo : params){
            vo.setCretId(req.getSession().getAttribute("staffId").toString());
            vo.setUpdtId(req.getSession().getAttribute("staffId").toString());
            try {
            	calculateService.saveAddExcel(vo);
                cnt++;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return cnt;
    	
    }
  
    @RequestMapping(value="/saveUpdateMonError", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveUpdateMonError(@RequestBody List<CalculateVo> params, HttpServletRequest req){
    	calculateService.saveUpdateMonError(params, req.getSession().getAttribute("staffId").toString());
    }
    
    @RequestMapping(value="/saveUpdateAdd", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveUpdateAdd(@RequestBody List<CalculateVo> params, HttpServletRequest req){
    	calculateService.saveUpdateAdd(params, req.getSession().getAttribute("staffId").toString());
    }
  

    @RequestMapping(value="/saveClassifi", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveClassifi(@RequestBody List<CalculateVo> params, HttpServletRequest req){
    	calculateService.saveClassifi(params, req.getSession().getAttribute("staffId").toString());
    }
    
    @RequestMapping(value="/saveItem", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public void saveItem(@RequestBody List<CalculateVo> params, HttpServletRequest req){
    	calculateService.saveItem(params, req.getSession().getAttribute("staffId").toString());
    }

    @RequestMapping(value = "/getPopSpecification")
    public String getPopSpecification(HttpServletRequest req, Model model){
    	String bldgNm = req.getParameter("bldgNm");
    	String addMt = req.getParameter("addMt");
    	
    	List<CalculateVo> calculateList = calculateService.getPopSpecification(bldgNm, addMt);
    	model.addAttribute("cretDt", calculateList.get(0).getCretDt());
    	model.addAttribute("totalCost", calculateList.get(0).getTotalCost());
    	model.addAttribute("quoteTotalCost", calculateList.get(0).getQuoteTotalCost());
    	model.addAttribute("surtaxTotalCost", calculateList.get(0).getSurtaxTotalCost());
    	model.addAttribute("bldgNm", calculateList.get(0).getBldgNm());
    	model.addAttribute("addSpecInfo", calculateList);
    	
    	return "calculate/p_specification";
    }
    
    @RequestMapping(value="/getMsgTemplate", method = {RequestMethod.POST , RequestMethod.GET})
    @ResponseBody
    public List<CodeVo> getMsgTemplate(){
        return calculateService.getMsgTemplate(); // 카테고리 저장 후 다시 조회
    }
    
    @RequestMapping(value = "/saveMsgTemplate")
    @ResponseBody
    public void saveMsgTemplate(@RequestParam HashMap<String,Object> params, HttpServletRequest req){
    	
    	calculateService.saveMsgTemplate(params, req.getSession().getAttribute("staffId").toString());
    }

    
    @RequestMapping(value = "/getMsgremainCash")
    public void getMsgremainCash(){
    	
    	MultipartBody body = Unirest.post("http://221.139.14.189/API/remainCash")
    	        					.field("api_key", "DCTMVYLLNTM0621");
    	    HttpResponse<String> response;
			try {
				response = body.asString();
				System.out.println(response);
				
			} catch(Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

    }
    
    @RequestMapping(value="/sendMsg", method = {RequestMethod.POST})
    @ResponseBody
    public String sendMsg(@RequestParam HashMap<String,Object> params){
    	
    	String myResult = "";

        try {
            //   URL 설정하고 접속하기 
            URL url = new URL("http://221.139.14.189/API/sms_send"); // URL 설정 

            HttpURLConnection http = (HttpURLConnection) url.openConnection(); // 접속 
            //-------------------------- 
            //   전송 모드 설정 - 기본적인 설정 
            //-------------------------- 
            http.setDefaultUseCaches(false);
            http.setDoInput(true); // 서버에서 읽기 모드 지정 
            http.setDoOutput(true); // 서버로 쓰기 모드 지정  
            http.setRequestMethod("POST"); // 전송 방식은 POST

            //--------------------------
            // 헤더 세팅
            //--------------------------
            // 서버에게 웹에서 <Form>으로 값이 넘어온 것과 같은 방식으로 처리하라는 걸 알려준다
            http.setRequestProperty("content-type", "application/x-www-form-urlencoded");


            //-------------------------- 
            //   서버로 값 전송 
            //-------------------------- 
            StringBuffer buffer = new StringBuffer();

            //HashMap으로 전달받은 파라미터가 null이 아닌경우 버퍼에 넣어준다
            if (params != null) {

                Set key = params.keySet();
                int idx = 0;

                for (Iterator iterator = key.iterator(); iterator.hasNext();) {
                    String keyName = (String) iterator.next();
                    String valueName = (String) params.get(keyName);
                    buffer.append(keyName).append("=").append(valueName);
                    
                    idx++;
                    
                    if(params.size() > idx) {
                    	buffer.append("&");
                    }
                }
            }

            OutputStreamWriter outStream = new OutputStreamWriter(http.getOutputStream(), "UTF-8");
            PrintWriter writer = new PrintWriter(outStream);
            writer.write(buffer.toString());
            writer.flush();


            //--------------------------
            //   Response Code
            //--------------------------
            //http.getResponseCode();


            //-------------------------- 
            //   서버에서 전송받기 
            //-------------------------- 
            InputStreamReader tmp = new InputStreamReader(http.getInputStream(), "UTF-8");
            BufferedReader reader = new BufferedReader(tmp);
            StringBuilder builder = new StringBuilder();
            String str;
            while ((str = reader.readLine()) != null) {
                builder.append(str + "\n");
            }
            myResult = builder.toString();
            return myResult;

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return myResult;
        
    }

    
    @RequestMapping(value="/remainCash", method = {RequestMethod.POST})
    @ResponseBody
    public String remainCash(@RequestParam HashMap<String,Object> params){
    	
    	String myResult = "";
        String data = "";

        try {
            //   URL 설정하고 접속하기 
            URL url = new URL("http://221.139.14.189/API/remainCash"); // URL 설정 

            HttpURLConnection http = (HttpURLConnection) url.openConnection(); // 접속 
            //-------------------------- 
            //   전송 모드 설정 - 기본적인 설정 
            //-------------------------- 
            //http.setDefaultUseCaches(false);
            http.setDoInput(true); // 서버에서 읽기 모드 지정 
            http.setDoOutput(true); // 서버로 쓰기 모드 지정  
            http.setRequestMethod("POST"); // 전송 방식은 POST

            //--------------------------
            // 헤더 세팅
            //--------------------------
            // 서버에게 웹에서 <Form>으로 값이 넘어온 것과 같은 방식으로 처리하라는 걸 알려준다 
            http.setRequestProperty("content-type", "application/x-www-form-urlencoded");


            //-------------------------- 
            //   서버로 값 전송 
            //-------------------------- 
            StringBuffer buffer = new StringBuffer();

            //HashMap으로 전달받은 파라미터가 null이 아닌경우 버퍼에 넣어준다
            if (params != null) {

                Set key = params.keySet();

                for (Iterator iterator = key.iterator(); iterator.hasNext();) {
                    String keyName = (String) iterator.next();
                    String valueName = (String) params.get(keyName);
                    buffer.append(keyName).append("=").append(valueName);
                }
            }
            
            OutputStream out_stream = http.getOutputStream();

            out_stream.write( buffer.toString().getBytes("UTF-8") );
            out_stream.flush();
            out_stream.close();

            InputStream is      = null;
            BufferedReader in   = null;

            is  = http.getInputStream();
            in  = new BufferedReader(new InputStreamReader(is), 8 * 1024);

            String line = null;
            StringBuffer buff   = new StringBuffer();

            while ( ( line = in.readLine() ) != null )
            {
                buff.append(line + "\n");
            }
            data    = buff.toString().trim();

           OutputStreamWriter outStream = new OutputStreamWriter(http.getOutputStream(), "UTF-8");
           PrintWriter writer = new PrintWriter(outStream);
           writer.write(buffer.toString());
           writer.flush();


           //--------------------------
           //   Response Code
           //--------------------------
           //http.getResponseCode();


           //-------------------------- 
           //   서버에서 전송받기 
           //-------------------------- 
           InputStreamReader tmp = new InputStreamReader(http.getInputStream(), "UTF-8");
           BufferedReader reader = new BufferedReader(tmp);
           StringBuilder builder = new StringBuilder();
           String str;
           while ((str = reader.readLine()) != null) {
               builder.append(str + "\n");
           }
           myResult = builder.toString();
           return myResult;

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return data;
        
    }
    

}

