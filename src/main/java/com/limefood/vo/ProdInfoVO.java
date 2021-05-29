package com.limefood.vo;

public class ProdInfoVO {
    private String prodCode;
    private String prodName;
    private String deadLine; 
    private String unit;
    private String origin;
    private String vatYn;
    private Double cost;
    private Double price;
    private Double inven;
    private String largeCtgCode;
    private String largeCtgName;
    private String mediumCtgCode;
    private String mediumCtgName;
    private String bookmark;
    private String status;
    private Integer orderCnt;
    private Double supPrice;
    private Double vatPrice;
    private Double totalPrice; 
    private String shipDate;
    private String remark;
    private Integer index;
    private String corpName; //배송사업장  id
    private String corpNum;
    private String headId; // 배송사업장명
    private String headName; // 배송사업장명
    private String id;
    private String name;
    private String rowId;
    private String subProdCode;
    private String remainInven;
    private String useFlag;
    public String corpNumText;
    private String headPrice;   // 본사단가
    private String headSup;     // 본사단가 기준 공급가액
    private String headVat;     //본사단가 기준 부가세액
    private String headTotal;   //본사단가 기준 합계금액

    public String getHeadPrice() {
        return headPrice;
    }

    public void setHeadPrice(String headPrice) {
        this.headPrice = headPrice;
    }

    /**
     * @return String return the prodCode
     */
    public String getProdCode() {
        return prodCode;
    }

	public String getRowId() {
		return rowId;
	}

	public void setRowId(String rowId) {
		this.rowId = rowId;
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

	public Integer getIndex() {
		return index;
	}

	public void setIndex(Integer index) {
		this.index = index;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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
     * @return Double return the cost
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
     * @return Double return the price
     */
    public Double getPrice() {
        return price;
    }

    /**
     * @param price the price to set
     */
    public void setPrice(Double price) {
        this.price = price;
    }

    /**
     * @return Double return the inven
     */
    public Double getInven() {
        return inven;
    }

    /**
     * @param inven the inven to set
     */
    public void setInven(Double inven) {
        this.inven = inven;
    }


    /**
     * @return String return the largeCtgCode
     */
    public String getLargeCtgCode() {
        return largeCtgCode;
    }

    /**
     * @param largeCtgCode the largeCtgCode to set
     */
    public void setLargeCtgCode(String largeCtgCode) {
        this.largeCtgCode = largeCtgCode;
    }

    /**
     * @return String return the largeCtgName
     */
    public String getLargeCtgName() {
        return largeCtgName;
    }

    /**
     * @param largeCtgName the largeCtgName to set
     */
    public void setLargeCtgName(String largeCtgName) {
        this.largeCtgName = largeCtgName;
    }

    /**
     * @return String return the mediumCtgCode
     */
    public String getMediumCtgCode() {
        return mediumCtgCode;
    }

    /**
     * @param mediumCtgCode the mediumCtgCode to set
     */
    public void setMediumCtgCode(String mediumCtgCode) {
        this.mediumCtgCode = mediumCtgCode;
    }



    /**
     * @return String return the mediumCtgName
     */
    public String getMediumCtgName() {
        return mediumCtgName;
    }

    /**
     * @param mediumCtgName the mediumCtgName to set
     */
    public void setMediumCtgName(String mediumCtgName) {
        this.mediumCtgName = mediumCtgName;
    }


    /**
     * @return String return the bookMark
     */
    public String getBookmark() {
        return bookmark;
    }

    /**
     * @param bookmark the bookmark to set
     */
    public void setBookmark(String bookmark) {
        this.bookmark = bookmark;
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
     * @return Double return the vatPrice
     */
    public Double getVatPrice() {
        return vatPrice;
    }

    /**
     * @param vatPrice the vatPrice to set
     */
    public void setVatPrice(Double vatPrice) {
        this.vatPrice = vatPrice;
    }

    /**
     * @return Double return the totalPrice
     */
    public Double getTotalPrice() {
        return totalPrice;
    }

    /**
     * @param totalPrice the totalPrice to set
     */
    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
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

	@Override
	public String toString() {
		return "ProdInfoVO [bookmark=" + bookmark + ", cost=" + cost + ", deadLine=" + deadLine + ", inven=" + inven
				+ ", largeCtgCode=" + largeCtgCode + ", largeCtgName=" + largeCtgName + ", mediumCtgCode="
				+ mediumCtgCode + ", mediumCtgName=" + mediumCtgName + ", orderCnt=" + orderCnt + ", origin=" + origin
				+ ", price=" + price + ", prodCode=" + prodCode + ", prodName=" + prodName + ", shipDate=" + shipDate
				+ ", status=" + status + ", supPrice=" + supPrice + ", totalPrice=" + totalPrice + ", unit=" + unit
				+ ", vatPrice=" + vatPrice + ", vatYn=" + vatYn + "]";
	}

    /**
     * @return Double return the supPrice
     */
    public Double getSupPrice() {
        return supPrice;
    }

    /**
     * @param supPrice the supPrice to set
     */
    public void setSupPrice(Double supPrice) {
        this.supPrice = supPrice;
    }

	public String getCorpName() {
		return corpName;
	}

	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}

	public String getHeadId() {
		return headId;
	}

	public void setHeadId(String headId) {
		this.headId = headId;
	}

	public String getHeadName() {
		return headName;
	}

	public void setHeadName(String headName) {
		this.headName = headName;
	}


    /**
     * @return String return the subProdCode
     */
    public String getSubProdCode() {
        return subProdCode;
    }

    /**
     * @param subProdCode the subProdCode to set
     */
    public void setSubProdCode(String subProdCode) {
        this.subProdCode = subProdCode;
    }


    /**
     * @return String return the remainInven
     */
    public String getRemainInven() {
        return remainInven;
    }

    /**
     * @param remainInven the remainInven to set
     */
    public void setRemainInven(String remainInven) {
        this.remainInven = remainInven;
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
     * @return String return the useFlag
     */
    public String getUseFlag() {
        return useFlag;
    }

    /**
     * @param useFlag the useFlag to set
     */
    public void setUseFlag(String useFlag) {
        this.useFlag = useFlag;
    }

	public String getCorpNumText() {
		return corpNumText;
	}

	public void setCorpNumText(String corpNumText) {
		this.corpNumText = corpNumText;
	}

    public String getHeadSup() {
        return headSup;
    }

    public void setHeadSup(String headSup) {
        this.headSup = headSup;
    }

    public String getHeadVat() {
        return headVat;
    }

    public void setHeadVat(String headVat) {
        this.headVat = headVat;
    }

    public String getHeadTotal() {
        return headTotal;
    }

    public void setHeadTotal(String headTotal) {
        this.headTotal = headTotal;
    }
    
}   