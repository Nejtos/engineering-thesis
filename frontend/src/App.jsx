import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import Starter from "./pages/starter/Starter";
import Menu from "./pages/menu/Menu";
import OrdersPage from "./pages/orders/OrdersPage";
import StaffPage from "./pages/staff/StaffPage";
import DeliveryPage from "./pages/deliveries/DeliveryPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import CalendarPage from "./pages/calendar/CalendarPage";
import UserOrderPanel from "./pages/order-panel/UserOrderPanel";
import { CartContextProvider } from "./context/CartContextProvider";
import Cart from "./pages/order-panel/components/Cart";
import { useEffect, useState } from "react";
import axios from "axios";
import SettingsPage from "./pages/settings/SettingsPage";
import Cookies from "js-cookie";
import PrivateRoutes from "./pages/PrivateRoutes";
import { UserContextProvider } from "./context/UserContextProvider";

function App() {

  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <Cart />
          <Routes>
            <Route path="" element={<Starter />} />
            <Route path="/order-panel" element={<UserOrderPanel />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/home"
              element={<PrivateRoutes component={<Home />} />}
            />
            <Route
              path="/menu"
              element={<PrivateRoutes component={<Menu />} />}
            />
            <Route
              path="/orders"
              element={<PrivateRoutes component={<OrdersPage />} />}
            />
            <Route
              path="/staff"
              element={<PrivateRoutes component={<StaffPage />} />}
            />
            <Route
              path="/delivery"
              element={<PrivateRoutes component={<DeliveryPage />} />}
            />
            <Route
              path="/analytics"
              element={<PrivateRoutes component={<AnalyticsPage />} />}
            />
            <Route
              path="/calendar"
              element={<PrivateRoutes component={<CalendarPage />} />}
            />
            <Route
              path="/settings"
              element={<PrivateRoutes component={<SettingsPage />} />}
            />
          </Routes>
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
