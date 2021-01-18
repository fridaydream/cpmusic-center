import React, { useState, useEffect, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Table, Tag, Space, Button, message, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect, isBrowser, getLocale, setLocale, history } from 'umi';
import { query, create, del, logout, queryCurrent } from './service';

import request from '@/utils/request'

import UpdateForm from './components/UpdateForm';
import styles from './index.less';

const TableList = (props) => {
  const [visible, setVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  console.log('+++', props.list);
  const [dataSource, setDataSource] = useState(props.list);
  const reloadData = async () => {
    const music = await query();
    setDataSource(music.data);
  }

  const getCurrentUrl = async () => {
    const user = await queryCurrent();
    console.log('user', user);
    setCurrentUser(user.data);
  }

  const onCreate = async (values) => {
    console.log('Received values of form: ', values);
    const result = await create(values)
    if (result) {
      message.success('新增成功');
      setVisible(false);
      reloadData();
    }
  };


  useEffect(() => {
    if (isBrowser()) {
      reloadData();
      getCurrentUrl();
    }
  }, [1]);

  const deleteById = async (id) => {
    const result = await del({ id });
    if (result) {
      reloadData();
    }
  }

  const columns = [
    {
      title: 'id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '歌曲名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '封面图',
      dataIndex: 'cover',
      key: 'cover',
    },
    {
      title: '歌曲链接',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '修改时间',
      key: 'updatedAt',
      render: (text, record) => (
        <div>
          { text.meta.updatedAt }
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>修改</a>
          <a onClick={() => deleteById(record._id)}>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <Space direction="vertical" className={styles.container} size="large">
        <Row>
          <Col span={12}>
            <Button
              type="primary"
              onClick={() => {
                setVisible(true);
              }}
            >新增</Button>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            {currentUser.email}
            <Button
              type="text"
              onClick={async () => {
                const result = await logout();
                if (result && result.success) {
                  history.push('/login');
                }
              }}
            >退出登陆</Button>
          </Col>
        </Row>
        <Table rowKey="_id" columns={columns} dataSource={dataSource} pagination={false} />
      </Space>
      <UpdateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </PageContainer>
  )
}

TableList.getInitialProps = async (ctx) => {
  const { store, isServer, history, match, route } = ctx;
  if (!isServer) {
    return;
  }
  const music = await request('/api/music/list')
  return {
    music: {
      list: music && music.data,
    },
  }
};

export default connect(({ music }) => ({ list: music.list }))(TableList);
