package com.quixo.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
	private final UserService userService;

	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}
	 
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public User  createUser(@RequestParam String name, @RequestParam String email) {
		return userService.createUser(name, email);
	}
	
	@GetMapping("/{id}")
	public User getUser(@PathVariable String id) {
		return userService.getUserById(id);
	}
}
