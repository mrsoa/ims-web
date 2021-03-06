import request from "@/utils/request";
import { BasicListItemDataType } from "./data.d";

interface ParamsType extends Partial<BasicListItemDataType> {
  count?: number;
}

export async function queryFakeList(params: ParamsType) {
  return request("/fake_list", {
    params,
  });
}

export async function apiList(params: ParamsType) {
  console.log(params);
  return request("/system/apiList", {
    method: "POST",
    data: params,
  });
}

export async function removeFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request("/fake_list", {
    method: "POST",
    params: {
      count,
    },
    data: {
      ...restParams,
      method: "delete",
    },
  });
}

export async function addFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request("/fake_list", {
    method: "POST",
    params: {
      count,
    },
    data: {
      ...restParams,
      method: "post",
    },
  });
}

export async function updateFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request("/fake_list", {
    method: "POST",
    params: {
      count,
    },
    data: {
      ...restParams,
      method: "update",
    },
  });
}
