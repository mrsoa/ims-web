import request from '@/utils/request';
import { TableListParams } from './data.d';

// 列表
export async function getProFunctionList(params?: TableListParams) {
  return request('/process/getProFunctionList', {
    method:'POST',
    data:params,
  });
}

// 处理单元下拉框
export async function processUnitList(params?: TableListParams) {
  return request('/process/processUnitList', {
    method:'POST',
    data:params,
  });
}


export async function deleteProFunction(params: { id: number }) {
  return request('/process/deleteProFunction', {
    method: 'POST',
    data: {
      id:params
    },
  });
}

export async function saveProFunction(params: TableListParams) {
  return request('/process/saveProFunction', {
    method: 'POST',
    data: params
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
