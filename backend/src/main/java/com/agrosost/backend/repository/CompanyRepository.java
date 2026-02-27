package com.agrosost.backend.repository;

import com.agrosost.backend.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    List<Company> findBySegmentIgnoreCase(String segment);
}
