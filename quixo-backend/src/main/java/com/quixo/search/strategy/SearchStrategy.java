package com.quixo.search.strategy;
import java.util.List;
import com.quixo.dto.SearchResult;

public interface SearchStrategy {
	boolean supports(SearchMode mode);
	List<SearchResult> search(String query, SearchMode mode);
}
