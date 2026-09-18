package com.quixo.dto;

import java.util.List;

public class SearchResponse {
	private String query;
	private int totalResults;
	private List<SearchResult> result;
	
	public SearchResponse() {
		
	}

	public String getQuery() {
		return query;
	}

	public int getTotalResults() {
		return totalResults;
	}

	public List<SearchResult> getResult() {
		return result;
	}

	public SearchResponse(String query, int totalResults, List<SearchResult> result) {
		this.query = query;
		this.totalResults = totalResults;
		this.result = result;
	}	
}