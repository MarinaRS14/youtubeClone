import React, { SVGProps, forwardRef, memo } from 'react';

export const FilledHeart = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill={'currentColor'}
      ref={ref}
      {...props}>
      <path
        fill="#C5E4F9"
        stroke="#1390E5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
      />
    </svg>
  )),
);
