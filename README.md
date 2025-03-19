# 🌱 CropAdvisor

CropAdvisor is a smart farming solution that provides personalized crop recommendations for **LATAM** based on location, planting date, and soil conditions. The application combines a modern Next.js frontend with a powerful Python Flask backend to deliver accurate crop suggestions and detailed growing information.


## 🎥 Video Demo
https://github.com/user-attachments/assets/0d72a803-20ba-4f08-bec8-b9fa4862a5fc



## ✨ Features

- 🌿 **Personalized Crop Recommendations**: Get tailored crop suggestions based on your specific location and planting conditions
- 🌤️ **Weather Analysis**: Access detailed weather forecasts to plan your planting schedule effectively
- 🧪 **Soil Analysis**: Understand your soil conditions and optimize your growing environment
- 🍅 **Crop Details**: View comprehensive information about each crop, including growth period, water needs, and nutrient requirements
- 📚 **Growing Guides**: Access detailed guides on how to grow each crop successfully
- ⚠️ **Common Problems**: Learn about potential issues you might encounter and how to solve them
- 🍲 **Culinary Uses**: Discover nutritional information and culinary applications for each crop


## 🛠️ Technologies Used

### 🖥️ Frontend

- **⚛️ Next.js 15**: React framework with App Router for server-side rendering and routing
- **🎨 Tailwind CSS**: Utility-first CSS framework for styling
- **🧩 shadcn/ui**: High-quality UI components built with Radix UI and Tailwind
- **🔍 Lucide React**: Beautiful, consistent icons
- **📊 React Query**: Data fetching and state management


### ⚙️ Backend

- **🐍 Flask**: Lightweight Python web framework
- **🔄 Flask-CORS**: Cross-Origin Resource Sharing support
- **🐼 Pandas**: Data manipulation and analysis
- **📈 Matplotlib**: Data visualization
- **☁️ OpenMeteo API**: Weather data retrieval
- **🧠 Scikit-learn**: Machine learning for crop predictions
- **🤖 Azure OpenAI**: Text generation for crop information


## 📂 Project Structure

```plaintext
crop-advisor/
├── app/                      # Next.js frontend
│   ├── components/           # Reusable UI components
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout component
│   ├── page.jsx              # Home page
│   ├── results/              # Results page
│   └── crop/[id]/            # Crop details page
├── public/                   # Static assets
│   └── patterns/             # Background patterns and textures
├── backend/                  # Python Flask backend
│   ├── app.py                # Main Flask application
│   ├── predictions.py        # Crop prediction logic
│   ├── climate_requests.py   # Weather data retrieval
│   ├── crop_requests.py      # Crop data retrieval
│   ├── location_requests.py  # Location data retrieval
│   ├── text_requests.py      # Text generation with Azure OpenAI
│   └── main_data.csv         # Crop database
├── tailwind.config.ts        # Tailwind configuration
└── README.md                 # Project documentation
```

## 🚀 Setup Instructions

### 🖥️ Frontend Setup

1. Clone the repository:

```shellscript
git clone https://github.com/yourusername/crop-advisor.git
cd crop-advisor
```


2. Install dependencies:

```shellscript
npm install
```


3. Start the development server:

```shellscript
npm run dev
```


