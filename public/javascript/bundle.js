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
      src = $(el).css('background-image').replace(/url\("?(.*?)"?\)/, "$1");
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
    "grey1": "#796E65"
  },
  "font": {
    "h1": {
      "font-family": "engravers regular",
      "font-size": "40px"
    },
    "h2": {
      "font-family": "chronicle roman",
      "letter-spacing": "3px",
      "font-size": "20px"
    },
    "h3": {
      "font-family": "chronicle roman",
      "letter-spacing": "2px",
      "font-size": "15px"
    },
    "h4": {
      "font-family": "revista stencilregular",
      "font-size": "40px",
      "letter-spacing": "2px"
    },
    "h5": {
      "font-family": "chronicle roman",
      "letter-spacing": "3px",
      "font-size": "20px",
      "line-height": "32px"
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
    "copy2s": {
      "font-family": "chronicle roman",
      "font-size": "8px",
      "letter-spacing": "2px"
    },
    "copy3": {
      "font-family": "engravers regular",
      "font-size": "11px",
      "letter-spacing": "2px",
      "line-height": "19px"
    },
    "copy4": {
      "font-family": "engravers regular",
      "font-size": "10px",
      "letter-spacing": "2px",
      "line-height": "12px"
    }
  },
  "meta": {
    "title": "Designsake Studio",
    "url": "https://designsakestudio.com/",
    "description": "A strategic design agency that specializes in branding, packaging, web design, and development",
    "keywords": "design, graphic design, branding, packaging, web design, identity design, web development, art direction, designsake, san francisco",
    "share": "images/share.jpg",
    "repo": "https://github.com/acidjazz/sake2",
    "gmap": "https://goo.gl/maps/SV3rxDiZoF22",
    "tracking_id": "UA-74113827-1"
  },
  "social": {
    "instagram": "http://www.instagram.com/designsakestudio",
    "facebook": "http://www.facebook.com/designsakestudio",
    "pinterest": "http://www.pinterest.com/designsakesf",
    "dribbble": "https://dribbble.com/designsakestudio",
    "behance": "https://www.behance.net/designsakestudio",
    "mail": "info@designsakestudio.com",
    "map": "https://www.google.com/maps/place/Designsake+Studio/@37.7664616,-122.4056994,17z/data=!3m1!4b1!4m5!3m4!1s0x808f7e329270f7af:0xab027b6dc66fae6c!8m2!3d37.7664616!4d-122.4035107",
    "phone": 4155093508
  },
  "work": {
    "benefitcosmetics": {
      "folder": "benefitcosmetics",
      "title": "benefit cosmetics",
      "description": ["Benefit Cosmetics has coined the bold and girly persona in the cosmetics industry. After 30 plus years of business, Benefit developed a rich visual history that continues to shape the company's identity and impacts the beauty industry around the world.", "As a brand, Benefit continues to experiment with color, patterns, and type everywhere possible, whether it be in product packaging or retail spaces, all the while staying true to its unique DNA. Featured here are samples of product packaging and marketing collateral created for the company."],
      "services": ["print", "packaging"],
      "prev": {
        "name": "fjordlife",
        "folder": "fjordlife"
      },
      "next": {
        "name": "urban kitchen",
        "folder": "urbankitchen"
      },
      "tiles": [
        {
          "image": "Benefit_1079x550px_1.jpg",
          "width": 1079,
          "height": 550,
          "full": true
        }, {
          "image": "Benefit_527x930px_4.jpg",
          "right": true,
          "width": 527,
          "height": 930
        }, {
          "image": "Benefit_520x366px_2.jpg",
          "width": 520,
          "height": 366,
          "stack": true
        }, {
          "image": "Benefit_520x532px_3.jpg",
          "width": 520,
          "height": 532
        }, {
          "image": "Benefit_1079x634px_5.jpg",
          "width": 1079,
          "height": 634,
          "full": true
        }, {
          "image": "Benefit_520x455px_6.jpg",
          "width": 520,
          "height": 455,
          "left": true
        }, {
          "image": "Benefit_527x455px_7.jpg",
          "width": 527,
          "height": 455
        }
      ]
    },
    "brown": {
      "folder": "brown",
      "title": "brown estate",
      "description": ["nestled in the eastern hills of napa valley, the brown family continues to produce charismatic wines, the unconventional way.", "when asked to revive the brand’s existing identity, we designed several concepts that spotlight the meaningful stories behind the estate and its symbiotic relationship to mother nature. sun-drenched imagery defines a rich sense of place, mysterious illustrations depict jamaican folklore, and classic typography spells out quotes that unveil a true sense of character."],
      "services": ["strategy", "brand identity concepts", "print concepts", "art direction"],
      "prev": {
        "name": "sumi",
        "folder": "sumi"
      },
      "next": {
        "name": "vie healing",
        "folder": "vie"
      },
      "tiles": [
        {
          "image": "Brown_1080x720px_1.jpg",
          "width": 1080,
          "height": 720,
          "full": true
        }, {
          "image": "Brown_520x765px_4.jpg",
          "width": 527,
          "height": 765,
          "right": true
        }, {
          "image": "Brown_520x365px_2.jpg",
          "left": true,
          "width": 520,
          "height": 365
        }, {
          "image": "Brown_520x365px_3.jpg",
          "width": 520,
          "height": 365,
          "left": true
        }, {
          "image": "Brown_422x625px_5.jpg",
          "width": 422,
          "height": 625,
          "left": true
        }, {
          "image": "Brown_625x625px_6.jpg",
          "right": true,
          "width": 625,
          "height": 625
        }, {
          "image": "Brown_1079x630px_7.jpg",
          "width": 1079,
          "height": 630,
          "full": true
        }, {
          "image": "Brown_520x760px_8.jpg",
          "width": 520,
          "height": 760,
          "left": true
        }, {
          "image": "Brown_520x370px_9.jpg",
          "width": 520,
          "height": 370,
          "right": true
        }, {
          "image": "Brown_520x360px_10.jpg",
          "width": 520,
          "height": 360,
          "right": true
        }, {
          "image": "Brown_1079x560px_11.jpg",
          "width": 1079,
          "height": 560,
          "full": true
        }, {
          "image": "Brown_520x760_12.jpg",
          "width": 520,
          "height": 760,
          "left": true
        }, {
          "image": "Brown_520x325px_13.jpg",
          "width": 520,
          "height": 325,
          "right": true
        }, {
          "image": "Brown_520x400px_14.jpg",
          "width": 520,
          "height": 400,
          "right": true,
          "stack": true
        }, {
          "image": "Brown_1079x625px_15.jpg",
          "width": 1079,
          "height": 625,
          "full": true
        }, {
          "image": "Brown_700x510px_16.jpg",
          "width": 700,
          "height": 510,
          "lefT": true
        }, {
          "image": "Brown_348x510px_17.jpg",
          "width": 348,
          "height": 510,
          "right": true
        }
      ]
    },
    "eldestilado": {
      "folder": "eldestilado",
      "title": "el destilado",
      "description": ["The best-kept secret amongst locals and mezcal seeking aficionados, El Destilado is a Oaxaca based speakeasy and mezcaleria blending the truest flavors of Mexico with progressive gastronomy.", "Vibrant colors and textures of paper and paint imbue the restaurant's identity with a rich sense of culinary traditions and flavors. The copper still logo, casual kraft-paper menus, agave stamped coasters, and playful vintage postcards season the intimate space, inviting locals and visitors alike to partake in an authentic food experience. <a href=\"http://www.eldestilado.com/\">www.eldestilado.com</a>"],
      "services": ["brand identity", "print", "Web Design"],
      "prev": {
        "name": "Full Sun",
        "folder": "fullsun"
      },
      "next": {
        "name": "sufferfest beer co",
        "folder": "sufferfest"
      },
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
    "fjordlife": {
      "folder": "fjordlife",
      "title": "fjordlife",
      "description": ["A sustainable womenswear brand out to clean up the fashion and beauty industry.", "The brand's identity and e-commerce site reflect the organic landscape of nordic fjords through a natural color palette and minimal layout. Modern and geometric typography provide a clean landscape for pops of imagery, transport shoppers behind the seams to meet the people and places who are making a difference. <a href=\"https://www.fjordlife.ca/\">www.fjordlife.ca</a>"],
      "services": ["Strategy", "Brand Identity", "Print", "Website Design + Development"],
      "prev": {
        "name": "vie healing",
        "folder": "vie"
      },
      "next": {
        "name": "benefit cosmetics ",
        "folder": "benefitcosmetics"
      },
      "tiles": [
        {
          "image": "Fjordlife_1079x675px_1.jpg",
          "full": true,
          "width": 1079,
          "height": 675
        }, {
          "image": "Fjordlife_589x600px_4.jpg",
          "right": true,
          "width": 589,
          "height": 600
        }, {
          "image": "Fjordlife_456x284px_2.jpg",
          "left": true,
          "width": 456,
          "height": 284
        }, {
          "image": "Fjordlife_456x284px_3.jpg",
          "width": 456,
          "height": 284
        }, {
          "image": "Fjordlife_1079x536px_5.jpg",
          "width": 1079,
          "height": 536,
          "full": true
        }, {
          "image": "Fjordlife_587x918px_8.jpg",
          "width": 587,
          "height": 918,
          "right": true
        }, {
          "image": "Fjordlife_456x642px_6.jpg",
          "width": 456,
          "height": 642,
          "left": true
        }, {
          "image": "Fjordlife_456x243px_7.jpg",
          "width": 456,
          "height": 243
        }, {
          "image": "Fjordlife_1079x2031px_9.jpg",
          "width": 1079,
          "height": 2031,
          "full": true
        }, {
          "image": "Fjordlife_589x600px_10.jpg",
          "width": 589,
          "height": 600,
          "left": true
        }, {
          "image": "Fjordlife_456x599px_11.jpg",
          "width": 456,
          "height": 599
        }
      ]
    },
    "fullsun": {
      "folder": "fullsun",
      "title": "full sun",
      "description": ["Inspired by California’s warm and invigorating sunshine, Full Sun is 100% all-natural, sustainably farmed cannabis. Proudly raised under the sunbelt of Humboldt County, this brand’s product line is a result of mellow ocean breezes, towering Redwoods and sun-drenched hillsides, yielding cannabis of unparalleled quality, taste, and performance.", "We saw an opportunity to shake up the ever-growing cannabis space with a fresh approach full of California soul. The product packaging pairs retro typography with bright colors and modern geometric patterns. A bold gradient inspired by nature’s skies and splashes of gold foil add a burst of premium shine. <a href=\"https://www.full-sun.com\">www.full-sun.com</a>"],
      "services": ["brand identity", "packaging", "copywriting", "web design + development", "Mobile Apps"],
      "next": {
        "name": "El Destilado",
        "folder": "eldestilado"
      },
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
      "description": ["Sufferfest Beer Company was born out of a need to provide a gluten-removed beer that doesn’t compromise on taste or quality.", "We partnered with Sufferfest to design a beer that celebrates the company’s mantra: “medals for a job well done.” The victorious fist icon communicates the brand’s ability to overcome the challenges of using barley in a gluten-free beer. Crisp white cans featuring a line of distinguished color ribbons and bold typography create a winning combination."],
      "services": ["brand identity", "strategy", "packaging", "print"],
      "prev": {
        "name": "El Destilado",
        "folder": "eldestilado"
      },
      "next": {
        "name": "sumi",
        "folder": "sumi"
      },
      "tiles": [
        {
          "image": "Sufferfest_1075x615px_1.gif",
          "width": 1075,
          "height": 615,
          "full": true
        }, {
          "image": "Sufferfest_1075x465px_2.jpg",
          "width": 1075,
          "height": 465,
          "full": true
        }, {
          "image": "Sufferfest_339x530px_3.jpg",
          "width": 339,
          "height": 530,
          "left": true
        }, {
          "image": "Sufferfest_339x530px_4.jpg",
          "width": 339,
          "height": 530,
          "left": true
        }, {
          "image": "Sufferfest_339x530px_5.jpg",
          "width": 339,
          "height": 530,
          "right": true
        }, {
          "image": "Sufferfest_520x375px_6.jpg",
          "clear": true,
          "width": 520,
          "height": 375,
          "left": true
        }, {
          "image": "Sufferfest_520x375px_7.jpg",
          "width": 520,
          "height": 375,
          "right": true
        }, {
          "image": "Sufferfest_365x487px_8.jpg",
          "width": 365,
          "height": 487,
          "left": true
        }, {
          "image": "Sufferfest_675x487px_9.jpg",
          "width": 675,
          "height": 487,
          "right": true
        }, {
          "image": "Sufferfest_339x334px_10.jpg",
          "width": 339,
          "height": 334,
          "left": true,
          "clear": true
        }, {
          "image": "Sufferfest_339x334px_11.jpg",
          "width": 339,
          "height": 334,
          "left": true
        }, {
          "image": "Sufferfest_339x334px_12.jpg",
          "width": 339,
          "height": 334,
          "right": true
        }
      ]
    },
    "sumi": {
      "folder": "sumi",
      "title": "sumi",
      "description": ["A casual-chic kimono co., Sumi creates and produces silk and charmeuse botanical print kimonos. Each robe features an original pattern, first sketched by hand, then saturated in rich watercolors using a traditional sumi paintbrush.", "The complete redesign of the brand’s visual identity system began with a new name: SUMI. Inspired by the paintbrush used to create each kimono's designs, the new name unveils a deeper connection to the traditions behind Chinese brushwork in calligraphy and painting. Modern typography coupled with ethereal floral designs and a soft color palette, the brand’s new identity is tailored to the tradition of their timeless kimonos."],
      "services": ["stategy", "naming", "copywriting", "brand identity", "print"],
      "prev": {
        "name": "sufferfest beer co",
        "folder": "sufferfest"
      },
      "next": {
        "name": "brown estate",
        "folder": "brown"
      },
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
          "stack": true
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
          "width": 338,
          "height": 530,
          "right": true
        }
      ]
    },
    "urbankitchen": {
      "folder": "urbankitchen",
      "title": "urbankitchen",
      "description": ["A collaborative culinary kitchen teaching its neighbors from around LA how to savor the moment.", "The redesign of the brand’s identity began with reconnecting to the owner’s Italian roots. Vibrant blues and reds nod to the baroque tiles and terracotta walls found in traditional Italian kitchens. The logotype is inspired by 1930’s vintage Italian pasta packaging. Imagery of the space and candids of the people who fill it garnish the ecommerce site, illuminating the emotional bonds created over food.<a href=\"https://www.urbankitchen-la.com/\">www.urbankitchen-la.com</a>"],
      "services": ["strategy", "brand identity", "print", "Website Design + Development", "Photography"],
      "prev": {
        "name": "benefit cosmetics ",
        "folder": "benefitcosmetics"
      },
      "next": {
        "name": "full sun",
        "folder": "fullsun"
      },
      "tiles": [
        {
          "image": "Urban_684x525px_1.jpg",
          "left": true,
          "width": 684,
          "height": 525
        }, {
          "image": "Urban_364x525px_2.jpg",
          "width": 364,
          "height": 525
        }, {
          "image": "Urban_1079x537px_3.jpg",
          "full": true,
          "width": 1079,
          "height": 537
        }, {
          "image": "Urban_534x737px_4.jpg",
          "width": 534,
          "height": 737,
          "left": true
        }, {
          "image": "Urban_517x356px_5.jpg",
          "width": 514,
          "height": 356,
          "right": true
        }, {
          "image": "Urban_517x352px_6.jpg",
          "width": 514,
          "height": 352,
          "right": true
        }, {
          "image": "Urban_1079x655px_7.jpg",
          "width": 1079,
          "height": 655,
          "full": true
        }, {
          "image": "Urban_508x688px_8.jpg",
          "width": 508,
          "height": 688,
          "left": true
        }, {
          "image": "Urba_543x688px_9.jpg",
          "width": 540,
          "height": 688,
          "right": true
        }, {
          "image": "Urban_370x525px_10.jpg",
          "width": 370,
          "height": 525,
          "left": true,
          "clear": true
        }, {
          "image": "Urban_681x525px_11.jpg",
          "width": 678,
          "height": 525
        }, {
          "image": "Urban_1079x537px_12.jpg",
          "full": true,
          "width": 1079,
          "height": 537
        }
      ]
    },
    "vie": {
      "folder": "vie",
      "title": "vie healing",
      "description": ["A holistic healing approach that brings harmony to the mind, body, and spirit.", "The identity and packaging draws on organic colors and textures found in loose leaf teas and herbal supplements. Bold typography, tone on tone layering, and delicate lines of gold foil evoke a new sophistication to home remedies for everyday healing. <a href=\"https://www.viehealing.com/\">www.viehealing.com</a>"],
      "services": ["strategy", "brand identity", "packaging", "print", "product development", "Website Design + Development", "Photography"],
      "prev": {
        "name": "brown estate",
        "folder": "brown"
      },
      "next": {
        "name": "fjordlife",
        "folder": "fjordlife"
      },
      "tiles": [
        {
          "image": "Vie_1079x537px_1.jpg",
          "width": 1079,
          "height": 537,
          "full": true
        }, {
          "image": "Vie_684x525px_2.jpg",
          "width": 684,
          "height": 525,
          "left": true
        }, {
          "image": "Vie_364x525px_3.jpg",
          "width": 364,
          "height": 525
        }, {
          "image": "Vie_512x453px_4.jpg",
          "left": true,
          "width": 512,
          "height": 453
        }, {
          "image": "Vie_536x453px_5.jpg",
          "width": 536,
          "height": 453
        }, {
          "image": "Vie_1079x537px_6.jpg",
          "full": true,
          "width": 1079,
          "height": 537
        }, {
          "image": "Vie_683x626px_7.jpg",
          "width": 683,
          "height": 626
        }, {
          "image": "Vie_366x208px_8.jpg",
          "width": 366,
          "height": 208,
          "right": true
        }, {
          "image": "Vie_366x387px_9.jpg",
          "width": 366,
          "height": 387,
          "right": true
        }, {
          "image": "Vie_364x525px_10.jpg",
          "width": 364,
          "height": 525,
          "clear": true,
          "left": true
        }, {
          "image": "Vie_684x525px_11.jpg",
          "width": 684,
          "height": 525,
          "full": true
        }, {
          "image": "Vie_1079x537px_12.jpg",
          "width": 1079,
          "height": 537,
          "full": true
        }, {
          "image": "Vie_364x626px_13.jpg",
          "width": 364,
          "height": 626,
          "left": true
        }, {
          "image": "Vie_685x626px_14.jpg",
          "width": 684,
          "height": 626,
          "right": true
        }
      ]
    }
  }
};

