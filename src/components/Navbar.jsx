import React, {useState, useEffect} from "react";
import {Button, Menu, Typography, Avatar} from "antd";
import {Link} from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth); // pegar a largura da tela
    };

    window.addEventListener("resize", handleResize); // toda vez que ocorrer um 'resize' no window, vai chamar a função 'handleResize'

    handleResize();

    return () => window.removeEventListener("resize", handleResize); // desfazer o 'resize'
  }, []);

  useEffect(() => {
    // toda vez que o screenSize mudar vai chamar esse useEffect

    if (screenSize < 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <div className="logo-container-box">
          <Avatar src={icon} size="large" />
          <Typography.Title level={2} className="logo">
            <Link to="/">CryptoVerse</Link>
          </Typography.Title>
          <Button
            className="menu-control-container"
            onClick={() => setActiveMenu(!activeMenu)}
          >
            <MenuOutlined />
          </Button>
        </div>

        {activeMenu && (
          <div className="menu-navbar">
            <Menu theme="dark">
              <Menu.Item icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item icon={<FundOutlined />}>
                <Link to="/cryptocurrencies">Cryptocurrencies</Link>
              </Menu.Item>
              <Menu.Item icon={<MoneyCollectOutlined />}>
                <Link to="/exchanges">Excahnges</Link>
              </Menu.Item>
              <Menu.Item icon={<BulbOutlined />}>
                <Link to="/news">News</Link>
              </Menu.Item>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
