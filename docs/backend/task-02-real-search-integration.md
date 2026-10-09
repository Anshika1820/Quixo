##### **Task 2: Real Search Integration \& Result Normalization**



###### **Situation:**

After establishing the Spring Boot backend foundation, the next requirement was to make Quixo perform real searches.

The long-term architecture requires Quixo to work with multiple search sources through SerpApi. I therefore needed to avoid coupling the REST controller directly to SerpApi.

I also needed an internal result format because different SerpApi engines can return different response structures.



###### **Task:**



I needed to:

* connect the backend to SerpApi
* keep the API key outside the source code
* expose a Quixo search endpoint
* separate external API communication from business logic
* introduce search orchestration
* normalize external search results into Quixo's own format
* handles the err



###### **Action:**



I added a SerpApiService responsible for communicating with SerpApi.

The service uses Spring's RestClient to send the request to the SerpApi search endpoint.

The API key is loaded through an environment variable:

serpapi.api-key=${SERPAPI\_KEY}

This keeps the credential out of the source code.

I then introduced SearchOrchestrator between the application service and the external search service.

The resulting flow is:

SearchController

&#x20;     ↓

SearchService

&#x20;     ↓

SearchOrchestrator

&#x20;     ↓

SerpApiService

&#x20;     ↓

SerpApi



The raw response from SerpApi is not returned directly to the frontend.

Instead, SearchResultNormalizer extracts the relevant fields and converts them into Quixo's internal SearchResult model.

This gives Quixo a consistent representation:

* title
* link
* snippet
* source
* sourceType
* image
* date
* position

The controller then returns a SearchResponse containing the original query, search type and normalized results.



###### **Result:**



Quixo can now perform live Google searches through SerpApi using: GET /api/v1/search?q=<query>

The backend receives the external search response, normalizes the relevant results and returns Quixo's own JSON response structure.

The main architectural improvement is that the frontend is no longer coupled to SerpApi's response format.

The system is now prepared for additional search engines and future intelligence layers.



###### **Architecture Decision:**



I deliberately kept SerpApi communication inside SerpApiService.

I did not put the external API call inside SearchController because the controller should remain responsible for the HTTP boundary.

I also introduced SearchOrchestrator early because Quixo is intended to combine different search sources based on user intent.

The planned architecture can therefore evolve from:

SearchOrchestrator

&#x20;      ↓

SerpApiService

&#x20;      ↓

Google Search

into something closer to:

&#x20;                SearchOrchestrator

&#x20;                 /       |       \\

&#x20;                /        |        \\

&#x20;         Google Search  Jobs      News

&#x20;                \\        |        /

&#x20;                 \\       |       /

&#x20;                  Normalization

&#x20;                        ↓

&#x20;                 Quixo Results

without redesigning the REST layer.



###### **Data Flow:**



For a query such as:

java developer

the request travels through:



GET /api/v1/search?q=java+developer

&#x20;           ↓

SearchController

&#x20;           ↓

SearchService

&#x20;           ↓

SearchOrchestrator

&#x20;           ↓

SerpApiService

&#x20;           ↓

SerpApi Google Search

&#x20;           ↓

Raw JSON

&#x20;           ↓

SearchResultNormalizer

&#x20;           ↓

List<SearchResult>

&#x20;           ↓

SearchResponse

&#x20;           ↓

HTTP JSON response



###### **Security Consideration:**



The SerpApi key is not stored directly in the Java source code or committed configuration.

The application expects: SERPAPI\_KEY to be available as an environment variable.



###### **Testing:**



I tested the search endpoint using live queries such as:

java developer

spring boot tutorial

software engineer jobs in Bangalore

The expected behavior is that each query produces a response containing normalized search results.

I also verified that the application still start through Spring Boot on port 8080.



###### **Current Limitation:**



At this stage, Quixo only uses the Google Search engine through SerpApi.

The system does not yet:

* understand search intent
* select search engines dynamically
* personalize results
* classify sources
* store search history
* create search journeys
* compare results
* use AI for research
* connect the React frontend

Those capabilities will be added incrementally.

