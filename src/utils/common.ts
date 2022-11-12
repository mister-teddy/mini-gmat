import api from 'zmp-sdk';

const { platform } = api.getSystemInfo();

export const isIos = platform === 'iOS';