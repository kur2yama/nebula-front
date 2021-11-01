import { useEffect, useState } from 'react';
import dark from './dark.theme.less';
import darkCompact from './dark-compact.theme.less';
import light from './light.theme.less';
import lightCompact from './light-compact.theme.less';
import { Radio } from 'antd';

interface LazyStyle {
  use: () => void;
  unuse: () => void;
}

export type ThemeType = {
  value: string;
  label: string;
  styles: LazyStyle;
};

export const themes: ThemeType[] = [
  {
    value: 'light', // used as value in the select
    label: '浅色', // used as label in the select
    styles: light, // the style module
  },
  {
    value: 'lightCompact',
    label: '浅色(紧凑)',
    styles: lightCompact,
  },
  {
    value: 'dark',
    label: '暗色',
    styles: dark,
  },
  {
    value: 'darkCompact',
    label: '暗色紧凑',
    styles: darkCompact,
  },
];

const BackendThemes = () => {
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const foundTheme = themes.find((item) => item.value === currentTheme);
    const currentStyle = foundTheme ? foundTheme.styles : light;
    currentStyle.use();
    return () => currentStyle.unuse(); // 1. unapply the previous styling (if any)
  }, [currentTheme]);

  return (
    <div>
      <Radio.Group
        options={themes}
        value={currentTheme}
        onChange={(e) => setCurrentTheme(e.target.value)}
      />
    </div>
  );
};

export default BackendThemes;
