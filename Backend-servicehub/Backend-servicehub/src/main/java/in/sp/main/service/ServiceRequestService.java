package in.sp.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import in.sp.main.entity.ServiceCategory;
import in.sp.main.entity.ServiceRequest;
import in.sp.main.entity.TechnicianJob;
import in.sp.main.entity.User;
import in.sp.main.repository.ServiceCategoryRepository;
import in.sp.main.repository.ServiceRequestRepository;
import in.sp.main.repository.TechnicianJobRepository;
import in.sp.main.repository.UserRepository;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class ServiceRequestService {

    @Autowired
    private ServiceRequestRepository requestRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ServiceCategoryRepository categoryRepo;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private TechnicianJobRepository technicianJobRepository;

    // ✅ CREATE REQUEST
    public ServiceRequest createRequest(
            String email,
            Long categoryId,
            String problemDescription,
            String locationAddress,
            Double latitude,
            Double longitude,
            String mobileNumber,
            MultipartFile damagePhoto) {

        User customer = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ServiceCategory category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        String imageUrl = null;

        // ✅ Upload image to Cloudinary
        if (damagePhoto != null && !damagePhoto.isEmpty()) {
            try {
                Map uploadResult = cloudinary.uploader().upload(
                        damagePhoto.getBytes(),
                        ObjectUtils.asMap("folder", "servicehub")
                );

                imageUrl = uploadResult.get("secure_url").toString();

            } catch (IOException e) {
                throw new RuntimeException("Image upload failed: " + e.getMessage());
            }
        }

        ServiceRequest request = new ServiceRequest();
        request.setCustomer(customer);
        request.setCategory(category);
        request.setProblemDescription(problemDescription);
        request.setLocationAddress(locationAddress);
        request.setLatitude(latitude);
        request.setLongitude(longitude);
        request.setMobileNumber(mobileNumber);
        request.setDamagePhotoUrl(imageUrl);
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

        if (!request.getCustomer().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized delete attempt");
        }

        requestRepo.delete(request);
    }

    // ❌ OLD METHOD (KEEP ONLY IF NEEDED FOR ADMIN)
    public List<ServiceRequest> getAllPendingRequests() {
        return requestRepo.findByStatus("PENDING");
    }

    // ✅🔥 NEW METHOD: FILTERED REQUESTS FOR TECHNICIAN
    public List<ServiceRequest> getFilteredRequests(String technicianEmail) {

        User technician = userRepo.findByEmail(technicianEmail)
                .orElseThrow(() -> new RuntimeException("Technician not found"));

        if (technician.getCategory() == null) {
            throw new RuntimeException("Technician category not assigned");
        }

        return requestRepo.findByStatusAndCategory_CategoryId(
                "PENDING",
                technician.getCategory().getCategoryId()
        );
    }

    // ✅ ACCEPT JOB
    public ServiceRequest acceptJob(Long requestId, String technicianEmail, String date, String time) {

        ServiceRequest request = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        User technician = userRepo.findByEmail(technicianEmail)
                .orElseThrow(() -> new RuntimeException("Technician not found"));

        request.setStatus("ACCEPTED");
        request.setTechnician(technician);

        // ✅ NEW
        request.setScheduledDate(date);
        request.setScheduledTime(time);

        ServiceRequest savedRequest = requestRepo.save(request);

        TechnicianJob job = new TechnicianJob();
        job.setTechnician(technician);
        job.setRequest(savedRequest);

        technicianJobRepository.save(job);

        return savedRequest;
    }

    // ✅ GET TECHNICIAN JOBS
    public List<TechnicianJob> getTechnicianJobs(String email) {
        return technicianJobRepository.findByTechnician_Email(email);
    }

    // ✅ COMPLETE JOB
    public ServiceRequest completeJob(Long jobId) {

        TechnicianJob job = technicianJobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        ServiceRequest request = job.getRequest();

        request.setStatus("COMPLETED");

        return requestRepo.save(request);
    }
   
    
}