package in.sp.main.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_request")
@Getter
@Setter
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    // Customer who created request
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    // Technician (NULL until accepted)
    @ManyToOne
    @JoinColumn(name = "technician_id")
    private User technician;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ServiceCategory category;

    private String problemDescription;
    private String damagePhotoUrl;
    private String locationAddress;
    private Double latitude;
    private Double longitude;

    private String mobileNumber; // ✅ NEW FIELD

    private String status; // PENDING, ACCEPTED, COMPLETED
    private Double serviceCharge;
    private LocalDateTime completedAt;

    private LocalDateTime createdAt;
    private String scheduledDate;
    private String scheduledTime;

    private String paymentStatus = "PENDING"; // default PENDING// ✅ NEW FIELD (NotConfirm / Confirm)
    private int rating = 0; // ⭐ default 0
    

    // ================= GETTERS & SETTERS =================

    public Long getRequestId() {
        return requestId;
    }

    public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public User getTechnician() {
        return technician;
    }

    public void setTechnician(User technician) {
        this.technician = technician;
    }

    public ServiceCategory getCategory() {
        return category;
    }

    public void setCategory(ServiceCategory category) {
        this.category = category;
    }

    public String getProblemDescription() {
        return problemDescription;
    }

    public void setProblemDescription(String problemDescription) {
        this.problemDescription = problemDescription;
    }

    public String getDamagePhotoUrl() {
        return damagePhotoUrl;
    }

    public void setDamagePhotoUrl(String damagePhotoUrl) {
        this.damagePhotoUrl = damagePhotoUrl;
    }

    public String getLocationAddress() {
        return locationAddress;
    }

    public void setLocationAddress(String locationAddress) {
        this.locationAddress = locationAddress;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getServiceCharge() {
        return serviceCharge;
    }

    public void setServiceCharge(Double serviceCharge) {
        this.serviceCharge = serviceCharge;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(String scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public String getScheduledTime() {
        return scheduledTime;
    }

    public void setScheduledTime(String scheduledTime) {
        this.scheduledTime = scheduledTime;
    }

    public String getPaymentStatus() { // ✅ NEW
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) { // ✅ NEW
        this.paymentStatus = paymentStatus;
    }

    // ================= AUTO FIELDS =================

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.status = "PENDING";
        this.paymentStatus = "NotConfirm"; // ✅ Default payment status
    }
}