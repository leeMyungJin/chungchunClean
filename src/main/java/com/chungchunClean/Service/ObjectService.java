package com.chungchunClean.Service;

import java.util.HashMap;
import java.util.List;

import org.springframework.web.bind.annotation.RequestParam;

import com.chungchunClean.vo.BldgVo;
import com.chungchunClean.vo.CodeVo;
import com.chungchunClean.vo.StaffVo;


public interface ObjectService {
	public int getTotalStaff();
	
	public int getTotalAdmin();
	
	public List<StaffVo> getStaffList(HashMap<String,Object> params);
    
    public String dupCheckId(HashMap<String,String> params);
    
    public void saveNewStaff(StaffVo vo);
    
    public void deleteStaff( HashMap<String,String> params);
    
    public void updateStaff(HashMap<String,String> params);

    public List<BldgVo> getBuildingList(HashMap<String, Object> params);
    
    public List<CodeVo> getBuildingQrList(HashMap<String,Object> params);

    public String dupCheckBuilding(HashMap<String, Object> params);

    public String getMaxBldgCd();

    public void addBuildingBas(HashMap<String, Object> params);

    public void addBuildingDetail(List<BldgVo> params, String string);

    public HashMap<String,Long> getBldgInfo();

    public BldgVo getBldgContInfo(String bldgCd);

    public List<BldgVo> getDetailBuildingList(HashMap<String, String> params);

    public void modifyBuilding(HashMap<String, Object> params);

    public void modifyBuildingDetail(BldgVo vo);

    public void deleteBuildingDetail(BldgVo vo);

    public void deleteBuilding(HashMap<String, String> params);

    public void deleteBuildingDetailAll(HashMap<String, String> params);

    public void updateBuilding(BldgVo vo);

    public void excelUploadBuilding(BldgVo vo);
    
    public StaffVo getAppVersion();
    
    public void saveAppVersion(HashMap<String,Object> params);


}