import React from "react";
import { Modal } from "antd";
import JsonResult from "@/components/JsonFormat";

interface ProDetailProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const ProDetail: React.FC<ProDetailProps> = (props) => {
  const { modalVisible, onCancel } = props;

  const json = {
    cost: 1533,
    messageType:
      "com.sinoservices.dms.plan.service.impl.EtHdDispatchListManagerImpl.signDispatchList",
    methodName: "signDispatchList",
    processResult: {
      messages: ["操作成功！"],
      level: 3,
      messagesAsString: "操作成功！",
      data: [
        {
          etdlIsSupplement: "0",
          etdlId: 862256,
          creator: "49070",
          createTime: "2020-04-10 17:38:29",
          modifier: "150",
          modifyTime: "2020-04-11 09:14:36",
          recVer: 5,
          etdlNo: "DL20200410814818",
          etdlType: "05",
          etdlStatus: "80",
          etdlTime: "2020-04-10 17:38:29",
          etdlTeachnologistName: "朱海征（测试）",
          etdlTeachnologistNo: "YAJ20160707A901013",
          etdlTeachnologistTel: "15110272604",
          etdlDotName: "天津网点",
          etdlConsigneeName: "郭延红",
          etdlConsigneePhone: "18311098386",
          etdlConsigneeAddress: "天津天津市北辰区天津北辰区",
          etdlExplain: "买家备注:; 卖家备注:",
          etdlDispatchCount: "1",
          recStatus: 0,
          companyCode: "LMS0101",
          siteCode: "LMS0103",
          etdlDispatchRemake: "买家备注:; 卖家备注:",
          etdlSendTime: "2020-04-10 17:39:05",
          etdlSignTime: "2020-04-11 09:14:36",
          etdlDotCode: "TJ001",
          etdlVerificationCode: "16606",
          etdlPaySum: 2310.0,
          companyName: "天津分部",
          siteName: "天津服务平台",
          etdlIsCheck: 0,
          etdlTeachnologistType: "技师\u0026司机",
          etdlDispatchOperate: "郭艳红(测试)",
          etdlConsigneeProvinceCode: "112",
          etdlConsigneeProvinceName: "天津市",
          etdlConsigneeCityCode: "11201",
          etdlConsigneeCityName: "天津市辖区",
          etdlConsigneeDistrictCode: "1120113",
          etdlConsigneeDistrictName: "北辰区",
          etdlWorkGroupCode: "YAJ20160707A901013",
          etdlSupplierCode: "HP0000241",
          etdlSupplierName: "通用技师",
          etdlTmallBookNumber: 0,
          etdlWorkType: "02",
          etdlDispatchNo: "T2004100138439",
          etdlCompleteFalg: 0,
          etdlBillWeight: 81.0,
          etdlBillVolume: 0.24,
          etdlBillUnit: "2",
          etdlMinMileage: 37.63,
          etdlPlanVehicleCard: "津RQ2625",
          etdlVehicleType: "tjp0002",
          etdlAreaCode: "F00001559",
          etdlReturnFlag: "1",
          etdlBaiduApproach: "2",
          etdlSystemMileage: 37.63,
          etdlTransferDispatch: "0",
          etdlFeeApplyFalg: "0",
          etdlRefuseFlag: "0",
          etdlWeight: 0.0,
          etdlVolume: 0.243,
        },
      ],
      isSuccess: true,
    },
    className:
      "com.sinoservices.dms.plan.service.impl.EtHdDispatchListManagerImpl",
    time: "2020-04-11 09:14:37",
    params: {
      "java.util.List": [
        {
          etdlIsSupplement: "0",
          etdlId: 862256,
          creator: "49070",
          createTime: "2020-04-10 17:38:29",
          modifier: "150",
          modifyTime: "2020-04-11 09:14:36",
          recVer: 5,
          etdlNo: "DL20200410814818",
          etdlType: "05",
          etdlStatus: "80",
          etdlTime: "2020-04-10 17:38:29",
          etdlTeachnologistName: "朱海征（测试）",
          etdlTeachnologistNo: "YAJ20160707A901013",
          etdlTeachnologistTel: "15110272604",
          etdlDotName: "天津网点",
          etdlConsigneeName: "郭延红",
          etdlConsigneePhone: "18311098386",
          etdlConsigneeAddress: "天津天津市北辰区天津北辰区",
          etdlExplain: "买家备注:; 卖家备注:",
          etdlDispatchCount: "1",
          recStatus: 0,
          companyCode: "LMS0101",
          siteCode: "LMS0103",
          etdlDispatchRemake: "买家备注:; 卖家备注:",
          etdlSendTime: "2020-04-10 17:39:05",
          etdlSignTime: "2020-04-11 09:14:36",
          etdlDotCode: "TJ001",
          etdlVerificationCode: "16606",
          etdlPaySum: 2310.0,
          companyName: "天津分部",
          siteName: "天津服务平台",
          etdlIsCheck: 0,
          etdlTeachnologistType: "技师\u0026司机",
          etdlDispatchOperate: "郭艳红(测试)",
          etdlConsigneeProvinceCode: "112",
          etdlConsigneeProvinceName: "天津市",
          etdlConsigneeCityCode: "11201",
          etdlConsigneeCityName: "天津市辖区",
          etdlConsigneeDistrictCode: "1120113",
          etdlConsigneeDistrictName: "北辰区",
          etdlWorkGroupCode: "YAJ20160707A901013",
          etdlSupplierCode: "HP0000241",
          etdlSupplierName: "通用技师",
          etdlTmallBookNumber: 0,
          etdlWorkType: "02",
          etdlDispatchNo: "T2004100138439",
          etdlCompleteFalg: 0,
          etdlBillWeight: 81.0,
          etdlBillVolume: 0.24,
          etdlBillUnit: "2",
          etdlMinMileage: 37.63,
          etdlPlanVehicleCard: "津RQ2625",
          etdlVehicleType: "tjp0002",
          etdlAreaCode: "F00001559",
          etdlReturnFlag: "1",
          etdlBaiduApproach: "2",
          etdlSystemMileage: 37.63,
          etdlTransferDispatch: "0",
          etdlFeeApplyFalg: "0",
          etdlRefuseFlag: "0",
          etdlWeight: 0.0,
          etdlVolume: 0.243,
        },
      ],
    },
    operatorId: "150",
  };

  return (
    <Modal
      destroyOnClose
      title="请求详情"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {/* {props.children} */}
      <JsonResult result={json}></JsonResult>
    </Modal>
  );
};

export default ProDetail;
