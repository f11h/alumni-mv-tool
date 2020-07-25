var proxyConfig = [{
    context: '/api',
    target: 'https://qcodis.coffee',
    //target: 'http://localhost:5367',
    changeOrigin: true,
    secure: true
    /*pathRewrite: {
        '^/api': '',
    }*/
}];

function setupForCorporateProxy(proxyConfig) {
    return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
