# Web Crawler Project

This repository contains a full-stack web crawler application with a React frontend and a Go backend.

## Project Structure

```
.gitignore
README.md
Backend-web-crawler/
    go.mod
    go.sum
    webcrawler.go
web-crawler-ui/
    package.json
    README.md
    public/
        favicon.ico
        index.html
        logo192.png
        logo512.png
        manifest.json
        robots.txt
    src/
        App.css
        App.js
        App.test.js
        index.css
        index.js
        logo.svg
        reportWebVitals.js
        setupTests.js
        theme.js
        components/
            URLTable.js
```

- **Backend-web-crawler/**  
  Go backend service for analyzing web pages.
- **web-crawler-ui/**  
  React frontend for submitting URLs and viewing analysis results.

## Features

- Analyze any website URL for:
  - HTML version
  - Page title
  - Internal and external links
  - Inaccessible links
  - Presence of login forms
- Modern UI built with Material-UI and DataGrid
- CORS-enabled backend for easy local development

## Getting Started

### Backend

1. Navigate to `Backend-web-crawler/`
2. Install dependencies:
   ```sh
   go mod tidy
   ```
3. Run the server:
   ```sh
   go run webcrawler.go
   ```
   The backend will start on `http://localhost:8080`.

### Frontend

1. Navigate to `web-crawler-ui/`
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```
   The frontend will start on `http://localhost:3000`.

## Usage

1. Open the frontend in your browser.
2. Enter a website URL and click "Add URL".
3. View the analysis results in the table.

## Technologies Used

- Go (Golang)
- React
- Material-UI
- Axios
- Gorilla Mux

## License