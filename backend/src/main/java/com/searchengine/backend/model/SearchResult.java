package com.searchengine.backend.model;

public class SearchResult {
	private String title;
	private String description;
	private String url;
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public SearchResult() {

	}
	public SearchResult(String title, String description, String url) {
		this.title = title;
		this.description = description;
		this.url = url;
	}
}
