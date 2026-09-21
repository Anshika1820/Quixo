package com.quixo.service;

import org.springframework.stereotype.Service;

import com.quixo.dto.SearchResponse;
import com.quixo.dto.SearchResult;
import com.quixo.search.orchestrator.SearchOrchestrator;

import java.util.List;

@Service
public class SearchService {
	
	private final SearchOrchestrator searchOrchestrator;
	
	public SearchService(SearchOrchestrator searchOrchestrator) {
		this.searchOrchestrator=searchOrchestrator;
	}
	
	public List<SearchResult> search(String query){
		return searchOrchestrator.search(query);
	}
	
}