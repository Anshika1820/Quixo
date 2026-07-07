package com.searchengine.backend.controller;
import com.searchengine.backend.service.SearchService;
import java.util.List;
import java.util.ArrayList;
import com.searchengine.backend.model.SearchResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
@CrossOrigin("http://localhost:5173")
@RestController
public class SearchController {
	private final SearchService searchService;
	public SearchController(SearchService searchService) {
		this.searchService=searchService;	
	}
	@GetMapping("/search")

	public List<SearchResult> search( @RequestParam String query){
		return searchService.search(query);
	}
	
}
