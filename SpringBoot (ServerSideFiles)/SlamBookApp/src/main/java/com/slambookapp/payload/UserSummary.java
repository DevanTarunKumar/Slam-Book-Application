package com.slambookapp.payload;

public class UserSummary {
    private Long id;
    private String username;
    private String name;
    private String emailid;

    public UserSummary(Long id, String username, String name, String emailid) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.emailid =emailid;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }
}
