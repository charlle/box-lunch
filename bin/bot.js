#!/usr/bin/env node

'use strict';

var NorrisBot = require('../index.js');

var token = process.env.BOT_API_KEY || require('../token');
var dbPath = process.env.BOT_DB_PATH;
var name = process.env.BOT_NAME;

var norrisbot = new NorrisBot({
    token: token,
    dbPath: dbPath,
    name: name
});

norrisbot.run();