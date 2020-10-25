import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getGames } from '../../utils/Games/GamesAPI'
import { Layout, Breadcrumb, Typography, Space, Col, Row, Card } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

const { Content } = Layout
const { Title } = Typography
const { Meta } = Card

class Games extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataGames: []
    }
  }

  componentDidMount() {
    getGames()
      .then(res => this.setState({dataGames : res.data}))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Content className="content-front" style={{ minHeight: '100vh' }}>
        <Breadcrumb style={{ marginBottom: '10px' }}>
          <Breadcrumb.Item>
            <Link to='/'>
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Movies</Breadcrumb.Item>
        </Breadcrumb>
        <Space direction="horizontal">
          <Title level={3}>List Games</Title>
        </Space>
        <Row style={{ marginLeft: '-15px' }}>
          {
            this.state.dataGames.map((value, index) => {
              return (
                <Col lg={{ span: 6, offset: 0 }} md={{ span: 11, offset: 1 }} sm={{ span: 14, offset: 1 }} xs={{ span: 20, offset: 2 }} key={index}>
                  <Link to={`/games/detail/${value.id}`}>
                    <Card
                      hoverable
                      style={{ width: 'auto', marginBottom: '20px' }}
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
        </Row>
      </Content>
    );
  }
}

export default Games