package in.sp.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import in.sp.main.entity.ServiceRequest;
import in.sp.main.entity.TechnicianJob;
import in.sp.main.service.ServiceRequestService;

@RestController
@RequestMapping("/api/technician")
@CrossOrigin(origins = "http://localhost:5173")
public class TechnicianController {

    @Autowired
    private ServiceRequestService serviceRequestService;

    // ✅ SHOW ALL CUSTOMER REQUESTS
    @GetMapping("/requests")
    public List<ServiceRequest> getAllCustomerRequests() {

        return serviceRequestService.getAllPendingRequests();

    }
    @PutMapping("/accept/{requestId}")
    public ServiceRequest acceptJob(
            @PathVariable Long requestId,
            Authentication authentication) {

        String technicianEmail = authentication.getName();

        return serviceRequestService.acceptJob(requestId, technicianEmail);
    }
   

    @GetMapping("/my-jobs")
    public List<TechnicianJob> getMyJobs(Authentication authentication) {

        String technicianEmail = authentication.getName();

        return serviceRequestService.getTechnicianJobs(technicianEmail);
    }
    @PutMapping("/complete/{jobId}")
    public ServiceRequest completeJob(@PathVariable Long jobId) {

        return serviceRequestService.completeJob(jobId);
    }
    
}