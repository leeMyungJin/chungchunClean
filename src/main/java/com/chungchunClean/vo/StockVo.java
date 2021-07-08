package com.chungchunClean.vo;

public class StockVo {

	private String l_categy_cd;     	//대카테고리코드
	private String l_categy_nm;    	 //대카테고리명
	private String m_categy_cd;     //중카테고리코드
	private String m_categy_nm;    //중카테고리명
	private Double cost;           		//원가
	private String item_cd;     		    //물품코드
	private String item_nm;    		    //물품명
	private String qr_url;          		//QR코드 URL
    private Integer quantity; 		    // 재고
    private String status;          		// 재고 상태
    private String reg_date;        		//등록일시 coalesce(updt_dt, cret_dt)
    private String cret_dt;         		//등록일
    private String cret_id;         		//등록자
    private String updt_dt;         		//수정일
    private String updt_id;         		//수정자
    
    private String sar_seq; 				//입출이력 시퀀스
    private String classifi_cd; 			//분류코드
	private String classifi_nm; 			//분류명
	private String sar_quantity; 		//입출고수량
	private String return_quantity; 	//반품입출고수량
	private String cret_nm; 				//등록자명
	
	public String getL_categy_cd() {
		return l_categy_cd;
	}
	public void setL_categy_cd(String l_categy_cd) {
		this.l_categy_cd = l_categy_cd;
	}
	public String getL_categy_nm() {
		return l_categy_nm;
	}
	public void setL_categy_nm(String l_categy_nm) {
		this.l_categy_nm = l_categy_nm;
	}
	public String getM_categy_cd() {
		return m_categy_cd;
	}
	public void setM_categy_cd(String m_categy_cd) {
		this.m_categy_cd = m_categy_cd;
	}
	public String getM_categy_nm() {
		return m_categy_nm;
	}
	public void setM_categy_nm(String m_categy_nm) {
		this.m_categy_nm = m_categy_nm;
	}
	public Double getCost() {
		return cost;
	}
	public void setCost(Double cost) {
		this.cost = cost;
	}
	public String getItem_cd() {
		return item_cd;
	}
	public void setItem_cd(String item_cd) {
		this.item_cd = item_cd;
	}
	public String getItem_nm() {
		return item_nm;
	}
	public void setItem_nm(String item_nm) {
		this.item_nm = item_nm;
	}
	public String getQr_url() {
		return qr_url;
	}
	public void setQr_url(String qr_url) {
		this.qr_url = qr_url;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getReg_date() {
		return reg_date;
	}
	public void setReg_date(String reg_date) {
		this.reg_date = reg_date;
	}
	public String getCret_dt() {
		return cret_dt;
	}
	public void setCret_dt(String cret_dt) {
		this.cret_dt = cret_dt;
	}
	public String getCret_id() {
		return cret_id;
	}
	public void setCret_id(String cret_id) {
		this.cret_id = cret_id;
	}
	public String getUpdt_dt() {
		return updt_dt;
	}
	public void setUpdt_dt(String updt_dt) {
		this.updt_dt = updt_dt;
	}
	public String getUpdt_id() {
		return updt_id;
	}
	public void setUpdt_id(String updt_id) {
		this.updt_id = updt_id;
	}
	public String getSar_seq() {
		return sar_seq;
	}
	public void setSar_seq(String sar_seq) {
		this.sar_seq = sar_seq;
	}
	public String getClassifi_cd() {
		return classifi_cd;
	}
	public void setClassifi_cd(String classifi_cd) {
		this.classifi_cd = classifi_cd;
	}
	public String getClassifi_nm() {
		return classifi_nm;
	}
	public void setClassifi_nm(String classifi_nm) {
		this.classifi_nm = classifi_nm;
	}
	public String getSar_quantity() {
		return sar_quantity;
	}
	public void setSar_quantity(String sar_quantity) {
		this.sar_quantity = sar_quantity;
	}
	public String getReturn_quantity() {
		return return_quantity;
	}
	public void setReturn_quantity(String return_quantity) {
		this.return_quantity = return_quantity;
	}
	public String getCret_nm() {
		return cret_nm;
	}
	public void setCret_nm(String cret_nm) {
		this.cret_nm = cret_nm;
	}
	@Override
	public String toString() {
		return "StockVo [l_categy_cd=" + l_categy_cd + ", l_categy_nm=" + l_categy_nm + ", m_categy_cd=" + m_categy_cd
				+ ", m_categy_nm=" + m_categy_nm + ", cost=" + cost + ", item_cd=" + item_cd + ", item_nm=" + item_nm
				+ ", qr_url=" + qr_url + ", quantity=" + quantity + ", status=" + status + ", reg_date=" + reg_date
				+ ", cret_dt=" + cret_dt + ", cret_id=" + cret_id + ", updt_dt=" + updt_dt + ", updt_id=" + updt_id
				+ ", sar_seq=" + sar_seq + ", classifi_cd=" + classifi_cd + ", classifi_nm=" + classifi_nm
				+ ", sar_quantity=" + sar_quantity + ", return_quantity=" + return_quantity + ", cret_nm=" + cret_nm
				+ "]";
	}

    


}