4. Open [http://localhost:3000](http://localhost:3000) in your browser


### ⚙️ Backend Setup

1. Navigate to the backend directory:

```shellscript
cd backend
```

2. Start the Flask server:

```shellscript
python app.py
```


3. The API will be available at [http://localhost:5000](http://localhost:5000)


## 📡 API Documentation

### Endpoints

#### 🌱 `/predict` (POST)

Get crop recommendations based on location and soil parameters.

**Request Body:**

```json
{
  "latitude": 26.244159,
  "longitude": -98.245178,
  "date": "2024-03-15",
  "soil_type": "Franco",
  "temperature": 25,
  "humidity": 60,
  "moisture": 40,
  "nitrogen": 80,
  "potassium": 40,
  "phosphorus": 60,
  "city": "San Francisco"
}
```

**Response:**

```json
{
  "predictions": [
    {
      "Crop Type": "Tomatoes",
      "Growth Period": "60-80",
      "Water Needs": "Medium",
      "Description": "Thrives in warm weather with well-drained soil.",
      "Image Link": "https://example.com/tomato.jpg",
      "Quality": "Excellent",
      "Score": 0.8
    },
    ...
  ],
  "weather_data": {
    "temperature": "25.0",
    "humidity": "60.0",
    "moisture": "40.0",
    "precipitation": 2.5,
    "soil_type": "Franco",
    "nitrogen": 80,
    "potassium": 40,
    "phosphorus": 60,
    "city": "San Francisco (lat: 26.2442, lon: -98.2452)"
  }
}
```

#### 🍅 `/crop` (POST)

Get detailed information about a specific crop.

**Request Body:**

```json
{
  "crop": "Tomatoes"
}
```

**Response:**

```json
{
  "Crop Type": "Tomatoes",
  "Scientific Name": "Solanum lycopersicum",
  "Description": "Tomatoes are warm-season plants that thrive in well-drained soil with consistent moisture.",
  "Growth Period": "60-80",
  "Water Needs": "Medium",
  "Soil Type": "Well-drained, slightly acidic soil (pH 6.0-6.8)",
  "Temparature": 25,
  "Humidity": 60,
  "Moisture": 40,
  "Nitrogen": 80,
  "Potassium": 40,
  "Phosphorous": 60,
  "Image Link": "https://example.com/tomato.jpg"
}
```

#### 📝 `/text` (POST)

Get AI-generated text about a crop for a specific category.

**Request Body:**

```json
{
  "crop": "Tomatoes",
  "category": 1
}
```

**Response:**

```json
{
  "text": "Tomatoes thrive in full sun and well-drained soil with a pH between 6.0 and 6.8. Plant seedlings after the last frost when soil temperatures reach at least 60°F. Space plants 18-36 inches apart and provide support with cages or stakes for indeterminate varieties. Water deeply and consistently, about 1-2 inches per week, and mulch to retain moisture and prevent soil-borne diseases."
}
```

## 🎨 Design

CropAdvisor features a minimalistic, agriculture-inspired aesthetic with:

- 🎭 **Natural Color Palette**: Earthy greens, browns, and wheat tones that evoke agricultural landscapes
- 🔤 **Modern Typography**: Fraunces for headings (a serif font that evokes agricultural tradition) and Geist Sans for body text (a clean, modern sans-serif)
- 🌾 **Subtle Textures**: Field-inspired background patterns and soil textures that provide depth without overwhelming the content
- 🌿 **Agricultural Icons**: Plant-themed icons that reinforce the farming focus
- 📱 **Responsive Design**: Fully responsive layout that works on all device sizes


## 👥 Contributors

- 👨‍💻 [Chengjie Peng Lin](https://www.linkedin.com/in/chengjie-peng/)
- 👨‍💻 [Pau Domínguez Ruiz](https://www.linkedin.com/in/pau-dominguez-ruiz/)
- 👨‍💻 [Gerard Souto Eslava](https://www.linkedin.com/in/gerardsouto/)
- 👨‍💻 [Pau Romaguera Palomé](https://www.linkedin.com/in/pauromaguera/)



## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- 🌤️ [Open-Meteo](https://open-meteo.com/) for weather data
- 🗺️ [OpenStreetMap](https://www.openstreetmap.org/) for location data
- 🤖 [Azure OpenAI](https://azure.microsoft.com/en-us/services/cognitive-services/openai-service/) for text generation
- 🧩 [shadcn/ui](https://ui.shadcn.com/) for UI components
- 🔍 [Lucide](https://lucide.dev/) for icons


## 🌟 Getting Started

Ready to optimize your farming with data-driven recommendations? Follow these steps:

1. 🚀 Set up the frontend and backend as described above
2. 📝 Enter your location and planting date
3. 🔍 Explore the personalized crop recommendations
4. 🌱 Dive into detailed information about each crop
5. 🌿 Start growing with confidence!

---

Happy Farming! 🌱👨‍🌾👩‍🌾
