##### **Task 1: Backend Foundation**

###### 

###### **Situation:**

Quixo is being developed as a personal search and decision- intelligence system rather than a simple search interface. The planed system will eventually combine multiple search sources, result normalization, personalizing, AI processing, saved collections, search journeys and comparisons of the search.

Because these features will introduce several backend responsibilities, I needed a basic backend structure that could back the application.



###### **Task:**

My first implementation task was to establish the Spring Boot backend foundation and create initial controller-service flow.

The goal was to check that:

* the application is running correctly.
* the backend shows a versioned REST API by name the endpoints as "api/v1/search"
* controller and service communicates



###### **Action:**

I created initial backend structure under com.quixo and separated HTTP handling from application logic.

The initial structure is:
com.quixo

|-- controller

|-- service

|-- dto

|-- model

|-- repository

|-- config

|-- exception

|-- search



I created a SearchController.java under Controller package as a REST entry point for search related APIs.

The controller uses the base path: /api/v1/search

Then I created SearchService under service package and connected it to the SearchController using constructor Dependency Injection.

The current flow is:

HTTP Request

&#x20;   ⇩

SearchController

&#x20;   ⇩

SearchService

&#x20;   ⇩

HTTP Response



###### **Result:**

The backend starts successfully and the initial health endpoint is available at: api/v1/search/health

The endpoint returns:

Quixo Search API is running

This confirms that the Controller-Service Communication is working.



###### **Engineering Decision:**

1. **Versioned API:**

I started the API with : /api/v1

This gives backend a clear API boundary and allows future breaking due to API changes as we will introduce new versions.



**2. Controller-Service Separation:**

I kept HTTP handling inside the controller and application logic inside the service.

This is important as to maintain a module based application where each module has its own isolated function. So, the controller is handling the HTTP Request and Response whereas service will contain business logic.



**3. Incremental Architecture:**

I did not create every planned Quixo component immediately.

Features such as API processing, comparison, journeys, personalization and collections will be introduced when their implementation requirements are reached. 

This keeps the current codebase understandable while preserving the planned architecture.



###### **Testing:**

**Test 1- Application startup**

Expected:

Tomcat started on port 8080

Started QuixoApplication



**Test 2- Search Health Endpoint**

Request: 

GET/api/v1/search/health

Expected:

Quixo Search API is running













