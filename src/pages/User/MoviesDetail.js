import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import{ getMovies } from '../../utils/Movies/MoviesAPI'
import { Layout, Col, Row, Card, Breadcrumb, Tag, Rate, Tabs, Empty, Modal } from 'antd'
import { HomeOutlined, VideoCameraOutlined, ClockCircleOutlined, TagsOutlined, CalendarOutlined } from '@ant-design/icons'

const { Content } = Layout
const { TabPane } = Tabs

function minuteToHours(num) {
  var hours = (num / 60)
  var rhours = Math.floor(hours)
  var minutes = (hours - rhours) * 60
  var rminutes = Math.round(minutes)
  return ( rhours === 0 ? "" : rhours + " Jam") + (rminutes === 0 ? "" : " " + rminutes + " Menit")
}

const MoviesDetail = () => {
  const { id } = useParams()
  const history = useHistory()
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    year: 2020,
    duration: 120,
    genre: "",
    rating: 0,
    image_url: "",
  })
  
  const alertError = params => {
    Modal.error({
      title: 'Something went wrong',
      content: `${params}`
    })
  }

  useEffect(() => {
    if (id) {
      getMovies(id)
        .then(res => {
          res.data.rating = res.data.rating / 2
          res.data.duration = minuteToHours(res.data.duration)
          setMovie(res.data)
        })
        .catch(error => {
          alertError(error)
          setTimeout(() => {
            history.push('/movies')
          }, 3000)
        })
    }
  },[id, history])

  return (
    <Content className="content-front">
      <Breadcrumb style={{ marginBottom: '10px' }}>
        <Breadcrumb.Item>
          <Link to='/'>
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to='/movies'>
            <VideoCameraOutlined />
            <span> Movies</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{movie.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col className='gutter-row' span={24}>
          <Card
            style={{ width: '100%' }}
          >
            <div 
              className='card-header' 
              style={{ 
                background: `linear-gradient(25deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 1)), url(${movie.image_url})`, 
                height: '50vh', 
                margin: '-24px', 
                borderRadius: '5px' }} >
              <div className='card-about'>
                <div className='media-left'>
                  <img src={movie.image_url} alt='' />
                </div>
                <div className='media-right'>
                  <h1>{movie.title}</h1>
                  <div><Rate value={movie.rating} style={{ fontSize: '18px' }} disabled />&nbsp; ({movie.rating} / 10)</div>
                  <div><Tag color="orange" icon={<ClockCircleOutlined />}>{movie.duration}</Tag></div>
                  <div><Tag color="orange" icon={<TagsOutlined />}>{movie.genre}</Tag></div>
                  <div><Tag color="orange" icon={<CalendarOutlined />}>Release {movie.year}</Tag></div>
                </div>
              </div>
            </div>
          </Card>
          <Card style={{ width: '100%' }}>
            <Tabs defaultActiveKey='1'>
              <TabPane tab='Description' key='1'>
                <div>{movie.description}</div>
              </TabPane>
              <TabPane tab='Review' key='2'>
                {
                  movie.review !== null ?
                  movie.review
                  : <Empty />
                }
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </Content>
  )
}

export default MoviesDetail