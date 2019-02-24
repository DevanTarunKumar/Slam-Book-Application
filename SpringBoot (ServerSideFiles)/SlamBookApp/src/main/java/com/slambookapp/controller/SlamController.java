package com.slambookapp.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.slambookapp.model.Slam;
import com.slambookapp.repository.SlamRepository;


@RestController
@RequestMapping("/api")
class SlamController {
	 private final Logger log = LoggerFactory.getLogger(SlamController.class);
	 
	@Autowired
	    private SlamRepository slamRepository;

	    public SlamController(SlamRepository slamRepository) {
	        this.slamRepository = slamRepository;
	    }

	    @GetMapping("/slams/{emailid}")
	    Collection<Slam> slams(@PathVariable String emailid) {
	        return slamRepository.findByToAddress(emailid);
	    	//return slamRepository.findAll();
	    }
	    

	    @GetMapping("/slam/{id}")
	    ResponseEntity<?> getSlam(@PathVariable Long id) {
	        Optional<Slam> slam = slamRepository.findById(id);
	        return slam.map(response -> ResponseEntity.ok().body(response))
	                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	    }

	    @PostMapping("/slam")
	    ResponseEntity<Slam> createSlam(@Valid @RequestBody Slam slam) throws URISyntaxException {
	        log.info("Request to create slam: {}", slam);
	        Slam result = slamRepository.save(slam);
	        return ResponseEntity.created(new URI("/apz/slam/" + result.getId()))
	                .body(result);
	    }
	    
	    @PostMapping("/login")
	    public void login(@Valid @RequestBody String slam) throws URISyntaxException {
	        log.info("Request to create slam: {}", slam);
	        System.out.println(slam);
	       
	    }

	    @PutMapping("/slam")
	    ResponseEntity<Slam> updateSlam(@Valid @RequestBody Slam slam) {
	        log.info("Request to update slam: {}", slam);
	        Slam result = slamRepository.save(slam);
	        return ResponseEntity.ok().body(result);
	    }

	    @DeleteMapping("/slam/{id}")
	    public ResponseEntity<?> deleteSlam(@PathVariable Long id) {
	        log.info("Request to delete slam: {}", id);
	        slamRepository.deleteById(id);
	        return ResponseEntity.ok().build();
	    }

}
