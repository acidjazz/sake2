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
      "description": ["Nestled in the eastern hills of Napa Valley, the Brown family continues to produce charismatic wines, the unconventional way.", "When asked to revive the brand’s existing identity, we designed several concepts that spotlight the meaningful stories behind the estate and its symbiotic relationship to mother nature. Sun-drenched imagery defines a rich sense of place, mysterious illustrations depict Jamaican folklore, and classic typography spells out quotes that unveil a true sense of character."],
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
          "height": 530,
          "left": true
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJibHVybG9hZC5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQTtFQUFBOzs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUNULEtBQUMsQ0FBQSxJQUFELENBQU0sRUFBTixFQUFVLFFBQVYsRUFBb0IsS0FBcEI7aUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUs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RCxDQUFBO0VBSEMsQ0FBSDtFQUtBLFFBQUEsRUFBVSxTQUFBO1dBRVIsQ0FBQSxDQUFFLFNBQUYsQ0FBWSxDQUFDLEtBQWIsQ0FBbUIsSUFBQyxDQUFBLE1BQXBCO0VBRlEsQ0FMVjtFQVVBLE1BQUEsRUFBUSxTQUFBO0lBRU4sQ0FBQyxDQUFDLElBQUYsQ0FBTyxTQUFQO0lBQ0EsQ0FBQyxDQUFDLElBQUYsQ0FBTyxTQUFQO1dBQ0EsQ0FBQyxDQUFDLElBQUYsQ0FBTyxNQUFQO0VBSk0sQ0FWUiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJfID1cblxuICBpOiAtPlxuICAgIEBjb25zb2xlID0gc2V0SW50ZXJ2YWwoQGRldGVjdC5iaW5kKEApLCAyMDApXG5cbiAgcDpcbiAgICBvZmZpbmc6IGZhbHNlXG4gICAgb2ZmdGltZTogMFxuXG4gIHR1cm46IChlbCwgcmVtb3ZlPWZhbHNlLCBhZGQ9ZmFsc2UpIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIHJlbW92ZSBpc250IGZhbHNlXG4gICAgICBlbC5yZW1vdmVDbGFzcyhyZW1vdmUpXG5cbiAgICBpZiBhZGQgaXNudCBmYWxzZVxuICAgICAgZWwuYWRkQ2xhc3MoYWRkKVxuXG4gICAgcmV0dXJuIHRydWVcblxuICBvZmY6IChlbCwgcD17fSkgLT5cblxuICAgIGlmIHAub2ZmaW5nIGFuZCBwLm9mZnRpbWUgPiAwXG5cbiAgICAgIEB0dXJuIGVsLCBmYWxzZSwgJ29mZmluZydcbiAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgQHR1cm4gZWwsICdvZmZpbmcnLCBmYWxzZVxuICAgICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcbiAgICAgICwgcC5vZmZ0aW1lKjEwMDAgKyAxMDBcblxuICAgIGVsc2VcbiAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuXG4gICAgcmV0dXJuXG5cbiAgb246IChlbCwgcCkgLT5cbiAgICBAdHVybiBlbCwgJ29mZicsICdvbidcblxuICBzd2FwOiAoZWwsIHApIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIGVsLmhhc0NsYXNzICdvZmYnXG4gICAgICBAb24gZWwsIHBcbiAgICBlbHNlXG4gICAgICBAb2ZmIGVsLCBwXG5cbiAgICByZXR1cm5cblxuICBlbmNvZGU6IChzdHIpIC0+XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpXG4gICAgICAucmVwbGFjZSgvIS9nLCAnJTIxJylcbiAgICAgIC5yZXBsYWNlKC8nL2csICclMjcnKVxuICAgICAgLnJlcGxhY2UoL1xcKC9nLCAnJTI4JylcbiAgICAgIC5yZXBsYWNlKC9cXCkvZywgJyUyOScpXG4gICAgICAucmVwbGFjZSgvXFwqL2csICclMkEnKVxuICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpXG5cbiAgdDogKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkgLT5cbiAgICBfZ2FxLnB1c2ggWydfdHJhY2tFdmVudCcsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZV1cblxuICByYW5kOiAobWluLCBtYXgpIC0+XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkgKyBtaW5cblxuICByYW5nZTogKHN0YXJ0LCBlbmQpIC0+XG4gICAgcmVzdWx0ID0gW11cbiAgICBmb3IgbnVtIGluIFtzdGFydC4uZW5kXVxuICAgICAgcmVzdWx0LnB1c2ggbnVtXG4gICAgcmVzdWx0XG5cbiAgZml0OiAoc3JjV2lkdGgsIHNyY0hlaWdodCwgbWF4V2lkdGgsIG1heEhlaWdodCkgLT5cbiAgICByYXRpbyA9IE1hdGgubWluKG1heFdpZHRoIC8gc3JjV2lkdGgsIG1heEhlaWdodCAvIHNyY0hlaWdodClcbiAgICB3aWR0aDogc3JjV2lkdGgqcmF0aW8sIGhlaWdodDogc3JjSGVpZ2h0KnJhdGlvXG5cbiAgaGV4MnJnYjogKGhleCkgLT5cbiAgICByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KVxuICAgIHI6IHBhcnNlSW50KHJlc3VsdFsxXSwgMTYpLFxuICAgIGc6IHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpLFxuICAgIGI6IHBhcnNlSW50KHJlc3VsdFszXSwgMTYpXG4gXG4gIG9iamM6IChvYmopIC0+XG4gICAgKGsgZm9yIG93biBrIG9mIG9iaikubGVuZ3RoXG5cbiAgbG9hZDogKHNjcmlwdCwgaW5pdGlhdGUsIGNvbXBsZXRlKSAtPlxuXG4gICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzY3JpcHQnXG4gICAgZWwudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgZWwuc3JjID0gc2NyaXB0XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lciAnbG9hZCcgLCAoZSkgLT5cbiAgICAgIGNvbXBsZXRlKCkgaWYgdHlwZW9mIGNvbXBsZXRlIGlzICdmdW5jdGlvbidcbiAgICAgIHdpbmRvd1tpbml0aWF0ZV0uaSgpIGlmIGluaXRpYXRlIGlzbnQgdW5kZWZpbmVkIGFuZCBpbml0aWF0ZSBpc250IGZhbHNlXG4gICAgLCBmYWxzZVxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbClcblxuICBqaW5pdDogLT5cbiAgICAkLmFqYXhTZXR1cFxuICAgICAgZGF0YVR5cGU6IFwianNvblwiXG5cbiAgcGF0Y2g6ICh1cmwsIGRhdGEpIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAganBhdGNoID0gJC5hamF4XG4gICAgICB1cmw6IHVybFxuICAgICAgZGF0YTogZGF0YVxuICAgICAgdHlwZTogJ1BBVENIJ1xuXG4gICAganBhdGNoLmZhaWwgKHJlc3BvbnNlKSAtPlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG5cbiAgICByZXR1cm4ganBhdGNoXG5cbiAgZ2V0OiAoYXJncy4uLikgLT5cblxuICAgIEBqaW5pdCgpXG5cbiAgICBqZ2V0ID0gJC5nZXQgYXJncy4uLlxuXG4gICAgamdldC5mYWlsIChyZXNwb25zZSkgPT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuICAgICAgamdldC5mYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpnZXRcblxuICBwb3N0OiAoYXJncy4uLikgLT5cblxuICAgIGpwb3N0ID0gJC5wb3N0IGFyZ3MuLi5cblxuICAgIGpwb3N0LmZhaWwgKHJlc3BvbnNlKSA9PlxuICAgICAgQGZhaWwocmVzcG9uc2UpXG4gICAgICBqcG9zdC5mYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwb3N0XG5cbiAgZmFpbDogKHJlc3BvbnNlKSAtPlxuXG4gICAgZXJyb3IgPSByZXNwb25zZS5yZXNwb25zZUpTT04/LmVycm9ycz9bMF1cbiAgICBpZiBlcnJvciBpcyB1bmRlZmluZWRcbiAgICAgIHJldHVybiBQcm9tcHQuaSByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLnN0YXR1c1RleHRcblxuICAgIHB1ZyA9IGVycm9yLm1lc3NhZ2UubWF0Y2ggL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKykvXG4gICAgaWYgcHVnIGlzbnQgbnVsbFxuICAgICAgZXJyb3IubWVzc2FnZSA9IGVycm9yLm1lc3NhZ2UucmVwbGFjZSAvUHVnIEVycm9yOiAoLio/KTooWzAtOV0rKS8sICcnXG4gICAgICBlcnJvci5maWxlID0gcHVnWzFdXG4gICAgICBlcnJvci5saW5lID0gcHVnWzJdXG5cbiAgICBmaWxlID0gQGVuY29kZSBcIiN7ZXJyb3IuZmlsZX1cIlxuXG4gICAgc3dpdGNoIGNvbmZpZy5hcHAuZWRpdG9yXG4gICAgICB3aGVuICdtYWN2aW0nIHRoZW4gZWRpdG9yID0gJ212aW06Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnc3VibGltZScgdGhlbiBlZGl0b3IgPSAnc3VibDovL29wZW4/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdlbWFjcycgdGhlbiBlZGl0b3IgPSAnZW1hY3M6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAndGV4dG1hdGUnIHRoZW4gZWRpdG9yID0gJ3RleHRtYXRlOi8vb3Blbi8/dXJsPWZpbGU6Ly8nXG4gICAgICB3aGVuICdwaHBzdG9ybScgdGhlbiBlZGl0b3IgPSAncGhwc3Rvcm06Ly9vcGVuP2ZpbGU9J1xuXG4gICAgaWYgZXJyb3IuZmlsZSBpc250IG51bGxcbiAgICAgIGJvZHkgPSBcIlwiXCJcbiAgICAgICAgPHByZT4je2Vycm9yLm1lc3NhZ2V9PC9wcmU+XG4gICAgICAgIDxhIGhyZWY9XCIje2VkaXRvcn0je2ZpbGV9JmxpbmU9I3tlcnJvci5saW5lfVwiPjxiPiN7ZXJyb3IuZmlsZX06I3tlcnJvci5saW5lfTwvYj48L2E+XG4gICAgICBcIlwiXCJcbiAgICBlbHNlXG4gICAgICBib2R5ID0gZXJyb3IubWVzc2FnZVxuXG4gICAgUHJvbXB0LmkgZXJyb3IudHlwZSwgYm9keSwgWydPSyddXG5cbiAgbWV0aG9kczogKG9iaikgLT5cbiAgICByZXMgPSBbXVxuICAgIGZvciBpLG0gb2Ygb2JqXG4gICAgICBpZiB0eXBlb2YgbSBpcyAnZnVuY3Rpb24nXG4gICAgICAgIHJlcy5wdXNoIG1cbiAgICByZXR1cm4gcmVzXG5cbiAgbGxjOiAtPlxuICAgIGFzY2lpID0gXCJcIlwiXG5cbiAgICAgICVjbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uLi4uLTo6Ly86Oi0uLi4uLi4uLTo6Ojo6Ojo6Ojo6OjotLi4uLi4uLi4tOjovLy86LS5vbW1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi46K3loZGRkZGRkaHkrLS4uLi4vZGRkZGRkZGRkZGRkZCsuLi4uLi4vc2hkZGRkZGRkeW9kbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLWhtbW1oeXl5eWRtbW1oOi4uLi9tbW1taGhoaGhoaGhoKy4uLi46eWRtbWRoeXl5aGRkb29tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLXNzOi0uLi4uLXltbW15Li4uL21tbW0tLS0tLS0tLS0uLi4uOmRtbW1zOi0uLi4tOi8uLW1cbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4ueW1tbXkuLi4vbW1tbS0vK29vbys6LS4uLi55bW1teS06K29vbysvLS4uZFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNtbW1kOi4uLi9tbW1taG1tbW1tbWRoKy4uLmRtbW1zaGRtbW1tbW1ocy1oXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNkbW1keTouLi4uOmhoZGhvKy8vK3ltbW1tKy4uZG1tbWR5by8vK3NkbW1taGhcbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4tK3lkbW1keS8uLi4uLi4uLS06Li4uLi4uLnNtbW1oLi55bW1tcy4uLi4uLjptbW1tbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi06c2htbW1kcy8tLS0tLS4uLi46cy8tLS4uLi06aG1tbXMuLjpkbW1kLy0uLi4tb21tbW1tXG4gICAgICBtby4uLi4uLi4uLi4uLi4uaG1tbW1tbWhoaGhoaGhoLi4uK2RtbWRoeXl5aGRtbW15LS4uLi9obW1taHl5eWhtbW1kaG1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi5kZGRkZGRkZGRkZGRkZGQuLi4tK3NoZGRkZGRkZGh5Ly0uLi4uLi1veWRkZGRkZGRobzpkbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLjo6Ojo6Ojo6Ojo6Ojo6Oi4uLi4uLi4tOi8vLzo6LS4uLi4uLi4uLi4uLTovLy86LS4ub21tXG4gICAgICBtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cblxuICAgICAgOjogc3ludGFjdGljIHN1Z2FyIGJ5IDI1NlxuICAgICAgOjogaHR0cDovLzI1Ni5pby9cbiAgICAgIDo6ICN7Y29uZmlnLm1ldGEucmVwb31cbiAgICBcIlwiXCJcbiAgICBjb25zb2xlLmxvZyBhc2NpaSwgXCJjb2xvcjogZ3JleTsgZm9udC1mYW1pbHk6IE1lbmxvLCBtb25vc3BhY2U7XCJcblxuICBkZXRlY3Q6IC0+XG4gICAgaWYgKCgod2luZG93Lm91dGVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KSA+IDEwMCkgfHwgKCh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpbmRvdy5pbm5lcldpZHRoKSA+IDEwMCkpXG4gICAgICBAbGxjKClcbiAgICAgIGNsZWFySW50ZXJ2YWwgQGNvbnNvbGVcblxuXy5pKClcbiIsIlxuQmx1cmxvYWQgPSBcblxuICBpOiAtPlxuXG4gICAgJCgnLnRpbGVzID4gLnRpbGUgPiAuaW1hZ2Uub2ZmJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBzcmMgPSAkKGVsKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKS5yZXBsYWNlKC91cmxcXChcIj8oLio/KVwiP1xcKS8sIFwiJDFcIilcbiAgICAgIGltYWdlID0gbmV3IEltYWdlKClcbiAgICAgIGltYWdlLnNyYyA9IHNyY1xuICAgICAgaW1hZ2Uub25sb2FkID0gLT5cbiAgICAgICAgXy5vbiBlbFxuXG4iLCJjb25maWcgPSB7XCJjb2xvclwiOntcIndoaXRlMVwiOlwiI2ZmZmZmZlwiLFwiYmxhY2sxXCI6XCIjMDAwMDAwXCIsXCJnb2xkMVwiOlwiI2FkOTg2ZVwiLFwiYmx1ZTFcIjpcIiM0NjUwNjJcIixcImdyZXkxXCI6XCIjNzk2RTY1XCJ9LFwiZm9udFwiOntcImgxXCI6e1wiZm9udC1mYW1pbHlcIjpcImVuZ3JhdmVycyByZWd1bGFyXCIsXCJmb250LXNpemVcIjpcIjQwcHhcIn0sXCJoMlwiOntcImZvbnQtZmFtaWx5XCI6XCJjaHJvbmljbGUgcm9tYW5cIixcImxldHRlci1zcGFjaW5nXCI6XCIzcHhcIixcImZvbnQtc2l6ZVwiOlwiMjBweFwifSxcImgzXCI6e1wiZm9udC1mYW1pbHlcIjpcImNocm9uaWNsZSByb21hblwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwiLFwiZm9udC1zaXplXCI6XCIxNXB4XCJ9LFwiaDRcIjp7XCJmb250LWZhbWlseVwiOlwicmV2aXN0YSBzdGVuY2lscmVndWxhclwiLFwiZm9udC1zaXplXCI6XCI0MHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMnB4XCJ9LFwiaDVcIjp7XCJmb250LWZhbWlseVwiOlwiY2hyb25pY2xlIHJvbWFuXCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiM3B4XCIsXCJmb250LXNpemVcIjpcIjIwcHhcIixcImxpbmUtaGVpZ2h0XCI6XCIzMnB4XCJ9LFwiY29weTFcIjp7XCJmb250LWZhbWlseVwiOlwiY2hyb25pY2xlIHJvbWFuXCIsXCJmb250LXNpemVcIjpcIjE2cHhcIn0sXCJjb3B5MlwiOntcImZvbnQtZmFtaWx5XCI6XCJjaHJvbmljbGUgcm9tYW5cIixcImZvbnQtc2l6ZVwiOlwiMTJweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwifSxcImNvcHkyc1wiOntcImZvbnQtZmFtaWx5XCI6XCJjaHJvbmljbGUgcm9tYW5cIixcImZvbnQtc2l6ZVwiOlwiOHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMnB4XCJ9LFwiY29weTNcIjp7XCJmb250LWZhbWlseVwiOlwiZW5ncmF2ZXJzIHJlZ3VsYXJcIixcImZvbnQtc2l6ZVwiOlwiMTFweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwiLFwibGluZS1oZWlnaHRcIjpcIjE5cHhcIn0sXCJjb3B5NFwiOntcImZvbnQtZmFtaWx5XCI6XCJlbmdyYXZlcnMgcmVndWxhclwiLFwiZm9udC1zaXplXCI6XCIxMHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMnB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMTJweFwifX0sXCJtZXRhXCI6e1widGl0bGVcIjpcIkRlc2lnbnNha2UgU3R1ZGlvXCIsXCJ1cmxcIjpcImh0dHBzOi8vZGVzaWduc2FrZXN0dWRpby5jb20vXCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzdHJhdGVnaWMgZGVzaWduIGFnZW5jeSB0aGF0IHNwZWNpYWxpemVzIGluIGJyYW5kaW5nLCBwYWNrYWdpbmcsIHdlYiBkZXNpZ24sIGFuZCBkZXZlbG9wbWVudFwiLFwia2V5d29yZHNcIjpcImRlc2lnbiwgZ3JhcGhpYyBkZXNpZ24sIGJyYW5kaW5nLCBwYWNrYWdpbmcsIHdlYiBkZXNpZ24sIGlkZW50aXR5IGRlc2lnbiwgd2ViIGRldmVsb3BtZW50LCBhcnQgZGlyZWN0aW9uLCBkZXNpZ25zYWtlLCBzYW4gZnJhbmNpc2NvXCIsXCJzaGFyZVwiOlwiaW1hZ2VzL3NoYXJlLmpwZ1wiLFwicmVwb1wiOlwiaHR0cHM6Ly9naXRodWIuY29tL2FjaWRqYXp6L3Nha2UyXCIsXCJnbWFwXCI6XCJodHRwczovL2dvby5nbC9tYXBzL1NWM3J4RGlab0YyMlwiLFwidHJhY2tpbmdfaWRcIjpcIlVBLTc0MTEzODI3LTFcIn0sXCJzb2NpYWxcIjp7XCJpbnN0YWdyYW1cIjpcImh0dHA6Ly93d3cuaW5zdGFncmFtLmNvbS9kZXNpZ25zYWtlc3R1ZGlvXCIsXCJmYWNlYm9va1wiOlwiaHR0cDovL3d3dy5mYWNlYm9vay5jb20vZGVzaWduc2FrZXN0dWRpb1wiLFwicGludGVyZXN0XCI6XCJodHRwOi8vd3d3LnBpbnRlcmVzdC5jb20vZGVzaWduc2FrZXNmXCIsXCJkcmliYmJsZVwiOlwiaHR0cHM6Ly9kcmliYmJsZS5jb20vZGVzaWduc2FrZXN0dWRpb1wiLFwiYmVoYW5jZVwiOlwiaHR0cHM6Ly93d3cuYmVoYW5jZS5uZXQvZGVzaWduc2FrZXN0dWRpb1wiLFwibWFpbFwiOlwiaW5mb0BkZXNpZ25zYWtlc3R1ZGlvLmNvbVwiLFwibWFwXCI6XCJodHRwczovL3d3dy5nb29nbGUuY29tL21hcHMvcGxhY2UvRGVzaWduc2FrZStTdHVkaW8vQDM3Ljc2NjQ2MTYsLTEyMi40MDU2OTk0LDE3ei9kYXRhPSEzbTEhNGIxITRtNSEzbTQhMXMweDgwOGY3ZTMyOTI3MGY3YWY6MHhhYjAyN2I2ZGM2NmZhZTZjIThtMiEzZDM3Ljc2NjQ2MTYhNGQtMTIyLjQwMzUxMDdcIixcInBob25lXCI6NDE1NTA5MzUwOH0sXCJ3b3JrXCI6e1wiYmVuZWZpdGNvc21ldGljc1wiOntcImZvbGRlclwiOlwiYmVuZWZpdGNvc21ldGljc1wiLFwidGl0bGVcIjpcImJlbmVmaXQgY29zbWV0aWNzXCIsXCJkZXNjcmlwdGlvblwiOltcIkJlbmVmaXQgQ29zbWV0aWNzIGhhcyBjb2luZWQgdGhlIGJvbGQgYW5kIGdpcmx5IHBlcnNvbmEgaW4gdGhlIGNvc21ldGljcyBpbmR1c3RyeS4gQWZ0ZXIgMzAgcGx1cyB5ZWFycyBvZiBidXNpbmVzcywgQmVuZWZpdCBkZXZlbG9wZWQgYSByaWNoIHZpc3VhbCBoaXN0b3J5IHRoYXQgY29udGludWVzIHRvIHNoYXBlIHRoZSBjb21wYW55J3MgaWRlbnRpdHkgYW5kIGltcGFjdHMgdGhlIGJlYXV0eSBpbmR1c3RyeSBhcm91bmQgdGhlIHdvcmxkLlwiLFwiQXMgYSBicmFuZCwgQmVuZWZpdCBjb250aW51ZXMgdG8gZXhwZXJpbWVudCB3aXRoIGNvbG9yLCBwYXR0ZXJucywgYW5kIHR5cGUgZXZlcnl3aGVyZSBwb3NzaWJsZSwgd2hldGhlciBpdCBiZSBpbiBwcm9kdWN0IHBhY2thZ2luZyBvciByZXRhaWwgc3BhY2VzLCBhbGwgdGhlIHdoaWxlIHN0YXlpbmcgdHJ1ZSB0byBpdHMgdW5pcXVlIEROQS4gRmVhdHVyZWQgaGVyZSBhcmUgc2FtcGxlcyBvZiBwcm9kdWN0IHBhY2thZ2luZyBhbmQgbWFya2V0aW5nIGNvbGxhdGVyYWwgY3JlYXRlZCBmb3IgdGhlIGNvbXBhbnkuXCJdLFwic2VydmljZXNcIjpbXCJwcmludFwiLFwicGFja2FnaW5nXCJdLFwicHJldlwiOntcIm5hbWVcIjpcImZqb3JkbGlmZVwiLFwiZm9sZGVyXCI6XCJmam9yZGxpZmVcIn0sXCJuZXh0XCI6e1wibmFtZVwiOlwidXJiYW4ga2l0Y2hlblwiLFwiZm9sZGVyXCI6XCJ1cmJhbmtpdGNoZW5cIn0sXCJ0aWxlc1wiOlt7XCJpbWFnZVwiOlwiQmVuZWZpdF8xMDc5eDU1MHB4XzEuanBnXCIsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo1NTAsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJlbmVmaXRfNTI3eDkzMHB4XzQuanBnXCIsXCJyaWdodFwiOnRydWUsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjkzMH0se1wiaW1hZ2VcIjpcIkJlbmVmaXRfNTIweDM2NnB4XzIuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjM2NixcInN0YWNrXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJlbmVmaXRfNTIweDUzMnB4XzMuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjUzMn0se1wiaW1hZ2VcIjpcIkJlbmVmaXRfMTA3OXg2MzRweF81LmpwZ1wiLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NjM0LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJCZW5lZml0XzUyMHg0NTVweF82LmpwZ1wiLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjo0NTUsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJlbmVmaXRfNTI3eDQ1NXB4XzcuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjQ1NX1dfSxcImJyb3duXCI6e1wiZm9sZGVyXCI6XCJicm93blwiLFwidGl0bGVcIjpcImJyb3duIGVzdGF0ZVwiLFwiZGVzY3JpcHRpb25cIjpbXCJOZXN0bGVkIGluIHRoZSBlYXN0ZXJuIGhpbGxzIG9mIE5hcGEgVmFsbGV5LCB0aGUgQnJvd24gZmFtaWx5IGNvbnRpbnVlcyB0byBwcm9kdWNlIGNoYXJpc21hdGljIHdpbmVzLCB0aGUgdW5jb252ZW50aW9uYWwgd2F5LlwiLFwiV2hlbiBhc2tlZCB0byByZXZpdmUgdGhlIGJyYW5k4oCZcyBleGlzdGluZyBpZGVudGl0eSwgd2UgZGVzaWduZWQgc2V2ZXJhbCBjb25jZXB0cyB0aGF0IHNwb3RsaWdodCB0aGUgbWVhbmluZ2Z1bCBzdG9yaWVzIGJlaGluZCB0aGUgZXN0YXRlIGFuZCBpdHMgc3ltYmlvdGljIHJlbGF0aW9uc2hpcCB0byBtb3RoZXIgbmF0dXJlLiBTdW4tZHJlbmNoZWQgaW1hZ2VyeSBkZWZpbmVzIGEgcmljaCBzZW5zZSBvZiBwbGFjZSwgbXlzdGVyaW91cyBpbGx1c3RyYXRpb25zIGRlcGljdCBKYW1haWNhbiBmb2xrbG9yZSwgYW5kIGNsYXNzaWMgdHlwb2dyYXBoeSBzcGVsbHMgb3V0IHF1b3RlcyB0aGF0IHVudmVpbCBhIHRydWUgc2Vuc2Ugb2YgY2hhcmFjdGVyLlwiXSxcInNlcnZpY2VzXCI6W1wic3RyYXRlZ3lcIixcImJyYW5kIGlkZW50aXR5IGNvbmNlcHRzXCIsXCJwcmludCBjb25jZXB0c1wiLFwiYXJ0IGRpcmVjdGlvblwiXSxcInByZXZcIjp7XCJuYW1lXCI6XCJzdW1pXCIsXCJmb2xkZXJcIjpcInN1bWlcIn0sXCJuZXh0XCI6e1wibmFtZVwiOlwidmllIGhlYWxpbmdcIixcImZvbGRlclwiOlwidmllXCJ9LFwidGlsZXNcIjpbe1wiaW1hZ2VcIjpcIkJyb3duXzEwNzl4NzI1cHhfMS5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjcyNSxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fNTIweDc2MnB4XzIuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6NzYyfSx7XCJpbWFnZVwiOlwiQnJvd25fNTI3eDM2NXB4XzMuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjM2NSxcInN0YWNrXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJyb3duXzUyN3gzNjVweF80LmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjozNjV9LHtcImltYWdlXCI6XCJCcm93bl8xMDc5eDYyNXB4XzUuanBnXCIsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo2MjUsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJyb3duXzMzOXg1MzBweF82LmpwZ1wiLFwibGVmdFwiOnRydWUsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjUzMH0se1wiaW1hZ2VcIjpcIkJyb3duXzMzOXg1MzBweF83LmpwZ1wiLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjo1MzAsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJyb3duXzMzOXg1MzBweF84LmpwZ1wiLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjo1MzB9LHtcImltYWdlXCI6XCJCcm93bl83MDd4NzAwcHhfMTEuanBnXCIsXCJ3aWR0aFwiOjcwNyxcImhlaWdodFwiOjcwMCxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJyb3duXzMzOXgyMjlweF85LmpwZ1wiLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjoyMjksXCJzdGFja1wiOnRydWV9LHtcImltYWdlXCI6XCJCcm93bl82Nzh4OTAwcHhfMTAuanBnXCIsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjQzOSxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fMTA3OXg2MjVweF8xMi5qcGdcIixcImZ1bGxcIjp0cnVlLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NjI1fSx7XCJpbWFnZVwiOlwiQnJvd25fNTIweDc2MnB4XzEzLmpwZ1wiLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjo3NjIsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJyb3duXzUyN3gzNjVweF8xNC5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6MzY1LFwic3RhY2tcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fNTI3eDM2NXB4XzE1LmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjozNjV9XX0sXCJlbGRlc3RpbGFkb1wiOntcImZvbGRlclwiOlwiZWxkZXN0aWxhZG9cIixcInRpdGxlXCI6XCJlbCBkZXN0aWxhZG9cIixcImRlc2NyaXB0aW9uXCI6W1wiVGhlIGJlc3Qta2VwdCBzZWNyZXQgYW1vbmdzdCBsb2NhbHMgYW5kIG1lemNhbCBzZWVraW5nIGFmaWNpb25hZG9zLCBFbCBEZXN0aWxhZG8gaXMgYSBPYXhhY2EgYmFzZWQgc3BlYWtlYXN5IGFuZCBtZXpjYWxlcmlhIGJsZW5kaW5nIHRoZSB0cnVlc3QgZmxhdm9ycyBvZiBNZXhpY28gd2l0aCBwcm9ncmVzc2l2ZSBnYXN0cm9ub215LlwiLFwiVmlicmFudCBjb2xvcnMgYW5kIHRleHR1cmVzIG9mIHBhcGVyIGFuZCBwYWludCBpbWJ1ZSB0aGUgcmVzdGF1cmFudCdzIGlkZW50aXR5IHdpdGggYSByaWNoIHNlbnNlIG9mIGN1bGluYXJ5IHRyYWRpdGlvbnMgYW5kIGZsYXZvcnMuIFRoZSBjb3BwZXIgc3RpbGwgbG9nbywgY2FzdWFsIGtyYWZ0LXBhcGVyIG1lbnVzLCBhZ2F2ZSBzdGFtcGVkIGNvYXN0ZXJzLCBhbmQgcGxheWZ1bCB2aW50YWdlIHBvc3RjYXJkcyBzZWFzb24gdGhlIGludGltYXRlIHNwYWNlLCBpbnZpdGluZyBsb2NhbHMgYW5kIHZpc2l0b3JzIGFsaWtlIHRvIHBhcnRha2UgaW4gYW4gYXV0aGVudGljIGZvb2QgZXhwZXJpZW5jZS4gPGEgaHJlZj1cXFwiaHR0cDovL3d3dy5lbGRlc3RpbGFkby5jb20vXFxcIj53d3cuZWxkZXN0aWxhZG8uY29tPC9hPlwiXSxcInNlcnZpY2VzXCI6W1wiYnJhbmQgaWRlbnRpdHlcIixcInByaW50XCIsXCJXZWIgRGVzaWduXCJdLFwicHJldlwiOntcIm5hbWVcIjpcIkZ1bGwgU3VuXCIsXCJmb2xkZXJcIjpcImZ1bGxzdW5cIn0sXCJuZXh0XCI6e1wibmFtZVwiOlwic3VmZmVyZmVzdCBiZWVyIGNvXCIsXCJmb2xkZXJcIjpcInN1ZmZlcmZlc3RcIn0sXCJ0aWxlc1wiOlt7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fMTA3Nng1NTBweF8xLmpwZ1wiLFwid2lkdGhcIjoxMDc2LFwiaGVpZ2h0XCI6NTUwLFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb181MjB4MzY2cHhfMi5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6MzY2LFwic3RhY2tcIjp0cnVlLFwibGVmVFwiOnRydWV9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb181Mjd4OTMwcHhfMy5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6OTMwLFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTIweDUzMnB4XzQuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjUzMn0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzEwNzZ4NjM0cHhfNS5qcGdcIixcIndpZHRoXCI6MTA3NixcImhlaWdodFwiOjYzNCxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTIweDQ1NXB4XzYuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjQ1NSxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTI3eDQ1NXB4XzcuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjQ1NX0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzUyMHg2NDFweF84LmpwZ1wiLFwibGVmdFwiOnRydWUsXCJjbGVhclwiOnRydWUsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjY0MX0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzI0N3gzMDRweF85LmpwZ1wiLFwibGVmdFwiOnRydWUsXCJ3aWR0aFwiOjI0NyxcImhlaWdodFwiOjMwNH0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzI0N3gzMDRweF8xMC5qcGdcIixcIndpZHRoXCI6MjQ3LFwiaGVpZ2h0XCI6MzA0fSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTI4eDMwNHB4XzExLmpwZ1wiLFwid2lkdGhcIjo1MjgsXCJoZWlnaHRcIjozMDR9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb181MjB4NDQ1cHhfMTIuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcImNsZWFyXCI6dHJ1ZSxcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6NDQ1fSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTI3eDQ0NXB4XzEzLmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjo0NDV9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb18xMDc2eDU5NnB4XzEyLmpwZ1wiLFwid2lkdGhcIjoxMDc2LFwiaGVpZ2h0XCI6NTk2fV19LFwiZmpvcmRsaWZlXCI6e1wiZm9sZGVyXCI6XCJmam9yZGxpZmVcIixcInRpdGxlXCI6XCJmam9yZGxpZmVcIixcImRlc2NyaXB0aW9uXCI6W1wiQSBzdXN0YWluYWJsZSB3b21lbnN3ZWFyIGJyYW5kIG91dCB0byBjbGVhbiB1cCB0aGUgZmFzaGlvbiBhbmQgYmVhdXR5IGluZHVzdHJ5LlwiLFwiVGhlIGJyYW5kJ3MgaWRlbnRpdHkgYW5kIGUtY29tbWVyY2Ugc2l0ZSByZWZsZWN0IHRoZSBvcmdhbmljIGxhbmRzY2FwZSBvZiBub3JkaWMgZmpvcmRzIHRocm91Z2ggYSBuYXR1cmFsIGNvbG9yIHBhbGV0dGUgYW5kIG1pbmltYWwgbGF5b3V0LiBNb2Rlcm4gYW5kIGdlb21ldHJpYyB0eXBvZ3JhcGh5IHByb3ZpZGUgYSBjbGVhbiBsYW5kc2NhcGUgZm9yIHBvcHMgb2YgaW1hZ2VyeSwgdHJhbnNwb3J0IHNob3BwZXJzIGJlaGluZCB0aGUgc2VhbXMgdG8gbWVldCB0aGUgcGVvcGxlIGFuZCBwbGFjZXMgd2hvIGFyZSBtYWtpbmcgYSBkaWZmZXJlbmNlLiA8YSBocmVmPVxcXCJodHRwczovL3d3dy5mam9yZGxpZmUuY2EvXFxcIj53d3cuZmpvcmRsaWZlLmNhPC9hPlwiXSxcInNlcnZpY2VzXCI6W1wiU3RyYXRlZ3lcIixcIkJyYW5kIElkZW50aXR5XCIsXCJQcmludFwiLFwiV2Vic2l0ZSBEZXNpZ24gKyBEZXZlbG9wbWVudFwiXSxcInByZXZcIjp7XCJuYW1lXCI6XCJ2aWUgaGVhbGluZ1wiLFwiZm9sZGVyXCI6XCJ2aWVcIn0sXCJuZXh0XCI6e1wibmFtZVwiOlwiYmVuZWZpdCBjb3NtZXRpY3MgXCIsXCJmb2xkZXJcIjpcImJlbmVmaXRjb3NtZXRpY3NcIn0sXCJ0aWxlc1wiOlt7XCJpbWFnZVwiOlwiRmpvcmRsaWZlXzEwNzl4Njc1cHhfMS5qcGdcIixcImZ1bGxcIjp0cnVlLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6Njc1fSx7XCJpbWFnZVwiOlwiRmpvcmRsaWZlXzU4OXg2MDBweF80LmpwZ1wiLFwicmlnaHRcIjp0cnVlLFwid2lkdGhcIjo1ODksXCJoZWlnaHRcIjo2MDB9LHtcImltYWdlXCI6XCJGam9yZGxpZmVfNDU2eDI4NHB4XzIuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcIndpZHRoXCI6NDU2LFwiaGVpZ2h0XCI6Mjg0fSx7XCJpbWFnZVwiOlwiRmpvcmRsaWZlXzQ1NngyODRweF8zLmpwZ1wiLFwid2lkdGhcIjo0NTYsXCJoZWlnaHRcIjoyODR9LHtcImltYWdlXCI6XCJGam9yZGxpZmVfMTA3OXg1MzZweF81LmpwZ1wiLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NTM2LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJGam9yZGxpZmVfNTg3eDkxOHB4XzguanBnXCIsXCJ3aWR0aFwiOjU4NyxcImhlaWdodFwiOjkxOCxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkZqb3JkbGlmZV80NTZ4NjQycHhfNi5qcGdcIixcIndpZHRoXCI6NDU2LFwiaGVpZ2h0XCI6NjQyLFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJGam9yZGxpZmVfNDU2eDI0M3B4XzcuanBnXCIsXCJ3aWR0aFwiOjQ1NixcImhlaWdodFwiOjI0M30se1wiaW1hZ2VcIjpcIkZqb3JkbGlmZV8xMDc5eDIwMzFweF85LmpwZ1wiLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6MjAzMSxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRmpvcmRsaWZlXzU4OXg2MDBweF8xMC5qcGdcIixcIndpZHRoXCI6NTg5LFwiaGVpZ2h0XCI6NjAwLFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJGam9yZGxpZmVfNDU2eDU5OXB4XzExLmpwZ1wiLFwid2lkdGhcIjo0NTYsXCJoZWlnaHRcIjo1OTl9XX0sXCJmdWxsc3VuXCI6e1wiZm9sZGVyXCI6XCJmdWxsc3VuXCIsXCJ0aXRsZVwiOlwiZnVsbCBzdW5cIixcImRlc2NyaXB0aW9uXCI6W1wiSW5zcGlyZWQgYnkgQ2FsaWZvcm5pYeKAmXMgd2FybSBhbmQgaW52aWdvcmF0aW5nIHN1bnNoaW5lLCBGdWxsIFN1biBpcyAxMDAlIGFsbC1uYXR1cmFsLCBzdXN0YWluYWJseSBmYXJtZWQgY2FubmFiaXMuIFByb3VkbHkgcmFpc2VkIHVuZGVyIHRoZSBzdW5iZWx0IG9mIEh1bWJvbGR0IENvdW50eSwgdGhpcyBicmFuZOKAmXMgcHJvZHVjdCBsaW5lIGlzIGEgcmVzdWx0IG9mIG1lbGxvdyBvY2VhbiBicmVlemVzLCB0b3dlcmluZyBSZWR3b29kcyBhbmQgc3VuLWRyZW5jaGVkIGhpbGxzaWRlcywgeWllbGRpbmcgY2FubmFiaXMgb2YgdW5wYXJhbGxlbGVkIHF1YWxpdHksIHRhc3RlLCBhbmQgcGVyZm9ybWFuY2UuXCIsXCJXZSBzYXcgYW4gb3Bwb3J0dW5pdHkgdG8gc2hha2UgdXAgdGhlIGV2ZXItZ3Jvd2luZyBjYW5uYWJpcyBzcGFjZSB3aXRoIGEgZnJlc2ggYXBwcm9hY2ggZnVsbCBvZiBDYWxpZm9ybmlhIHNvdWwuIFRoZSBwcm9kdWN0IHBhY2thZ2luZyBwYWlycyByZXRybyB0eXBvZ3JhcGh5IHdpdGggYnJpZ2h0IGNvbG9ycyBhbmQgbW9kZXJuIGdlb21ldHJpYyBwYXR0ZXJucy4gQSBib2xkIGdyYWRpZW50IGluc3BpcmVkIGJ5IG5hdHVyZeKAmXMgc2tpZXMgYW5kIHNwbGFzaGVzIG9mIGdvbGQgZm9pbCBhZGQgYSBidXJzdCBvZiBwcmVtaXVtIHNoaW5lLiA8YSBocmVmPVxcXCJodHRwczovL3d3dy5mdWxsLXN1bi5jb21cXFwiPnd3dy5mdWxsLXN1bi5jb208L2E+XCJdLFwic2VydmljZXNcIjpbXCJicmFuZCBpZGVudGl0eVwiLFwicGFja2FnaW5nXCIsXCJjb3B5d3JpdGluZ1wiLFwid2ViIGRlc2lnbiArIGRldmVsb3BtZW50XCIsXCJNb2JpbGUgQXBwc1wiXSxcIm5leHRcIjp7XCJuYW1lXCI6XCJFbCBEZXN0aWxhZG9cIixcImZvbGRlclwiOlwiZWxkZXN0aWxhZG9cIn0sXCJ0aWxlc1wiOlt7XCJpbWFnZVwiOlwiRnVsbFN1bl82ODR4NTI1cHhfMS5qcGdcIixcIndpZHRoXCI6Njg0LFwiaGVpZ2h0XCI6NTI1LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJGdWxsU3VuXzM2NHg1MjVweF8yLmpwZ1wiLFwid2lkdGhcIjozNjQsXCJoZWlnaHRcIjo1MjV9LHtcImltYWdlXCI6XCJGdWxsU3VuXzEwNzh4NTM3cHhfMy5qcGdcIixcIndpZHRoXCI6MTA3OCxcImhlaWdodFwiOjUzNyxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRnVsbFN1bl81MTJ4NDUzcHhfNC5qcGdcIixcImxlZnRcIjp0cnVlLFwid2lkdGhcIjo1MTIsXCJoZWlnaHRcIjo0NTN9LHtcImltYWdlXCI6XCJGdWxsU3VuXzUzNng0NTNweF81LmpwZ1wiLFwid2lkdGhcIjo1MzUsXCJoZWlnaHRcIjo0NTN9LHtcImltYWdlXCI6XCJGdWxsU3VuXzEwNzh4NTM3cHhfNi5qcGdcIixcImZ1bGxcIjp0cnVlLFwid2lkdGhcIjoxMDc4LFwiaGVpZ2h0XCI6NTM3fSx7XCJpbWFnZVwiOlwiRnVsbFN1bl81MTJ4NDUzcHhfNy5qcGdcIixcImxlZnRcIjp0cnVlLFwid2lkdGhcIjo1MTIsXCJoZWlnaHRcIjo0NTN9LHtcImltYWdlXCI6XCJGdWxsU3VuXzUzNngyMDhweF84LmpwZ1wiLFwid2lkdGhcIjo1MzYsXCJoZWlnaHRcIjoyMDgsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkZ1bGxTdW5fNTM2eDIwOHB4XzkuanBnXCIsXCJ3aWR0aFwiOjUzNixcImhlaWdodFwiOjIwOH1dfSxcInN1ZmZlcmZlc3RcIjp7XCJmb2xkZXJcIjpcInN1ZmZlcmZlc3RcIixcInRpdGxlXCI6XCJzdWZmZXJmZXN0XCIsXCJkZXNjcmlwdGlvblwiOltcIlN1ZmZlcmZlc3QgQmVlciBDb21wYW55IHdhcyBib3JuIG91dCBvZiBhIG5lZWQgdG8gcHJvdmlkZSBhIGdsdXRlbi1yZW1vdmVkIGJlZXIgdGhhdCBkb2VzbuKAmXQgY29tcHJvbWlzZSBvbiB0YXN0ZSBvciBxdWFsaXR5LlwiLFwiV2UgcGFydG5lcmVkIHdpdGggU3VmZmVyZmVzdCB0byBkZXNpZ24gYSBiZWVyIHRoYXQgY2VsZWJyYXRlcyB0aGUgY29tcGFueeKAmXMgbWFudHJhOiDigJxtZWRhbHMgZm9yIGEgam9iIHdlbGwgZG9uZS7igJ0gVGhlIHZpY3RvcmlvdXMgZmlzdCBpY29uIGNvbW11bmljYXRlcyB0aGUgYnJhbmTigJlzIGFiaWxpdHkgdG8gb3ZlcmNvbWUgdGhlIGNoYWxsZW5nZXMgb2YgdXNpbmcgYmFybGV5IGluIGEgZ2x1dGVuLWZyZWUgYmVlci4gQ3Jpc3Agd2hpdGUgY2FucyBmZWF0dXJpbmcgYSBsaW5lIG9mIGRpc3Rpbmd1aXNoZWQgY29sb3IgcmliYm9ucyBhbmQgYm9sZCB0eXBvZ3JhcGh5IGNyZWF0ZSBhIHdpbm5pbmcgY29tYmluYXRpb24uXCJdLFwic2VydmljZXNcIjpbXCJicmFuZCBpZGVudGl0eVwiLFwic3RyYXRlZ3lcIixcInBhY2thZ2luZ1wiLFwicHJpbnRcIl0sXCJwcmV2XCI6e1wibmFtZVwiOlwiRWwgRGVzdGlsYWRvXCIsXCJmb2xkZXJcIjpcImVsZGVzdGlsYWRvXCJ9LFwibmV4dFwiOntcIm5hbWVcIjpcInN1bWlcIixcImZvbGRlclwiOlwic3VtaVwifSxcInRpbGVzXCI6W3tcImltYWdlXCI6XCJTdWZmZXJmZXN0XzY4NHg1MjVweF8xLmpwZ1wiLFwid2lkdGhcIjo2ODQsXCJoZWlnaHRcIjo1MjUsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfMzY0eDUyNXB4XzIuanBnXCIsXCJ3aWR0aFwiOjM2NCxcImhlaWdodFwiOjUyNX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfNTIweDM2NnB4XzMuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjM2NixcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF81Mjh4MzY2cHhfNC5qcGdcIixcIndpZHRoXCI6NTI4LFwiaGVpZ2h0XCI6MzY2LFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF8zMzl4NTMwcHhfNS5qcGdcIixcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6NTMwLFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJTdWZmZXJmZXN0XzMzOXg1MzBweF82LmpwZ1wiLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjo1MzAsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfMzM5eDUzMHB4XzcuanBnXCIsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjUzMH0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfMTA3Mng2MzBweF84LmpwZ1wiLFwid2lkdGhcIjoxMDcyLFwiaGVpZ2h0XCI6NjMwLFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJTdWZmZXJmZXN0XzUxOXg0NTdweF85LmpwZ1wiLFwid2lkdGhcIjo1MTksXCJoZWlnaHRcIjo0NTcsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfNTI2eDIwN3B4XzEwLmpwZ1wiLFwid2lkdGhcIjo1MjYsXCJoZWlnaHRcIjoyMDcsXCJzdGFja1wiOnRydWV9LHtcImltYWdlXCI6XCJTdWZmZXJmZXN0XzUyNngyMDdweF8xMS5qcGdcIixcIndpZHRoXCI6NTI2LFwiaGVpZ2h0XCI6MjA3fV19LFwic3VtaVwiOntcImZvbGRlclwiOlwic3VtaVwiLFwidGl0bGVcIjpcInN1bWlcIixcImRlc2NyaXB0aW9uXCI6W1wiQSBjYXN1YWwtY2hpYyBraW1vbm8gY28uLCBTdW1pIGNyZWF0ZXMgYW5kIHByb2R1Y2VzIHNpbGsgYW5kIGNoYXJtZXVzZSBib3RhbmljYWwgcHJpbnQga2ltb25vcy4gRWFjaCByb2JlIGZlYXR1cmVzIGFuIG9yaWdpbmFsIHBhdHRlcm4sIGZpcnN0IHNrZXRjaGVkIGJ5IGhhbmQsIHRoZW4gc2F0dXJhdGVkIGluIHJpY2ggd2F0ZXJjb2xvcnMgdXNpbmcgYSB0cmFkaXRpb25hbCBzdW1pIHBhaW50YnJ1c2guXCIsXCJUaGUgY29tcGxldGUgcmVkZXNpZ24gb2YgdGhlIGJyYW5k4oCZcyB2aXN1YWwgaWRlbnRpdHkgc3lzdGVtIGJlZ2FuIHdpdGggYSBuZXcgbmFtZTogU1VNSS4gSW5zcGlyZWQgYnkgdGhlIHBhaW50YnJ1c2ggdXNlZCB0byBjcmVhdGUgZWFjaCBraW1vbm8ncyBkZXNpZ25zLCB0aGUgbmV3IG5hbWUgdW52ZWlscyBhIGRlZXBlciBjb25uZWN0aW9uIHRvIHRoZSB0cmFkaXRpb25zIGJlaGluZCBDaGluZXNlIGJydXNod29yayBpbiBjYWxsaWdyYXBoeSBhbmQgcGFpbnRpbmcuIE1vZGVybiB0eXBvZ3JhcGh5IGNvdXBsZWQgd2l0aCBldGhlcmVhbCBmbG9yYWwgZGVzaWducyBhbmQgYSBzb2Z0IGNvbG9yIHBhbGV0dGUsIHRoZSBicmFuZOKAmXMgbmV3IGlkZW50aXR5IGlzIHRhaWxvcmVkIHRvIHRoZSB0cmFkaXRpb24gb2YgdGhlaXIgdGltZWxlc3Mga2ltb25vcy5cIl0sXCJzZXJ2aWNlc1wiOltcInN0YXRlZ3lcIixcIm5hbWluZ1wiLFwiY29weXdyaXRpbmdcIixcImJyYW5kIGlkZW50aXR5XCIsXCJwcmludFwiXSxcInByZXZcIjp7XCJuYW1lXCI6XCJzdWZmZXJmZXN0IGJlZXIgY29cIixcImZvbGRlclwiOlwic3VmZmVyZmVzdFwifSxcIm5leHRcIjp7XCJuYW1lXCI6XCJicm93biBlc3RhdGVcIixcImZvbGRlclwiOlwiYnJvd25cIn0sXCJ0aWxlc1wiOlt7XCJpbWFnZVwiOlwiU3VtaV81MjB4NzYycHhfMS5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6NzYyLFwibGVmVFwiOnRydWV9LHtcImltYWdlXCI6XCJTdW1pXzUyN3gzNjVweF8yLmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjozNjUsXCJyaWdodFwiOnRydWV9LHtcImltYWdlXCI6XCJTdW1pXzUyN3gzNjVweF8zLmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjozNjUsXCJyaWdodFwiOnRydWV9LHtcImltYWdlXCI6XCJTdW1pXzEwNzl4NjI1cHhfNC5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjYyNSxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV83MTB4NzEwcHhfNy5qcGdcIixcIndpZHRoXCI6NzEwLFwiaGVpZ2h0XCI6NzEwLFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV8zMzl4MjI5cHhfNS5qcGdcIixcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6MjI5LFwic3RhY2tcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV8zMzl4NDUwcHhfNi5qcGdcIixcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6NDUwfSx7XCJpbWFnZVwiOlwiU3VtaV8xMDc5eDYyNXB4XzguanBnXCIsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo2MjUsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfNTIweDc2MnB4XzkuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjc2MixcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV81Mjd4MzY1cHhfMTAuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjM2NSxcInN0YWNrXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfNTI3eDM2NXB4XzExLmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjozNjV9LHtcImltYWdlXCI6XCJTdW1pXzcxMHg1MzBweF8xMi5qcGdcIixcIndpZHRoXCI6NzEwLFwiaGVpZ2h0XCI6NTMwLFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJTdW1pXzMzOXg1MzBweF8xMy5qcGdcIixcIndpZHRoXCI6MzM4LFwiaGVpZ2h0XCI6NTMwLFwicmlnaHRcIjp0cnVlfV19LFwidXJiYW5raXRjaGVuXCI6e1wiZm9sZGVyXCI6XCJ1cmJhbmtpdGNoZW5cIixcInRpdGxlXCI6XCJ1cmJhbmtpdGNoZW5cIixcImRlc2NyaXB0aW9uXCI6W1wiQSBjb2xsYWJvcmF0aXZlIGN1bGluYXJ5IGtpdGNoZW4gdGVhY2hpbmcgaXRzIG5laWdoYm9ycyBmcm9tIGFyb3VuZCBMQSBob3cgdG8gc2F2b3IgdGhlIG1vbWVudC5cIixcIlRoZSByZWRlc2lnbiBvZiB0aGUgYnJhbmTigJlzIGlkZW50aXR5IGJlZ2FuIHdpdGggcmVjb25uZWN0aW5nIHRvIHRoZSBvd25lcuKAmXMgSXRhbGlhbiByb290cy4gVmlicmFudCBibHVlcyBhbmQgcmVkcyBub2QgdG8gdGhlIGJhcm9xdWUgdGlsZXMgYW5kIHRlcnJhY290dGEgd2FsbHMgZm91bmQgaW4gdHJhZGl0aW9uYWwgSXRhbGlhbiBraXRjaGVucy4gVGhlIGxvZ290eXBlIGlzIGluc3BpcmVkIGJ5IDE5MzDigJlzIHZpbnRhZ2UgSXRhbGlhbiBwYXN0YSBwYWNrYWdpbmcuIEltYWdlcnkgb2YgdGhlIHNwYWNlIGFuZCBjYW5kaWRzIG9mIHRoZSBwZW9wbGUgd2hvIGZpbGwgaXQgZ2FybmlzaCB0aGUgZWNvbW1lcmNlIHNpdGUsIGlsbHVtaW5hdGluZyB0aGUgZW1vdGlvbmFsIGJvbmRzIGNyZWF0ZWQgb3ZlciBmb29kLjxhIGhyZWY9XFxcImh0dHBzOi8vd3d3LnVyYmFua2l0Y2hlbi1sYS5jb20vXFxcIj53d3cudXJiYW5raXRjaGVuLWxhLmNvbTwvYT5cIl0sXCJzZXJ2aWNlc1wiOltcInN0cmF0ZWd5XCIsXCJicmFuZCBpZGVudGl0eVwiLFwicHJpbnRcIixcIldlYnNpdGUgRGVzaWduICsgRGV2ZWxvcG1lbnRcIixcIlBob3RvZ3JhcGh5XCJdLFwicHJldlwiOntcIm5hbWVcIjpcImJlbmVmaXQgY29zbWV0aWNzIFwiLFwiZm9sZGVyXCI6XCJiZW5lZml0Y29zbWV0aWNzXCJ9LFwibmV4dFwiOntcIm5hbWVcIjpcImZ1bGwgc3VuXCIsXCJmb2xkZXJcIjpcImZ1bGxzdW5cIn0sXCJ0aWxlc1wiOlt7XCJpbWFnZVwiOlwiVXJiYW5fNjg0eDUyNXB4XzEuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcIndpZHRoXCI6Njg0LFwiaGVpZ2h0XCI6NTI1fSx7XCJpbWFnZVwiOlwiVXJiYW5fMzY0eDUyNXB4XzIuanBnXCIsXCJ3aWR0aFwiOjM2NCxcImhlaWdodFwiOjUyNX0se1wiaW1hZ2VcIjpcIlVyYmFuXzEwNzl4NTM3cHhfMy5qcGdcIixcImZ1bGxcIjp0cnVlLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NTM3fSx7XCJpbWFnZVwiOlwiVXJiYW5fNTM0eDczN3B4XzQuanBnXCIsXCJ3aWR0aFwiOjUzNCxcImhlaWdodFwiOjczNyxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVXJiYW5fNTE3eDM1NnB4XzUuanBnXCIsXCJ3aWR0aFwiOjUxNCxcImhlaWdodFwiOjM1NixcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlVyYmFuXzUxN3gzNTJweF82LmpwZ1wiLFwid2lkdGhcIjo1MTQsXCJoZWlnaHRcIjozNTIsXCJyaWdodFwiOnRydWV9LHtcImltYWdlXCI6XCJVcmJhbl8xMDc5eDY1NXB4XzcuanBnXCIsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo2NTUsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlVyYmFuXzUwOHg2ODhweF84LmpwZ1wiLFwid2lkdGhcIjo1MDgsXCJoZWlnaHRcIjo2ODgsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlVyYmFfNTQzeDY4OHB4XzkuanBnXCIsXCJ3aWR0aFwiOjU0MCxcImhlaWdodFwiOjY4OCxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlVyYmFuXzM3MHg1MjVweF8xMC5qcGdcIixcIndpZHRoXCI6MzcwLFwiaGVpZ2h0XCI6NTI1LFwibGVmdFwiOnRydWUsXCJjbGVhclwiOnRydWV9LHtcImltYWdlXCI6XCJVcmJhbl82ODF4NTI1cHhfMTEuanBnXCIsXCJ3aWR0aFwiOjY3OCxcImhlaWdodFwiOjUyNX0se1wiaW1hZ2VcIjpcIlVyYmFuXzEwNzl4NTM3cHhfMTIuanBnXCIsXCJmdWxsXCI6dHJ1ZSxcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjUzN31dfSxcInZpZVwiOntcImZvbGRlclwiOlwidmllXCIsXCJ0aXRsZVwiOlwidmllIGhlYWxpbmdcIixcImRlc2NyaXB0aW9uXCI6W1wiQSBob2xpc3RpYyBoZWFsaW5nIGFwcHJvYWNoIHRoYXQgYnJpbmdzIGhhcm1vbnkgdG8gdGhlIG1pbmQsIGJvZHksIGFuZCBzcGlyaXQuXCIsXCJUaGUgaWRlbnRpdHkgYW5kIHBhY2thZ2luZyBkcmF3cyBvbiBvcmdhbmljIGNvbG9ycyBhbmQgdGV4dHVyZXMgZm91bmQgaW4gbG9vc2UgbGVhZiB0ZWFzIGFuZCBoZXJiYWwgc3VwcGxlbWVudHMuIEJvbGQgdHlwb2dyYXBoeSwgdG9uZSBvbiB0b25lIGxheWVyaW5nLCBhbmQgZGVsaWNhdGUgbGluZXMgb2YgZ29sZCBmb2lsIGV2b2tlIGEgbmV3IHNvcGhpc3RpY2F0aW9uIHRvIGhvbWUgcmVtZWRpZXMgZm9yIGV2ZXJ5ZGF5IGhlYWxpbmcuIDxhIGhyZWY9XFxcImh0dHBzOi8vd3d3LnZpZWhlYWxpbmcuY29tL1xcXCI+d3d3LnZpZWhlYWxpbmcuY29tPC9hPlwiXSxcInNlcnZpY2VzXCI6W1wic3RyYXRlZ3lcIixcImJyYW5kIGlkZW50aXR5XCIsXCJwYWNrYWdpbmdcIixcInByaW50XCIsXCJwcm9kdWN0IGRldmVsb3BtZW50XCIsXCJXZWJzaXRlIERlc2lnbiArIERldmVsb3BtZW50XCIsXCJQaG90b2dyYXBoeVwiXSxcInByZXZcIjp7XCJuYW1lXCI6XCJicm93biBlc3RhdGVcIixcImZvbGRlclwiOlwiYnJvd25cIn0sXCJuZXh0XCI6e1wibmFtZVwiOlwiZmpvcmRsaWZlXCIsXCJmb2xkZXJcIjpcImZqb3JkbGlmZVwifSxcInRpbGVzXCI6W3tcImltYWdlXCI6XCJWaWVfMTA3OXg1MzdweF8xLmpwZ1wiLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NTM3LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJWaWVfNjg0eDUyNXB4XzIuanBnXCIsXCJ3aWR0aFwiOjY4NCxcImhlaWdodFwiOjUyNSxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVmllXzM2NHg1MjVweF8zLmpwZ1wiLFwid2lkdGhcIjozNjQsXCJoZWlnaHRcIjo1MjV9LHtcImltYWdlXCI6XCJWaWVfNTEyeDQ1M3B4XzQuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcIndpZHRoXCI6NTEyLFwiaGVpZ2h0XCI6NDUzfSx7XCJpbWFnZVwiOlwiVmllXzUzNng0NTNweF81LmpwZ1wiLFwid2lkdGhcIjo1MzYsXCJoZWlnaHRcIjo0NTN9LHtcImltYWdlXCI6XCJWaWVfMTA3OXg1MzdweF82LmpwZ1wiLFwiZnVsbFwiOnRydWUsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo1Mzd9LHtcImltYWdlXCI6XCJWaWVfNjgzeDYyNnB4XzcuanBnXCIsXCJ3aWR0aFwiOjY4MyxcImhlaWdodFwiOjYyNn0se1wiaW1hZ2VcIjpcIlZpZV8zNjZ4MjA4cHhfOC5qcGdcIixcIndpZHRoXCI6MzY2LFwiaGVpZ2h0XCI6MjA4LFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVmllXzM2NngzODdweF85LmpwZ1wiLFwid2lkdGhcIjozNjYsXCJoZWlnaHRcIjozODcsXCJyaWdodFwiOnRydWV9LHtcImltYWdlXCI6XCJWaWVfMzY0eDUyNXB4XzEwLmpwZ1wiLFwid2lkdGhcIjozNjQsXCJoZWlnaHRcIjo1MjUsXCJjbGVhclwiOnRydWUsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlZpZV82ODR4NTI1cHhfMTEuanBnXCIsXCJ3aWR0aFwiOjY4NCxcImhlaWdodFwiOjUyNSxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVmllXzEwNzl4NTM3cHhfMTIuanBnXCIsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo1MzcsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlZpZV8zNjR4NjI2cHhfMTMuanBnXCIsXCJ3aWR0aFwiOjM2NCxcImhlaWdodFwiOjYyNixcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVmllXzY4NXg2MjZweF8xNC5qcGdcIixcIndpZHRoXCI6Njg0LFwiaGVpZ2h0XCI6NjI2LFwicmlnaHRcIjp0cnVlfV19fX07IiwiSW5kZXggPVxuXG4gIGk6IC0+XG4gICAgQmx1cmxvYWQuaSgpXG5cbiAgICBAaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgJCgnLmJ1cmdlcicpLmNsaWNrIEBtb2JpbGVcblxuXG4gIG1vYmlsZTogLT5cblxuICAgIF8uc3dhcCAnLmJ1cmdlcidcbiAgICBfLnN3YXAgJy5tb2JpbGUnXG4gICAgXy5zd2FwICdib2R5J1xuIl19
