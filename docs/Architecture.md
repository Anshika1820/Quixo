##### QUIXO — System Architecture

##### 

###### 1\. Overview



QUIXO is a search-engine project with a React-based frontend and a Java Spring Boot backend. SerpApi provides the search data used by the application.



The frontend handles user interaction and displays search results. The backend handles search requests and communicates with the external search provider.



###### 2\. Technology Stack



| Component        | Technology                                         | Responsibility                         |

| ---------------- | -------------------------------------------------- | -------------------------------------- |

| Frontend         | React and JavaScript                               | User interface and search interactions |

| Frontend tooling | Vite                                               | Development server and build tooling   |

| Styling          | Tailwind CSS                                       | Interface styling                      |

| Backend          | Java 21 and Spring Boot                            | Search API and backend processing      |

| Search provider  | SerpApi                                            | Search data retrieval                  |

| Database         | To be confirmed against the current implementation | Persistent storage, if used            |



###### 3\. High-Level Architecture

+-----------------------------+

|           User              |

+-----------------------------+

&#x20;             |

&#x20;             v

+-----------------------------+

|       React Frontend        |

| Search input and results UI |

+-----------------------------+

&#x20;             |

&#x20;             | HTTP request

&#x20;             v

+-----------------------------+

|     Spring Boot Backend     |

| Search endpoint and logic   |

+-----------------------------+

&#x20;             |

&#x20;             | Search request

&#x20;             v

+-----------------------------+

|           SerpApi            |

| External search data         |

+-----------------------------+

&#x20;             |

&#x20;             | Search response

&#x20;             v

+-----------------------------+

|     Spring Boot Backend     |

| Response processing          |

+-----------------------------+

&#x20;             |

&#x20;             | JSON response

&#x20;             v

+-----------------------------+

|       React Frontend        |

| Displays search results      |

+-----------------------------+



###### 4\. Request Lifecycle



1\. The user enters a search query in the QUIXO interface.

2\. The frontend sends the query to the backend search endpoint.

3\. The backend validates the query and prepares the search request.

4\. The backend calls SerpApi using server-side configuration.

5\. SerpApi returns search data to the backend.

6\. The backend handles the response and returns the available result data.

7\. The frontend renders the results for the user.



Invalid queries and external service failures should be handled gracefully so that the application can return meaningful errors.

###### 

###### 5\. Frontend Responsibilities



The frontend is responsible for:



\* Rendering the QUIXO search interface.

\* Collecting user queries.

\* Providing the available search modes.

\* Communicating with the backend API.

\* Displaying results, loading states, and errors.



The current interface includes Explore, Learn, Career, and Research search modes. Their behavior should be documented according to the implemented functionality.



###### 6\. Backend Responsibilities



The Spring Boot backend is responsible for:



\* Receiving search requests.

\* Validating input.

\* Communicating with SerpApi.

\* Processing search responses.

\* Returning structured responses to the frontend.

\* Handling invalid input and upstream service errors.



###### 7\. Configuration and Security



The SerpApi API key must remain on the backend and must not be exposed in frontend JavaScript or committed to the public repository.



Configuration should be provided through environment variables or another appropriate local configuration mechanism.



The repository should include example configuration containing placeholders only, never real secrets.



###### 8\. Error Handling

###### 

The application should account for:



\* Empty or invalid search queries.

\* Invalid or missing API credentials.

\* SerpApi request failures.

\* Network timeouts.

\* Unexpected response formats.

\* Backend errors.



Errors should be returned in a consistent format and displayed to users in a useful way.



###### 9\. Future Improvements



Potential improvements include:



\* Automated backend and frontend tests.

\* More robust timeout and retry handling.

\* Better search-result organization.

\* Improved accessibility and responsive design.

\* Deployment and production configuration documentation.

\* Additional search capabilities based on user feedback.



These are improvement areas, not claims that every capability is already implemented.







\*This document describes the intended architecture of QUIXO. Update it whenever the implementation changes.\*



