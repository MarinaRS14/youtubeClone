import React, { SVGProps, forwardRef, memo } from 'react';

export const List = memo(
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
        d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
        opacity={0.3}
      />
    </svg>
  )),
);
