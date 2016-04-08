(function() {
  "use strict";
  window.Logo = window.Logo || {};
  Logo.targetDiv = function() { return document.getElementById('logos'); };
  Logo.logos = [
    [
      'val michael = _ match {',
      '  case Coffee => drinkIt()',
      '  case Powered => up()',
      '  case Code => breakIt()',
      '}',
    ], [
      '<Coffee/>',
      '{Powered}',
      ' Code();',
    ], [
      '._Coffee{',
      '  Powered: 100%;',
      '  Code: \'u2603\'',
      '}',
    ], [
      'select Coffee,',
      '       Powered,',
      '       Code,',
      'from developers',
      'where code_fu == \'master\'',
    ], [
      'var michael = {',
      '  \'Coffee\': \'Good\',',
      '  \'Powered\': true,',
      '  \'Code\': \'\\u2603\'',
      '}',
    ], [
      'if Coffee &&',
      '   Powered:',
      '   Code()',
    ], [
      'developer { \'michael\':',
      '  drink  => Coffee,',
      '  ensure => Powered,',
      '  write  => Code,',
      '}',
    ]
  ];
  Logo.findSplit = function(lines) {
    var coffeeLine = lines.find(function(line) {
      return line.includes('Coffee');
    });
    return coffeeLine.indexOf('Coffee');
  };
  Logo.padWithNbsp = function(str, minlength) {
    var length = Math.max(str.length, minlength);
    var loadsOfNbsp = '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0';
    return (str+loadsOfNbsp).substring(0, length);
  };
  Logo.replaceSpaces = function(line) {
    return line.replace(' ', '\xa0');
  };
  Logo.splitLine = function(line, splitPoint) {
    var hasLogoType = line.includes('Coffee') ||
      line.includes('Powered') ||
      line.includes('Code');
    var logotype = '';
    var splits = [];
    if (line.includes('Coffee')) {
      logotype = 'Coffee';
      splits = line.split("Coffee");
    } else if (line.includes('Powered')) {
      logotype = 'Powered';
      splits = line.split("Powered");
    } else if (line.includes('Code')) {
      logotype = 'Code';
      splits = line.split("Code");
    } else {
      splits = [
        line.substring(0, splitPoint),
        line.substring(splitPoint)
      ];
    }

    return {
      'codeOnly': !hasLogoType,
      'pre': splits[0],
      'post': splits[1],
      'logotype': logotype
    };
  };
  Logo.renderLine = function(parts) {
    if (parts.codeOnly) {
      return [
        "<div>",
        "  <span class=\"pre\">", parts.pre ,"</span>",
        "  <span>", parts.post,"</span>",
        "</div>"
      ].join("");
    } else {
      return [
        "<div class=\"", parts.logotype.toLowerCase(), "\">",
        "  <span class=\"pre\">", parts.pre, "</span>",
        "  <span>", parts.post,"</span>",
        parts.logotype,
        "</div>"
      ].join("");
    }
  };
  Logo.render = function(logo, target) {
    var split = Logo.findSplit(logo);
    var padWithNbsp = function (line) {
      return Logo.padWithNbsp(line, split);
    };
    var lines = [];
    logo
      .map(Logo.replaceSpaces)
      .map(padWithNbsp)
      .forEach(function(line) {
        var parts = Logo.splitLine(line, split);
        lines.push(Logo.renderLine(parts));
      });

    var html = ["<div class=\"logo\">"].concat(lines, ["</div>"]).join("");
    target.insertAdjacentHTML('beforeend', html);
  };
  Logo.renderRandomLogo = function(targetDivId) {
    var targetDiv = document.getElementById(targetDivId);
    var idx = Math.floor(Math.random() * Logo.logos.length);
    Logo.render(Logo.logos[idx], targetDiv);
  };
  $(document).ready(function () {
    Logo.renderRandomLogo('logo');
  });
}());
