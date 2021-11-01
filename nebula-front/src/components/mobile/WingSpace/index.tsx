import React, { useMemo } from 'react';

export type SizeType = 'small' | 'normal' | 'large';

export type WingSpaceProps = {
  className?: string;
  size?: SizeType | number;
  style?: React.CSSProperties;
};

const WingSpace: React.FC<WingSpaceProps> = (props) => {
  const { children, className, style, size } = props;
  const currentSize = useMemo(() => {
    if (typeof size === 'number') {
      return size;
    }
    switch (size) {
      case 'small':
        return 6;
      case 'large':
        return 32;
      case 'normal':
      default:
        return 16;
    }
  }, [size]);
  return (
    <div
      className={className}
      style={{
        ...style,
        paddingLeft: currentSize,
        paddingRight: currentSize,
      }}
    >
      {children}
    </div>
  );
};

export default WingSpace;
