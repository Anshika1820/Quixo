package com.quixo.model;

public class SearchResult {

    private String letter;
    private String title;
    private String url;
    private String snippet;

    public SearchResult() {
    }

    public SearchResult(String letter, String title, String url, String snippet) {
        this.letter = letter;
        this.title = title;
        this.url = url;
        this.snippet = snippet;
    }

    public String getLetter() {
        return letter;
    }

    public void setLetter(String letter) {
        this.letter = letter;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getSnippet() {
        return snippet;
    }

    public void setSnippet(String snippet) {
        this.snippet = snippet;
    }
}