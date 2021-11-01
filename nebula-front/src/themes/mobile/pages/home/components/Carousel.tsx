import { Carousel } from 'antd';
import { Image } from 'antd-mobile-v5';

type ContentType = {
  config: {
    key: string;
    title: string;
    cover?: string;
    link: string;
  };
};

type HomeCarouselProps = {
  dataSource?: ContentType[];
};

const HomeCarousel = (props: HomeCarouselProps) => {
  const { dataSource = [] } = props;

  return (
    <div>
      <Carousel>
        {dataSource.map((item) => (
          <Image src={item.config.cover || ''} key={item.config.key} />
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
