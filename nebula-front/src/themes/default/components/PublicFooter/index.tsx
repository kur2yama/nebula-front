import React from 'react';
import { useModel } from 'umi';
import styles from './style.less';
import { Col, Row, Space } from 'antd';
import {
  HomeFilled,
  MailFilled,
  MobileFilled,
  WeiboOutlined,
  WechatOutlined,
  QqOutlined,
  AlipayCircleOutlined,
} from '@ant-design/icons';

const PublicFooter: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <Row gutter={16}>
          <Col span={8}>
            <div>
              <div>
                <img src={initialState?.currentSite?.logo} alt="logo" style={{ width: 64 }} />
              </div>
              <div className={styles.footerTitle}>{initialState?.currentSite?.description}</div>
              <div>
                <Space size={16}>
                  <a>
                    <WeiboOutlined style={{ fontSize: 24 }} />
                  </a>
                  <a>
                    <WechatOutlined style={{ fontSize: 24 }} />
                  </a>
                  <a>
                    <QqOutlined style={{ fontSize: 24 }} />
                  </a>
                  <a>
                    <AlipayCircleOutlined style={{ fontSize: 24 }} />
                  </a>
                </Space>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.footerTitle}>链接</div>
            <div>
              <div className={styles.footerItem}>
                <a>关于我们</a>
              </div>
              <div className={styles.footerItem}>
                <a>欢迎使用</a>
              </div>
              <div className={styles.footerItem}>
                <a>Nebula CMS</a>
              </div>
              <div className={styles.footerItem}>
                <a>Nebula Components</a>
              </div>
              <div className={styles.footerItem}>
                <a>隐私条款</a>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.footerTitle}>联系信息</div>
            <div>
              <div className={styles.footerItem}>
                <div className={styles.footerItemLeft}>
                  <HomeFilled className={styles.footerItemIcon} />
                </div>
                <div className={styles.footerItemRight}>武昌区公正路9号</div>
              </div>
              <div className={styles.footerItem}>
                <div className={styles.footerItemLeft}>
                  <MailFilled className={styles.footerItemIcon} />
                </div>
                <div className={styles.footerItemRight}>
                  <div>nebula@cjyun.org</div>
                </div>
              </div>
              <div className={styles.footerItem}>
                <div className={styles.footerItemLeft}>
                  <MobileFilled className={styles.footerItemIcon} />
                </div>
                <div className={styles.footerItemRight}>199 9999 9999</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.bottomInner}>
          <Space>
            <span>{initialState?.currentSite?.config.profile.copyright}</span>
            <span>{initialState?.currentSite?.config.profile.icp}</span>
            <span>{initialState?.currentSite?.config.profile.policeIcp}</span>
            <span>Version: {APP_VERSION}</span>
            <span>Build: {APP_BUILD_DATE}</span>
            <span>Theme: {initialState?.currentSite?.config.profile.theme}</span>
          </Space>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
