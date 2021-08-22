package com.chungchunClean.Service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.chungchunClean.Mappers.ObjectMapper;
import com.chungchunClean.Service.ObjectService;
import com.chungchunClean.Util.Util;
import com.chungchunClean.vo.BldgVo;
import com.chungchunClean.vo.CodeVo;
import com.chungchunClean.vo.StaffVo;
import com.chungchunClean.Mappers.LoginMapper;
import com.chungchunClean.Util.Encrypt;

@Service
public class ObjectServiceImpl implements ObjectService {

	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private LoginMapper login;
	
	@Override
	public int getTotalStaff() {
		return objectMapper.getTotalStaff();
	}

	@Override
	public int getTotalAdmin() {
		return objectMapper.getTotalAdmin();
	}

	
	@Override
	public List<StaffVo> getStaffList(HashMap<String,Object> params){
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		                		
		List<StaffVo> staffList = objectMapper.getStaffList(params);
		return staffList;
	}
	
	@Override
	public String dupCheckId(HashMap<String, String> params) {
		return objectMapper.dupCheckId(params);
	}

	@Override
	public void saveNewStaff(StaffVo vo){
		objectMapper.saveNewStaff(vo);
	}
	
	@Override
	public void deleteStaff(HashMap<String, String> params) {
		objectMapper.deleteStaff(params);
		
	}
	
	@Override
	public void updateStaff(HashMap<String, String> params) {
		String id = params.get("id");
		String password = params.get("password");
		if(password != ""){
			StaffVo usr = new StaffVo();
			usr.setStaffId(id);
			usr = login.getPassword(usr);	
			String shaPwd = Encrypt.setSHA512(password, usr.getPasswordKey());
			params.replace("password", shaPwd);
		}
		objectMapper.updateStaff(params);
	}

	@Override
	public List<BldgVo> getBuildingList(HashMap<String, Object> params) {
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		return objectMapper.getBuildingList(params);
	}
	
	
	@Override
	public List<CodeVo> getBuildingQrList(HashMap<String, Object> params) {
		if(params.get("selectBldg") != null)
			params.replace("selectBldg", Util.makeForeach((String)params.get("selectBldg"), ","));
		return objectMapper.getBuildingQrList(params);
	}

	@Override
	public String dupCheckBuilding(HashMap<String, Object> params) {
		int buildingCnt = objectMapper.dupCheckBuilding(params);
		String result = "";
		if(buildingCnt > 0)
			result = "true";
		else
			result = "false";

		return result;
	}

	@Override
	public String getMaxBldgCd() {
		return objectMapper.getMaxBldgCd();
	}

	@Override
	public void addBuildingBas(HashMap<String, Object> params) {
		objectMapper.addBuildingBas(params);
		
	}

	@Override
	public void addBuildingDetail(List<BldgVo> params, String id) {
		for(BldgVo vo : params){
			vo.setUpdtId(id);
			vo.setCretId(id);
			objectMapper.addBuildingDetail(vo);
		}
	}

	@Override
	public HashMap<String,Long> getBldgInfo() {
		return objectMapper.getBldgInfo();
	}

	@Override
	public BldgVo getBldgContInfo(String bldgCd) {
		return objectMapper.getBldgContInfo(bldgCd);
	}

	@Override
	public List<BldgVo> getDetailBuildingList(HashMap<String, String> params) {
		return objectMapper.getDetailBuildingList(params);
	}

	@Override
	public void modifyBuilding(HashMap<String, Object> params) {
		objectMapper.modifyBuilding(params);
	}

	@Override
	public void modifyBuildingDetail(BldgVo vo) {
		objectMapper.modifyBuildingDetail(vo);
		
	}

	@Override
	public void deleteBuildingDetail(BldgVo vo) {
		objectMapper.deleteBuildingDetail(vo);
		
	}

	@Override
	public void deleteBuilding(HashMap<String, String> params) {
		objectMapper.deleteBuildingBas(params);
		
	}

	@Override
	public void deleteBuildingDetailAll(HashMap<String, String> params) {
		objectMapper.deleteBuildingDetailAll(params);
		
	}

	@Override
	public void updateBuilding(BldgVo vo) {
		objectMapper.updateBuilding(vo);
	}

	@Override
	public void excelUploadBuilding(BldgVo vo) {
		objectMapper.excelUploadBuilding(vo);
	}
	
	@Override
	public StaffVo getAppVersion(){
    	
    	return objectMapper.getAppVersion();
    }
	
	@Override
	public void saveAppVersion(@RequestParam HashMap<String,Object> params){
    	
		objectMapper.saveAppVersion(params);
    }
}