#!/usr/bin/env node

'use strict';

var BoxLunch = require('../index.js');

var token = process.env.BOT_API_KEY || require('../token');
var dbPath = process.env.BOT_DB_PATH;
var name = process.env.BOT_NAME;

var boxlunch = new BoxLunch({
    token: token,
    dbPath: dbPath,
    name: name
});

boxlunch.run();