package in.sp.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    // CREATE SERVICE REQUEST
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ServiceRequest createRequest(
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("problemDescription") String problemDescription,
            @RequestParam("locationAddress") String locationAddress,
            @RequestParam("latitude") Double latitude,
            @RequestParam("longitude") Double longitude,
            @RequestParam("mobileNumber") String mobileNumber,
            @RequestParam("damagePhoto") MultipartFile damagePhoto,
            Authentication authentication) {

        String email = authentication.getName();

        return service.createRequest(
                email, categoryId, problemDescription, locationAddress,
                latitude, longitude, mobileNumber, damagePhoto
        );
    }

    // GET CUSTOMER REQUESTS
    @GetMapping("/my")
    public List<ServiceRequest> getMyRequests(Authentication authentication) {
        String email = authentication.getName();
        return service.getRequestsByCustomer(email);
    }
    // DELETE REQUEST
    @DeleteMapping("/{id}")
    public String deleteRequest(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        service.deleteRequest(id, email);
        return "Request deleted successfully";
    }

    // ✅ CONFIRM PAYMENT
    @PostMapping("/{id}/confirm-payment")
    @PreAuthorize("hasRole('CUSTOMER')")
    public String confirmPayment(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        service.updatePaymentStatus(id, email);
        return "Payment confirmed successfully";
    }
    
 // GET all PAID requests for logged-in customer
    @GetMapping("/paid")
    @PreAuthorize("hasRole('CUSTOMER')")
    public List<ServiceRequest> getPaidRequests(Authentication authentication) {
        String email = authentication.getName();
        return service.getPaidRequests(email);
    }
    
    @PutMapping("/rate/{requestId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<String> rateService(
            @PathVariable Long requestId,
            @RequestParam int rating,
            Authentication authentication) {

        String email = authentication.getName();
        service.rateServiceRequest(requestId, rating, email);

        return ResponseEntity.ok("Rating submitted successfully");
    }
}