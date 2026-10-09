package com.quixo.search.strategy;

import org.springframework.stereotype.Service;

@Service
public class SearchModeMetadataService {
	public SearchModeMetadata getMetadata(SearchMode mode) {
		return switch(mode) {
			case EXPLORE -> new SearchModeMetadata("Explore","Discover general information from the web.");
			case LEARN -> new SearchModeMetadata("Learn","Find tutorials, documentation and leanring resources.");
			case CAREER -> new SearchModeMetadata("Career","Find jobs and career opportunities.");
			case RESEARCH -> new SearchModeMetadata("Research","Explore recent imformation, news and research-related sources.");	
		};
	}
}
