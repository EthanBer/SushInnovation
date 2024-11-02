from flask import Flask, jsonify, request
from flask_cors import CORS

from searchwithget import get_recommendations_array
# pip install flask flask-cors

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"]) 

@app.route('/api/query', methods=['POST'])
def handle_query():
    data = request.get_json()
    query = data.get('query', '')


    ## Commented out for now to not charge credits
    # recommendations_array = get_recommendations_array(product_name, price_range)
    
    response = [
    {
      "id": 1,
      "title": query,
      "description": "This is your query",
      "url": "https://apple.com",
      "image": "/api/placeholder/200/200"
    },
    {
      "id": 2,
      "title": "MacBook Air 13' M2",
      "description": "Incredibly thin and light, featuring the M2 chip and up to 18 hours of battery life.",
      "url": "#",
      "image": "/api/placeholder/200/200"
    },
    {
      "id": 3,
      "title": "iPad Pro 12.9' M2",
      "description": "Most advanced iPad ever with M2 chip, Liquid Retina XDR display, and Apple Pencil hover.",
      "url": "#",
      "image": "/api/placeholder/200/200"
    },
    {
      "id": 4,
      "title": "iPhone 15 Pro Max",
      "description": "Pro camera system, A17 Pro chip, titanium design, and Action button.",
      "url": "#",
      "image": "/api/placeholder/200/200"
    }
    ]
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)