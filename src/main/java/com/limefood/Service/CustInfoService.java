package com.limefood.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.limefood.vo.CustInfoVO;
import com.limefood.vo.OrderInfoVO;
import com.limefood.vo.ProdInfoVO;


public interface CustInfoService {
    public List<CustInfoVO> getCustInfoList();
    public void regCustInfo(CustInfoVO vo);
    public void updateCustInfo(CustInfoVO vo, HttpServletRequest req);
    public List<ProdInfoVO> getProdInfoList(HashMap<String,Object> params);
    public void addBookmark(String prod, String id);
    public void delBookmark(String prod, String id);
    public List<ProdInfoVO> getBookmarkList(HashMap<String,Object> params);
    public void addShopBasket(String prod, String id, Integer orderCnt);
    public void delShopBasket(String prod, String id);
    public void upShopBasket(String prod, String id, Integer orderCnt);
    public List<ProdInfoVO> getShopBasketList(String id,String prod, String date);
    public List<CustInfoVO> getShipCorpList(String id);
    public String getMonthOrderAmt(String id);
    public List<ProdInfoVO> getOrderHist(HashMap<String,Object> params);
    public List<OrderInfoVO> getOrderList(String prod,String shipId, String id, String shipDateFrom, String shipDateTo, String searchMode);
    public void delOrder(String prod, String id, String orderNo);
    public List<ProdInfoVO> getShipList(String id, String shipDateFrom, String shipDateTo);
    public void orderRequest(OrderInfoVO order);
    public boolean getPwdCheck(String id, String pwd);
    public void updatePwd(String id, String pwd);
	public void upOrder(HashMap<String,Object> params);
    public String getOrderNo();
    public ArrayList<String> findId(HashMap<String,String> params);
    public String findPwd(HashMap<String,String> params);
    public String getNotice(HashMap<String,String> params);
    public void disagree(HashMap<String,String> params);
    public void emailRequest(OrderInfoVO order);
    public void delEmail(HashMap<String,String> params);
    public void updateInven(HashMap<String,String> params);
    public List<ProdInfoVO> getLargeCtg(HashMap<String,String> params);
    public List<ProdInfoVO> getMediumCtg(HashMap<String,String> params);
    public List<OrderInfoVO> getOrderInfo(HashMap<String,String> params);
}