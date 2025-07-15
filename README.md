# Web Crawler Project

This repository contains a full-stack web crawler application with a React frontend and a Go backend.

## Project Structure

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