# Animal Selector & File Upload Web App

A modern web application with FastAPI backend and HTML/CSS/JS frontend that allows users to:

1. **Select Animals**: Choose from cat, dog, or elephant checkboxes to view their images
2. **Upload Files**: Upload any file and view its name, size, and type information

## Features

- **Animal Selection Box**: 
  - Three checkboxes for cat, dog, and elephant
  - Only one animal can be selected at a time
  - Displays corresponding animal image when selected
  - Custom SVG illustrations for each animal

- **File Upload Box**:
  - Drag and drop or click to upload files
  - Supports all file types
  - Shows file information: name, size (formatted), and type
  - Visual feedback for upload success/failure

- **Modern UI**:
  - Responsive design that works on desktop and mobile
  - Beautiful gradient background
  - Smooth animations and hover effects
  - Clean, modern interface

## Installation

1. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

1. Start the FastAPI server:
```bash
python main.py
```

2. Open your web browser and navigate to:
```
http://localhost:8000
```

## API Endpoints

- `GET /` - Serves the main HTML page
- `GET /api/animal/{animal_name}` - Returns image path for specified animal (cat, dog, elephant)
- `POST /api/upload` - Handles file upload and returns file information

## Technologies Used

- **Backend**: FastAPI, Python
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Modern CSS with gradients, animations, and responsive design
- **File Handling**: Python multipart for file uploads

## Project Structure

```
animal_selector_app/
├── main.py                 # FastAPI backend
├── requirements.txt        # Python dependencies
├── README.md              # This file
├── templates/
│   └── index.html         # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css      # Stylesheet
│   ├── js/
│   │   └── script.js      # Frontend JavaScript
│   └── images/
│       ├── cat.svg        # Cat illustration
│       ├── dog.svg        # Dog illustration
│       └── elephant.svg   # Elephant illustration
```
