package in.sp.main.dto;

public class UserProfileDTO {
    private String name;
    private String email;
    private String role;
    private String categoryName; // null if customer

    public UserProfileDTO(String name, String email, String role, String categoryName) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.categoryName = categoryName;
    }

    // ✅ Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
}