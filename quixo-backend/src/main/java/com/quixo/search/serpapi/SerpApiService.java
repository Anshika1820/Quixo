package com.quixo.search.serpapi;

import java.util.Map;
import com.quixo.search.serpapi.SearchRequestConfig;

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
	public Map<String, Object> searchJobs(String query){
		try {
			return restClient.get().uri(uriBuilder -> uriBuilder.path("/search").queryParam("engine", "google_jobs")
					.queryParam("q",query).queryParam("api_key", serpApiConfig.getApiKey())
					.build()).retrieve().body(Map.class);
		}
		catch(Exception e) {
			throw new SearchServiceException("Unable to complete the job search right now", e);
		}
	}
	public Map<String,Object> searchNews(String query){
		try {
			return restClient.get().uri(uriBuilder -> uriBuilder.path("/search").queryParam("engine", "google_news")
					.queryParam("q", query).queryParam("api_key", serpApiConfig.getApiKey()).build()).retrieve().body(Map.class);
		}
		catch(Exception e) {
			throw new SearchServiceException("Unable to complete the news search right now",e);
		}
	}
	
	public Map<String, Object> search(SearchRequestConfig config){
		try {

	        return restClient.get()
	        		.uri(uriBuilder -> {

	        		    uriBuilder
	        		        .path("/search")
	        		        .queryParam("engine", config.getEngine())
	        		        .queryParam("api_key", serpApiConfig.getApiKey());

	        		    config.getParameters().forEach(
	        		        uriBuilder::queryParam
	        		    );

	        		    return uriBuilder.build();
	        		})
	                .retrieve()
	                .body(Map.class);

	    } catch (Exception e) {

	        throw new SearchServiceException(
	                "Unble to complete the search right now",
	                e
	        );
	    }
		
	}
}  
