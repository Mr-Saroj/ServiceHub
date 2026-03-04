package in.sp.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.sp.main.entity.ServiceCategory;

public interface ServiceCategoryRepository
        extends JpaRepository<ServiceCategory, Long> {
}
