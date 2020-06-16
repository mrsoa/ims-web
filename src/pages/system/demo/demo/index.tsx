import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import { Button, Card, List, Typography, Modal, Result, Input, Radio, Select } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { StateType } from './model';
import { CardListItemDataType } from './data.d';
import styles from './style.less';
import Password from 'antd/lib/input/Password';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

const { Paragraph } = Typography;
interface DemoProps {
  systemAnddemoAnddemo: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface DemoState {
  visible: boolean;
  done: boolean;
  currentitem?: Partial<CardListItemDataType>;
}

class Demo extends Component<
  DemoProps,
  DemoState
> {

  state: DemoState = { visible: false, done: false, currentitem: undefined,search:null};

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  addBtn: HTMLButtonElement | undefined | null = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemAnddemoAnddemo/fetch',
      payload: {
        count: 8,
      },
    });
  }

  showModal = () =>{
    this.setState({
      visible:true
    })
  }


  handleCancel = () =>{
    this.setState({
      visible:false
    })
  }


  handleOk = ()=>{
    console.info('success');

  }



  render() {
    const {
      systemAnddemoAnddemo: { list },
      loading,
    } = this.props;

    const {
      form: { getFieldDecorator },
    } = this.props;

    const { visible, done, currentitem = {}} = this.state;

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
    const nullData: Partial<CardListItemDataType> = {};


    const DemoForm = () => {
      const [form] = Form.useForm();

      React.useEffect(() => {
        form.setFieldsValue({
          username: 'Bamboo',
        });
      }, []);

      return (
        <Form form={form}>
          <Form.Item name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      );
    };

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            status="success"
            title="操作成功"
            subTitle="操作成功"
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
          <FormItem label="名称" {...this.formLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入名称' }],
              initialValue: currentitem.name,
            })(<Input placeholder="请输入" />)}
          </FormItem>

          <FormItem label="连接地址" {...this.formLayout}>
            {getFieldDecorator('url', {
              rules: [{ required: true, message: '请输入连接地址' }],
              initialValue: currentitem.url,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="账号" {...this.formLayout}>
            {getFieldDecorator('user', {
              rules: [{ required: true, message: '请输入账号' }],
              initialValue: currentitem.user,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="密码" {...this.formLayout}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
              initialValue: currentitem.password,
            })(<Password placeholder="请输入" />)}
          </FormItem>

          <FormItem label="数据库类型" {...this.formLayout}>
            {getFieldDecorator('dbtype', {
              rules: [{ required: true, message: '请选择数据库类型' }],
              initialValue: currentitem.dbtype,
            })(
              <Select placeholder="请选择">
                <SelectOption value="MYSQL">MYSQL</SelectOption>
                <SelectOption value="ORACLE">ORACLE</SelectOption>
                <SelectOption value="ES">ES</SelectOption>
              </Select>,
            )}
          </FormItem>
          <FormItem {...this.formLayout} label="连接描述">
            {getFieldDecorator('description', {
              rules: [{ message: '请输入至少五个字符的产品描述！', min: 5 }],
              initialValue: currentitem.description,
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
          </FormItem>
        </Form>
      );
    };


    return (
      <PageHeaderWrapper content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List<Partial<CardListItemDataType>>
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
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={<a>{item.title}</a>}
                        description={
                          <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                            {item.description}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}  onClick={this.showModal}>
                    <PlusOutlined /> 新增企业
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>

        <Modal
          title="新增企业"
          destroyOnClose={true}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          bodyStyle={{ padding: '28px 0 0' }}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    systemAnddemoAnddemo,
    loading,
  }: {
    systemAnddemoAnddemo: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    systemAnddemoAnddemo,
    loading: loading.models.systemAnddemoAnddemo,
  }),
)(Form.create<DemoProps>()(Demo));
