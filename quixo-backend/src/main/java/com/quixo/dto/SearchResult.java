package com.quixo.dto;

public class SearchResult {
	private String title;
	private String link;
	private String snippet;
	private String source;
	private String sourceType;
	private String image;
	private String date;
	private Integer position;
	
	public SearchResult(String title, String link, String snippet, String source, String sourceType, String image, String date,
			Integer position) {
		this.title = title;
		this.link = link;
		this.snippet = snippet;
		this.source = source;
		this.sourceType = sourceType;
		this.image = image;
		this.date=date;
		this.position = position;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getSnippet() {
		return snippet;
	}

	public void setSnippet(String snippet) {
		this.snippet = snippet;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getSourceType() {
		return sourceType;
	}

	public void setSourceType(String sourceType) {
		this.sourceType = sourceType;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Integer getPosition() {
		return position;
	}

	public void setPosition(Integer position) {
		this.position = position;
	}
	
	
}