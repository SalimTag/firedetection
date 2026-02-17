# Fire Detection System - Architecture

## System Overview

The Fire Detection System is a web-based application that leverages artificial intelligence to detect fire and smoke in images. The system uses YOLOv8 object detection model deployed via Roboflow API.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interface                          │
│                  (React + TypeScript)                        │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Image       │  │  Detection   │  │  Results     │      │
│  │  Upload      │→ │  Processing  │→ │  Display     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTPS
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   Roboflow API                               │
│                  (Cloud Infrastructure)                      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Image       │  │  YOLOv8      │  │  Post-       │      │
│  │  Preprocessing│→│  Inference   │→ │  Processing  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   Detection Results                          │
│                                                               │
│  • Bounding Boxes                                            │
│  • Confidence Scores                                         │
│  • Classification Labels                                     │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Components

```
src/
├── components/
│   ├── ImagePreview.tsx        # Image display with bounding boxes
│   ├── DetectionResults.tsx    # Results table and visualization
│   ├── Navigation.tsx          # Top navigation bar
│   ├── PerformanceChart.tsx    # Model performance metrics
│   ├── FAQ.tsx                 # Frequently asked questions
│   └── ui/                     # shadcn/ui component library
├── pages/
│   └── Index.tsx               # Main landing page
├── hooks/
│   └── use-toast.ts            # Toast notification hook
└── lib/
    └── utils.ts                # Utility functions
```

## Data Flow

### 1. Image Upload
```typescript
User selects image → File validation → Convert to base64 → Store in state
```

### 2. Detection Process
```typescript
base64 image → POST to Roboflow API → YOLOv8 inference → Return predictions
```

### 3. Result Display
```typescript
Predictions → Parse bounding boxes → Overlay on image → Display confidence scores
```

## Key Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 | UI framework |
| Build Tool | Vite | Fast development and building |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Utility-first CSS |
| UI Library | shadcn/ui | Pre-built components |
| State | React Hooks | Local state management |
| AI Model | YOLOv8 | Object detection |
| API | Roboflow | Model hosting and inference |

## API Integration

### Roboflow Detection API

**Endpoint:** `https://detect.roboflow.com/{model_id}`

**Request:**
```javascript
POST /fire-detection-g9ebb/8?api_key=xxx
Content-Type: application/x-www-form-urlencoded

<base64_image_data>
```

**Response:**
```json
{
  "predictions": [
    {
      "x": 320,
      "y": 240,
      "width": 100,
      "height": 80,
      "confidence": 0.87,
      "class": "fire"
    }
  ],
  "image": {
    "width": 640,
    "height": 480
  }
}
```

## Performance Considerations

### Optimization Strategies

1. **Image Compression**: Resize large images before sending to API
2. **Lazy Loading**: Components load only when needed
3. **Caching**: Results cached in component state
4. **Error Handling**: Graceful degradation on API failures

### Performance Metrics

- **Image Upload**: ~50ms (client-side)
- **API Request**: ~200-500ms (network + inference)
- **Result Rendering**: ~50ms (client-side)
- **Total Time**: <1 second for typical images

## Security Considerations

1. **API Key Management**: Keys should be stored in environment variables
2. **File Validation**: Client-side validation for file type and size
3. **HTTPS**: All API communication over secure connections
4. **Input Sanitization**: Validate all user inputs

## Future Enhancements

1. **Real-time Video Detection**: Process video streams frame-by-frame
2. **Alert System**: Email/SMS notifications for fire detection
3. **Historical Analysis**: Store and analyze detection history
4. **Multi-camera Support**: Monitor multiple camera feeds
5. **Mobile App**: Native iOS/Android applications
6. **Edge Deployment**: On-device inference for offline scenarios

## Deployment Architecture

### Production Deployment

```
┌─────────────────┐
│   CDN/Edge      │
│   (Vercel/      │
│    Netlify)     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐     ┌──────────────┐
│   Static Files  │     │  Roboflow    │
│   (React App)   │────→│  API         │
└─────────────────┘     └──────────────┘
```

### Environment Setup

1. **Development**: Local Vite server with hot reload
2. **Staging**: Preview deployments on pull requests
3. **Production**: Optimized build served from CDN

## Monitoring and Analytics

### Metrics to Track

- API response times
- Detection accuracy
- User engagement
- Error rates
- Image processing times

### Tools

- Browser DevTools for performance profiling
- Roboflow Dashboard for API usage
- Google Analytics for user tracking (optional)

---

**Last Updated**: February 2025  
**Author**: Salim Tagemouati
