import React, { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { DashboardOutlined, VideoCameraOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { ToggleContext } from '../../context/Toggle'
import logos from '../../assets/img/logos.svg'
import small_logos from '../../assets/img/sm_logos.svg'

const { Sider } = Layout
const { SubMenu } = Menu

const Sidebars = () => {
  const [collapsed] = useContext(ToggleContext)
  const location = useLocation()
  const loc = location.pathname.split('/')
  const slash = '/'
  const [currentMenu, setCurrentMenu] = useState(location.pathname)
  const [openKeys, setOpenKeys] = useState([slash.concat(loc[1])])

  const handleCurmen = evt => {
    setCurrentMenu(evt.key)
  }

  const handleOpenKeys = evt => {
    setOpenKeys(evt.splice(-1))
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      {
        collapsed ? 
        <div 
          className="logo admin" 
          style={{ width: '80px' }}>
          <Link to='/'>
            <img 
              src={small_logos} 
              style={{ width: '80px', height: '38px', transition: 'all .3s ease' }} 
              alt='' />
          </Link>
        </div>
        : 
        <div className="logo admin"><Link to='/'><img src={logos} alt='' /></Link></div>
      }
      <Menu mode="inline" defaultSelectedKeys={[currentMenu]} openKeys={openKeys} onOpenChange={handleOpenKeys}>
        <Menu.Item key="/dashboard" path="/dashboard" onClick={handleCurmen} icon={<DashboardOutlined />}>
          <Link to='/dashboard'>Dashboard</Link>
        </Menu.Item>
        <SubMenu key='/movies_editor' icon={<VideoCameraOutlined />} title='Movies'>
          <Menu.Item key="/movies_editor" path="/movies_editor" onClick={handleCurmen}>
            <Link to='/movies_editor'>List Movie</Link>
          </Menu.Item>
          <Menu.Item key="/movies_editor/add" path="/movies_editor/add" onClick={handleCurmen}>
            <Link to='/movies_editor/add'>Add Movie</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key='/games_editor' icon={<PlayCircleOutlined />} title='Games'>
          <Menu.Item key="/games_editor" path="/games_editor" onClick={handleCurmen}>
            <Link to='/games_editor'>List Games</Link>
          </Menu.Item>
          <Menu.Item key="/games_editor/add" path="/games_editor/add" onClick={handleCurmen}>
            <Link to='/games_editor/add'>Add Games</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default Sidebars