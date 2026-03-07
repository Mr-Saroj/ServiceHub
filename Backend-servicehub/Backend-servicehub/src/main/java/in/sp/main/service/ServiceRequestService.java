package in.sp.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import in.sp.main.entity.ServiceCategory;
import in.sp.main.entity.ServiceRequest;
import in.sp.main.entity.User;
import in.sp.main.repository.ServiceCategoryRepository;
import in.sp.main.repository.ServiceRequestRepository;
import in.sp.main.repository.UserRepository;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ServiceRequestService {

    @Autowired
    private ServiceRequestRepository requestRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ServiceCategoryRepository categoryRepo;

    // ✅ CREATE REQUEST
    public ServiceRequest createRequest(
            String email,
            Long categoryId,
            String problemDescription,
            String locationAddress,
            Double latitude,
            Double longitude,
            MultipartFile damagePhoto) {

        User customer = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ServiceCategory category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        String fileName = null;

        if (damagePhoto != null && !damagePhoto.isEmpty()) {

            String uploadDir = System.getProperty("user.dir")
                    + File.separator + "uploads";

            File folder = new File(uploadDir);
            if (!folder.exists()) {
                folder.mkdirs();
            }

            fileName = UUID.randomUUID() + "_" + damagePhoto.getOriginalFilename();

            File file = new File(uploadDir + File.separator + fileName);

            try {
                damagePhoto.transferTo(file);
            } catch (IOException e) {
                throw new RuntimeException("File upload failed: " + e.getMessage());
            }
        }

        ServiceRequest request = new ServiceRequest();
        request.setCustomer(customer);
        request.setCategory(category);
        request.setProblemDescription(problemDescription);
        request.setLocationAddress(locationAddress);
        request.setLatitude(latitude);
        request.setLongitude(longitude);
        request.setDamagePhotoUrl(fileName);
        request.setStatus("PENDING");

        return requestRepo.save(request);
    }

    // ✅ GET CUSTOMER REQUESTS
    public List<ServiceRequest> getRequestsByCustomer(String email) {

        User customer = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return requestRepo.findByCustomer(customer);
    }

    // ✅ DELETE REQUEST
    public void deleteRequest(Long requestId, String email) {

        ServiceRequest request = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        // Ensure the request belongs to the logged-in customer
        if (!request.getCustomer().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized delete attempt");
        }

        requestRepo.delete(request);
    }
}