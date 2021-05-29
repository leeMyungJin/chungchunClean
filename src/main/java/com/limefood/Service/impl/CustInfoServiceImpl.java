package com.limefood.Service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.limefood.Mappers.CustInfoMapper;
import com.limefood.Mappers.LoginMapper;
import com.limefood.Service.CustInfoService;
import com.limefood.Util.Encrypt;
import com.limefood.Util.Util;
import com.limefood.vo.CustInfoVO;
import com.limefood.vo.OrderInfoVO;
import com.limefood.vo.ProdInfoVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustInfoServiceImpl implements CustInfoService {

	@Autowired
	private CustInfoMapper custInfoMapper;

	@Autowired
	private LoginMapper login;
	//고객리스트 가져오기
	@Override
	public List<CustInfoVO> getCustInfoList() {
		return custInfoMapper.getCustInfoList();
	}
	//고객등록
	@Override
	public void regCustInfo(CustInfoVO vo){
		custInfoMapper.regCustInfo(vo);
	}
	//고객정보 변경
	@Override
	public void updateCustInfo(CustInfoVO vo, HttpServletRequest req) {
		HttpSession session = req.getSession();
		vo.setId(session.getAttribute("id").toString());
		custInfoMapper.updateCustInfo(vo);
		vo = custInfoMapper.getCustInfo(vo);

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
	//즐겨찾기 추가
	@Override
	public void addBookmark(String prod, String id){
		custInfoMapper.addBookmark(prod, id);
	}
	//즐겨찾기 삭제
	@Override
	public void delBookmark(String prod, String id){
		custInfoMapper.delBookmark(prod, id);
	}

	//즐겨찾기 리스트 가져오기
	@Override
	public List<ProdInfoVO> getBookmarkList(HashMap<String,Object> params) { 
		if(params.get("prod") != null)
			params.replace("prod", Util.makeForeach((String)params.get("prod"), ","));
		return custInfoMapper.getBookmarkList(params);
	}
	//장바구니 담기
	@Override
	public void addShopBasket(String prod, String id, Integer orderCnt) {
		custInfoMapper.addShopBasket(prod, id, orderCnt);
	}
	//장바구니 삭제
	@Override
	public void delShopBasket(String prod, String id) {
		custInfoMapper.delShopBasket(prod, id);
	}
	//장바구니 업데이트
	@Override
	public void upShopBasket(String prod, String id, Integer orderCnt) {
		custInfoMapper.upShopBasket(prod, id, orderCnt);
	}
	//장바구니 리스트 가져오기
	@Override
	public List<ProdInfoVO> getShopBasketList(String id, String prod, String date) {
		return custInfoMapper.getShopBasketList(id, Util.makeForeach(prod, ","), date);
	}
	//상품정보 리스트 가져오기
	@Override
	public List<ProdInfoVO> getProdInfoList(HashMap<String,Object> params) {
		if(params.get("prod") != null)
			params.replace("prod", Util.makeForeach((String)params.get("prod"), ","));
		return custInfoMapper.getProdInfoList(params);
	}
	//배송사업장 리스트 가져오기
	@Override
	public List<CustInfoVO> getShipCorpList(String id) {
		return custInfoMapper.getShipCorpList(id);
	}
	//월주문금액 가져오기
	@Override
	public String getMonthOrderAmt(String id) {
		return custInfoMapper.getMonthOrderAmt(id);
	}
	//주문이력 가져오기
	@Override
	public List<ProdInfoVO> getOrderHist(HashMap<String,Object> params) {
		if(params.get("prod") != null)
			params.replace("prod", Util.makeForeach((String)params.get("prod"), ","));
		return custInfoMapper.getOrderHist(params);
	}
	//미사용
	@Override
	public List<ProdInfoVO> getShipList(String id, String shipDateFrom, String shipDateTo) {
		return null;
	}

	//주문요청
	@Override
	public void orderRequest(OrderInfoVO order) {
		custInfoMapper.orderRequest(order);
	}
	//주문삭제
	@Override
	public void delOrder(String prod, String id, String orderNo) {
		custInfoMapper.delOrder(prod,id, orderNo);
		
	}

	@Override
	public List<OrderInfoVO> getOrderList(String prod,String shipId,String id, String shipDateFrom, String shipDateTo, String searchMode) {
		return custInfoMapper.getOrderList(Util.makeForeach(prod, ","), shipId,id, shipDateFrom, shipDateTo, searchMode);
	}
	//패스워드체크
	@Override
	public boolean getPwdCheck(String id, String pwd) {
		boolean result = false;
		CustInfoVO usr = new CustInfoVO();
		usr.setId(id);
		usr = login.getPassword(usr);

		if(usr.getPassword().equals(Encrypt.setSHA512(pwd, usr.getPasswordKey()))){
			result = true;
		}
		System.out.println("pwd check result :" + result);
		return result;
	}
	//패스워드업데이트
	@Override
	public void updatePwd(String id, String pwd) {
		CustInfoVO usr = new CustInfoVO();
		usr.setId(id);
		usr = login.getPassword(usr);	
		String shaPwd = Encrypt.setSHA512(pwd, usr.getPasswordKey());
		custInfoMapper.updatePwd(id, shaPwd);
	}
	//주문내역 업데이트
	@Override
	public void upOrder(HashMap<String,Object> params) {
				custInfoMapper.upOrder(params);
		
	}

	//주문번호생성
	@Override
	public String getOrderNo() {
		return custInfoMapper.getOrderNo();
	}

	//아이디찾기
	@Override
	public ArrayList<String> findId(HashMap<String, String> params) {
		return custInfoMapper.findId(params);
	}

	//비밀번호찾기
	@Override
	public String findPwd(HashMap<String, String> params) {
		return custInfoMapper.findPwd(params);
	}
	//공지사항 가져오기
	@Override
	public String getNotice(HashMap<String, String> params) {
		return custInfoMapper.getNotice(params);
	}
	//최초 로그인 시 개인정보동의 미동의
	@Override
	public void disagree(HashMap<String, String> params) {
		custInfoMapper.disagree(params);
		
	}
	//이메일발송
	@Override
	public void emailRequest(OrderInfoVO order) {
		custInfoMapper.emailRequest(order);
	}
	//이메일발송삭제
	@Override
	public void delEmail(HashMap<String, String> params) {
		custInfoMapper.delEmail(params);
		
	}
	//수량변경
	@Override
	public void updateInven(HashMap<String,String> params) {
		if(params.get("orderCnt")!= "NaN")
			custInfoMapper.updateInven(params);
		
	}
	//대카테고리 가져오기
	@Override
	public List<ProdInfoVO> getLargeCtg(HashMap<String, String> params) {
		return custInfoMapper.getLargeCtg(params);
	}
	//중카테고리 가져오기
	@Override
	public List<ProdInfoVO> getMediumCtg(HashMap<String, String> params) {
		return custInfoMapper.getMediumCtg(params);
	}
	//주문정보 가져오기
	@Override
	public List<OrderInfoVO> getOrderInfo(HashMap<String, String> params) {
		return custInfoMapper.getOrderInfo(params);
	}

}