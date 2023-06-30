const config = {
  NODE_ENV: "development",
  // POSTGRES_READ_DB_HOST: "127.0.0.1",
  // POSTGRES_READ_DB_PORT: 5432,
  // POSTGRES_READ_DB_NAME: "shared_video",
  // POSTGRES_READ_DB_PASS: "123456",
  // POSTGRES_READ_DB_USER: "shared_video",
  // POSTGRES_WRITE_DB_HOST: "127.0.0.1",
  // POSTGRES_WRITE_DB_PORT: 5432,
  // POSTGRES_WRITE_DB_NAME: "shared_video",
  // POSTGRES_WRITE_DB_PASS: "123456",
  // POSTGRES_WRITE_DB_USER: "shared_video",
  POSTGRES_READ_DB_HOST:
    "ep-odd-bonus-021546-pooler.ap-southeast-1.postgres.vercel-storage.com",
  POSTGRES_READ_DB_PORT: "5432",
  POSTGRES_READ_DB_NAME: "verceldb",
  POSTGRES_READ_DB_PASS: "N3RrIsCaK9Mb",
  POSTGRES_READ_DB_USER: "default",
  POSTGRES_WRITE_DB_HOST:
    "ep-odd-bonus-021546-pooler.ap-southeast-1.postgres.vercel-storage.com",
  POSTGRES_WRITE_DB_PORT: "5432",
  POSTGRES_WRITE_DB_NAME: "verceldb",
  POSTGRES_WRITE_DB_PASS: "N3RrIsCaK9Mb",
  POSTGRES_WRITE_DB_USER: "default",

  LOG_FOLDER: "",
  PUBLIC_KEY:
    "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCO8M/qMtugKwtEr+5CC2qN/ZG2\ngMJTa3UPxQzgM5NCn/gHMHGEbwGKjcGIG+CfNjlHM/VWpIqiAmKzRxN5O4pKlUNc\nw+6TLU8taqNJfB8HGgVmcqgAETm7S0Vav1qfrxCspIyUq7PsHtrR+rO7jAtH/+mp\nr5F7GlG/HGwHefZZ/wIDAQAB\n-----END PUBLIC KEY-----",
  PRIVATE_KEY:
    "-----BEGIN RSA PRIVATE KEY-----\nMIICXAIBAAKBgQCO8M/qMtugKwtEr+5CC2qN/ZG2gMJTa3UPxQzgM5NCn/gHMHGE\nbwGKjcGIG+CfNjlHM/VWpIqiAmKzRxN5O4pKlUNcw+6TLU8taqNJfB8HGgVmcqgA\nETm7S0Vav1qfrxCspIyUq7PsHtrR+rO7jAtH/+mpr5F7GlG/HGwHefZZ/wIDAQAB\nAoGBAIwjU/QMQH5bNQT2ZuShRKpIu57txZb7dx0q12DHr8xWAVkrCWAJZL1uFRtY\nGXR+ONGyAwoa7z++jv2s5U6qLP1NVHUsf7RLIevqZBAqvcRILWpll4fSVzkjK91F\nxOoywm3i/0a+S01C2n3upyrC9WxCP5oYmURCcS777tbKuGthAkEA4+4vaLtQfS1Z\nHanYdcgGog+xo5qwGH+adIp47+AYsVzSfYVMr7rfdNK+3b4qZHiEBRgkNRbidBA4\ngX+9HsEMwwJBAKCLNdzo9TjA2t2Wy7JPnF/7wI76AbpqjkEfghGkL/mWlrtyiCxZ\npZr4yadervb2xl8k2xvEMOpBIztjTIiRmhUCQFglqB4HutP+MqWfJsA+EBqimR9d\nVlbTGmeRmb2i28nTzO+QGp0nVv219uyIe5qJZP0XXgFODVu3XjLutLPtEsMCQGVB\nJ8mai/8tc1zKnNJrb58B8yK5/5kJV4svSiPCQBfUqGC1DbmbGN2zB8wt5YARiG+9\nmQvcI1W7m3L7X+vKmTkCQHla6bSN1GEioMbARbbzQthz/wihu7YSzIdhm1xOYFuN\na5Q6pS+m8o3oFf+hIcbi5+Hob8/niPDNdoS6hBoGQag=\n-----END RSA PRIVATE KEY-----",
};

module.exports = {
  apps: [
    {
      name: "4200-dev-admin-api.vercel.com",
      instances: 1,
      exec_mode: "cluster",
      script: "./index.js",
      env: {
        ...config,
        PORT: 4200,
      },
    },
  ],
};
