import request from '@/utils/request';
import { BasicListItemDataType, ProcessUnitModel } from './data.d';

interface ParamsType extends Partial<BasicListItemDataType> {
  count?: number;
}

interface ProcessUnit extends Partial<ProcessUnitModel>{
  count?: number;
}

export async function queryFakeList(params: ProcessUnit) {
  return request('/process/processUnitList', {
    method:'POST',
    data:params,
  });
}

export async function deploy(params: ProcessUnit) {
  return request('/process/deploy', {
    method:'POST',
    data:params,
  });
}

export async function unDeploy(params: ProcessUnit) {
  return request('/process/unDeploy', {
    method:'POST',
    data:params,
  });
}

export async function updateUnit(params: ProcessUnit){
  return request('/process/updateUnit', {
    method:'POST',
    data:params,
  });
}

export async function removeFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request('/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request('/fake_list', {
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

export async function updateFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request('/fake_list', {
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
