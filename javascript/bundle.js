var _,
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

_ = {
  i: function() {
    return this.console = setInterval(this.detect.bind(this), 200);
  },
  p: {
    offing: false,
    offtime: 0
  },
  turn: function(el, remove, add) {
    if (remove == null) {
      remove = false;
    }
    if (add == null) {
      add = false;
    }
    if (!(el instanceof jQuery)) {
      el = $(el);
    }
    if (remove !== false) {
      el.removeClass(remove);
    }
    if (add !== false) {
      el.addClass(add);
    }
    return true;
  },
  off: function(el, p) {
    if (p == null) {
      p = {};
    }
    if (p.offing && p.offtime > 0) {
      this.turn(el, false, 'offing');
      setTimeout((function(_this) {
        return function() {
          _this.turn(el, 'offing', false);
          return _this.turn(el, 'on', 'off');
        };
      })(this), p.offtime * 1000 + 100);
    } else {
      this.turn(el, 'on', 'off');
    }
  },
  on: function(el, p) {
    return this.turn(el, 'off', 'on');
  },
  swap: function(el, p) {
    if (!(el instanceof jQuery)) {
      el = $(el);
    }
    if (el.hasClass('off')) {
      this.on(el, p);
    } else {
      this.off(el, p);
    }
  },
  encode: function(str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
  },
  t: function(category, action, label, value) {
    return _gaq.push(['_trackEvent', category, action, label, value]);
  },
  rand: function(min, max) {
    return Math.floor(Math.random() * max) + min;
  },
  range: function(start, end) {
    var j, num, ref, ref1, result;
    result = [];
    for (num = j = ref = start, ref1 = end; ref <= ref1 ? j <= ref1 : j >= ref1; num = ref <= ref1 ? ++j : --j) {
      result.push(num);
    }
    return result;
  },
  fit: function(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio;
    ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
      width: srcWidth * ratio,
      height: srcHeight * ratio
    };
  },
  hex2rgb: function(hex) {
    var result;
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  },
  objc: function(obj) {
    var k;
    return ((function() {
      var results;
      results = [];
      for (k in obj) {
        if (!hasProp.call(obj, k)) continue;
        results.push(k);
      }
      return results;
    })()).length;
  },
  load: function(script, initiate, complete) {
    var el;
    el = document.createElement('script');
    el.type = 'text/javascript';
    el.src = script;
    el.addEventListener('load', function(e) {
      if (typeof complete === 'function') {
        complete();
      }
      if (initiate !== void 0 && initiate !== false) {
        return window[initiate].i();
      }
    }, false);
    return document.body.appendChild(el);
  },
  jinit: function() {
    return $.ajaxSetup({
      dataType: "json"
    });
  },
  patch: function(url, data) {
    var jpatch;
    this.jinit();
    jpatch = $.ajax({
      url: url,
      data: data,
      type: 'PATCH'
    });
    jpatch.fail(function(response) {
      return this.fail(response);
    });
    return jpatch;
  },
  get: function() {
    var args, jget;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.jinit();
    jget = $.get.apply($, args);
    jget.fail((function(_this) {
      return function(response) {
        _this.fail(response);
        return jget.fail(response);
      };
    })(this));
    return jget;
  },
  post: function() {
    var args, jpost;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    jpost = $.post.apply($, args);
    jpost.fail((function(_this) {
      return function(response) {
        _this.fail(response);
        return jpost.fail(response);
      };
    })(this));
    return jpost;
  },
  fail: function(response) {
    var body, editor, error, file, pug, ref, ref1;
    error = (ref = response.responseJSON) != null ? (ref1 = ref.errors) != null ? ref1[0] : void 0 : void 0;
    if (error === void 0) {
      return Prompt.i(response.status, response.statusText);
    }
    pug = error.message.match(/Pug Error: (.*?):([0-9]+)/);
    if (pug !== null) {
      error.message = error.message.replace(/Pug Error: (.*?):([0-9]+)/, '');
      error.file = pug[1];
      error.line = pug[2];
    }
    file = this.encode("" + error.file);
    switch (config.app.editor) {
      case 'macvim':
        editor = 'mvim://open?url=file://';
        break;
      case 'sublime':
        editor = 'subl://open?url=file://';
        break;
      case 'emacs':
        editor = 'emacs://open?url=file://';
        break;
      case 'textmate':
        editor = 'textmate://open/?url=file://';
        break;
      case 'phpstorm':
        editor = 'phpstorm://open?file=';
    }
    if (error.file !== null) {
      body = "<pre>" + error.message + "</pre>\n<a href=\"" + editor + file + "&line=" + error.line + "\"><b>" + error.file + ":" + error.line + "</b></a>";
    } else {
      body = error.message;
    }
    return Prompt.i(error.type, body, ['OK']);
  },
  methods: function(obj) {
    var i, m, res;
    res = [];
    for (i in obj) {
      m = obj[i];
      if (typeof m === 'function') {
        res.push(m);
      }
    }
    return res;
  },
  llc: function() {
    var ascii;
    ascii = "\n%cmmm/............................................................./mmm\nmmo................-:://::-.......-:::::::::::::-........-::///:-.omm\nmd-.............:+yhddddddhy+-..../ddddddddddddd+....../shdddddddyodm\nmo.............-hmmmhyyyydmmmh:.../mmmmhhhhhhhhh+....:ydmmdhyyyhddoom\nm-..............-ss:-....-ymmmy.../mmmm---------....:dmmms:-...-:/.-m\nd.........................ymmmy.../mmmm-/+ooo+:-....ymmmy-:+ooo+/-..d\nh.......................:smmmd:.../mmmmhmmmmmmdh+...dmmmshdmmmmmmhs-h\nh.....................:sdmmdy:....:hhdho+//+ymmmm+..dmmmdyo//+sdmmmhh\nd..................-+ydmmdy/.......--:.......smmmh..ymmms......:mmmmm\nm-..............-:shmmmds/-----....:s/--...-:hmmms..:dmmd/-...-ommmmm\nmo..............hmmmmmmhhhhhhhh...+dmmdhyyyhdmmmy-.../hmmmhyyyhmmmdhm\nmd-.............ddddddddddddddd...-+shdddddddhy/-.....-oydddddddho:dm\nmmo.............:::::::::::::::.......-:///::-...........-:///:-..omm\nmmm/............................................................./mmm\n\n:: syntactic sugar by 256\n:: http://256.io/\n:: " + config.meta.repo;
    return console.log(ascii, "color: grey; font-family: Menlo, monospace;");
  },
  detect: function() {
    if (((window.outerHeight - window.innerHeight) > 100) || ((window.outerWidth - window.innerWidth) > 100)) {
      this.llc();
      return clearInterval(this.console);
    }
  }
};

_.i();

var Blurload;

Blurload = {
  i: function() {
    return $('.tiles > .tile > .image.off').each(function(i, el) {
      var image, src;
      src = $(el).css('background-image').replace(/url\("(.*?)"\)/, "$1");
      image = new Image();
      image.src = src;
      return image.onload = function() {
        return _.on(el);
      };
    });
  }
};

var config;

