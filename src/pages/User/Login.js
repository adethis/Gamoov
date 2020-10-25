import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { AuthContext } from '../../context/Auth'
import { Form, Input, Button, Row, Col, message } from 'antd'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

const Login = () => {
  const [user, setUser] = useContext(AuthContext)
  const [input, setInput] = useState({email: '', password: ''})
  
  const handleChange = evt => {
    setInput({...input, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = params => {
    axios.post('https://backendexample.sanbersy.com/api/user-login', params)
      .then(res => {
        let user = res.data.user
        let token = res.data.token
        let currentUser = {name: user.name, email: user.email, token}
        setUser(currentUser)
        localStorage.setItem('user', JSON.stringify(currentUser))
        message.success(`Welcome back, ${user.name}!`)
      })
      .catch(error => alert(`Hmm..something went wrong! Maybe user didnt exist, make sure login info, email password match or ${error}`))
  }

  const onFinish = values => {
    handleSubmit(values)
  }
  
  const onFinishFailed = error => {
    console.log('Error: ', error)
  }

  return (
    <>
      {
        user && <Redirect to='/' />
      }
      <Row justify="space-arround" gutter={[0, 0]} align="middle" style={{ minHeight: '100vh' }}>
        <Col className='bg-side' lg={{ span: 12 }} xs={0}></Col>
        <Col lg={{ span: 8 }} md={{ span: 8 }} xs={{ span: 20, offset: 2 }}>
          <h1>Log in</h1>
          <Form
            {...layout}
            layout='vertical'
            name='login'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
              label='Email'
              name='email'
              onChange={handleChange}
              rules={[
                {
                  required: true,
                  message: 'Please input your email!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              onChange={handleChange}
              rules={[
                {
                  required: true,
                  message: 'Please input your password'
                }
              ]}
            >
              <Input.Password />
            </Form.Item>

            
            <Form.Item {...layout}>
              <Button type='primary' htmlType='submit'>Submit</Button>
            </Form.Item>
            
            <Form.Item {...tailLayout}>
              You don't have account ? <Link to='/register'>Registration here</Link>
            </Form.Item>
            <Form.Item {...tailLayout}>
              Or back to home pages <Link to='/'>Gamoov</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default Login