Image Filter App

A full-stack image filtering web application built with:

Frontend: React
Backend: Django + Django REST Framework
Image Processing: Pillow

Users can upload images, apply filters, preview results, and download the filtered image.

Features
Upload image
Apply image filters:
Grayscale
Blur
Brightness enhancement
Preview original image
Preview filtered image
Download filtered image
REST API integration
Tech Stack
Frontend
React
Axios
Backend
Django
Django REST Framework
Pillow
django-cors-headers
Project Structure
challenge2/
│
├── backend/
│   ├── api/
│   ├── image_filter/
│   ├── media/
│   └── manage.py
│
└── frontend/
    ├── src/
    └── package.json
Backend Setup
1. Navigate to backend
cd backend
2. Create virtual environment
python3 -m venv venv
3. Activate virtual environment
Linux / Mac
source venv/bin/activate
Windows
venv\\Scripts\\activate
4. Install dependencies
pip install django djangorestframework pillow django-cors-headers
5. Run migrations
python manage.py makemigrations
python manage.py migrate
6. Start backend server
python manage.py runserver

Backend runs on:

http://127.0.0.1:8000/
Frontend Setup
1. Navigate to frontend
cd frontend
2. Install dependencies
npm install
npm install axios
3. Start React app
npm start

Frontend runs on:

http://localhost:3000/
API Endpoints
Upload Image
POST /api/upload/
Form Data
Key	Type
image	File
Apply Filter
POST /api/filter/<image_id>/
JSON Body
{
  "filter": "grayscale"
}

Available filters:

grayscale
blur
bright
Example Workflow
Upload an image
Choose a filter
View filtered result
Download filtered image
Future Improvements
More filters
Image resizing
User authentication
Filter intensity controls
Image history
Cloud deployment
Author

Developed by Nedal Shoqo , Tariq Abu AlSoud.
