package com.quixo.search.serpapi;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.quixo.config.SerpApiConfig;
import com.quixo.exception.SearchServiceException;

@Service
public class SerpApiService {
	private final RestClient restClient;
	private final SerpApiConfig serpApiConfig;
	
	public SerpApiService(SerpApiConfig serpApiConfig) {
		this.serpApiConfig=serpApiConfig;
		this.restClient=RestClient.builder().baseUrl("https://serpapi.com").build();
	}
	
	public Map<String, Object> searchGoogle(String query){
		try{
			return restClient.get().uri(uriBuilder -> uriBuilder.path("/search").queryParam("engine", "google")
					.queryParam("q", query).queryParam("api_key", serpApiConfig.getApiKey()).build()).retrieve().body(Map.class);
		}
		catch(Exception e) {
			throw new SearchServiceException("Unable to complete the search right now", e);
		}
	}
}  
