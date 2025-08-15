Bhai, chhota sa **Flask backend setup guide** bana deta hoon so you can keep it in your project folder as a mini-doc.

---

## **Flask Backend Setup – Quick Guide**

**1. Go to backend folder**

```bash
cd D:\Futureway\FwaySMS\src\backend\python
```

**2. Create virtual environment**

```bash
python -m venv venv
```

**3. Activate virtual environment**

* **CMD:**

```bash
venv\Scripts\activate
```

* **PowerShell:**

```bash
.\venv\Scripts\Activate.ps1
```

**4. Install dependencies**

```bash
pip install Flask flask-cors
```

**5. Save dependencies**

```bash
pip freeze > requirements.txt
```

**6. Run Flask app**

```bash
python app.py
```

(Default runs at: `http://127.0.0.1:5000`)

**7. Deactivate virtual environment**

```bash
deactivate
```

---

**requirements.txt example**

```
Flask==3.0.3
flask-cors==4.0.1
```

---

Bhai, chaho to main tumhare liye abhi **`app.py` ka code** bana du jo tumhare wallpapers folder ka data JSON me React ko bhej de.
Woh bana doon?
