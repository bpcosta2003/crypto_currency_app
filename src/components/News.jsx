import React, {useEffect, useState} from "react";
import {Select, Typography, Row, Col, Avatar, Card} from "antd";
import moment from "moment";

import {useGetCryptoNewsQuery} from "../services/cryptoNewsApi";
import {useGetCryptosQuery} from "../services/cryptoApi";
import Loader from "./Loader";

const {Text, Title} = Typography;
const {Option} = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({simplified}) => {
  const [screenSize, setScreenSize] = useState(null);
  const [fullScreen, setFullScreen] = useState(true);

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
      setFullScreen(false);
    } else {
      setFullScreen(true);
    }
  }, [screenSize]);

  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const {data: cryptoNews} = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const {data} = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Loader />; // caso não tenha dados retorna 'Loading...'

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(
              input,
              option // filtrando entre o 'option', para somente mostrar o que está selecionado
            ) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card
            hoverable
            className="news-card"
            style={{
              backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.7) 10%,rgba(0,0,0,0.8) 30%,rgba(0,0,0,0.9) 60%), url(${
                news?.image?.thumbnail?.contentUrl || demoImage
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                {fullScreen === true ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Title className="news-title" level={4}>
                        {news.name}
                      </Title>
                      <img
                        className="news-image"
                        style={{
                          margin: "30px",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                        src={news?.image?.thumbnail?.contentUrl || demoImage}
                        alt="news"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <Title className="news-title" level={4}>
                      {news.name}
                    </Title>
                    <img
                      className="news-image-full"
                      src={news?.image?.thumbnail?.contentUrl || demoImage}
                      alt="news"
                    />
                  </>
                )}
              </div>
              <p className="news-paragraph">
                {news.description < 100
                  ? `${news.description.substring(0, 100)}  . . .`
                  : `${news.description}`}
              </p>
              <div className="provider-container">
                <div className="provider-container-box">
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text className="provider-name">
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
