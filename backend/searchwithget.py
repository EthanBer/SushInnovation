import requests
import re
import time
from TOKENS import SERP_API_KEY
from serpapi import GoogleSearch
import urllib.parse

USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
]

def get_product_recommendations(product_name, price_range):
    # Updated endpoint for the Perplexity API
    url = "https://api.perplexity.ai/chat/completions"
    
    # API headers and parameters
    headers = {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
    }
    
    # Defining the payload to pass the product information
    payload = {
        "model": "llama-3.1-sonar-small-128k-online",
        "messages": [
            {
                "role": "system",
                "content": "Be precise and concise."
            },
            {
                "role": "user",
                "content": f"What are the best {product_name} in {price_range} price range? Please make sure that they are in said price range around, under 1000 should not reccomend products for 50, Include details from reddit.com and any relevant hobby sites like head-fi.org, and provide links to where the products are sold on popular e-commerce websites like Amazon or Best Buy."
            }
        ],
        "temperature": 0.2,
        "top_p": 0.9,
        "return_citations": True,
        "return_images": False,
        "return_related_questions": False,
        "search_recency_filter": "month",
        "top_k": 0,
        "stream": False,
        "presence_penalty": 0,
        "frequency_penalty": 1
    }
    
    # Making the API request
    try:
        response = requests.post(url, headers=headers, json=payload)
        if response.status_code == 404:
            print("Error occurred: Endpoint not found. Please check the API URL.")
            return None
        response.raise_for_status()
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error occurred: {e}")
        return None

def fetch_product_links_serpapi(product_name):
    search_query = f"{product_name} buy online"
    params = {
        "engine": "google",
        "q": search_query,
        "api_key": SERP_API_KEY,
        "num": 10
    }
    links = []
    try:
        search = GoogleSearch(params)
        results = search.get_dict()
        for result in results.get("organic_results", []):
            link = result.get("link")
            if link:
                if "amazon.com" in link and "/dp/" in link:
                    links.append((link, "Amazon"))
                else:
                    links.append((link, "Other"))
                if len(links) >= 10:  # Limiting to top 10 links for efficiency
                    break
    except Exception as e:
        print(f"Error occurred while fetching links: {e}")
    
    return links

def get_cheapest_link(links):
    # Placeholder logic for determining the cheapest link
    amazon_links = [link for link in links if link[1] == "Amazon"]
    other_links = [link for link in links if link[1] == "Other"]
    
    cheapest_links = []
    if other_links:
        cheapest_links.append(other_links[0])  # Assume the first 'Other' link is cheapest as a placeholder
    if amazon_links:
        cheapest_links.append(amazon_links[0])
    elif len(other_links) > 1:
        cheapest_links.append(other_links[1])
    
    return cheapest_links[:2]  # Return at most 2 links, with the cheaper one first

# New getter method to return a 2D array of recommendations
def get_recommendations_array(product_name, price_range):
    recommendations = get_product_recommendations(product_name, price_range)
    if not recommendations:
        return None
    choices = recommendations.get("choices", [])
    product_links = {}  # Associative array to store product links

    if choices:
        content = choices[0]["message"]["content"]
        # Extracting product names using regular expressions
        product_pattern = re.compile(r"\*\*(.*?)\*\*:.*?\n")
        products = product_pattern.findall(content)
        
        # Fetching purchase links for each product using SerpApi
        for product in products:
            links = fetch_product_links_serpapi(product)
            cheapest_links = get_cheapest_link(links)
            product_links[product] = [link[0] for link in cheapest_links] if cheapest_links else ["Link not found"]
        
        # Removing unwanted sections
        unwanted_sections = ["description", "price", "features", "review", "where to buy", "details"]
        product_links = {key: value for key, value in product_links.items() if key.lower() not in unwanted_sections}

        # Building the 2D array
        recommendations_array = []
        for product, links in product_links.items():
            # Ensure that there are two links
            if len(links) < 2:
                links.extend([""] * (2 - len(links)))  # Add empty strings if less than 2 links
            recommendations_array.append([product, links[0], links[1]])

        return recommendations_array
    else:
        return None

def main():
    # Taking product name input from user
    product_name = input("Enter the product name or category you are interested in (e.g., headphones): ")
    price_range = input("Enter the price range (e.g., under $200): ")
    
    # Get the recommendations array
    recommendations_array = get_recommendations_array(product_name, price_range)
    if recommendations_array:
        print("\nProduct Recommendations (as 1d array outputs from a 2D array):\n")
        for item in recommendations_array:
            print(item)
    else:
        print("No recommendations found.")

if __name__ == "__main__":
    main()
