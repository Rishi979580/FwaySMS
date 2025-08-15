from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGE_ROOT = os.path.join(BASE_DIR, "wallpapers")

@app.route("/api/wallpapers", methods=["GET"])
def get_wallpapers():
    base_url = "http://127.0.0.1:5000/images"
    data = {}

    for category in os.listdir(IMAGE_ROOT):
        category_path = os.path.join(IMAGE_ROOT, category)
        if os.path.isdir(category_path):
            data[category] = {}

            for platform in os.listdir(category_path):  # Instagram, YouTube
                platform_path = os.path.join(category_path, platform)
                if os.path.isdir(platform_path):
                    files = [
                        f"{base_url}/{category}/{platform}/{file}"
                        for file in os.listdir(platform_path)
                        if file.lower().endswith((".png", ".jpg", ".jpeg", ".gif"))
                    ]
                    data[category][platform] = files

    return jsonify(data)

@app.route("/images/<category>/<platform>/<filename>")
def serve_image(category, platform, filename):
    return send_from_directory(os.path.join(IMAGE_ROOT, category, platform), filename)

@app.route("/")
def home():
    return "Wallpaper API with Category + Platform 🚀"

if __name__ == "__main__":
    app.run(debug=True)
