package com.quixo.search.strategy;

public class SearchModeMetadata {
	private final String label;
	private final String description;
	public SearchModeMetadata(String label, String description) {
		super();
		this.label = label;
		this.description = description;
	}
	public String getLabel() {
		return label;
	}
	public String getDescription() {
		return description;
	}
}
