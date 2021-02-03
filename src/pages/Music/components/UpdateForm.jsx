import React, { useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

const UpdateForm = ({ visible, onCreate, onCancel, categoryList }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="name"
          label="歌曲名称"
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="类别"
          rules={[
            {
              required: true,
              message: '必选',
            },
          ]}
        >
          <Select>
            {
              categoryList.map(li => (
                <Option value={li._id} key={li._id}>{li.name}</Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          name="author"
          label="作者"
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cover"
          label="封面图"
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="url"
          label="歌曲链接"
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
