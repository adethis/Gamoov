import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/Auth'
import { getGames, deleteGames } from '../../utils/Games/GamesAPI'
import { Row, Col, Card, Table, Button, Space, Modal, message, Input, Tag, Spin } from 'antd'
import {
  VideoCameraAddOutlined,
  EditTwoTone,
  DeleteTwoTone,
  ExclamationCircleOutlined,
  SearchOutlined,
  EyeTwoTone
} from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
const { confirm } = Modal

const Games = () => {
  const [user,] = useContext(AuthContext)
  const [games, setGames] = useState([])
  let [searchText, setSearchText] = useState('')
  let [searchedColumn, setSearchedColumn] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchData = () =>
    getGames()
      .then(res => {
        setGames(res.data)
        setLoading(false)
      })

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [])

  const modalDelete = params => {
    confirm({
      title: 'Are you sure delete this game?',
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
      deleteGames(user.token, id)
        .then(res => {
          let data = games.filter(d => d.id !== id)
          setGames(data)
          message.success("Game has been deleted")
        })
    }
  }
  
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
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
      title: "Name",
      dataIndex: "name",
      width: 180,
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearch("name")
    },
    {
      title: "Genre",
      dataIndex: "genre",
      width: 115,
      ellipsis: true,
      sorter: (a, b) => a.genre.localeCompare(b.genre),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearch("genre")
    },
    {
      title: "Platform",
      dataIndex: "platform",
      width: 115,
      ellipsis: true,
      sorter: (a, b) => a.platform.localeCompare(b.platform),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearch("platform")
    },
    {
      title: "Release",
      dataIndex: "release",
      width: 100,
      filters: filterByData([...new Map(games.map(item => [item.release, item])).values()]) (i => i.release),
      onFilter: (value, record) => record.release === value,
      sorter: (a, b) => a.release - b.release,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Single Player",
      dataIndex: "singlePlayer",
      width: 100,
      filters: [
        { text: <Tag color='green'>Yes</Tag>, value: 1 },
        { text: <Tag color='volcano'>No</Tag>, value: 0 },
      ],
      onFilter: (value, record) => record.singlePlayer === value,
      sorter: (a, b) => a.singlePlayer - b.SinglePlayer,
      sortDirections: ["descend", "ascend"],
      render: modeSingle => {
        let color = modeSingle > 0 ? 'green' : 'volcano'
        return modeSingle > 0 ? <Tag color={color}>{'Yes'}</Tag> : <Tag color={color}>{'No'}</Tag>
      }
    },
    {
      title: "Multi Player",
      dataIndex: "multiplayer",
      width: 100,
      filters: [
        { text: <Tag color='green'>Yes</Tag>, value: 1 },
        { text: <Tag color='volcano'>No</Tag>, value: 0 },
      ],
      onFilter: (value, record) => record.multiplayer === value,
      sorter: (a, b) => a.multiplayer - b.multiplayer,
      sortDirections: ["descend", "ascend"],
      render: modeMulti => {
        let color = modeMulti > 0 ? 'green' : 'volcano'
        return modeMulti > 0 ? <Tag color={color}>{'Yes'}</Tag> : <Tag color={color}>{'No'}</Tag>
      }
    },
    {
      title: "Actions",
      key: "action",
      width: 100,
      fixed: 'right',
      render: (record) => (
        <Space size="middle">
          <Link to={`/games/detail/${record.id}`}>
            <EyeTwoTone twoToneColor="#52c41a" />
          </Link>
          <Link to={`/games_editor/edit/${record.id}`}>
            <EditTwoTone />
          </Link>
          <Link
            to="/games_editor"
            value={record.id}
            onClick={(e) => {
              e.preventDefault()
              modalDelete(record.id)
            }}
          >
            <DeleteTwoTone twoToneColor="#eb2f96" />
          </Link>
        </Space>
      ),
    },
  ]

  const buttonAdd = <Button type='primary'><Link to="/games_editor/add"><VideoCameraAddOutlined /> Add Games</Link></Button>

  return (
    <>
      <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col className="gutter-row" span={24}>
          <div className="site-card-border-less-wrapper">
            <Card
              title="List Game"
              bordered={false}
              extra={buttonAdd}
              style={{ width: "auto" }}
            >
              <Table columns={columns} dataSource={games} rowKey="id" onChange={handleChange} scroll={{ x: 1000 }} />
            </Card>
          </div>
        </Col>
      </Row>
      </Spin>
    </>
  )
}

export default Games