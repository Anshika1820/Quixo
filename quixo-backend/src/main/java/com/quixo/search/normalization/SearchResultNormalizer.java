package com.quixo.search.normalization;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.quixo.dto.SearchResult;

@Component
public class SearchResultNormalizer {
	
	private final SourceClassifier sourceClassifier;
	
	public SearchResultNormalizer(SourceClassifier sourceClassifier) {
		super();
		this.sourceClassifier = sourceClassifier;
	}

	public List<SearchResult> normalizeGoogleResults(Map<String, Object> serpApiResponse){
		List<SearchResult> results=new ArrayList<>();
		Object organicResultsObject= serpApiResponse.get("organic_results");
		
		if(!(organicResultsObject instanceof List<?> organicResults)) {
			return results;
		}
		
		for(Object resultObject: organicResults) {
			if(!(resultObject instanceof Map<?,?> result)) {
				continue;
			}
			
			String title=cleanText(getString(result, "title"));
			String link=getString(result, "link");
			String snippet=cleanText(getString(result, "snippet"));
			String displayedLink=getString(result, "displayed_link");
			String date=getString(result, "date");
			Integer position=getInteger(result, "position");
			
			if(!isValidResult(title,link)) {
				continue;
			}
			
			SearchResult searchResult=new SearchResult(title, link, snippet, displayedLink, sourceClassifier.classify(link), null, date, position);
			results.add(searchResult);
			
		}
		return removeDuplicates(results);
	}
	
	public List<SearchResult> normalizeJobResults(Map<String, Object> serpApiResponse){
		List<SearchResult> results= new ArrayList<>();
		Object jobsResultsObject=serpApiResponse.get("jobs_results");
		if(!(jobsResultsObject instanceof List<?> jobResults)) {
			return results;
		}
		for(Object resultObject : jobResults) {
			if(!(resultObject instanceof Map<?,?> result)) {
				continue;
			}
			String title=cleanText(getString(result,"title"));
			String link = getString(result, "share_link");
	        String snippet = cleanText(getString(result, "description"));
	        String company = getString(result, "company_name");
	        String date = getString(result, "detected_extensions");
	        
	        if(!isValidResult(title, link)) {
	        	continue;
	        }
	        SearchResult searchResult = new SearchResult(
	                title,
	                link,
	                snippet,
	                company,
	                "JOB",
	                null,
	                date,
	                null
	        );
	        results.add(searchResult);
		}
		return removeDuplicates(results);	
	}
	
	public List<SearchResult> normalizeNewsResults(Map<String, Object> serpApiResponse){
		List<SearchResult> results=new ArrayList<>();
		Object newsResultsObject = serpApiResponse.get("news_results");
		if(!(newsResultsObject instanceof List<?> newsResults)) {
			return results;
		}
		for(Object resultObject: newsResults) {
			if(!(resultObject instanceof Map<?,?> result )) {
				continue;
			}
			String title = cleanText(getString(result, "title"));
	        String link = getString(result, "link");
	        String snippet =cleanText( getString(result, "snippet"));
	        String source = getString(result, "source");
	        String date = getString(result, "date");
	        String image = getString(result, "thumbnail");
	        
	        if(!isValidResult(title, link)) {
	        	continue;
	        }
	        
	        SearchResult searchResult = new SearchResult(
	                title,
	                link,
	                snippet,
	                source,
	                "NEWS",
	                image,
	                date,
	                null
	        );

	        results.add(searchResult);
	    }

	    return removeDuplicates(results);
	}
	
	private String cleanText(String value) {
		if(value == null) return null;
		return value.replaceAll("<[^>]*>", "").replace("&amp;", "&").replace("&quot;", "\"").replace("&#39", "'").trim();
	}
	
	private boolean isValidResult(String title, String link) {
		return title != null && !title.isBlank() && link != null && !link.isBlank();
	}
	
	private List<SearchResult> removeDuplicates(List<SearchResult> results){
		Map<String, SearchResult> uniqueResults= new java.util.LinkedHashMap<>(); 
		 for(SearchResult result: results) {
			 if (result.getLink() != null) {
		         uniqueResults.putIfAbsent(result.getLink(), result);
		     }
		 }
		 return new ArrayList<>(uniqueResults.values());
	}
	
	private String getString(Map<?,?> map, String key) {
		Object value= map.get(key);
		return (value != null) ? value.toString() : null;
	}
	
	private Integer getInteger(Map<?,?> map, String key) {
		Object value= map.get(key);
		if(value instanceof Number number) {
			return number.intValue();
		}
		return null;
	}
}
