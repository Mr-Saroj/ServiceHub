package in.sp.main.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateRequestDTO {

    private Long categoryId;
    private String problemDescription;
    private String damagePhotoUrl;
    private String locationAddress;
    private Double latitude;
    public Long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
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
	private Double longitude;
}
