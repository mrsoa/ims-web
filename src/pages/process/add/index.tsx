import { InfoCircleOutlined, InboxOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
  Button,
  Card,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  Tooltip,
  Upload,
  message,
} from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
interface AddProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

class Add extends Component<AddProps> {
  state = {
    fileName: '',
    fileLocation: '',
  };

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'processAndadd/submitRegularForm',
          payload: {
            fileLocation: this.state.fileLocation,
            fileName: this.state.fileName,
            ...values,
          },
        });
      }
    });
  };
  /**
   * 文件上传操作
   */

  handleOnChange = (info: any) => {
    const { status } = info.file;

    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (status === 'done') {
      this.setState({
        fileName: info.file.name,
        fileLocation: info.file.response.data,
      });
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 7,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 12,
        },
        md: {
          span: 10,
        },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 7,
        },
      },
    };

    const normFile = (e: any) => {
      console.log('Upload event:', e);

      if (Array.isArray(e)) {
        return e;
      }

      return e && e.fileList;
    };

    return (
      <PageHeaderWrapper content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >
            <FormItem {...formItemLayout} label="单元编码">
              {getFieldDecorator('processCode', {
                rules: [
                  {
                    required: true,
                    message: '处理单元编码为必填项',
                  },
                ],
              })(<Input placeholder="请输入处理单元编码" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="单元名称">
              {getFieldDecorator('processName', {
                rules: [
                  {
                    required: true,
                    message: '处理单元名称为必填项',
                  },
                ],
              })(<Input placeholder="请输入处理单元编码" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="运行环境">
              {getFieldDecorator('environment', {
                rules: [
                  {
                    required: true,
                    message: '运行环境为必选项',
                  },
                ],
              })(
                <Select placeholder="请选择">
                  <Option value="DEV">DEV</Option>
                  <Option value="TEST">TEST</Option>
                  <Option value="PRE_PRDO">PRE_PRDO</Option>
                  <Option value="PROD">PROD</Option>
                </Select>,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="单元描述">
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: '单元描述为必填项',
                  },
                ],
              })(
                <TextArea
                  style={{
                    minHeight: 32,
                  }}
                  placeholder="请输入单元描述"
                  rows={4}
                />,
              )}
            </FormItem>

            <Form.Item {...formItemLayout} label="上传单元">
              <Form.Item
                name="dragger"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload.Dragger
                  name="uploadFile"
                  headers={{
                    Authorization: `YIANJU ${localStorage.getItem('token')}`,
                  }}
                  action="/api/process/upload"
                  multiple={false}
                  onChange={this.handleOnChange}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text"> 点击或者拖拽文件到此处 </p>
                  <p className="ant-upload-hint">支持单个或多个文件</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>

            <FormItem
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                保存
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<AddProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting: loading.effects['processAndadd/submitRegularForm'],
  }))(Add),
);
