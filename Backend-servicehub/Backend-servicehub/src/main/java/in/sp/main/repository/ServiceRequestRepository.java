package in.sp.main.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import in.sp.main.entity.ServiceRequest;

import java.util.List;

public interface ServiceRequestRepository
        extends JpaRepository<ServiceRequest, Long> {

    List<ServiceRequest> findByCustomer_UserId(Long userId);
}
