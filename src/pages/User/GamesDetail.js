import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { getGames } from '../../utils/Games/GamesAPI'
import { Breadcrumb, Layout, Row, Col, Tag, Card, Tabs, Modal } from 'antd'
import { HomeOutlined, UserOutlined, PlayCircleOutlined, UsergroupAddOutlined, TagsOutlined } from '@ant-design/icons'

const { Content } = Layout
const { TabPane } = Tabs

const GamesDetail = () => {
  const { id } = useParams()
  const history = useHistory()
  const [game, setGame] = useState({
    name: '',
    genre: '',
    platform: '',
    release: '',
    singlePlayer: 0,
    multiplayer: 0,
    image_url: '',
  })
  
  const alertError = params => {
    Modal.error({
      title: 'Something went wrong',
      content: `${params}`
    })
  }

  useEffect(() => {
    if (id) {
      getGames(id)
        .then(res => {
          setGame(res.data)
        })
        .catch(error => {
          alertError(error)
          setTimeout(() => {
            history.push('/games')
          }, 3000);
        })
    }
  }, [id, history])

  return (
    <Content className="content-front">
      <Breadcrumb style={{ marginBottom: '10px' }}>
        <Breadcrumb.Item>
          <Link to='/'>
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to='/games'>
            <PlayCircleOutlined />
            <span> Games</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{game.name}</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col className='gutter-row' span={24}>
          <Card style={{ width: '100%' }}>
            <div 
                className='card-header' 
                style={{ 
                  background: `linear-gradient(25deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 1)), url(${game.image_url})`, 
                  height: '50vh', 
                  margin: '-24px', 
                  borderRadius: '5px' }} >
              <div className='card-about'>
                <div className='media-left'>
                  <img src={game.image_url} alt='' />
                </div>
                <div className='media-right'>
                  <h1>{game.name}</h1>
                  <p><Tag color="orange" icon={<TagsOutlined />}>{game.genre}</Tag></p>
                  <p>
                    {
                      game.singlePlayer > 0 ?
                      <Tag color="orange" icon={<UserOutlined />}>Single Player</Tag>
                      : null
                    }
                    {
                      game.multiplayer > 0 ?
                      <Tag color="orange" icon={<UsergroupAddOutlined />}>Multi Player</Tag>
                      : null
                    }
                  </p>
                </div>
              </div>
            </div>
          </Card>
          <Card style={{ width: '100%' }}>
            <Tabs defaultActiveKey='1'>
              <TabPane tab='Information' key='1'>
                <p>Platform : {game.platform}</p>
                <p>Release : {game.release}</p>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </Content>
  )
}

export default GamesDetail