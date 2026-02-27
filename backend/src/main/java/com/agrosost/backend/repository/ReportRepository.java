package com.agrosost.backend.repository;

import com.agrosost.backend.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    List<Report> findByCompanyIdOrderByYearDesc(Long companyId);

    List<Report> findByYearOrderByCompanyCompanyNameAsc(Integer year);

    @Query("SELECT DISTINCT r.year FROM Report r ORDER BY r.year DESC")
    List<Integer> findDistinctYears();

    @Query("SELECT r FROM Report r JOIN r.company c WHERE " +
            "(:companyId IS NULL OR c.id = :companyId) AND " +
            "(:year IS NULL OR r.year = :year) AND " +
            "(:segment IS NULL OR LOWER(c.segment) = LOWER(:segment)) " +
            "ORDER BY r.year DESC")
    List<Report> findWithFilters(Long companyId, Integer year, String segment);
}
