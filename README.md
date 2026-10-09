# QUIXO — A Smarter Search Experience

QUIXO is a search-engine project designed to make exploring information on the web feel more organized and intuitive. It combines a modern React interface with a Java Spring Boot backend and SerpApi-powered search results.

Rather than presenting search as just a single input and a list of links, QUIXO introduces a dedicated search workspace with multiple search modes and a focused interface for discovering information.

> **Project status:** In active development.

## ✨ Features

* **Custom search workspace:** A dedicated interface for entering queries and exploring results.
* **Multiple search modes:** Explore, Learn, Career, and Research.
* **Live search integration:** Uses SerpApi through the backend to retrieve search data.
* **Source-oriented results:** Presents search-result information and links to help users explore original sources.
* **Modern user interface:** Built with React, Vite, and Tailwind CSS.
* **Java backend:** Uses Spring Boot to handle backend search functionality and communicate with the search provider.

*Feature availability and behavior may change as QUIXO continues to develop.*

## 🛠️ Technology Stack

| Layer           | Technologies                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| Frontend        | React, JavaScript, Vite                                                                               |
| Styling         | Tailwind CSS                                                                                          |
| Backend         | Java 21, Spring Boot                                                                                  |
| Search provider | SerpApi                                                                                               |
| Database        | MongoDB (planned or integrated features should be documented according to the current implementation) |
| Version control | Git and GitHub                                                                                        |

## 🏗️ Architecture

QUIXO separates the user interface from the backend search functionality.

1. The user enters a query in the React frontend.
2. The frontend sends a request to the Spring Boot backend.
3. The backend communicates with SerpApi to retrieve search data.
4. The backend processes the response and returns data to the frontend.
5. The frontend displays the available results to the user.

```text
User
  |
  v
React + Vite Frontend
  |
  | HTTP request
  v
Spring Boot Backend
  |
  | Search request
  v
SerpApi
  |
  | Search results
  v
Spring Boot Backend
  |
  | JSON response
  v
React Search Workspace
```

## 🚀 Getting Started

Follow these instructions to run QUIXO locally. The exact environment variable names and commands must match the current frontend and backend configuration.

### Prerequisites

Install the following tools:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) and npm
* [Java Development Kit 21](https://adoptium.net/)
* [SerpApi account and API key](https://serpapi.com/)

Install MongoDB only if the current backend configuration requires it.

### 1. Clone the repository

```bash
git clone YOUR_PUBLIC_GITHUB_REPOSITORY_URL
cd YOUR_REPOSITORY_FOLDER
```

Replace the URL and folder name with the actual values for this repository.

### 2. Configure the backend

Open the backend project directory and configure the SerpApi API key using the environment variable or configuration property expected by the application.

Do not commit your real API key to GitHub.

Then start the Spring Boot application using the command supported by the backend project. For a Maven project with the Maven wrapper, this may be:

```bash
./mvnw spring-boot:run
```

On Windows, use:

```powershell
.\mvnw.cmd spring-boot:run
```

### 3. Configure the frontend

Open a terminal in the frontend directory, install dependencies, and start the development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in the terminal.

Ensure that the frontend's API base URL and the backend's port and endpoint configuration match.

## 🔐 Environment Configuration

QUIXO requires a valid SerpApi API key for live search functionality.

* Store secrets in local environment variables or an appropriate local configuration file.
* Keep real `.env` files and secret-bearing configuration out of version control.
* Provide an `.env.example` file containing placeholder values only.
* Never publish passwords, access tokens, or API keys in source code, screenshots, or demo recordings.

Refer to the project configuration and setup documentation for the exact variable names.

## 📂 Project Structure

The repository contains the frontend and backend components of QUIXO.

```text
QUIXO/
├── frontend/       # React user interface
├── quixo-backend/  # Java Spring Boot backend
├── docs/           # Project documentation
└── README.md       # Project overview and setup guide
```

*Update these directory names if your actual GitHub repository uses a different structure.*

## 🧪 Testing

Before using the project, verify that:

* The frontend starts successfully.
* The backend starts without errors.
* A valid search query reaches the backend.
* SerpApi returns search data for a valid request.
* The frontend displays the returned results.
* Invalid or empty queries are handled appropriately.

## 🗺️ Roadmap

Planned improvements may include:

* Improving search relevance and result organization.
* Developing more useful search-mode experiences.
* Improving error handling and loading states.
* Expanding testing and documentation.
* Exploring additional ways to help users discover and compare information.

The roadmap will evolve based on implementation progress and user feedback.

## 🤖 AI-Assisted Development

AI tools may be used during development for tasks such as brainstorming, implementation assistance, debugging, and documentation. The specific tools and their actual roles should be disclosed accurately in the hackathon submission.

## 🏆 Hackathon

QUIXO is being prepared for the SerpApi India Hackathon 2026. SerpApi is used as the search-data provider for the project's search functionality.

## 📄 License

A license has not yet been specified. Add an appropriate open-source license if you intend to distribute the project under one, and ensure that you have the right to license all included code and assets.

## 👩‍💻 Author

**Anshika Srivastava**

* GitHub: [Anshika1820](https://github.com/Anshika1820)
* LinkedIn: [anshikasri18](https://www.linkedin.com/in/anshikasri18/)

QUIXO is a work in progress. Documentation and features will be updated as the project develops.
