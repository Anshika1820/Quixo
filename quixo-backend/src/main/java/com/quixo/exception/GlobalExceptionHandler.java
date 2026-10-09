package com.quixo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.quixo.exception.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(InvalidSearchQueryException.class)
	public ResponseEntity<ErrorResponse> handleInvalidSearchQuery(InvalidSearchQueryException ex){
		ErrorResponse errorResponse =new ErrorResponse("INVALID_SEARCH_QUERY", ex.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
	}
	
	@ExceptionHandler(SearchServiceException.class)
	public ResponseEntity<ErrorResponse> handleSearchServiceException(SearchServiceException ex){
		ErrorResponse errorResponse=new ErrorResponse("SEARCH_SERVICE_EXCEPTION", ex.getMessage());
		return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(errorResponse);
	}
	
	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<ErrorResponse> handleInvalidParameter(MethodArgumentTypeMismatchException ex){
		String message="Invalid value for parameter: "+ex.getName();
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("INVALID_REQUEST_PARAMETER",message));
	}
	
	@ExceptionHandler(MissingServletRequestParameterException.class)
	public ResponseEntity<ErrorResponse> handleMissingParameter(MissingServletRequestParameterException ex){
		String message="Required parameter '"+ex.getParameterName()+ "' is missing";
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("MISSING_REQUEST_PARAMETER", message));
	}
}
