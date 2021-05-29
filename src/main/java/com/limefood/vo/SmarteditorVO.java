package com.limefood.vo;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class SmarteditorVO {
    private MultipartFile filedata;
    private String callback;
    private String callback_func;

    

    /**
     * @return MultipartFile return the filedata
     */
    public MultipartFile getFiledata() {
        return filedata;
    }

    /**
     * @param filedata the filedata to set
     */
    public void setFiledata(MultipartFile filedata) {
        this.filedata = filedata;
    }

    /**
     * @return String return the callback
     */
    public String getCallback() {
        return callback;
    }

    /**
     * @param callback the callback to set
     */
    public void setCallback(String callback) {
        this.callback = callback;
    }

    /**
     * @return String return the callback_func
     */
    public String getCallback_func() {
        return callback_func;
    }

    /**
     * @param callback_func the callback_func to set
     */
    public void setCallback_func(String callback_func) {
        this.callback_func = callback_func;
    }

}