
MAXX AI PROJECT - RUN GUIDE

========================
1. CREATE DATABASE
========================

Open PostgreSQL and run:

CREATE DATABASE maxx;

========================
2. BACKEND SETUP
========================

Open terminal:

cd backend

Install dependencies:

pip install -r requirements.txt

Update password in database.py

Run backend:

uvicorn app:app --reload

Backend runs at:
http://127.0.0.1:8000

Swagger Docs:
http://127.0.0.1:8000/docs

========================
3. FRONTEND SETUP
========================

Open another terminal:

cd frontend

Install packages:

npm install

Run frontend:

npm run dev

Frontend runs at:
http://localhost:5173

========================
4. UPLOAD EXCEL
========================

Open:
http://127.0.0.1:8000/docs

Use /upload API

Upload your Excel sheet.

========================
5. FEATURES INCLUDED
========================

✔ FastAPI Backend
✔ PostgreSQL Integration
✔ Excel Upload API
✔ Dashboard APIs
✔ AI Risk Logic
✔ React Frontend
✔ Tailwind CSS UI
✔ Professional Dashboard

