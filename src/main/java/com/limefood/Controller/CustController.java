package com.limefood.Controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.limefood.Mappers.LoginMapper;
import com.limefood.Service.CustInfoService;
import com.limefood.vo.CustInfoVO;
import com.limefood.vo.OrderInfoVO;
import com.limefood.vo.ProdInfoVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/cust")
public class CustController {

    @Autowired
    CustInfoService custInfoService;

    @Autowired
    LoginMapper loginMapper;
    
    /**사용방법 */
    @RequestMapping(value = "/howto" )
    public String howto(HttpServletRequest req, HttpServletResponse res){
        return "/customer/howto";
    }

    /**식자재주문 */
    @RequestMapping(value = "/food")
    public String food(HttpServletRequest req, HttpServletResponse res, Model model){
        String id ;
        if(req.getSession().getAttribute("id") != null ){
            id = req.getSession().getAttribute("id").toString();
            CustInfoVO base = new CustInfoVO();
            base.setCorpName("검색");
            List<CustInfoVO> shipCorpList = custInfoService.getShipCorpList(id);
            if(shipCorpList.size()>1){
                shipCorpList.add(0, base);
            }
        HashMap<String,String> params = new HashMap<String,String>();
        model.addAttribute("getShipCorpList",shipCorpList );
        model.addAttribute("monthOrderAmt", custInfoService.getMonthOrderAmt(id));
        model.addAttribute("largeCtgList",custInfoService.getLargeCtg(params));
        // model.addAttribute("mediumCtgList",custInfoService.getMediumCtg(params));
        }
        return "/customer/customer01";
    }
    /**주문관리 */
    @RequestMapping(value = "/order" )
    public String order(HttpServletRequest req, HttpServletResponse res, Model model){
        String id ;
        if(req.getSession().getAttribute("id") != null ){
            id = req.getSession().getAttribute("id").toString();
            CustInfoVO base = new CustInfoVO();
            base.setCorpName("전체");
            List<CustInfoVO> shipCorpList = custInfoService.getShipCorpList(id);
            if(shipCorpList.size()>1){
                shipCorpList.add(0, base);
            }
            model.addAttribute("getShipCorpList",shipCorpList );
        }         
        return "/customer/customer02";
    }
    /**마감관리 */
    @RequestMapping(value = "/dline" )
    public String dLine(HttpServletRequest req, HttpServletResponse res, Model model){
        String id ;
        if(req.getSession().getAttribute("id") != null ){
            id = req.getSession().getAttribute("id").toString();
            CustInfoVO base = new CustInfoVO();
            base.setCorpName("전체");
            List<CustInfoVO> shipCorpList = custInfoService.getShipCorpList(id);
            if(shipCorpList.size()>1){
                shipCorpList.add(0, base);
            }
        model.addAttribute("getShipCorpList",shipCorpList );
        System.out.println(custInfoService.getMonthOrderAmt(id));
        }      
        return "/customer/customer03";
    }
    /**나의 정보보기 */
    @RequestMapping(value = "/myInfo" )
    public String myInfo(HttpServletRequest req, HttpServletResponse res){
        return "/customer/myinfo";
    }
    /**정보 업데이트 시 */
    @RequestMapping(value = "/upInfo" )
    public String upInfo(@ModelAttribute CustInfoVO vo ,HttpServletRequest req, HttpServletResponse res){
        custInfoService.updateCustInfo(vo, req);
        return "/update_ok";
    }
    // @RequestMapping(value="/infoList")
    // public String infoList(@ModelAttribute CustInfoVO vo ,HttpServletRequest req, HttpServletResponse res){
    //     List<CustInfoVO> custList = new ArrayList<CustInfoVO>();
    //     custList = custInfoService.getCustInfoList();
    //     req.setAttribute("data", custList);
    //     return "/admin/admin02";
    // }   

