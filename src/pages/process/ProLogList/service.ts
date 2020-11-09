import request from "@/utils/request";
import { TableListParams } from "./data.d";

export async function queryRule(params?: TableListParams) {
  console.log('参数信息为：',params);
  if(params.key==undefined && params.businessKey==undefined && params.createTimeFrom ===undefined && params.createTimeTo===undefined && params.functionCode===undefined && params.status===undefined){
    console.log("没有条件无需查询");
    return {};
  }else{
    console.log('有查询条件加载数据');
    return request("/process/queryProLog", {
      method: "POST",
      data: params, 
    });
  }
}

export async function getById(id: number) {
  return request("/process/getLogById", {
    method: "POST",
    params: { id },
  });
}

export async function resetProcess(id: number) {
  return request("/process/resetProcess", {
    method: "POST",
    params: { id },
  });
}

export async function removeRule(params: { key: number[] }) {
  return request("/api/rule", {
    method: "POST",
    data: {
      ...params,
      method: "delete",
    },
  });
}

export async function addRule(params: TableListParams) {
  return request("/api/rule", {
    method: "POST",
    data: {
      ...params,
      method: "post",
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request("/api/rule", {
    method: "POST",
    data: {
      ...params,
      method: "update",
    },
  });
}
