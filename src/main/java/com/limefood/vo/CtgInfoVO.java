package com.limefood.vo;

public class CtgInfoVO {
    private String largeCtgCode;
    private String largeCtgName;
    private String mediumCtgCode;
    private String mediumCtgName;
    private String cretTime;
	private String cretId;
	private Integer largeCnt;
	private Integer mediumCnt;
	private String rowId;
	
	public String getLargeCtgCode() {
		return largeCtgCode;
	}
	public String getRowId() {
		return rowId;
	}
	public void setRowId(String rowId) {
		this.rowId = rowId;
	}
	public void setLargeCtgCode(String largeCtgCode) {
		this.largeCtgCode = largeCtgCode;
	}
	public String getLargeCtgName() {
		return largeCtgName;
	}
	public void setLargeCtgName(String largeCtgName) {
		this.largeCtgName = largeCtgName;
	}
	public String getMediumCtgCode() {
		return mediumCtgCode;
	}
	public void setMediumCtgCode(String mediumCtgCode) {
		this.mediumCtgCode = mediumCtgCode;
	}
	public String getMediumCtgName() {
		return mediumCtgName;
	}
	public void setMediumCtgName(String mediumCtgName) {
		this.mediumCtgName = mediumCtgName;
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

    /**
     * @return Integer return the largeCnt
     */
    public Integer getLargeCnt() {
        return largeCnt;
    }

    /**
     * @param largeCnt the largeCnt to set
     */
    public void setLargeCnt(Integer largeCnt) {
        this.largeCnt = largeCnt;
    }

    /**
     * @return Integer return the mediumCnt
     */
    public Integer getMediumCnt() {
        return mediumCnt;
    }

    /**
     * @param mediumCnt the mediumCnt to set
     */
    public void setMediumCnt(Integer mediumCnt) {
        this.mediumCnt = mediumCnt;
    }

}