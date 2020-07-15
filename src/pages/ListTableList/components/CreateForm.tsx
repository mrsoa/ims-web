import React, { useState } from "react";
import { Form, Input, Modal, Select, Checkbox } from "antd";
import { TableListItem } from "../data.d";
import TextArea from "antd/lib/input/TextArea";
import request from "@/utils/request";

const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: TableListItem) => void;
  onCancel: () => void;
}

let timeout;
let currentValue;
const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [data, setData] = useState<>([]);
  const [value, setValue] = useState<>(undefined);
  const [isRetOne, setIsRetOne] = useState(false);

  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = (await form.validateFields()) as TableListItem;
    if (isRetOne) {
      fieldsValue.isRetOne = 1;
    } else {
      fieldsValue.isRetOne = 0;
    }
    console.log(fieldsValue);
    form.resetFields();

    const success = handleAdd(fieldsValue);
    if (success) {
    }
  };

  const getSelectOptions = (value, callback) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;

    request("/database/apidb/databasesList", {
      method: "POST",
      data: { search: value },
    }).then((res) => {
      res.data;
      let values = [];
      for (let i = 0; i < res.data.length; i++) {
        values.push({
          value: res.data[i].id,
          text: res.data[i].name,
        });
      }
      setData(values);
    });
  };

  const handleSearch = (value: any) => {
    if (value) {
      //fetch(value, data => setData(data});
      getSelectOptions(value);
      //setData([{value:'001',text:'abc'},{value:'002',text:'bcd'}]);
    } else {
      setData([]);
    }
  };

  const handleChange = (value: any) => {
    console.info(value);
    setValue(value);
  };

  const options = data.map((d: any) => {
    return <Select.Option key={d.value}>{d.text}</Select.Option>;
  });

  const onCheckboxChange = (e) => {
    console.log(e);
    console.log(e.target.checked);
    setIsRetOne(e.target.checked);
  };

  return (
    <Modal
      destroyOnClose
      title="新建接口"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          label="接口编码"
          name="serviceCode"
          rules={[
            {
              required: true,
              message: "请输入至少三个字符的接口编码！",
              min: 3,
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          label="接口名称"
          name="serviceName"
          rules={[
            {
              required: true,
              message: "请输入至少五个字符的接口名称！",
              min: 5,
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          label="数据源"
          name="dbConId"
          rules={[{ required: true, message: "请选择数据源！" }]}
        >
          <Select
            showSearch
            value={value}
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
        <Form.Item
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          label="是否返回对象"
          name="isRetOne"
          valuePropName="checked"
        >
          <Checkbox onChange={onCheckboxChange}>是否返回对象</Checkbox>
        </Form.Item>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          label="脚本"
          name="sqlText"
          rules={[
            {
              required: true,
              message: "请输入至少五个字符的脚本信息！",
              min: 5,
            },
          ]}
        >
          <TextArea style={{ minHeight: 32 }} placeholder="请输入" rows={3} />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          label="描述"
          name="description"
          rules={[
            {
              required: true,
              message: "请输入至少五个字符的规则描述！",
              min: 5,
            },
          ]}
        >
          <TextArea
            style={{ minHeight: 32 }}
            placeholder="请输入描述"
            rows={2}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
