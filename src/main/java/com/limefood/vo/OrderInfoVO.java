package com.limefood.vo;

public class OrderInfoVO {
    private String id;          //아이디
    private String name;        //이름
    private String deadLine;    //마감기한
    private String status;      //상태
    private String shipDate;    //배송요청일자
    private String prodCode;    //상품코드
    private String prodName;    //상품명
    private String corpName;    //사업장명
    private String corpNum;     //사업자번호
    private String unit;        //단위
    private String origin;      //원산지
    private String vatYn;       //부가세여부
    private Integer orderCnt;   //주문수량
    private double cost;        //원가
    private double price;       //단가
    private double supPrice;    //공급가액
    private double vatPrice;    //부가세액
    private double totalPrice;  //합계금액
    private String orderNo;     //주문번호
    private String shipCorp;    //배송지사업장명
    private String shipId;      //배송지아이디
    private String rowId;       //pk용
    private String email;       //이메일
    private double headPrice; //본사 단가
    private double headSup; //본사단가 기준 공급가액
    private double headVat; //본사단가 기준 부가세
    private double headTotal; //본사단가 기준 합계 
    

    public double getHeadPrice() {
        return headPrice;
    }

    public void setHeadPrice(double headPrice) {
        this.headPrice = headPrice;
    }

    public double getHeadSup() {
        return headSup;
    }

    public void setHeadSup(double headSup) {
        this.headSup = headSup;
    }

    public double getHeadVat() {
        return headVat;
    }

    public void setHeadVat(double headVat) {
        this.headVat = headVat;
    }

    public double getHeadTotal() {
        return headTotal;
    }

    public void setHeadTotal(double headTotal) {
        this.headTotal = headTotal;
    }

    /**
     * @return String return the id
     */
    public String getId() {
        return id;
    }

    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRowId() {
		return rowId;
	}

	public void setRowId(String rowId) {
		this.rowId = rowId;
	}

	public double getCost() {
		return cost;
	}

	public void setCost(double cost) {
		this.cost = cost;
	}

	public String getShipId() {
		return shipId;
	}

	public void setShipId(String shipId) {
		this.shipId = shipId;
	}

	/**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return String return the shipDate
     */
    public String getShipDate() {
        return shipDate;
    }

    /**
     * @param shipDate the shipDate to set
     */
    public void setShipDate(String shipDate) {
        this.shipDate = shipDate;
    }

    /**
     * @return String return the prodCode
     */
    public String getProdCode() {
        return prodCode;
    }

    /**
     * @param prodCode the prodCode to set
     */
    public void setProdCode(String prodCode) {
        this.prodCode = prodCode;
    }

    /**
     * @return String return the prodName
     */
    public String getProdName() {
        return prodName;
    }

    /**
     * @param prodName the prodName to set
     */
    public void setProdName(String prodName) {
        this.prodName = prodName;
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
     * @return String return the unit
     */
    public String getUnit() {
        return unit;
    }

    /**
     * @param unit the unit to set
     */
    public void setUnit(String unit) {
        this.unit = unit;
    }

    /**
     * @return String return the origin
     */
    public String getOrigin() {
        return origin;
    }

    /**
     * @param origin the origin to set
     */
    public void setOrigin(String origin) {
        this.origin = origin;
    }

    /**
     * @return String return the vatYn
     */
    public String getVatYn() {
        return vatYn;
    }

    /**
     * @param vatYn the vatYn to set
     */
    public void setVatYn(String vatYn) {
        this.vatYn = vatYn;
    }

    /**
     * @return Integer return the orderCnt
     */
    public Integer getOrderCnt() {
        return orderCnt;
    }

    /**
     * @param orderCnt the orderCnt to set
     */
    public void setOrderCnt(Integer orderCnt) {
        this.orderCnt = orderCnt;
    }

    /**
     * @return double return the price
     */
    public double getPrice() {
        return price;
    }

    /**
     * @param price the price to set
     */
    public void setPrice(double price) {
        this.price = price;
    }

    /**
     * @return double return the vatPrice
     */
    public double getVatPrice() {
        return vatPrice;
    }

    /**
     * @param vatPrice the vatPrice to set
     */
    public void setVatPrice(double vatPrice) {
        this.vatPrice = vatPrice;
    }

    /**
     * @return double return the totalPrice
     */
    public double getTotalPrice() {
        return totalPrice;
    }

    /**
     * @param totalPrice the totalPrice to set
     */
    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }


    /**
     * @return String return the deadLine
     */
    public String getDeadLine() {
        return deadLine;
    }

    /**
     * @param deadLine the deadLine to set
     */
    public void setDeadLine(String deadLine) {
        this.deadLine = deadLine;
    }

    /**
     * @return String return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }


    /**
     * @return String return the orderNo
     */
    public String getOrderNo() {
        return orderNo;
    }

    /**
     * @param orderNo the orderNo to set
     */
    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

	@Override
	public String toString() {
		return "OrderInfoVO [corpName=" + corpName + ", corpNum=" + corpNum + ", deadLine=" + deadLine + ", id=" + id
				+ ", orderCnt=" + orderCnt + ", orderNo=" + orderNo + ", origin=" + origin + ", price=" + price
				+ ", prodCode=" + prodCode + ", prodName=" + prodName + ", shipDate=" + shipDate + ", status=" + status
				+ ", supPrice=" + supPrice + ", totalPrice=" + totalPrice + ", unit=" + unit + ", vatPrice=" + vatPrice
				+ ", vatYn=" + vatYn + ", shipCorp="+ shipCorp + "]";
	}


    /**
     * @return String return the shipCorp
     */
    public String getShipCorp() {
        return shipCorp;
    }

    /**
     * @param shipCorp the shipCorp to set
     */
    public void setShipCorp(String shipCorp) {
        this.shipCorp = shipCorp;
    }


    /**
     * @return double return the supPrice
     */
    public double getSupPrice() {
        return supPrice;
    }

    /**
     * @param supPrice the supPrice to set
     */
    public void setSupPrice(double supPrice) {
        this.supPrice = supPrice;
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

}