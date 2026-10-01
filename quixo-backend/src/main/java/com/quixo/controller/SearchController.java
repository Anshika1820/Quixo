package com.quixo.controller;

import com.quixo.dto.SearchResult;
import com.quixo.exception.InvalidSearchQueryException;
import com.quixo.service.SearchService;
import com.quixo.dto.SearchResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
public class SearchController {
	private final SearchService searchService;
	public SearchController(SearchService searchService) {
		this.searchService=searchService;
	}
	
	@GetMapping("/health")
	public String healthCheck() {
		return "Quixo Search API is working";
	}
	
	@GetMapping
	public SearchResponse search(@RequestParam String q){
		if(q==null || q.isBlank()) {
			throw new InvalidSearchQueryException("Search cannot be empty.");
		}
		
		List<SearchResult> results=searchService.search(q);
		return new SearchResponse(q,"web",results);
	}
	
}