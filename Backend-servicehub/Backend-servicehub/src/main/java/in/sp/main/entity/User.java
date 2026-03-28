package in.sp.main.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    // ✅ Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    // ✅ Basic Fields
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String role; // CUSTOMER or TECHNICIAN

    // ✅ Technician Category (Relation)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private ServiceCategory category;

    // ✅ Extra Fields
    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "profile_image_url", columnDefinition = "TEXT")
    private String profileImageUrl;

    // ===== GETTERS AND SETTERS =====

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public ServiceCategory getCategory() {
        return category;
    }

    public void setCategory(ServiceCategory category) {
        this.category = category;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }
}