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
import java.util.UUID;

@Service
public class ServiceRequestService {

    @Autowired
    private ServiceRequestRepository requestRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ServiceCategoryRepository categoryRepo;

    public ServiceRequest createRequest(
            String email,
            Long categoryId,
            String problemDescription,
            String locationAddress,
            Double latitude,
            Double longitude,
            MultipartFile damagePhoto) {

        // ✅ 1. Get logged-in customer
        User customer = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ 2. Get service category
        ServiceCategory category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // ✅ 3. Save image file
        String fileName = null;

        if (damagePhoto != null && !damagePhoto.isEmpty()) {

            // Absolute path to project folder
            String uploadDir = System.getProperty("user.dir") 
                    + File.separator + "uploads";

            // Create uploads folder if not exists
            File folder = new File(uploadDir);
            if (!folder.exists()) {
                folder.mkdirs();   // IMPORTANT
            }

            // Generate unique filename
            fileName = UUID.randomUUID() + "_" 
                    + damagePhoto.getOriginalFilename();

            // Full file path
            File file = new File(uploadDir 
                    + File.separator + fileName);

            try {
                damagePhoto.transferTo(file);
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException(
                        "File upload failed: " + e.getMessage());
            }
        }

        // ✅ 4. Create service request object
        ServiceRequest request = new ServiceRequest();
        request.setCustomer(customer);
        request.setCategory(category);
        request.setProblemDescription(problemDescription);
        request.setLocationAddress(locationAddress);
        request.setLatitude(latitude);
        request.setLongitude(longitude);
        request.setDamagePhotoUrl(fileName); // save filename
        request.setStatus("PENDING");

        // ✅ 5. Save to database
        return requestRepo.save(request);
    }
}