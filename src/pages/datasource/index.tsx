import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Radio,
  Select,
  Result,
  Tag,
  message,
} from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { StateType } from './model';
import { DataBaseConnectionModel } from './data.d';
import styles from './style.less';
import Password from 'antd/lib/input/Password';
import request from "@/utils/request";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

interface DatasourceProps extends FormComponentProps {
  datasource: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface DatasourceState {
  visible: boolean;
  done: boolean;
  currentitem?: Partial<DataBaseConnectionModel>;
}

interface SearchCondition{
  pageSize:number|3;
  search:string;
  current:string|1;
}

class Datasource extends Component<
  DatasourceProps,
  DatasourceState
> {
  state: DatasourceState = { visible: false, done: false, currentitem: undefined,search:null};


  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  addBtn: HTMLButtonElement | undefined | null = undefined;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'datasource/fetch',
      payload: {
        count: 5,
      },
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      currentitem: undefined,
    });
  };

  showEditModal = (item: DataBaseConnectionModel) => {
    this.setState({
      visible: true,
      currentitem: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
    this.handlerSearch('');
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { currentitem } = this.state;
    const id = currentitem ? currentitem.id : '';

    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    form.validateFields((err: string | undefined, fieldsValue: DataBaseConnectionModel) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'datasource/submit',
        payload: { id, ...fieldsValue },
      });
    });
  };

  deleteItem = (id: string) => {
    const { dispatch } = this.props;
    request('/database/apidb/removeConnection', {
      method: 'POST',
      data:{id},
    }).then((res)=>{
      console.info(res);

      if(res.success){
        message.info(res.message);
        this.handlerSearch("");
        return;
      }
      message.error(res.data);
    });
  };

  /**
   * 处理查询
   */
  handlerSearch = (name:string|null)=>{
    console.info('开始查询了');
    const { dispatch } = this.props;
    name = name==""?null:name;
    dispatch({
      type: 'datasource/fetch',
      payload: {
        count:5 ,
        search:name,
        pageSize:this.props.datasource.pageSize,
        //pageSize:10,
        current:1,
      },
    });
  };


  /**
   * 开始
   * @param page
   */
  changePage = (pageQuery:SearchCondition) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'datasource/fetch',
      payload: {
        ...pageQuery,
        count:5 ,
      },
    })
  }

  /**
   *
   */
  onRadioGroupChange = (e:Event) =>{

    const { dispatch } = this.props;

    dispatch({
      type: 'datasource/fetch',
      payload: {
        dbtype: e.target.value,
      },
    });
  }


  formatColor = (color:string)=>{

    if("ORACLE" == color){
      return "magenta";
    }else if("ORACLE"){
      return "green";
    }else{
      return "#108ee9";
    }
  }


  handelChange(e:Event){
    this.setState({
      search:e.target.value
    })
  }


  getLogo= (type:any) => {
    return "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png";
  }


  /**
   * 测试连接
   * @param item
   */
  testConnection = (item: DataBaseConnectionModel) =>{
    //message.success('测试成功');
    const { dispatch } = this.props;
    dispatch({
      type: 'datasource/testConnection',
      payload: {
        ...item,
      },
    }).then((res)=>{
      if(res.success){
        message.success(res.message);
        return;
      }

      message.error(res.data);

    })

  }





  render() {
    const {
      datasource: { list },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { visible, done, currentitem = {}} = this.state;

    const editAndDelete = (key: string, currentitem: DataBaseConnectionModel) => {
      if (key === 'edit') this.testConnection(currentitem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除任务',
          content: '确定删除该任务吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentitem.id),
        });
      }
    };


    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const Info: React.FC<{
      title: React.ReactNode;
      value: React.ReactNode;
      bordered?: boolean;
    }> = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup onChange={(e) =>this.onRadioGroupChange(e)}  defaultValue="">
          <RadioButton value="">全部</RadioButton>
          <RadioButton value="MYSQL">MYSQL</RadioButton>
          <RadioButton value="ORACLE">ORACLE</RadioButton>
          <RadioButton value="ES">ES</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入"
          onSearch={(value) => this.handlerSearch(value)}
          onChange={this.handelChange.bind(this)}/>
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: this.props.datasource.pageSize,
      total: this.props.datasource.total
    };

    const ListContent = ({
      data: { owner, createdAt, percent, status ,user,modifyTime,dbtype,color},
    }: {
      data: DataBaseConnectionModel;
    }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>用户</span>
          <p>{user}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>修改时间</span>
          <p>{moment(modifyTime).format('YYYY-MM-DD HH:mm')}</p>
        </div>

        <div className={styles.listContentItem}>
          <span>类型</span>
          <p><Tag color={color}>{dbtype}</Tag></p>
        </div>
      </div>
    );

    const MoreBtn: React.FC<{
      item: DataBaseConnectionModel;
    }> = ({ item }) => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, item)}>
            <Menu.Item key="edit">编辑</Menu.Item>
            <Menu.Item key="delete">删除</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <DownOutlined />
        </a>
      </Dropdown>
    );

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
      <>
        <PageHeaderWrapper>
          <div className={styles.standardList}>
            <Card
              className={styles.listCard}
              bordered={false}
              title="数据源"
              style={{ marginTop: 24 }}
              bodyStyle={{ padding: '0 32px 40px 32px' }}
              extra={extraContent}
            >
              <Button
                type="dashed"
                style={{ width: '100%', marginBottom: 8 }}
                onClick={this.showModal}
                ref={component => {
                  // eslint-disable-next-line  react/no-find-dom-node
                  this.addBtn = findDOMNode(component) as HTMLButtonElement;
                }}
              >
                <PlusOutlined />
                添加
              </Button>
              <List
                size="large"
                rowKey="id"
                loading={loading}
                pagination={
                  {
                    current: this.props.datasource.current,
                    pageSize: this.props.datasource.pageSize,
                    total: this.props.datasource.total,
                    onChange:(page,pageSize) =>{
                      this.changePage({
                        current:page,
                        pageSize:pageSize,
                        search:this.state.search
                      });
                    }
                  }


                }
                dataSource={list}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <a
                        key="edit"
                        onClick={e => {
                          e.preventDefault();
                          this.testConnection(item);
                        }}
                      >
                        测试连接
                      </a>,
                      <MoreBtn key="more" item={item} />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png" shape="square" size="large" />}
                      title={<a href={item.href}>{item.name}</a>}
                      description={item.description}
                    />
                    <ListContent data={item} />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </PageHeaderWrapper>

        <Modal
          title={done ? null : `数据源${currentitem ? '编辑' : '添加'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </>
    );
  }
}

export default connect(
  ({
    datasource,
    loading,
  }: {
    datasource: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    datasource,
    loading: loading.models.datasource,
  }),
)(Form.create<DatasourceProps>()(Datasource));
