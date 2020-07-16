import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Dropdown,
  Menu,
  message,
  Result,
  Modal,
  Alert,
} from "antd";
import React, { useState, useRef } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table";
import CreateForm from "./components/CreateForm";
import UpdateForm, { FormValueType } from "./components/UpdateForm";
import { TableListItem } from "./data.d";
import {
  interfaceConfigList,
  updateRule,
  addRule,
  removeRule,
  saveInterfaceConfig,
} from "./service";
import request from "@/utils/request";

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading("正在添加");
  try {
    //const response = await saveInterfaceConfig(fields);
    const response = saveInterfaceConfig(fields);
    message.success("添加成功");
    hide();
    return true;
  } catch (error) {
    hide();
    message.error("添加失败请重试！");
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading("正在配置");
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success("配置成功");
    return true;
  } catch (error) {
    hide();
    message.error("配置失败请重试！");
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading("正在删除");
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success("删除成功，即将刷新");
    return true;
  } catch (error) {
    hide();
    message.error("删除失败，请重试");
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sorter, setSorter] = useState({});
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(
    false
  );
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: "接口编码",
      dataIndex: "serviceCode",
    },
    {
      title: "接口名称",
      dataIndex: "serviceName",
    },
    {
      title: "数据源",
      dataIndex: "dbConName",
    },
    {
      title: "调用次数",
      dataIndex: "callNo",
      sorter: true,
      renderText: (val: string) => `1万`,
    },
    {
      title: "状态",
      dataIndex: "status",
      valueEnum: {
        0: { text: "关闭", status: "Default" },
        1: { text: "运行中", status: "Processing" },
        2: { text: "已上线", status: "Success" },
        3: { text: "异常", status: "Error" },
      },
    },
    {
      title: "上次调度时间",
      dataIndex: "updatedAt",
      sorter: true,
      valueType: "dateTime",
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            配置
          </a>
          <Divider type="vertical" />
          <a
            onClick={
              //(record)=>getSqlText(record)
              () => {
                //message.success(record.sqlText,10);
                Modal.success({
                  title: "SQL脚本",
                  content: record.sqlText,
                });
              }
            }
          >
            查看脚本
          </a>
        </>
      ),
    },
  ];

  const queryList = (params: any) => {
    const response = interfaceConfigList(params);
    return response;
  };

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        onChange={(_, _filter, _sorter) => {
          setSorter(`${_sorter.field}_${_sorter.order}`);
        }}
        params={{
          sorter,
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === "remove") {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>{" "}
            项&nbsp;&nbsp;
            <span>服务调用次数总计0万</span>
          </div>
        )}
        request={(params) => queryList(params)}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          console.info(success);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
