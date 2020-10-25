import React, { useState, useContext } from 'react'
import { Layout, Menu, Dropdown, Avatar, Space, Button, Drawer, message } from 'antd'
import { Link, NavLink } from 'react-router-dom'
import logos from '../../assets/img/logos.svg'
import { ActiveMenuContext } from '../../context/ActiveMenu'
import { AuthContext } from '../../context/Auth'
import { UserOutlined, DownOutlined, LoginOutlined, MenuOutlined } from '@ant-design/icons'

const { Header } = Layout


const Headers = () => {
  const [user, setUser] = useContext(AuthContext)
  const [currentMenu, setCurrentMenu] = useContext(ActiveMenuContext)
  const [visible, setVisible] = useState(false)
  
  const handleCurmen = evt => {
    setCurrentMenu(evt.key)
  }

  const showDrawer = () => {
    setVisible(true);
  }

  const onClose = () => {
    setVisible(false);
  }
  
  const menu = (
    <Menu>
      <Menu.ItemGroup title='User Menu'>
        <Menu.Item key='/dashboard' path='/dashboard' onClick={handleCurmen}>
          <Link to='/dashboard'>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key='/profile' path='/profile' onClick={handleCurmen}>
          <Link to='/profile'>Profile</Link>
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.ItemGroup title='Others'>
        <Menu.Item key="1">
          <NavLink to='/dashboard' onClick={(e) => {
            e.preventDefault()
            localStorage.removeItem('user')
            message.success("Good bye :)")
            setUser(null)
          }}>Log out</NavLink>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  )

  return (
    <Header className='header-front' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo"><Link to='/'><img src={logos} alt='' /></Link></div>
      <Menu mode="horizontal" defaultSelectedKeys={[currentMenu]}>
        <Menu.Item key="/" path="/" onClick={handleCurmen}>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item key="/movies" path="/movies" onClick={handleCurmen}>
          <Link to='/movies'>Movies</Link>
        </Menu.Item>
        <Menu.Item key="/games" path="/games" onClick={handleCurmen}>
          <Link to='/games'>Games</Link>
        </Menu.Item>
        {
          user ?
          <Menu.Item style={{ float: 'right' }}>
            <Dropdown overlay={menu} trigger={['click']}>
              <a href="/#" className='ant-dropdown-link' onClick={e => e.preventDefault()}>
                <Avatar 
                  icon={<UserOutlined />} 
                  onClick={e => e.preventDefault()} 
                  style={{ marginRight: '5px' }} /> 
                Hi, {user.name}
                <DownOutlined style={{ marginLeft: '5px' }} />
              </a>
            </Dropdown>
          </Menu.Item>
          :
          <Menu.Item key="/login" path="/login" onClick={handleCurmen} style={{ float: 'right' }}>
            <Space><Link to='/login'><LoginOutlined />Login</Link></Space>
          </Menu.Item>
        }
      </Menu>
      <Button type="primary" className="responsiveMenu" onClick={showDrawer}>
        <MenuOutlined />
      </Button>
      <Drawer 
        placement="right" 
        closable={false} 
        onClick={onClose} 
        visible={visible}>
        <img src={logos} alt='logos' style={{ marginBottom: '30px' }} />
        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
          <li style={{ paddingBottom: '15px', fontSize: '18px' }}><Link to='/movies' style={{ color: '#8573f2' }}>Movies</Link></li>
          <li style={{ paddingBottom: '15px', fontSize: '18px' }}><Link to='/games' style={{ color: '#8573f2' }}>Games</Link></li>
          {
            user ?
            <>
            <li style={{ paddingBottom: '15px', fontSize: '18px' }}><Link to='/dashboard' style={{ color: '#8573f2' }}>Dashboard</Link></li>
            <li style={{ paddingBottom: '15px', fontSize: '18px' }}><Link to='/profile' style={{ color: '#8573f2' }}>Profile</Link></li>
            <li style={{ paddingBottom: '15px', fontSize: '18px' }}>
              <Link to='/dashboard' onClick={(e) => {
                e.preventDefault()
                localStorage.removeItem('user')
                message.success("Good bye :)")
                setUser(null)
              }}>Log out</Link>
            </li>
            </>
            : <li style={{ paddingBottom: '15px', fontSize: '18px' }}><Link to='/login' style={{ color: '#8573f2' }}>Login</Link></li>
          }
        </ul>
      </Drawer>
    </Header>
  )
}

export default Headers