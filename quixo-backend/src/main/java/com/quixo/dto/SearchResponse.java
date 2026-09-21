package com.quixo.dto;

import java.util.List;

public class SearchResponse {
	private String query;
	private String searchType;
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
	
	public SearchResponse(String query, String searchType, List<SearchResult> searchResult) {
		super();
		this.query = query;
		this.searchType = searchType;
		this.searchResult = searchResult;
	}
}