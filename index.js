// Generated by CoffeeScript 1.8.0
(function() {
  var Datastore;

  Datastore = function() {
    this.init = (function(_this) {
      return function(name, cb) {
        _this.db = window.sqlitePlugin.openDatabase({
          name: "" + name + ".db"
        });
        return _this.db.transaction(function(tx) {
          return tx.executeSql('CREATE TABLE IF NOT EXISTS kv (k text primary key, v text)', [], function() {
            return cb();
          });
        }, cb);
      };
    })(this);
    this.setItem = (function(_this) {
      return function(k, v, cb) {
        return _this.db.transaction(function(tx) {
          return tx.executeSql("INSERT OR REPLACE INTO kv (k, v) VALUES (?, ?)", [k, v], function() {
            return cb();
          });
        }, cb);
      };
    })(this);
    this.getItem = (function(_this) {
      return function(k, cb) {
        return _this.db.transaction(function(tx) {
          return tx.executeSql("SELECT v FROM kv WHERE k = \"" + k + "\"", [], function(_, results) {
            if (results.rows.length === 0) {
              return cb(null, null);
            }
            return cb(null, results.rows.item(0).v);
          }, cb);
        });
      };
    })(this);
    this.removeItem = (function(_this) {
      return function(k, cb) {
        return _this.db.transaction(function(tx) {
          return tx.executeSql("DELETE FROM kv WHERE k = \"" + k + "\"", [], function() {
            return cb();
          });
        }, cb);
      };
    })(this);
    this.clear = function(cb) {
      return this.db.transaction(function(tx) {
        return tx.executeSql("DELETE * FROM kv", [], function() {
          return cb();
        });
      }, cb);
    };
    return this;
  };

  module.exports = function() {
    return new Datastore();
  };

}).call(this);
