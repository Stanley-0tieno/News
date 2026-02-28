import feedparser
import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime
from email.utils import parsedate_to_datetime
from sqlalchemy.orm import Session
from . import crud, schemas
from dotenv import load_dotenv
import os

load_dotenv()

NEWSAPI_KEY = os.getenv("NEWS_API_KEY")

RSS_FEEDS = {
    "TechCrunch": "https://techcrunch.com/feed/",
    "The Verge": "https://www.theverge.com/rss/index.xml",
    "Wired": "https://www.wired.com/feed/rss",
    "Hacker News": "https://news.ycombinator.com/rss"
}

def generate_slug(title: str) -> str:
    # Remove non-alphanumeric characters and replace spaces with hyphens
    slug = re.sub(r'[^a-zA-Z0-9\s-]', '', title).strip().lower()
    return re.sub(r'[-\s]+', '-', slug)

def extract_image(entry):
    # Look for media_content or image enclosures
    if 'media_content' in entry and len(entry.media_content) > 0:
        return entry.media_content[0].get('url')
    if 'links' in entry:
        for link in entry.links:
            if link.get('type', '').startswith('image/'):
                return link.get('href')
    
    # Check description/summary for img tags
    content = entry.get('content', [{'value': entry.get('summary', '')}])[0].get('value', '')
    soup = BeautifulSoup(content, 'html.parser')
    img_tag = soup.find('img')
    if img_tag and img_tag.get('src'):
        return img_tag.get('src')
        
    return "https://placehold.co/600x400/10B981/ffffff?text=Tech+News"

def parse_date(date_string):
    try:
        if date_string:
            dt = parsedate_to_datetime(date_string)
            return dt
    except Exception:
        pass
    return datetime.now()

def determine_category(entry, source_name):
    categories = ['ai', 'cybersecurity', 'gadgets', 'mobile', 'startups']
    
    text_to_search = (entry.get('title', '') + " " + entry.get('summary', '')).lower()
    
    # Simple keyword matching
    if 'ai ' in text_to_search or 'artificial intelligence' in text_to_search:
        return 'ai'
    if 'security' in text_to_search or 'hack' in text_to_search:
        return 'cybersecurity'
    if 'phone' in text_to_search or 'mobile' in text_to_search or 'ios' in text_to_search or 'android' in text_to_search:
        return 'mobile'
    if 'startup' in text_to_search or 'funding' in text_to_search or source_name == "Hacker News":
        return 'startups'
        
    # Default category
    return 'gadgets'

def fetch_and_store_rss_feeds(db: Session):
    for source_name, feed_url in RSS_FEEDS.items():
        try:
            feed = feedparser.parse(feed_url)
            
            # Take up to 10 entries per feed to avoid overloading at start
            for entry in feed.entries[:10]:
                source_url = entry.link
                
                # Check if already exists
                existing = crud.get_article_by_source_url(db, source_url)
                if existing:
                    continue
                    
                title = entry.get('title', 'No Title')
                if not title:
                    continue
                    
                slug = generate_slug(title)
                # Ensure slug uniqueness in case identical titles happen
                if crud.get_article_by_slug(db, slug):
                    slug = f"{slug}-{datetime.now().strftime('%H%M%S')}"

                summary = entry.get('summary', '')
                # Clean html from summary for actual summary
                clean_summary = BeautifulSoup(summary, "html.parser").get_text()[:200]
                if len(clean_summary) == 200:
                    clean_summary += '...'
                    
                content = entry.get('content', [{'value': summary}])[0].get('value', '')
                
                image_url = extract_image(entry)
                published_date = parse_date(entry.get('published', entry.get('updated')))
                category = determine_category(entry, source_name)
                author = entry.get('author', source_name)
                
                article_data = schemas.ArticleCreate(
                    title=title,
                    slug=slug,
                    summary=clean_summary,
                    content=content,
                    category=category,
                    image_url=image_url,
                    published_date=published_date,
                    source_url=source_url,
                    author=author
                )
                
                crud.create_article(db, article_data)
        except Exception as e:
            print(f"Error fetching from {source_name}: {str(e)}")

def fetch_and_store_newsapi(db: Session):
    url = "https://newsapi.org/v2/everything"


    params = {
        "q": "AI OR cybersecurity OR startups OR mobile OR gadgets",
        "domains": "techcrunch.com,theverge.com,wired.com,engadget.com",
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": 15,
        "apiKey": NEWSAPI_KEY
    }

    try:
        response = requests.get(url, params=params)
        data = response.json()

        if data.get("status") != "ok":
            print("NewsAPI error:", data)
            return

        for item in data.get("articles", []):
            source_url = item.get("url")

            if not source_url:
                continue

            # Avoid duplicates
            existing = crud.get_article_by_source_url(db, source_url)
            if existing:
                continue

            title = item.get("title")
            if not title:
                continue

            slug = generate_slug(title)
            if crud.get_article_by_slug(db, slug):
                slug = f"{slug}-{datetime.now().strftime('%H%M%S')}"

            summary = item.get("description") or ""
            content = item.get("content") or summary
            image_url = item.get("urlToImage") or "https://placehold.co/600x400/2563EB/ffffff?text=GloTech"
            published_date = datetime.fromisoformat(
                item.get("publishedAt").replace("Z", "+00:00")
            ) if item.get("publishedAt") else datetime.now()

            category = determine_category(
                {"title": title, "summary": summary},
                "NewsAPI"
            )

            author = item.get("author") or "NewsAPI"

            article_data = schemas.ArticleCreate(
                title=title,
                slug=slug,
                summary=summary[:200] + "...",
                content=content,
                category=category,
                image_url=image_url,
                published_date=published_date,
                source_url=source_url,
                author=author
            )

            crud.create_article(db, article_data)

    except Exception as e:
        print("Error fetching from NewsAPI:", str(e))