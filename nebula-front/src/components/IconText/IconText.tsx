import React from 'react';

export type IconTextProps = {
  icon?: React.ReactNode;
  text: string | number | React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const IconText: React.FC<IconTextProps> = (props) => {
  const { icon, text, style, className } = props;
  return (
    <div className={className} style={style}>
      {icon ? <span style={{ marginRight: 6 }}>{icon}</span> : null}
      <span>{text}</span>
    </div>
  );
};

export default IconText;
