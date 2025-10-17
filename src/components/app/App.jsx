import { useState, useEffect } from "react";
import Header from "../header/Header";
import Main from "../main/Main";
import Footer from "../footer/Footer";
import ModalWithForm from "../modal-with-form/ModalWithForm";
import ItemModal from "../item-modal/ItemModal";
import { getWeatherData } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/clothingItems";
import styles from "./App.module.css";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenAddItemModal = () => setActiveModal("add-garment");
  const handleCloseModal = () => setActiveModal("");
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItemSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newItem = {
      _id: Date.now().toString(), // Simple ID generation
      name: formData.get("name"),
      weather: formData.get("weather"),
      link: formData.get("imageUrl"),
    };

    setClothingItems((prevItems) => [...prevItems, newItem]);
    handleCloseModal();
    event.target.reset(); // Clear the form
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoading(true);
        const weather = await getWeatherData();
        setWeatherData(weather);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        // Set fallback weather data
        setWeatherData({
          temperature: 75,
          location: "New York",
          weather: "warm",
          condition: "clear",
          isDay: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeatherData();
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") handleCloseModal();
    };

    if (activeModal) {
      document.addEventListener("keydown", handleEscKey);
      return () => document.removeEventListener("keydown", handleEscKey);
    }
  }, [activeModal]);

  return (
    <div className={styles.app}>
      <Header
        onAddItemClick={handleOpenAddItemModal}
        weatherData={weatherData}
      />
      {isLoading ? (
        <div className={styles.loading}>Loading weather data...</div>
      ) : (
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          onCardClick={handleCardClick}
        />
      )}
      <Footer />

      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        name="add-garment"
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
        onSubmit={handleAddItemSubmit}
      />

      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
