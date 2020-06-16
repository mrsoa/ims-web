import request from '@/utils/request';
import { DataBaseConnectionModel } from './data.d';

interface ParamsType extends Partial<DataBaseConnectionModel> {
  count?: number;
  search?:string;
}

interface ParamsTypes {
  count?: number;
  search?:string|null;
}

export async function queryFakeList(params: ParamsTypes) {
  console.info("上面的这个查询执行了");
  return request('/database/apidb/databasesList', {
    method: 'POST',
    data:params,
  });
}

export async function removeFakeList(params: ParamsType) {
  const { ...restParams } = params;
  return request('/database/apidb/removeConnection', {
    method: 'POST',
    data: {
      ...restParams,
    },
  });
}

export async function addFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

/**
 * 添加
 * @param params
 */
export async function addConnection(params: ParamsType) {
    return request('/database/apidb/saveConnection',{
        method:'POST',
        data:params
      },
    );
}

/**
 * 测试数据库连接
 * @param params
 */
export async function testConnection(params: ParamsType){
  return request('/database/apidb/testConnection',{
      method:'POST',
      data:params
    },
  );
}


export async function updateFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'update',
    },
  });
}
