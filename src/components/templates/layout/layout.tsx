import { PropsWithChildren, useState } from "react";
import { Layout as AntLayout, Button, Menu, MenuProps, Space } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import styles from "./layout.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const { Header, Footer, Sider, Content } = AntLayout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  link: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key: link,
    icon,
    children,
    label: <Link href={link}>{label}</Link>,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/", <PieChartOutlined />),
  getItem("Accounts", "/account", <DesktopOutlined />),
  getItem("Transactions", "/transaction", <ContainerOutlined />),
];

export const Layout = (props: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false);
  const { route } = useRouter();

  return (
    <AntLayout>
      <Sider
        className={styles.sidebarNav}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
          }}
        />
        <Menu
          className={styles.menuNav}
          defaultSelectedKeys={["1"]}
          selectedKeys={[route]}
          mode="inline"
          items={items}
        />
      </Sider>
      <main className={styles.main}>
        <AntLayout>
          <Content className={styles.content}>{props.children}</Content>
        </AntLayout>
      </main>
    </AntLayout>
  );
};
