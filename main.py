from fastapi import FastAPI, File, UploadFile, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
import os
from pathlib import Path

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
