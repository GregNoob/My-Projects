const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// MongoDB connection (replace with your actual MongoDB URI)
mongoose.connect('mongodb://localhost:27017/webscraperdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for the articles
const articleSchema = new mongoose.Schema({
  title: String,
  url: String,
  scrapedAt: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);

const url = "https://www.guitarworld.com/";

async function scrapeArticles() {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $(".article-name").each(function () {
      const title = $(this).text().trim();
      const articleUrl = $(this).find("a").attr("href");
      if (title && articleUrl) {
        articles.push({
          title,
          url: articleUrl.startsWith('http') ? articleUrl : `${url}${articleUrl}`
        });
      }
    });

    // Save articles to database
    await Article.insertMany(articles);
    console.log(`Scraped and saved ${articles.length} articles`);
  } catch (error) {
    console.error('Error scraping articles:', error.message);
  }
}

// API endpoint to get scraped articles
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ scrapedAt: -1 }).limit(50);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching articles' });
  }
});

// Scrape articles every hour
setInterval(scrapeArticles, 3600000);

// Initial scrape on startup
scrapeArticles();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
