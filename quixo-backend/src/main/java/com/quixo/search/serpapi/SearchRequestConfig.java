package com.quixo.search.serpapi;

import java.util.Map;

public class SearchRequestConfig {
	private final String engine;
	private final Map<String, String> parameters;
	
	public SearchRequestConfig(String engine, Map<String, String> parameters) {
		super();
		this.engine = engine;
		this.parameters = parameters;
	}

	public String getEngine() {
		return engine;
	}

	public Map<String, String> getParameters() {
		return parameters;
	}
	
}
