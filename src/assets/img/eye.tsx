import React, { SVGProps, forwardRef, memo } from 'react';

export const Eye = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill={'currentColor'}
      ref={ref}
      {...props}>
      <path
        stroke="#1390E5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"
      />
      <path
        stroke="#1390E5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      />
    </svg>
  )),
);
