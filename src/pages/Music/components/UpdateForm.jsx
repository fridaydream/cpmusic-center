import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';

const UpdateForm = ({ visible, onCreate, onCancel }) => {
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
