import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/rule', {
    params,
  });
}


/**
 * 查询数据
 * @param params 查询参数
 */
export async function queryTimerList(params?: TableListParams) {
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
  return request('/system/timerList', {
    method: 'POST',
    data: params,
  });
}


/**
 * 新增参数
 * @param params 
 */
export async function addTimer(params: TableListParams) {
  return request('/system/addTimer', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}


/**
 * 启用/停用定时任务信息
 * @param status 
 */
export async function changeStatus(status: any) {
  return request('/system/changeStatus', {
    method: 'POST',
    data: status
  });
}

/**
 * 删除定时定义
 * @param id 
 */
export async function deleteJobTimer(id: number) {
  return request('/system/deleteTimer', {
    method: 'POST',
    params: { id }
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
