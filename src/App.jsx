import { lazy, Suspense } from "react";
//React-router
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
//Components
// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import Login from "./pages/Login";
// import Form from "./components/Form";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/City/CityList";
import AppLayout from "./pages/AppLayout";
import CountriesList from "./components/Country/CountriesList";
import City from "./components/City/City";
import SpinnerFullPage from "./assets/SpinnerFullPage";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const Form = lazy(() => import("./components/Form"));

//context providers
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/product" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountriesList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}

export default App;
