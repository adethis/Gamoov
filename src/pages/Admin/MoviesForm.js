import React, { useContext, useState, useEffect } from "react"
import { useHistory, withRouter } from "react-router-dom"
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  InputNumber,
  Rate,
  message,
} from "antd"
import { AuthContext } from "../../context/Auth"
import { getMovies, postMovies, putMovies } from "../../utils/Movies/MoviesAPI"
import img_default from '../../assets/img/img_default.png'

const { TextArea } = Input

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const MoviesForm = props => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [user] = useContext(AuthContext)
  const movieId = props.match.params.id ? props.match.params.id : null
  const [inputMovie, setInputMovie] = useState({
    id: null,
    title: "",
    description: "",
    year: 2020,
    duration: 120,
    genre: "",
    rating: 0,
    image_url: "",
  })
  const [thumbnail, setThumbnail] = useState(img_default)

  useEffect(() => {
    if (movieId) {
      getMovies(movieId)
        .then(res => {
          let rating = res.data.rating / 2
          form.setFieldsValue({...res.data, rating})
          setThumbnail(res.data.image_url)
        })
        .catch(error => console.log(error))
    }
  },[movieId, form])

  
  const handleChange = (evt) => {
    setInputMovie({ ...inputMovie, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (params) => {
    if (movieId === null) {
      postMovies(user.token, params)
        .then((res) => {
          message.success("Movies has been added")
          setTimeout(() => {
            history.push("/movies_editor")
          }, 1000)
        })
        .catch((error) => message.error(error))
    } else {
      putMovies(user.token, {...params, id: movieId})
        .then(res => {
          message.success("Movie has been updated")
          setTimeout(() => {
            history.push("/movies_editor")
          }, 1000)
        })
        .catch(error => message.error(error))
    }
  }

  const onFinish = (values) => {
    values.rating = values.rating * 2
    setInputMovie(inputMovie)
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
            <Card title="Add Movie" bordered={false} style={{ width: "auto" }}>
              <Form
                {...layout}
                form={form}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Row>
                  <Col className="gutter-row" xs={24} md={12} sm={24} lg={12}>
                    <Form.Item
                      label="Title"
                      name="title"
                      value={inputMovie.title}
                      initialValue={inputMovie.title}
                      onChange={handleChange}
                      rules={[
                        {
                          required: true,
                          message: "Please input title movie!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Description"
                      name="description"
                      value={inputMovie.description}
                      initialValue={inputMovie.description}
                      onChange={handleChange}
                      rules={[
                        {
                          required: true,
                          message: "Please input description movie!",
                        },
                      ]}
                    >
                      <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                      label="Year"
                      name="year"
                      value={inputMovie.year}
                      initialValue={inputMovie.year}
                      onChange={handleChange}
                      rules={[
                        { required: true, message: "Please input year movie!" },
                      ]}
                    >
                      <InputNumber
                        min={1981}
                        max={2022}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Duration"
                      name="duration"
                      value={inputMovie.duration}
                      initialValue={inputMovie.duration}
                      onChange={handleChange}
                      rules={[
                        {
                          required: true,
                          message: "Please input duration movie!",
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        max={210}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Genre"
                      name="genre"
                      value={inputMovie.genre}
                      initialValue={inputMovie.genre}
                      onChange={handleChange}
                      rules={[
                        {
                          required: true,
                          message: "Please input genre movie!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="rating"
                      value={inputMovie.rating}
                      initialValue={inputMovie.rating}
                      label="Rate"
                      rules={[
                        { required: true, message: "Please rate this movie!" },
                      ]}
                    >
                      <Rate />
                    </Form.Item>

                    <Form.Item
                      label="Review"
                      name="review"
                      value={inputMovie.review}
                      initialValue={inputMovie.review}
                      onChange={handleChange}
                      rules={[
                        {
                          required: true,
                          message: "Please input duration movie!",
                        },
                      ]}
                    >
                      <TextArea />
                    </Form.Item>
                    <Form.Item
                      label="Image URL"
                      name="image_url"
                      value={inputMovie.image_url}
                      initialValue={inputMovie.image_url}
                      onChange={e => e.target.value !== '' ? setThumbnail(e.target.value) : setThumbnail(img_default)}
                      rules={[
                        {
                          required: true,
                          message: "Please input image url movie!",
                        },
                      ]}
                    >
                      <TextArea />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} md={12} sm={24} lg={12}>
                    <img src={thumbnail} className='image-placeholder' alt='thumbnail' />
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
  )
}

export default withRouter(MoviesForm)
