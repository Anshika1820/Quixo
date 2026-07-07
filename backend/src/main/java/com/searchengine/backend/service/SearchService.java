package com.searchengine.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.searchengine.backend.model.SearchResult;
import com.searchengine.backend.repository.SearchRepository;

@Service
public class SearchService {

    private final SearchRepository searchRepository;

    public SearchService(SearchRepository searchRepository) {
        this.searchRepository = searchRepository;
    }

    public List<SearchResult> search(String query) {

        List<SearchResult> allResults =
                searchRepository.getAllResults();

        List<SearchResult> filteredResults =
                new ArrayList<>();

        for(SearchResult result : allResults) {

            if(result.getTitle()
                    .toLowerCase()
                    .contains(query.toLowerCase())) {

                filteredResults.add(result);
            }
        }

        return filteredResults;
    }
}