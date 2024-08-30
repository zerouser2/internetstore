import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MixComponent from "./components/MixComponent";
import Sign from "./components/LoginAndRegister/Sign";
import ProductDetail from "./components/main/products/ProductDetail";
import Header from "./components/header/Header";
import ProfilePage from "./components/header/profilePage/ProfilePage";
import Basket from "./components/header/basket/Basket";
import EditProfile from "./components/header/profilePage/EditProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MixComponent />} />
          <Route path="sign" element={<Sign />} />
          <Route path="product/:id" element={
            <>
              <Header />
              <ProductDetail />
            </>
          } />
          <Route path="profile/:name" element={
            <>
              <Header />
              <ProfilePage />
            </>
          } />
          <Route path="basket" element={
            <>
              <Header />
              <Basket />
            </>
          } />
          <Route path="settings" element={
            <>
              <Header />
              <EditProfile />
            </>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;