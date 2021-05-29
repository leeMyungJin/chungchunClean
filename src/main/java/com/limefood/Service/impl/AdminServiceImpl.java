package com.limefood.Service.impl;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.limefood.Mappers.AdminMapper;
import com.limefood.Mappers.CustInfoMapper;
import com.limefood.Mappers.LoginMapper;
import com.limefood.Service.AdminService;
import com.limefood.Util.Encrypt;
import com.limefood.Util.Util;
import com.limefood.vo.CorpInfoVO;
import com.limefood.vo.CtgInfoVO;
import com.limefood.vo.CustInfoVO;
import com.limefood.vo.OrderInfoVO;
import com.limefood.vo.ProdInfoVO;
import com.limefood.vo.SalesVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService{

	@Autowired
	AdminMapper adminMapper ;

	@Autowired
	CustInfoMapper custInfoMapper;

	@Autowired
	private LoginMapper login;

	@Override
	public List<CustInfoVO> getCustInfoList(String cond, String value) {
		return adminMapper.getCustInfoList(cond,Util.makeForeach(value, ","));
	}

	@Override
	public void regCustInfo(CustInfoVO vo){
		adminMapper.regCustInfo(vo);
	}

	@Override
	public void updateCustInfo(CustInfoVO vo, HttpServletRequest req) {
		HttpSession session = req.getSession();
		vo.setId(session.getAttribute("id").toString());
		adminMapper.updateCustInfo(vo);
		vo = adminMapper.getCustInfo(vo);

		// session 값 재 설정.
		session.setAttribute("id", vo.getId());
		session.setAttribute("name", vo.getName());
		session.setAttribute("celPhone", vo.getCelPhone());
		session.setAttribute("telPhone", vo.getTelPhone());
		session.setAttribute("email", vo.getEmail());
		session.setAttribute("corpName", vo.getCorpName());
		session.setAttribute("corpNum", vo.getCorpNum());
		session.setAttribute("basAddr", vo.getBasAddr());
		session.setAttribute("dtlAddr", vo.getDtlAddr());
		session.setAttribute("adminFlag", vo.getAdminFlag());
		session.setAttribute("lastLogin", vo.getLastLogin());

	}

	@Override
	public CorpInfoVO getCorpInfoList(String corpName) {
		return null;
	}

	@Override
	public int getCorpCnt() {
		return adminMapper.getCorpCnt();
	}

	@Override
	public int getCustCnt() {
		return adminMapper.getCustCnt();
	}

	@Override
	public List<ProdInfoVO> getProdUint(HashMap<String, String> params) {
		return adminMapper.getProdUnit();
	}

	@Override
	public void addProdUnit(HashMap<String, String> params) {
		adminMapper.addProdUnit(params);
		
	}

	@Override
	public void delProdUnit(HashMap<String, String> params) {
		adminMapper.delProdUnit(params);
		
	}

	@Override
	public List<CtgInfoVO> getCtg(HashMap<String, String> params) {
		return adminMapper.getCtg(params);
	}

	@Override
	public void addCtg(HashMap<String, String> params) {
		adminMapper.addCtg(params);
		
	}

	@Override
	public void delCtg(HashMap<String, String> params) {
		adminMapper.delCtg(params);
		
	}

	@Override
	public List<ProdInfoVO> getProdList(HashMap<String, Object> params) {
		params.replace("search", params.get("search"), Util.makeForeach(params.get("search").toString(), ","));
		return adminMapper.getProdList(params);
	}

	@Override
	public List<ProdInfoVO> getPriceList(HashMap<String, Object> params) {
		params.replace("search", params.get("search"), Util.makeForeach(params.get("search").toString(), ","));
		return adminMapper.getPriceList(params);
	}

	@Override
	public void savePrice(HashMap<String, String> params) {
		adminMapper.savePrice(params);
	}
	@Override
	public void saveProd(HashMap<String, String> params) {
		 adminMapper.saveProd(params);
		
	}
	@Override
	public List<OrderInfoVO> getOrderList(HashMap<String, Object> params) {
		if(params.get("searchText") != null)
			params.replace("searchText", params.get("searchText"), Util.makeForeach(params.get("searchText").toString(), ","));
		return adminMapper.getOrderList(params);
	}

	@Override
	public HashMap<String, Object> getOrderInfo(HashMap<String, Object> params) {
		params.replace("searchText", params.get("searchText"), Util.makeForeach(params.get("searchText").toString(), ","));
		return adminMapper.getOrderInfo(params);
	}	
	@Override
	public void addOrder(HashMap<String, String> params) {
		adminMapper.addOrder(params);
		
	}

	@Override
	public void delOrder(HashMap<String, String> params) {
		if(params.get("prodCode") == null){
			List<OrderInfoVO> order = adminMapper.getDelOrder(params);
			HashMap<String,String> delInfo = new HashMap<String,String>();
			for(int i=0; i< order.size(); i++){
				delInfo.put("prodCode",order.get(i).getProdCode());
				delInfo.put("orderCnt",String.valueOf(order.get(i).getOrderCnt()*-1));
				custInfoMapper.updateInven(delInfo);
			}
		}else{
			custInfoMapper.updateInven(params);
		}
		adminMapper.delOrder(params);
	}

	@Override
	public List<CorpInfoVO> getCorpList(HashMap<String, String> params) {
		return adminMapper.getCorpList(params);
	}

	@Override
	public void modifyCustInfo(HashMap<String, String> params) {
		String id = params.get("id");
		String password = params.get("password");
		if(password != ""){
			CustInfoVO usr = new CustInfoVO();
			usr.setId(id);
			usr = login.getPassword(usr);	
			String shaPwd = Encrypt.setSHA512(password, usr.getPasswordKey());
			params.replace("password", shaPwd);
		}
		adminMapper.modifyCustInfo(params);
	}

	@Override
	public void addChild(HashMap<String, String> params) {
		adminMapper.addChild(params);
		
	}
	@Override
	public List<CorpInfoVO> getChild(HashMap<String, String> params) {
		return adminMapper.getChild(params);
	}

	@Override
	public CtgInfoVO getCtgCnt(HashMap<String, String> params) {
		return adminMapper.getCtgCnt(params);
	}

	@Override
	public void delProd(HashMap<String, String> params) {
		adminMapper.delProd(params);
		
	}

	@Override
	public void deleteCust(HashMap<String, String> params) {
		adminMapper.deleteCust(params);
		
	}

	@Override
	public String checkProdCode(HashMap<String, String> params) {
		return adminMapper.checkProdCode(params);
	}

	@Override
	public String checkCtgCode(HashMap<String, String> params) {
		return adminMapper.checkCtgCode(params);
	}	

	@Override
	public String checkId(HashMap<String, String> params) {
		return adminMapper.checkId(params);
	}

	@Override
	public String specTotalPrice(HashMap<String, Object> params) {
		return adminMapper.specTotalPrice(params);
	}

	@Override
	public String specSalesPrice(HashMap<String, Object> params) {
		return adminMapper.specSalesPrice(params);
	}

	@Override
	public HashMap<String, String> specBaseInfo(HashMap<String, Object> params) {
		return adminMapper.specBaseInfo(params);
	}

	@Override
	public Integer getProdCnt(HashMap<String, String> params) {
		return adminMapper.getProdCnt(params);
	}

	@Override
	public List<ProdInfoVO> getInven(HashMap<String, Object> params) {
		if(params.get("search") != null)
			params.replace("search", params.get("search"), Util.makeForeach(params.get("search").toString(), ","));
		return adminMapper.getInven(params);
	}

	@Override
	public void addInven(HashMap<String, String> params) {
		adminMapper.addInven(params);
		
	}

	@Override
	public List<SalesVO> getSales(HashMap<String, Object> params) {
		if(params.get("search") != null)
			params.replace("search", params.get("search"), Util.makeForeach(params.get("search").toString(), ","));
		return adminMapper.getSales(params);
	}

	@Override
	public HashMap<String, Object> getYearInfo(HashMap<String, String> params) {
		return adminMapper.getYearInfo(params);
	}

	@Override
	public HashMap<String, Object> getSalesInfo(HashMap<String, Object> params) {
		if(params.get("search") != null)
			params.replace("search", params.get("search"), Util.makeForeach(params.get("search").toString(), ","));
		return adminMapper.getSalesInfo(params);
	}

	@Override
	public void addDeposit(HashMap<String, String> params) {
		adminMapper.addDeposit(params);
		
	}

	@Override
	public SalesVO getSalesSpecInfo(HashMap<String, Object> params) {
		return adminMapper.getSalesSpecInfo(params);
	}
}