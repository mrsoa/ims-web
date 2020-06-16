/**
 * 企业树
 */
import {BaseModel} from "@/models/BaseModel";

export interface CompanyTree {

  id:number,
  title:string,
  key:string,
  isLeaf:boolean,

}


/**
 * 企业信息
 */
export interface Company extends BaseModel{
  /**
   * 企业登录账号ID
   */
  managerId:string,

  /**
   * 当前版本
   */
  version:string,

  /**
   * 续期时间
   */
  renewalDate:Date,

  /**
   * 到期时间
   */
  expirationDate:Date,

  /**
   * 公司地区
   */
  companyArea:string,

  /**
   * 公司地址
   */
  companyAddress:string,

  /**
   * 营业执照-图片ID
   */
  businessLicenseId:string,

  /**
   * 法人代表
   */
  legalRepresentative:string,

  /**
   * 公司电话
   */
  companyPhone:string,

  /**
   * 邮箱
   */
  mailbox:string,

  /**
   * 公司规模
   */
  companySize:string,

  /**
   * 所属行业
   */
  industry:string,

  /**
   * 备注
   */
  remarks:string,

  /**
   * 审核状态
   */
  auditState:string,

  /**
   * 状态
   */
  state:number,

  /**
   * 当前余额
   */
  balance:number,
}
