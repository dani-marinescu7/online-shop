import React, { useState } from "react";
import { Provider } from 'react-redux';
import store from './state/store';
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Users from "./scenes/users";
import Invoices from "./scenes/invoices";
import Items from "./scenes/items";
import AddUser from "./scenes/users/addUser";
import AddItem from "./scenes/items/addItem";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ItemList from "./scenes/ItemList";
import LoginPage from "./scenes/login";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <Provider store={store} >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<ItemList />} />
              <Route
                  path="/admin/*"
                  element={
                    <>
                      <Sidebar isSidebar={isSidebar} />
                      <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/users" element={<Users />} />
                          <Route path="/items" element={<Items />} />
                          <Route path="/invoices" element={<Invoices />} />
                          <Route path="/add-user" element={<AddUser />} />
                          <Route path="/add-item" element={<AddItem />} />
                          <Route path="/edit-user" element={<AddUser />} />
                        </Routes>
                      </main>
                    </>
                  }
              />
            </Routes>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
}

export default App;
