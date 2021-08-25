package com.chungchunClean.vo;

public class StaffVo {
	private String staffId; 	//직원 아이디 
	private String staffPass; 	//직원 비밀번
	private String staffName;	//직원 이름 
	private String staffPnum;	//직원 전화번호 
	private String staffEmail; 	//직원 이메
	private String memo;		//메모 
	private String activeYn;	//활성화여부 
	private String adminYn;		//관리자여부
	private String lateassDt;	//최근접속일
	private String cretDt;		//등록일
	private String cretId;		//등록자 
	private String updtDt;		//수정일 
	private String updtId;		//수정자 
	private String passwordKey; //비밀번호 솔트
	private String position; //직급 
	private String appversion;
	private String department; //부서

	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getStaffId() {
		return staffId;
	}
	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}
	public String getStaffPass() {
		return staffPass;
	}
	public void setStaffPass(String staffPass) {
		this.staffPass = staffPass;
	}
	public String getStaffName() {
		return staffName;
	}
	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}
	public String getStaffPnum() {
		return staffPnum;
	}
	public void setStaffPnum(String staffPnum) {
		this.staffPnum = staffPnum;
	}
	public String getStaffEmail() {
		return staffEmail;
	}
	public void setStaffEmail(String staffEmail) {
		this.staffEmail = staffEmail;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getActiveYn() {
		return activeYn;
	}
	public void setActiveYn(String activeYn) {
		this.activeYn = activeYn;
	}
	public String getAdminYn() {
		return adminYn;
	}
	public void setAdminYn(String adminYn) {
		this.adminYn = adminYn;
	}
	public String getLateassDt() {
		return lateassDt;
	}
	public void setLateassDt(String lateassDt) {
		this.lateassDt = lateassDt;
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
	public String getPasswordKey() {
		return passwordKey;
	}
	public void setPasswordKey(String passwordKey) {
		this.passwordKey = passwordKey;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public String getAppversion() {
		return appversion;
	}
	public void setAppversion(String appversion) {
		this.appversion = appversion;
	}
	
	@Override
	public String toString() {
		return "StaffVo [staffId=" + staffId + ", staffPass=" + staffPass + ", staffName=" + staffName + ", staffPnum="
				+ staffPnum + ", staffEmail=" + staffEmail + ", memo=" + memo + ", activeYn=" + activeYn + ", adminYn="
				+ adminYn + ", lateassDt=" + lateassDt + ", cretDt=" + cretDt + ", cretId=" + cretId + ", updtDt="
				+ updtDt + ", updtId=" + updtId + ", passwordKey=" + passwordKey + ", position=" + position
				+ ", appversion=" + appversion + "]";
	}
	
	
	
	
}
