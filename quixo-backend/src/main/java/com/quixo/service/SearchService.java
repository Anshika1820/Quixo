package com.quixo.service;

import org.springframework.stereotype.Service;

import com.quixo.dto.SearchExecutionMetadata;
import com.quixo.dto.SearchResponse;
import com.quixo.dto.SearchResult;
import com.quixo.search.orchestrator.SearchOrchestrator;
import com.quixo.search.strategy.SearchMode;
import com.quixo.search.strategy.SearchModeMetadata;
import com.quixo.search.strategy.SearchModeMetadataService;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SearchService {
	
	private final SearchOrchestrator searchOrchestrator;
	private final SearchModeMetadataService metadataService;
	
	public SearchService(SearchOrchestrator searchOrchestrator, SearchModeMetadataService metadataService) {
		super();
		this.searchOrchestrator = searchOrchestrator;
		this.metadataService = metadataService;
	}	
	
	public SearchResponse search(String query, SearchMode mode){
		List<SearchResult> results =
                searchOrchestrator.search(query, mode);
		String engine = "google";
		switch(mode) {
		case CAREER:
			engine="google_jobs";
			break;
		case RESEARCH:
			engine="google_news";
			break;
		case EXPLORE:
		case LEARN:
			engine="google";
			break;
		}
		 SearchExecutionMetadata executionMetadata= new SearchExecutionMetadata(engine, LocalDateTime.now(), results.size());
			
        SearchModeMetadata metadata= metadataService.getMetadata(mode);
        
        return new SearchResponse(query, mode.name(), metadata.getLabel(), metadata.getDescription(), results, executionMetadata);
	}
	
}