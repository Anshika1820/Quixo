package com.quixo.search.orchestrator;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.quixo.dto.SearchResult;
import com.quixo.search.normalization.SearchResultNormalizer;
import com.quixo.search.serpapi.SerpApiService;
import com.quixo.search.strategy.SearchMode;
import com.quixo.search.strategy.SearchStrategy;

@Service
public class SearchOrchestrator {
	
	private final List<SearchStrategy> strategies;
	
	public SearchOrchestrator(List<SearchStrategy> strategies) {
		super();
		this.strategies = strategies;
	}

	public List<SearchResult> search(String query, SearchMode mode) {
		SearchStrategy strategy=strategies.stream().filter(s -> s.supports(mode))
				.findFirst()
				.orElseThrow(() -> new IllegalArgumentException("No search strategy available for mode: " + mode));
		return strategy.search(query, mode);
	}
		
		
}
	
	

