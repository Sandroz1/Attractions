import React, { useState, useEffect } from "react";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "/assets/image/slider2.svg",
    "/assets/image/sochi.svg",
    "/assets/image/slider1.svg",
    "/assets/image/slider3.svg",
  ];

  const visibleSlides = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev + 1 > images.length - visibleSlides) return 0;
        return prev + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, visibleSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev + 1 > images.length - visibleSlides) return 0;
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (prev - 1 < 0) return images.length - visibleSlides;
      return prev - 1;
    });
  };

  return (
    <div className="slider">
      <div className="slider__container">
        <div
          className="slider__line"
          style={{
            transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)`,
          }}
        >
          {images.map((src, index) => (
            <div key={index} className="slider__slide">
              <img src={src} alt={`slide-${index}`} className="slider__image" />
            </div>
          ))}
        </div>
      </div>

      <button className="slider__btn slider__btn--prev" onClick={prevSlide}>
        <img src="/assets/image/Arrow5.svg" alt="Предыдущий слайд" />
      </button>
      <button className="slider__btn slider__btn--next" onClick={nextSlide}>
        <img src="/assets/image/Arrow-main.svg" alt="Следующий слайд" />
      </button>

      <div className="slider__indicators">
        {Array.from({ length: images.length - visibleSlides + 1 }).map(
          (_, index) => (
            <button
              key={index}
              className={`slider__indicator ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Slider;
