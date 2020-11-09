import React, { useState } from "react";
import { Modal, Result, Button } from "antd";

/**
 * 定义结果属性
 */
interface ResultProps {
  modalVisible: boolean;
  onCancel: () => void;
  result: Object;
}

const HandleResult: React.FC<ResultProps> = (props) => {
  const { modalVisible, onCancel, result } = props;

  let status = "warning";
  if (result && result.success) {
    status = "success";
  }

  return (
    <Modal
      destroyOnClose
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={800}
    >
      <Result
        status={status}
        title={result && result.message ? result.message : "操作失败"}
        subTitle="重试完成"
        extra={[
          <Button type="primary" key="console" onClick={() => onCancel()}>
            关 闭
          </Button>,
        ]}
      >
        {JSON.stringify(result)}
      </Result>
    </Modal>
  );
};

export default HandleResult;
