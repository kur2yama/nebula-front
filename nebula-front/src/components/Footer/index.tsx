import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const defaultMessage = `湖北新媒体集团研发部 Version:${APP_VERSION} Build: ${APP_BUILD_DATE}`;

  return (
    <DefaultFooter
      style={{ paddingBottom: 24 }}
      copyright={defaultMessage}
      links={[
        {
          key: 'nebula-cms',
          title: 'Nebula CMS',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'nebula-components',
          title: 'Nebula Components',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};
