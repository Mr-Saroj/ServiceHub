package in.sp.main.dto;

public class UserProfileDTO {

    private String name;
    private String email;
    private String role;
    private String category;
    private String mobileNumber;
    private String profileImageUrl;

    // ✅ FULL CONSTRUCTOR (IMPORTANT)
    public UserProfileDTO(String name, String email, String role,
                          String category, String mobileNumber,
                          String profileImageUrl) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.category = category;
        this.mobileNumber = mobileNumber;
        this.profileImageUrl = profileImageUrl;
    }

    // ✅ GETTERS

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getCategory() {
        return category;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }
}