import React from 'react';
import { Input } from 'antd';
import styles from './style.less';

const Home: React.FC = () => {
  return (
    <section className={styles.homeContainer}>
      <section className={styles.homeInner}>
        <div style={{ width: '40%' }}>
          <Input.Search placeholder="请输入" size="large" />
        </div>
      </section>
    </section>
  );
};

export default Home;
