import sdk from 'zmp-sdk';

const { platform } = sdk.getSystemInfo();

export const isIos = platform === 'iOS';

export default sdk;