package com.chungchunClean.Service;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.StaffVo;


public interface ObjectService {
	public int getTotalStaff();
	
	public int getTotalAdmin();
	
	public List<StaffVo> getStaffList(HashMap<String,Object> params);
    
    public String dupCheckId(HashMap<String,String> params);
    
    public void saveNewStaff(StaffVo vo);
    
    public void deleteStaff( HashMap<String,String> params);
    
    public void updateStaff(HashMap<String,String> params);

}