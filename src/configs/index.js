const baseConfig = {
    apiPath: ''
};

const devConfig = {
    domain: 'http://188.166.16.64:8090'
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
