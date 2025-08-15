import sys
import os

# Apne project ka path add karo
project_home = '/home/rishi979580/mysite'
if project_home not in sys.path:
    sys.path.append(project_home)

# Virtual environment agar use kar rahe ho to yaha set karo
# activate_this = '/home/rishi979580/.virtualenvs/myenv/bin/activate_this.py'
# exec(open(activate_this).read(), dict(__file__=activate_this))

# Flask app ko import karo
from app import app as application  # yaha "app" tumhare app.py ka Flask object hai
