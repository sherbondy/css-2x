(function() {
  var CSSOM, fs, two_x;
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  fs = require('fs');
  CSSOM = require('cssom');
  two_x = function(file_str) {
    var base, extension, parts;
    parts = file_str.split('.');
    base = parts.slice(0, parts.length - 1).join('.');
    base += '@2x.';
    extension = parts.slice(-1);
    return base + extension;
  };
  exports.double = function(args) {
    var arg, new_file, _i, _len;
    console.log(args);
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      arg = args[_i];
      new_file = two_x(arg);
      console.log(new_file);
      fs.readFile(arg, 'utf8', function(err, data) {
        var css, image, image2x, output, rule, selectors, sheet, _j, _len2, _ref;
        if (err) {
          throw err;
        }
        sheet = new CSSOM.CSSStyleSheet();
        css = CSSOM.parse(data);
        _ref = css.cssRules;
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          rule = _ref[_j];
          if (__indexOf.call(rule.style, 'background-image') >= 0) {
            selectors = rule.selectorText;
            image = rule.style['background-image'];
            image2x = two_x(image);
            sheet.insertRule("" + selectors + " {background-image:" + image2x + "}");
          }
        }
        output = '@media only screen and (-webkit-min-device-pixel-ratio:2) {\n';
        output += sheet.toString();
        output += '}';
        return console.log(output);
      });
    }
    return 'Done';
  };
}).call(this);
