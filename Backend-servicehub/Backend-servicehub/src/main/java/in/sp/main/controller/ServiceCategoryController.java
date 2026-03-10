package in.sp.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import in.sp.main.entity.ServiceCategory;
import in.sp.main.repository.ServiceCategoryRepository;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceCategoryController {

    @Autowired
    private ServiceCategoryRepository repository;

    @GetMapping
    public List<ServiceCategory> getAllCategories() {
        return repository.findAll();
    }
}