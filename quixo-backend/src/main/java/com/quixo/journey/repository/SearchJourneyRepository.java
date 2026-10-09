package com.quixo.journey.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.quixo.journey.model.SearchJourney;

public interface SearchJourneyRepository extends MongoRepository<SearchJourney, String>{

}
