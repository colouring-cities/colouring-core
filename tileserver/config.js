/**
 * Load config from config.json
 */
const fs = require('fs');
const path = require('path')

function read(){
    const config_path = path.join(__dirname, '..', 'config.json')
    return load_json(config_path)
}

function load_json(path){
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}

const config = read()

module.exports = config
