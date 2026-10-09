
package com.quixo.search.strategy;

import org.springframework.stereotype.Component;

import com.quixo.search.normalization.SearchResultNormalizer;
import com.quixo.search.serpapi.SerpApiService;
import com.quixo.dto.SearchResult;

import java.util.List;
import java.util.Map;

@Component
public class CareerSearchStrategy implements SearchStrategy {

    private final SerpApiService serpApiService;
    private final SearchResultNormalizer normalizer;

    public CareerSearchStrategy(
            SerpApiService serpApiService,
            SearchResultNormalizer normalizer) {
        this.serpApiService = serpApiService;
        this.normalizer = normalizer;
    }

    @Override
    public boolean supports(SearchMode mode) {
        return mode == SearchMode.CAREER;
    }

    @Override
    public List<SearchResult> search(String query, SearchMode mode) {
        Map<String, Object> response = serpApiService.searchJobs(query);
        return normalizer.normalizeJobResults(response);
    }
}

