package com.quixo.dto;

import java.time.LocalDateTime;

public class SearchExecutionMetadata {
	
	private String engine;
	private LocalDateTime executedAt;
	private int resultCount;
	public SearchExecutionMetadata(String engine, LocalDateTime executedAt, int resultCount) {
		super();
		this.engine = engine;
		this.executedAt = executedAt;
		this.resultCount = resultCount;
	}
	public String getEngine() {
		return engine;
	}
	public LocalDateTime getExecutedAt() {
		return executedAt;
	}
	public int getResultCount() {
		return resultCount;
	}
}
