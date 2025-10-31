import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../header/Header";
import Main from "../main/Main";
import Profile from "../profile/Profile";
import Footer from "../footer/Footer";
import AddItemModal from "../add-item-modal/AddItemModal";
import ItemModal from "../item-modal/ItemModal";
import DeleteConfirmationModal from "../delete-confirmation-modal/DeleteConfirmationModal";
import { getWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { getItemId } from "../../utils/itemUtils";
import styles from "./App.module.css";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleOpenAddItemModal = () => setActiveModal("add-garment");
  const handleCloseModal = () => setActiveModal("");
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = (values, resetForm) => {
    addItem(values)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        handleCloseModal();
        resetForm();
      })
      .catch((error) => {
        console.error("Failed to add item:", error);
      });
  };

  const handleOpenDeleteConfirmation = (card) => {
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  };

  const handleConfirmDelete = () => {
    if (cardToDelete) {
      const itemId = getItemId(cardToDelete);
      deleteItem(itemId)
        .then(() => {
          setClothingItems((prevItems) => 
            prevItems.filter((item) => getItemId(item) !== itemId)
          );
          setCardToDelete(null);
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Failed to delete item:", error);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [weather, items] = await Promise.all([
          getWeatherData(),
          getItems(),
        ]);
        setWeatherData(weather);
        setClothingItems(items);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Set fallback weather data
        setWeatherData({
          temperature: {
            F: 75,
            C: 24,
          },
          location: "New York",
          weather: "warm",
          condition: "clear",
          isDay: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <BrowserRouter
          basename="/se_project_react"
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Header
            onAddItemClick={handleOpenAddItemModal}
            weatherData={weatherData}
          />
          <Routes>
            <Route 
              path="/" 
              element={
                isLoading ? (
                  <div className={styles.loading}>Loading weather data...</div>
                ) : (
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                  />
                )
              } 
            />
            <Route 
              path="/profile" 
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onAddItemClick={handleOpenAddItemModal}
                />
              } 
            />
          </Routes>
          <Footer />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
            onCloseModal={handleCloseModal}
          />

          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "preview"}
            onClose={handleCloseModal}
            onDeleteItem={handleOpenDeleteConfirmation}
          />

          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
            onClose={handleCloseModal}
            onConfirmDelete={handleConfirmDelete}
            itemName={cardToDelete?.name}
          />
        </BrowserRouter>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
