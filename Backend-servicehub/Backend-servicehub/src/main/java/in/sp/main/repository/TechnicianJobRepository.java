package in.sp.main.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import in.sp.main.entity.TechnicianJob;

public interface TechnicianJobRepository extends JpaRepository<TechnicianJob, Long> {

    List<TechnicianJob> findByTechnician_Email(String email);

}