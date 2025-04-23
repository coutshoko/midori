import os
import pandas as pd
import requests
from bs4 import BeautifulSoup
from collections import OrderedDict

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://www.google.com",
}

def extract_data_quote(quote_html):
    quote = quote_html.find('div', {'class': 'quoteText'}).get_text().strip().split('\n')[0]
    author = quote_html.find('span', {'class': 'authorOrTitle'}).get_text().strip()
    tags_container = quote_html.find('div', {'class': 'greyText smallText left'})
    if tags_container is not None:
        tags_list = [tag.get_text() for tag in tags_container.find_all('a')]
        tags = list(OrderedDict.fromkeys(tags_list))
        if 'attributed-no-source' in tags:
            tags.remove('attributed-no-source')
    else:
        tags = None
    return {'quote': quote, 'author': author, 'tags': tags}

def get_quotes_data(page_url):
    page = requests.get(page_url, headers=headers)
    if page.status_code == 200:
        soup = BeautifulSoup(page.content, 'lxml')
        quotes_html_page = soup.find_all('div', {'class': 'quoteDetails'})
        return [extract_data_quote(quote_html) for quote_html in quotes_html_page]
    else:
        print(f"Failed to fetch {page_url} (Status code: {page.status_code})")
        return []

def scrape_author_quotes(author_name, max_pages=100):
    base_url = f"https://www.goodreads.com/quotes/search?utf8=%E2%9C%93&q={author_name.replace(' ', '+')}&commit=Search"
    all_quotes = []
    for i in range(1, max_pages + 1):
        print(f"Scraping page {i} for '{author_name}'...")
        page_url = f"{base_url}&page={i}"
        quotes = get_quotes_data(page_url)
        if quotes:
            all_quotes.extend(quotes)
        else:
            print(f"No quotes found on page {i}, stopping...")
            break
    return all_quotes

def save_data(data, author_name, output_dir="output/"):
    if not data:
        print("No data to save. Exiting...")
        return
    os.makedirs(output_dir, exist_ok=True)
    data_df = pd.DataFrame.from_dict(data)
    data_df['author'] = data_df['author'].str.strip('"')
    data_df['tags'] = data_df['tags'].apply(lambda x: [tag.strip('"') for tag in x] if x is not None else x)
    output_jsonl = os.path.join(output_dir, f"{author_name}_quotes.jsonl")
    data_df.to_json(output_jsonl, orient="records", lines=True, force_ascii=False)
    print(f"Data saved to {output_jsonl}")
    output_csv = os.path.join(output_dir, f"{author_name}_quotes.csv")
    data_df.to_csv(output_csv, index=False)
    print(f"Data saved to {output_csv}")

if __name__ == "__main__":
    author = "Haruki Murakami"
    max_pages = 5
    quotes_data = scrape_author_quotes(author_name=author, max_pages=max_pages)
    save_data(quotes_data, author_name=author)