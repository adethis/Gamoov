import React, { useContext, useState, useEffect, useRef } from "react"
import { useHistory, withRouter } from "react-router-dom"
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  InputNumber,
  message,
  Checkbox
} from "antd"
import { AuthContext } from "../../context/Auth"
import { getGames, postGames, putGames } from "../../utils/Games/GamesAPI"
import img_default from '../../assets/img/img_default.png'

const { TextArea } = Input

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const GamesForm = props => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [user] = useContext(AuthContext)
  const gameId = props.match.params.id ? props.match.params.id : null
  const [isCheckedSingle, setIsCheckedSingle] = useState(false)
  const [isCheckedMulti, setIsCheckedMulti] = useState(false)
  const checkSingle = useRef()
  const checkMulti = useRef()
  const [thumbnail, setThumbnail] = useState(img_default)

  useEffect(() => {
    if (gameId) {
      getGames(gameId)
        .then(res => {
          form.setFieldsValue(res.data)
          setIsCheckedSingle(res.data.singlePlayer)
          setIsCheckedMulti(res.data.multiplayer)
          setThumbnail(res.data.image_url)
        })
        .catch(error => console.log(error))
    }
  },[gameId, form])

  const handleSubmit = (params) => {
    if (gameId === null) {
      postGames(user.token, params)
        .then((res) => {
          message.success("Games has been added")
          setTimeout(() => {
            history.push("/games_editor")
          }, 1000)
        })
        .catch((error) => message.error(error))
    } else {
      putGames(user.token, {...params, id: gameId})
        .then(res => {
          message.success("Game has been updated")
          setTimeout(() => {
            history.push("/games_editor")
          }, 1000)
        })
        .catch(error => message.error(error))
    }
  }

  const onFinish = (values) => {
    values.singlePlayer = checkSingle.current.rcCheckbox.state.checked ? 1 : 0
    values.multiplayer = checkMulti.current.rcCheckbox.state.checked ? 1 : 0
    handleSubmit(values)
    form.resetFields()
  }

  const onFinishFailed = (errorInfo) => {
    message.error("Failed:", errorInfo)
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col className="gutter-row" span={24}>
          <div className="site-card-border-less-wrapper">
            <Card title="Add Game" bordered={false} style={{ width: "auto" }}>
              <Form
                {...layout}
                form={form}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Row gutter={[16, 16]}>
                  <Col className="gutter-row" xs={24} md={12} sm={24} lg={12}>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input name game!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Platform"
                      name="platform"
                      rules={[
                        {
                          required: true,
                          message: "Please input platform game!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Genre"
                      name="genre"
                      rules={[
                        {
                          required: true,
                          message: "Please input genre game!",
                        },
                      ]}
                    >
                      <TextArea rows={2} />
                    </Form.Item>
                    <Form.Item
                      label="Release"
                      name="release"
                      rules={[
                        {
                          required: true,
                          message: "Please input release game!",
                        },
                      ]}
                    >
                      <InputNumber min={1981} max={2022} />
                    </Form.Item>
                    <Form.Item
                      label="Mode"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input mode single or multi player game!",
                        },
                      ]}
                    >
                      <Checkbox
                        ref={checkSingle}
                        checked={isCheckedSingle}
                        onChange={(e) => setIsCheckedSingle(!isCheckedSingle)}
                      >
                        Single Player
                      </Checkbox>
                      <Checkbox
                        ref={checkMulti}
                        checked={isCheckedMulti}
                        onChange={(e) => setIsCheckedMulti(!isCheckedMulti)}
                      >
                        Multi Player
                      </Checkbox>
                    </Form.Item>
                    <Form.Item
                      label="Image URL"
                      name="image_url"
                      onChange={(e) =>
                        e.target.value !== ""
                          ? setThumbnail(e.target.value)
                          : setThumbnail(img_default)
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please input image url game!",
                        },
                      ]}
                    >
                      <TextArea rows={4} />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} md={12} sm={24} lg={12}>
                    <img
                      src={thumbnail}
                      className="image-placeholder"
                      alt="thumbnail"
                    />
                  </Col>
                </Row>

                <br />
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default withRouter(GamesForm)
