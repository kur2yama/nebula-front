import { Grid } from 'antd-mobile-v5';
import { ChromeFilled, GitlabFilled, WindowsFilled } from '@ant-design/icons';
import styles from '../style.less';

const GridNav = () => {
  return (
    <Grid columns={3} gap={8} className={styles.gridContainer}>
      <Grid.Item className={styles.gridItem}>
        <WindowsFilled />
      </Grid.Item>
      <Grid.Item className={styles.gridItem}>
        <ChromeFilled />
      </Grid.Item>
      <Grid.Item className={styles.gridItem}>
        <GitlabFilled />
      </Grid.Item>
    </Grid>
  );
};

export default GridNav;
