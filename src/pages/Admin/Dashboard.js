import React, { useState, useEffect } from 'react'
import { getMovies } from '../../utils/Movies/MoviesAPI'
import { getGames } from '../../utils/Games/GamesAPI'
import { Row, Col, Card } from 'antd'
import { VideoCameraTwoTone, PlayCircleTwoTone, StarTwoTone } from '@ant-design/icons'
import banner from '../../assets/img/banner.svg'
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
const { Meta } = Card

const Dashboard = () => {
  const [tMovies, setTotalMovies] = useState(null)
  const [tRating, setTotalRating] = useState(null)
  const [tGames, setTotalGames] = useState(null)

  useEffect(() => {
    getMovies()
      .then(res => {
        setTotalMovies(res.data.length)
        let a = res.data.map((a, b) => {
          return a.rating
        })
        setTotalRating(a.reduce((c, d) => c + d, 0))
      })
    getGames()
      .then(res => {
        setTotalGames(res.data.length)
      })
  }, [])

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col className="gutter-row" span={8}>
          <Card>
            <Meta
              avatar={<VideoCameraTwoTone style={{ fontSize: '48px' }} />}
              title={tMovies}
              description="Total data movies"
            />
          </Card>
        </Col>
        <Col className="gutter-row" span={8}>
          <Card>
            <Meta
              avatar={<PlayCircleTwoTone style={{ fontSize: '48px' }} />}
              title={tGames}
              description="Total data games"
            />
          </Card>
        </Col>
        <Col className="gutter-row" span={8}>
          <Card>
            <Meta
              avatar={<StarTwoTone style={{ fontSize: '48px' }} />}
              title={tRating}
              description="Total rating movies"
            />
          </Card>
        </Col>
        <Col span={24} style={{ marginTop: '30px' }}>
          <div className="carousel-content">
            <div style={contentStyle}>
                <img src={banner} style={imgBanner} alt=""/>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard