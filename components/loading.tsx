import { Triangle } from 'react-loader-spinner';

interface LoadingProps {
  size: number;
  color: string;
}

export default function Loading({ size, color }: LoadingProps) {
  return <Triangle visible={true} height={size} width={size} color={color} ariaLabel="triangle-loading" />;
}
