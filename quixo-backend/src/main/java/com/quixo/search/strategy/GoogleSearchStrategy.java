package com.quixo.search.strategy;

import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Map;

import com.quixo.search.normalization.SearchResultNormalizer;
import com.quixo.search.serpapi.SearchRequestConfig;
import com.quixo.search.serpapi.SerpApiService;
import com.quixo.dto.SearchResult;

@Component
public class GoogleSearchStrategy implements SearchStrategy{
	private final SerpApiService serpApiService;
	private final SearchResultNormalizer normalizer;
	
	public GoogleSearchStrategy(SerpApiService serpApiService, SearchResultNormalizer normalizer) {
		super();
		this.serpApiService = serpApiService;
		this.normalizer = normalizer;
	}
	
	@Override
	public boolean supports(SearchMode mode) {
		return mode==SearchMode.EXPLORE || mode==SearchMode.LEARN;
	}
	 
	@Override
	public List<SearchResult> search(String query, SearchMode mode){
		String searchQuery=query;
		if(mode==SearchMode.LEARN) {
			searchQuery= query+" tutorial documentation";
		}
		SearchRequestConfig config=new SearchRequestConfig("google", Map.of("q", searchQuery, "hl", "en","gl","in"));
		Map<String, Object> response=serpApiService.search(config);
		return normalizer.normalizeGoogleResults(response);
	}
}
