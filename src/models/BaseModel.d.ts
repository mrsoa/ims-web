
export interface BaseModel {

  id:number,

  /**
   * 创建时间
   */
  createTime:Date,

  /**
   * 创建人
   */
  creator:number,

  /**
   * 修改人
   */
  modifier:number,

  /**
   * 修改时间
   */
  modifyTime:Date,

  /**
   * 版本号
   */
  recVer:number,

  /**
   * 逻辑删除标志：0正常，1删除
   */
  recStatus:0|1,

  /**
   * 企业id
   */
  companyId:string;

  /**
   * 企业名称
   */
  companyName:string,
  
}
