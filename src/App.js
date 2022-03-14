import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import {Layout, Typography, Space} from "antd";

import {
  Navbar,
  Homepage,
  Exchanges,
  Cryptocurrencies,
  CryptoDetails,
  News,
} from "./components";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            {/* Routes vai nos permitir ter muitas rotas */}
            <Routes>
              {/* 'exact path' significa que vai acionar se for exatamente na URL passada*/}
              <Route exact path="/" element={<Homepage />}></Route>
              <Route exact path="/exchanges" element={<Exchanges />}></Route>
              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              ></Route>
              {/* ':' significa que o valor coinId vai ser dinâmico */}
              <Route
                exact
                path="/crypto/:coinId"
                element={<CryptoDetails />}
              ></Route>
              <Route exact path="/news" element={<News />}></Route>
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "100",
            }}
          >
            @ CryptoVerse. All rights reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
