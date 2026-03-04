package in.sp.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import in.sp.main.entity.ServiceRequest;
import in.sp.main.service.ServiceRequestService;

@RestController
@RequestMapping("/api/customer/requests")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceRequestController {

    @Autowired
    private ServiceRequestService service;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ServiceRequest createRequest(
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("problemDescription") String problemDescription,
            @RequestParam("locationAddress") String locationAddress,
            @RequestParam("latitude") Double latitude,
            @RequestParam("longitude") Double longitude,
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
                damagePhoto
        );
    }
}