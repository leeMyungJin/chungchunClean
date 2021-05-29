package com.limefood.Service;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.limefood.vo.CorpInfoVO;
import com.limefood.vo.CtgInfoVO;
import com.limefood.vo.CustInfoVO;
import com.limefood.vo.OrderInfoVO;
import com.limefood.vo.ProdInfoVO;
import com.limefood.vo.SalesVO;

public interface AdminService {
    public List<CustInfoVO> getCustInfoList(String cond, String value);
    public void regCustInfo(CustInfoVO vo);
    public void updateCustInfo(CustInfoVO vo, HttpServletRequest req);
    public CorpInfoVO getCorpInfoList(String corpName);
    public int getCorpCnt();
    public int getCustCnt();
    public void deleteCust( HashMap<String,String> params);
    public List<ProdInfoVO> getProdUint( HashMap<String,String> params);
    public void addProdUnit( HashMap<String,String> params);
    public void delProdUnit( HashMap<String,String> params);
    public List<CtgInfoVO> getCtg( HashMap<String,String> params);
    public CtgInfoVO getCtgCnt( HashMap<String,String> params);
    public void addCtg( HashMap<String,String> params);
    public void delCtg( HashMap<String,String> params); 
    public List<ProdInfoVO> getProdList( HashMap<String,Object> params);
    public List<ProdInfoVO> getPriceList( HashMap<String,Object> params);
    public void savePrice(HashMap<String,String> params);
    public void saveProd(HashMap<String,String> params);
    public void delProd(HashMap<String,String> params);
    public List<OrderInfoVO> getOrderList( HashMap<String,Object> params);
    public HashMap<String,Object> getOrderInfo( HashMap<String,Object> params);
    public void addOrder( HashMap<String,String> params);
    public void delOrder( HashMap<String,String> params);
    public List<CorpInfoVO> getCorpList(HashMap<String,String> params);
    public void modifyCustInfo(HashMap<String,String> params);
    public void addChild(HashMap<String,String> params);
    public List<CorpInfoVO> getChild(HashMap<String,String> params);
    public String checkProdCode(HashMap<String,String> params);
    public String checkCtgCode(HashMap<String,String> params);
    public String checkId(HashMap<String,String> params);
    public String specTotalPrice(HashMap<String, Object> params);
    public String specSalesPrice(HashMap<String, Object> params);
    public HashMap<String,String> specBaseInfo(HashMap<String, Object> params);
    public Integer getProdCnt(HashMap<String,String> params);
    public List<ProdInfoVO> getInven(HashMap<String,Object>params);
    public void addInven(HashMap<String,String> params);
    public List<SalesVO> getSales(HashMap<String,Object> params);
    public HashMap<String,Object> getYearInfo(HashMap<String,String> params);
    public HashMap<String,Object> getSalesInfo(HashMap<String,Object> params);
    public void addDeposit(HashMap<String,String> params);
    public SalesVO getSalesSpecInfo(HashMap<String, Object> params);

}