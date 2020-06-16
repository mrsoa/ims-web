export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface CompnayModel{

  id:number;

  /**
   * 创建时间
   */
  createTime:Date;

  /**
   * 创建人
   */
  creator:number;

  /**
   * 修改人
   */
  modifier:number;

  /**
   * 修改时间
   */
  modifyTime:Date;

  /**
   * 版本号
   */
  recVer:number;

  /**
   * 逻辑删除标志：0正常，1删除
   */
  recStatus:0|1;

  /**
   * 企业id
   */
  companyId:string;

  /**
   * 企业名称
   */
  companyName:string;

  /**
     * 企业登录账号ID
     */
    string: managerId;

    /**
     * 当前版本
     */
    string: version;

    /**
     * 续期时间
     */
    Date: renewalDate;

    /**
     * 到期时间
     */
    Date: expirationDate;

    /**
     * 公司地区
     */
    String: companyArea;

    /**
     * 公司地址
     */
    string: companyAddress;

    /**
     * 营业执照-图片ID
     */
    string: businessLicenseId;

    /**
     * 法人代表
     */
    string: legalRepresentative;

    /**
     * 公司电话
     */
    string: companyPhone;

    /**
     * 邮箱
     */
    string: mailbox;

    /**
     * 公司规模
     */
    string: companySize;

    /**
     * 所属行业
     */
    string: industry;

    /**
     * 备注
     */
    string: remarks;

    /**
     * 审核状态
     */
    string: auditState;

    /**
     * 状态
     */
    number: state;

    /**
     * 当前余额
     */
    number: balance;

    /**
     * 企业logo
     */
    string: logo;
}
