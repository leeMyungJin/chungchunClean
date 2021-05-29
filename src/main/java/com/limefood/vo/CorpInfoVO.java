package com.limefood.vo;

public class CorpInfoVO {
    private String corpName;    //주사업장명 
    private String corpNum;      //사업장번호
    private String cretId;       //생성자아이디
    private String cretTime;     //생성시간
    private String subCorpName; //지점명
    private int totalCorpCnt;   //전체고객사수
    private String id;          //사업자아이디
    private String name;        //이름


    /**
     * @return String return the cretTime
     */
    public String getCretTime() {
        return cretTime;
    }

    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	/**
     * @param cretTime the cretTime to set
     */
    public void setCretTime(String cretTime) {
        this.cretTime = cretTime;
    }
    /**
     * @return String return the corpName
     */
    public String getCorpName() {
        return corpName;
    }

    /**
     * @param corpName the corpName to set
     */
    public void setCorpName(String corpName) {
        this.corpName = corpName;
    }


    /**
     * @return String return the corpNum
     */
    public String getCorpNum() {
        return corpNum;
    }

    /**
     * @param corpNum the corpNum to set
     */
    public void setCorpNum(String corpNum) {
        this.corpNum = corpNum;
    }

    /**
     * @return String return the cretId
     */
    public String getCretId() {
        return cretId;
    }

    /**
     * @param cretId the cretId to set
     */
    public void setCretId(String cretId) {
        this.cretId = cretId;
    }

    /**
     * @return String return the subCorpName
     */
    public String getSubCorpName() {
        return subCorpName;
    }

    /**
     * @param subCorpName the subCorpName to set
     */
    public void setSubCorpName(String subCorpName) {
        this.subCorpName = subCorpName;
    }

    /**
     * @return int return the totalCorpCnt
     */
    public int getTotalCorpCnt() {
        return totalCorpCnt;
    }

    /**
     * @param totalCorpCnt the totalCorpCnt to set
     */
    public void setTotalCorpCnt(int totalCorpCnt) {
        this.totalCorpCnt = totalCorpCnt;
    }

	@Override
	public String toString() {
		return "CorpInfoVO [corpName=" + corpName + ", corpNum=" + corpNum + ", cretId=" + cretId + ", cretTime="
				+ cretTime + ", subCorpName=" + subCorpName + ", totalCorpCnt=" + totalCorpCnt + "]";
	}

}
