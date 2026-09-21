package com.quixo.search.normalization;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.quixo.dto.SearchResult;

@Component
public class SearchResultNormalizer {
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
			
			String title=getString(result, "title");
			String link=getString(result, "link");
			String snippet=getString(result, "snippet");
			String displayedLink=getString(result, "displayed_link");
			String date=getString(result, "date");
			Integer position=getInteger(result, "position");
			
			SearchResult searchResult=new SearchResult(title, link, snippet, displayedLink,"WEB", null, date, position);
			results.add(searchResult);
			
		}
		return results;
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
