package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
	"golang.org/x/net/html"
)

// Struct to accept URL in POST request
type AnalyzeRequest struct {
	URL string `json:"url"`
}

// Struct to respond with analysis results
type AnalyzeResponse struct {
	URL               string `json:"url"`
	Status            string `json:"status"`
	HTMLVersion       string `json:"htmlVersion"`
	PageTitle         string `json:"pageTitle"`
	InternalLinks     int    `json:"internalLinks"`
	ExternalLinks     int    `json:"externalLinks"`
	InaccessibleLinks int    `json:"inaccessibleLinks"`
	HasLoginForm      string `json:"hasLoginForm"`
}

// Entry point
func main() {
	r := mux.NewRouter()
	r.HandleFunc("/analyze", analyzeHandler).Methods("POST", "OPTIONS") // include OPTIONS

	// Wrap router with CORS
	http.Handle("/", enableCORS(r))

	fmt.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

// HTTP handler for analyzing the URL
func analyzeHandler(w http.ResponseWriter, r *http.Request) {
	var req AnalyzeRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil || req.URL == "" {
		http.Error(w, "Invalid JSON or missing 'url'", http.StatusBadRequest)
		return
	}

	result, err := crawl(req.URL)
	if err != nil {
		http.Error(w, "Failed to crawl URL: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

// Crawl and analyze the webpage
func crawl(url string) (*AnalyzeResponse, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	z := html.NewTokenizer(resp.Body)

	var (
		title             string
		internal          int
		external          int
		inaccessibleLinks int
		hasLoginForm      bool
		links             []string
	)

	for {
		tt := z.Next()
		switch tt {
		case html.ErrorToken:
			goto DONE

		case html.StartTagToken:
			t := z.Token()

			// Title tag
			if t.Data == "title" {
				z.Next()
				title = z.Token().Data
			}

			// Heading detection (can be expanded if needed)
			if t.Data == "h1" {
				// Skipped counting here since not needed in new format
			}

			// Anchor tag - collect links
			if t.Data == "a" {
				for _, attr := range t.Attr {
					if attr.Key == "href" {
						href := attr.Val
						if strings.HasPrefix(href, "/") || strings.Contains(href, url) {
							internal++
						} else if strings.HasPrefix(href, "http") {
							external++
						}
						links = append(links, href)
					}
				}
			}

			// Login form detection
			if t.Data == "input" {
				for _, attr := range t.Attr {
					if attr.Key == "type" && attr.Val == "password" {
						hasLoginForm = true
					}
				}
			}
		}
	}

DONE:
	// Check for broken links (synchronously for now)
	for _, link := range links {
		if !strings.HasPrefix(link, "http") {
			if strings.HasPrefix(link, "/") {
				link = url + link
			} else {
				continue
			}
		}
		res, err := http.Head(link)
		if err != nil || res.StatusCode >= 400 {
			inaccessibleLinks++
		}
	}

	return &AnalyzeResponse{
		URL:               url,
		Status:            "done",
		HTMLVersion:       "HTML5", // Simplified
		PageTitle:         title,
		InternalLinks:     internal,
		ExternalLinks:     external,
		InaccessibleLinks: inaccessibleLinks,
		HasLoginForm:      map[bool]string{true: "Yes", false: "No"}[hasLoginForm],
	}, nil
}
func enableCORS(next http.Handler) http.Handler {
	fmt.Println("checking cors")
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Allow your frontend's origin
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Handle preflight (OPTIONS) requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
