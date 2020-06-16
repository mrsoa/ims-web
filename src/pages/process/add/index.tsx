import { InfoCircleOutlined, InboxOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Card, DatePicker, Input, InputNumber, Radio, Select, Tooltip, Upload, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
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

  state = {fileName:'',fileLocation:''}

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'processAndadd/submitRegularForm',
          payload: {
            fileLocation:this.state.fileLocation,
            fileName:this.state.fileName,
            ...values
          },
        });
      }
    });
  };


  /**
   * 文件上传操作
   */
  handleOnChange = (info:any) =>{
    const {status} = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      this.setState({
        fileName:info.file.name,
        fileLocation:info.file.response.data,
      });

    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const normFile = (e:any) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };

    return (
      <PageHeaderWrapper content={<FormattedMessage id="processandadd.basic.description" />}>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            
            <FormItem {...formItemLayout} label={<FormattedMessage id="processandadd.processCode.label" />}>
              {getFieldDecorator('processCode', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'processandadd.processCode.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'processandadd.processCode.placeholder' })} />)}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="processandadd.processName.label" />}>
              {getFieldDecorator('processName', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'processandadd.processName.required' }),
                  },
                ],
              })(<Input placeholder={formatMessage({ id: 'processandadd.processCode.placeholder' })} />)}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="processandadd.environment.label" />}>
              {getFieldDecorator('environment', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'processandadd.environment.required' }),
                  },
                ],
              })(<Select placeholder="请选择">
                    <Option value="DEV">DEV</Option>
                    <Option value="TEST">TEST</Option>
                    <Option value="PRE_PRDO">PRE_PRDO</Option>
                    <Option value="PROD">PROD</Option>
                  </Select>)}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="processandadd.description.label" />}>
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'processandadd.description.required' }),
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'processandadd.description.placeholder' })}
                  rows={4}
                />,
              )}
            </FormItem>

            <Form.Item {...formItemLayout}  label="上传单元">
              <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                <Upload.Dragger 
                  name="uploadFile" 
                  headers={{Authorization: `YIANJU ${localStorage.getItem('token')}`}}
                  action="/api/process/upload"
                  multiple={false}
                  onChange={this.handleOnChange}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">   点击或者拖拽文件到此处   </p>
                  <p className="ant-upload-hint">支持单个或多个文件</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="processandadd.form.submit" />
              </Button>
              <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="processandadd.form.save" />
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
