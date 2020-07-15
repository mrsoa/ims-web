import request from "@/utils/request";
import { ApiContentModel } from "./data.d";

export async function saveApiContent(params: ApiContentModel) {
  console.log("参数信息为：", params);
  return request("/system/apiContent/saveApiContent", {
    method: "POST",
    data: params,
  });
}
