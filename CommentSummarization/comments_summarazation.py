from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.get_json()
    text = data.get('text')
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    summarizer = pipeline('summarization')
    summarized_text = summarizer(text, max_length=130, min_length=30, do_sample=False)[0]['summary_text']
    
    return jsonify({'summarized_text': summarized_text})

if __name__ == '__main__':
    app.run(debug=True)