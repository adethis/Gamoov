import React, { useContext } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { Form, Input, Button, Row, Col, message } from 'antd'
import { AuthContext } from '../../context/Auth'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const Register = () => {
  const history = useHistory()
  const [, setUser] = useContext(AuthContext)
  const [form] = Form.useForm()

  const handleSubmit = params => {
    axios.post('https://backendexample.sanbersy.com/api/register', params).then(res => {
      let user = res.data.user
      let token = res.data.token
      let currentUser = { name: user.name, email: user.email, token }
      setUser(currentUser)
      localStorage.setItem('user', JSON.stringify(currentUser))
      message.success("Register success! We will redirect to home pages")
      setTimeout(() => {
          history.push("/")
        }, 1000)
    }).catch(error => alert(`Hmm..something went wrong! maybe user already registered or ${error}`))
  }

  const onFinish = values => {
    handleSubmit(values)
    form.resetFields()
  }
  
  const onFinishFailed = error => {
    console.log('Error: ', error)
  }

  return (
    <>
      <Row justify="space-arround" gutter={[0, 0]} align="middle" style={{ minHeight: '100vh' }}>
        <Col className='bg-side' lg={{ span: 12 }} xs={0}></Col>
        <Col lg={{ span: 8 }} md={{ span: 8 }} xs={{ span: 20, offset: 2 }}>
          <h1>Registration</h1>
          <Form
            {...layout}
            layout='vertical'
            name='register'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
              label='Name'
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Please input your name!'
                }
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label='Email'
              name='email'
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
            
            <Form.Item {...layout}>
              Do have account ? <Link to='/login'>Login</Link>
            </Form.Item>
            <Form.Item {...layout}>
              Or back to home pages <Link to='/'>Gamoov</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default Register