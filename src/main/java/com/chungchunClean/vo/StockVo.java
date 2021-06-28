package com.chungchunClean.vo;

public class StockVo {

	private String l_categy_cd;
	private String l_categy_nm;
	private String m_categy_cd;
	private String m_categy_nm;
	private Double cost;
	private String item_cd;
	private String item_nm;
	private String qr_url;
    private String reg_date;
	
	/**
     * @return String return the l_categy_cd
     */
    public String getL_categy_cd() {
        return l_categy_cd;
    }

    /**
     * @param l_categy_cd the l_categy_cd to set
     */
    public void setL_categy_cd(String l_categy_cd) {
        this.l_categy_cd = l_categy_cd;
    }

    /**
     * @return String return the l_categy_nm
     */
    public String getL_categy_nm() {
        return l_categy_nm;
    }

    /**
     * @param l_categy_nm the l_categy_nm to set
     */
    public void setL_categy_nm(String l_categy_nm) {
        this.l_categy_nm = l_categy_nm;
    }

    /**
     * @return String return the m_categy_cd
     */
    public String getM_categy_cd() {
        return m_categy_cd;
    }

    /**
     * @param m_categy_cd the m_categy_cd to set
     */
    public void setM_categy_cd(String m_categy_cd) {
        this.m_categy_cd = m_categy_cd;
    }

    /**
     * @return String return the m_categy_nm
     */
    public String getM_categy_nm() {
        return m_categy_nm;
    }

    /**
     * @param m_categy_nm the m_categy_nm to set
     */
    public void setM_categy_nm(String m_categy_nm) {
        this.m_categy_nm = m_categy_nm;
    }

    /**
     * @return String return the cost
     */
    public Double getCost() {
        return cost;
    }

    /**
     * @param cost the cost to set
     */
    public void setCost(Double cost) {
        this.cost = cost;
    }

    /**
     * @return String return the item_cd
     */
    public String getItem_cd() {
        return item_cd;
    }

    /**
     * @param item_cd the item_cd to set
     */
    public void setItem_cd(String item_cd) {
        this.item_cd = item_cd;
    }

    /**
     * @return String return the item_nm
     */
    public String getItem_nm() {
        return item_nm;
    }

    /**
     * @param item_nm the item_nm to set
     */
    public void setItem_nm(String item_nm) {
        this.item_nm = item_nm;
    }

    /**
     * @return String return the qr_url
     */
    public String getQr_url() {
        return qr_url;
    }

    /**
     * @param qr_url the qr_url to set
     */
    public void setQr_url(String qr_url) {
        this.qr_url = qr_url;
    }
    /**
     * @return String return the reg_date
     */
    public String getReg_date() {
        return reg_date;
    }

    /**
     * @param reg_date the reg_date to set
     */
    public void setReg_date(String reg_date) {
        this.reg_date = reg_date;
    }

    @Override
    public String toString() {
        return "StockVo [cost=" + cost + ", item_cd=" + item_cd + ", item_nm=" + item_nm + ", l_categy_cd="
                + l_categy_cd + ", l_categy_nm=" + l_categy_nm + ", m_categy_cd=" + m_categy_cd + ", m_categy_nm="
                + m_categy_nm + ", qr_url=" + qr_url + ", reg_date=" + reg_date + "]";
    }

}
