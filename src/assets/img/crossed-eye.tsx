import React, { SVGProps, forwardRef, memo } from 'react';

export const CrossedEye = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill={'currentColor'}
      ref={ref}
      {...props}>
      <path
        stroke="#D1D1D1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.12 14.12a3.001 3.001 0 0 1-5.194-2.098A3 3 0 0 1 9.88 9.88m8.06 8.06A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94l11.88 11.88ZM9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.498 18.498 0 0 1-2.16 3.19L9.9 4.24ZM1 1l22 22"
      />
    </svg>
  )),
);
