package com.quixo.service;

import com.quixo.model.SearchResult;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

	public List<SearchResult> search(String query) {

	    return List.of(

	        new SearchResult(
	                "J",
	                "Java Official Documentation",
	                "docs.oracle.com",
	                "Official Java documentation from Oracle."
	        ),

	        new SearchResult(
	                "B",
	                "Baeldung",
	                "www.baeldung.com",
	                "Practical tutorials for Java and Spring Boot."
	        ),

	        new SearchResult(
	                "S",
	                "Spring Boot",
	                "spring.io",
	                "Official Spring Boot documentation and guides."
	        )

	    );
	}
    }
}