import { DefaultLayout } from "@components/layout/DefaultLayout";
import { useAuth } from "@contexts/AuthContext";
import { AddressForm } from "@pages/AddressForm";
import { AddressList } from "@pages/AddressList";
import { Dashboard } from "@pages/Dashboard";
import { Login } from "@pages/Login";
import { OrderDetails } from "@pages/OrderDetails";
import { OrderList } from "@pages/OrderList";
import { ProductDetails } from "@pages/ProductDetails";
import { ProductList } from "@pages/ProductList";
import { Profile } from "@pages/Profile";
import { Register } from "@pages/Register";
import type React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas privadas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DefaultLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="addresses" element={<AddressList />} />
          <Route path="addresses/new" element={<AddressForm />} />
          <Route path="addresses/edit/:id" element={<AddressForm />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="orders/:id" element={<OrderDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
