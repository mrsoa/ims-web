import { Divider, message, Input } from "antd";
import React, { useState, useRef } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table";

import CreateForm from "./components/CreateForm";
import { TableListItem } from "./data.d";
import { queryRule, addRule, getById, resetProcess } from "./service";
import ProDetail from "./components/ProDetail";
import HandleResult from "./components/HandleResult";

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading("正在添加");
  try {
    await addRule({ ...fields });
    hide();
    message.success("添加成功");
    return true;
  } catch (error) {
    hide();
    message.error("添加失败请重试！");
    return false;
  }
};

/**
 *
 * @param id 获取日志明细信息
 */
const getLogById = async (id: number) => {
  return await getById(id);
};

const reset = async (id: number) => {
  return await resetProcess(id);
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const [proLogDetailModalVisible, handleProLogDetailModalVisible] = useState<
    boolean
  >(false);

  const [resultModalVisible, handleResultModalVisible] = useState<boolean>(
    false
  );

  const [proDetail, setProDetail] = useState({});

  const [useHandleResult, setUseHandleResult] = useState({});

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: "主键",
      dataIndex: "businessKey",
      hideInSearch: true,
    },
    {
      title: "主键",
      dataIndex: "key",
      hideInForm: true,
      hideInSearch: false,
      hideInTable: true,
    },
    {
      title: "单元编码",
      dataIndex: "functionCode",
    },
    {
      title: "开始时间",
      valueType: "dateTime",
      dataIndex: "createTimeFrom",
      hideInForm: true,
      hideInSearch: false,
      hideInTable: true,
    },
    {
      title: "结束时间",
      valueType: "dateTime",
      dataIndex: "createTimeTo",
      hideInForm: true,
      hideInSearch: false,
      hideInTable: true,
    },
    {
      title: "尝试次数",
      dataIndex: "tryed",
      hideInSearch: true,
    },
    {
      title: "结果码",
      dataIndex: "returnCode",
    },

    {
      title: "状态",
      dataIndex: "status",
      hideInForm: true,
      valueEnum: {
        1: { text: "成功", status: "Success" },
        0: { text: "失败", status: "Error" },
      },
    },
    {
      title: "发生时间",
      dataIndex: "createTime",
      sorter: true,
      valueType: "dateTime",
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => (
        <>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              const res = await getLogById(record.id);
              setProDetail(res);
              handleProLogDetailModalVisible(true);
            }}
          >
            查看详情
          </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              const res = await reset(record.id);
              console.log(res);
              setUseHandleResult(res);
              handleResultModalVisible(true);
            }}
          >
            重试
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        // toolBarRender={(action, { selectedRows }) => [
        //   <Button type="primary" onClick={() => handleModalVisible(true)}>
        //     <PlusOutlined /> 新建
        //   </Button>,
        //   selectedRows && selectedRows.length > 0 && (
        //     <Dropdown
        //       overlay={
        //         <Menu
        //           onClick={async (e) => {
        //             if (e.key === "remove") {
        //               await handleRemove(selectedRows);
        //               action.reload();
        //             }
        //           }}
        //           selectedKeys={[]}
        //         >
        //           <Menu.Item key="remove">批量删除</Menu.Item>
        //           <Menu.Item key="approval">批量审批</Menu.Item>
        //         </Menu>
        //       }
        //     >
        //       <Button>
        //         批量操作 <DownOutlined />
        //       </Button>
        //     </Dropdown>
        //   ),
        // ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>{" "}
            项&nbsp;&nbsp;
            <span>
              {/* 服务调用次数总计{" "} */}
              {/* {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万 */}
            </span>
          </div>
        )}
        request={(params, sorter, filter) =>
          queryRule({ ...params, sorter, filter })
        }
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>

      <ProDetail
        onCancel={() => handleProLogDetailModalVisible(false)}
        modalVisible={proLogDetailModalVisible}
        proLog={proDetail}
      ></ProDetail>

      <HandleResult
        onCancel={() => handleResultModalVisible(false)}
        modalVisible={resultModalVisible}
        result={useHandleResult}
      ></HandleResult>
    </PageHeaderWrapper>
  );
};

export default TableList;
