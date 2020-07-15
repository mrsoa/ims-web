import { DownOutlined, PlusOutlined, InboxOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Row,
  Select,
  Result,
  message,
  Upload,
} from "antd";
import React, { Component } from "react";

import { Dispatch } from "redux";
import { FormComponentProps } from "@ant-design/compatible/es/form";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import { findDOMNode } from "react-dom";
import moment from "moment";
import { StateType } from "./model";
import { unDeploy } from "./service";
import { BasicListItemDataType, ProcessUnitModel } from "./data.d";
import styles from "./style.less";
import request from "@/utils/request";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

interface ProcessListProps extends FormComponentProps {
  processAndProcessList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface ProcessListState {
  visible: boolean;
  done: boolean;
  current?: Partial<ProcessUnitModel>;
}

class ProcessList extends Component<ProcessListProps, ProcessListState> {
  state: ProcessListState = {
    visible: false,
    done: false,
    current: undefined,
    fileName: undefined,
    fileLocation: undefined,
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  addBtn: HTMLButtonElement | undefined | null = undefined;

  componentDidMount() {
    this.loadlist();
  }

  loadlist = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "processAndProcessList/fetch",
      payload: {
        currentPage: this.props.processAndProcessList.currentPage,
        pageSize: this.props.processAndProcessList.pageSize,
      },
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = (item: BasicListItemDataType) => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
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
    const { current } = this.state;
    const id = current ? current.id : "";

    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    form.validateFields(
      (err: string | undefined, fieldsValue: ProcessUnitModel) => {
        fieldsValue.fileName = this.state.fileName;
        fieldsValue.fileLocation = this.state.fileLocation;
        console.info(fieldsValue);
        if (err) return;
        this.setState({
          done: true,
        });
        dispatch({
          type: "processAndProcessList/updateUnit",
          payload: { id, ...fieldsValue },
        });
      }
    );
  };

  deleteItem = (id: string) => {
    const { dispatch } = this.props;
    dispatch({
      type: "processAndProcessList/submit",
      payload: { id },
    });
  };

  /**
   * 部署功能
   */
  deploy = (item: ProcessUnitModel) => {
    if (item.state === "RUNNING") {
      message.error("部署状态无法再次部署!!!");
      return;
    } else {
      request("/process/deploy", {
        method: "POST",
        data: item,
      }).then((res) => {
        if (res.success) {
          message.success(res.message, 10);
        } else {
          message.error(res.message, 10);
        }
      });
      this.loadlist();
    }
  };

  unDeploy = (item: ProcessUnitModel) => {
    if (!(item.state === "RUNNING")) {
      message.error("处理单元未部署、无需卸载");
      return;
    } else {
      request("/process/unDeploy", {
        method: "POST",
        data: item,
      }).then((res) => {
        if (res.success) {
          message.success(res.message, 10);
        } else {
          message.error(`${res.message},${res.data}`, 10);
        }
      });
      this.loadlist();
    }
  };

  /**
   * 文件上传操作
   */
  handleOnChange = (info: any) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      console.info(this.state);
      this.setState({
        fileName: info.file.name,
        fileLocation: info.file.response.data,
      });
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const {
      processAndProcessList: { list },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { visible, done, current = {} } = this.state;

    const editAndDelete = (key: string, currentItem: ProcessUnitModel) => {
      if (key === "undeploy") {
        this.unDeploy(currentItem);
      }
      if (key === "edit") this.showEditModal(currentItem);
      else if (key === "delete") {
        Modal.confirm({
          title: "删除任务",
          content: "确定删除该任务吗？",
          okText: "确认",
          cancelText: "取消",
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : {
          okText: "保存",
          onOk: this.handleSubmit,
          onCancel: this.handleCancel,
        };

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
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="waiting">等待中</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入"
          onSearch={() => ({})}
        />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: this.props.processAndProcessList.pageSize,
      total: this.props.processAndProcessList.total,
    };

    const ListContent = ({
      data: {
        state,
        createTime,
        startDriver,
        handleType,
        environment,
        fileName,
        modifyTime,
        processCode,
      },
    }: {
      data: ProcessUnitModel;
    }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>单元编码</span>
          <p>{processCode}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>文件名称</span>
          <p>{fileName}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>运行环境</span>
          <p>{environment}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>状态</span>
          <p>{state}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>创建时间</span>
          <p>{moment(createTime).format("YYYY-MM-DD HH:mm")}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>修改时间</span>
          <p>{moment(modifyTime).format("YYYY-MM-DD HH:mm")}</p>
        </div>
      </div>
    );

    const MoreBtn: React.FC<{
      item: BasicListItemDataType;
    }> = ({ item }) => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, item)}>
            <Menu.Item key="edit">编辑</Menu.Item>
            <Menu.Item key="undeploy">卸载</Menu.Item>
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
          <FormItem label="单元编码" {...this.formLayout}>
            {getFieldDecorator("processCode", {
              rules: [{ required: true, message: "请输入单元编码" }],
              initialValue: current.processCode,
            })(<Input placeholder="请输入" disabled />)}
          </FormItem>
          <FormItem label="单元名称" {...this.formLayout}>
            {getFieldDecorator("processName", {
              rules: [{ required: true, message: "请输入单元名称" }],
              initialValue: current.processName,
            })(<Input placeholder="请输入" disabled />)}
          </FormItem>

          <FormItem label="运行环境" {...this.formLayout}>
            {getFieldDecorator("environment", {
              rules: [{ required: true, message: "请输入单元名称" }],
              initialValue: current.environment,
            })(
              <Select placeholder="请选择">
                <Select.Option value="DEV">DEV</Select.Option>
                <Select.Option value="TEST">TEST</Select.Option>
                <Select.Option value="PRE_PRDO">PRE_PRDO</Select.Option>
                <Select.Option value="PROD">PROD</Select.Option>
              </Select>
            )}
          </FormItem>

          <Form.Item {...this.formLayout} label="上传单元">
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={this.normFile}
              noStyle
            >
              <Upload.Dragger
                name="uploadFile"
                headers={{
                  Authorization: `YIANJU ${localStorage.getItem("token")}`,
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
          <FormItem {...this.formLayout} label="单元描述">
            {getFieldDecorator("description", {
              rules: [{ message: "请输入至少五个字符的单元描述！", min: 5 }],
              initialValue: current.description,
            })(<TextArea rows={4} placeholder="请输入至少单元描述" />)}
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
              title="基本列表"
              style={{ marginTop: 24 }}
              bodyStyle={{ padding: "0 32px 40px 32px" }}
              extra={extraContent}
            >
              <Button
                type="dashed"
                style={{ width: "100%", marginBottom: 8 }}
                onClick={this.showModal}
                ref={(component) => {
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
                pagination={paginationProps}
                dataSource={list}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <a
                        key="edit"
                        onClick={(e) => {
                          e.preventDefault();
                          //this.showEditModal(item);
                          this.deploy(item);
                        }}
                      >
                        部署
                      </a>,
                      <MoreBtn key="more" item={item} />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src="https://mrduan.oss-cn-beijing.aliyuncs.com/java.png"
                          shape="square"
                          size="large"
                        />
                      }
                      title={<a href={item.processName}>{item.processName}</a>}
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
          title={done ? null : `任务${current ? "编辑" : "添加"}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: "72px 0" } : { padding: "28px 0 0" }}
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
    processAndProcessList,
    loading,
  }: {
    processAndProcessList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    processAndProcessList,
    loading: loading.models.processAndProcessList,
  })
)(Form.create<ProcessListProps>()(ProcessList));
