import {
  DefaultFooter,
  MenuDataItem,
  getMenuData,
  getPageTitle,
} from "@ant-design/pro-layout";
import { GithubOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import { Link } from "umi";
import React from "react";
import { connect } from "dva";
import SelectLang from "@/components/SelectLang";
import { ConnectProps, ConnectState } from "@/models/connect";
import logo from "../assets/logo.svg";
import styles from "./UserLayout.less";

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: "",
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>IMS</span>
              </Link>
            </div>
            <div className={styles.desc}>Inrerface Message Schedule</div>
          </div>
          {children}
        </div>
        <DefaultFooter
          copyright="2020 蚁安居研发中心出品"
          links={[
            {
              key: "蚁安居",
              title: "蚁安居",
              href: "http://www.51eaju.com",
              blankTarget: true,
            },
            {
              key: "github",
              title: <GithubOutlined />,
              href: "http://www.51eaju.com",
              blankTarget: true,
            },
            {
              key: "安居易",
              title: "安居易",
              href: "http://www.51eaju.com",
              blankTarget: true,
            },
          ]}
        />
      </div>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(
  UserLayout
);
