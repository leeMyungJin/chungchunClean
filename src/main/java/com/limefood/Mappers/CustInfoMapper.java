package com.limefood.Mappers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.limefood.vo.CustInfoVO;
import com.limefood.vo.OrderInfoVO;
import com.limefood.vo.ProdInfoVO;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CustInfoMapper  {

	public List<CustInfoVO> getCustInfoList();
	public void regCustInfo(CustInfoVO vo);
	public void updateCustInfo(CustInfoVO vo);
	public CustInfoVO getCustInfo(CustInfoVO vo);
	public List<ProdInfoVO> getProdInfoList(HashMap<String,Object>params);
	public void addBookmark(@Param(value="prod")String prod, @Param(value="id")String id);
	public void delBookmark(@Param(value="prod")String prod, @Param(value="id")String id);
	public List<ProdInfoVO> getBookmarkList(HashMap<String,Object>params);
	public void addShopBasket(@Param(value="prod")String prod, @Param(value="id")String id, @Param(value="orderCnt")Integer orderCnt);
	public void delShopBasket(@Param(value="prod")String prod, @Param(value="id")String id);
	public void upShopBasket(@Param(value="prodCode")String prodCode, @Param(value="id")String id, @Param(value="orderCnt")Integer orderCnt);		
	public List<ProdInfoVO> getShopBasketList(@Param(value="id")String id, @Param(value="prod")List<String> prod, @Param(value="date") String date);
	public List<CustInfoVO> getShipCorpList(@Param(value="id")String id);
	public String getMonthOrderAmt(@Param(value="id")String id);
	public List<ProdInfoVO> getOrderHist(HashMap<String,Object>params);
	public List<ProdInfoVO> getShipList(@Param(value="id")String id, @Param(value="prod")List<String>prod, @Param(value="date")String date);
	public List<OrderInfoVO> getOrderList(@Param(value="prod") List<String> prod, @Param(value="shipId")String shipId,@Param(value="id")String id, @Param(value="shipDateFrom")String shipDateFrom, @Param(value="shipDateTo")String shipDateTo ,@Param("searchMode")String searchMode);
	public void orderRequest(OrderInfoVO order);    	
	public void delOrder(@Param(value="prod")String prod, @Param(value="id")String id, @Param(value="orderNo")String orderNo);
	public void upOrder(HashMap<String,Object> params);
	public void updatePwd(@Param(value="id")String id, @Param(value="pwd") String pwd);
	public String getOrderNo();
	public ArrayList<String> findId(HashMap<String,String> params);
	public String findPwd(HashMap<String,String> params);
	public String getNotice(HashMap<String,String>params);
	public void disagree(HashMap<String,String> params);
	public void emailRequest(OrderInfoVO order);
	public void delEmail(HashMap<String, String> params);
	public void updateInven(HashMap<String,String> params);
	public List<ProdInfoVO> getLargeCtg(HashMap<String,String> params);
	public List<ProdInfoVO> getMediumCtg(HashMap<String,String> params);
	public List<OrderInfoVO> getOrderInfo(HashMap<String,String> params);
}
