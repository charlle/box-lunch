'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var SQLite = require('sqlite3').verbose();
var Bot = require('slackbots');

var BoxLunch = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'norrisbot';
    this.dbPath = settings.dbPath || path.resolve(process.cwd(), 'data', 'norrisbot.db');

    this.user = null;
    this.db = null;
};

// inherits methods and properties from the Bot constructor
util.inherits(BoxLunch, Bot);


BoxLunch.prototype.run = function () {
    BoxLunch.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

BoxLunch.prototype._onStart = function () {
    this._loadBotUser();
    this._connectDb();
    this._firstRunCheck();
};

// 3 FUNCTIONS TO EXECUTE ON START
BoxLunch.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

BoxLunch.prototype._connectDb = function () {
    if (!fs.existsSync(this.dbPath)) {
        console.error('Database path ' + '"' + this.dbPath + '" does not exists or it\'s not readable.');
        process.exit(1);
    }

    this.db = new SQLite.Database(this.dbPath);
};

BoxLunch.prototype._firstRunCheck = function () {
    var self = this;
    self.db.get('SELECT val FROM info WHERE name = "lastrun" LIMIT 1', function (err, record) {
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }

        var currentTime = (new Date()).toJSON();

        // this is a first run
        if (!record) {
            self._welcomeMessage();
            return self.db.run('INSERT INTO info(name, val) VALUES("lastrun", ?)', currentTime);
        }

        // updates with new last running time
        self.db.run('UPDATE info SET val = ? WHERE name = "lastrun"', currentTime);
    });
};

BoxLunch.prototype._welcomeMessage = function () {
    this.postMessageToChannel(this.channels[0].name, 'Hi guys, roundhouse-kick anyone?' +
        '\n I can tell jokes, but very honest ones. Just say `Chuck Norris` or `' + this.name + '` to invoke me!',
        {as_user: true});
};


// ON MESSAGE FUNCTIONS
BoxLunch.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFromBoxLunch(message) &&
        this._isMentioningChuckNorris(message)
    ) {
        this._replyWithRandomJoke(message);
    }
};

BoxLunch.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

BoxLunch.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        ( message.channel[0] === 'G' || 
            message.channel[0] === 'C' );

};

BoxLunch.prototype._isFromBoxLunch = function (message) {
    return message.user === this.user.id;
};

BoxLunch.prototype._isMentioningChuckNorris = function (message) {
    return message.text.toLowerCase().indexOf('hungry') > -1 ||
        message.text.toLowerCase().indexOf(this.name) > -1;
};

BoxLunch.prototype._replyWithRandomJoke = function (message) {
    var self = this;
    self.db.get('SELECT id, joke FROM jokes ORDER BY used ASC, RANDOM() LIMIT 1', function (err, record) {
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }



        if (message.channel[0] === 'C') {
            var channel = self._getChannelById(message.channel);
            self.postMessageToChannel(channel.name, record.joke, {as_user: true});
        }

        if (message.channel[0] === 'G') {
            var group = self._getGroupById(message.channel);
            self.postMessageToGroup(group.name, record.joke, {as_user: true});
        }

        self.db.run('UPDATE jokes SET used = used + 1 WHERE id = ?', record.id);
    });
};

BoxLunch.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

BoxLunch.prototype._getGroupById = function (groupId) {
    return this.groups.filter(function (item) {
        return item.id === groupId;
    })[0];
};


module.exports = BoxLunch;