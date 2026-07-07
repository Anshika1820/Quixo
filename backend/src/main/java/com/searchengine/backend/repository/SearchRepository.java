package com.searchengine.backend.repository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;
import com.searchengine.backend.model.SearchResult;

@Repository

public class SearchRepository {
	public List<SearchResult> getAllResults(){
		List<SearchResult> allResults=new ArrayList<>();
		allResults.add(
				new SearchResult(
						"React JS",
						"Frontend JavaScript Library",
						"https://react.dev"));
		allResults.add(
				new SearchResult(
						"Spring Boot",
						"Backend Java Framework",
						"https://spring.io"));
		allResults.add(
				new SearchResult(
						"Java",
		                "Object Oriented Programming Language",
		                "https://www.oracle.com/java/"));
		return allResults;
	}
}
