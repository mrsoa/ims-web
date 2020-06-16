import React, { useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import request from "@/utils/request";


const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

let timeout;
let currentValue;
const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [data,setData] = useState<>([]);
  const [value,setValue] = useState<>(undefined);
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };

  const getSelectOptions = (value, callback)=>{
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;

    request('/process/processUnitList',{
      method:'POST',
      data:{search:value},
    }).then((res)=>{
      res.data;
      let values = [];
      for (let i=0;i<res.data.length;i++){
        values.push({
          value:res.data[i].processCode,
          text:res.data[i].processName
        });
      }
      //callback(values);
      setData(values);
    })
  }

  const handleSearch = (value:any) => {
    if (value) {
      //fetch(value, data => setData(data});
      getSelectOptions(value);
      //setData([{value:'001',text:'abc'},{value:'002',text:'bcd'}]);
    } else {
      setData([]);
    }
  };

  const handleChange = (value:any) => {
    console.info(value);
    setValue(value);
  };

  const options = data.map((d:any) => {
    return <Select.Option key={d.value}>{d.text}</Select.Option>
  });

  return (
    <Modal
      destroyOnClose
      title="新建功能定义"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="功能编码"
          name="functionCode"
          rules={[{ required: true, message: '请输入至少二个字符的功能编码', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="功能名称"
            name="functionName"
            rules={[{ required: true, message: '请输入至少三个字符的功能名称！', min: 3 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="消息类型"
            name="messageType"
            rules={[{ required: true, message: '请输入至少二个字符的消息类型！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="启动类"
            name="startDriver"
            rules={[{ required: true, message: '请输入至少10个字符的启动类！', min: 10 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="标签"
            name="tag"
            rules={[{ required: true, message: '请输入至少二个字符的标签！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="状态"
            name="state"
            rules={[{ required: true, message: '请输选择状态！' }]}
        >
          <Select>
            <Select.Option value="ENABLE">ENABLE</Select.Option>
            <Select.Option value="RUNNING">RUNNING</Select.Option>
            <Select.Option value="DISABLE">DISABLE</Select.Option>
          </Select>
        </FormItem>
        <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="处理器"
            name="processCode"
            rules={[{ required: true, message: '请选择处理器！'}]}
        >
          <Select
              showSearch
              value=''
              placeholder="请输入"
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={handleSearch}
              onChange={handleChange}
              notFoundContent={null}
          >
            {options}
          </Select>
        </FormItem>
        <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="处理类型"
            name="handleType"
            rules={[{ required: true, message: '请选择处理类型！'}]}
        >
          <Select>
            <Select.Option value="PROCESS">PROCESS</Select.Option>
            <Select.Option value="FEEDBACK">FEEDBACK</Select.Option>
            <Select.Option value="CALLBACK">CALLBACK</Select.Option>
            <Select.Option value="JOB">JOB</Select.Option>
          </Select>
        </FormItem>
        <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="描述"
            name="description"
            rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
