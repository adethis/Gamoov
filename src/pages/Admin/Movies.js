import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Card, Table, Button, Space, Modal, message, Input, Rate, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/Auth'
import { getMovies, deleteMovies } from '../../utils/Movies/MoviesAPI'
import { VideoCameraAddOutlined, EditTwoTone, DeleteTwoTone, ExclamationCircleOutlined, SearchOutlined, EyeTwoTone } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
const { confirm } = Modal

const Movies = () => {
  const [user,] = useContext(AuthContext)
  const [movies, setMovies] = useState([])
  let [searchText, setSearchText] = useState('')
  let [searchedColumn, setSearchedColumn] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchData = () =>
    getMovies()
      .then(res => {
        setMovies(res.data)
        setLoading(false)
      })

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [])

  const modalDelete = params => {
    confirm({
      title: 'Are you sure delete this movie?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(params)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const handleDelete = evt => {
    const id = evt
    if (id !== null && id !== '') {
      deleteMovies(user.token, id)
        .then(res => {
          let data = movies.filter(d => d.id !== id)
          setMovies(data)
          message.success("Movie has been deleted")
        })
    }
  }

  let searchInput = null
  const getColumnSearch = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            return searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100)
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }  

  const filterByData = data => formatter => data.map(item => ({
    text: formatter(item),
    value: formatter(item)
  }))

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearch("title")
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
      sorter: (a, b) => a.description.localeCompare(b.description),
      sortDirections: ["descend", "ascend"],
      responsive: ['md'],
      ...getColumnSearch("description")
    },
    {
      title: "Duration",
      dataIndex: "duration",
      width: 130,
      filters: filterByData([...new Map(movies.map(item => [item.duration, item])).values()]) (i => i.duration),
      onFilter: (value, record) => record.duration === value,
      sorter: (a, b) => a.duration - b.duration,
      sortDirections: ["descend", "ascend"],
      responsive: ['md']
    },
    {
      title: "Rating",
      dataIndex: "rating",
      width: 180,
      responsive: ['md'],
      filters: [
        { 
          text: <Space size='small'><Rate value={5} style={{ fontSize: '14px' }} disabled /></Space>,
          value: 5
        },
        { 
          text: <Space size='small'><Rate value={4} style={{ fontSize: '14px' }} disabled /></Space>,
          value: 4
        },
        { 
          text: <Space size='small'><Rate value={3} style={{ fontSize: '14px' }} disabled /></Space>,
          value: 3
        },
        { 
          text: <Space size='small'><Rate value={2} style={{ fontSize: '14px' }} disabled /></Space>,
          value: 2
        },
        { 
          text: <Space size='small'><Rate value={1} style={{ fontSize: '14px' }} disabled /></Space>,
          value: 1
        },
      ],
      onFilter: (value, record) => parseInt(record.rating / 2) === value,
      sorter: (a, b) => a.rating - b.rating,
      sortDirections: ["descend", "ascend"],
      render: rate => {
        return <Space size='small'><Rate defaultValue={rate/2} style={{ fontSize: '14px' }} disabled /> <small>({rate}/10)</small></Space>
      }
    },
    {
      title: "Review",
      dataIndex: "review",
      ellipsis: true,
      sorter: (a, b) => a.review.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
      responsive: ['md']
    },
    {
      title: "Actions",
      key: "action",
      width: 130,
      fixed: 'right',
      render: (record) => (
        <Space size='middle'>
          <Link to={`/movies/detail/${record.id}`}><EyeTwoTone twoToneColor='#52c41a' /></Link>
          <Link to={`/movies_editor/edit/${record.id}`}><EditTwoTone /></Link>
          <Link to='/movies_editor' value={record.id} onClick={e => {
            e.preventDefault()
            modalDelete(record.id)
          }}><DeleteTwoTone twoToneColor='#eb2f96' /></Link>
        </Space>
      )
    }
  ];

  const buttonAdd = <Button type='primary'><Link to="/movies_editor/add"><VideoCameraAddOutlined /> Add Movies</Link></Button>

  return (
    <>
      <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col className="gutter-row" span={24}>
          <div className="site-card-border-less-wrapper">
            <Card title="List Movie" bordered={false} extra={buttonAdd} style={{ width: 'auto' }}>
              <Table columns={columns} dataSource={movies} rowKey='id' scroll={{ x: 1200 }} />
            </Card>
          </div>
        </Col>
      </Row>
      </Spin>
    </>
  );
}

export default Movies