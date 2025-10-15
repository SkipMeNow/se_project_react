# WTWR (What To Wear)

## Project Description

WTWR is a React-based weather application that helps users decide what to wear based on current weather conditions. The application fetches real-time weather data and displays appropriate clothing suggestions based on the temperature.

## Functionality

- **Weather Integration**: Displays current weather data including temperature, location, and weather conditions
- **Dynamic Clothing Suggestions**: Shows clothing items filtered by weather type (hot, warm, cold)
- **Add New Garments**: Users can add new clothing items through a modal form with validation
- **Item Details**: Click on any clothing item to view it in a detailed modal
- **Responsive Design**: Fully responsive layout with mobile hamburger menu
- **Temperature-based Filtering**: Clothing items are automatically filtered based on current temperature

## Technologies and Techniques Used

- **React 18.3.1**: Functional components with hooks (useState, useEffect)
- **Vite 5.4.20**: Fast development server and build tool
- **CSS Modules**: Scoped styling approach for component isolation
- **Weather API**: Real-time weather data integration using WeatherAPI.com (Note: TripleTen originally suggested OpenWeatherMap, but WeatherAPI.com was used due to account creation issues)
- **JavaScript ES6+**: Modern JavaScript features including async/await, destructuring, and arrow functions
- **Responsive Design**: CSS Grid, Flexbox, and media queries for mobile-first design
- **Form Validation**: Client-side validation with error states and user feedback
- **Component Architecture**: Modular component structure for maintainability

## Project Structure

```
src/
├── components/
│   ├── app/
│   ├── footer/
│   ├── header/
│   ├── item-card/
│   ├── item-modal/
│   ├── main/
│   ├── modal-with-form/
│   └── weather-card/
├── utils/
│   ├── clothingItems.js
│   ├── constants.js
│   ├── weatherApi.js
│   └── weatherBackgrounds.js
├── vendor/
│   ├── fonts/
│   ├── fonts.css
│   └── normalize.css
├── assets/
└── index.css
```

## Installation and Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## API Integration

The application uses WeatherAPI.com for real-time weather data. The API provides:

- Current temperature in Fahrenheit
- Location information
- Weather conditions and day/night status
- Automatic fallback to mock data if API is unavailable