config = {
  "color": {
    "white1": "#ffffff",
    "black1": "#000000",
    "gold1": "#ad986e",
    "blue1": "#465062",
    "grey1": "#aca39a"
  },
  "font": {
    "h1": {
      "font-family": "chronicle roman",
      "font-size": "40px"
    },
    "h2": {
      "font-family": "chronicle roman",
      "letter-spacing": "2px",
      "font-size": "20px"
    },
    "h3": {
      "font-family": "chronicle roman",
      "letter-spacing": "2px",
      "font-size": "15px"
    },
    "copy1": {
      "font-family": "chronicle roman",
      "font-size": "16px"
    },
    "copy2": {
      "font-family": "chronicle roman",
      "font-size": "12px",
      "letter-spacing": "2px"
    },
    "copy3": {
      "font-family": "engravers regular",
      "font-size": "12px",
      "letter-spacing": "2px"
    }
  },
  "meta": {
    "title": "Designsake Studio",
    "url": "http://www.designsakestudio.com/",
    "description": "Boutique design studio that specializes in branding, packaging, web design, and development",
    "keywords": "design, graphic design, branding, packaging, web design, web development, art direction, designsake,",
    "image": "img/share.jpg",
    "repo": "https://github.com/acidjazz/sake2"
  },
  "social": {
    "instagram": "http://www.instagram.com/designsakestudio",
    "facebook": "http://www.facebook.com/designsakestudio",
    "pinterest": "http://www.pinterest.com/designsakesf",
    "dribbble": "http://www.pinterest.com/designsakesf",
    "behance": "http://www.pinterest.com/designsakesf",
    "mail": "info@designsakestudio.com",
    "map": "https://www.google.com/maps/place/Designsake+Studio/@37.7664616,-122.4056994,17z/data=!3m1!4b1!4m5!3m4!1s0x808f7e329270f7af:0xab027b6dc66fae6c!8m2!3d37.7664616!4d-122.4035107",
    "phone": 4155093508
  },
  "work": {
    "brown": {
      "folder": "brown",
      "title": "brown estate",
      "description": ["DESIGNSAKE STUDIO SAW AN OPPORTUNITY TO SHAKE UP THE EVER-GROWING CANNABIS SPACE WITH A FRESH APPROACH FULL OF CALIFORNIA SOUL. THE DESIGNSAKE TEAM PAIRED RETRO TYPOGRAPHY WITH BRIGHT COLORS AND MODERN GEOMETRIC PATTERNS. A BOLD GRADIENT INSPIRED BY NATURE’S SKIES AND SPLASHES OF GOLD FOIL ADD A BURST OF PREMIUM SHINE.", "INSPIRED BY CALIFORNIA’S WARM AND INVIGORATING SUNSHINE, FULL SUN IS A 100% ALL-NATURAL, SUSTAINABLY FARMED CANNABIS LINE. PROUDLY RAISED UNDER THE SUNBELT OF HUMBOLDT COUNTY, THIS BRAND’S PRODUCT LINE IS A RESULT OF MELLOW OCEAN BREEZES, TOWERING REDWOODS AND SUN-DRENCHED HILLSIDES, YIELDING CANNABIS OF UNPARALLELED QUALITY, TASTE, AND PERFORMANCE."],
      "services": ["brand identity", "packaging", "art direction"],
      "tiles": [
        {
          "image": "Brown_1079x725px_1.jpg",
          "width": 1079,
          "height": 725,
          "full": true
        }, {
          "image": "Brown_520x762px_2.jpg",
          "left": true,
          "width": 520,
          "height": 762
        }, {
          "image": "Brown_527x365px_3.jpg",
          "width": 527,
          "height": 365,
          "stack": true
        }, {
          "image": "Brown_527x365px_4.jpg",
          "width": 527,
          "height": 365
        }, {
          "image": "Brown_1079x625px_5.jpg",
          "width": 1079,
          "height": 625,
          "full": true
        }, {
          "image": "Brown_339x530px_6.jpg",
          "left": true,
          "width": 339,
          "height": 530
        }, {
          "image": "Brown_339x530px_7.jpg",
          "width": 339,
          "height": 530,
          "left": true
        }, {
          "image": "Brown_339x530px_8.jpg",
          "width": 339,
          "height": 530
        }, {
          "image": "Brown_707x700px_11.jpg",
          "width": 707,
          "height": 700,
          "right": true
        }, {
          "image": "Brown_339x229px_9.jpg",
          "width": 339,
          "height": 229,
          "stack": true
        }, {
          "image": "Brown_678x900px_10.jpg",
          "width": 339,
          "height": 439,
          "left": true
        }, {
          "image": "Brown_1079x625px_12.jpg",
          "full": true,
          "width": 1079,
          "height": 625
        }, {
          "image": "Brown_520x762px_13.jpg",
          "width": 520,
          "height": 762,
          "left": true
        }, {
          "image": "Brown_527x365px_14.jpg",
          "width": 527,
          "height": 365,
          "stack": true
        }, {
          "image": "Brown_527x365px_15.jpg",
          "width": 527,
          "height": 365
        }
      ]
    },
    "eldestilado": {
      "folder": "eldestilado",
      "title": "eldestilado",
      "description": ["DESIGNSAKE STUDIO SAW AN OPPORTUNITY TO SHAKE UP THE EVER-GROWING CANNABIS SPACE WITH A FRESH APPROACH FULL OF CALIFORNIA SOUL. THE DESIGNSAKE TEAM PAIRED RETRO TYPOGRAPHY WITH BRIGHT COLORS AND MODERN GEOMETRIC PATTERNS. A BOLD GRADIENT INSPIRED BY NATURE’S SKIES AND SPLASHES OF GOLD FOIL ADD A BURST OF PREMIUM SHINE.", "INSPIRED BY CALIFORNIA’S WARM AND INVIGORATING SUNSHINE, FULL SUN IS A 100% ALL-NATURAL, SUSTAINABLY FARMED CANNABIS LINE. PROUDLY RAISED UNDER THE SUNBELT OF HUMBOLDT COUNTY, THIS BRAND’S PRODUCT LINE IS A RESULT OF MELLOW OCEAN BREEZES, TOWERING REDWOODS AND SUN-DRENCHED HILLSIDES, YIELDING CANNABIS OF UNPARALLELED QUALITY, TASTE, AND PERFORMANCE."],
      "services": ["brand identity", "packaging", "art direction"],
      "tiles": [
        {
          "image": "ElDestilado_1076x550px_1.jpg",
          "width": 1076,
          "height": 550,
          "full": true
        }, {
          "image": "ElDestilado_520x366px_2.jpg",
          "width": 520,
          "height": 366,
          "stack": true,
          "lefT": true
        }, {
          "image": "ElDestilado_527x930px_3.jpg",
          "width": 527,
          "height": 930,
          "right": true
        }, {
          "image": "ElDestilado_520x532px_4.jpg",
          "width": 520,
          "height": 532
        }, {
          "image": "ElDestilado_1076x634px_5.jpg",
          "width": 1076,
          "height": 634,
          "full": true
        }, {
          "image": "ElDestilado_520x455px_6.jpg",
          "width": 520,
          "height": 455,
          "left": true
        }, {
          "image": "ElDestilado_527x455px_7.jpg",
          "width": 527,
          "height": 455
        }, {
          "image": "ElDestilado_520x641px_8.jpg",
          "left": true,
          "clear": true,
          "width": 520,
          "height": 641
        }, {
          "image": "ElDestilado_247x304px_9.jpg",
          "left": true,
          "width": 247,
          "height": 304
        }, {
          "image": "ElDestilado_247x304px_10.jpg",
          "width": 247,
          "height": 304
        }, {
          "image": "ElDestilado_528x304px_11.jpg",
          "width": 528,
          "height": 304
        }, {
          "image": "ElDestilado_520x445px_12.jpg",
          "left": true,
          "clear": true,
          "width": 520,
          "height": 445
        }, {
          "image": "ElDestilado_527x445px_13.jpg",
          "width": 527,
          "height": 445
        }, {
          "image": "ElDestilado_1076x596px_12.jpg",
          "width": 1076,
          "height": 596
        }
      ]
    },
    "fullsun": {
      "folder": "fullsun",
      "title": "full sun",
      "description": ["DESIGNSAKE STUDIO SAW AN OPPORTUNITY TO SHAKE UP THE EVER-GROWING CANNABIS SPACE WITH A FRESH APPROACH FULL OF CALIFORNIA SOUL. THE DESIGNSAKE TEAM PAIRED RETRO TYPOGRAPHY WITH BRIGHT COLORS AND MODERN GEOMETRIC PATTERNS. A BOLD GRADIENT INSPIRED BY NATURE’S SKIES AND SPLASHES OF GOLD FOIL ADD A BURST OF PREMIUM SHINE.", "INSPIRED BY CALIFORNIA’S WARM AND INVIGORATING SUNSHINE, FULL SUN IS A 100% ALL-NATURAL, SUSTAINABLY FARMED CANNABIS LINE. PROUDLY RAISED UNDER THE SUNBELT OF HUMBOLDT COUNTY, THIS BRAND’S PRODUCT LINE IS A RESULT OF MELLOW OCEAN BREEZES, TOWERING REDWOODS AND SUN-DRENCHED HILLSIDES, YIELDING CANNABIS OF UNPARALLELED QUALITY, TASTE, AND PERFORMANCE."],
      "services": ["brand identity", "packaging", "art direction"],
      "tiles": [
        {
          "image": "FullSun_684x525px_1.jpg",
          "width": 684,
          "height": 525,
          "left": true
        }, {
          "image": "FullSun_364x525px_2.jpg",
          "width": 364,
          "height": 525
        }, {
          "image": "FullSun_1078x537px_3.jpg",
          "width": 1078,
          "height": 537,
          "full": true
        }, {
          "image": "FullSun_512x453px_4.jpg",
          "left": true,
          "width": 512,
          "height": 453
        }, {
          "image": "FullSun_536x453px_5.jpg",
          "width": 535,
          "height": 453
        }, {
          "image": "FullSun_1078x537px_6.jpg",
          "full": true,
          "width": 1078,
          "height": 537
        }, {
          "image": "FullSun_512x453px_7.jpg",
          "left": true,
          "width": 512,
          "height": 453
        }, {
          "image": "FullSun_536x208px_8.jpg",
          "width": 536,
          "height": 208,
          "full": true
        }, {
          "image": "FullSun_536x208px_9.jpg",
          "width": 536,
          "height": 208
        }
      ]
    },
    "sufferfest": {
      "folder": "sufferfest",
      "title": "sufferfest",
      "description": ["DESIGNSAKE STUDIO SAW AN OPPORTUNITY TO SHAKE UP THE EVER-GROWING CANNABIS SPACE WITH A FRESH APPROACH FULL OF CALIFORNIA SOUL. THE DESIGNSAKE TEAM PAIRED RETRO TYPOGRAPHY WITH BRIGHT COLORS AND MODERN GEOMETRIC PATTERNS. A BOLD GRADIENT INSPIRED BY NATURE’S SKIES AND SPLASHES OF GOLD FOIL ADD A BURST OF PREMIUM SHINE.", "INSPIRED BY CALIFORNIA’S WARM AND INVIGORATING SUNSHINE, FULL SUN IS A 100% ALL-NATURAL, SUSTAINABLY FARMED CANNABIS LINE. PROUDLY RAISED UNDER THE SUNBELT OF HUMBOLDT COUNTY, THIS BRAND’S PRODUCT LINE IS A RESULT OF MELLOW OCEAN BREEZES, TOWERING REDWOODS AND SUN-DRENCHED HILLSIDES, YIELDING CANNABIS OF UNPARALLELED QUALITY, TASTE, AND PERFORMANCE."],
      "services": ["brand identity", "packaging", "art direction"],
      "tiles": [
        {
          "image": "Sufferfest_684x525px_1.jpg",
          "width": 684,
          "height": 525,
          "left": true
        }, {
          "image": "Sufferfest_364x525px_2.jpg",
          "width": 364,
          "height": 525
        }, {
          "image": "Sufferfest_520x366px_3.jpg",
          "width": 520,
          "height": 366,
          "left": true
        }, {
          "image": "Sufferfest_528x366px_4.jpg",
          "width": 528,
          "height": 366,
          "right": true
        }, {
          "image": "Sufferfest_339x530px_5.jpg",
          "width": 339,
          "height": 530,
          "left": true
        }, {
          "image": "Sufferfest_339x530px_6.jpg",
          "width": 339,
          "height": 530
        }, {
          "image": "Sufferfest_339x530px_7.jpg",
          "width": 339,
          "height": 530
        }, {
          "image": "Sufferfest_1072x630px_8.jpg",
          "width": 1072,
          "height": 630,
          "full": true
        }, {
          "image": "Sufferfest_519x457px_9.jpg",
          "width": 519,
          "height": 457,
          "left": true
        }, {
          "image": "Sufferfest_526x207px_10.jpg",
          "width": 526,
          "height": 207,
          "stack": true
        }, {
          "image": "Sufferfest_526x207px_11.jpg",
          "width": 526,
          "height": 207
        }
      ]
    },
    "sumi": {
      "folder": "sumi",
      "title": "sumi",
      "description": ["DESIGNSAKE STUDIO SAW AN OPPORTUNITY TO SHAKE UP THE EVER-GROWING CANNABIS SPACE WITH A FRESH APPROACH FULL OF CALIFORNIA SOUL. THE DESIGNSAKE TEAM PAIRED RETRO TYPOGRAPHY WITH BRIGHT COLORS AND MODERN GEOMETRIC PATTERNS. A BOLD GRADIENT INSPIRED BY NATURE’S SKIES AND SPLASHES OF GOLD FOIL ADD A BURST OF PREMIUM SHINE.", "INSPIRED BY CALIFORNIA’S WARM AND INVIGORATING SUNSHINE, FULL SUN IS A 100% ALL-NATURAL, SUSTAINABLY FARMED CANNABIS LINE. PROUDLY RAISED UNDER THE SUNBELT OF HUMBOLDT COUNTY, THIS BRAND’S PRODUCT LINE IS A RESULT OF MELLOW OCEAN BREEZES, TOWERING REDWOODS AND SUN-DRENCHED HILLSIDES, YIELDING CANNABIS OF UNPARALLELED QUALITY, TASTE, AND PERFORMANCE."],
      "services": ["brand identity", "packaging", "art direction"],
      "tiles": [
        {
          "image": "Sumi_520x762px_1.jpg",
          "width": 520,
          "height": 762,
          "lefT": true
        }, {
          "image": "Sumi_527x365px_2.jpg",
          "width": 527,
          "height": 365,
          "right": true
        }, {
          "image": "Sumi_527x365px_3.jpg",
          "width": 527,
          "height": 365,
          "right": true
        }, {
          "image": "Sumi_1079x625px_4.jpg",
          "width": 1079,
          "height": 625,
          "full": true
        }, {
          "image": "Sumi_710x710px_7.jpg",
          "width": 710,
          "height": 710,
          "right": true
        }, {
          "image": "Sumi_339x229px_5.jpg",
          "width": 339,
          "height": 229,
          "left": true
        }, {
          "image": "Sumi_339x450px_6.jpg",
          "width": 339,
          "height": 450
        }, {
          "image": "Sumi_1079x625px_8.jpg",
          "width": 1079,
          "height": 625,
          "full": true
        }, {
          "image": "Sumi_520x762px_9.jpg",
          "width": 520,
          "height": 762,
          "left": true
        }, {
          "image": "Sumi_527x365px_10.jpg",
          "width": 527,
          "height": 365,
          "stack": true
        }, {
          "image": "Sumi_527x365px_11.jpg",
          "width": 527,
          "height": 365
        }, {
          "image": "Sumi_710x530px_12.jpg",
          "width": 710,
          "height": 530,
          "left": true
        }, {
          "image": "Sumi_339x530px_13.jpg",
          "width": 339,
          "height": 530
        }
      ]
    }
  }
};

var Index;

