document.addEventListener('DOMContentLoaded', function() {
    // AI Question elements
    const questionInput = document.getElementById('questionInput');
    const askButton = document.getElementById('askButton');
    const aiResponse = document.getElementById('aiResponse');
    const responseContent = document.getElementById('responseContent');
    const btnText = askButton.querySelector('.btn-text');
    const btnLoading = askButton.querySelector('.btn-loading');
    
    // Animal selection elements
    const animalCheckboxes = document.querySelectorAll('.animal-checkbox');
    const animalDisplay = document.getElementById('animalDisplay');
    
    // File upload elements
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const fileType = document.getElementById('fileType');
    
    // Handle AI question submission
    askButton.addEventListener('click', askGeminiAI);
    questionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            askGeminiAI();
        }
    });
    
    // Handle animal checkbox selection (only one at a time)
    animalCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Uncheck other checkboxes
                animalCheckboxes.forEach(cb => {
                    if (cb !== this) cb.checked = false;
                });
                
                // Show selected animal image
                showAnimalImage(this.value);
            } else {
                // If unchecked, show placeholder
                showPlaceholder();
            }
        });
    });
    
    // Show animal image
    async function showAnimalImage(animalName) {
        try {
            animalDisplay.innerHTML = '<div class="loading"></div><p>Loading...</p>';
            
            const response = await fetch(`/api/animal/${animalName}`);
            const data = await response.json();
            
            if (response.ok) {
                animalDisplay.innerHTML = `
                    <img src="${data.image_path}" alt="${data.animal}" />
                `;
            } else {
                animalDisplay.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
            }
        } catch (error) {
            animalDisplay.innerHTML = `<p style="color: red;">Failed to load image: ${error.message}</p>`;
        }
    }
    
    // Show placeholder text
    function showPlaceholder() {
        animalDisplay.innerHTML = '<p class="placeholder-text">Select an animal to see its image</p>';
    }
    
    // File input change event
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            uploadFile(this.files[0]);
        }
    });
    
    // Drag and drop functionality
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            fileInput.files = files;
            uploadFile(files[0]);
        }
    });
    
    // Upload file and get information
    async function uploadFile(file) {
        try {
            // Show loading state
            fileInfo.style.display = 'block';
            fileName.textContent = 'Loading...';
            fileSize.textContent = 'Loading...';
            fileType.textContent = 'Loading...';
            
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                // Display file information
                fileName.textContent = data.file_info.name;
                fileSize.textContent = formatFileSize(data.file_info.size);
                fileType.textContent = data.file_info.type || 'Unknown';
                
                // Update upload area to show success
                uploadArea.innerHTML = `
                    <div class="upload-placeholder">
                        <div class="upload-icon" style="color: #28a745;">✅</div>
                        <p style="color: #28a745; font-weight: 600;">File uploaded successfully!</p>
                        <p style="font-size: 0.9rem; color: #6c757d;">${data.file_info.name}</p>
                        <button type="button" class="upload-btn" onclick="location.reload()">
                            Upload Another File
                        </button>
                    </div>
                `;
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (error) {
            // Show error state
            fileInfo.style.display = 'block';
            fileName.textContent = 'Error';
            fileSize.textContent = 'Error';
            fileType.textContent = 'Error';
            
            uploadArea.innerHTML = `
                <div class="upload-placeholder">
                    <div class="upload-icon" style="color: #dc3545;">❌</div>
                    <p style="color: #dc3545; font-weight: 600;">Upload failed!</p>
                    <p style="font-size: 0.9rem; color: #6c757d;">${error.message}</p>
                    <button type="button" class="upload-btn" onclick="location.reload()">
                        Try Again
                    </button>
                </div>
            `;
        }
    }
    
    // Format file size in human readable format
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Click handler for upload area
    uploadArea.addEventListener('click', function() {
        if (!fileInput.files || !fileInput.files[0]) {
            fileInput.click();
        }
    });
    
    // Ask Gemini AI function
    async function askGeminiAI() {
        const question = questionInput.value.trim();
        if (!question) {
            alert('Please enter a question first!');
            return;
        }
        
        try {
            // Show loading state
            askButton.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            aiResponse.style.display = 'none';
            
            const response = await fetch('/api/ask-gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: question })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                // Display successful response
                responseContent.innerHTML = '';
                
                // Add text response
                if (data.response.text) {
                    const textElement = document.createElement('div');
                    textElement.textContent = data.response.text;
                    textElement.style.marginBottom = '15px';
                    responseContent.appendChild(textElement);
                }
                
                // Add images if any
                if (data.response.images && data.response.images.length > 0) {
                    data.response.images.forEach(imageBase64 => {
                        const imgElement = document.createElement('img');
                        imgElement.src = `data:image/jpeg;base64,${imageBase64}`;
                        imgElement.alt = 'Generated image';
                        responseContent.appendChild(imgElement);
                    });
                }
                
                aiResponse.style.display = 'block';
                
                // Clear the input
                questionInput.value = '';
            } else {
                // Show error
                responseContent.innerHTML = `
                    <div class="error-message">
                        <strong>Error:</strong> ${data.error || 'Failed to get response from Gemini AI'}
                    </div>
                `;
                aiResponse.style.display = 'block';
            }
        } catch (error) {
            // Show network/connection error
            responseContent.innerHTML = `
                <div class="error-message">
                    <strong>Connection Error:</strong> ${error.message}
                </div>
            `;
            aiResponse.style.display = 'block';
        } finally {
            // Reset button state
            askButton.disabled = false;
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
        }
    }
});

// Global function for reload button (needed because of inline onclick)
window.reloadPage = function() {
    location.reload();
};
