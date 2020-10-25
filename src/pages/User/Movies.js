import React, { Component } from 'react'
import { getMovies } from '../../utils/Movies/MoviesAPI'
import { Link } from 'react-router-dom'
import { Layout, Breadcrumb, Typography, Space, Col, Row, Card, Rate } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

const { Content } = Layout
const { Title } = Typography
const { Meta } = Card

class Movies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataMovies: []
    }
  }

  componentDidMount() {
    getMovies()
      .then(res => this.setState({dataMovies : res.data }))
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
          <Title level={3}>List Movies</Title>
        </Space>
        <Row style={{ marginLeft: '-15px' }}>
          {
            this.state.dataMovies.map((value, index) => {
              return (
                <Col lg={{ span: 6, offset: 0 }} md={{ span: 11, offset: 1 }} sm={{ span: 14, offset: 1 }} xs={{ span: 20, offset: 2 }} key={index}>
                  <Link to={`/movies/detail/${value.id}`}>
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
                      <Meta title={value.title} description={value.year} />
                      <div style={{ marginBottom: '0', marginTop: '1em' }}><Rate value={value.rating /2} style={{ fontSize: '13px' }} />&nbsp; <small>({value.rating} / 10)</small></div>
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

export default Movies