    /** 공지사항 */
    @RequestMapping(value = "/notice" )
    public String notice(@ModelAttribute CustInfoVO vo ,HttpServletRequest req, HttpServletResponse res, Model model, HashMap<String,String>params){
        params.put("index",req.getParameter("index"));
        model.addAttribute("content", custInfoService.getNotice(params));
        model.addAttribute("index",params.get("index"));
        return "/pop";
    }
    /**상품정보 가져오기 */
    @RequestMapping(value = "/prodList")
    @ResponseBody
    public List<ProdInfoVO> infoList(@RequestParam HashMap<String,Object> params){
        return custInfoService.getProdInfoList(params);

    } 

    /**주문이력 가져오기 */
    @RequestMapping(value = "/orderHist")
    @ResponseBody
    public List<ProdInfoVO> orderHist(@RequestParam HashMap<String,Object> params){
        List<ProdInfoVO> prodList = custInfoService.getOrderHist(params);
        return prodList;

    } 

    /**즐겨찾기 추가 */
    @RequestMapping(value="/addBookmark")
    @ResponseBody
    public void addBookmark(@RequestParam(value="prod") String prod ,@RequestParam(value="id")String id, HttpServletRequest req){
            custInfoService.addBookmark(prod,id);
    } 

    /**즐겨찾기 삭제 */
    @RequestMapping(value="/delBookmark")
    @ResponseBody
    public void delBookmark(@RequestParam(value="prod") String prod ,@RequestParam(value="id")String id, HttpServletRequest req){
            custInfoService.delBookmark(prod,id);
    }   

    /** 즐겨찾기 리스트 조회 */
    @RequestMapping(value = "/bookmarkList")
    @ResponseBody
    public List<ProdInfoVO> bookmarkList(@RequestParam HashMap<String,Object> params){
        List<ProdInfoVO> prodList = custInfoService.getBookmarkList(params);
        return prodList;
    } 

    /**장바구니 리스트 조회 */
    @RequestMapping(value = "/basketList")
    @ResponseBody
    public List<ProdInfoVO> basketList(@RequestParam(value="id")String id , @RequestParam(value="prod") String prod , @RequestParam(value="shipDate")String date, Model model){
        List<ProdInfoVO> basketList = custInfoService.getShopBasketList(id, prod, date);
        Double amt = 0.0;
        if(basketList.size() > 0){
            for(ProdInfoVO basket : basketList){
                amt += basket.getTotalPrice();
            }
        }
        model.addAttribute("shopBasketCnt", basketList);
        model.addAttribute("shopBasketAmt", amt);
        return basketList;
    }  

    /** 장바구니 담기 */
    @RequestMapping(value="/addShopBasket")
    @ResponseBody
    public void addShopBasket(@RequestParam(value="prod") String prod ,@RequestParam(value="id")String id, @RequestParam(value="orderCnt")Integer orderCnt){
        custInfoService.addShopBasket(prod,id, orderCnt);
    }

    /**장바구니 삭제 */
    @RequestMapping(value="/delShopBasket")
    @ResponseBody
    public void delShopBasket(@RequestParam(value="prod") String prod ,@RequestParam(value="id")String id, HttpServletRequest req){
        custInfoService.delShopBasket(prod,id);
    }
    /**장바구니 업데이트 */
    @RequestMapping(value="/upShopBasket")
    @ResponseBody
    public void upShopBasket(@RequestParam(value="prodCode") String prodCode ,@RequestParam(value="id")String id, @RequestParam(value="orderCnt")Integer orderCnt){
        custInfoService.upShopBasket(prodCode,id, orderCnt);
    }
    
