import React, { SVGProps, forwardRef, memo } from 'react';

export const Table = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill={'currentColor'}
      ref={ref}
      {...props}>
      <path
        stroke="#272727"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 5H5v5h5V5Zm9 0h-5v5h5V5Zm0 9h-5v5h5v-5Zm-9 0H5v5h5v-5Z"
        opacity={0.3}
      />
    </svg>
  )),
);
