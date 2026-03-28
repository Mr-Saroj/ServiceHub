package in.sp.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import in.sp.main.entity.ServiceRequest;
import in.sp.main.entity.TechnicianJob;
import in.sp.main.service.ServiceRequestService;

@RestController
@RequestMapping("/api/technician")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class TechnicianController {

    @Autowired
    private ServiceRequestService serviceRequestService;

    // ✅ SHOW ALL CUSTOMER REQUESTS
    @GetMapping("/requests")
    public List<ServiceRequest> getFilteredRequests(Authentication authentication) {

        String email = authentication.getName();

        return serviceRequestService.getFilteredRequests(email);
    }
    @PutMapping("/accept/{requestId}")
    public ServiceRequest acceptJob(
            @PathVariable Long requestId,
            @RequestParam String date,
            @RequestParam String time,
            Authentication authentication) {

        String technicianEmail = authentication.getName();

        return serviceRequestService.acceptJob(
                requestId,
                technicianEmail,
                date,
                time
        );
    }
   

    @GetMapping("/my-jobs")
    public List<TechnicianJob> getMyJobs(Authentication authentication) {

        String technicianEmail = authentication.getName();

        return serviceRequestService.getTechnicianJobs(technicianEmail);
    }
    @PutMapping("/complete/{jobId}")
    public ServiceRequest completeJob(
            @PathVariable Long jobId,
            @RequestParam Double amount
    ) {
        return serviceRequestService.completeJob(jobId, amount);
    }
    @GetMapping("/invoice/{jobId}")
    public ResponseEntity<byte[]> downloadInvoice(@PathVariable Long jobId) {

        byte[] pdf = serviceRequestService.generateInvoice(jobId);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=invoice.pdf")
                .header("Content-Type", "application/pdf")
                .body(pdf);
    }
//    @GetMapping("/earnings")
//    public ResponseEntity<?> getEarnings(Authentication auth) {
//
//        String email = auth.getName();
//
//        return ResponseEntity.ok(
//            serviceRequestService.getTechnicianEarningsLast24Hours(email)
//        );
//    }
    @GetMapping("/earnings")
    public ResponseEntity<?> getEarnings(Authentication auth) {

        String email = auth.getName();

        return ResponseEntity.ok(
            serviceRequestService.getTechnicianEarningsLast24Hours(email)
        );
    }
    
    @GetMapping("/earnings/total")
    public ResponseEntity<?> getTotalEarnings(Authentication auth) {

        String email = auth.getName();

        return ResponseEntity.ok(
            serviceRequestService.getTotalEarnings(email)
        );
    }
    
    
}