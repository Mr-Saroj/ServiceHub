package in.sp.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import in.sp.main.entity.ServiceRequest;
import in.sp.main.service.ServiceRequestService;

@RestController
@RequestMapping("/api/customer/requests")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class ServiceRequestController {

    @Autowired
    private ServiceRequestService service;

    // ✅ CREATE SERVICE REQUEST
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ServiceRequest createRequest(
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("problemDescription") String problemDescription,
            @RequestParam("locationAddress") String locationAddress,
            @RequestParam("latitude") Double latitude,
            @RequestParam("longitude") Double longitude,
            @RequestParam("mobileNumber") String mobileNumber, // ✅ NEW FIELD
            @RequestParam("damagePhoto") MultipartFile damagePhoto,
            Authentication authentication) {

        String email = authentication.getName();

        return service.createRequest(
                email,
                categoryId,
                problemDescription,
                locationAddress,
                latitude,
                longitude,
                mobileNumber, // ✅ pass to service
                damagePhoto
        );
    }

    // ✅ GET LOGGED-IN CUSTOMER REQUESTS
    @GetMapping("/my")
    public List<ServiceRequest> getMyRequests(Authentication authentication) {

        String email = authentication.getName();

        return service.getRequestsByCustomer(email);
    }

    // ✅ DELETE CUSTOMER REQUEST
    @DeleteMapping("/{id}")
    public String deleteRequest(@PathVariable Long id, Authentication authentication) {

        String email = authentication.getName();

        service.deleteRequest(id, email);

        return "Request deleted successfully";
    }
    
}