    /**주문요청 */
    @RequestMapping(value="/orderReq")
    @ResponseBody
    public String orderRequest(@RequestBody HashMap<String, ArrayList<OrderInfoVO>> param, HttpServletRequest req){
        HttpSession session = req.getSession();
        ArrayList<OrderInfoVO> data = param.get("add");
        String orderNo = custInfoService.getOrderNo();
        if((String)session.getAttribute("id") != null){
            for(int i=0; i<data.size(); i++){
                data.get(i).setCorpName((String)session.getAttribute("corpName"));
                data.get(i).setCorpNum((String)session.getAttribute("corpNum"));
                data.get(i).setId((String)session.getAttribute("id"));
                data.get(i).setName((String)session.getAttribute("name"));
                data.get(i).setOrderNo(orderNo);
                data.get(i).setEmail((String)session.getAttribute("email"));
                custInfoService.orderRequest(data.get(i));
                custInfoService.delShopBasket(data.get(i).getProdCode(), data.get(i).getId());
                HashMap<String,String> params = new HashMap<String,String>();
                params.put("orderCnt",data.get(i).getOrderCnt().toString());
                params.put("prodCode",data.get(i).getProdCode());
                params.put("userId",(String)session.getAttribute("id"));
                custInfoService.updateInven(params);
            }
            custInfoService.emailRequest(data.get(0));
        }
        return (String)session.getAttribute("id");
    }

    /**주문 리스트 가져오기 */
    @RequestMapping(value="/orderList")
    @ResponseBody
    public List<OrderInfoVO> orderList(@RequestParam(value="prod") String prod, @RequestParam(value="shipId")String shipId, @RequestParam(value="id")String id, @RequestParam(value="shipDateFrom")String shipDateFrom, @RequestParam(value="shipDateTo")String shipDateTo, @RequestParam(value="searchMode") String searchMode){
        return custInfoService.getOrderList(prod,shipId,id, shipDateFrom, shipDateTo, searchMode);
    }

    /**주문 삭제 */
    @RequestMapping(value="/delOrder")
    @ResponseBody
    public void delOrder(@RequestParam HashMap<String,String> params){
        custInfoService.delEmail(params);
        List<OrderInfoVO> order = custInfoService.getOrderInfo(params);
        if(params.get("prodCode") == "" || params.get("prodCode") == null){
            for(int i=0; i <order.size(); i++){
                params.put("orderCnt", String.valueOf((order.get(i).getOrderCnt() * -1)));
                params.put("prodCode",order.get(i).getProdCode());
                    custInfoService.updateInven(params);
                params.remove("orderCnt");
                params.remove("prodCode");
            }
        }else{
            custInfoService.updateInven(params);
        }

        custInfoService.delOrder(params.get("prodCode"),params.get("id"),params.get("orderNo"));
    }

    /**주문 업데이트 */
    @RequestMapping(value="/upOrder")
    @ResponseBody
    public void upOrder(@RequestParam HashMap<String,Object> params){
        custInfoService.upOrder(params);
    }    

    /**패스워드 체크 */
    @RequestMapping(value="/checkPwd")
    @ResponseBody
    public boolean checkPwd(@RequestParam(value="id") String id, @RequestParam(value="pwd") String pwd){
        return custInfoService.getPwdCheck(id,pwd);
    }

    /**패스워드 업데이트 */
    @RequestMapping(value="/updatePwd")
    @ResponseBody
    public void updatePwd(@RequestParam(value="id") String id, @RequestParam(value="pwd") String pwd){
        custInfoService.updatePwd(id,pwd);
    }

    /** 아이디 찾기 */
    @RequestMapping(value="/findId")
    @ResponseBody
    public ArrayList<String> findId(@RequestParam HashMap<String,String> params) {
            return custInfoService.findId(params);
    }

    /** 비밀번호 찾기 */
    @RequestMapping(value="/findPwd")
    @ResponseBody
    public String findPwd(@RequestParam HashMap<String,String> params) {
            return custInfoService.findPwd(params);
    }    

    /** 팝업 공지사항 가져오기 */
    @RequestMapping(value="/getNotice")
    @ResponseBody
    public String getNotice(@RequestParam HashMap<String,String> params) {
            return custInfoService.getNotice(params);
    }

    /** 약관 동의 거부 */
    @RequestMapping(value="/disagree")
    @ResponseBody
    public void disagree(@RequestParam HashMap<String,String> params) {
            custInfoService.disagree(params);
    }
    
    /** 중카테고리 가져오기 */
    @RequestMapping(value="/getMediumCtg")
    @ResponseBody
    public List<ProdInfoVO> getMediumCtg(@RequestParam HashMap<String,String> params) {
           return  custInfoService.getMediumCtg(params);
    }   
    
    
}
