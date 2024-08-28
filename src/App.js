import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MixComponent from "./components/MixComponent";
import Sign from "./components/LoginAndRegister/Sign";
import ProductDetail from "./components/main/products/ProductDetail";
import Header from "./components/header/Header";
import ProfilePage from "./components/header/profilePage/ProfilePage";
import Basket from "./components/header/basket/Basket";
import EditProfile from "./components/header/profilePage/EditProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MixComponent />, // Главная страница
    },
    {
      path: "sign",
      element: <Sign />, // Страница входа
    },
    {
      path: "product/:id",
      element: (
        <>
          <Header />
          <ProductDetail />
        </>
      ), // Страница товара
    },
    {
      path: "profile/:name",
      element: (
        <>
          <Header />
          <ProfilePage />
        </>
      )
    },
    {
      path: "basket",
      element: (
        <>
          <Header />
          <Basket />
        </>
      ),
    },
    {
      path: "settings",
      element: (
        <>
          <Header />
          <EditProfile />
        </>
      ),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;