Index = {
  i: function() {
    return Blurload.i();
  }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJibHVybG9hZC5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQTtFQUFBOzs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUNULEtBQUMsQ0FBQSxJQUFELENBQU0sRUFBTixFQUFVLFFBQVYsRUFBb0IsS0FBcEI7aUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQjtRQUZTO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFYLEVBR0UsQ0FBQyxDQUFDLE9BQUYsR0FBVSxJQUFWLEdBQWlCLEdBSG5CLEVBSEY7S0FBQSxNQUFBO01BU0UsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQixFQVRGOztFQUZHLENBcEJMO0VBbUNBLEVBQUEsRUFBSSxTQUFDLEVBQUQsRUFBSyxDQUFMO1dBQ0YsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsS0FBVixFQUFpQixJQUFqQjtFQURFLENBbkNKO0VBc0NBLElBQUEsRUFBTSxTQUFDLEVBQUQsRUFBSyxDQUFMO0lBRUosSUFBRyxDQUFBLENBQUEsRUFBQSxZQUFrQixNQUFsQixDQUFIO01BQ0UsRUFBQSxHQUFLLENBQUEsQ0FBRSxFQUFGLEVBRFA7O0lBR0EsSUFBRyxFQUFFLENBQUMsUUFBSCxDQUFZLEtBQVosQ0FBSDtNQUNFLElBQUMsQ0FBQSxFQUFELENBQUksRUFBSixFQUFRLENBQVIsRUFERjtLQUFBLE1BQUE7TUFHRSxJQUFDLENBQUEsR0FBRCxDQUFLLEVBQUwsRUFBUyxDQUFULEVBSEY7O0VBTEksQ0F0Q047RUFrREEsTUFBQSxFQUFRLFNBQUMsR0FBRDtBQUNOLFdBQU8sa0JBQUEsQ0FBbUIsR0FBbkIsQ0FDTCxDQUFDLE9BREksQ0FDSSxJQURKLEVBQ1UsS0FEVixDQUVMLENBQUMsT0FGSSxDQUVJLElBRkosRUFFVSxLQUZWLENBR0wsQ0FBQyxPQUhJLENBR0ksS0FISixFQUdXLEtBSFgsQ0FJTCxDQUFDLE9BSkksQ0FJSSxLQUpKLEVBSVcsS0FKWCxDQUtMLENBQUMsT0FMSSxDQUtJLEtBTEosRUFLVyxLQUxYLENBTUwsQ0FBQyxPQU5JLENBTUksTUFOSixFQU1ZLEdBTlo7RUFERCxDQWxEUjtFQTJEQSxDQUFBLEVBQUcsU0FBQyxRQUFELEVBQVcsTUFBWCxFQUFtQixLQUFuQixFQUEwQixLQUExQjtXQUNELElBQUksQ0FBQyxJQUFMLENBQVUsQ0FBQyxhQUFELEVBQWdCLFFBQWhCLEVBQTBCLE1BQTFCLEVBQWtDLEtBQWxDLEVBQXlDLEtBQXpDLENBQVY7RUFEQyxDQTNESDtFQThEQSxJQUFBLEVBQU0sU0FBQyxHQUFELEVBQU0sR0FBTjtBQUNKLFdBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFJLENBQUMsTUFBTCxDQUFBLENBQUEsR0FBZ0IsR0FBM0IsQ0FBQSxHQUFrQztFQURyQyxDQTlETjtFQWlFQSxLQUFBLEVBQU8sU0FBQyxLQUFELEVBQVEsR0FBUjtBQUNMLFFBQUE7SUFBQSxNQUFBLEdBQVM7QUFDVCxTQUFXLHFHQUFYO01BQ0UsTUFBTSxDQUFDLElBQVAsQ0FBWSxHQUFaO0FBREY7V0FFQTtFQUpLLENBakVQO0VBdUVBLEdBQUEsRUFBSyxTQUFDLFFBQUQsRUFBVyxTQUFYLEVBQXNCLFFBQXRCLEVBQWdDLFNBQWhDO0FBQ0gsUUFBQTtJQUFBLEtBQUEsR0FBUSxJQUFJLENBQUMsR0FBTCxDQUFTLFFBQUEsR0FBVyxRQUFwQixFQUE4QixTQUFBLEdBQVksU0FBMUM7V0FDUjtNQUFBLEtBQUEsRUFBTyxRQUFBLEdBQVMsS0FBaEI7TUFBdUIsTUFBQSxFQUFRLFNBQUEsR0FBVSxLQUF6Qzs7RUFGRyxDQXZFTDtFQTJFQSxPQUFBLEVBQVMsU0FBQyxHQUFEO0FBQ1AsUUFBQTtJQUFBLE1BQUEsR0FBUywyQ0FBMkMsQ0FBQyxJQUE1QyxDQUFpRCxHQUFqRDtXQUNUO01BQUEsQ0FBQSxFQUFHLFFBQUEsQ0FBUyxNQUFPLENBQUEsQ0FBQSxDQUFoQixFQUFvQixFQUFwQixDQUFIO01BQ0EsQ0FBQSxFQUFHLFFBQUEsQ0FBUyxNQUFPLENBQUEsQ0FBQSxDQUFoQixFQUFvQixFQUFwQixDQURIO01BRUEsQ0FBQSxFQUFHLFFBQUEsQ0FBUyxNQUFPLENBQUEsQ0FBQSxDQUFoQixFQUFvQixFQUFwQixDQUZIOztFQUZPLENBM0VUO0VBaUZBLElBQUEsRUFBTSxTQUFDLEdBQUQ7QUFDSixRQUFBO1dBQUE7O0FBQUM7V0FBQSxRQUFBOztxQkFBQTtBQUFBOztRQUFELENBQW9CLENBQUM7RUFEakIsQ0FqRk47RUFvRkEsSUFBQSxFQUFNLFNBQUMsTUFBRCxFQUFTLFFBQVQsRUFBbUIsUUFBbkI7QUFFSixRQUFBO0lBQUEsRUFBQSxHQUFLLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCO0lBQ0wsRUFBRSxDQUFDLElBQUgsR0FBVTtJQUNWLEVBQUUsQ0FBQyxHQUFILEdBQVM7SUFDVCxFQUFFLENBQUMsZ0JBQUgsQ0FBb0IsTUFBcEIsRUFBNkIsU0FBQyxDQUFEO01BQzNCLElBQWMsT0FBTyxRQUFQLEtBQW1CLFVBQWpDO1FBQUEsUUFBQSxDQUFBLEVBQUE7O01BQ0EsSUFBd0IsUUFBQSxLQUFjLE1BQWQsSUFBNEIsUUFBQSxLQUFjLEtBQWxFO2VBQUEsTUFBTyxDQUFBLFFBQUEsQ0FBUyxDQUFDLENBQWpCLENBQUEsRUFBQTs7SUFGMkIsQ0FBN0IsRUFHRSxLQUhGO1dBS0EsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFkLENBQTBCLEVBQTFCO0VBVkksQ0FwRk47RUFnR0EsS0FBQSxFQUFPLFNBQUE7V0FDTCxDQUFDLENBQUMsU0FBRixDQUNFO01BQUEsUUFBQSxFQUFVLE1BQVY7S0FERjtFQURLLENBaEdQO0VBb0dBLEtBQUEsRUFBTyxTQUFDLEdBQUQsRUFBTSxJQUFOO0FBRUwsUUFBQTtJQUFBLElBQUMsQ0FBQSxLQUFELENBQUE7SUFFQSxNQUFBLEdBQVMsQ0FBQyxDQUFDLElBQUYsQ0FDUDtNQUFBLEdBQUEsRUFBSyxHQUFMO01BQ0EsSUFBQSxFQUFNLElBRE47TUFFQSxJQUFBLEVBQU0sT0FGTjtLQURPO0lBS1QsTUFBTSxDQUFDLElBQVAsQ0FBWSxTQUFDLFFBQUQ7YUFDVixJQUFDLENBQUEsSUFBRCxDQUFNLFFBQU47SUFEVSxDQUFaO0FBR0EsV0FBTztFQVpGLENBcEdQO0VBa0hBLEdBQUEsRUFBSyxTQUFBO0FBRUgsUUFBQTtJQUZJO0lBRUosSUFBQyxDQUFBLEtBQUQsQ0FBQTtJQUVBLElBQUEsR0FBTyxDQUFDLENBQUMsR0FBRixVQUFNLElBQU47SUFFUCxJQUFJLENBQUMsSUFBTCxDQUFVLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxRQUFEO1FBQ1IsS0FBQyxDQUFBLElBQUQsQ0FBTSxRQUFOO2VBQ0EsSUFBSSxDQUFDLElBQUwsQ0FBVSxRQUFWO01BRlE7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVY7QUFJQSxXQUFPO0VBVkosQ0FsSEw7RUE4SEEsSUFBQSxFQUFNLFNBQUE7QUFFSixRQUFBO0lBRks7SUFFTCxLQUFBLEdBQVEsQ0FBQyxDQUFDLElBQUYsVUFBTyxJQUFQO0lBRVIsS0FBSyxDQUFDLElBQU4sQ0FBVyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsUUFBRDtRQUNULEtBQUMsQ0FBQSxJQUFELENBQU0sUUFBTjtlQUNBLEtBQUssQ0FBQyxJQUFOLENBQVcsUUFBWDtNQUZTO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFYO0FBSUEsV0FBTztFQVJILENBOUhOO0VBd0lBLElBQUEsRUFBTSxTQUFDLFFBQUQ7QUFFSixRQUFBO0lBQUEsS0FBQSw2RUFBdUMsQ0FBQSxDQUFBO0lBQ3ZDLElBQUcsS0FBQSxLQUFTLE1BQVo7QUFDRSxhQUFPLE1BQU0sQ0FBQyxDQUFQLENBQVMsUUFBUSxDQUFDLE1BQWxCLEVBQTBCLFFBQVEsQ0FBQyxVQUFuQyxFQURUOztJQUdBLEdBQUEsR0FBTSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWQsQ0FBb0IsMkJBQXBCO0lBQ04sSUFBRyxHQUFBLEtBQVMsSUFBWjtNQUNFLEtBQUssQ0FBQyxPQUFOLEdBQWdCLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZCxDQUFzQiwyQkFBdEIsRUFBbUQsRUFBbkQ7TUFDaEIsS0FBSyxDQUFDLElBQU4sR0FBYSxHQUFJLENBQUEsQ0FBQTtNQUNqQixLQUFLLENBQUMsSUFBTixHQUFhLEdBQUksQ0FBQSxDQUFBLEVBSG5COztJQUtBLElBQUEsR0FBTyxJQUFDLENBQUEsTUFBRCxDQUFRLEVBQUEsR0FBRyxLQUFLLENBQUMsSUFBakI7QUFFUCxZQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBbEI7QUFBQSxXQUNPLFFBRFA7UUFDcUIsTUFBQSxHQUFTO0FBQXZCO0FBRFAsV0FFTyxTQUZQO1FBRXNCLE1BQUEsR0FBUztBQUF4QjtBQUZQLFdBR08sT0FIUDtRQUdvQixNQUFBLEdBQVM7QUFBdEI7QUFIUCxXQUlPLFVBSlA7UUFJdUIsTUFBQSxHQUFTO0FBQXpCO0FBSlAsV0FLTyxVQUxQO1FBS3VCLE1BQUEsR0FBUztBQUxoQztJQU9BLElBQUcsS0FBSyxDQUFDLElBQU4sS0FBZ0IsSUFBbkI7TUFDRSxJQUFBLEdBQU8sT0FBQSxHQUNFLEtBQUssQ0FBQyxPQURSLEdBQ2dCLG9CQURoQixHQUVNLE1BRk4sR0FFZSxJQUZmLEdBRW9CLFFBRnBCLEdBRTRCLEtBQUssQ0FBQyxJQUZsQyxHQUV1QyxRQUZ2QyxHQUU4QyxLQUFLLENBQUMsSUFGcEQsR0FFeUQsR0FGekQsR0FFNEQsS0FBSyxDQUFDLElBRmxFLEdBRXVFLFdBSGhGO0tBQUEsTUFBQTtNQU1FLElBQUEsR0FBTyxLQUFLLENBQUMsUUFOZjs7V0FRQSxNQUFNLENBQUMsQ0FBUCxDQUFTLEtBQUssQ0FBQyxJQUFmLEVBQXFCLElBQXJCLEVBQTJCLENBQUMsSUFBRCxDQUEzQjtFQTdCSSxDQXhJTjtFQXVLQSxPQUFBLEVBQVMsU0FBQyxHQUFEO0FBQ1AsUUFBQTtJQUFBLEdBQUEsR0FBTTtBQUNOLFNBQUEsUUFBQTs7TUFDRSxJQUFHLE9BQU8sQ0FBUCxLQUFZLFVBQWY7UUFDRSxHQUFHLENBQUMsSUFBSixDQUFTLENBQVQsRUFERjs7QUFERjtBQUdBLFdBQU87RUFMQSxDQXZLVDtFQThLQSxHQUFBLEVBQUssU0FBQTtBQUNILFFBQUE7SUFBQSxLQUFBLEdBQVEsMmhDQUFBLEdBbUJELE1BQU0sQ0FBQyxJQUFJLENBQUM7V0FFbkIsT0FBTyxDQUFDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CLDZDQUFuQjtFQXRCRyxDQTlLTDtFQXNNQSxNQUFBLEVBQVEsU0FBQTtJQUNOLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLE1BQU0sQ0FBQyxXQUE3QixDQUFBLEdBQTRDLEdBQTdDLENBQUEsSUFBcUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFQLEdBQW9CLE1BQU0sQ0FBQyxVQUE1QixDQUFBLEdBQTBDLEdBQTNDLENBQXpEO01BQ0UsSUFBQyxDQUFBLEdBQUQsQ0FBQTthQUNBLGFBQUEsQ0FBYyxJQUFDLENBQUEsT0FBZixFQUZGOztFQURNLENBdE1SOzs7QUEyTUYsQ0FBQyxDQUFDLENBQUYsQ0FBQTs7QUM1TUEsSUFBQTs7QUFBQSxRQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUVELENBQUEsQ0FBRSw2QkFBRixDQUFnQyxDQUFDLElBQWpDLENBQXNDLFNBQUMsQ0FBRCxFQUFJLEVBQUo7QUFDcEMsVUFBQTtNQUFBLEdBQUEsR0FBTSxDQUFBLENBQUUsRUFBRixDQUFLLENBQUMsR0FBTixDQUFVLGtCQUFWLENBQTZCLENBQUMsT0FBOUIsQ0FBc0MsZ0JBQXRDLEVBQXdELElBQXhEO01BQ04sS0FBQSxHQUFRLElBQUksS0FBSixDQUFBO01BQ1IsS0FBSyxDQUFDLEdBQU4sR0FBWTthQUNaLEtBQUssQ0FBQyxNQUFOLEdBQWUsU0FBQTtlQUNiLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTDtNQURhO0lBSnFCLENBQXRDO0VBRkMsQ0FBSDs7O0FDSEYsSUFBQTs7QUFBQSxNQUFBLEdBQVM7RUFBQyxPQUFBLEVBQVE7SUFBQyxRQUFBLEVBQVMsU0FBVjtJQUFvQixRQUFBLEVBQVMsU0FBN0I7SUFBdUMsT0FBQSxFQUFRLFNBQS9DO0lBQXlELE9BQUEsRUFBUSxTQUFqRTtJQUEyRSxPQUFBLEVBQVEsU0FBbkY7R0FBVDtFQUF1RyxNQUFBLEVBQU87SUFBQyxJQUFBLEVBQUs7TUFBQyxhQUFBLEVBQWMsaUJBQWY7TUFBaUMsV0FBQSxFQUFZLE1BQTdDO0tBQU47SUFBMkQsSUFBQSxFQUFLO01BQUMsYUFBQSxFQUFjLGlCQUFmO01BQWlDLGdCQUFBLEVBQWlCLEtBQWxEO01BQXdELFdBQUEsRUFBWSxNQUFwRTtLQUFoRTtJQUE0SSxJQUFBLEVBQUs7TUFBQyxhQUFBLEVBQWMsaUJBQWY7TUFBaUMsZ0JBQUEsRUFBaUIsS0FBbEQ7TUFBd0QsV0FBQSxFQUFZLE1BQXBFO0tBQWpKO0lBQTZOLE9BQUEsRUFBUTtNQUFDLGFBQUEsRUFBYyxpQkFBZjtNQUFpQyxXQUFBLEVBQVksTUFBN0M7S0FBck87SUFBMFIsT0FBQSxFQUFRO01BQUMsYUFBQSxFQUFjLGlCQUFmO01BQWlDLFdBQUEsRUFBWSxNQUE3QztNQUFvRCxnQkFBQSxFQUFpQixLQUFyRTtLQUFsUztJQUE4VyxPQUFBLEVBQVE7TUFBQyxhQUFBLEVBQWMsbUJBQWY7TUFBbUMsV0FBQSxFQUFZLE1BQS9DO01BQXNELGdCQUFBLEVBQWlCLEtBQXZFO0tBQXRYO0dBQTlHO0VBQW1qQixNQUFBLEVBQU87SUFBQyxPQUFBLEVBQVEsbUJBQVQ7SUFBNkIsS0FBQSxFQUFNLGtDQUFuQztJQUFzRSxhQUFBLEVBQWMsNkZBQXBGO0lBQWtMLFVBQUEsRUFBVyxzR0FBN0w7SUFBb1MsT0FBQSxFQUFRLGVBQTVTO0lBQTRULE1BQUEsRUFBTyxtQ0FBblU7R0FBMWpCO0VBQWs2QixRQUFBLEVBQVM7SUFBQyxXQUFBLEVBQVksMkNBQWI7SUFBeUQsVUFBQSxFQUFXLDBDQUFwRTtJQUErRyxXQUFBLEVBQVksdUNBQTNIO0lBQW1LLFVBQUEsRUFBVyx1Q0FBOUs7SUFBc04sU0FBQSxFQUFVLHVDQUFoTztJQUF3USxNQUFBLEVBQU8sMkJBQS9RO0lBQTJTLEtBQUEsRUFBTSxnTEFBalQ7SUFBa2UsT0FBQSxFQUFRLFVBQTFlO0dBQTM2QjtFQUFpNkMsTUFBQSxFQUFPO0lBQUMsT0FBQSxFQUFRO01BQUMsUUFBQSxFQUFTLE9BQVY7TUFBa0IsT0FBQSxFQUFRLGNBQTFCO01BQXlDLGFBQUEsRUFBYyxDQUFDLGtVQUFELEVBQW9VLGlXQUFwVSxDQUF2RDtNQUE4dEIsVUFBQSxFQUFXLENBQUMsZ0JBQUQsRUFBa0IsV0FBbEIsRUFBOEIsZUFBOUIsQ0FBenVCO01BQXd4QixPQUFBLEVBQVE7UUFBQztVQUFDLE9BQUEsRUFBUSx3QkFBVDtVQUFrQyxPQUFBLEVBQVEsSUFBMUM7VUFBK0MsUUFBQSxFQUFTLEdBQXhEO1VBQTRELE1BQUEsRUFBTyxJQUFuRTtTQUFELEVBQTBFO1VBQUMsT0FBQSxFQUFRLHVCQUFUO1VBQWlDLE1BQUEsRUFBTyxJQUF4QztVQUE2QyxPQUFBLEVBQVEsR0FBckQ7VUFBeUQsUUFBQSxFQUFTLEdBQWxFO1NBQTFFLEVBQWlKO1VBQUMsT0FBQSxFQUFRLHVCQUFUO1VBQWlDLE9BQUEsRUFBUSxHQUF6QztVQUE2QyxRQUFBLEVBQVMsR0FBdEQ7VUFBMEQsT0FBQSxFQUFRLElBQWxFO1NBQWpKLEVBQXlOO1VBQUMsT0FBQSxFQUFRLHVCQUFUO1VBQWlDLE9BQUEsRUFBUSxHQUF6QztVQUE2QyxRQUFBLEVBQVMsR0FBdEQ7U0FBek4sRUFBb1I7VUFBQyxPQUFBLEVBQVEsd0JBQVQ7VUFBa0MsT0FBQSxFQUFRLElBQTFDO1VBQStDLFFBQUEsRUFBUyxHQUF4RDtVQUE0RCxNQUFBLEVBQU8sSUFBbkU7U0FBcFIsRUFBNlY7VUFBQyxPQUFBLEVBQVEsdUJBQVQ7VUFBaUMsTUFBQSxFQUFPLElBQXhDO1VBQTZDLE9BQUEsRUFBUSxHQUFyRDtVQUF5RCxRQUFBLEVBQVMsR0FBbEU7U0FBN1YsRUFBb2E7VUFBQyxPQUFBLEVBQVEsdUJBQVQ7VUFBaUMsT0FBQSxFQUFRLEdBQXpDO1VBQTZDLFFBQUEsRUFBUyxHQUF0RDtVQUEwRCxNQUFBLEVBQU8sSUFBakU7U0FBcGEsRUFBMmU7VUFBQyxPQUFBLEVBQVEsdUJBQVQ7VUFBaUMsT0FBQSxFQUFRLEdBQXpDO1VBQTZDLFFBQUEsRUFBUyxHQUF0RDtTQUEzZSxFQUFzaUI7VUFBQyxPQUFBLEVBQVEsd0JBQVQ7VUFBa0MsT0FBQSxFQUFRLEdBQTFDO1VBQThDLFFBQUEsRUFBUyxHQUF2RDtVQUEyRCxPQUFBLEVBQVEsSUFBbkU7U0FBdGlCLEVBQSttQjtVQUFDLE9BQUEsRUFBUSx1QkFBVDtVQUFpQyxPQUFBLEVBQVEsR0FBekM7VUFBNkMsUUFBQSxFQUFTLEdBQXREO1VBQTBELE9BQUEsRUFBUSxJQUFsRTtTQUEvbUIsRUFBdXJCO1VBQUMsT0FBQSxFQUFRLHdCQUFUO1VBQWtDLE9BQUEsRUFBUSxHQUExQztVQUE4QyxRQUFBLEVBQVMsR0FBdkQ7VUFBMkQsTUFBQSxFQUFPLElBQWxFO1NBQXZyQixFQUErdkI7VUFBQyxPQUFBLEVBQVEseUJBQVQ7VUFBbUMsTUFBQSxFQUFPLElBQTFDO1VBQStDLE9BQUEsRUFBUSxJQUF2RDtVQUE0RCxRQUFBLEVBQVMsR0FBckU7U0FBL3ZCLEVBQXkwQjtVQUFDLE9BQUEsRUFBUSx3QkFBVDtVQUFrQyxPQUFBLEVBQVEsR0FBMUM7VUFBOEMsUUFBQSxFQUFTLEdBQXZEO1VBQTJELE1BQUEsRUFBTyxJQUFsRTtTQUF6MEIsRUFBaTVCO1VBQUMsT0FBQSxFQUFRLHdCQUFUO1VBQWtDLE9BQUEsRUFBUSxHQUExQztVQUE4QyxRQUFBLEVBQVMsR0FBdkQ7VUFBMkQsT0FBQSxFQUFRLElBQW5FO1NBQWo1QixFQUEwOUI7VUFBQyxPQUFBLEVBQVEsd0JBQVQ7VUFBa0MsT0FBQSxFQUFRLEdBQTFDO1VBQThDLFFBQUEsRUFBUyxHQUF2RDtTQUExOUI7T0FBaHlCO0tBQVQ7SUFBaTBELGFBQUEsRUFBYztNQUFDLFFBQUEsRUFBUyxhQUFWO01BQXdCLE9BQUEsRUFBUSxhQUFoQztNQUE4QyxhQUFBLEVBQWMsQ0FBQyxrVUFBRCxFQUFvVSxpV0FBcFUsQ0FBNUQ7TUFBbXVCLFVBQUEsRUFBVyxDQUFDLGdCQUFELEVBQWtCLFdBQWxCLEVBQThCLGVBQTlCLENBQTl1QjtNQUE2eEIsT0FBQSxFQUFRO1FBQUM7VUFBQyxPQUFBLEVBQVEsOEJBQVQ7VUFBd0MsT0FBQSxFQUFRLElBQWhEO1VBQXFELFFBQUEsRUFBUyxHQUE5RDtVQUFrRSxNQUFBLEVBQU8sSUFBekU7U0FBRCxFQUFnRjtVQUFDLE9BQUEsRUFBUSw2QkFBVDtVQUF1QyxPQUFBLEVBQVEsR0FBL0M7VUFBbUQsUUFBQSxFQUFTLEdBQTVEO1VBQWdFLE9BQUEsRUFBUSxJQUF4RTtVQUE2RSxNQUFBLEVBQU8sSUFBcEY7U0FBaEYsRUFBMEs7VUFBQyxPQUFBLEVBQVEsNkJBQVQ7VUFBdUMsT0FBQSxFQUFRLEdBQS9DO1VBQW1ELFFBQUEsRUFBUyxHQUE1RDtVQUFnRSxPQUFBLEVBQVEsSUFBeEU7U0FBMUssRUFBd1A7VUFBQyxPQUFBLEVBQVEsNkJBQVQ7VUFBdUMsT0FBQSxFQUFRLEdBQS9DO1VBQW1ELFFBQUEsRUFBUyxHQUE1RDtTQUF4UCxFQUF5VDtVQUFDLE9BQUEsRUFBUSw4QkFBVDtVQUF3QyxPQUFBLEVBQVEsSUFBaEQ7VUFBcUQsUUFBQSxFQUFTLEdBQTlEO1VBQWtFLE1BQUEsRUFBTyxJQUF6RTtTQUF6VCxFQUF3WTtVQUFDLE9BQUEsRUFBUSw2QkFBVDtVQUF1QyxPQUFBLEVBQVEsR0FBL0M7VUFBbUQsUUFBQSxFQUFTLEdBQTVEO1VBQWdFLE1BQUEsRUFBTyxJQUF2RTtTQUF4WSxFQUFxZDtVQUFDLE9BQUEsRUFBUSw2QkFBVDtVQUF1QyxPQUFBLEVBQVEsR0FBL0M7VUFBbUQsUUFBQSxFQUFTLEdBQTVEO1NBQXJkLEVBQXNoQjtVQUFDLE9BQUEsRUFBUSw2QkFBVDtVQUF1QyxNQUFBLEVBQU8sSUFBOUM7VUFBbUQsT0FBQSxFQUFRLElBQTNEO1VBQWdFLE9BQUEsRUFBUSxHQUF4RTtVQUE0RSxRQUFBLEVBQVMsR0FBckY7U0FBdGhCLEVBQWduQjtVQUFDLE9BQUEsRUFBUSw2QkFBVDtVQUF1QyxNQUFBLEVBQU8sSUFBOUM7VUFBbUQsT0FBQSxFQUFRLEdBQTNEO1VBQStELFFBQUEsRUFBUyxHQUF4RTtTQUFobkIsRUFBNnJCO1VBQUMsT0FBQSxFQUFRLDhCQUFUO1VBQXdDLE9BQUEsRUFBUSxHQUFoRDtVQUFvRCxRQUFBLEVBQVMsR0FBN0Q7U0FBN3JCLEVBQSt2QjtVQUFDLE9BQUEsRUFBUSw4QkFBVDtVQUF3QyxPQUFBLEVBQVEsR0FBaEQ7VUFBb0QsUUFBQSxFQUFTLEdBQTdEO1NBQS92QixFQUFpMEI7VUFBQyxPQUFBLEVBQVEsOEJBQVQ7VUFBd0MsTUFBQSxFQUFPLElBQS9DO1VBQW9ELE9BQUEsRUFBUSxJQUE1RDtVQUFpRSxPQUFBLEVBQVEsR0FBekU7VUFBNkUsUUFBQSxFQUFTLEdBQXRGO1NBQWowQixFQUE0NUI7VUFBQyxPQUFBLEVBQVEsOEJBQVQ7VUFBd0MsT0FBQSxFQUFRLEdBQWhEO1VBQW9ELFFBQUEsRUFBUyxHQUE3RDtTQUE1NUIsRUFBODlCO1VBQUMsT0FBQSxFQUFRLCtCQUFUO1VBQXlDLE9BQUEsRUFBUSxJQUFqRDtVQUFzRCxRQUFBLEVBQVMsR0FBL0Q7U0FBOTlCO09BQXJ5QjtLQUEvMEQ7SUFBd3BILFNBQUEsRUFBVTtNQUFDLFFBQUEsRUFBUyxTQUFWO01BQW9CLE9BQUEsRUFBUSxVQUE1QjtNQUF1QyxhQUFBLEVBQWMsQ0FBQyxrVUFBRCxFQUFvVSxpV0FBcFUsQ0FBckQ7TUFBNHRCLFVBQUEsRUFBVyxDQUFDLGdCQUFELEVBQWtCLFdBQWxCLEVBQThCLGVBQTlCLENBQXZ1QjtNQUFzeEIsT0FBQSxFQUFRO1FBQUM7VUFBQyxPQUFBLEVBQVEseUJBQVQ7VUFBbUMsT0FBQSxFQUFRLEdBQTNDO1VBQStDLFFBQUEsRUFBUyxHQUF4RDtVQUE0RCxNQUFBLEVBQU8sSUFBbkU7U0FBRCxFQUEwRTtVQUFDLE9BQUEsRUFBUSx5QkFBVDtVQUFtQyxPQUFBLEVBQVEsR0FBM0M7VUFBK0MsUUFBQSxFQUFTLEdBQXhEO1NBQTFFLEVBQXVJO1VBQUMsT0FBQSxFQUFRLDBCQUFUO1VBQW9DLE9BQUEsRUFBUSxJQUE1QztVQUFpRCxRQUFBLEVBQVMsR0FBMUQ7VUFBOEQsTUFBQSxFQUFPLElBQXJFO1NBQXZJLEVBQWtOO1VBQUMsT0FBQSxFQUFRLHlCQUFUO1VBQW1DLE1BQUEsRUFBTyxJQUExQztVQUErQyxPQUFBLEVBQVEsR0FBdkQ7VUFBMkQsUUFBQSxFQUFTLEdBQXBFO1NBQWxOLEVBQTJSO1VBQUMsT0FBQSxFQUFRLHlCQUFUO1VBQW1DLE9BQUEsRUFBUSxHQUEzQztVQUErQyxRQUFBLEVBQVMsR0FBeEQ7U0FBM1IsRUFBd1Y7VUFBQyxPQUFBLEVBQVEsMEJBQVQ7VUFBb0MsTUFBQSxFQUFPLElBQTNDO1VBQWdELE9BQUEsRUFBUSxJQUF4RDtVQUE2RCxRQUFBLEVBQVMsR0FBdEU7U0FBeFYsRUFBbWE7VUFBQyxPQUFBLEVBQVEseUJBQVQ7VUFBbUMsTUFBQSxFQUFPLElBQTFDO1VBQStDLE9BQUEsRUFBUSxHQUF2RDtVQUEyRCxRQUFBLEVBQVMsR0FBcEU7U0FBbmEsRUFBNGU7VUFBQyxPQUFBLEVBQVEseUJBQVQ7VUFBbUMsT0FBQSxFQUFRLEdBQTNDO1VBQStDLFFBQUEsRUFBUyxHQUF4RDtVQUE0RCxNQUFBLEVBQU8sSUFBbkU7U0FBNWUsRUFBcWpCO1VBQUMsT0FBQSxFQUFRLHlCQUFUO1VBQW1DLE9BQUEsRUFBUSxHQUEzQztVQUErQyxRQUFBLEVBQVMsR0FBeEQ7U0FBcmpCO09BQTl4QjtLQUFscUg7SUFBb2pLLFlBQUEsRUFBYTtNQUFDLFFBQUEsRUFBUyxZQUFWO01BQXVCLE9BQUEsRUFBUSxZQUEvQjtNQUE0QyxhQUFBLEVBQWMsQ0FBQyxrVUFBRCxFQUFvVSxpV0FBcFUsQ0FBMUQ7TUFBaXVCLFVBQUEsRUFBVyxDQUFDLGdCQUFELEVBQWtCLFdBQWxCLEVBQThCLGVBQTlCLENBQTV1QjtNQUEyeEIsT0FBQSxFQUFRO1FBQUM7VUFBQyxPQUFBLEVBQVEsNEJBQVQ7VUFBc0MsT0FBQSxFQUFRLEdBQTlDO1VBQWtELFFBQUEsRUFBUyxHQUEzRDtVQUErRCxNQUFBLEVBQU8sSUFBdEU7U0FBRCxFQUE2RTtVQUFDLE9BQUEsRUFBUSw0QkFBVDtVQUFzQyxPQUFBLEVBQVEsR0FBOUM7VUFBa0QsUUFBQSxFQUFTLEdBQTNEO1NBQTdFLEVBQTZJO1VBQUMsT0FBQSxFQUFRLDRCQUFUO1VBQXNDLE9BQUEsRUFBUSxHQUE5QztVQUFrRCxRQUFBLEVBQVMsR0FBM0Q7VUFBK0QsTUFBQSxFQUFPLElBQXRFO1NBQTdJLEVBQXlOO1VBQUMsT0FBQSxFQUFRLDRCQUFUO1VBQXNDLE9BQUEsRUFBUSxHQUE5QztVQUFrRCxRQUFBLEVBQVMsR0FBM0Q7VUFBK0QsT0FBQSxFQUFRLElBQXZFO1NBQXpOLEVBQXNTO1VBQUMsT0FBQSxFQUFRLDRCQUFUO1VBQXNDLE9BQUEsRUFBUSxHQUE5QztVQUFrRCxRQUFBLEVBQVMsR0FBM0Q7VUFBK0QsTUFBQSxFQUFPLElBQXRFO1NBQXRTLEVBQWtYO1VBQUMsT0FBQSxFQUFRLDRCQUFUO1VBQXNDLE9BQUEsRUFBUSxHQUE5QztVQUFrRCxRQUFBLEVBQVMsR0FBM0Q7U0FBbFgsRUFBa2I7VUFBQyxPQUFBLEVBQVEsNEJBQVQ7VUFBc0MsT0FBQSxFQUFRLEdBQTlDO1VBQWtELFFBQUEsRUFBUyxHQUEzRDtTQUFsYixFQUFrZjtVQUFDLE9BQUEsRUFBUSw2QkFBVDtVQUF1QyxPQUFBLEVBQVEsSUFBL0M7VUFBb0QsUUFBQSxFQUFTLEdBQTdEO1VBQWlFLE1BQUEsRUFBTyxJQUF4RTtTQUFsZixFQUFna0I7VUFBQyxPQUFBLEVBQVEsNEJBQVQ7VUFBc0MsT0FBQSxFQUFRLEdBQTlDO1VBQWtELFFBQUEsRUFBUyxHQUEzRDtVQUErRCxNQUFBLEVBQU8sSUFBdEU7U0FBaGtCLEVBQTRvQjtVQUFDLE9BQUEsRUFBUSw2QkFBVDtVQUF1QyxPQUFBLEVBQVEsR0FBL0M7VUFBbUQsUUFBQSxFQUFTLEdBQTVEO1VBQWdFLE9BQUEsRUFBUSxJQUF4RTtTQUE1b0IsRUFBMHRCO1VBQUMsT0FBQSxFQUFRLDZCQUFUO1VBQXVDLE9BQUEsRUFBUSxHQUEvQztVQUFtRCxRQUFBLEVBQVMsR0FBNUQ7U0FBMXRCO09BQW55QjtLQUFqa0s7SUFBaW9OLE1BQUEsRUFBTztNQUFDLFFBQUEsRUFBUyxNQUFWO01BQWlCLE9BQUEsRUFBUSxNQUF6QjtNQUFnQyxhQUFBLEVBQWMsQ0FBQyxrVUFBRCxFQUFvVSxpV0FBcFUsQ0FBOUM7TUFBcXRCLFVBQUEsRUFBVyxDQUFDLGdCQUFELEVBQWtCLFdBQWxCLEVBQThCLGVBQTlCLENBQWh1QjtNQUErd0IsT0FBQSxFQUFRO1FBQUM7VUFBQyxPQUFBLEVBQVEsc0JBQVQ7VUFBZ0MsT0FBQSxFQUFRLEdBQXhDO1VBQTRDLFFBQUEsRUFBUyxHQUFyRDtVQUF5RCxNQUFBLEVBQU8sSUFBaEU7U0FBRCxFQUF1RTtVQUFDLE9BQUEsRUFBUSxzQkFBVDtVQUFnQyxPQUFBLEVBQVEsR0FBeEM7VUFBNEMsUUFBQSxFQUFTLEdBQXJEO1VBQXlELE9BQUEsRUFBUSxJQUFqRTtTQUF2RSxFQUE4STtVQUFDLE9BQUEsRUFBUSxzQkFBVDtVQUFnQyxPQUFBLEVBQVEsR0FBeEM7VUFBNEMsUUFBQSxFQUFTLEdBQXJEO1VBQXlELE9BQUEsRUFBUSxJQUFqRTtTQUE5SSxFQUFxTjtVQUFDLE9BQUEsRUFBUSx1QkFBVDtVQUFpQyxPQUFBLEVBQVEsSUFBekM7VUFBOEMsUUFBQSxFQUFTLEdBQXZEO1VBQTJELE1BQUEsRUFBTyxJQUFsRTtTQUFyTixFQUE2UjtVQUFDLE9BQUEsRUFBUSxzQkFBVDtVQUFnQyxPQUFBLEVBQVEsR0FBeEM7VUFBNEMsUUFBQSxFQUFTLEdBQXJEO1VBQXlELE9BQUEsRUFBUSxJQUFqRTtTQUE3UixFQUFvVztVQUFDLE9BQUEsRUFBUSxzQkFBVDtVQUFnQyxPQUFBLEVBQVEsR0FBeEM7VUFBNEMsUUFBQSxFQUFTLEdBQXJEO1VBQXlELE1BQUEsRUFBTyxJQUFoRTtTQUFwVyxFQUEwYTtVQUFDLE9BQUEsRUFBUSxzQkFBVDtVQUFnQyxPQUFBLEVBQVEsR0FBeEM7VUFBNEMsUUFBQSxFQUFTLEdBQXJEO1NBQTFhLEVBQW9lO1VBQUMsT0FBQSxFQUFRLHVCQUFUO1VBQWlDLE9BQUEsRUFBUSxJQUF6QztVQUE4QyxRQUFBLEVBQVMsR0FBdkQ7VUFBMkQsTUFBQSxFQUFPLElBQWxFO1NBQXBlLEVBQTRpQjtVQUFDLE9BQUEsRUFBUSxzQkFBVDtVQUFnQyxPQUFBLEVBQVEsR0FBeEM7VUFBNEMsUUFBQSxFQUFTLEdBQXJEO1VBQXlELE1BQUEsRUFBTyxJQUFoRTtTQUE1aUIsRUFBa25CO1VBQUMsT0FBQSxFQUFRLHVCQUFUO1VBQWlDLE9BQUEsRUFBUSxHQUF6QztVQUE2QyxRQUFBLEVBQVMsR0FBdEQ7VUFBMEQsT0FBQSxFQUFRLElBQWxFO1NBQWxuQixFQUEwckI7VUFBQyxPQUFBLEVBQVEsdUJBQVQ7VUFBaUMsT0FBQSxFQUFRLEdBQXpDO1VBQTZDLFFBQUEsRUFBUyxHQUF0RDtTQUExckIsRUFBcXZCO1VBQUMsT0FBQSxFQUFRLHVCQUFUO1VBQWlDLE9BQUEsRUFBUSxHQUF6QztVQUE2QyxRQUFBLEVBQVMsR0FBdEQ7VUFBMEQsTUFBQSxFQUFPLElBQWpFO1NBQXJ2QixFQUE0ekI7VUFBQyxPQUFBLEVBQVEsdUJBQVQ7VUFBaUMsT0FBQSxFQUFRLEdBQXpDO1VBQTZDLFFBQUEsRUFBUyxHQUF0RDtTQUE1ekI7T0FBdnhCO0tBQXhvTjtHQUF4NkM7OztBQ0FULElBQUE7O0FBQUEsS0FBQSxHQUVFO0VBQUEsQ0FBQSxFQUFHLFNBQUE7V0FDRCxRQUFRLENBQUMsQ0FBVCxDQUFBO0VBREMsQ0FBSCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJfID1cblxuICBpOiAtPlxuICAgIEBjb25zb2xlID0gc2V0SW50ZXJ2YWwoQGRldGVjdC5iaW5kKEApLCAyMDApXG5cbiAgcDpcbiAgICBvZmZpbmc6IGZhbHNlXG4gICAgb2ZmdGltZTogMFxuXG4gIHR1cm46IChlbCwgcmVtb3ZlPWZhbHNlLCBhZGQ9ZmFsc2UpIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIHJlbW92ZSBpc250IGZhbHNlXG4gICAgICBlbC5yZW1vdmVDbGFzcyhyZW1vdmUpXG5cbiAgICBpZiBhZGQgaXNudCBmYWxzZVxuICAgICAgZWwuYWRkQ2xhc3MoYWRkKVxuXG4gICAgcmV0dXJuIHRydWVcblxuICBvZmY6IChlbCwgcD17fSkgLT5cblxuICAgIGlmIHAub2ZmaW5nIGFuZCBwLm9mZnRpbWUgPiAwXG5cbiAgICAgIEB0dXJuIGVsLCBmYWxzZSwgJ29mZmluZydcbiAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgQHR1cm4gZWwsICdvZmZpbmcnLCBmYWxzZVxuICAgICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcbiAgICAgICwgcC5vZmZ0aW1lKjEwMDAgKyAxMDBcblxuICAgIGVsc2VcbiAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuXG4gICAgcmV0dXJuXG5cbiAgb246IChlbCwgcCkgLT5cbiAgICBAdHVybiBlbCwgJ29mZicsICdvbidcblxuICBzd2FwOiAoZWwsIHApIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIGVsLmhhc0NsYXNzICdvZmYnXG4gICAgICBAb24gZWwsIHBcbiAgICBlbHNlXG4gICAgICBAb2ZmIGVsLCBwXG5cbiAgICByZXR1cm5cblxuICBlbmNvZGU6IChzdHIpIC0+XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpXG4gICAgICAucmVwbGFjZSgvIS9nLCAnJTIxJylcbiAgICAgIC5yZXBsYWNlKC8nL2csICclMjcnKVxuICAgICAgLnJlcGxhY2UoL1xcKC9nLCAnJTI4JylcbiAgICAgIC5yZXBsYWNlKC9cXCkvZywgJyUyOScpXG4gICAgICAucmVwbGFjZSgvXFwqL2csICclMkEnKVxuICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpXG5cbiAgdDogKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkgLT5cbiAgICBfZ2FxLnB1c2ggWydfdHJhY2tFdmVudCcsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZV1cblxuICByYW5kOiAobWluLCBtYXgpIC0+XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkgKyBtaW5cblxuICByYW5nZTogKHN0YXJ0LCBlbmQpIC0+XG4gICAgcmVzdWx0ID0gW11cbiAgICBmb3IgbnVtIGluIFtzdGFydC4uZW5kXVxuICAgICAgcmVzdWx0LnB1c2ggbnVtXG4gICAgcmVzdWx0XG5cbiAgZml0OiAoc3JjV2lkdGgsIHNyY0hlaWdodCwgbWF4V2lkdGgsIG1heEhlaWdodCkgLT5cbiAgICByYXRpbyA9IE1hdGgubWluKG1heFdpZHRoIC8gc3JjV2lkdGgsIG1heEhlaWdodCAvIHNyY0hlaWdodClcbiAgICB3aWR0aDogc3JjV2lkdGgqcmF0aW8sIGhlaWdodDogc3JjSGVpZ2h0KnJhdGlvXG5cbiAgaGV4MnJnYjogKGhleCkgLT5cbiAgICByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KVxuICAgIHI6IHBhcnNlSW50KHJlc3VsdFsxXSwgMTYpLFxuICAgIGc6IHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpLFxuICAgIGI6IHBhcnNlSW50KHJlc3VsdFszXSwgMTYpXG4gXG4gIG9iamM6IChvYmopIC0+XG4gICAgKGsgZm9yIG93biBrIG9mIG9iaikubGVuZ3RoXG5cbiAgbG9hZDogKHNjcmlwdCwgaW5pdGlhdGUsIGNvbXBsZXRlKSAtPlxuXG4gICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzY3JpcHQnXG4gICAgZWwudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgZWwuc3JjID0gc2NyaXB0XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lciAnbG9hZCcgLCAoZSkgLT5cbiAgICAgIGNvbXBsZXRlKCkgaWYgdHlwZW9mIGNvbXBsZXRlIGlzICdmdW5jdGlvbidcbiAgICAgIHdpbmRvd1tpbml0aWF0ZV0uaSgpIGlmIGluaXRpYXRlIGlzbnQgdW5kZWZpbmVkIGFuZCBpbml0aWF0ZSBpc250IGZhbHNlXG4gICAgLCBmYWxzZVxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbClcblxuICBqaW5pdDogLT5cbiAgICAkLmFqYXhTZXR1cFxuICAgICAgZGF0YVR5cGU6IFwianNvblwiXG5cbiAgcGF0Y2g6ICh1cmwsIGRhdGEpIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAganBhdGNoID0gJC5hamF4XG4gICAgICB1cmw6IHVybFxuICAgICAgZGF0YTogZGF0YVxuICAgICAgdHlwZTogJ1BBVENIJ1xuXG4gICAganBhdGNoLmZhaWwgKHJlc3BvbnNlKSAtPlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4ganBhdGNoXG5cbiAgZ2V0OiAoYXJncy4uLikgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqZ2V0ID0gJC5nZXQgYXJncy4uLlxuXG4gICAgamdldC5mYWlsIChyZXNwb25zZSkgPT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuICAgICAgamdldC5mYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpnZXRcblxuICBwb3N0OiAoYXJncy4uLikgLT5cblxuICAgIGpwb3N0ID0gJC5wb3N0IGFyZ3MuLi5cblxuICAgIGpwb3N0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG4gICAgICBqcG9zdC5mYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwb3N0XG5cbiAgZmFpbDogKHJlc3BvbnNlKSAtPlxuXG4gICAgZXJyb3IgPSByZXNwb25zZS5yZXNwb25zZUpTT04/LmVycm9ycz9bMF1cbiAgICBpZiBlcnJvciBpcyB1bmRlZmluZWRcbiAgICAgIHJldHVybiBQcm9tcHQuaSByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLnN0YXR1c1RleHRcblxuICAgIHB1ZyA9IGVycm9yLm1lc3NhZ2UubWF0Y2ggL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKykvXG4gICAgaWYgcHVnIGlzbnQgbnVsbFxuICAgICAgZXJyb3IubWVzc2FnZSA9IGVycm9yLm1lc3NhZ2UucmVwbGFjZSAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS8sICcnXG4gICAgICBlcnJvci5maWxlID0gcHVnWzFdXG4gICAgICBlcnJvci5saW5lID0gcHVnWzJdXG5cbiAgICBmaWxlID0gQGVuY29kZSBcIiN7ZXJyb3IuZmlsZX1cIlxuXG4gICAgc3dpdGNoIGNvbmZpZy5hcHAuZWRpdG9yXG4gICAgICB3aGVuICdtYWN2aW0nIHRoZW4gZWRpdG9yID0gJ212aW06Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnc3VibGltZScgdGhlbiBlZGl0b3IgPSAnc3VibDovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdlbWFjcycgdGhlbiBlZGl0b3IgPSAnZW1hY3M6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAndGV4dG1hdGUnIHRoZW4gZWRpdG9yID0gJ3RleHRtYXRlOi8vb3Blbi8/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdwaHBzdG9ybScgdGhlbiBlZGl0b3IgPSAncGhwc3Rvcm06Ly9vcGVuP2ZpbGU9J1xuXG4gICAgaWYgZXJyb3IuZmlsZSBpc250IG51bGxcbiAgICAgIGJvZHkgPSBcIlwiXCJcbiAgICAgICAgPHByZT4je2Vycm9yLm1lc3NhZ2V9PC9wcmU+XG4gICAgICAgIDxhIGhyZWY9XCIje2VkaXRvcn0je2ZpbGV9JmxpbmU9I3tlcnJvci5saW5lfVwiPjxiPiN7ZXJyb3IuZmlsZX06I3tlcnJvci5saW5lfTwvYj48L2E+XG4gICAgICBcIlwiXCJcbiAgICBlbHNlXG4gICAgICBib2R5ID0gZXJyb3IubWVzc2FnZVxuXG4gICAgUHJvbXB0LmkgZXJyb3IudHlwZSwgYm9keSwgWydPSyddXG5cbiAgbWV0aG9kczogKG9iaikgLT5cbiAgICByZXMgPSBbXVxuICAgIGZvciBpLG0gb2Ygb2JqXG4gICAgICBpZiB0eXBlb2YgbSBpcyAnZnVuY3Rpb24nXG4gICAgICAgIHJlcy5wdXNoIG1cbiAgICByZXR1cm4gcmVzXG5cbiAgbGxjOiAtPlxuICAgIGFzY2lpID0gXCJcIlwiXG5cbiAgICAgICVjbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uLi4uLTo6Ly86Oi0uLi4uLi4uLTo6Ojo6Ojo6Ojo6OjotLi4uLi4uLi4tOjovLy86LS5vbW1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi46K3loZGRkZGRkaHkrLS4uLi4vZGRkZGRkZGRkZGRkZCsuLi4uLi4vc2hkZGRkZGRkeW9kbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLWhtbW1oeXl5eWRtbW1oOi4uLi9tbW1taGhoaGhoaGhoKy4uLi46eWRtbWRoeXl5aGRkb29tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLXNzOi0uLi4uLXltbW15Li4uL21tbW0tLS0tLS0tLS0uLi4uOmRtbW1zOi0uLi4tOi8uLW1cbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4ueW1tbXkuLi4vbW1tbS0vK29vbys6LS4uLi55bW1teS06K29vbysvLS4uZFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNtbW1kOi4uLi9tbW1taG1tbW1tbWRoKy4uLmRtbW1zaGRtbW1tbW1ocy1oXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNkbW1keTouLi4uOmhoZGhvKy8vK3ltbW1tKy4uZG1tbWR5by8vK3NkbW1taGhcbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4tK3lkbW1keS8uLi4uLi4uLS06Li4uLi4uLnNtbW1oLi55bW1tcy4uLi4uLjptbW1tbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi06c2htbW1kcy8tLS0tLS4uLi46cy8tLS4uLi06aG1tbXMuLjpkbW1kLy0uLi4tb21tbW1tXG4gICAgICBtby4uLi4uLi4uLi4uLi4uaG1tbW1tbWhoaGhoaGhoLi4uK2RtbWRoeXl5aGRtbW15LS4uLi9obW1taHl5eWhtbW1kaG1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi5kZGRkZGRkZGRkZGRkZGQuLi4tK3NoZGRkZGRkZGh5Ly0uLi4uLi1veWRkZGRkZGRobzpkbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLjo6Ojo6Ojo6Ojo6Ojo6Oi4uLi4uLi4tOi8vLzo6LS4uLi4uLi4uLi4uLTovLy86LS4ub21tXG4gICAgICBtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cblxuICAgICAgOjogc3ludGFjdGljIHN1Z2FyIGJ5IDI1NlxuICAgICAgOjogaHR0cDovLzI1Ni5pby9cbiAgICAgIDo6ICN7Y29uZmlnLm1ldGEucmVwb31cbiAgICBcIlwiXCJcbiAgICBjb25zb2xlLmxvZyBhc2NpaSwgXCJjb2xvcjogZ3JleTsgZm9udC1mYW1pbHk6IE1lbmxvLCBtb25vc3BhY2U7XCJcblxuICBkZXRlY3Q6IC0+XG4gICAgaWYgKCgod2luZG93Lm91dGVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KSA+IDEwMCkgfHwgKCh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpbmRvdy5pbm5lcldpZHRoKSA+IDEwMCkpXG4gICAgICBAbGxjKClcbiAgICAgIGNsZWFySW50ZXJ2YWwgQGNvbnNvbGVcblxuXy5pKClcbiIsIlxuQmx1cmxvYWQgPSBcblxuICBpOiAtPlxuXG4gICAgJCgnLnRpbGVzID4gLnRpbGUgPiAuaW1hZ2Uub2ZmJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBzcmMgPSAkKGVsKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKS5yZXBsYWNlKC91cmxcXChcIiguKj8pXCJcXCkvLCBcIiQxXCIpXG4gICAgICBpbWFnZSA9IG5ldyBJbWFnZSgpXG4gICAgICBpbWFnZS5zcmMgPSBzcmNcbiAgICAgIGltYWdlLm9ubG9hZCA9IC0+XG4gICAgICAgIF8ub24gZWxcblxuIiwiY29uZmlnID0ge1wiY29sb3JcIjp7XCJ3aGl0ZTFcIjpcIiNmZmZmZmZcIixcImJsYWNrMVwiOlwiIzAwMDAwMFwiLFwiZ29sZDFcIjpcIiNhZDk4NmVcIixcImJsdWUxXCI6XCIjNDY1MDYyXCIsXCJncmV5MVwiOlwiI2FjYTM5YVwifSxcImZvbnRcIjp7XCJoMVwiOntcImZvbnQtZmFtaWx5XCI6XCJjaHJvbmljbGUgcm9tYW5cIixcImZvbnQtc2l6ZVwiOlwiNDBweFwifSxcImgyXCI6e1wiZm9udC1mYW1pbHlcIjpcImNocm9uaWNsZSByb21hblwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwiLFwiZm9udC1zaXplXCI6XCIyMHB4XCJ9LFwiaDNcIjp7XCJmb250LWZhbWlseVwiOlwiY2hyb25pY2xlIHJvbWFuXCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMnB4XCIsXCJmb250LXNpemVcIjpcIjE1cHhcIn0sXCJjb3B5MVwiOntcImZvbnQtZmFtaWx5XCI6XCJjaHJvbmljbGUgcm9tYW5cIixcImZvbnQtc2l6ZVwiOlwiMTZweFwifSxcImNvcHkyXCI6e1wiZm9udC1mYW1pbHlcIjpcImNocm9uaWNsZSByb21hblwiLFwiZm9udC1zaXplXCI6XCIxMnB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMnB4XCJ9LFwiY29weTNcIjp7XCJmb250LWZhbWlseVwiOlwiZW5ncmF2ZXJzIHJlZ3VsYXJcIixcImZvbnQtc2l6ZVwiOlwiMTJweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwifX0sXCJtZXRhXCI6e1widGl0bGVcIjpcIkRlc2lnbnNha2UgU3R1ZGlvXCIsXCJ1cmxcIjpcImh0dHA6Ly93d3cuZGVzaWduc2FrZXN0dWRpby5jb20vXCIsXCJkZXNjcmlwdGlvblwiOlwiQm91dGlxdWUgZGVzaWduIHN0dWRpbyB0aGF0IHNwZWNpYWxpemVzIGluIGJyYW5kaW5nLCBwYWNrYWdpbmcsIHdlYiBkZXNpZ24sIGFuZCBkZXZlbG9wbWVudFwiLFwia2V5d29yZHNcIjpcImRlc2lnbiwgZ3JhcGhpYyBkZXNpZ24sIGJyYW5kaW5nLCBwYWNrYWdpbmcsIHdlYiBkZXNpZ24sIHdlYiBkZXZlbG9wbWVudCwgYXJ0IGRpcmVjdGlvbiwgZGVzaWduc2FrZSxcIixcImltYWdlXCI6XCJpbWcvc2hhcmUuanBnXCIsXCJyZXBvXCI6XCJodHRwczovL2dpdGh1Yi5jb20vYWNpZGphenovc2FrZTJcIn0sXCJzb2NpYWxcIjp7XCJpbnN0YWdyYW1cIjpcImh0dHA6Ly93d3cuaW5zdGFncmFtLmNvbS9kZXNpZ25zYWtlc3R1ZGlvXCIsXCJmYWNlYm9va1wiOlwiaHR0cDovL3d3dy5mYWNlYm9vay5jb20vZGVzaWduc2FrZXN0dWRpb1wiLFwicGludGVyZXN0XCI6XCJodHRwOi8vd3d3LnBpbnRlcmVzdC5jb20vZGVzaWduc2FrZXNmXCIsXCJkcmliYmJsZVwiOlwiaHR0cDovL3d3dy5waW50ZXJlc3QuY29tL2Rlc2lnbnNha2VzZlwiLFwiYmVoYW5jZVwiOlwiaHR0cDovL3d3dy5waW50ZXJlc3QuY29tL2Rlc2lnbnNha2VzZlwiLFwibWFpbFwiOlwiaW5mb0BkZXNpZ25zYWtlc3R1ZGlvLmNvbVwiLFwibWFwXCI6XCJodHRwczovL3d3dy5nb29nbGUuY29tL21hcHMvcGxhY2UvRGVzaWduc2FrZStTdHVkaW8vQDM3Ljc2NjQ2MTYsLTEyMi40MDU2OTk0LDE3ei9kYXRhPSEzbTEhNGIxITRtNSEzbTQhMXMweDgwOGY3ZTMyOTI3MGY3YWY6MHhhYjAyN2I2ZGM2NmZhZTZjIThtMiEzZDM3Ljc2NjQ2MTYhNGQtMTIyLjQwMzUxMDdcIixcInBob25lXCI6NDE1NTA5MzUwOH0sXCJ3b3JrXCI6e1wiYnJvd25cIjp7XCJmb2xkZXJcIjpcImJyb3duXCIsXCJ0aXRsZVwiOlwiYnJvd24gZXN0YXRlXCIsXCJkZXNjcmlwdGlvblwiOltcIkRFU0lHTlNBS0UgU1RVRElPIFNBVyBBTiBPUFBPUlRVTklUWSBUTyBTSEFLRSBVUCBUSEUgRVZFUi1HUk9XSU5HIENBTk5BQklTIFNQQUNFIFdJVEggQSBGUkVTSCBBUFBST0FDSCBGVUxMIE9GIENBTElGT1JOSUEgU09VTC4gVEhFIERFU0lHTlNBS0UgVEVBTSBQQUlSRUQgUkVUUk8gVFlQT0dSQVBIWSBXSVRIIEJSSUdIVCBDT0xPUlMgQU5EIE1PREVSTiBHRU9NRVRSSUMgUEFUVEVSTlMuIEEgQk9MRCBHUkFESUVOVCBJTlNQSVJFRCBCWSBOQVRVUkXigJlTIFNLSUVTIEFORCBTUExBU0hFUyBPRiBHT0xEIEZPSUwgQUREIEEgQlVSU1QgT0YgUFJFTUlVTSBTSElORS5cIixcIklOU1BJUkVEIEJZIENBTElGT1JOSUHigJlTIFdBUk0gQU5EIElOVklHT1JBVElORyBTVU5TSElORSwgRlVMTCBTVU4gSVMgQSAxMDAlIEFMTC1OQVRVUkFMLCBTVVNUQUlOQUJMWSBGQVJNRUQgQ0FOTkFCSVMgTElORS4gUFJPVURMWSBSQUlTRUQgVU5ERVIgVEhFIFNVTkJFTFQgT0YgSFVNQk9MRFQgQ09VTlRZLCBUSElTIEJSQU5E4oCZUyBQUk9EVUNUIExJTkUgSVMgQSBSRVNVTFQgT0YgTUVMTE9XIE9DRUFOIEJSRUVaRVMsIFRPV0VSSU5HIFJFRFdPT0RTIEFORCBTVU4tRFJFTkNIRUQgSElMTFNJREVTLCBZSUVMRElORyBDQU5OQUJJUyBPRiBVTlBBUkFMTEVMRUQgUVVBTElUWSwgVEFTVEUsIEFORCBQRVJGT1JNQU5DRS5cIl0sXCJzZXJ2aWNlc1wiOltcImJyYW5kIGlkZW50aXR5XCIsXCJwYWNrYWdpbmdcIixcImFydCBkaXJlY3Rpb25cIl0sXCJ0aWxlc1wiOlt7XCJpbWFnZVwiOlwiQnJvd25fMTA3OXg3MjVweF8xLmpwZ1wiLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NzI1LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJCcm93bl81MjB4NzYycHhfMi5qcGdcIixcImxlZnRcIjp0cnVlLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjo3NjJ9LHtcImltYWdlXCI6XCJCcm93bl81Mjd4MzY1cHhfMy5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6MzY1LFwic3RhY2tcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fNTI3eDM2NXB4XzQuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjM2NX0se1wiaW1hZ2VcIjpcIkJyb3duXzEwNzl4NjI1cHhfNS5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjYyNSxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fMzM5eDUzMHB4XzYuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6NTMwfSx7XCJpbWFnZVwiOlwiQnJvd25fMzM5eDUzMHB4XzcuanBnXCIsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjUzMCxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fMzM5eDUzMHB4XzguanBnXCIsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjUzMH0se1wiaW1hZ2VcIjpcIkJyb3duXzcwN3g3MDBweF8xMS5qcGdcIixcIndpZHRoXCI6NzA3LFwiaGVpZ2h0XCI6NzAwLFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fMzM5eDIyOXB4XzkuanBnXCIsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjIyOSxcInN0YWNrXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJyb3duXzY3OHg5MDBweF8xMC5qcGdcIixcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6NDM5LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJCcm93bl8xMDc5eDYyNXB4XzEyLmpwZ1wiLFwiZnVsbFwiOnRydWUsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo2MjV9LHtcImltYWdlXCI6XCJCcm93bl81MjB4NzYycHhfMTMuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjc2MixcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fNTI3eDM2NXB4XzE0LmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjozNjUsXCJzdGFja1wiOnRydWV9LHtcImltYWdlXCI6XCJCcm93bl81Mjd4MzY1cHhfMTUuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjM2NX1dfSxcImVsZGVzdGlsYWRvXCI6e1wiZm9sZGVyXCI6XCJlbGRlc3RpbGFkb1wiLFwidGl0bGVcIjpcImVsZGVzdGlsYWRvXCIsXCJkZXNjcmlwdGlvblwiOltcIkRFU0lHTlNBS0UgU1RVRElPIFNBVyBBTiBPUFBPUlRVTklUWSBUTyBTSEFLRSBVUCBUSEUgRVZFUi1HUk9XSU5HIENBTk5BQklTIFNQQUNFIFdJVEggQSBGUkVTSCBBUFBST0FDSCBGVUxMIE9GIENBTElGT1JOSUEgU09VTC4gVEhFIERFU0lHTlNBS0UgVEVBTSBQQUlSRUQgUkVUUk8gVFlQT0dSQVBIWSBXSVRIIEJSSUdIVCBDT0xPUlMgQU5EIE1PREVSTiBHRU9NRVRSSUMgUEFUVEVSTlMuIEEgQk9MRCBHUkFESUVOVCBJTlNQSVJFRCBCWSBOQVRVUkXigJlTIFNLSUVTIEFORCBTUExBU0hFUyBPRiBHT0xEIEZPSUwgQUREIEEgQlVSU1QgT0YgUFJFTUlVTSBTSElORS5cIixcIklOU1BJUkVEIEJZIENBTElGT1JOSUHigJlTIFdBUk0gQU5EIElOVklHT1JBVElORyBTVU5TSElORSwgRlVMTCBTVU4gSVMgQSAxMDAlIEFMTC1OQVRVUkFMLCBTVVNUQUlOQUJMWSBGQVJNRUQgQ0FOTkFCSVMgTElORS4gUFJPVURMWSBSQUlTRUQgVU5ERVIgVEhFIFNVTkJFTFQgT0YgSFVNQk9MRFQgQ09VTlRZLCBUSElTIEJSQU5E4oCZUyBQUk9EVUNUIExJTkUgSVMgQSBSRVNVTFQgT0YgTUVMTE9XIE9DRUFOIEJSRUVaRVMsIFRPV0VSSU5HIFJFRFdPT0RTIEFORCBTVU4tRFJFTkNIRUQgSElMTFNJREVTLCBZSUVMRElORyBDQU5OQUJJUyBPRiBVTlBBUkFMTEVMRUQgUVVBTElUWSwgVEFTVEUsIEFORCBQRVJGT1JNQU5DRS5cIl0sXCJzZXJ2aWNlc1wiOltcImJyYW5kIGlkZW50aXR5XCIsXCJwYWNrYWdpbmdcIixcImFydCBkaXJlY3Rpb25cIl0sXCJ0aWxlc1wiOlt7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fMTA3Nng1NTBweF8xLmpwZ1wiLFwid2lkdGhcIjoxMDc2LFwiaGVpZ2h0XCI6NTUwLFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb181MjB4MzY2cHhfMi5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6MzY2LFwic3RhY2tcIjp0cnVlLFwibGVmVFwiOnRydWV9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb181Mjd4OTMwcHhfMy5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6OTMwLFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTIweDUzMnB4XzQuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjUzMn0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzEwNzZ4NjM0cHhfNS5qcGdcIixcIndpZHRoXCI6MTA3NixcImhlaWdodFwiOjYzNCxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTIweDQ1NXB4XzYuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjQ1NSxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTI3eDQ1NXB4XzcuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjQ1NX0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzUyMHg2NDFweF84LmpwZ1wiLFwibGVmdFwiOnRydWUsXCJjbGVhclwiOnRydWUsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjY0MX0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzI0N3gzMDRweF85LmpwZ1wiLFwibGVmdFwiOnRydWUsXCJ3aWR0aFwiOjI0NyxcImhlaWdodFwiOjMwNH0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzI0N3gzMDRweF8xMC5qcGdcIixcIndpZHRoXCI6MjQ3LFwiaGVpZ2h0XCI6MzA0fSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTI4eDMwNHB4XzExLmpwZ1wiLFwid2lkdGhcIjo1MjgsXCJoZWlnaHRcIjozMDR9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb181MjB4NDQ1cHhfMTIuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcImNsZWFyXCI6dHJ1ZSxcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6NDQ1fSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTI3eDQ0NXB4XzEzLmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjo0NDV9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb18xMDc2eDU5NnB4XzEyLmpwZ1wiLFwid2lkdGhcIjoxMDc2LFwiaGVpZ2h0XCI6NTk2fV19LFwiZnVsbHN1blwiOntcImZvbGRlclwiOlwiZnVsbHN1blwiLFwidGl0bGVcIjpcImZ1bGwgc3VuXCIsXCJkZXNjcmlwdGlvblwiOltcIkRFU0lHTlNBS0UgU1RVRElPIFNBVyBBTiBPUFBPUlRVTklUWSBUTyBTSEFLRSBVUCBUSEUgRVZFUi1HUk9XSU5HIENBTk5BQklTIFNQQUNFIFdJVEggQSBGUkVTSCBBUFBST0FDSCBGVUxMIE9GIENBTElGT1JOSUEgU09VTC4gVEhFIERFU0lHTlNBS0UgVEVBTSBQQUlSRUQgUkVUUk8gVFlQT0dSQVBIWSBXSVRIIEJSSUdIVCBDT0xPUlMgQU5EIE1PREVSTiBHRU9NRVRSSUMgUEFUVEVSTlMuIEEgQk9MRCBHUkFESUVOVCBJTlNQSVJFRCBCWSBOQVRVUkXigJlTIFNLSUVTIEFORCBTUExBU0hFUyBPRiBHT0xEIEZPSUwgQUREIEEgQlVSU1QgT0YgUFJFTUlVTSBTSElORS5cIixcIklOU1BJUkVEIEJZIENBTElGT1JOSUHigJlTIFdBUk0gQU5EIElOVklHT1JBVElORyBTVU5TSElORSwgRlVMTCBTVU4gSVMgQSAxMDAlIEFMTC1OQVRVUkFMLCBTVVNUQUlOQUJMWSBGQVJNRUQgQ0FOTkFCSVMgTElORS4gUFJPVURMWSBSQUlTRUQgVU5ERVIgVEhFIFNVTkJFTFQgT0YgSFVNQk9MRFQgQ09VTlRZLCBUSElTIEJSQU5E4oCZUyBQUk9EVUNUIExJTkUgSVMgQSBSRVNVTFQgT0YgTUVMTE9XIE9DRUFOIEJSRUVaRVMsIFRPV0VSSU5HIFJFRFdPT0RTIEFORCBTVU4tRFJFTkNIRUQgSElMTFNJREVTLCBZSUVMRElORyBDQU5OQUJJUyBPRiBVTlBBUkFMTEVMRUQgUVVBTElUWSwgVEFTVEUsIEFORCBQRVJGT1JNQU5DRS5cIl0sXCJzZXJ2aWNlc1wiOltcImJyYW5kIGlkZW50aXR5XCIsXCJwYWNrYWdpbmdcIixcImFydCBkaXJlY3Rpb25cIl0sXCJ0aWxlc1wiOlt7XCJpbWFnZVwiOlwiRnVsbFN1bl82ODR4NTI1cHhfMS5qcGdcIixcIndpZHRoXCI6Njg0LFwiaGVpZ2h0XCI6NTI1LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJGdWxsU3VuXzM2NHg1MjVweF8yLmpwZ1wiLFwid2lkdGhcIjozNjQsXCJoZWlnaHRcIjo1MjV9LHtcImltYWdlXCI6XCJGdWxsU3VuXzEwNzh4NTM3cHhfMy5qcGdcIixcIndpZHRoXCI6MTA3OCxcImhlaWdodFwiOjUzNyxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRnVsbFN1bl81MTJ4NDUzcHhfNC5qcGdcIixcImxlZnRcIjp0cnVlLFwid2lkdGhcIjo1MTIsXCJoZWlnaHRcIjo0NTN9LHtcImltYWdlXCI6XCJGdWxsU3VuXzUzNng0NTNweF81LmpwZ1wiLFwid2lkdGhcIjo1MzUsXCJoZWlnaHRcIjo0NTN9LHtcImltYWdlXCI6XCJGdWxsU3VuXzEwNzh4NTM3cHhfNi5qcGdcIixcImZ1bGxcIjp0cnVlLFwid2lkdGhcIjoxMDc4LFwiaGVpZ2h0XCI6NTM3fSx7XCJpbWFnZVwiOlwiRnVsbFN1bl81MTJ4NDUzcHhfNy5qcGdcIixcImxlZnRcIjp0cnVlLFwid2lkdGhcIjo1MTIsXCJoZWlnaHRcIjo0NTN9LHtcImltYWdlXCI6XCJGdWxsU3VuXzUzNngyMDhweF84LmpwZ1wiLFwid2lkdGhcIjo1MzYsXCJoZWlnaHRcIjoyMDgsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkZ1bGxTdW5fNTM2eDIwOHB4XzkuanBnXCIsXCJ3aWR0aFwiOjUzNixcImhlaWdodFwiOjIwOH1dfSxcInN1ZmZlcmZlc3RcIjp7XCJmb2xkZXJcIjpcInN1ZmZlcmZlc3RcIixcInRpdGxlXCI6XCJzdWZmZXJmZXN0XCIsXCJkZXNjcmlwdGlvblwiOltcIkRFU0lHTlNBS0UgU1RVRElPIFNBVyBBTiBPUFBPUlRVTklUWSBUTyBTSEFLRSBVUCBUSEUgRVZFUi1HUk9XSU5HIENBTk5BQklTIFNQQUNFIFdJVEggQSBGUkVTSCBBUFBST0FDSCBGVUxMIE9GIENBTElGT1JOSUEgU09VTC4gVEhFIERFU0lHTlNBS0UgVEVBTSBQQUlSRUQgUkVUUk8gVFlQT0dSQVBIWSBXSVRIIEJSSUdIVCBDT0xPUlMgQU5EIE1PREVSTiBHRU9NRVRSSUMgUEFUVEVSTlMuIEEgQk9MRCBHUkFESUVOVCBJTlNQSVJFRCBCWSBOQVRVUkXigJlTIFNLSUVTIEFORCBTUExBU0hFUyBPRiBHT0xEIEZPSUwgQUREIEEgQlVSU1QgT0YgUFJFTUlVTSBTSElORS5cIixcIklOU1BJUkVEIEJZIENBTElGT1JOSUHigJlTIFdBUk0gQU5EIElOVklHT1JBVElORyBTVU5TSElORSwgRlVMTCBTVU4gSVMgQSAxMDAlIEFMTC1OQVRVUkFMLCBTVVNUQUlOQUJMWSBGQVJNRUQgQ0FOTkFCSVMgTElORS4gUFJPVURMWSBSQUlTRUQgVU5ERVIgVEhFIFNVTkJFTFQgT0YgSFVNQk9MRFQgQ09VTlRZLCBUSElTIEJSQU5E4oCZUyBQUk9EVUNUIExJTkUgSVMgQSBSRVNVTFQgT0YgTUVMTE9XIE9DRUFOIEJSRUVaRVMsIFRPV0VSSU5HIFJFRFdPT0RTIEFORCBTVU4tRFJFTkNIRUQgSElMTFNJREVTLCBZSUVMRElORyBDQU5OQUJJUyBPRiBVTlBBUkFMTEVMRUQgUVVBTElUWSwgVEFTVEUsIEFORCBQRVJGT1JNQU5DRS5cIl0sXCJzZXJ2aWNlc1wiOltcImJyYW5kIGlkZW50aXR5XCIsXCJwYWNrYWdpbmdcIixcImFydCBkaXJlY3Rpb25cIl0sXCJ0aWxlc1wiOlt7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF82ODR4NTI1cHhfMS5qcGdcIixcIndpZHRoXCI6Njg0LFwiaGVpZ2h0XCI6NTI1LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJTdWZmZXJmZXN0XzM2NHg1MjVweF8yLmpwZ1wiLFwid2lkdGhcIjozNjQsXCJoZWlnaHRcIjo1MjV9LHtcImltYWdlXCI6XCJTdWZmZXJmZXN0XzUyMHgzNjZweF8zLmpwZ1wiLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjozNjYsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfNTI4eDM2NnB4XzQuanBnXCIsXCJ3aWR0aFwiOjUyOCxcImhlaWdodFwiOjM2NixcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfMzM5eDUzMHB4XzUuanBnXCIsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjUzMCxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF8zMzl4NTMwcHhfNi5qcGdcIixcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6NTMwfSx7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF8zMzl4NTMwcHhfNy5qcGdcIixcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6NTMwfSx7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF8xMDcyeDYzMHB4XzguanBnXCIsXCJ3aWR0aFwiOjEwNzIsXCJoZWlnaHRcIjo2MzAsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfNTE5eDQ1N3B4XzkuanBnXCIsXCJ3aWR0aFwiOjUxOSxcImhlaWdodFwiOjQ1NyxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF81MjZ4MjA3cHhfMTAuanBnXCIsXCJ3aWR0aFwiOjUyNixcImhlaWdodFwiOjIwNyxcInN0YWNrXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfNTI2eDIwN3B4XzExLmpwZ1wiLFwid2lkdGhcIjo1MjYsXCJoZWlnaHRcIjoyMDd9XX0sXCJzdW1pXCI6e1wiZm9sZGVyXCI6XCJzdW1pXCIsXCJ0aXRsZVwiOlwic3VtaVwiLFwiZGVzY3JpcHRpb25cIjpbXCJERVNJR05TQUtFIFNUVURJTyBTQVcgQU4gT1BQT1JUVU5JVFkgVE8gU0hBS0UgVVAgVEhFIEVWRVItR1JPV0lORyBDQU5OQUJJUyBTUEFDRSBXSVRIIEEgRlJFU0ggQVBQUk9BQ0ggRlVMTCBPRiBDQUxJRk9STklBIFNPVUwuIFRIRSBERVNJR05TQUtFIFRFQU0gUEFJUkVEIFJFVFJPIFRZUE9HUkFQSFkgV0lUSCBCUklHSFQgQ09MT1JTIEFORCBNT0RFUk4gR0VPTUVUUklDIFBBVFRFUk5TLiBBIEJPTEQgR1JBRElFTlQgSU5TUElSRUQgQlkgTkFUVVJF4oCZUyBTS0lFUyBBTkQgU1BMQVNIRVMgT0YgR09MRCBGT0lMIEFERCBBIEJVUlNUIE9GIFBSRU1JVU0gU0hJTkUuXCIsXCJJTlNQSVJFRCBCWSBDQUxJRk9STklB4oCZUyBXQVJNIEFORCBJTlZJR09SQVRJTkcgU1VOU0hJTkUsIEZVTEwgU1VOIElTIEEgMTAwJSBBTEwtTkFUVVJBTCwgU1VTVEFJTkFCTFkgRkFSTUVEIENBTk5BQklTIExJTkUuIFBST1VETFkgUkFJU0VEIFVOREVSIFRIRSBTVU5CRUxUIE9GIEhVTUJPTERUIENPVU5UWSwgVEhJUyBCUkFOROKAmVMgUFJPRFVDVCBMSU5FIElTIEEgUkVTVUxUIE9GIE1FTExPVyBPQ0VBTiBCUkVFWkVTLCBUT1dFUklORyBSRURXT09EUyBBTkQgU1VOLURSRU5DSEVEIEhJTExTSURFUywgWUlFTERJTkcgQ0FOTkFCSVMgT0YgVU5QQVJBTExFTEVEIFFVQUxJVFksIFRBU1RFLCBBTkQgUEVSRk9STUFOQ0UuXCJdLFwic2VydmljZXNcIjpbXCJicmFuZCBpZGVudGl0eVwiLFwicGFja2FnaW5nXCIsXCJhcnQgZGlyZWN0aW9uXCJdLFwidGlsZXNcIjpbe1wiaW1hZ2VcIjpcIlN1bWlfNTIweDc2MnB4XzEuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjc2MixcImxlZlRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV81Mjd4MzY1cHhfMi5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6MzY1LFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV81Mjd4MzY1cHhfMy5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6MzY1LFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV8xMDc5eDYyNXB4XzQuanBnXCIsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo2MjUsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfNzEweDcxMHB4XzcuanBnXCIsXCJ3aWR0aFwiOjcxMCxcImhlaWdodFwiOjcxMCxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfMzM5eDIyOXB4XzUuanBnXCIsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjIyOSxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV8zMzl4NDUwcHhfNi5qcGdcIixcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6NDUwfSx7XCJpbWFnZVwiOlwiU3VtaV8xMDc5eDYyNXB4XzguanBnXCIsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo2MjUsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfNTIweDc2MnB4XzkuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjc2MixcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV81Mjd4MzY1cHhfMTAuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjM2NSxcInN0YWNrXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfNTI3eDM2NXB4XzExLmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjozNjV9LHtcImltYWdlXCI6XCJTdW1pXzcxMHg1MzBweF8xMi5qcGdcIixcIndpZHRoXCI6NzEwLFwiaGVpZ2h0XCI6NTMwLFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJTdW1pXzMzOXg1MzBweF8xMy5qcGdcIixcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6NTMwfV19fX07IiwiSW5kZXggPVxuXG4gIGk6IC0+XG4gICAgQmx1cmxvYWQuaSgpXG4iXX0=
