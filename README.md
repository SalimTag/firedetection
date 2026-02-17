# 🔥 Fire Detection System - AI-Powered Wildfire Detection

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![YOLOv8](https://img.shields.io/badge/YOLOv8-Ultralytics-00FFFF)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white)

> AI-powered wildfire detection using YOLOv8 with real-time analysis and responsive web interface

## ✨ Features

- 🎯 **Real-time Fire Detection** - YOLOv8-powered AI model with high accuracy
- 📸 **Image Analysis** - Upload and analyze images for fire/smoke detection
- ⚡ **Fast Processing** - Near-instant inference with <100ms response time
- 📊 **Confidence Scoring** - Detailed confidence scores and bounding boxes
- 🖥️ **Modern UI** - Responsive React dashboard built with Tailwind CSS and shadcn/ui
- 🎨 **Visual Results** - Interactive visualization of detection results
- 📈 **Performance Metrics** - Real-time performance charts and statistics
- 🌐 **Cloud Integration** - Powered by Roboflow API for scalable detection

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- npm or pnpm or bun

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/SalimTag/firedetection.git
cd firedetection
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start development server**
```bash
npm run dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**
```
http://localhost:5173
```

## 🎮 Usage

### Web Interface

1. Navigate to the application in your browser
2. Click "Upload Image" or drag and drop an image file
3. Click "Analyze Image" to detect fire/smoke
4. View detection results with bounding boxes and confidence scores

### API Integration Examples

The application uses the Roboflow API for detection. You can integrate similar detection in your own projects:

**JavaScript/TypeScript Example:**
```typescript
async function detectFire(imageFile: File) {
  const base64Image = await convertToBase64(imageFile);
  
  const response = await fetch(
    `https://detect.roboflow.com/${MODEL_ID}?api_key=${API_KEY}`,
    {
      method: "POST",
      body: base64Image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
  
  const result = await response.json();
  return result.predictions;
}
```

**Python Example:**
```python
import requests
import base64

def detect_fire(image_path):
    with open(image_path, 'rb') as image_file:
        base64_image = base64.b64encode(image_file.read()).decode('utf-8')
    
    response = requests.post(
        f"https://detect.roboflow.com/{MODEL_ID}",
        params={"api_key": API_KEY},
        data=base64_image,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    
    return response.json()['predictions']
```

## 📁 Project Structure

```
firedetection/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── DetectionResults.tsx
│   │   ├── ImagePreview.tsx
│   │   ├── Navigation.tsx
│   │   ├── PerformanceChart.tsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   └── Index.tsx       # Main page
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── App.tsx             # App root component
│   └── main.tsx            # App entry point
├── public/                 # Static assets
├── docs/                   # Documentation and assets
├── .env.example           # Environment variables template
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎯 Model Performance

The YOLOv8 fire detection model demonstrates excellent performance:

| Metric | Value |
|--------|-------|
| Precision | 89.4% |
| Recall | 91.2% |
| mAP@0.5 | 92.3% |
| Inference Time | <100ms |
| Model Size | ~6MB |

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_ROBOFLOW_API_KEY=your_api_key_here
VITE_ROBOFLOW_MODEL=your_model_id

# Application Settings
VITE_MAX_FILE_SIZE=5242880  # 5MB in bytes
```

### Model Training

If you want to train your own fire detection model:

```python
from ultralytics import YOLO

# Load a pretrained model
model = YOLO('yolov8n.pt')

# Train the model
results = model.train(
    data='fire_dataset.yaml',
    epochs=100,
    imgsz=640,
    batch=16,
    device=0,  # Use GPU 0
    patience=50,
    save=True,
    project='fire_detection',
    name='yolov8_fire'
)

# Validate the model
metrics = model.val()

# Export for deployment
model.export(format='onnx')
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build the application
npm run build

# Preview production build
npm run preview
```

## 🐳 Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t firedetection .
docker run -p 80:80 firedetection
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload the dist/ folder to Netlify
```

### GitHub Pages

```bash
# Add to package.json
"homepage": "https://yourusername.github.io/firedetection",

# Build and deploy
npm run build
npx gh-pages -d dist
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **State Management**: React Query
- **Routing**: React Router
- **AI Model**: YOLOv8 (via Roboflow API)
- **Icons**: Lucide React
- **Charts**: Recharts

## 📚 Learn More

- [YOLOv8 Documentation](https://docs.ultralytics.com/)
- [Roboflow API Docs](https://docs.roboflow.com/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Salim Tagemouati**

- GitHub: [@SalimTag](https://github.com/SalimTag)
- Portfolio: Open to opportunities in AI/ML and Full-Stack Development

## 🙏 Acknowledgments

- YOLOv8 team at Ultralytics for the amazing object detection framework
- Roboflow for providing the detection API infrastructure
- shadcn/ui for the beautiful component library
- The open-source community for various tools and libraries

## ⚠️ Disclaimer

This fire detection system is intended for demonstration and educational purposes. For production wildfire detection systems, additional validation, testing, and integration with emergency response systems would be required.

---

<div align="center">
  <strong>Built with ❤️ by Salim Tagemouati</strong>
</div>
