const buildEnv = process.env.VUE_APP_BUILD_ENV || 'dev';

// api配置
const apiConfig = {
  dev: 'http://101.132.100.145:8182',
  pre: 'http://boss-gateway-pre.modoopark.com',
  prod: 'https://boss-gateway.modoopark.com',
};

// 客户端配置
const clientConfig = {
  dev: {
    client_id: 'sys_wygl',
    client_secret: 'wy34hcg',
    grant_type: 'password',
  },
  pre: {
    client_id: 'sys_wygl',
    client_secret: 'wy34hcg',
    grant_type: 'password',
  },
  prod: {
    client_id: 'sys_wygl',
    client_secret: 'wyy44h8gq',
    grant_type: 'password',
  },
};

export const ENV_CONFIG = {
  api: apiConfig[buildEnv],
  client: clientConfig[buildEnv],
};
