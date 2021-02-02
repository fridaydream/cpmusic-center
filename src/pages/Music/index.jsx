import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, message, Col, Row } from 'antd';
import { connect, history, isBrowser } from 'umi';

import UpdateForm from './components/UpdateForm';
import styles from './index.less';

const TableList = (props) => {
  const [visible, setVisible] = useState(false);

  const { list, dispatch, currentUser } = props;
  const reloadData = async () => {
    dispatch({
      type: 'music/query',
    });
  }

  const onCreate = async (values) => {
    const result = await dispatch({
      type: 'music/create',
      payload: {
        ...values
      }
    });
    if (result) {
      message.success('新增成功');
      setVisible(false);
      reloadData();
    }
  };

  const deleteById = async (id) => {
    const result = await dispatch({
      type: 'music/del',
      payload: {
        id
      }
    });
    if (result) {
      message.success('删除成功');
      reloadData();
    }
  }

  const columns = [
    {
      title: 'id',
      dataIndex: '_id',
      key: '_id',
      width: 200,
    },
    {
      title: '歌曲名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '作者',
      dataIndex: 'author',
      width: 200,
      key: 'author',
    },
    {
      title: '封面图',
      dataIndex: 'cover',
      width: 200,
      key: 'cover',
    },
    {
      title: '歌曲链接',
      dataIndex: 'url',
      width: 200,
      key: 'url',
    },
    {
      title: '修改时间',
      width: 200,
      key: 'updatedAt',
      render: (text) => (
        <div>
          { text.meta.updatedAt }
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <a>修改</a>
          <a onClick={() => deleteById(record._id)}>删除</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch({ type: 'user/queryCurrentUser'});
  }, [1]);

  return (
    <div>
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
                const result = await dispatch({
                  type: 'user/logout',
                });
                if (result) {
                  history.push('/login');
                }
              }}
            >退出登陆</Button>
          </Col>
        </Row>
        <Table rowKey="_id" columns={columns} dataSource={list} pagination={false} />
      </Space>
      <UpdateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  )
}

TableList.getInitialProps = async (ctx) => {
  const { store, isServer } = ctx;
  console.log('ctx.session+++');
  await store.dispatch({ type: 'music/query'});
  const { music, user } = store.getState();
  return {
    music,
    user
  }
};

export default connect(({ music, user }) => ({ list: music.list, currentUser: user.currentUser }))(TableList);
