import request from '@/utils/request';
import { TableListParams, InterfaceConfigQueryModel } from './data.d';

export async function interfaceConfigList(params?: InterfaceConfigQueryModel) {
  return request('/database/interfaceConfig/interfaceConfigList', {
    method: 'POST',
    data:params
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

/**
 * 添加接口设置
 * @param params 
 */
export async function saveInterfaceConfig(params: TableListParams){
  return request('/database/interfaceConfig/save',{
    method:'POST',
    data:params
  });
}



export async function updateRule(params: TableListParams) {
  return request('/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
