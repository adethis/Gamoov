import React, { useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/Auth'
import { Row, Col, Card, Typography, Avatar, Form, message, Input, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Paragraph } = Typography

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const Profile = () => {
  const [user,] = useContext(AuthContext)
  const [form] = Form.useForm()

  const handleSubmit = values => {
    if (user.token) {
      axios.post('https://backendexample.sanbersy.com/api/change-password', values, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
        .then(res => {
          if (res.status === 200) {
            message.success(res.data)
          } else {
            message.error(res.data)
          }
        })
      .catch(error => console.log(error))
    }
  }

  const onFinish = values => {
    form.resetFields()
    handleSubmit(values)
  }

  const onFinishFailed = errorInfo => {
    message.error("Failed:", errorInfo)
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col className='gutter-row' span={24}>
          <div className='site-card-border-less-wrapper'>
            <Card
              title="Profile"
              bordered={false}
              style={{ width: "auto" }}
            >
              <Row>
                <Col span={14}>
                  <Form
                    {...layout}
                    form={form}
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      label="Current Password"
                      name="current_password"
                      rules={[
                        {
                          required: true,
                          message: "Please input current password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      label="New Password"
                      name="new_password"
                      rules={[
                        {
                          required: true,
                          message: "Please input new password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      label="Confirm New Password"
                      name="new_confirm_password"
                      rules={[
                        {
                          required: true,
                          message: "Please input confirm new password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item {...layout}>
                      <Button type='primary' htmlType='submit'>Submit</Button>
                    </Form.Item>
                  </Form>
                </Col>
                <Col span={10}>
                  <Paragraph>
                    <Avatar 
                      icon={<UserOutlined />} 
                      size={74}
                      onClick={e => e.preventDefault()} 
                      style={{ marginBottom: '30px' }} /> 
                    <Typography size={24}><b>User Name</b></Typography>
                    <Typography>{user.name}</Typography>
                    <Typography size={24}><b>Email</b></Typography>
                    <Typography>{user.email}</Typography>
                    <pre>
                      Please fill your old password before create new password.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    </pre>
                  </Paragraph>
                </Col>
              </Row>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Profile