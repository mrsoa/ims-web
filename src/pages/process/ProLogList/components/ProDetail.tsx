import React, { useState } from "react";
import { Modal } from "antd";
import ReactJson from "react-json-view";

interface ProDetailProps {
  modalVisible: boolean;
  onCancel: () => void;
  proLog: Object;
}

const ProDetail: React.FC<ProDetailProps> = (props) => {
  const { modalVisible, onCancel, proLog } = props;

  //const [useResquest, setUseResquest] = useState({});
  //const [useResponse, setUseResponse] = useState({});

  let req = {};
  let res = {};

  const parse = (proLog) => {
    try {
      req = JSON.parse(proLog.data.params);
      res = JSON.parse(proLog.data.responseResult);
      return;
    } catch (e) {
      return;
    }
  };

  parse(proLog);

  return (
    <Modal
      destroyOnClose
      title="请求详情"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={900}
    >
      {/* {props.children} */}
      {/* <JsonResult result={json}></JsonResult> */}
      请求参数:
      <ReactJson theme="rjv_grey" collapsed={true} src={req} />
      响应结果:
      <ReactJson theme="rjv_grey" collapsed={true} src={res} />
    </Modal>
  );
};

export default ProDetail;
