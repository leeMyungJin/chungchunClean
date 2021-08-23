package com.chungchunClean.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BldgVo {

    private String areaCd;
    private String areaNm;
    private String bldgCd;
    private String bldgNm;
    private String pnum;
    private String dtlAddr;
    private String clientNm;
    private Double conCost;
    private Double surtax;
    private String surtaxYn;
    private String cretId;
    private String cretDt;
    private String updtId;
    private String updtDt;
    private String dongNum;
    private String memo;
    private String activeYn;
    private String dongQrUrl;
    private String conFromDt;
    private String conToDt;
    private Integer cleanCnt;
    private Integer visitCnt;
    private String visitDay;
    private String fromDt;
    private String toDt;
    private String addr;
    private String zone;
    private String team;

    

    /**
     * @return String return the team
     */
    public String getTeam() {
        return team;
    }

    /**
     * @param team the team to set
     */
    public void setTeam(String team) {
        this.team = team;
    }

     /**
     * @return String return the visitDay
     */
    public String getVisitDay() {
        return visitDay;
    }

    /**
     * @param visitDay the visitDay to set
     */
    public void setVisitDay(String visitDay) {
        this.visitDay = visitDay;
    }

    /**
     * @return Integer return the visitCnt
     */
    public Integer getVisitCnt() {
        return visitCnt;
    }

    /**
     * @param visitCnt the visitCnt to set
     */
    public void setVisitCnt(Integer visitCnt) {
        this.visitCnt = visitCnt;
    }

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

    /**
     * @return String return the conFromDt
     */
    public String getConFromDt() {
        return conFromDt;
    }

    /**
     * @param conFromDt the conFromDt to set
     */
    public void setConFromDt(String conFromDt) {
        this.conFromDt = conFromDt;
    }

    /**
     * @return String return the conToDt
     */
    public String getConToDt() {
        return conToDt;
    }

    /**
     * @param conToDt the conToDt to set
     */
    public void setConToDt(String conToDt) {
        this.conToDt = conToDt;
    }

    /**
     * @return Integer return the cleanCnt
     */
    public Integer getCleanCnt() {
        return cleanCnt;
    }

    /**
     * @param cleanCnt the cleanCnt to set
     */
    public void setCleanCnt(Integer cleanCnt) {
        this.cleanCnt = cleanCnt;
    }

    /**
     * @return String return the fromDt
     */
    public String getFromDt() {
        return fromDt;
    }

    /**
     * @param fromDt the fromDt to set
     */
    public void setFromDt(String fromDt) {
        this.fromDt = fromDt;
    }

    /**
     * @return String return the toDt
     */
    public String getToDt() {
        return toDt;
    }

    /**
     * @param toDt the toDt to set
     */
    public void setToDt(String toDt) {
        this.toDt = toDt;
    }

    /**
     * @return String return the addr
     */
    public String getAddr() {
        return addr;
    }

    /**
     * @param addr the addr to set
     */
    public void setAddr(String addr) {
        this.addr = addr;
    }

    /**
     * @return String return the zone
     */
    public String getZone() {
        return zone;
    }

    /**
     * @param zone the zone to set
     */
    public void setZone(String zone) {
        this.zone = zone;
    }

    /**
     * @return Double return the surtax
     */
    public Double getSurtax() {
        return surtax;
    }

    /**
     * @param surtax the surtax to set
     */
    public void setSurtax(Double surtax) {
        this.surtax = surtax;
    }

    /**
     * @return String return the surtaxYn
     */
    public String getSurtaxYn() {
        return surtaxYn;
    }

    /**
     * @param surtaxYn the surtaxYn to set
     */
    public void setSurtaxYn(String surtaxYn) {
        this.surtaxYn = surtaxYn;
    }

    @Override
    public String toString() {
        return "BldgVo [activeYn=" + activeYn + ", addr=" + addr + ", areaCd=" + areaCd + ", areaNm=" + areaNm
                + ", bldgCd=" + bldgCd + ", bldgNm=" + bldgNm + ", cleanCnt=" + cleanCnt + ", clientNm=" + clientNm
                + ", conCost=" + conCost + ", conFromDt=" + conFromDt + ", conToDt=" + conToDt + ", cretDt=" + cretDt
                + ", cretId=" + cretId + ", dongNum=" + dongNum + ", dongQrUrl=" + dongQrUrl + ", dtlAddr=" + dtlAddr
                + ", fromDt=" + fromDt + ", memo=" + memo + ", pnum=" + pnum + ", surtax=" + surtax + ", surtaxYn="
                + surtaxYn + ", toDt=" + toDt + ", updtDt=" + updtDt + ", updtId=" + updtId + ", zone=" + zone + "]";
    }

}