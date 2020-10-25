import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getMovies } from '../../utils/Movies/MoviesAPI'
import { getGames } from '../../utils/Games/GamesAPI'
import { Layout, Carousel, Typography, Space, Divider, Col, Row, Card, Rate } from 'antd'
import banner from '../../assets/img/banner.svg'
import banner2 from '../../assets/img/banner2.svg'
const { Content } = Layout
const { Title } = Typography
const { Meta } = Card
const contentStyle = {
  height: '320px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  borderRadius: '5px'
}
const imgBanner = {
  backgroundSize: 'cover',
  width: '100%',
  borderRadius: '5px'
}


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataGames: [],
      dataMovies: []
    }
  }
  
  componentDidMount() {
    getGames()
      .then(res => this.setState({dataGames : res.data}))
      .catch(error => alert(error))

    getMovies()
      .then(res => this.setState({dataMovies : res.data }))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Content className="content-front">
        <div className="carousel-content">
          <Carousel autoplay effect="fade">
            <div style={contentStyle}>
                <img src={banner} style={imgBanner} alt=""/>
            </div>
            <div style={contentStyle}>
                <img src={banner2} style={imgBanner} alt=""/>
            </div>
          </Carousel>
        </div>
        <Divider />
        <Space direction="horizontal">
          <Title level={3}>Popular Games on Gamoov</Title>
        </Space>
        <Row span={24} style={{ marginLeft: '-15px' }}>
          <div className='con-cards'>
          {
            this.state.dataGames.map((value, index) => {
              return (
              <Col className='gutter-row' lg={{ span: 6 }} md={{ span: 10 }} sm={{ span: 14 }} xs={{ span: 20 }} key={index}>
                <Link to={`/games/detail/${value.id}`}>
                  <Card
                    hoverable
                    style={{ width: 'auto' }}
                    className='card-item'
                    cover={
                      <img
                        alt="example"
                        src={value.image_url}
                      />
                    }
                  >
                    <Meta title={value.name} description={value.release} />
                  </Card>
                </Link>
              </Col>
              )
            })
          }
          </div>
        </Row>
        <Divider />
        <Space direction="horizontal">
          <Title level={3}>Popular Movies on Gamoov</Title>
        </Space>
        <Row span={24} style={{ marginLeft: '-15px' }}>
          <div className='con-cards'>
          {
            this.state.dataMovies.map((value, index) => {
              return (
              <Col className='gutter-row' lg={{ span: 6 }} md={{ span: 10 }} sm={{ span: 14 }} xs={{ span: 20 }} key={index}>
                <Link to={`/movies/detail/${value.id}`}>
                  <Card
                    hoverable
                    style={{ width: 'auto' }}
                    className='card-item'
                    cover={
                      <img
                        alt="example"
                        src={value.image_url}
                      />
                    }
                  >
                    <Meta title={value.title} description={value.year} />
                    <div style={{ marginBottom: '0', marginTop: '1em' }}><Rate value={value.rating /2} style={{ fontSize: '13px' }} />&nbsp; <small>({value.rating} / 10)</small></div>
                  </Card>
                </Link>
              </Col>
              )
            })
          }
          </div>
        </Row>
      </Content>
    );
  }
}

export default Home