import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  console.log(params);
  const filter = params?.filter as Object;
  if (Object.keys(filter).length == 0) {
    delete params?.filter;
  }

  const sorter = params?.sorter as Object;
  if (Object.keys(sorter).length == 0) {
    delete params?.sorter;
  }
  return request('/api/rule', {
    params,
  });
}

/**
 * 查询参数列表
 * @param params 
 */
export async function queryJob(params?: TableListParams) {

  if (params?.filter) {
    const filter = params?.filter as Object;
    if (Object.keys(filter).length == 0) {
      delete params?.filter;
    }
  }

  if (params?.sorter) {
    const sorter = params?.sorter as Object;
    if (Object.keys(sorter).length == 0) {
      delete params?.sorter;
    }
  }


  return request('/system/jobDefineList', {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除job定义
 * @param id jobId
 */
export async function removeJobDefine(id: number) {
  return request('/system/removeJobDefine', {
    method: 'POST',
    params: id,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
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
