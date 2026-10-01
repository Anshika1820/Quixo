package com.quixo.exception;

public class InvalidSearchQueryException extends RuntimeException {
	public InvalidSearchQueryException(String message) {
		super(message);
	}
}
