package com.quixo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.quixo.exception.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(InvalidSearchQueryException.class)
	public ResponseEntity<ErrorResponse> handleInvalidSearchQuery(InvalidSearchQueryException exception){
		ErrorResponse errorResponse =new ErrorResponse("INVALID_SEARCH_QUERY", exception.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
	}
	
	@ExceptionHandler(SearchServiceException.class)
	public ResponseEntity<ErrorResponse> handleSearchServiceException(SearchServiceException exception){
		ErrorResponse errorResponse=new ErrorResponse("SEARCH_SERVICE_EXCEPTION", exception.getMessage());
		return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(errorResponse);
	}
	
}
