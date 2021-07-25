package com.chungchunClean.Mappers;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.BldgVo;
import com.chungchunClean.vo.CodeVo;
import com.chungchunClean.vo.StaffVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ObjectMapper  {
	public int getTotalStaff();
	
	public int getTotalAdmin();
	
	public List<StaffVo> getStaffList(HashMap<String,Object> params);
	
	public String dupCheckId(HashMap<String,String>params);

	public void saveNewStaff(StaffVo vo);
	
	public void deleteStaff(HashMap<String,String>params);
	
	public void updateStaff(HashMap<String,String> params);
	
	public StaffVo getStaffInfo(StaffVo vo);

    public List<BldgVo> getBuildingList(HashMap<String, Object> params);
    
    public List<CodeVo> getBuildingQrList(HashMap<String,Object> params);

	public Integer dupCheckBuilding(HashMap<String, Object> params);

	public String getMaxBldgCd();

    public void addBuildingBas(HashMap<String, Object> params);

    public void addBuildingDetail(BldgVo vo);

	public HashMap<String,Long> getBldgInfo();

    public BldgVo getBldgContInfo(String bldgCd);

	public List<BldgVo> getDetailBuildingList(HashMap<String, String> params);

    public void modifyBuilding(HashMap<String, Object> params);

	public void modifyBuildingDetail(BldgVo vo);

	public void deleteBuildingDetail(BldgVo vo);

    public void deleteBuildingBas(HashMap<String, String> params);

    public void deleteBuildingDetailAll(HashMap<String, String> params);
}
