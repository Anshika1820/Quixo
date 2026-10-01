##### **Task 3: MongoDB Integration \& User Persistence**



###### **Situation**

Quixo had a working Spring Boot backend with SerpApi search integration, but the application had no persistent database layer.

To support future features such as user preferences, search history, saved results and personalization, MongoDB was integrated into the backend.



###### **Task**

* Connect Spring Boot with MongoDB.
* Configure MongoDB database for Quixo.
* Create the first persistent User model.
* Implement repository, service and controller layers.
* Verify that data is actually stored in MongoDB.



###### **Action**

**1.** **MongoDB Configuration:**

Added MongoDB dependency to pom.xml:

<dependency>

&#x20;   <groupId>org.springframework.boot</groupId>

&#x20;   <artifactId>spring-boot-starter-data-mongodb</artifactId>

</dependency>



Configured MongoDB in application.properties:

spring.data.mongodb.uri=mongodb://localhost:27017/quixo



MongoDB was verified through Compass at: localhost:27017



**2. User Document**



Created User.java:

@Document(collection = "users")

public class User {



&#x20;   @Id

&#x20;   private String id;



&#x20;   private String name;

&#x20;   private String email;



&#x20;   public User() {

&#x20;   }



&#x20;   public User(String name, String email) {

&#x20;       this.name = name;

&#x20;       this.email = email;

&#x20;   }

}



**3. Repository**



Created UserRepository.java:

public interface UserRepository

&#x20;       extends MongoRepository<User, String> {

}

This provides MongoDB CRUD operations without writing database queries manually.

The @Document annotation maps the class to the MongoDB users collection.



**4. Service Layer**



Created UserService.java:

@Service

public class UserService {



&#x20;   private final UserRepository userRepository;



&#x20;   public UserService(UserRepository userRepository) {

&#x20;       this.userRepository = userRepository;

&#x20;   }



&#x20;   public User createUser(String name, String email) {

&#x20;       User user = new User(name, email);

&#x20;       return userRepository.save(user);

&#x20;   }

}

The service handles the application logic while the repository handles persistence.



**5. Controller**

Created UserController.java:

@PostMapping

@ResponseStatus(HttpStatus.CREATED)

public User createUser(

&#x20;       @RequestParam String name,

&#x20;       @RequestParam String email) {



&#x20;   return userService.createUser(name, email);

}



This created the initial user API: POST /api/v1/users



###### **Result**

The complete flow was successfully tested:



API

&#x20;↓

UserController

&#x20;↓

UserService

&#x20;↓

UserRepository

&#x20;↓

MongoDB



Spring Boot successfully connected to: localhost:27017

MongoDB Compass confirmed the creation of:

quixo

&#x20;└── users

with 2 documents stored.



###### **Engineering Decisions**

MongoDB → flexible document structure suitable for Quixo's evolving search/personalization data.

Spring Data MongoDB → repository abstraction instead of manually handling the MongoDB driver.

Controller → Service → Repository → keeps responsibilities separated and makes the backend easier to extend.



###### **Current Limitation**

The current user API is intentionally basic. Later we will add:

* DTOs
* Request validation
* Authentication
* Duplicate email handling
* User preferences
* Search history



