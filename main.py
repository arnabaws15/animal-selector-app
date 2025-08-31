from fastapi import FastAPI, File, UploadFile, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
import base64
import google.generativeai as genai
from pathlib import Path

app = FastAPI()

# Configure Gemini AI
# You'll need to set this environment variable with your API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")

# Pydantic models
class QuestionRequest(BaseModel):
    question: str

@app.get("/")
async def read_root(request: Request):
    """Serve the main HTML page"""
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api/animal/{animal_name}")
async def get_animal_image(animal_name: str):
    """Get animal image path"""
    valid_animals = ["cat", "dog", "elephant"]
    if animal_name.lower() not in valid_animals:
        return JSONResponse(
            status_code=400,
            content={"error": "Invalid animal. Choose from: cat, dog, elephant"}
        )
    
    image_path = f"/static/images/{animal_name.lower()}.svg"
    return JSONResponse(content={"image_path": image_path, "animal": animal_name})

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    """Handle file upload and return file information"""
    try:
        # Get file information
        file_info = {
            "name": file.filename,
            "size": len(await file.read()),
            "type": file.content_type
        }
        
        return JSONResponse(content={
            "success": True,
            "file_info": file_info
        })
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )

@app.post("/api/ask-gemini")
async def ask_gemini(request: QuestionRequest):
    """Ask Gemini AI a question and get response"""
    try:
        if not GEMINI_API_KEY:
            return JSONResponse(
                status_code=500,
                content={
                    "success": False, 
                    "error": "Gemini API key not configured. Please set GEMINI_API_KEY environment variable."
                }
            )
        
        # Initialize the Gemini model
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        
        # Generate content using the model
        response = model.generate_content(request.question)
        
        # Extract text response
        response_text = response.text if response.text else ""
        
        # Check if response contains images (Gemini might include base64 images)
        images = []
        
        return JSONResponse(content={
            "success": True,
            "response": {
                "text": response_text,
                "images": images
            }
        })
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": f"Error communicating with Gemini AI: {str(e)}"
            }
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
