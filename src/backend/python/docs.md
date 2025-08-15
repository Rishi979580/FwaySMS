
## ====================================================================Host on Pythonanywhere===================
## Open: https://www.pythonanywhere.com/user/rishi979580/
# 🚀 PythonAnywhere Flask Deployment Guide

## 1️⃣ Code Upload
Upload your Flask project to PythonAnywhere using:
```bash
git clone https://github.com/<username>/<repo>.git
````

Or use the **Files** tab to upload manually.

---

## 2️⃣ Create Virtual Environment

```bash
cd /home/<your_username>/<project_folder>
python3.13 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Verify installation:

```bash
pip show flask-cors
```

---

## 3️⃣ Create Web App

1. Go to **Dashboard → Web** tab.
2. Click **Add a new web app**.
3. Select **Manual configuration**.
4. Choose Python version (e.g., Python 3.13).

---

## 4️⃣ Link Virtualenv

In **Web tab → Virtualenv** section, set:

```
/home/<your_username>/<project_folder>/venv
```

---

## 5️⃣ Configure WSGI File

Open your WSGI file (link in **Web tab**) and replace with:

```python
import sys
import os

# Path to your project
project_home = '/home/<your_username>/<project_folder>'
if project_home not in sys.path:
    sys.path = [project_home] + sys.path

# Activate virtualenv
activate_this = os.path.join(project_home, 'venv', 'bin', 'activate_this.py')
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))

# Import your Flask app
from app import app as application  # 'app.py' must define 'app = Flask(__name__)'
```

---

## 6️⃣ Reload App

Click **Reload** in Web tab.

---

## 7️⃣ Common Errors

* **ModuleNotFoundError** → Ensure virtualenv path is correct and packages installed:

```bash
source /home/<your_username>/<project_folder>/venv/bin/activate
pip install <package_name>
```

---

## 8️⃣ Recommended Project Structure

```
project_folder/
│
├── app.py          # Flask app entry point
├── requirements.txt
├── venv/           # Virtual environment
├── static/         # CSS, JS, images
└── templates/      # HTML files


