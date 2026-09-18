package com.quixo.service;

import org.springframework.stereotype.Service;

import com.quixo.dto.SearchResponse;
import com.quixo.dto.SearchResult;

import java.util.List;

@Service
public class SearchService {
	public String healthCheck() {
		return "SEarch service is running";	
	}
}