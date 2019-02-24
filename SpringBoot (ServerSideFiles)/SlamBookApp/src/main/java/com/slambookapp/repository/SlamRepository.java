package com.slambookapp.repository;
import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.slambookapp.model.Slam;

@Repository
public interface SlamRepository extends JpaRepository<Slam, Long> {
	Slam findByName(String name);
	Collection<Slam> findByToAddress(String emailid);
}
