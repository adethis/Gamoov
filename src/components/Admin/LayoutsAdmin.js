import React from 'react'
import { Layout } from 'antd'
import HeadersAdmin from './HeadersAdmin'
import Sidebars from './Sidebars'
import { ToggleProvider } from '../../context/Toggle'

const { Content, Footer } = Layout

const LayoutsAdmin = props => {
  return (
    <>
      <Layout>
        <ToggleProvider>
        <Sidebars />
        <Layout className="site-layout">
          <HeadersAdmin />
          <Content className="content-back">
          {props.children}
          </Content>
          <Footer style={{ background: '#fff', textAlign: "center" }}>Gamoov &copy; Hamba Allah 2020</Footer>
        </Layout>
        </ToggleProvider>
      </Layout>
    </>
  );
}

export default LayoutsAdmin