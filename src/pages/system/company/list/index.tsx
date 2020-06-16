import { PlusOutlined, QuestionCircleOutlined, InboxOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import { Button, Card, Typography,List, Modal, Tooltip, Input, message, Radio, Select, Result, Upload } from 'antd';
import React, {Component, useState} from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { StateType } from './model';
import { CompnayModel } from './data.d';
import styles from './style.less';
import {FormValueType} from "@/pages/system/company/list/components/UpdateForm";

const { Paragraph } = Typography;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

interface CompanyListProps {
  company: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface CompanyListState {
  visible: boolean;
  done: boolean;
  current?: Partial<CompnayModel>;
  imageUrl?:string;
  logo?:string;
}


/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

class CompanyList extends Component<
  CompanyListProps,
  CompanyListState
> {

  state: CompanyListState = { visible: false, done: false, current: undefined ,logo:undefined,imageUrl:undefined};

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'company/fetch',
      payload: {
        count: 8,
      },
    });
  }

  /**
   * 展示新增公司弹框
   */
  showAddCompnayModal = ()=>{
    this.setState({
      visible:true
    });
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  handleDone = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleSubmit = (e: React.FormEvent) => {
    console.info('提交方法');
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    form.validateFields((err: string | undefined, fieldsValue: CompanyModel) => {
      console.info(this.state); //imageUrl
      fieldsValue.logo = this.state.logo;
      console.info(fieldsValue);
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'company/saveCompany',
        payload: fieldsValue,
      });
    });
  };


  //**上传图片 */
  getBase64 = (img:string,callback:any) =>{
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  beforeUpload = (file:any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = (info:any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.info(info);
      console.info(info.file.originFileObj);
      console.info(info.file.response.url);
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
          logo:info.file.response.url,
        }),
      );
    }
  };

  render() {
    const {
      company: { list },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    /** 新建企业弹出框start **/

    const { visible, done, current = {},imageUrl } = this.state;

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

      const uploadButton = (
        <div>
          {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">Upload</div>
        </div>
      );


    /** 弹出狂内容 **/
    const getModalContent = () => {
        if (done) {
          return (
            <Result
              status="success"
              title="创建企业成功"
              subTitle="一系列的信息描述，很短同样也可以带标点。"
              extra={
                <Button type="primary" onClick={this.handleDone}>
                  知道了
                </Button>
              }
              className={styles.formResult}
            />
          );
        }
        return (
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="企业编码" {...this.formLayout}>
              {getFieldDecorator('companyId', {
                rules: [{ required: true, message: '请输入企业名称' }],
                initialValue: current.companyId,
              })(<Input placeholder="请输入"/>)}
            </FormItem>
            <FormItem label="企业名称" {...this.formLayout}>
              {getFieldDecorator('companyName', {
                rules: [{ required: true, message: '请输入企业名称' }],
                initialValue: current.companyName,
              })(<Input placeholder="请输入"/>)}
            </FormItem>
            <FormItem label="企业登录账号" {...this.formLayout}>
              {getFieldDecorator('managerId', {
                rules: [{ required: true, message: '请输入企业登录' }],
                initialValue: current.managerId,
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem label="企业地址" {...this.formLayout}>
              {getFieldDecorator('companyAddress', {
                rules: [{ required: true, message: '请输入企业地址' }],
                initialValue: current.companyAddress,
              })(<Input placeholder="请输入"/>)}
            </FormItem>
            <FormItem label="法人代表" {...this.formLayout}>
              {getFieldDecorator('legalRepresentative', {
                rules: [{ required: true, message: '请输入法人代表名称'}],
                initialValue: current.legalRepresentative,
              })(<Input placeholder="请输入"/>)}
            </FormItem>
            <FormItem label="企业电话" {...this.formLayout}>
              {getFieldDecorator('companyPhone', {
                rules: [{ required: true, message: '请输入企业电话'}],
                initialValue: current.companyPhone,
              })(<Input placeholder="请输入"/>)}
            </FormItem>
            <Form.Item {...this.formLayout}  label="企业logo">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Form.Item>
          </Form>
        );
      };

    /** 新建企业弹出框end **/


    const onFinish = (values:any) => {
      console.log('Received values of form: ', values);
    };

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
          提供跨越设计与开发的体验解决方案。
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
            快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
            产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
            产品文档
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
    const nullData: Partial<CompnayModel> = {};


    return (
      <PageHeaderWrapper content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List<Partial<CompnayModel>>
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={[nullData, ...list]}
            renderItem={item => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[<a key="option1">操作一</a>, <a key="option2">操作二</a>]}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.logo?item.logo:'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png'} />}
                        title={<a>{item.companyName}</a>}
                        description={
                          <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                            {item.companyAddress}<br/>
                            {item.legalRepresentative}:{item.companyPhone}<br/>
                            {item.industry}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button type="ndashed" className={styles.newButton} onClick={this.showAddCompnayModal}>
                    <PlusOutlined /> 新增企业
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
        <Modal
          title={done ? null : `添加企业`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    company,
    loading,
  }: {
    company: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    company,
    loading: loading.models.company,
  }),
)(Form.create<CompanyListProps>()(CompanyList));
