import React from 'react'
import { Layout } from 'antd'
import Headers from './Headers'
import ActiveMenuProvider from '../../context/ActiveMenu'

const { Footer } = Layout

const Layouts = props => {
  return (
    <>
      <Layout>
        <ActiveMenuProvider>
          <Headers />
          {props.children}
        </ActiveMenuProvider>
        <Footer style={{ background: '#fff', textAlign: "center" }}>Gamoov &copy; Hamba Allah 2020</Footer>
      </Layout>
    </>
  );
}

export default Layouts