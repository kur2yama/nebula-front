import React, { useMemo } from 'react';
import { Carousel } from 'antd';
import type { MediaType } from '@nebula/design';
import styles from './style.less';

export type GalleryProps = {
  data?: MediaType[];
};

const Gallery: React.FC<GalleryProps> = (props) => {
  const { data } = props;

  const renderList = useMemo(() => {
    if (data && data.length > 0) {
      return data.map((item, index) => {
        const key = `gallery=${index}`;
        switch (item.fileType) {
          case 'video':
            return <video src={item.url} key={key} className={styles.video} controls />;
          case 'audio':
            return <audio src={item.url} key={key} />;
          case 'image':
            return <img src={item.url} alt={key} key={key} className={styles.image} />;
          default:
            return (
              <a href={item.url} target="_blank" key={key}>
                {item.fileName}
              </a>
            );
        }
      });
    }
    return null;
  }, [data]);

  if (!data || data.length < 1) {
    return null;
  }

  return (
    <section className={styles.galleryContainer}>
      <Carousel
        dots={{
          className: `slick-thumb`,
        }}
        customPaging={(index) => {
          return (
            <a>
              <img src={data[index].preview} alt="preview" width={60} />
            </a>
          );
        }}
      >
        {renderList}
      </Carousel>
    </section>
  );
};

export default Gallery;
