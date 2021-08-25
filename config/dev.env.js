'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const localEnv = require('./index')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    EVN_CONFIG: '"dev"',
    API_ROOT: `"http://${localEnv.dev.host}:${localEnv.dev.port}/dd"`,//使用本机ip
    SSO: '"https://signinuat.mideazy.com"',
    LOGIN_HOME:`"http://${localEnv.dev.host}:${localEnv.dev.port}/dc/index"`//使用本机ip
})
