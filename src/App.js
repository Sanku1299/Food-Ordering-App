import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Header from "./components/Header";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import {Provider} from 'react-redux';
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import { Toaster } from "react-hot-toast";

const Grocery = lazy(() => import("./components/Grocery"));

const App = () => {
  const [userName, setUserName] = useState();

  useEffect(()=>{
    const data = {
      name: "Sankalp",
    }
    setUserName(data.name);
  },[]);
  
  return (
    <Provider store={appStore}>
    <UserContext.Provider value={{loggedInUser: userName, setUserName}}>
    <div className="app">
    <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={30}
              containerClassName="notification-container"
              toastOptions={{
                className: "notification-toast",
                duration: 1500,
              }}
            />
      <Header />
      <Outlet />
    </div>
    </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/grocery",
        element: <Suspense><Grocery /></Suspense>,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement:<Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);