'use client';

interface IResizeCriterion {
  width: number;
  overWidth: () => void;
  underWidth: () => void;
}

export function handleResizeCriterion({ width, overWidth, underWidth }: IResizeCriterion) {
  if (window.innerWidth >= width) {
    overWidth();
  } else {
    underWidth();
  }
}
interface IResizeInterval {
  intervalunder_383: () => void;
  interval384_479?: () => void;
  interval480_639?: () => void;
  interval640_767?: () => void;
  interval768_1023?: () => void;
  interval1024_1279?: () => void;
  interval1280_over?: () => void;
}

export function handleResizeInterval({
  intervalunder_383,
  interval384_479,
  interval480_639,
  interval640_767,
  interval768_1023,
  interval1024_1279,
  interval1280_over,
}: IResizeInterval) {
  if (window.innerWidth < 384 && intervalunder_383) {
    intervalunder_383();
    return;
  }
  if (window.innerWidth >= 384 && window.innerWidth < 479 && interval384_479) {
    interval384_479();
    return;
  }
  if (window.innerWidth >= 480 && window.innerWidth < 640 && interval480_639) {
    interval480_639();
    return;
  }
  if (window.innerWidth >= 640 && window.innerWidth < 768 && interval640_767) {
    interval640_767();
    return;
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1023 && interval768_1023) {
    interval768_1023();
    return;
  }
  if (window.innerWidth >= 1024 && window.innerWidth < 1279 && interval1024_1279) {
    interval1024_1279();
    return;
  }
  if (window.innerWidth >= 1280 && interval1280_over) {
    interval1280_over();
  }
}
