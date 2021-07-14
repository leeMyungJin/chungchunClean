package com.chungchunClean.vo;

public class BldgVo {

    private String areaCd;
    private String areaNm;
    private String bldgCd;
    private String bldgNm;
    private String pnum;
    private String dtlAddr;
    private String clientNm;
    private Double conCost;
    private Double surTax;
    private String surTaxYn;
    private String cretId;
    private String cretDt;
    private String updtId;
    private String updtDt;
    private String dongNum;
    private String memo;
    private String activeYn;
    private String dongQrUrl;
    

    /**
     * @return String return the areaCd
     */
    public String getAreaCd() {
        return areaCd;
    }

    /**
     * @param areaCd the areaCd to set
     */
    public void setAreaCd(String areaCd) {
        this.areaCd = areaCd;
    }

    /**
     * @return String return the areaNm
     */
    public String getAreaNm() {
        return areaNm;
    }

    /**
     * @param areaNm the areaNm to set
     */
    public void setAreaNm(String areaNm) {
        this.areaNm = areaNm;
    }

    /**
     * @return String return the bldgCd
     */
    public String getBldgCd() {
        return bldgCd;
    }

    /**
     * @param bldgCd the bldgCd to set
     */
    public void setBldgCd(String bldgCd) {
        this.bldgCd = bldgCd;
    }

    /**
     * @return String return the bldgNm
     */
    public String getBldgNm() {
        return bldgNm;
    }

    /**
     * @param bldgNm the bldgNm to set
     */
    public void setBldgNm(String bldgNm) {
        this.bldgNm = bldgNm;
    }

    /**
     * @return String return the pnum
     */
    public String getPnum() {
        return pnum;
    }

    /**
     * @param pnum the pnum to set
     */
    public void setPnum(String pnum) {
        this.pnum = pnum;
    }

    /**
     * @return String return the dtlAddr
     */
    public String getDtlAddr() {
        return dtlAddr;
    }

    /**
     * @param dtlAddr the dtlAddr to set
     */
    public void setDtlAddr(String dtlAddr) {
        this.dtlAddr = dtlAddr;
    }

    /**
     * @return String return the clientNm
     */
    public String getClientNm() {
        return clientNm;
    }

    /**
     * @param clientNm the clientNm to set
     */
    public void setClientNm(String clientNm) {
        this.clientNm = clientNm;
    }

    /**
     * @return Double return the conCost
     */
    public Double getConCost() {
        return conCost;
    }

    /**
     * @param conCost the conCost to set
     */
    public void setConCost(Double conCost) {
        this.conCost = conCost;
    }

    /**
     * @return Double return the surTax
     */
    public Double getSurTax() {
        return surTax;
    }

    /**
     * @param surTax the surTax to set
     */
    public void setSurTax(Double surTax) {
        this.surTax = surTax;
    }

    /**
     * @return String return the surTaxYn
     */
    public String getSurTaxYn() {
        return surTaxYn;
    }

    /**
     * @param surTaxYn the surTaxYn to set
     */
    public void setSurTaxYn(String surTaxYn) {
        this.surTaxYn = surTaxYn;
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
     * @return String return the cretDt
     */
    public String getCretDt() {
        return cretDt;
    }

    /**
     * @param cretDt the cretDt to set
     */
    public void setCretDt(String cretDt) {
        this.cretDt = cretDt;
    }

    /**
     * @return String return the updtId
     */
    public String getUpdtId() {
        return updtId;
    }

    /**
     * @param updtId the updtId to set
     */
    public void setUpdtId(String updtId) {
        this.updtId = updtId;
    }

    /**
     * @return String return the updtDt
     */
    public String getUpdtDt() {
        return updtDt;
    }

    /**
     * @param updtDt the updtDt to set
     */
    public void setUpdtDt(String updtDt) {
        this.updtDt = updtDt;
    }

    /**
     * @return String return the dongNum
     */
    public String getDongNum() {
        return dongNum;
    }

    /**
     * @param dongNum the dongNum to set
     */
    public void setDongNum(String dongNum) {
        this.dongNum = dongNum;
    }

    /**
     * @return String return the memo
     */
    public String getMemo() {
        return memo;
    }

    /**
     * @param memo the memo to set
     */
    public void setMemo(String memo) {
        this.memo = memo;
    }

    /**
     * @return String return the activeYn
     */
    public String getActiveYn() {
        return activeYn;
    }

    /**
     * @param activeYn the activeYn to set
     */
    public void setActiveYn(String activeYn) {
        this.activeYn = activeYn;
    }

    /**
     * @return String return the dongQrUrl
     */
    public String getDongQrUrl() {
        return dongQrUrl;
    }

    /**
     * @param dongQrUrl the dongQrUrl to set
     */
    public void setDongQrUrl(String dongQrUrl) {
        this.dongQrUrl = dongQrUrl;
    }

    @Override
    public String toString() {
        return "BldgVo [activeYn=" + activeYn + ", areaCd=" + areaCd + ", areaNm=" + areaNm + ", bldgCd=" + bldgCd
                + ", bldgNm=" + bldgNm + ", clientNm=" + clientNm + ", conCost=" + conCost + ", cretDt=" + cretDt
                + ", cretId=" + cretId + ", dongNum=" + dongNum + ", dongQrUrl=" + dongQrUrl + ", dtlAddr=" + dtlAddr
                + ", memo=" + memo + ", pnum=" + pnum + ", surTax=" + surTax + ", surTaxYn=" + surTaxYn + ", updtDt="
                + updtDt + ", updtId=" + updtId + "]";
    }

}