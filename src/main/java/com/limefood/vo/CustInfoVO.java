package com.limefood.vo;

public class CustInfoVO {
    private String id;              //아이디
    private String password;          //비밀번호
    private String name;            //이름
    private String telPhone;        //전화번호
    private String celPhone;       //휴대폰번호
    private String email;           //이메일
    private String corpName;             //사업장명
    private String corpNum;          //사업자번호
    private String custType;        //고객구분 (사업자/개인 구분용도)
    private String lastLogin;   // 최종 로그인 시간
    private String adminFlag;   // 관리자유무
    private String lockFlag;   // 접속차단유무
    private String passwordKey;  //암호화 Key
    private String manage_id;
    private String basAddr; //기본주소
    private String dtlAddr; //상세주소
    private String cretId;  //생성자 아이디
    private String cretTime;  //생성시간
    private String remark;   //메모
    private int totalCustCnt; //전체 고객수
    private int totalCorpCnt; // 전체 고객사 수
    private String head_corp_id;  // 본점 아이디
    private String browser;
    private String userAgent;


    /**
     * @return String return the id
     */
    public String getId() {
        return id;
    }

    public int getTotalCustCnt() {
		return totalCustCnt;
	}

	public void setTotalCustCnt(int totalCustCnt) {
		this.totalCustCnt = totalCustCnt;
	}

	public int getTotalCorpCnt() {
		return totalCorpCnt;
	}

	public void setTotalCorpCnt(int totalCorpCnt) {
		this.totalCorpCnt = totalCorpCnt;
	}

	public String getDtlAddr() {
		return dtlAddr;
	}

	public void setDtlAddr(String dtlAddr) {
		this.dtlAddr = dtlAddr;
	}

	public String getBasAddr() {
		return basAddr;
	}

	public void setBasAddr(String basAddr) {
		this.basAddr = basAddr;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getCretTime() {
		return cretTime;
	}

	public void setCretTime(String cretTime) {
		this.cretTime = cretTime;
	}

	public String getCretId() {
		return cretId;
	}

	public void setCretId(String cretId) {
		this.cretId = cretId;
	}
	public String getCorpNum() {
		return corpNum;
	}

	public void setCorpNum(String corpNum) {
		this.corpNum = corpNum;
	}

	public String getCorpName() {
		return corpName;
	}

	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getManage_id() {
		return manage_id;
	}

	public void setManage_id(String manage_id) {
		this.manage_id = manage_id;
	}

	public String getLockFlag() {
		return lockFlag;
	}

	public void setLockFlag(String lockFlag) {
		this.lockFlag = lockFlag;
	}

	public String getPasswordKey() {
		return passwordKey;
	}

	public void setPasswordKey(String passwordKey) {
		this.passwordKey = passwordKey;
	}

	public String getAdminFlag() {
		return adminFlag;
	}

	public void setAdminFlag(String adminFlag) {
		this.adminFlag = adminFlag;
	}

	public String getCustType() {
		return custType;
	}

	public void setCustType(String custType) {
		this.custType = custType;
	}

	/**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return String return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return String return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return String return the telPhone
     */
    public String getTelPhone() {
        return telPhone;
    }

    /**
     * @param telPhone the telPhone to set
     */
    public void setTelPhone(String telPhone) {
        this.telPhone = telPhone;
    }

    /**
     * @return String return the celPhone
     */
    public String getCelPhone() {
        return celPhone;
    }

    /**
     * @param celPhone the celPhone to set
     */
    public void setCelPhone(String celPhone) {
        this.celPhone = celPhone;
    }

    /**
     * @return String return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }
    /**
     * @return String return the lastLogin
     */
    public String getLastLogin() {
        return lastLogin;
    }

    /**
     * @param last_login the lastLogin to set
     */
    public void setLastLogin(String lastLogin) {
        this.lastLogin = lastLogin;
    }
    /**
     * @return String return the head_corp_id
     */
    public String getHead_corp_id() {
        return head_corp_id;
    }

    /**
     * @param head_corp_id the head_corp_id to set
     */
    public void setHead_corp_id(String head_corp_id) {
        this.head_corp_id = head_corp_id;
    }

	@Override
	public String toString() {
		return "CustInfoVO [adminFlag=" + adminFlag + ", basAddr=" + basAddr + ", celPhone=" + celPhone + ", corpName="
				+ corpName + ", corpNum=" + corpNum + ", cretId=" + cretId + ", cretTime=" + cretTime + ", custType="
				+ custType + ", dtlAddr=" + dtlAddr + ", email=" + email + ", head_corp_id=" + head_corp_id + ", id="
				+ id + ", lastLogin=" + lastLogin + ", lockFlag=" + lockFlag + ", manage_id=" + manage_id + ", name="
				+ name + ", password=" + password + ", passwordKey=" + passwordKey + ", remark=" + remark
				+ ", telPhone=" + telPhone + ", totalCorpCnt=" + totalCorpCnt + ", totalCustCnt=" + totalCustCnt + "]";
	}


    /**
     * @return String return the browser
     */
    public String getBrowser() {
        return browser;
    }

    /**
     * @param browser the browser to set
     */
    public void setBrowser(String browser) {
        this.browser = browser;
    }


    /**
     * @return String return the userAgent
     */
    public String getUserAgent() {
        return userAgent;
    }

    /**
     * @param userAgent the userAgent to set
     */
    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

}
