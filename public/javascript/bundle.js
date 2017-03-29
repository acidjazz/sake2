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
    "image": "img/share.jpg"
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
    }
  }
};

var Index;

Index = {
  i: function() {
    return console.log('Index.weprojweporj()');
  }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQTtFQUFBOzs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUNULEtBQUMsQ0FBQSxJQUFELENBQU0sRUFBTixFQUFVLFFBQVYsRUFBb0IsS0FBcEI7aUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQjtR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QUMsT0FBQSxFQUFRLHlCQUFUO1VBQW1DLE9BQUEsRUFBUSxHQUEzQztVQUErQyxRQUFBLEVBQVMsR0FBeEQ7U0FBM1IsRUFBd1Y7VUFBQyxPQUFBLEVBQVEsMEJBQVQ7VUFBb0MsTUFBQSxFQUFPLElBQTNDO1VBQWdELE9BQUEsRUFBUSxJQUF4RDtVQUE2RCxRQUFBLEVBQVMsR0FBdEU7U0FBeFYsRUFBbWE7VUFBQyxPQUFBLEVBQVEseUJBQVQ7VUFBbUMsTUFBQSxFQUFPLElBQTFDO1VBQStDLE9BQUEsRUFBUSxHQUF2RDtVQUEyRCxRQUFBLEVBQVMsR0FBcEU7U0FBbmEsRUFBNGU7VUFBQyxPQUFBLEVBQVEseUJBQVQ7VUFBbUMsT0FBQSxFQUFRLEdBQTNDO1VBQStDLFFBQUEsRUFBUyxHQUF4RDtVQUE0RCxNQUFBLEVBQU8sSUFBbkU7U0FBNWUsRUFBcWpCO1VBQUMsT0FBQSxFQUFRLHlCQUFUO1VBQW1DLE9BQUEsRUFBUSxHQUEzQztVQUErQyxRQUFBLEVBQVMsR0FBeEQ7U0FBcmpCO09BQTl4QjtLQUFYO0dBQTczQzs7O0FDQVQsSUFBQTs7QUFBQSxLQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELE9BQU8sQ0FBQyxHQUFSLENBQVksc0JBQVo7RUFEQyxDQUFIIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIl8gPVxuXG4gIGk6IC0+XG4gICAgQGNvbnNvbGUgPSBzZXRJbnRlcnZhbChAZGV0ZWN0LmJpbmQoQCksIDIwMClcblxuICBwOlxuICAgIG9mZmluZzogZmFsc2VcbiAgICBvZmZ0aW1lOiAwXG5cbiAgdHVybjogKGVsLCByZW1vdmU9ZmFsc2UsIGFkZD1mYWxzZSkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgcmVtb3ZlIGlzbnQgZmFsc2VcbiAgICAgIGVsLnJlbW92ZUNsYXNzKHJlbW92ZSlcblxuICAgIGlmIGFkZCBpc250IGZhbHNlXG4gICAgICBlbC5hZGRDbGFzcyhhZGQpXG5cbiAgICByZXR1cm4gdHJ1ZVxuXG4gIG9mZjogKGVsLCBwPXt9KSAtPlxuXG4gICAgaWYgcC5vZmZpbmcgYW5kIHAub2ZmdGltZSA+IDBcblxuICAgICAgQHR1cm4gZWwsIGZhbHNlLCAnb2ZmaW5nJ1xuICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICBAdHVybiBlbCwgJ29mZmluZycsIGZhbHNlXG4gICAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuICAgICAgLCBwLm9mZnRpbWUqMTAwMCArIDEwMFxuXG4gICAgZWxzZVxuICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG5cbiAgICByZXR1cm5cblxuICBvbjogKGVsLCBwKSAtPlxuICAgIEB0dXJuIGVsLCAnb2ZmJywgJ29uJ1xuXG4gIHN3YXA6IChlbCwgcCkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgZWwuaGFzQ2xhc3MgJ29mZidcbiAgICAgIEBvbiBlbCwgcFxuICAgIGVsc2VcbiAgICAgIEBvZmYgZWwsIHBcblxuICAgIHJldHVyblxuXG4gIGVuY29kZTogKHN0cikgLT5cbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgICAgIC5yZXBsYWNlKC8hL2csICclMjEnKVxuICAgICAgLnJlcGxhY2UoLycvZywgJyUyNycpXG4gICAgICAucmVwbGFjZSgvXFwoL2csICclMjgnKVxuICAgICAgLnJlcGxhY2UoL1xcKS9nLCAnJTI5JylcbiAgICAgIC5yZXBsYWNlKC9cXCovZywgJyUyQScpXG4gICAgICAucmVwbGFjZSgvJTIwL2csICcrJylcblxuICB0OiAoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKSAtPlxuICAgIF9nYXEucHVzaCBbJ190cmFja0V2ZW50JywgY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlXVxuXG4gIHJhbmQ6IChtaW4sIG1heCkgLT5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KSArIG1pblxuXG4gIHJhbmdlOiAoc3RhcnQsIGVuZCkgLT5cbiAgICByZXN1bHQgPSBbXVxuICAgIGZvciBudW0gaW4gW3N0YXJ0Li5lbmRdXG4gICAgICByZXN1bHQucHVzaCBudW1cbiAgICByZXN1bHRcblxuICBmaXQ6IChzcmNXaWR0aCwgc3JjSGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KSAtPlxuICAgIHJhdGlvID0gTWF0aC5taW4obWF4V2lkdGggLyBzcmNXaWR0aCwgbWF4SGVpZ2h0IC8gc3JjSGVpZ2h0KVxuICAgIHdpZHRoOiBzcmNXaWR0aCpyYXRpbywgaGVpZ2h0OiBzcmNIZWlnaHQqcmF0aW9cblxuICBoZXgycmdiOiAoaGV4KSAtPlxuICAgIHJlc3VsdCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXgpXG4gICAgcjogcGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG4gICAgZzogcGFyc2VJbnQocmVzdWx0WzJdLCAxNiksXG4gICAgYjogcGFyc2VJbnQocmVzdWx0WzNdLCAxNilcbiBcbiAgb2JqYzogKG9iaikgLT5cbiAgICAoayBmb3Igb3duIGsgb2Ygb2JqKS5sZW5ndGhcblxuICBsb2FkOiAoc2NyaXB0LCBpbml0aWF0ZSwgY29tcGxldGUpIC0+XG5cbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ3NjcmlwdCdcbiAgICBlbC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCdcbiAgICBlbC5zcmMgPSBzY3JpcHRcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyICdsb2FkJyAsIChlKSAtPlxuICAgICAgY29tcGxldGUoKSBpZiB0eXBlb2YgY29tcGxldGUgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgd2luZG93W2luaXRpYXRlXS5pKCkgaWYgaW5pdGlhdGUgaXNudCB1bmRlZmluZWQgYW5kIGluaXRpYXRlIGlzbnQgZmFsc2VcbiAgICAsIGZhbHNlXG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKVxuXG4gIGppbml0OiAtPlxuICAgICQuYWpheFNldHVwXG4gICAgICBkYXRhVHlwZTogXCJqc29uXCJcblxuICBwYXRjaDogKHVybCwgZGF0YSkgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqcGF0Y2ggPSAkLmFqYXhcbiAgICAgIHVybDogdXJsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgICB0eXBlOiAnUEFUQ0gnXG5cbiAgICBqcGF0Y2guZmFpbCAocmVzcG9uc2UpIC0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcGF0Y2hcblxuICBnZXQ6IChhcmdzLi4uKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpnZXQgPSAkLmdldCBhcmdzLi4uXG5cbiAgICBqZ2V0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG4gICAgICBqZ2V0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4gamdldFxuXG4gIHBvc3Q6IChhcmdzLi4uKSAtPlxuXG4gICAganBvc3QgPSAkLnBvc3QgYXJncy4uLlxuXG4gICAganBvc3QuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcbiAgICAgIGpwb3N0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4ganBvc3RcblxuICBmYWlsOiAocmVzcG9uc2UpIC0+XG5cbiAgICBlcnJvciA9IHJlc3BvbnNlLnJlc3BvbnNlSlNPTj8uZXJyb3JzP1swXVxuICAgIGlmIGVycm9yIGlzIHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIFByb21wdC5pIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dFxuXG4gICAgcHVnID0gZXJyb3IubWVzc2FnZS5tYXRjaCAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS9cbiAgICBpZiBwdWcgaXNudCBudWxsXG4gICAgICBlcnJvci5tZXNzYWdlID0gZXJyb3IubWVzc2FnZS5yZXBsYWNlIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspLywgJydcbiAgICAgIGVycm9yLmZpbGUgPSBwdWdbMV1cbiAgICAgIGVycm9yLmxpbmUgPSBwdWdbMl1cblxuICAgIGZpbGUgPSBAZW5jb2RlIFwiI3tlcnJvci5maWxlfVwiXG5cbiAgICBzd2l0Y2ggY29uZmlnLmFwcC5lZGl0b3JcbiAgICAgIHdoZW4gJ21hY3ZpbScgdGhlbiBlZGl0b3IgPSAnbXZpbTovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdzdWJsaW1lJyB0aGVuIGVkaXRvciA9ICdzdWJsOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ2VtYWNzJyB0aGVuIGVkaXRvciA9ICdlbWFjczovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICd0ZXh0bWF0ZScgdGhlbiBlZGl0b3IgPSAndGV4dG1hdGU6Ly9vcGVuLz91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3BocHN0b3JtJyB0aGVuIGVkaXRvciA9ICdwaHBzdG9ybTovL29wZW4/ZmlsZT0nXG5cbiAgICBpZiBlcnJvci5maWxlIGlzbnQgbnVsbFxuICAgICAgYm9keSA9IFwiXCJcIlxuICAgICAgICA8cHJlPiN7ZXJyb3IubWVzc2FnZX08L3ByZT5cbiAgICAgICAgPGEgaHJlZj1cIiN7ZWRpdG9yfSN7ZmlsZX0mbGluZT0je2Vycm9yLmxpbmV9XCI+PGI+I3tlcnJvci5maWxlfToje2Vycm9yLmxpbmV9PC9iPjwvYT5cbiAgICAgIFwiXCJcIlxuICAgIGVsc2VcbiAgICAgIGJvZHkgPSBlcnJvci5tZXNzYWdlXG5cbiAgICBQcm9tcHQuaSBlcnJvci50eXBlLCBib2R5LCBbJ09LJ11cblxuICBtZXRob2RzOiAob2JqKSAtPlxuICAgIHJlcyA9IFtdXG4gICAgZm9yIGksbSBvZiBvYmpcbiAgICAgIGlmIHR5cGVvZiBtIGlzICdmdW5jdGlvbidcbiAgICAgICAgcmVzLnB1c2ggbVxuICAgIHJldHVybiByZXNcblxuICBsbGM6IC0+XG4gICAgYXNjaWkgPSBcIlwiXCJcblxuICAgICAgJWNtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi4uLi4tOjovLzo6LS4uLi4uLi4tOjo6Ojo6Ojo6Ojo6Oi0uLi4uLi4uLi06Oi8vLzotLm9tbVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLjoreWhkZGRkZGRoeSstLi4uLi9kZGRkZGRkZGRkZGRkKy4uLi4uLi9zaGRkZGRkZGR5b2RtXG4gICAgICBtby4uLi4uLi4uLi4uLi4taG1tbWh5eXl5ZG1tbWg6Li4uL21tbW1oaGhoaGhoaGgrLi4uLjp5ZG1tZGh5eXloZGRvb21cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tc3M6LS4uLi4teW1tbXkuLi4vbW1tbS0tLS0tLS0tLS4uLi46ZG1tbXM6LS4uLi06Ly4tbVxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi55bW1teS4uLi9tbW1tLS8rb29vKzotLi4uLnltbW15LTorb29vKy8tLi5kXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi46c21tbWQ6Li4uL21tbW1obW1tbW1tZGgrLi4uZG1tbXNoZG1tbW1tbWhzLWhcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi46c2RtbWR5Oi4uLi46aGhkaG8rLy8reW1tbW0rLi5kbW1tZHlvLy8rc2RtbW1oaFxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi0reWRtbWR5Ly4uLi4uLi4tLTouLi4uLi4uc21tbWguLnltbW1zLi4uLi4uOm1tbW1tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLTpzaG1tbWRzLy0tLS0tLi4uLjpzLy0tLi4uLTpobW1tcy4uOmRtbWQvLS4uLi1vbW1tbW1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi5obW1tbW1taGhoaGhoaGguLi4rZG1tZGh5eXloZG1tbXktLi4uL2htbW1oeXl5aG1tbWRobVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLmRkZGRkZGRkZGRkZGRkZC4uLi0rc2hkZGRkZGRkaHkvLS4uLi4uLW95ZGRkZGRkZGhvOmRtXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uOjo6Ojo6Ojo6Ojo6Ojo6Li4uLi4uLi06Ly8vOjotLi4uLi4uLi4uLi4tOi8vLzotLi5vbW1cbiAgICAgIG1tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuXG4gICAgICA6OiBzeW50YWN0aWMgc3VnYXIgYnkgMjU2XG4gICAgICA6OiBodHRwOi8vMjU2LmlvL1xuICAgICAgOjogI3tjb25maWcubWV0YS5yZXBvfVxuICAgIFwiXCJcIlxuICAgIGNvbnNvbGUubG9nIGFzY2lpLCBcImNvbG9yOiBncmV5OyBmb250LWZhbWlseTogTWVubG8sIG1vbm9zcGFjZTtcIlxuXG4gIGRldGVjdDogLT5cbiAgICBpZiAoKCh3aW5kb3cub3V0ZXJIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpID4gMTAwKSB8fCAoKHdpbmRvdy5vdXRlcldpZHRoIC0gd2luZG93LmlubmVyV2lkdGgpID4gMTAwKSlcbiAgICAgIEBsbGMoKVxuICAgICAgY2xlYXJJbnRlcnZhbCBAY29uc29sZVxuXG5fLmkoKVxuIiwiY29uZmlnID0ge1wiY29sb3JcIjp7XCJ3aGl0ZTFcIjpcIiNmZmZmZmZcIixcImJsYWNrMVwiOlwiIzAwMDAwMFwiLFwiZ29sZDFcIjpcIiNhZDk4NmVcIixcImJsdWUxXCI6XCIjNDY1MDYyXCIsXCJncmV5MVwiOlwiI2FjYTM5YVwifSxcImZvbnRcIjp7XCJoMVwiOntcImZvbnQtZmFtaWx5XCI6XCJjaHJvbmljbGUgcm9tYW5cIixcImZvbnQtc2l6ZVwiOlwiNDBweFwifSxcImgyXCI6e1wiZm9udC1mYW1pbHlcIjpcImNocm9uaWNsZSByb21hblwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwiLFwiZm9udC1zaXplXCI6XCIyMHB4XCJ9LFwiaDNcIjp7XCJmb250LWZhbWlseVwiOlwiY2hyb25pY2xlIHJvbWFuXCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMnB4XCIsXCJmb250LXNpemVcIjpcIjE1cHhcIn0sXCJjb3B5MVwiOntcImZvbnQtZmFtaWx5XCI6XCJjaHJvbmljbGUgcm9tYW5cIixcImZvbnQtc2l6ZVwiOlwiMTZweFwifSxcImNvcHkyXCI6e1wiZm9udC1mYW1pbHlcIjpcImNocm9uaWNsZSByb21hblwiLFwiZm9udC1zaXplXCI6XCIxMnB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMnB4XCJ9LFwiY29weTNcIjp7XCJmb250LWZhbWlseVwiOlwiZW5ncmF2ZXJzIHJlZ3VsYXJcIixcImZvbnQtc2l6ZVwiOlwiMTJweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwifX0sXCJtZXRhXCI6e1widGl0bGVcIjpcIkRlc2lnbnNha2UgU3R1ZGlvXCIsXCJ1cmxcIjpcImh0dHA6Ly93d3cuZGVzaWduc2FrZXN0dWRpby5jb20vXCIsXCJkZXNjcmlwdGlvblwiOlwiQm91dGlxdWUgZGVzaWduIHN0dWRpbyB0aGF0IHNwZWNpYWxpemVzIGluIGJyYW5kaW5nLCBwYWNrYWdpbmcsIHdlYiBkZXNpZ24sIGFuZCBkZXZlbG9wbWVudFwiLFwia2V5d29yZHNcIjpcImRlc2lnbiwgZ3JhcGhpYyBkZXNpZ24sIGJyYW5kaW5nLCBwYWNrYWdpbmcsIHdlYiBkZXNpZ24sIHdlYiBkZXZlbG9wbWVudCwgYXJ0IGRpcmVjdGlvbiwgZGVzaWduc2FrZSxcIixcImltYWdlXCI6XCJpbWcvc2hhcmUuanBnXCJ9LFwic29jaWFsXCI6e1wiaW5zdGFncmFtXCI6XCJodHRwOi8vd3d3Lmluc3RhZ3JhbS5jb20vZGVzaWduc2FrZXN0dWRpb1wiLFwiZmFjZWJvb2tcIjpcImh0dHA6Ly93d3cuZmFjZWJvb2suY29tL2Rlc2lnbnNha2VzdHVkaW9cIixcInBpbnRlcmVzdFwiOlwiaHR0cDovL3d3dy5waW50ZXJlc3QuY29tL2Rlc2lnbnNha2VzZlwiLFwiZHJpYmJibGVcIjpcImh0dHA6Ly93d3cucGludGVyZXN0LmNvbS9kZXNpZ25zYWtlc2ZcIixcImJlaGFuY2VcIjpcImh0dHA6Ly93d3cucGludGVyZXN0LmNvbS9kZXNpZ25zYWtlc2ZcIixcIm1haWxcIjpcImluZm9AZGVzaWduc2FrZXN0dWRpby5jb21cIixcIm1hcFwiOlwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL3BsYWNlL0Rlc2lnbnNha2UrU3R1ZGlvL0AzNy43NjY0NjE2LC0xMjIuNDA1Njk5NCwxN3ovZGF0YT0hM20xITRiMSE0bTUhM200ITFzMHg4MDhmN2UzMjkyNzBmN2FmOjB4YWIwMjdiNmRjNjZmYWU2YyE4bTIhM2QzNy43NjY0NjE2ITRkLTEyMi40MDM1MTA3XCIsXCJwaG9uZVwiOjQxNTUwOTM1MDh9LFwid29ya1wiOntcImZ1bGxzdW5cIjp7XCJmb2xkZXJcIjpcImZ1bGxzdW5cIixcInRpdGxlXCI6XCJmdWxsIHN1blwiLFwiZGVzY3JpcHRpb25cIjpbXCJERVNJR05TQUtFIFNUVURJTyBTQVcgQU4gT1BQT1JUVU5JVFkgVE8gU0hBS0UgVVAgVEhFIEVWRVItR1JPV0lORyBDQU5OQUJJUyBTUEFDRSBXSVRIIEEgRlJFU0ggQVBQUk9BQ0ggRlVMTCBPRiBDQUxJRk9STklBIFNPVUwuIFRIRSBERVNJR05TQUtFIFRFQU0gUEFJUkVEIFJFVFJPIFRZUE9HUkFQSFkgV0lUSCBCUklHSFQgQ09MT1JTIEFORCBNT0RFUk4gR0VPTUVUUklDIFBBVFRFUk5TLiBBIEJPTEQgR1JBRElFTlQgSU5TUElSRUQgQlkgTkFUVVJF4oCZUyBTS0lFUyBBTkQgU1BMQVNIRVMgT0YgR09MRCBGT0lMIEFERCBBIEJVUlNUIE9GIFBSRU1JVU0gU0hJTkUuXCIsXCJJTlNQSVJFRCBCWSBDQUxJRk9STklB4oCZUyBXQVJNIEFORCBJTlZJR09SQVRJTkcgU1VOU0hJTkUsIEZVTEwgU1VOIElTIEEgMTAwJSBBTEwtTkFUVVJBTCwgU1VTVEFJTkFCTFkgRkFSTUVEIENBTk5BQklTIExJTkUuIFBST1VETFkgUkFJU0VEIFVOREVSIFRIRSBTVU5CRUxUIE9GIEhVTUJPTERUIENPVU5UWSwgVEhJUyBCUkFOROKAmVMgUFJPRFVDVCBMSU5FIElTIEEgUkVTVUxUIE9GIE1FTExPVyBPQ0VBTiBCUkVFWkVTLCBUT1dFUklORyBSRURXT09EUyBBTkQgU1VOLURSRU5DSEVEIEhJTExTSURFUywgWUlFTERJTkcgQ0FOTkFCSVMgT0YgVU5QQVJBTExFTEVEIFFVQUxJVFksIFRBU1RFLCBBTkQgUEVSRk9STUFOQ0UuXCJdLFwic2VydmljZXNcIjpbXCJicmFuZCBpZGVudGl0eVwiLFwicGFja2FnaW5nXCIsXCJhcnQgZGlyZWN0aW9uXCJdLFwidGlsZXNcIjpbe1wiaW1hZ2VcIjpcIkZ1bGxTdW5fNjg0eDUyNXB4XzEuanBnXCIsXCJ3aWR0aFwiOjY4NCxcImhlaWdodFwiOjUyNSxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRnVsbFN1bl8zNjR4NTI1cHhfMi5qcGdcIixcIndpZHRoXCI6MzY0LFwiaGVpZ2h0XCI6NTI1fSx7XCJpbWFnZVwiOlwiRnVsbFN1bl8xMDc4eDUzN3B4XzMuanBnXCIsXCJ3aWR0aFwiOjEwNzgsXCJoZWlnaHRcIjo1MzcsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkZ1bGxTdW5fNTEyeDQ1M3B4XzQuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcIndpZHRoXCI6NTEyLFwiaGVpZ2h0XCI6NDUzfSx7XCJpbWFnZVwiOlwiRnVsbFN1bl81MzZ4NDUzcHhfNS5qcGdcIixcIndpZHRoXCI6NTM1LFwiaGVpZ2h0XCI6NDUzfSx7XCJpbWFnZVwiOlwiRnVsbFN1bl8xMDc4eDUzN3B4XzYuanBnXCIsXCJmdWxsXCI6dHJ1ZSxcIndpZHRoXCI6MTA3OCxcImhlaWdodFwiOjUzN30se1wiaW1hZ2VcIjpcIkZ1bGxTdW5fNTEyeDQ1M3B4XzcuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcIndpZHRoXCI6NTEyLFwiaGVpZ2h0XCI6NDUzfSx7XCJpbWFnZVwiOlwiRnVsbFN1bl81MzZ4MjA4cHhfOC5qcGdcIixcIndpZHRoXCI6NTM2LFwiaGVpZ2h0XCI6MjA4LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJGdWxsU3VuXzUzNngyMDhweF85LmpwZ1wiLFwid2lkdGhcIjo1MzYsXCJoZWlnaHRcIjoyMDh9XX19fTsiLCJJbmRleCA9XG5cbiAgaTogLT5cbiAgICBjb25zb2xlLmxvZyAnSW5kZXgud2Vwcm9qd2Vwb3JqKCknXG4iXX0=
