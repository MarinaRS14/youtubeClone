declare module '*.module.scss';

declare module '*.svg' {
  const component: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default component;
}
