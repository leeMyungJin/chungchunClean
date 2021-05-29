package com.limefood.Controller;

import java.util.List;

import com.limefood.Service.ProdInfoService;
import com.limefood.vo.ProdInfoVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/prod")
public class ProdController {


    @Autowired
    ProdInfoService prodInfoService;
    
    @RequestMapping(value = "/infoList")
    @ResponseBody
    public List<ProdInfoVO> infoList(@RequestParam(value="id")String id , @RequestParam(value="prod") String prod , @RequestParam(value="shipDate")String date){
        List<ProdInfoVO> prodList = prodInfoService.getProdInfoList(id, prod,date);
        return prodList;

    }    


    
}