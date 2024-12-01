import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};

export default layout;
