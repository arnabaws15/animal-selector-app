# AI Assistant with Gemini - Interactive Web App

A modern web application with FastAPI backend and HTML/CSS/JS frontend that combines AI capabilities with interactive features. Users can:

1. **Ask Gemini AI**: Get intelligent responses to any questions using Google's Gemini 2.0-flash-exp model
2. **Select Animals**: Choose from cat, dog, or elephant checkboxes to view their images  
3. **Upload Files**: Upload any file and view its name, size, and type information

## ✨ Features

### 🤖 **AI Assistant (NEW!)**
- **Ask Questions**: Submit any question and get intelligent responses from Gemini AI
- **Real-time Processing**: See loading states while Gemini thinks
- **Rich Responses**: Display text responses with support for future image responses
- **Error Handling**: Graceful handling of API errors with user-friendly messages
- **Keyboard Shortcuts**: Use Ctrl/Cmd + Enter to quickly submit questions

### 🐾 **Animal Selection**
- Three checkboxes for cat, dog, and elephant
- Only one animal can be selected at a time
- Displays corresponding animal image when selected
- Custom SVG illustrations for each animal

### 📁 **File Upload**
- Drag and drop or click to upload files
- Supports all file types
- Shows file information: name, size (formatted), and type
- Visual feedback for upload success/failure

### 🎨 **Modern UI**
- Responsive design that works on desktop and mobile
- Beautiful gradient background with modern styling
- Smooth animations and hover effects
- Clean, intuitive interface with organized layout

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd animal_selector_app
```

### 2. Create a virtual environment (recommended)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Get your Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Navigate to the API key management section
4. Generate a new API key

### 5. Set up environment variables
```bash
# Set your Gemini API key as an environment variable
export GEMINI_API_KEY="your_api_key_here"

# On Windows:
set GEMINI_API_KEY="your_api_key_here"
```

## 🏃‍♂️ Running the Application

1. Start the FastAPI server:
```bash
python main.py
```

2. Open your web browser and navigate to:
```
http://localhost:8000
```

3. Start asking questions to Gemini AI! 🎉

## 🛠️ API Endpoints

- `GET /` - Serves the main HTML page
- `POST /api/ask-gemini` - **NEW!** Send questions to Gemini AI and get responses
- `GET /api/animal/{animal_name}` - Returns image path for specified animal (cat, dog, elephant)  
- `POST /api/upload` - Handles file upload and returns file information

## 🔧 Technologies Used

- **AI Integration**: Google Gemini 2.0-flash-exp API
- **Backend**: FastAPI, Python
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Modern CSS with gradients, animations, and responsive design
- **File Handling**: Python multipart for file uploads
- **HTTP Client**: Fetch API for seamless frontend-backend communication

## 📁 Project Structure

```
animal_selector_app/
├── main.py                 # FastAPI backend with Gemini AI integration
├── requirements.txt        # Python dependencies (includes google-generativeai)
├── README.md              # This documentation
├── templates/
│   └── index.html         # Main HTML template with AI interface
├── static/
│   ├── css/
│   │   └── style.css      # Enhanced stylesheet with AI components
│   ├── js/
│   │   └── script.js      # Frontend JavaScript with AI functionality
│   └── images/
│       ├── cat.svg        # Cat illustration
│       ├── dog.svg        # Dog illustration
│       └── elephant.svg   # Elephant illustration
└── venv/                  # Virtual environment (created after setup)
```

## 💡 Usage Examples

### Ask Gemini AI
- **Creative Writing**: "Write a short story about a time-traveling cat"
- **Explanations**: "Explain quantum computing in simple terms"
- **Code Help**: "How do I implement a binary search in Python?"
- **General Questions**: "What are the health benefits of drinking green tea?"

### Animal Selection  
- Click on any animal checkbox to see its beautiful SVG illustration
- Only one animal can be selected at a time

### File Upload
- Drag and drop any file or click to browse
- View detailed file information including size and type

## 🚀 Future Enhancements

- [ ] Support for image generation responses from Gemini
- [ ] Chat history and conversation memory
- [ ] Multiple AI model selection
- [ ] File content analysis with AI
- [ ] Voice input for questions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Important Notes

- **API Key Security**: Never commit your Gemini API key to version control
- **Rate Limits**: Be aware of Gemini API rate limits and usage quotas
- **Error Handling**: The app gracefully handles API errors and network issues

---

*Built with ❤️ using FastAPI and Google Gemini AI*
