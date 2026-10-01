package com.quixo.user;

import org.springframework.stereotype.Service;

@Service

public class UserService {
	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	public User createUser(String name, String email) {
		User user=new User(name, email);
		return userRepository.save(user);
	}
	
	public User getUserById(String id) {
		return userRepository.findById(id).orElseThrow(()-> new RuntimeException("User not found"));
	}
	
}
