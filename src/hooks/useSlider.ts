import { MutableRefObject, useRef } from 'react';

export function useSlider() {
  const sliderRef = useRef() as MutableRefObject<HTMLUListElement>;

  function handleSlideLeft() {
    sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - 200;
  }

  function handleSlideRight() {
    sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + 200;
  }
  return { sliderRef, handleSlideLeft, handleSlideRight };
}
