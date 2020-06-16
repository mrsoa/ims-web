export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface DataBaseConnectionModel {
  id: string;
  name:string;
  user:string;
  url:string;
  password:string;
  modifyTime:string;
  modifier:number;
  description:string;
  dbtype:string;
  creator:number;
  createTime:number;
  color:string;


  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  //description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
}
