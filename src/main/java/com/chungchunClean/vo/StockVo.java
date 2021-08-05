package com.chungchunClean.vo;

public class StockVo {

	private String lCategyCd;     	//대카테고리코드
	private String lCategyNm;    	 //대카테고리명
	private Double cost;           		//원가
	private String itemCd;     		    //물품코드
	private String itemNm;    		    //물품명
	private String qrUrl;          		//QR코드 URL
    private Integer quantity; 		    // 재고
    private String status;          		// 재고 상태
    private String regDate;        		//등록일시 coalesce(updtDt, cretDt)
    private String cretDt;         		//등록일
    private String cretId;         		//등록자
    private String updtDt;         		//수정일
    private String updtId;         		//수정자
    private String updtNm;				//수정자명
    
    private String cateSarSeq; 				//입출이력 시퀀스
    private String classifiCd; 			//분류코드
	private String classifiNm; 			//분류명
	private Integer sarQuantity; 		//입출고수량
	private Integer returnQuantity; 	//반품입출고수량
	private String cretNm; 				//등록자명
	private String activeYn;			//입출이력 수정가능여부
	
	public String getlCategyCd() {
		return lCategyCd;
	}
	public void setlCategyCd(String lCategyCd) {
		this.lCategyCd = lCategyCd;
	}
	public String getlCategyNm() {
		return lCategyNm;
	}
	public void setlCategyNm(String lCategyNm) {
		this.lCategyNm = lCategyNm;
	}
	public Double getCost() {
		return cost;
	}
	public void setCost(Double cost) {
		this.cost = cost;
	}
	public String getItemCd() {
		return itemCd;
	}
	public void setItemCd(String itemCd) {
		this.itemCd = itemCd;
	}
	public String getItemNm() {
		return itemNm;
	}
	public void setItemNm(String itemNm) {
		this.itemNm = itemNm;
	}
	public String getQrUrl() {
		return qrUrl;
	}
	public void setQrUrl(String qrUrl) {
		this.qrUrl = qrUrl;
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
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getCretDt() {
		return cretDt;
	}
	public void setCretDt(String cretDt) {
		this.cretDt = cretDt;
	}
	public String getCretId() {
		return cretId;
	}
	public void setCretId(String cretId) {
		this.cretId = cretId;
	}
	public String getUpdtDt() {
		return updtDt;
	}
	public void setUpdtDt(String updtDt) {
		this.updtDt = updtDt;
	}
	public String getUpdtId() {
		return updtId;
	}
	public void setUpdtId(String updtId) {
		this.updtId = updtId;
	}
	public String getCateSarSeq() {
		return cateSarSeq;
	}
	public void setCateSarSeq(String cateSarSeq) {
		this.cateSarSeq = cateSarSeq;
	}
	public String getClassifiCd() {
		return classifiCd;
	}
	public void setClassifiCd(String classifiCd) {
		this.classifiCd = classifiCd;
	}
	public String getClassifiNm() {
		return classifiNm;
	}
	public void setClassifiNm(String classifiNm) {
		this.classifiNm = classifiNm;
	}
	public Integer getSarQuantity() {
		return sarQuantity;
	}
	public void setSarQuantity(Integer sarQuantity) {
		this.sarQuantity = sarQuantity;
	}
	public Integer getReturnQuantity() {
		return returnQuantity;
	}
	public void setReturnQuantity(Integer returnQuantity) {
		this.returnQuantity = returnQuantity;
	}
	public String getCretNm() {
		return cretNm;
	}
	public void setCretNm(String cretNm) {
		this.cretNm = cretNm;
	}
	public String getActiveYn() {
		return activeYn;
	}
	public void setActiveYn(String activeYn) {
		this.activeYn = activeYn;
	}
	public String getUpdtNm() {
		return updtNm;
	}
	public void setUpdtNm(String updtNm) {
		this.updtNm = updtNm;
	}
	@Override
	public String toString() {
		return "StockVo [lCategyCd=" + lCategyCd + ", lCategyNm=" + lCategyNm + ", cost=" + cost + ", itemCd=" + itemCd
				+ ", itemNm=" + itemNm + ", qrUrl=" + qrUrl + ", quantity=" + quantity + ", status=" + status
				+ ", regDate=" + regDate + ", cretDt=" + cretDt + ", cretId=" + cretId + ", updtDt=" + updtDt
				+ ", updtId=" + updtId + ", updtNm=" + updtNm + ", cateSarSeq=" + cateSarSeq + ", classifiCd="
				+ classifiCd + ", classifiNm=" + classifiNm + ", sarQuantity=" + sarQuantity + ", returnQuantity="
				+ returnQuantity + ", cretNm=" + cretNm + ", activeYn=" + activeYn + "]";
	}
	
	
	
	
	
}
