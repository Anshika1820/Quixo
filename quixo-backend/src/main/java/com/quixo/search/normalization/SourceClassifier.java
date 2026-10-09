package com.quixo.search.normalization;

import org.springframework.stereotype.Component;

@Component
public class SourceClassifier {
	public String classify(String link) {
		if(link == null || link.isBlank()) {
			return "UNKNOWN";
		}
		
		String url=link.toLowerCase();
		if(url.contains("github.com")) return "GITHUB";
		if(url.contains("youtube.com") || url.contains("youtu.be")) return "VIDEO";
		if(url.contains("ac.in") || url.contains("edu.in") || url.contains("res.in") || url.contains("ernet.in")) return "ACADEMIC";
		if(url.contains("docs.") || url.contains("/docs/") || url.contains("developer.")) return "DOCUMENTATION";
		if(url.contains("linkedin.com") || url.contains("indeed.com") || url.contains("naukri.com")) return "CAREER";
		if(url.contains("reddit.com") || url.contains("stackoverflow.com")) return "COMMUNITY";
		return "WEB";
	}
	
}
