# Fire Detection System

This project implements an advanced fire detection system using YOLOv8 for real-time fire detection. It includes training, testing, and deployment scripts, as well as a FastAPI-based inference API.

## Overview

The system consists of three main components:
1. Dataset augmentation and preparation
2. YOLOv8 model training and fine-tuning
3. FastAPI deployment backend

## Features

- Train and test YOLOv8 on a custom fire dataset
- Deploy a FastAPI app for real-time fire detection
- Real-time image processing and detection
- Comprehensive dataset augmentation pipeline
- Production-ready API endpoints
- Interactive web interface for testing

## Project Components

### Dataset Augmentation
The dataset preparation code is available at: [Fire-Detection Repository](https://github.com/SalimTag/Fire-Detection.git)

This repository contains:
- Data augmentation scripts
- Dataset preprocessing tools
- Training data organization utilities

### Model Training
YOLOv8 training and fine-tuning documentation: [YOLOv8 Documentation](https://ultralytics.com/yolov8)

Key training features:
- Custom dataset integration
- Model fine-tuning parameters
- Training configuration files
- Validation scripts

### Backend Deployment
Backend implementation code: [Fire-Detection-backend Repository](https://github.com/SalimTag/Fire-Detection-backend)

Features:
- FastAPI server implementation
- Real-time inference endpoints
- Image processing pipeline
- API documentation

## Setup

1. Clone the repository:
```bash
git clone https://github.com/SalimTag/Fire-Detection.git
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up the backend:
```bash
git clone https://github.com/SalimTag/Fire-Detection-backend.git
cd Fire-Detection-backend
pip install -r requirements.txt
```

## Model Training

1. Prepare your dataset following the YOLOv8 format
2. Configure training parameters in `config.yaml`
3. Run training:
```bash
python train.py --data config.yaml --epochs 100
```

## Deployment

1. Start the FastAPI backend:
```bash
cd Fire-Detection-backend
uvicorn main:app --reload
```

2. The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- API documentation: `http://localhost:8000/docs`
- Alternative documentation: `http://localhost:8000/redoc`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- YOLOv8 team for the amazing object detection framework
- FastAPI for the modern web framework
- The open-source community for various tools and libraries used in this project

## Contact

Your Name - [@YourTwitter](https://twitter.com/YourTwitter)

Project Links:
- Main Repository: [https://github.com/SalimTag/Fire-Detection](https://github.com/SalimTag/Fire-Detection)
- Backend Repository: [https://github.com/SalimTag/Fire-Detection-backend](https://github.com/SalimTag/Fire-Detection-backend)