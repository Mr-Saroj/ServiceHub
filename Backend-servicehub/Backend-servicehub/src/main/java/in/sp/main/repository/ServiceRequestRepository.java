package in.sp.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.sp.main.entity.ServiceRequest;
import in.sp.main.entity.User;

import java.util.List;

@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {

    // ✅ Get requests by customer ID
    List<ServiceRequest> findByCustomer_UserId(Long userId);

    // ✅ Get requests by customer object
    List<ServiceRequest> findByCustomer(User customer);

    // ✅ Get all requests by status (PENDING, ACCEPTED, COMPLETED)
    List<ServiceRequest> findByStatus(String status);

    // ✅ 🔥 MAIN METHOD: Filter requests by status + category (for technician)
    List<ServiceRequest> findByStatusAndCategory_CategoryId(String status, Long categoryId);

    // ✅ (Optional but useful) Get requests by technician
    List<ServiceRequest> findByTechnician(User technician);

    // ✅ (Optional) Get requests by technician email
    List<ServiceRequest> findByTechnician_Email(String email);

    // ✅ (Optional) Get requests by status + technician
    List<ServiceRequest> findByStatusAndTechnician_Email(String status, String email);
}