import {Dimensions} from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface SkeletonProps {
  isLoading: boolean;
  children?: any;
}
const {height, width} = Dimensions.get('window');

const SkeletonLoader = ({isLoading, children}: SkeletonProps) => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        style={{width: '100%', marginHorizontal: 20}}>
        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={120} height={20} />
          <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default SkeletonLoader;
