import React, { SVGProps, forwardRef, memo } from 'react';

export const Logo = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={88}
      height={88}
      fill={'currentColor'}
      ref={ref}
      {...props}>
      <path
        fill="#1390E5"
        fillRule="evenodd"
        d="M59.149 43.567 24.683 60.956v18.443l34.466-17.39V43.568Z"
        clipRule="evenodd"
      />
      <path
        fill="#1180CB"
        fillRule="evenodd"
        d="m24.683 26.179 34.466 17.389V62.01L24.683 44.62V26.18Z"
        clipRule="evenodd"
      />
      <path
        fill="#35A2EC"
        fillRule="evenodd"
        d="M59.149 8.79 24.683 26.18v18.443l34.466-17.39V8.792Z"
        clipRule="evenodd"
      />
    </svg>
  )),
);
