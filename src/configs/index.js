const baseConfig = {
    apiPath: ''
};

const devConfig = {
    domain: 'http://mirror.qora.co.in:9090'
};


const prodConfig = {
    domain: 'http://lingyong.me:9090'
};

var exportConfig = {};

if (__DEV__) {
    exportConfig = {
        ...baseConfig,
        ...devConfig
    }
}
else {
    exportConfig = {
        ...devConfig,
        ...prodConfig
    }
}

export default exportConfig;
