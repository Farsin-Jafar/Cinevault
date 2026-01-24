import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { MovieProvider } from "./context/MovieContext";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./layout/Footer";

function App() {
  return (
    <MovieProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* Page content */}
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App;
