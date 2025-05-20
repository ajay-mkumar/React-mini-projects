import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";

const Photo = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    afterChange: (index) => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentSlide(index);
        setFadeIn(true);
      }, 50); // Short delay to reset animation
    },
  };

  // Clone the children and add animation class to the current one
  const slides = children.map((child, index) =>
    index === currentSlide
      ? {
          ...child,
          props: {
            ...child.props,
            className: `${child.props.className || ""} ${
              fadeIn ? "fade-in" : ""
            }`,
          },
        }
      : child
  );

  return <Slider {...settings}>{slides}</Slider>;
};

export default Photo;
