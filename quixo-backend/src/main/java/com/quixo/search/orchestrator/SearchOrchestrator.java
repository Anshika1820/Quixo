package com.quixo.search.orchestrator;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.quixo.dto.SearchResult;
import com.quixo.search.normalization.SearchResultNormalizer;
import com.quixo.search.serpapi.SerpApiService;

@Service
public class SearchOrchestrator {
	private final SerpApiService serpApiService;
	private final SearchResultNormalizer normalizer;
	
	public SearchOrchestrator(SerpApiService serpApiService, SearchResultNormalizer normalizer) {
		this.serpApiService=serpApiService;
		this.normalizer=normalizer;
	}
	
	public List<SearchResult> search(String query){
		Map<String, Object> rawResponse= serpApiService.searchGoogle(query);
		return normalizer.normalizeGoogleResults(rawResponse);
	}
	
}