var Index;

Index = {
  i: function() {
    Blurload.i();
    return this.handlers();
  },
  handlers: function() {
    return $('.burger').click(this.mobile);
  },
  mobile: function() {
    _.swap('.burger');
    _.swap('.mobile');
    return _.swap('body');
  }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJibHVybG9hZC5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQTtFQUFBOzs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUNULEtBQUMsQ0FBQSxJQUFELENBQU0sRUFBTixFQUFVLFFBQVYsRUFBb0IsS0FBcEI7aUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUs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QUFBLEVBQVEsc0JBQVQ7VUFBZ0MsT0FBQSxFQUFRLEdBQXhDO1VBQTRDLFFBQUEsRUFBUyxHQUFyRDtVQUF5RCxNQUFBLEVBQU8sSUFBaEU7U0FBbnFCLEVBQXl1QjtVQUFDLE9BQUEsRUFBUSx1QkFBVDtVQUFpQyxPQUFBLEVBQVEsSUFBekM7VUFBOEMsUUFBQSxFQUFTLEdBQXZEO1VBQTJELE1BQUEsRUFBTyxJQUFsRTtTQUF6dUIsRUFBaXpCO1VBQUMsT0FBQSxFQUFRLHNCQUFUO1VBQWdDLE9BQUEsRUFBUSxHQUF4QztVQUE0QyxRQUFBLEVBQVMsR0FBckQ7VUFBeUQsTUFBQSxFQUFPLElBQWhFO1NBQWp6QixFQUF1M0I7VUFBQyxPQUFBLEVBQVEsc0JBQVQ7VUFBZ0MsT0FBQSxFQUFRLEdBQXhDO1VBQTRDLFFBQUEsRUFBUyxHQUFyRDtVQUF5RCxPQUFBLEVBQVEsSUFBakU7U0FBdjNCO09BQTVxQjtLQUFqcWE7R0FBejZEOzs7QUNBVCxJQUFBOztBQUFBLEtBQUEsR0FFRTtFQUFBLENBQUEsRUFBRyxTQUFBO0lBQ0QsUUFBUSxDQUFDLENBQVQsQ0FBQTtXQUVBLElBQUMsQ0FBQSxRQUFELENBQUE7RUFIQyxDQUFIO0VBS0EsUUFBQSxFQUFVLFNBQUE7V0FFUixDQUFBLENBQUUsU0FBRixDQUFZLENBQUMsS0FBYixDQUFtQixJQUFDLENBQUEsTUFBcEI7RUFGUSxDQUxWO0VBVUEsTUFBQSxFQUFRLFNBQUE7SUFFTixDQUFDLENBQUMsSUFBRixDQUFPLFNBQVA7SUFDQSxDQUFDLENBQUMsSUFBRixDQUFPLFNBQVA7V0FDQSxDQUFDLENBQUMsSUFBRixDQUFPLE1BQVA7RUFKTSxDQVZSIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIl8gPVxuXG4gIGk6IC0+XG4gICAgQGNvbnNvbGUgPSBzZXRJbnRlcnZhbChAZGV0ZWN0LmJpbmQoQCksIDIwMClcblxuICBwOlxuICAgIG9mZmluZzogZmFsc2VcbiAgICBvZmZ0aW1lOiAwXG5cbiAgdHVybjogKGVsLCByZW1vdmU9ZmFsc2UsIGFkZD1mYWxzZSkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgcmVtb3ZlIGlzbnQgZmFsc2VcbiAgICAgIGVsLnJlbW92ZUNsYXNzKHJlbW92ZSlcblxuICAgIGlmIGFkZCBpc250IGZhbHNlXG4gICAgICBlbC5hZGRDbGFzcyhhZGQpXG5cbiAgICByZXR1cm4gdHJ1ZVxuXG4gIG9mZjogKGVsLCBwPXt9KSAtPlxuXG4gICAgaWYgcC5vZmZpbmcgYW5kIHAub2ZmdGltZSA+IDBcblxuICAgICAgQHR1cm4gZWwsIGZhbHNlLCAnb2ZmaW5nJ1xuICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICBAdHVybiBlbCwgJ29mZmluZycsIGZhbHNlXG4gICAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuICAgICAgLCBwLm9mZnRpbWUqMTAwMCArIDEwMFxuXG4gICAgZWxzZVxuICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG5cbiAgICByZXR1cm5cblxuICBvbjogKGVsLCBwKSAtPlxuICAgIEB0dXJuIGVsLCAnb2ZmJywgJ29uJ1xuXG4gIHN3YXA6IChlbCwgcCkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgZWwuaGFzQ2xhc3MgJ29mZidcbiAgICAgIEBvbiBlbCwgcFxuICAgIGVsc2VcbiAgICAgIEBvZmYgZWwsIHBcblxuICAgIHJldHVyblxuXG4gIGVuY29kZTogKHN0cikgLT5cbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgICAgIC5yZXBsYWNlKC8hL2csICclMjEnKVxuICAgICAgLnJlcGxhY2UoLycvZywgJyUyNycpXG4gICAgICAucmVwbGFjZSgvXFwoL2csICclMjgnKVxuICAgICAgLnJlcGxhY2UoL1xcKS9nLCAnJTI5JylcbiAgICAgIC5yZXBsYWNlKC9cXCovZywgJyUyQScpXG4gICAgICAucmVwbGFjZSgvJTIwL2csICcrJylcblxuICB0OiAoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKSAtPlxuICAgIF9nYXEucHVzaCBbJ190cmFja0V2ZW50JywgY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlXVxuXG4gIHJhbmQ6IChtaW4sIG1heCkgLT5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KSArIG1pblxuXG4gIHJhbmdlOiAoc3RhcnQsIGVuZCkgLT5cbiAgICByZXN1bHQgPSBbXVxuICAgIGZvciBudW0gaW4gW3N0YXJ0Li5lbmRdXG4gICAgICByZXN1bHQucHVzaCBudW1cbiAgICByZXN1bHRcblxuICBmaXQ6IChzcmNXaWR0aCwgc3JjSGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KSAtPlxuICAgIHJhdGlvID0gTWF0aC5taW4obWF4V2lkdGggLyBzcmNXaWR0aCwgbWF4SGVpZ2h0IC8gc3JjSGVpZ2h0KVxuICAgIHdpZHRoOiBzcmNXaWR0aCpyYXRpbywgaGVpZ2h0OiBzcmNIZWlnaHQqcmF0aW9cblxuICBoZXgycmdiOiAoaGV4KSAtPlxuICAgIHJlc3VsdCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXgpXG4gICAgcjogcGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG4gICAgZzogcGFyc2VJbnQocmVzdWx0WzJdLCAxNiksXG4gICAgYjogcGFyc2VJbnQocmVzdWx0WzNdLCAxNilcbiBcbiAgb2JqYzogKG9iaikgLT5cbiAgICAoayBmb3Igb3duIGsgb2Ygb2JqKS5sZW5ndGhcblxuICBsb2FkOiAoc2NyaXB0LCBpbml0aWF0ZSwgY29tcGxldGUpIC0+XG5cbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ3NjcmlwdCdcbiAgICBlbC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCdcbiAgICBlbC5zcmMgPSBzY3JpcHRcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyICdsb2FkJyAsIChlKSAtPlxuICAgICAgY29tcGxldGUoKSBpZiB0eXBlb2YgY29tcGxldGUgaXMgJ2Z1bmN0aW9uJ1xuICAgICAgd2luZG93W2luaXRpYXRlXS5pKCkgaWYgaW5pdGlhdGUgaXNudCB1bmRlZmluZWQgYW5kIGluaXRpYXRlIGlzbnQgZmFsc2VcbiAgICAsIGZhbHNlXG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKVxuXG4gIGppbml0OiAtPlxuICAgICQuYWpheFNldHVwXG4gICAgICBkYXRhVHlwZTogXCJqc29uXCJcblxuICBwYXRjaDogKHVybCwgZGF0YSkgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqcGF0Y2ggPSAkLmFqYXhcbiAgICAgIHVybDogdXJsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgICB0eXBlOiAnUEFUQ0gnXG5cbiAgICBqcGF0Y2guZmFpbCAocmVzcG9uc2UpIC0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcGF0Y2hcblxuICBnZXQ6IChhcmdzLi4uKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpnZXQgPSAkLmdldCBhcmdzLi4uXG5cbiAgICBqZ2V0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG4gICAgICBqZ2V0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4gamdldFxuXG4gIHBvc3Q6IChhcmdzLi4uKSAtPlxuXG4gICAganBvc3QgPSAkLnBvc3QgYXJncy4uLlxuXG4gICAganBvc3QuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcbiAgICAgIGpwb3N0LmZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4ganBvc3RcblxuICBmYWlsOiAocmVzcG9uc2UpIC0+XG5cbiAgICBlcnJvciA9IHJlc3BvbnNlLnJlc3BvbnNlSlNPTj8uZXJyb3JzP1swXVxuICAgIGlmIGVycm9yIGlzIHVuZGVmaW5lZFxuICAgICAgcmV0dXJuIFByb21wdC5pIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dFxuXG4gICAgcHVnID0gZXJyb3IubWVzc2FnZS5tYXRjaCAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS9cbiAgICBpZiBwdWcgaXNudCBudWxsXG4gICAgICBlcnJvci5tZXNzYWdlID0gZXJyb3IubWVzc2FnZS5yZXBsYWNlIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspLywgJydcbiAgICAgIGVycm9yLmZpbGUgPSBwdWdbMV1cbiAgICAgIGVycm9yLmxpbmUgPSBwdWdbMl1cblxuICAgIGZpbGUgPSBAZW5jb2RlIFwiI3tlcnJvci5maWxlfVwiXG5cbiAgICBzd2l0Y2ggY29uZmlnLmFwcC5lZGl0b3JcbiAgICAgIHdoZW4gJ21hY3ZpbScgdGhlbiBlZGl0b3IgPSAnbXZpbTovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdzdWJsaW1lJyB0aGVuIGVkaXRvciA9ICdzdWJsOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ2VtYWNzJyB0aGVuIGVkaXRvciA9ICdlbWFjczovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICd0ZXh0bWF0ZScgdGhlbiBlZGl0b3IgPSAndGV4dG1hdGU6Ly9vcGVuLz91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3BocHN0b3JtJyB0aGVuIGVkaXRvciA9ICdwaHBzdG9ybTovL29wZW4/ZmlsZT0nXG5cbiAgICBpZiBlcnJvci5maWxlIGlzbnQgbnVsbFxuICAgICAgYm9keSA9IFwiXCJcIlxuICAgICAgICA8cHJlPiN7ZXJyb3IubWVzc2FnZX08L3ByZT5cbiAgICAgICAgPGEgaHJlZj1cIiN7ZWRpdG9yfSN7ZmlsZX0mbGluZT0je2Vycm9yLmxpbmV9XCI+PGI+I3tlcnJvci5maWxlfToje2Vycm9yLmxpbmV9PC9iPjwvYT5cbiAgICAgIFwiXCJcIlxuICAgIGVsc2VcbiAgICAgIGJvZHkgPSBlcnJvci5tZXNzYWdlXG5cbiAgICBQcm9tcHQuaSBlcnJvci50eXBlLCBib2R5LCBbJ09LJ11cblxuICBtZXRob2RzOiAob2JqKSAtPlxuICAgIHJlcyA9IFtdXG4gICAgZm9yIGksbSBvZiBvYmpcbiAgICAgIGlmIHR5cGVvZiBtIGlzICdmdW5jdGlvbidcbiAgICAgICAgcmVzLnB1c2ggbVxuICAgIHJldHVybiByZXNcblxuICBsbGM6IC0+XG4gICAgYXNjaWkgPSBcIlwiXCJcblxuICAgICAgJWNtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi4uLi4tOjovLzo6LS4uLi4uLi4tOjo6Ojo6Ojo6Ojo6Oi0uLi4uLi4uLi06Oi8vLzotLm9tbVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLjoreWhkZGRkZGRoeSstLi4uLi9kZGRkZGRkZGRkZGRkKy4uLi4uLi9zaGRkZGRkZGR5b2RtXG4gICAgICBtby4uLi4uLi4uLi4uLi4taG1tbWh5eXl5ZG1tbWg6Li4uL21tbW1oaGhoaGhoaGgrLi4uLjp5ZG1tZGh5eXloZGRvb21cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tc3M6LS4uLi4teW1tbXkuLi4vbW1tbS0tLS0tLS0tLS4uLi46ZG1tbXM6LS4uLi06Ly4tbVxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi55bW1teS4uLi9tbW1tLS8rb29vKzotLi4uLnltbW15LTorb29vKy8tLi5kXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi46c21tbWQ6Li4uL21tbW1obW1tbW1tZGgrLi4uZG1tbXNoZG1tbW1tbWhzLWhcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi46c2RtbWR5Oi4uLi46aGhkaG8rLy8reW1tbW0rLi5kbW1tZHlvLy8rc2RtbW1oaFxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi0reWRtbWR5Ly4uLi4uLi4tLTouLi4uLi4uc21tbWguLnltbW1zLi4uLi4uOm1tbW1tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLTpzaG1tbWRzLy0tLS0tLi4uLjpzLy0tLi4uLTpobW1tcy4uOmRtbWQvLS4uLi1vbW1tbW1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi5obW1tbW1taGhoaGhoaGguLi4rZG1tZGh5eXloZG1tbXktLi4uL2htbW1oeXl5aG1tbWRobVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLmRkZGRkZGRkZGRkZGRkZC4uLi0rc2hkZGRkZGRkaHkvLS4uLi4uLW95ZGRkZGRkZGhvOmRtXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uOjo6Ojo6Ojo6Ojo6Ojo6Li4uLi4uLi06Ly8vOjotLi4uLi4uLi4uLi4tOi8vLzotLi5vbW1cbiAgICAgIG1tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuXG4gICAgICA6OiBzeW50YWN0aWMgc3VnYXIgYnkgMjU2XG4gICAgICA6OiBodHRwOi8vMjU2LmlvL1xuICAgICAgOjogI3tjb25maWcubWV0YS5yZXBvfVxuICAgIFwiXCJcIlxuICAgIGNvbnNvbGUubG9nIGFzY2lpLCBcImNvbG9yOiBncmV5OyBmb250LWZhbWlseTogTWVubG8sIG1vbm9zcGFjZTtcIlxuXG4gIGRldGVjdDogLT5cbiAgICBpZiAoKCh3aW5kb3cub3V0ZXJIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpID4gMTAwKSB8fCAoKHdpbmRvdy5vdXRlcldpZHRoIC0gd2luZG93LmlubmVyV2lkdGgpID4gMTAwKSlcbiAgICAgIEBsbGMoKVxuICAgICAgY2xlYXJJbnRlcnZhbCBAY29uc29sZVxuXG5fLmkoKVxuIiwiXG5CbHVybG9hZCA9IFxuXG4gIGk6IC0+XG5cbiAgICAkKCcudGlsZXMgPiAudGlsZSA+IC5pbWFnZS5vZmYnKS5lYWNoIChpLCBlbCkgLT5cbiAgICAgIHNyYyA9ICQoZWwpLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLnJlcGxhY2UoL3VybFxcKFwiPyguKj8pXCI/XFwpLywgXCIkMVwiKVxuICAgICAgaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuICAgICAgaW1hZ2Uuc3JjID0gc3JjXG4gICAgICBpbWFnZS5vbmxvYWQgPSAtPlxuICAgICAgICBfLm9uIGVsXG5cbiIsImNvbmZpZyA9IHtcImNvbG9yXCI6e1wid2hpdGUxXCI6XCIjZmZmZmZmXCIsXCJibGFjazFcIjpcIiMwMDAwMDBcIixcImdvbGQxXCI6XCIjYWQ5ODZlXCIsXCJibHVlMVwiOlwiIzQ2NTA2MlwiLFwiZ3JleTFcIjpcIiM3OTZFNjVcIn0sXCJmb250XCI6e1wiaDFcIjp7XCJmb250LWZhbWlseVwiOlwiZW5ncmF2ZXJzIHJlZ3VsYXJcIixcImZvbnQtc2l6ZVwiOlwiNDBweFwifSxcImgyXCI6e1wiZm9udC1mYW1pbHlcIjpcImNocm9uaWNsZSByb21hblwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjNweFwiLFwiZm9udC1zaXplXCI6XCIyMHB4XCJ9LFwiaDNcIjp7XCJmb250LWZhbWlseVwiOlwiY2hyb25pY2xlIHJvbWFuXCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMnB4XCIsXCJmb250LXNpemVcIjpcIjE1cHhcIn0sXCJoNFwiOntcImZvbnQtZmFtaWx5XCI6XCJyZXZpc3RhIHN0ZW5jaWxyZWd1bGFyXCIsXCJmb250LXNpemVcIjpcIjQwcHhcIixcImxldHRlci1zcGFjaW5nXCI6XCIycHhcIn0sXCJoNVwiOntcImZvbnQtZmFtaWx5XCI6XCJjaHJvbmljbGUgcm9tYW5cIixcImxldHRlci1zcGFjaW5nXCI6XCIzcHhcIixcImZvbnQtc2l6ZVwiOlwiMjBweFwiLFwibGluZS1oZWlnaHRcIjpcIjMycHhcIn0sXCJjb3B5MVwiOntcImZvbnQtZmFtaWx5XCI6XCJjaHJvbmljbGUgcm9tYW5cIixcImZvbnQtc2l6ZVwiOlwiMTZweFwifSxcImNvcHkyXCI6e1wiZm9udC1mYW1pbHlcIjpcImNocm9uaWNsZSByb21hblwiLFwiZm9udC1zaXplXCI6XCIxMnB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMnB4XCJ9LFwiY29weTJzXCI6e1wiZm9udC1mYW1pbHlcIjpcImNocm9uaWNsZSByb21hblwiLFwiZm9udC1zaXplXCI6XCI4cHhcIixcImxldHRlci1zcGFjaW5nXCI6XCIycHhcIn0sXCJjb3B5M1wiOntcImZvbnQtZmFtaWx5XCI6XCJlbmdyYXZlcnMgcmVndWxhclwiLFwiZm9udC1zaXplXCI6XCIxMXB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMnB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMTlweFwifSxcImNvcHk0XCI6e1wiZm9udC1mYW1pbHlcIjpcImVuZ3JhdmVycyByZWd1bGFyXCIsXCJmb250LXNpemVcIjpcIjEwcHhcIixcImxldHRlci1zcGFjaW5nXCI6XCIycHhcIixcImxpbmUtaGVpZ2h0XCI6XCIxMnB4XCJ9fSxcIm1ldGFcIjp7XCJ0aXRsZVwiOlwiRGVzaWduc2FrZSBTdHVkaW9cIixcInVybFwiOlwiaHR0cHM6Ly9kZXNpZ25zYWtlc3R1ZGlvLmNvbS9cIixcImRlc2NyaXB0aW9uXCI6XCJBIHN0cmF0ZWdpYyBkZXNpZ24gYWdlbmN5IHRoYXQgc3BlY2lhbGl6ZXMgaW4gYnJhbmRpbmcsIHBhY2thZ2luZywgd2ViIGRlc2lnbiwgYW5kIGRldmVsb3BtZW50XCIsXCJrZXl3b3Jkc1wiOlwiZGVzaWduLCBncmFwaGljIGRlc2lnbiwgYnJhbmRpbmcsIHBhY2thZ2luZywgd2ViIGRlc2lnbiwgaWRlbnRpdHkgZGVzaWduLCB3ZWIgZGV2ZWxvcG1lbnQsIGFydCBkaXJlY3Rpb24sIGRlc2lnbnNha2UsIHNhbiBmcmFuY2lzY29cIixcInNoYXJlXCI6XCJpbWFnZXMvc2hhcmUuanBnXCIsXCJyZXBvXCI6XCJodHRwczovL2dpdGh1Yi5jb20vYWNpZGphenovc2FrZTJcIixcImdtYXBcIjpcImh0dHBzOi8vZ29vLmdsL21hcHMvU1YzcnhEaVpvRjIyXCIsXCJ0cmFja2luZ19pZFwiOlwiVUEtNzQxMTM4MjctMVwifSxcInNvY2lhbFwiOntcImluc3RhZ3JhbVwiOlwiaHR0cDovL3d3dy5pbnN0YWdyYW0uY29tL2Rlc2lnbnNha2VzdHVkaW9cIixcImZhY2Vib29rXCI6XCJodHRwOi8vd3d3LmZhY2Vib29rLmNvbS9kZXNpZ25zYWtlc3R1ZGlvXCIsXCJwaW50ZXJlc3RcIjpcImh0dHA6Ly93d3cucGludGVyZXN0LmNvbS9kZXNpZ25zYWtlc2ZcIixcImRyaWJiYmxlXCI6XCJodHRwczovL2RyaWJiYmxlLmNvbS9kZXNpZ25zYWtlc3R1ZGlvXCIsXCJiZWhhbmNlXCI6XCJodHRwczovL3d3dy5iZWhhbmNlLm5ldC9kZXNpZ25zYWtlc3R1ZGlvXCIsXCJtYWlsXCI6XCJpbmZvQGRlc2lnbnNha2VzdHVkaW8uY29tXCIsXCJtYXBcIjpcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9wbGFjZS9EZXNpZ25zYWtlK1N0dWRpby9AMzcuNzY2NDYxNiwtMTIyLjQwNTY5OTQsMTd6L2RhdGE9ITNtMSE0YjEhNG01ITNtNCExczB4ODA4ZjdlMzI5MjcwZjdhZjoweGFiMDI3YjZkYzY2ZmFlNmMhOG0yITNkMzcuNzY2NDYxNiE0ZC0xMjIuNDAzNTEwN1wiLFwicGhvbmVcIjo0MTU1MDkzNTA4fSxcIndvcmtcIjp7XCJiZW5lZml0Y29zbWV0aWNzXCI6e1wiZm9sZGVyXCI6XCJiZW5lZml0Y29zbWV0aWNzXCIsXCJ0aXRsZVwiOlwiYmVuZWZpdCBjb3NtZXRpY3NcIixcImRlc2NyaXB0aW9uXCI6W1wiQmVuZWZpdCBDb3NtZXRpY3MgaGFzIGNvaW5lZCB0aGUgYm9sZCBhbmQgZ2lybHkgcGVyc29uYSBpbiB0aGUgY29zbWV0aWNzIGluZHVzdHJ5LiBBZnRlciAzMCBwbHVzIHllYXJzIG9mIGJ1c2luZXNzLCBCZW5lZml0IGRldmVsb3BlZCBhIHJpY2ggdmlzdWFsIGhpc3RvcnkgdGhhdCBjb250aW51ZXMgdG8gc2hhcGUgdGhlIGNvbXBhbnkncyBpZGVudGl0eSBhbmQgaW1wYWN0cyB0aGUgYmVhdXR5IGluZHVzdHJ5IGFyb3VuZCB0aGUgd29ybGQuXCIsXCJBcyBhIGJyYW5kLCBCZW5lZml0IGNvbnRpbnVlcyB0byBleHBlcmltZW50IHdpdGggY29sb3IsIHBhdHRlcm5zLCBhbmQgdHlwZSBldmVyeXdoZXJlIHBvc3NpYmxlLCB3aGV0aGVyIGl0IGJlIGluIHByb2R1Y3QgcGFja2FnaW5nIG9yIHJldGFpbCBzcGFjZXMsIGFsbCB0aGUgd2hpbGUgc3RheWluZyB0cnVlIHRvIGl0cyB1bmlxdWUgRE5BLiBGZWF0dXJlZCBoZXJlIGFyZSBzYW1wbGVzIG9mIHByb2R1Y3QgcGFja2FnaW5nIGFuZCBtYXJrZXRpbmcgY29sbGF0ZXJhbCBjcmVhdGVkIGZvciB0aGUgY29tcGFueS5cIl0sXCJzZXJ2aWNlc1wiOltcInByaW50XCIsXCJwYWNrYWdpbmdcIl0sXCJwcmV2XCI6e1wibmFtZVwiOlwiZmpvcmRsaWZlXCIsXCJmb2xkZXJcIjpcImZqb3JkbGlmZVwifSxcIm5leHRcIjp7XCJuYW1lXCI6XCJ1cmJhbiBraXRjaGVuXCIsXCJmb2xkZXJcIjpcInVyYmFua2l0Y2hlblwifSxcInRpbGVzXCI6W3tcImltYWdlXCI6XCJCZW5lZml0XzEwNzl4NTUwcHhfMS5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjU1MCxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQmVuZWZpdF81Mjd4OTMwcHhfNC5qcGdcIixcInJpZ2h0XCI6dHJ1ZSxcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6OTMwfSx7XCJpbWFnZVwiOlwiQmVuZWZpdF81MjB4MzY2cHhfMi5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6MzY2LFwic3RhY2tcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQmVuZWZpdF81MjB4NTMycHhfMy5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6NTMyfSx7XCJpbWFnZVwiOlwiQmVuZWZpdF8xMDc5eDYzNHB4XzUuanBnXCIsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo2MzQsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJlbmVmaXRfNTIweDQ1NXB4XzYuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjQ1NSxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQmVuZWZpdF81Mjd4NDU1cHhfNy5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6NDU1fV19LFwiYnJvd25cIjp7XCJmb2xkZXJcIjpcImJyb3duXCIsXCJ0aXRsZVwiOlwiYnJvd24gZXN0YXRlXCIsXCJkZXNjcmlwdGlvblwiOltcIm5lc3RsZWQgaW4gdGhlIGVhc3Rlcm4gaGlsbHMgb2YgbmFwYSB2YWxsZXksIHRoZSBicm93biBmYW1pbHkgY29udGludWVzIHRvIHByb2R1Y2UgY2hhcmlzbWF0aWMgd2luZXMsIHRoZSB1bmNvbnZlbnRpb25hbCB3YXkuXCIsXCJ3aGVuIGFza2VkIHRvIHJldml2ZSB0aGUgYnJhbmTigJlzIGV4aXN0aW5nIGlkZW50aXR5LCB3ZSBkZXNpZ25lZCBzZXZlcmFsIGNvbmNlcHRzIHRoYXQgc3BvdGxpZ2h0IHRoZSBtZWFuaW5nZnVsIHN0b3JpZXMgYmVoaW5kIHRoZSBlc3RhdGUgYW5kIGl0cyBzeW1iaW90aWMgcmVsYXRpb25zaGlwIHRvIG1vdGhlciBuYXR1cmUuIHN1bi1kcmVuY2hlZCBpbWFnZXJ5IGRlZmluZXMgYSByaWNoIHNlbnNlIG9mIHBsYWNlLCBteXN0ZXJpb3VzIGlsbHVzdHJhdGlvbnMgZGVwaWN0IGphbWFpY2FuIGZvbGtsb3JlLCBhbmQgY2xhc3NpYyB0eXBvZ3JhcGh5IHNwZWxscyBvdXQgcXVvdGVzIHRoYXQgdW52ZWlsIGEgdHJ1ZSBzZW5zZSBvZiBjaGFyYWN0ZXIuXCJdLFwic2VydmljZXNcIjpbXCJzdHJhdGVneVwiLFwiYnJhbmQgaWRlbnRpdHkgY29uY2VwdHNcIixcInByaW50IGNvbmNlcHRzXCIsXCJhcnQgZGlyZWN0aW9uXCJdLFwicHJldlwiOntcIm5hbWVcIjpcInN1bWlcIixcImZvbGRlclwiOlwic3VtaVwifSxcIm5leHRcIjp7XCJuYW1lXCI6XCJ2aWUgaGVhbGluZ1wiLFwiZm9sZGVyXCI6XCJ2aWVcIn0sXCJ0aWxlc1wiOlt7XCJpbWFnZVwiOlwiQnJvd25fMTA4MHg3MjBweF8xLmpwZ1wiLFwid2lkdGhcIjoxMDgwLFwiaGVpZ2h0XCI6NzIwLFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJCcm93bl81MjB4NzY1cHhfNC5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6NzY1LFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fNTIweDM2NXB4XzIuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6MzY1fSx7XCJpbWFnZVwiOlwiQnJvd25fNTIweDM2NXB4XzMuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjM2NSxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fNDIyeDYyNXB4XzUuanBnXCIsXCJ3aWR0aFwiOjQyMixcImhlaWdodFwiOjYyNSxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fNjI1eDYyNXB4XzYuanBnXCIsXCJyaWdodFwiOnRydWUsXCJ3aWR0aFwiOjYyNSxcImhlaWdodFwiOjYyNX0se1wiaW1hZ2VcIjpcIkJyb3duXzEwNzl4NjMwcHhfNy5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjYzMCxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fNTIweDc2MHB4XzguanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjc2MCxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fNTIweDM3MHB4XzkuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjM3MCxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJyb3duXzUyMHgzNjBweF8xMC5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6MzYwLFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fMTA3OXg1NjBweF8xMS5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjU2MCxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fNTIweDc2MF8xMi5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6NzYwLFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJCcm93bl81MjB4MzI1cHhfMTMuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjMyNSxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJyb3duXzUyMHg0MDBweF8xNC5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6NDAwLFwicmlnaHRcIjp0cnVlLFwic3RhY2tcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fMTA3OXg2MjVweF8xNS5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjYyNSxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fNzAweDUxMHB4XzE2LmpwZ1wiLFwid2lkdGhcIjo3MDAsXCJoZWlnaHRcIjo1MTAsXCJsZWZUXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJyb3duXzM0OHg1MTBweF8xNy5qcGdcIixcIndpZHRoXCI6MzQ4LFwiaGVpZ2h0XCI6NTEwLFwicmlnaHRcIjp0cnVlfV19LFwiZWxkZXN0aWxhZG9cIjp7XCJmb2xkZXJcIjpcImVsZGVzdGlsYWRvXCIsXCJ0aXRsZVwiOlwiZWwgZGVzdGlsYWRvXCIsXCJkZXNjcmlwdGlvblwiOltcIlRoZSBiZXN0LWtlcHQgc2VjcmV0IGFtb25nc3QgbG9jYWxzIGFuZCBtZXpjYWwgc2Vla2luZyBhZmljaW9uYWRvcywgRWwgRGVzdGlsYWRvIGlzIGEgT2F4YWNhIGJhc2VkIHNwZWFrZWFzeSBhbmQgbWV6Y2FsZXJpYSBibGVuZGluZyB0aGUgdHJ1ZXN0IGZsYXZvcnMgb2YgTWV4aWNvIHdpdGggcHJvZ3Jlc3NpdmUgZ2FzdHJvbm9teS5cIixcIlZpYnJhbnQgY29sb3JzIGFuZCB0ZXh0dXJlcyBvZiBwYXBlciBhbmQgcGFpbnQgaW1idWUgdGhlIHJlc3RhdXJhbnQncyBpZGVudGl0eSB3aXRoIGEgcmljaCBzZW5zZSBvZiBjdWxpbmFyeSB0cmFkaXRpb25zIGFuZCBmbGF2b3JzLiBUaGUgY29wcGVyIHN0aWxsIGxvZ28sIGNhc3VhbCBrcmFmdC1wYXBlciBtZW51cywgYWdhdmUgc3RhbXBlZCBjb2FzdGVycywgYW5kIHBsYXlmdWwgdmludGFnZSBwb3N0Y2FyZHMgc2Vhc29uIHRoZSBpbnRpbWF0ZSBzcGFjZSwgaW52aXRpbmcgbG9jYWxzIGFuZCB2aXNpdG9ycyBhbGlrZSB0byBwYXJ0YWtlIGluIGFuIGF1dGhlbnRpYyBmb29kIGV4cGVyaWVuY2UuIDxhIGhyZWY9XFxcImh0dHA6Ly93d3cuZWxkZXN0aWxhZG8uY29tL1xcXCI+d3d3LmVsZGVzdGlsYWRvLmNvbTwvYT5cIl0sXCJzZXJ2aWNlc1wiOltcImJyYW5kIGlkZW50aXR5XCIsXCJwcmludFwiLFwiV2ViIERlc2lnblwiXSxcInByZXZcIjp7XCJuYW1lXCI6XCJGdWxsIFN1blwiLFwiZm9sZGVyXCI6XCJmdWxsc3VuXCJ9LFwibmV4dFwiOntcIm5hbWVcIjpcInN1ZmZlcmZlc3QgYmVlciBjb1wiLFwiZm9sZGVyXCI6XCJzdWZmZXJmZXN0XCJ9LFwidGlsZXNcIjpbe1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzEwNzZ4NTUwcHhfMS5qcGdcIixcIndpZHRoXCI6MTA3NixcImhlaWdodFwiOjU1MCxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTIweDM2NnB4XzIuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjM2NixcInN0YWNrXCI6dHJ1ZSxcImxlZlRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTI3eDkzMHB4XzMuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjkzMCxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzUyMHg1MzJweF80LmpwZ1wiLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjo1MzJ9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb18xMDc2eDYzNHB4XzUuanBnXCIsXCJ3aWR0aFwiOjEwNzYsXCJoZWlnaHRcIjo2MzQsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzUyMHg0NTVweF82LmpwZ1wiLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjo0NTUsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzUyN3g0NTVweF83LmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjo0NTV9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb181MjB4NjQxcHhfOC5qcGdcIixcImxlZnRcIjp0cnVlLFwiY2xlYXJcIjp0cnVlLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjo2NDF9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb18yNDd4MzA0cHhfOS5qcGdcIixcImxlZnRcIjp0cnVlLFwid2lkdGhcIjoyNDcsXCJoZWlnaHRcIjozMDR9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb18yNDd4MzA0cHhfMTAuanBnXCIsXCJ3aWR0aFwiOjI0NyxcImhlaWdodFwiOjMwNH0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzUyOHgzMDRweF8xMS5qcGdcIixcIndpZHRoXCI6NTI4LFwiaGVpZ2h0XCI6MzA0fSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTIweDQ0NXB4XzEyLmpwZ1wiLFwibGVmdFwiOnRydWUsXCJjbGVhclwiOnRydWUsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjQ0NX0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzUyN3g0NDVweF8xMy5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6NDQ1fSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fMTA3Nng1OTZweF8xMi5qcGdcIixcIndpZHRoXCI6MTA3NixcImhlaWdodFwiOjU5Nn1dfSxcImZqb3JkbGlmZVwiOntcImZvbGRlclwiOlwiZmpvcmRsaWZlXCIsXCJ0aXRsZVwiOlwiZmpvcmRsaWZlXCIsXCJkZXNjcmlwdGlvblwiOltcIkEgc3VzdGFpbmFibGUgd29tZW5zd2VhciBicmFuZCBvdXQgdG8gY2xlYW4gdXAgdGhlIGZhc2hpb24gYW5kIGJlYXV0eSBpbmR1c3RyeS5cIixcIlRoZSBicmFuZCdzIGlkZW50aXR5IGFuZCBlLWNvbW1lcmNlIHNpdGUgcmVmbGVjdCB0aGUgb3JnYW5pYyBsYW5kc2NhcGUgb2Ygbm9yZGljIGZqb3JkcyB0aHJvdWdoIGEgbmF0dXJhbCBjb2xvciBwYWxldHRlIGFuZCBtaW5pbWFsIGxheW91dC4gTW9kZXJuIGFuZCBnZW9tZXRyaWMgdHlwb2dyYXBoeSBwcm92aWRlIGEgY2xlYW4gbGFuZHNjYXBlIGZvciBwb3BzIG9mIGltYWdlcnksIHRyYW5zcG9ydCBzaG9wcGVycyBiZWhpbmQgdGhlIHNlYW1zIHRvIG1lZXQgdGhlIHBlb3BsZSBhbmQgcGxhY2VzIHdobyBhcmUgbWFraW5nIGEgZGlmZmVyZW5jZS4gPGEgaHJlZj1cXFwiaHR0cHM6Ly93d3cuZmpvcmRsaWZlLmNhL1xcXCI+d3d3LmZqb3JkbGlmZS5jYTwvYT5cIl0sXCJzZXJ2aWNlc1wiOltcIlN0cmF0ZWd5XCIsXCJCcmFuZCBJZGVudGl0eVwiLFwiUHJpbnRcIixcIldlYnNpdGUgRGVzaWduICsgRGV2ZWxvcG1lbnRcIl0sXCJwcmV2XCI6e1wibmFtZVwiOlwidmllIGhlYWxpbmdcIixcImZvbGRlclwiOlwidmllXCJ9LFwibmV4dFwiOntcIm5hbWVcIjpcImJlbmVmaXQgY29zbWV0aWNzIFwiLFwiZm9sZGVyXCI6XCJiZW5lZml0Y29zbWV0aWNzXCJ9LFwidGlsZXNcIjpbe1wiaW1hZ2VcIjpcIkZqb3JkbGlmZV8xMDc5eDY3NXB4XzEuanBnXCIsXCJmdWxsXCI6dHJ1ZSxcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjY3NX0se1wiaW1hZ2VcIjpcIkZqb3JkbGlmZV81ODl4NjAwcHhfNC5qcGdcIixcInJpZ2h0XCI6dHJ1ZSxcIndpZHRoXCI6NTg5LFwiaGVpZ2h0XCI6NjAwfSx7XCJpbWFnZVwiOlwiRmpvcmRsaWZlXzQ1NngyODRweF8yLmpwZ1wiLFwibGVmdFwiOnRydWUsXCJ3aWR0aFwiOjQ1NixcImhlaWdodFwiOjI4NH0se1wiaW1hZ2VcIjpcIkZqb3JkbGlmZV80NTZ4Mjg0cHhfMy5qcGdcIixcIndpZHRoXCI6NDU2LFwiaGVpZ2h0XCI6Mjg0fSx7XCJpbWFnZVwiOlwiRmpvcmRsaWZlXzEwNzl4NTM2cHhfNS5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjUzNixcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRmpvcmRsaWZlXzU4N3g5MThweF84LmpwZ1wiLFwid2lkdGhcIjo1ODcsXCJoZWlnaHRcIjo5MTgsXCJyaWdodFwiOnRydWV9LHtcImltYWdlXCI6XCJGam9yZGxpZmVfNDU2eDY0MnB4XzYuanBnXCIsXCJ3aWR0aFwiOjQ1NixcImhlaWdodFwiOjY0MixcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRmpvcmRsaWZlXzQ1NngyNDNweF83LmpwZ1wiLFwid2lkdGhcIjo0NTYsXCJoZWlnaHRcIjoyNDN9LHtcImltYWdlXCI6XCJGam9yZGxpZmVfMTA3OXgyMDMxcHhfOS5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjIwMzEsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkZqb3JkbGlmZV81ODl4NjAwcHhfMTAuanBnXCIsXCJ3aWR0aFwiOjU4OSxcImhlaWdodFwiOjYwMCxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRmpvcmRsaWZlXzQ1Nng1OTlweF8xMS5qcGdcIixcIndpZHRoXCI6NDU2LFwiaGVpZ2h0XCI6NTk5fV19LFwiZnVsbHN1blwiOntcImZvbGRlclwiOlwiZnVsbHN1blwiLFwidGl0bGVcIjpcImZ1bGwgc3VuXCIsXCJkZXNjcmlwdGlvblwiOltcIkluc3BpcmVkIGJ5IENhbGlmb3JuaWHigJlzIHdhcm0gYW5kIGludmlnb3JhdGluZyBzdW5zaGluZSwgRnVsbCBTdW4gaXMgMTAwJSBhbGwtbmF0dXJhbCwgc3VzdGFpbmFibHkgZmFybWVkIGNhbm5hYmlzLiBQcm91ZGx5IHJhaXNlZCB1bmRlciB0aGUgc3VuYmVsdCBvZiBIdW1ib2xkdCBDb3VudHksIHRoaXMgYnJhbmTigJlzIHByb2R1Y3QgbGluZSBpcyBhIHJlc3VsdCBvZiBtZWxsb3cgb2NlYW4gYnJlZXplcywgdG93ZXJpbmcgUmVkd29vZHMgYW5kIHN1bi1kcmVuY2hlZCBoaWxsc2lkZXMsIHlpZWxkaW5nIGNhbm5hYmlzIG9mIHVucGFyYWxsZWxlZCBxdWFsaXR5LCB0YXN0ZSwgYW5kIHBlcmZvcm1hbmNlLlwiLFwiV2Ugc2F3IGFuIG9wcG9ydHVuaXR5IHRvIHNoYWtlIHVwIHRoZSBldmVyLWdyb3dpbmcgY2FubmFiaXMgc3BhY2Ugd2l0aCBhIGZyZXNoIGFwcHJvYWNoIGZ1bGwgb2YgQ2FsaWZvcm5pYSBzb3VsLiBUaGUgcHJvZHVjdCBwYWNrYWdpbmcgcGFpcnMgcmV0cm8gdHlwb2dyYXBoeSB3aXRoIGJyaWdodCBjb2xvcnMgYW5kIG1vZGVybiBnZW9tZXRyaWMgcGF0dGVybnMuIEEgYm9sZCBncmFkaWVudCBpbnNwaXJlZCBieSBuYXR1cmXigJlzIHNraWVzIGFuZCBzcGxhc2hlcyBvZiBnb2xkIGZvaWwgYWRkIGEgYnVyc3Qgb2YgcHJlbWl1bSBzaGluZS4gPGEgaHJlZj1cXFwiaHR0cHM6Ly93d3cuZnVsbC1zdW4uY29tXFxcIj53d3cuZnVsbC1zdW4uY29tPC9hPlwiXSxcInNlcnZpY2VzXCI6W1wiYnJhbmQgaWRlbnRpdHlcIixcInBhY2thZ2luZ1wiLFwiY29weXdyaXRpbmdcIixcIndlYiBkZXNpZ24gKyBkZXZlbG9wbWVudFwiLFwiTW9iaWxlIEFwcHNcIl0sXCJuZXh0XCI6e1wibmFtZVwiOlwiRWwgRGVzdGlsYWRvXCIsXCJmb2xkZXJcIjpcImVsZGVzdGlsYWRvXCJ9LFwidGlsZXNcIjpbe1wiaW1hZ2VcIjpcIkZ1bGxTdW5fNjg0eDUyNXB4XzEuanBnXCIsXCJ3aWR0aFwiOjY4NCxcImhlaWdodFwiOjUyNSxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRnVsbFN1bl8zNjR4NTI1cHhfMi5qcGdcIixcIndpZHRoXCI6MzY0LFwiaGVpZ2h0XCI6NTI1fSx7XCJpbWFnZVwiOlwiRnVsbFN1bl8xMDc4eDUzN3B4XzMuanBnXCIsXCJ3aWR0aFwiOjEwNzgsXCJoZWlnaHRcIjo1MzcsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkZ1bGxTdW5fNTEyeDQ1M3B4XzQuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcIndpZHRoXCI6NTEyLFwiaGVpZ2h0XCI6NDUzfSx7XCJpbWFnZVwiOlwiRnVsbFN1bl81MzZ4NDUzcHhfNS5qcGdcIixcIndpZHRoXCI6NTM1LFwiaGVpZ2h0XCI6NDUzfSx7XCJpbWFnZVwiOlwiRnVsbFN1bl8xMDc4eDUzN3B4XzYuanBnXCIsXCJmdWxsXCI6dHJ1ZSxcIndpZHRoXCI6MTA3OCxcImhlaWdodFwiOjUzN30se1wiaW1hZ2VcIjpcIkZ1bGxTdW5fNTEyeDQ1M3B4XzcuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcIndpZHRoXCI6NTEyLFwiaGVpZ2h0XCI6NDUzfSx7XCJpbWFnZVwiOlwiRnVsbFN1bl81MzZ4MjA4cHhfOC5qcGdcIixcIndpZHRoXCI6NTM2LFwiaGVpZ2h0XCI6MjA4LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJGdWxsU3VuXzUzNngyMDhweF85LmpwZ1wiLFwid2lkdGhcIjo1MzYsXCJoZWlnaHRcIjoyMDh9XX0sXCJzdWZmZXJmZXN0XCI6e1wiZm9sZGVyXCI6XCJzdWZmZXJmZXN0XCIsXCJ0aXRsZVwiOlwic3VmZmVyZmVzdFwiLFwiZGVzY3JpcHRpb25cIjpbXCJTdWZmZXJmZXN0IEJlZXIgQ29tcGFueSB3YXMgYm9ybiBvdXQgb2YgYSBuZWVkIHRvIHByb3ZpZGUgYSBnbHV0ZW4tcmVtb3ZlZCBiZWVyIHRoYXQgZG9lc27igJl0IGNvbXByb21pc2Ugb24gdGFzdGUgb3IgcXVhbGl0eS5cIixcIldlIHBhcnRuZXJlZCB3aXRoIFN1ZmZlcmZlc3QgdG8gZGVzaWduIGEgYmVlciB0aGF0IGNlbGVicmF0ZXMgdGhlIGNvbXBhbnnigJlzIG1hbnRyYTog4oCcbWVkYWxzIGZvciBhIGpvYiB3ZWxsIGRvbmUu4oCdIFRoZSB2aWN0b3Jpb3VzIGZpc3QgaWNvbiBjb21tdW5pY2F0ZXMgdGhlIGJyYW5k4oCZcyBhYmlsaXR5IHRvIG92ZXJjb21lIHRoZSBjaGFsbGVuZ2VzIG9mIHVzaW5nIGJhcmxleSBpbiBhIGdsdXRlbi1mcmVlIGJlZXIuIENyaXNwIHdoaXRlIGNhbnMgZmVhdHVyaW5nIGEgbGluZSBvZiBkaXN0aW5ndWlzaGVkIGNvbG9yIHJpYmJvbnMgYW5kIGJvbGQgdHlwb2dyYXBoeSBjcmVhdGUgYSB3aW5uaW5nIGNvbWJpbmF0aW9uLlwiXSxcInNlcnZpY2VzXCI6W1wiYnJhbmQgaWRlbnRpdHlcIixcInN0cmF0ZWd5XCIsXCJwYWNrYWdpbmdcIixcInByaW50XCJdLFwicHJldlwiOntcIm5hbWVcIjpcIkVsIERlc3RpbGFkb1wiLFwiZm9sZGVyXCI6XCJlbGRlc3RpbGFkb1wifSxcIm5leHRcIjp7XCJuYW1lXCI6XCJzdW1pXCIsXCJmb2xkZXJcIjpcInN1bWlcIn0sXCJ0aWxlc1wiOlt7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF8xMDc1eDYxNXB4XzEuZ2lmXCIsXCJ3aWR0aFwiOjEwNzUsXCJoZWlnaHRcIjo2MTUsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfMTA3NXg0NjVweF8yLmpwZ1wiLFwid2lkdGhcIjoxMDc1LFwiaGVpZ2h0XCI6NDY1LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJTdWZmZXJmZXN0XzMzOXg1MzBweF8zLmpwZ1wiLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjo1MzAsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfMzM5eDUzMHB4XzQuanBnXCIsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjUzMCxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF8zMzl4NTMwcHhfNS5qcGdcIixcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6NTMwLFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF81MjB4Mzc1cHhfNi5qcGdcIixcImNsZWFyXCI6dHJ1ZSxcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6Mzc1LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJTdWZmZXJmZXN0XzUyMHgzNzVweF83LmpwZ1wiLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjozNzUsXCJyaWdodFwiOnRydWV9LHtcImltYWdlXCI6XCJTdWZmZXJmZXN0XzM2NXg0ODdweF84LmpwZ1wiLFwid2lkdGhcIjozNjUsXCJoZWlnaHRcIjo0ODcsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfNjc1eDQ4N3B4XzkuanBnXCIsXCJ3aWR0aFwiOjY3NSxcImhlaWdodFwiOjQ4NyxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfMzM5eDMzNHB4XzEwLmpwZ1wiLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjozMzQsXCJsZWZ0XCI6dHJ1ZSxcImNsZWFyXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfMzM5eDMzNHB4XzExLmpwZ1wiLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjozMzQsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfMzM5eDMzNHB4XzEyLmpwZ1wiLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjozMzQsXCJyaWdodFwiOnRydWV9XX0sXCJzdW1pXCI6e1wiZm9sZGVyXCI6XCJzdW1pXCIsXCJ0aXRsZVwiOlwic3VtaVwiLFwiZGVzY3JpcHRpb25cIjpbXCJBIGNhc3VhbC1jaGljIGtpbW9ubyBjby4sIFN1bWkgY3JlYXRlcyBhbmQgcHJvZHVjZXMgc2lsayBhbmQgY2hhcm1ldXNlIGJvdGFuaWNhbCBwcmludCBraW1vbm9zLiBFYWNoIHJvYmUgZmVhdHVyZXMgYW4gb3JpZ2luYWwgcGF0dGVybiwgZmlyc3Qgc2tldGNoZWQgYnkgaGFuZCwgdGhlbiBzYXR1cmF0ZWQgaW4gcmljaCB3YXRlcmNvbG9ycyB1c2luZyBhIHRyYWRpdGlvbmFsIHN1bWkgcGFpbnRicnVzaC5cIixcIlRoZSBjb21wbGV0ZSByZWRlc2lnbiBvZiB0aGUgYnJhbmTigJlzIHZpc3VhbCBpZGVudGl0eSBzeXN0ZW0gYmVnYW4gd2l0aCBhIG5ldyBuYW1lOiBTVU1JLiBJbnNwaXJlZCBieSB0aGUgcGFpbnRicnVzaCB1c2VkIHRvIGNyZWF0ZSBlYWNoIGtpbW9ubydzIGRlc2lnbnMsIHRoZSBuZXcgbmFtZSB1bnZlaWxzIGEgZGVlcGVyIGNvbm5lY3Rpb24gdG8gdGhlIHRyYWRpdGlvbnMgYmVoaW5kIENoaW5lc2UgYnJ1c2h3b3JrIGluIGNhbGxpZ3JhcGh5IGFuZCBwYWludGluZy4gTW9kZXJuIHR5cG9ncmFwaHkgY291cGxlZCB3aXRoIGV0aGVyZWFsIGZsb3JhbCBkZXNpZ25zIGFuZCBhIHNvZnQgY29sb3IgcGFsZXR0ZSwgdGhlIGJyYW5k4oCZcyBuZXcgaWRlbnRpdHkgaXMgdGFpbG9yZWQgdG8gdGhlIHRyYWRpdGlvbiBvZiB0aGVpciB0aW1lbGVzcyBraW1vbm9zLlwiXSxcInNlcnZpY2VzXCI6W1wic3RhdGVneVwiLFwibmFtaW5nXCIsXCJjb3B5d3JpdGluZ1wiLFwiYnJhbmQgaWRlbnRpdHlcIixcInByaW50XCJdLFwicHJldlwiOntcIm5hbWVcIjpcInN1ZmZlcmZlc3QgYmVlciBjb1wiLFwiZm9sZGVyXCI6XCJzdWZmZXJmZXN0XCJ9LFwibmV4dFwiOntcIm5hbWVcIjpcImJyb3duIGVzdGF0ZVwiLFwiZm9sZGVyXCI6XCJicm93blwifSxcInRpbGVzXCI6W3tcImltYWdlXCI6XCJTdW1pXzUyMHg3NjJweF8xLmpwZ1wiLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjo3NjIsXCJsZWZUXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfNTI3eDM2NXB4XzIuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjM2NSxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfNTI3eDM2NXB4XzMuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjM2NSxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfMTA3OXg2MjVweF80LmpwZ1wiLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NjI1LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJTdW1pXzcxMHg3MTBweF83LmpwZ1wiLFwid2lkdGhcIjo3MTAsXCJoZWlnaHRcIjo3MTAsXCJyaWdodFwiOnRydWV9LHtcImltYWdlXCI6XCJTdW1pXzMzOXgyMjlweF81LmpwZ1wiLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjoyMjksXCJzdGFja1wiOnRydWV9LHtcImltYWdlXCI6XCJTdW1pXzMzOXg0NTBweF82LmpwZ1wiLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjo0NTB9LHtcImltYWdlXCI6XCJTdW1pXzEwNzl4NjI1cHhfOC5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjYyNSxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV81MjB4NzYycHhfOS5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6NzYyLFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJTdW1pXzUyN3gzNjVweF8xMC5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6MzY1LFwic3RhY2tcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV81Mjd4MzY1cHhfMTEuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjM2NX0se1wiaW1hZ2VcIjpcIlN1bWlfNzEweDUzMHB4XzEyLmpwZ1wiLFwid2lkdGhcIjo3MTAsXCJoZWlnaHRcIjo1MzAsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfMzM5eDUzMHB4XzEzLmpwZ1wiLFwid2lkdGhcIjozMzgsXCJoZWlnaHRcIjo1MzAsXCJyaWdodFwiOnRydWV9XX0sXCJ1cmJhbmtpdGNoZW5cIjp7XCJmb2xkZXJcIjpcInVyYmFua2l0Y2hlblwiLFwidGl0bGVcIjpcInVyYmFua2l0Y2hlblwiLFwiZGVzY3JpcHRpb25cIjpbXCJBIGNvbGxhYm9yYXRpdmUgY3VsaW5hcnkga2l0Y2hlbiB0ZWFjaGluZyBpdHMgbmVpZ2hib3JzIGZyb20gYXJvdW5kIExBIGhvdyB0byBzYXZvciB0aGUgbW9tZW50LlwiLFwiVGhlIHJlZGVzaWduIG9mIHRoZSBicmFuZOKAmXMgaWRlbnRpdHkgYmVnYW4gd2l0aCByZWNvbm5lY3RpbmcgdG8gdGhlIG93bmVy4oCZcyBJdGFsaWFuIHJvb3RzLiBWaWJyYW50IGJsdWVzIGFuZCByZWRzIG5vZCB0byB0aGUgYmFyb3F1ZSB0aWxlcyBhbmQgdGVycmFjb3R0YSB3YWxscyBmb3VuZCBpbiB0cmFkaXRpb25hbCBJdGFsaWFuIGtpdGNoZW5zLiBUaGUgbG9nb3R5cGUgaXMgaW5zcGlyZWQgYnkgMTkzMOKAmXMgdmludGFnZSBJdGFsaWFuIHBhc3RhIHBhY2thZ2luZy4gSW1hZ2VyeSBvZiB0aGUgc3BhY2UgYW5kIGNhbmRpZHMgb2YgdGhlIHBlb3BsZSB3aG8gZmlsbCBpdCBnYXJuaXNoIHRoZSBlY29tbWVyY2Ugc2l0ZSwgaWxsdW1pbmF0aW5nIHRoZSBlbW90aW9uYWwgYm9uZHMgY3JlYXRlZCBvdmVyIGZvb2QuPGEgaHJlZj1cXFwiaHR0cHM6Ly93d3cudXJiYW5raXRjaGVuLWxhLmNvbS9cXFwiPnd3dy51cmJhbmtpdGNoZW4tbGEuY29tPC9hPlwiXSxcInNlcnZpY2VzXCI6W1wic3RyYXRlZ3lcIixcImJyYW5kIGlkZW50aXR5XCIsXCJwcmludFwiLFwiV2Vic2l0ZSBEZXNpZ24gKyBEZXZlbG9wbWVudFwiLFwiUGhvdG9ncmFwaHlcIl0sXCJwcmV2XCI6e1wibmFtZVwiOlwiYmVuZWZpdCBjb3NtZXRpY3MgXCIsXCJmb2xkZXJcIjpcImJlbmVmaXRjb3NtZXRpY3NcIn0sXCJuZXh0XCI6e1wibmFtZVwiOlwiZnVsbCBzdW5cIixcImZvbGRlclwiOlwiZnVsbHN1blwifSxcInRpbGVzXCI6W3tcImltYWdlXCI6XCJVcmJhbl82ODR4NTI1cHhfMS5qcGdcIixcImxlZnRcIjp0cnVlLFwid2lkdGhcIjo2ODQsXCJoZWlnaHRcIjo1MjV9LHtcImltYWdlXCI6XCJVcmJhbl8zNjR4NTI1cHhfMi5qcGdcIixcIndpZHRoXCI6MzY0LFwiaGVpZ2h0XCI6NTI1fSx7XCJpbWFnZVwiOlwiVXJiYW5fMTA3OXg1MzdweF8zLmpwZ1wiLFwiZnVsbFwiOnRydWUsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo1Mzd9LHtcImltYWdlXCI6XCJVcmJhbl81MzR4NzM3cHhfNC5qcGdcIixcIndpZHRoXCI6NTM0LFwiaGVpZ2h0XCI6NzM3LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJVcmJhbl81MTd4MzU2cHhfNS5qcGdcIixcIndpZHRoXCI6NTE0LFwiaGVpZ2h0XCI6MzU2LFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVXJiYW5fNTE3eDM1MnB4XzYuanBnXCIsXCJ3aWR0aFwiOjUxNCxcImhlaWdodFwiOjM1MixcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlVyYmFuXzEwNzl4NjU1cHhfNy5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjY1NSxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVXJiYW5fNTA4eDY4OHB4XzguanBnXCIsXCJ3aWR0aFwiOjUwOCxcImhlaWdodFwiOjY4OCxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVXJiYV81NDN4Njg4cHhfOS5qcGdcIixcIndpZHRoXCI6NTQwLFwiaGVpZ2h0XCI6Njg4LFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVXJiYW5fMzcweDUyNXB4XzEwLmpwZ1wiLFwid2lkdGhcIjozNzAsXCJoZWlnaHRcIjo1MjUsXCJsZWZ0XCI6dHJ1ZSxcImNsZWFyXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlVyYmFuXzY4MXg1MjVweF8xMS5qcGdcIixcIndpZHRoXCI6Njc4LFwiaGVpZ2h0XCI6NTI1fSx7XCJpbWFnZVwiOlwiVXJiYW5fMTA3OXg1MzdweF8xMi5qcGdcIixcImZ1bGxcIjp0cnVlLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NTM3fV19LFwidmllXCI6e1wiZm9sZGVyXCI6XCJ2aWVcIixcInRpdGxlXCI6XCJ2aWUgaGVhbGluZ1wiLFwiZGVzY3JpcHRpb25cIjpbXCJBIGhvbGlzdGljIGhlYWxpbmcgYXBwcm9hY2ggdGhhdCBicmluZ3MgaGFybW9ueSB0byB0aGUgbWluZCwgYm9keSwgYW5kIHNwaXJpdC5cIixcIlRoZSBpZGVudGl0eSBhbmQgcGFja2FnaW5nIGRyYXdzIG9uIG9yZ2FuaWMgY29sb3JzIGFuZCB0ZXh0dXJlcyBmb3VuZCBpbiBsb29zZSBsZWFmIHRlYXMgYW5kIGhlcmJhbCBzdXBwbGVtZW50cy4gQm9sZCB0eXBvZ3JhcGh5LCB0b25lIG9uIHRvbmUgbGF5ZXJpbmcsIGFuZCBkZWxpY2F0ZSBsaW5lcyBvZiBnb2xkIGZvaWwgZXZva2UgYSBuZXcgc29waGlzdGljYXRpb24gdG8gaG9tZSByZW1lZGllcyBmb3IgZXZlcnlkYXkgaGVhbGluZy4gPGEgaHJlZj1cXFwiaHR0cHM6Ly93d3cudmllaGVhbGluZy5jb20vXFxcIj53d3cudmllaGVhbGluZy5jb208L2E+XCJdLFwic2VydmljZXNcIjpbXCJzdHJhdGVneVwiLFwiYnJhbmQgaWRlbnRpdHlcIixcInBhY2thZ2luZ1wiLFwicHJpbnRcIixcInByb2R1Y3QgZGV2ZWxvcG1lbnRcIixcIldlYnNpdGUgRGVzaWduICsgRGV2ZWxvcG1lbnRcIixcIlBob3RvZ3JhcGh5XCJdLFwicHJldlwiOntcIm5hbWVcIjpcImJyb3duIGVzdGF0ZVwiLFwiZm9sZGVyXCI6XCJicm93blwifSxcIm5leHRcIjp7XCJuYW1lXCI6XCJmam9yZGxpZmVcIixcImZvbGRlclwiOlwiZmpvcmRsaWZlXCJ9LFwidGlsZXNcIjpbe1wiaW1hZ2VcIjpcIlZpZV8xMDc5eDUzN3B4XzEuanBnXCIsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo1MzcsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlZpZV82ODR4NTI1cHhfMi5qcGdcIixcIndpZHRoXCI6Njg0LFwiaGVpZ2h0XCI6NTI1LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJWaWVfMzY0eDUyNXB4XzMuanBnXCIsXCJ3aWR0aFwiOjM2NCxcImhlaWdodFwiOjUyNX0se1wiaW1hZ2VcIjpcIlZpZV81MTJ4NDUzcHhfNC5qcGdcIixcImxlZnRcIjp0cnVlLFwid2lkdGhcIjo1MTIsXCJoZWlnaHRcIjo0NTN9LHtcImltYWdlXCI6XCJWaWVfNTM2eDQ1M3B4XzUuanBnXCIsXCJ3aWR0aFwiOjUzNixcImhlaWdodFwiOjQ1M30se1wiaW1hZ2VcIjpcIlZpZV8xMDc5eDUzN3B4XzYuanBnXCIsXCJmdWxsXCI6dHJ1ZSxcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjUzN30se1wiaW1hZ2VcIjpcIlZpZV82ODN4NjI2cHhfNy5qcGdcIixcIndpZHRoXCI6NjgzLFwiaGVpZ2h0XCI6NjI2fSx7XCJpbWFnZVwiOlwiVmllXzM2NngyMDhweF84LmpwZ1wiLFwid2lkdGhcIjozNjYsXCJoZWlnaHRcIjoyMDgsXCJyaWdodFwiOnRydWV9LHtcImltYWdlXCI6XCJWaWVfMzY2eDM4N3B4XzkuanBnXCIsXCJ3aWR0aFwiOjM2NixcImhlaWdodFwiOjM4NyxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlZpZV8zNjR4NTI1cHhfMTAuanBnXCIsXCJ3aWR0aFwiOjM2NCxcImhlaWdodFwiOjUyNSxcImNsZWFyXCI6dHJ1ZSxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVmllXzY4NHg1MjVweF8xMS5qcGdcIixcIndpZHRoXCI6Njg0LFwiaGVpZ2h0XCI6NTI1LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJWaWVfMTA3OXg1MzdweF8xMi5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjUzNyxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVmllXzM2NHg2MjZweF8xMy5qcGdcIixcIndpZHRoXCI6MzY0LFwiaGVpZ2h0XCI6NjI2LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJWaWVfNjg1eDYyNnB4XzE0LmpwZ1wiLFwid2lkdGhcIjo2ODQsXCJoZWlnaHRcIjo2MjYsXCJyaWdodFwiOnRydWV9XX19fTsiLCJJbmRleCA9XG5cbiAgaTogLT5cbiAgICBCbHVybG9hZC5pKClcblxuICAgIEBoYW5kbGVycygpXG5cbiAgaGFuZGxlcnM6IC0+XG5cbiAgICAkKCcuYnVyZ2VyJykuY2xpY2sgQG1vYmlsZVxuXG5cbiAgbW9iaWxlOiAtPlxuXG4gICAgXy5zd2FwICcuYnVyZ2VyJ1xuICAgIF8uc3dhcCAnLm1vYmlsZSdcbiAgICBfLnN3YXAgJ2JvZHknXG4iXX0=
