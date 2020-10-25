import React, { useContext, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Layout, Menu, Dropdown, Avatar, message } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined, UserOutlined } from '@ant-design/icons'
import { AuthContext } from '../../context/Auth'
import { ToggleContext } from '../../context/Toggle'

const { Header } = Layout

const collapsedStyle = {
  float: 'right', 
  marginRight: '80px', 
  padding: '0 20px',
  transition: 'all .3s ease'
}
const notCollapsedStyle = {
  float: 'right',
  marginRight: 'calc(100% / 6)',
  padding: '0 20px',
  transition: 'all .3s ease'
}

const HeadersAdmin = () => {
  const [user, setUser] = useContext(AuthContext)
  const [collapsed, , handleToggle] = useContext(ToggleContext)
  const [userMenu, setUserMenu] = useState(notCollapsedStyle)

  useEffect(() => {
    if (collapsed) {
      setUserMenu(collapsedStyle)
    } else {
      setUserMenu(notCollapsedStyle)
    }
  }, [collapsed])


  const menu = (
    <Menu>
      <Menu.ItemGroup title='User Menu'>
        <Menu.Item key='/dashboard' path='/dashboard'>
          <Link to='/dashboard'>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key='/profile' path='/profile'>
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
    <>
      <Header className="site-layout-background back" style={{ padding: 0 }}>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: handleToggle,
          }
        )}
        <Menu style={userMenu}>
          <Dropdown overlay={menu} trigger={['click']}>
            <Link to="/#" className='ant-dropdown-link color-black' onClick={e => e.preventDefault()}>
              <Avatar 
                icon={<UserOutlined />} 
                onClick={e => e.preventDefault()} 
                style={{ marginRight: '5px' }} /> 
              Hi, {user.name}!
              <DownOutlined style={{ marginLeft: '5px' }} />
            </Link>
          </Dropdown>
        </Menu>
      </Header>
    </>
  );
}

export default HeadersAdmin