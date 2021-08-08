package com.chungchunClean.vo;

public class DailyVo {
	private String dailyMntrCd; //일일점검코드 
	private String areaCd;		//지역코드 
	private String areaNm; 		//지역명
	private String bldgCd; 		//건물코드 
	private String bldgNm; 		//건물명
	private String dtlAddr; 	//상세주소 
	private String clientNm; 	//사업주명(고객명)
	private String onWorkDt;	//출근일시  
	private String offWorkDt;	//퇴근일시  
	private String officerNm; 	//담당자명 
	private String visitDt;		//방문일시
	private Integer garbgCnt;	//종량제  
	private Integer foodChipCnt;//음식물칩 
	private String siteMntrUrl;	//현장점검 URL
	private String postLocNm; 	//근태위치 
	private String dongNum;		//동번호
	private String memo; 		//근태특이사항
	private String dmemo;		//점검특이사항
	private String imgPath; 	//현장점검사
	private String cretDt;		//등록일자
	private String cretId;		//등록자 
	private String updtDt;		//수정일자 
	private String updtId;		//수정자 
	public String getDailyMntrCd() {
		return dailyMntrCd;
	}
	public void setDailyMntrCd(String dailyMntrCd) {
		this.dailyMntrCd = dailyMntrCd;
	}
	public String getAreaCd() {
		return areaCd;
	}
	public void setAreaCd(String areaCd) {
		this.areaCd = areaCd;
	}
	public String getAreaNm() {
		return areaNm;
	}
	public void setAreaNm(String areaNm) {
		this.areaNm = areaNm;
	}
	public String getBldgCd() {
		return bldgCd;
	}
	public void setBldgCd(String bldgCd) {
		this.bldgCd = bldgCd;
	}
	public String getBldgNm() {
		return bldgNm;
	}
	public void setBldgNm(String bldgNm) {
		this.bldgNm = bldgNm;
	}
	public String getClientNm() {
		return clientNm;
	}
	public void setClientNm(String clientNm) {
		this.clientNm = clientNm;
	}
	public String getOnWorkDt() {
		return onWorkDt;
	}
	public void setOnWorkDt(String onWorkDt) {
		this.onWorkDt = onWorkDt;
	}
	public String getOffWorkDt() {
		return offWorkDt;
	}
	public void setOffWorkDt(String offWorkDt) {
		this.offWorkDt = offWorkDt;
	}
	public String getOfficerNm() {
		return officerNm;
	}
	public void setOfficerNm(String officerNm) {
		this.officerNm = officerNm;
	}
	public String getVisitDt() {
		return visitDt;
	}
	public void setVisitDt(String visitDt) {
		this.visitDt = visitDt;
	}
	public Integer getGarbgCnt() {
		return garbgCnt;
	}
	public void setGarbgCnt(Integer garbgCnt) {
		this.garbgCnt = garbgCnt;
	}
	public Integer getFoodChipCnt() {
		return foodChipCnt;
	}
	public void setFoodChipCnt(Integer foodChipCnt) {
		this.foodChipCnt = foodChipCnt;
	}
	public String getSiteMntrUrl() {
		return siteMntrUrl;
	}
	public void setSiteMntrUrl(String siteMntrUrl) {
		this.siteMntrUrl = siteMntrUrl;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
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
	public String getDtlAddr() {
		return dtlAddr;
	}
	public void setDtlAddr(String dtlAddr) {
		this.dtlAddr = dtlAddr;
	}
	public String getPostLocNm() {
		return postLocNm;
	}
	public void setPostLocNm(String postLocNm) {
		this.postLocNm = postLocNm;
	}
	public String getDongNum() {
		return dongNum;
	}
	public void setDongNum(String dongNum) {
		this.dongNum = dongNum;
	}
	public String getImgPath() {
		return imgPath;
	}
	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}
	public String getDmemo() {
		return dmemo;
	}
	public void setDmemo(String dmemo) {
		this.dmemo = dmemo;
	}
	@Override
	public String toString() {
		return "DailyVo [dailyMntrCd=" + dailyMntrCd + ", areaCd=" + areaCd + ", areaNm=" + areaNm + ", bldgCd="
				+ bldgCd + ", bldgNm=" + bldgNm + ", dtlAddr=" + dtlAddr + ", clientNm=" + clientNm + ", onWorkDt="
				+ onWorkDt + ", offWorkDt=" + offWorkDt + ", officerNm=" + officerNm + ", visitDt=" + visitDt
				+ ", garbgCnt=" + garbgCnt + ", foodChipCnt=" + foodChipCnt + ", siteMntrUrl=" + siteMntrUrl
				+ ", postLocNm=" + postLocNm + ", dongNum=" + dongNum + ", memo=" + memo + ", dmemo=" + dmemo
				+ ", imgPath=" + imgPath + ", cretDt=" + cretDt + ", cretId=" + cretId + ", updtDt=" + updtDt
				+ ", updtId=" + updtId + "]";
	}
	
	
	
	
}
