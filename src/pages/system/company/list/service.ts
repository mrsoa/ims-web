import request from '@/utils/request';
import { CompnayModel } from './data';

export async function queryFakeList(params: { count: number }) {
  return request('/system/company/findAllCompany', {
    method:'POST',
    data:params,
  });
}

/**
 * 保存企业
 * @param params 企业信息
 */
export async function saveCompany(params:CompnayModel){
  return request('/system/company/saveCompany',{
    method:'POST',
    data:params,
  });
}
