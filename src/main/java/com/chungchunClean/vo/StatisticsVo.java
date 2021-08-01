package com.chungchunClean.vo;

public class StatisticsVo {
	private String conCost;
	private String outCost;
	private String depositCost;
	private String ammPercent;
	private String aaPercent;
	private String monMt;
	private String type;
	private String classifiNm;
	
	public String getConCost() {
		return conCost;
	}
	public void setConCost(String conCost) {
		this.conCost = conCost;
	}
	public String getOutCost() {
		return outCost;
	}
	public void setOutCost(String outCost) {
		this.outCost = outCost;
	}
	public String getDepositCost() {
		return depositCost;
	}
	public void setDepositCost(String depositCost) {
		this.depositCost = depositCost;
	}
	public String getAmmPercent() {
		return ammPercent;
	}
	public void setAmmPercent(String ammPercent) {
		this.ammPercent = ammPercent;
	}
	public String getAaPercent() {
		return aaPercent;
	}
	public void setAaPercent(String aaPercent) {
		this.aaPercent = aaPercent;
	}
	public String getMonMt() {
		return monMt;
	}
	public void setMonMt(String monMt) {
		this.monMt = monMt;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getClassifiNm() {
		return classifiNm;
	}
	public void setClassifiNm(String classifiNm) {
		this.classifiNm = classifiNm;
	}
	@Override
	public String toString() {
		return "StatisticsVo [conCost=" + conCost + ", outCost=" + outCost + ", depositCost=" + depositCost
				+ ", ammPercent=" + ammPercent + ", aaPercent=" + aaPercent + ", monMt=" + monMt + ", type=" + type
				+ ", classifiNm=" + classifiNm + "]";
	}
	
	
	
}
