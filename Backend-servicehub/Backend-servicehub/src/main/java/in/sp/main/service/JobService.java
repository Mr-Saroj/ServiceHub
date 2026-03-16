package in.sp.main.service;

import org.springframework.beans.factory.annotation.Autowired;

import in.sp.main.entity.ServiceRequest;
import in.sp.main.entity.TechnicianJob;
import in.sp.main.entity.User;
import in.sp.main.repository.ServiceRequestRepository;
import in.sp.main.repository.TechnicianJobRepository;
import in.sp.main.repository.UserRepository;

public class JobService {
	@Autowired
	private TechnicianJobRepository technicianJobRepository;

	@Autowired
	private ServiceRequestRepository serviceRequestRepository;

	@Autowired
	private UserRepository userRepository;

	public void acceptJob(Long requestId, String email) {

	    ServiceRequest request = serviceRequestRepository
	            .findById(requestId)
	            .orElseThrow();

	    User technician = userRepository
	            .findByEmail(email)
	            .orElseThrow();

	    TechnicianJob job = new TechnicianJob();
	    job.setTechnician(technician);
	    job.setRequest(request);

	    technicianJobRepository.save(job);
	}

}
