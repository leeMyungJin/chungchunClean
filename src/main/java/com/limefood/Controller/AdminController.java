package com.limefood.Controller;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.limefood.Service.AdminService;
import com.limefood.Util.Encrypt;
import com.limefood.vo.CorpInfoVO;
import com.limefood.vo.CtgInfoVO;
import com.limefood.vo.CustInfoVO;
import com.limefood.vo.OrderInfoVO;
import com.limefood.vo.ProdInfoVO;
import com.limefood.vo.SalesVO;
import com.limefood.vo.SmarteditorVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;


    @RequestMapping(value = "/main")
    public String main() {
        return "/admin/admin01";
    }
    @RequestMapping(value = "/cust", method = {RequestMethod.POST , RequestMethod.GET})
    public String cust(HttpServletRequest req, HttpServletResponse res) {
        int corpCnt = adminService.getCorpCnt();
        int custCnt = adminService.getCustCnt();
        req.setAttribute("corpCnt", corpCnt);
        req.setAttribute("custCnt", custCnt);
        return "/admin/admin02";
    }

    @RequestMapping(value = "/popup", method = {RequestMethod.POST , RequestMethod.GET})
    public String popup() {
        
        return "/admin/admin03";
    }

    @RequestMapping(value = "/ctg", method = {RequestMethod.POST , RequestMethod.GET})
    public String ctg() {
        return "/admin/admin04_01";
    }

    @RequestMapping(value = "/prod", method = {RequestMethod.POST , RequestMethod.GET})
    public String prod(Model model, @RequestParam HashMap<String,String>params) {
        ArrayList<String> unitList  = new ArrayList<String>();
        List<ProdInfoVO> unit = adminService.getProdUint(params);
        for(ProdInfoVO prod : unit){
            unitList.add("'" + prod.getUnit()+ "'");
        }
        
        model.addAttribute("unitList", unitList.toString());
        return "/admin/admin04_02";
    }
    @RequestMapping(value = "/price", method = {RequestMethod.POST , RequestMethod.GET})
    public String price() {
        return "/admin/admin04_03";
    }        

    @RequestMapping(value = "/order", method = {RequestMethod.POST , RequestMethod.GET})
    public String order(HttpSession session) {
        session.setAttribute("corp_count", "0");
        session.setAttribute("total_price", "0");
        session.setAttribute("prod_count", "0");
        return "/admin/admin05";
    }

    @RequestMapping(value = "/dline", method = {RequestMethod.POST , RequestMethod.GET})
    public String dLine() {
        return "/admin/admin06";
    }

    @RequestMapping(value = "/inven", method = {RequestMethod.POST , RequestMethod.GET})
    public String inven() {
        return "/admin/admin07";
    }
    @RequestMapping(value = "/sales", method = {RequestMethod.POST , RequestMethod.GET})
    public String sales() {
        return "/admin/admin08";
    }
    @RequestMapping(value = "/specification", method = {RequestMethod.POST , RequestMethod.GET})
    public String specification(Model model , @RequestParam HashMap<String,Object> params) {
        HashMap<String,String> baseInfo = adminService.specBaseInfo(params);
        List<OrderInfoVO> orderInfo = adminService.getOrderList(params);
        params.put("corpNum",baseInfo.get("corp_num"));
        SalesVO salesInfo = adminService.getSalesSpecInfo(params);
        params.remove("fromDate");
        params.remove("toDate");
        model.addAttribute("year",params.get("shipDate").toString().substring(0, 4));
        model.addAttribute("month",params.get("shipDate").toString().substring(5, 7));
        model.addAttribute("day",params.get("shipDate").toString().substring(8, 10));
        model.addAttribute("corpName",baseInfo.get("corp_name"));
        model.addAttribute("orderInfo",orderInfo.toArray());
        model.addAttribute("totPrice", adminService.specTotalPrice(params));
        model.addAttribute("outstanding", adminService.specSalesPrice(params));
        model.addAttribute("deposit",salesInfo.getDeposit());
        return "/admin/specification";
    }        

        /**고객 리스트 조회 */
    @RequestMapping(value = "/infoList")
    @ResponseBody
    public List<CustInfoVO> getCustInfoList(@RequestParam(value="cond") String cond, @RequestParam(value="value") String value){
        List<CustInfoVO> custList = adminService.getCustInfoList(cond, value);
        return custList;
    }
    /**고객 등록 */
    @RequestMapping(value = "/regCust")
    public String regCustInfo(HttpServletRequest req, HttpServletResponse res){
        CustInfoVO custInfo = new CustInfoVO();
        HttpSession session = req.getSession();


        // salt + SHA512 암호화 적용
        String password = req.getParameter("password");
        String password_key = Encrypt.getSaltKey();
        password = Encrypt.setSHA512(password, password_key);

        custInfo.setId(req.getParameter("id"));
        custInfo.setPassword(password);
        custInfo.setName(req.getParameter("name"));
        custInfo.setEmail((req.getParameter("email")));
        custInfo.setAdminFlag(req.getParameter("adminFlag"));
        custInfo.setCorpName(req.getParameter("corpName"));
        custInfo.setCorpNum(req.getParameter("corpNum"));
        custInfo.setCelPhone(req.getParameter("celPhone"));
        custInfo.setTelPhone(req.getParameter("telPhone"));
        custInfo.setCustType(req.getParameter("custType"));
        custInfo.setBasAddr(req.getParameter("basAddr"));
        custInfo.setDtlAddr(req.getParameter("dtlAddr"));
        custInfo.setAdminFlag(req.getParameter("adminFlag"));
        custInfo.setPasswordKey(password_key);
        custInfo.setCretId(session.getAttribute("id").toString());
        try{
            adminService.regCustInfo(custInfo);
        }catch(Exception e){
            e.toString();
            return "/reg_fail";
        }
        return "/reg_ok";
    }

    /** 고객삭제 */
    @RequestMapping(value = "/deleteCust")  
    @ResponseBody
    public void deleteCust(@RequestParam HashMap<String,String> params){
        adminService.deleteCust(params);
    }

    /**상품단위 조회 */
    @RequestMapping(value = "/getProdUnit")
    @ResponseBody
    public List<ProdInfoVO> getProdUint(@RequestParam HashMap<String,String> params){
        return adminService.getProdUint(params);
    }
    /**상품단위 추가/업데이트*/
    @RequestMapping(value = "/addProdUnit")
    @ResponseBody
    public void addProdUint(@RequestParam HashMap<String,String> params){
        adminService.addProdUnit(params);
    }    
    /**상품단위 삭제*/
    @RequestMapping(value = "/delProdUnit")
    @ResponseBody
    public void delProdUnit(@RequestParam HashMap<String,String> params){
        adminService.delProdUnit(params);
    }
    /**카테고리 건수 조회*/
    @RequestMapping(value = "/getCtgCnt")
    @ResponseBody
    public CtgInfoVO getCtgCnt(@RequestParam HashMap<String,String> params){
        return adminService.getCtgCnt(params);
    }    
    /**카테고리 조회*/
    @RequestMapping(value = "/getCtg")
    @ResponseBody
    public List<CtgInfoVO> getCtg(@RequestParam HashMap<String,String> params){
        return adminService.getCtg(params);
    }
    /**카테고리 추가&업데이트*/
    @RequestMapping(value = "/addCtg")
    @ResponseBody
    public void addCtg(@RequestParam HashMap<String,String> params){
        adminService.addCtg(params);
    }    
    /**카테고리 삭제*/
    @RequestMapping(value = "/delCtg")
    @ResponseBody
    public void delCtg(@RequestParam HashMap<String,String> params){
        adminService.delCtg(params);
    }
    /**상품 건수 조회*/
    @RequestMapping(value = "/getProdCnt")
    @ResponseBody
    public Integer getProdCnt(@RequestParam HashMap<String,String> params){
        return adminService.getProdCnt(params);
    }    
    /**상품리스트 조회*/
    @RequestMapping(value = "/getProdList")
    @ResponseBody
    public List<ProdInfoVO> getProdList(@RequestParam HashMap<String,Object> params){
        return adminService.getProdList(params);
    }
    /**사업장별 단가리스트 조회*/
    @RequestMapping(value = "/getPriceList")
    @ResponseBody
    public List<ProdInfoVO> getPriceList(@RequestParam HashMap<String,Object> params){
        return adminService.getPriceList(params);
    }    
    /**상품단가 저장*/
    @RequestMapping(value = "/savePrice")
    @ResponseBody
    public void savePrice(@RequestParam HashMap<String,String> params){
         adminService.savePrice(params);
    }
    /**상품 저장*/
    @RequestMapping(value = "/saveProd")
    @ResponseBody
    public void saveProd(@RequestParam HashMap<String,String> params){
         adminService.saveProd(params);
    } 
    /**상품 삭제*/
    @RequestMapping(value = "/delProd")
    @ResponseBody
    public void delProd(@RequestParam HashMap<String,String> params){
         adminService.delProd(params);
    }          
    /**주문내역 조회*/
    @RequestMapping(value = "/getOrderList")
    @ResponseBody
    public List<OrderInfoVO> getOrderList(@RequestParam HashMap<String,Object> params, HttpSession session){
        return adminService.getOrderList(params);
    }
    
    /**관리자 - 사업장건수 , 주문건수, 총금액 구하기*/
    @RequestMapping(value = "/getOrderInfo")
    @ResponseBody
    public HashMap<String,Object> getOrderInfo(@RequestParam HashMap<String,Object> params, HttpSession session){
        return adminService.getOrderInfo(params);
    }

    /**관리자용 주문상품 추가*/
    @RequestMapping(value = "/addOrder")
    @ResponseBody
    public void addOrder(@RequestParam HashMap<String,String> params){
         adminService.addOrder(params);
    }

    /**관리자용 주문상품 삭제*/
    @RequestMapping(value = "/delOrder")
    @ResponseBody
    public void delOrder(@RequestParam HashMap<String,String> params){
            adminService.delOrder(params);
    }

    /** 사업장검색 */
    @RequestMapping(value = "/getCorpList")
    @ResponseBody
    public List<CorpInfoVO> getCorpList(@RequestParam HashMap<String,String> params){
            return adminService.getCorpList(params);
    }
    
    /**회원정보 수정 */
    @RequestMapping(value = "/modifyCustInfo")
    @ResponseBody
    public void modifyCustInfo(@RequestParam HashMap<String,String> params){
            adminService.modifyCustInfo(params);
    }    
        
    /**지점 추가 */
    @RequestMapping(value = "/addChild")
    public void addChild(@RequestParam HashMap<String,String> params){
            adminService.addChild(params);
    }

    /** 지점 조회 */
    @RequestMapping(value = "/getChild")
    @ResponseBody
    public List<CorpInfoVO> getChild(@RequestParam HashMap<String,String> params){
            return adminService.getChild(params);
    }    

    /** 스마트에디터 사진 업로드 */
    @RequestMapping(value="/singleImageUploader")
    public String simpleImageUploader(
        HttpServletRequest req, SmarteditorVO smarteditorVO) throws UnsupportedEncodingException{
            String callback = smarteditorVO.getCallback();
            System.out.println("callbaock" + callback);
            String callback_func = smarteditorVO.getCallback_func();
            String file_result = "";
            String result = "";
            MultipartFile multiFile = smarteditorVO.getFiledata();
            try{
                if(multiFile != null && multiFile.getSize() > 0 &&
                        !StringUtils.isEmpty(multiFile.getName())){
                    if(multiFile.getContentType().toLowerCase().startsWith("image/")){
                        String oriName = multiFile.getOriginalFilename();
                        // String uploadPath = req.getServletContext().getRealPath("/img");
                        String path = "/var/webapps/upload/img/smartEditor/";
                        File file = new File(path);
                        if(!file.exists()){
                        file.mkdirs();
                        }
                        // File Nfile = new File(uploadPath);
                        // if(!Nfile.exists()){
                        //     Nfile.mkdirs();
                        // }
                        String fileName = UUID.randomUUID().toString();
                        smarteditorVO.getFiledata().transferTo(new File(path + fileName));
                        file_result += "&bNewLine=true&sFileName=" + oriName + 
                                       "&sFileURL=/img/smartEditor/"+fileName;
                    }else{
                        file_result += "&errstr=error";
                    }
                }else{
                    file_result += "&errstr=error";
                }
            } catch (Exception e){
                e.printStackTrace();
            }
            result = "redirect:" + callback + 
                     "?callback_func=" + URLEncoder.encode(callback_func,"UTF-8") + file_result;
            return result;  
    }

    /** 상품코드 중복확인 */
    @RequestMapping(value = "/checkProdCode")
    @ResponseBody
    public String checkProdCode(@RequestParam HashMap<String,String> params){
            return adminService.checkProdCode(params);
    }
    
    /** 상품코드 카테고리 코드 체크 */
    @RequestMapping(value = "/checkCtgCode")
    @ResponseBody
    public String checkCtgCode(@RequestParam HashMap<String,String> params){
            return adminService.checkCtgCode(params);
    }    
         
     
    /** 아이디 중복확인 */
    @RequestMapping(value = "/getCheckId")
    @ResponseBody
    public String getCheckId(@RequestParam HashMap<String,String> params){
            return adminService.checkId(params);
    }    

    /**재고 조회 */
    @RequestMapping(value = "/getInven")
    @ResponseBody
    public List<ProdInfoVO> getInven(@RequestParam HashMap<String,Object> params){
            return adminService.getInven(params);
    } 

    /**재고 추가 */
    @RequestMapping(value = "/addInven")
    @ResponseBody
    public void addInven(@RequestParam HashMap<String,String> params){
        adminService.addInven(params);
    }       

    /** 매출 조회 */
    @RequestMapping(value = "/getSales")
    @ResponseBody
    public List<SalesVO> getSales(@RequestParam HashMap<String,Object> params){
        return adminService.getSales(params);
    }       
    

    /** 연매출정보 조회 */
    @RequestMapping(value = "/getYearInfo")
    @ResponseBody
    public HashMap<String,Object> getYearInfo(@RequestParam HashMap<String,String> params){
        return adminService.getYearInfo(params);
    }  

    /** 매출정보 조회 */
    @RequestMapping(value = "/getSalesInfo")
    @ResponseBody
    public HashMap<String,Object> getSalesInfo(@RequestParam HashMap<String,Object> params){
        return adminService.getSalesInfo(params);
    }  
    
    /** 입금 처리 */
    @RequestMapping(value = "/addDeposit")
    @ResponseBody
    public void addDeposit(@RequestParam HashMap<String,String> params){
        adminService.addDeposit(params);
    }  

}

