package com.chungchunClean.vo;

public class StockVo {

	private String l_categy_cd;     //대카테고리코드
	private String l_categy_nm;     //대카테고리명
	private String m_categy_cd;     //중카테고리코드
	private String m_categy_nm;     //중카테고리명
	private Double cost;            //원가
	private String item_cd;         //물품코드
	private String item_nm;         //물품명
	private String qr_url;          //QR코드 URL
    private String reg_date;        //등록일시 coalesce(updt_dt, cret_dt)
    private String cret_dt;         //등록일
    private String cret_id;         //등록자
    private String updt_dt;         //수정일
    private String updt_id;         //수정자
    private Integer quantity;       // 재고
    private String status;          // 재고 상태
	

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

    /**
     * @return String return the cret_dt
     */
    public String getCret_dt() {
        return cret_dt;
    }

    /**
     * @param cret_dt the cret_dt to set
     */
    public void setCret_dt(String cret_dt) {
        this.cret_dt = cret_dt;
    }

    /**
     * @return String return the cret_id
     */
    public String getCret_id() {
        return cret_id;
    }

    /**
     * @param cret_id the cret_id to set
     */
    public void setCret_id(String cret_id) {
        this.cret_id = cret_id;
    }

    /**
     * @return String return the updt_dt
     */
    public String getUpdt_dt() {
        return updt_dt;
    }

    /**
     * @param updt_dt the updt_dt to set
     */
    public void setUpdt_dt(String updt_dt) {
        this.updt_dt = updt_dt;
    }

    /**
     * @return String return the updt_id
     */
    public String getUpdt_id() {
        return updt_id;
    }

    /**
     * @param updt_id the updt_id to set
     */
    public void setUpdt_id(String updt_id) {
        this.updt_id = updt_id;
    }

    /**
     * @return Integter return the quantity
     */

    public Integer getQuantity() {
        return quantity;
    }

    /**
     * @param quantity the quantity to set
     */
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "StockVo [cost=" + cost + ", cret_dt=" + cret_dt + ", cret_id=" + cret_id + ", item_cd=" + item_cd
                + ", item_nm=" + item_nm + ", l_categy_cd=" + l_categy_cd + ", l_categy_nm=" + l_categy_nm
                + ", m_categy_cd=" + m_categy_cd + ", m_categy_nm=" + m_categy_nm + ", qr_url=" + qr_url + ", quantity="
                + quantity + ", reg_date=" + reg_date + ", status=" + status + ", updt_dt=" + updt_dt + ", updt_id="
                + updt_id + "]";
    }


}
