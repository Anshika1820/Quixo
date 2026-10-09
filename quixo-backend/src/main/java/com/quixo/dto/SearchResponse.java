package com.quixo.dto;

import java.util.List;

public class SearchResponse {
	private String query;
	private String searchType;
	private String modeLabel;
	private String description;
	private SearchExecutionMetadata searchExecutionMetadata;
	private List<SearchResult> searchResult;
	
	public String getQuery() {
		return query;
	}
	public String getSearchType() {
		return searchType;
	}
	public List<SearchResult> getSearchResult() {
		return searchResult;
	}
	public String getModeLabel() {
		return modeLabel;
	}
	public String getDescription() {
		return description;
	}
	public SearchExecutionMetadata getSearchExecutionMetadata() {
		return searchExecutionMetadata;
	}
	public SearchResponse(String query, String searchType, String modeLabel, String description,
			 List<SearchResult> searchResult, SearchExecutionMetadata searchExecutionMetadata) {
		super();
		this.query = query;
		this.searchType = searchType;
		this.modeLabel = modeLabel;
		this.description = description;
		this.searchResult = searchResult;
		this.searchExecutionMetadata = searchExecutionMetadata;
		
	}
	
}
