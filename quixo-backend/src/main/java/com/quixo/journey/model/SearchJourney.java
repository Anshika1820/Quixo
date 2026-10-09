package com.quixo.journey.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="searchJourneys")
public class SearchJourney {
	@Id
	private String id;
	private String title;
	private List<String> queries=new ArrayList<>();
	private LocalDateTime createAt;
	private LocalDateTime updatedAt;
	public SearchJourney() {
		
	}
	public SearchJourney(String id, String title, List<String> queries, LocalDateTime createAt,
			LocalDateTime updatedAt) {
		super();
		this.id = id;
		this.title = title;
		this.queries = queries;
		this.createAt = createAt;
		this.updatedAt = updatedAt;
	}
	public String getId() {
		return id;
	}
	public String getTitle() {
		return title;
	}
	public List<String> getQueries() {
		return queries;
	}
	public LocalDateTime getCreateAt() {
		return createAt;
	}
	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}
}
