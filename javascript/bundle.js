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
    "grey1": "#aca39a"
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
    "url": "http://www.designsakestudio.com/",
    "description": "Boutique design studio that specializes in branding, packaging, web design, and development",
    "keywords": "design, graphic design, branding, packaging, web design, web development, art direction, designsake,",
    "image": "img/share.jpg",
    "repo": "https://github.com/acidjazz/sake2",
    "gmap": "https://goo.gl/maps/SV3rxDiZoF22"
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
      "description": ["Benefit Cosmetics has coined the bold and girly persona in the cosmetics industry. After 30 plus years of business, Benefit developed a rich visual history that continues to shape the company's identity and impacts the beauty industry around the world.", "As a brand, Benefit continues to experiment with color, patterns, and type everywhere possible, whether it be in product packaging or retail spaces, all the while staying true to its unique DNA. Featured here are samples of product packaging and marketing collateral we created for the company."],
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
      "description": ["Nestled in the eastern hills of Napa Valley, the Brown family continues to produce charismatic wines, the unconventional way.", "When asked to revive the brand’s existing identity, we designed several concepts that spotlight the meaningful stories behind the estate and its symbiotic relationship to mother nature. Sun drenched imagery defines a rich sense of place, mysterious illustrations depict Jamaican folklore, and classic typography spells out quotes that unveil a true sense of character."],
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
      "description": ["A sustainable womenswear brand out to clean up the fashion and beauty industry.", "The brand identity and e-commerce site reflect the organic landscape of nordic fjords through a natural color palette and minimal layout. Modern and geometric typography provide a clean landscape for pops of imagery, transporting shoppers behind the seams to meet the people and places who are making a difference. <a href=\"https://www.fjordlife.ca/\">www.fjordlife.ca</a>"],
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
      "description": ["Inspired by California’s warm and invigorating sunshine, Full Sun is a 100% all-natural, sustainably farmed cannabis. Proudly raised under the sunbelt of Humboldt County, this brand’s product line is a result of mellow ocean breezes, towering Redwoods and sun-drenched hillsides, yielding cannabis of unparalleled quality, taste, and performance.", "We saw an opportunity to shake up the ever-growing cannabis space with a fresh approach full of California soul. The product packaging pairs retro typography with bright colors and modern geometric patterns. A bold gradient inspired by nature’s skies and splashes of gold foil add a burst of premium shine. <a href=\"https://www.full-sun.com\">www.full-sun.com</a>"],
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
      "description": ["Sufferfest Beer Company was born out of a need to provide a gluten-removed beer that doesn’t compromise on taste or quality.", "We partnered with Sufferfest to design a beer that celebrates the company’s mantra: “medals for a job well done.” The victorious fist icon communicates the brand’s ability to overcome the limitations of using barley in a gluten-free beer. Crisp white cans featuring a line of distinguished color ribbons and bold typography create a winning combination."],
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
      "description": ["A casual-chic kimono co., Sumi creates and produces silk and charmeuse botanical print kimonos. Each robe features an original pattern, first sketched by hand, then saturated in rich watercolors using a traditional sumi paintbrush.", "The complete redesign of the brand’s visual identity system began with a new name: SUMI. Inspired by the paintbrush used to create each kimonos designs, the new name unveils a deeper connection to the traditions behind Chinese brushwork in calligraphy and painting. Modern typography coupled with ethereal floral designs and a soft color palette, the brand’s new identity is tailored to the tradition of their timeless kimonos."],
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
    return _.swap('.mobile');
  }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJibHVybG9hZC5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQTtFQUFBOzs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUNULEtBQUMsQ0FBQSxJQUFELENBQU0sRUFBTixFQUFVLFFBQVYsRUFBb0IsS0FBcEI7aUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUs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QUFBLEVBQVUsU0FBQTtXQUVSLENBQUEsQ0FBRSxTQUFGLENBQVksQ0FBQyxLQUFiLENBQW1CLElBQUMsQ0FBQSxNQUFwQjtFQUZRLENBTFY7RUFVQSxNQUFBLEVBQVEsU0FBQTtJQUVOLENBQUMsQ0FBQyxJQUFGLENBQU8sU0FBUDtXQUNBLENBQUMsQ0FBQyxJQUFGLENBQU8sU0FBUDtFQUhNLENBVlIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXyA9XG5cbiAgaTogLT5cbiAgICBAY29uc29sZSA9IHNldEludGVydmFsKEBkZXRlY3QuYmluZChAKSwgMjAwKVxuXG4gIHA6XG4gICAgb2ZmaW5nOiBmYWxzZVxuICAgIG9mZnRpbWU6IDBcblxuICB0dXJuOiAoZWwsIHJlbW92ZT1mYWxzZSwgYWRkPWZhbHNlKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiByZW1vdmUgaXNudCBmYWxzZVxuICAgICAgZWwucmVtb3ZlQ2xhc3MocmVtb3ZlKVxuXG4gICAgaWYgYWRkIGlzbnQgZmFsc2VcbiAgICAgIGVsLmFkZENsYXNzKGFkZClcblxuICAgIHJldHVybiB0cnVlXG5cbiAgb2ZmOiAoZWwsIHA9e30pIC0+XG5cbiAgICBpZiBwLm9mZmluZyBhbmQgcC5vZmZ0aW1lID4gMFxuXG4gICAgICBAdHVybiBlbCwgZmFsc2UsICdvZmZpbmcnXG4gICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEB0dXJuIGVsLCAnb2ZmaW5nJywgZmFsc2VcbiAgICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG4gICAgICAsIHAub2ZmdGltZSoxMDAwICsgMTAwXG5cbiAgICBlbHNlXG4gICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcblxuICAgIHJldHVyblxuXG4gIG9uOiAoZWwsIHApIC0+XG4gICAgQHR1cm4gZWwsICdvZmYnLCAnb24nXG5cbiAgc3dhcDogKGVsLCBwKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiBlbC5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgQG9uIGVsLCBwXG4gICAgZWxzZVxuICAgICAgQG9mZiBlbCwgcFxuXG4gICAgcmV0dXJuXG5cbiAgZW5jb2RlOiAoc3RyKSAtPlxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgICAgLnJlcGxhY2UoLyEvZywgJyUyMScpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJTI3JylcbiAgICAgIC5yZXBsYWNlKC9cXCgvZywgJyUyOCcpXG4gICAgICAucmVwbGFjZSgvXFwpL2csICclMjknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcbiAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxuXG4gIHQ6IChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIC0+XG4gICAgX2dhcS5wdXNoIFsnX3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVdXG5cbiAgcmFuZDogKG1pbiwgbWF4KSAtPlxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluXG5cbiAgcmFuZ2U6IChzdGFydCwgZW5kKSAtPlxuICAgIHJlc3VsdCA9IFtdXG4gICAgZm9yIG51bSBpbiBbc3RhcnQuLmVuZF1cbiAgICAgIHJlc3VsdC5wdXNoIG51bVxuICAgIHJlc3VsdFxuXG4gIGZpdDogKHNyY1dpZHRoLCBzcmNIZWlnaHQsIG1heFdpZHRoLCBtYXhIZWlnaHQpIC0+XG4gICAgcmF0aW8gPSBNYXRoLm1pbihtYXhXaWR0aCAvIHNyY1dpZHRoLCBtYXhIZWlnaHQgLyBzcmNIZWlnaHQpXG4gICAgd2lkdGg6IHNyY1dpZHRoKnJhdGlvLCBoZWlnaHQ6IHNyY0hlaWdodCpyYXRpb1xuXG4gIGhleDJyZ2I6IChoZXgpIC0+XG4gICAgcmVzdWx0ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleClcbiAgICByOiBwYXJzZUludChyZXN1bHRbMV0sIDE2KSxcbiAgICBnOiBwYXJzZUludChyZXN1bHRbMl0sIDE2KSxcbiAgICBiOiBwYXJzZUludChyZXN1bHRbM10sIDE2KVxuIFxuICBvYmpjOiAob2JqKSAtPlxuICAgIChrIGZvciBvd24gayBvZiBvYmopLmxlbmd0aFxuXG4gIGxvYWQ6IChzY3JpcHQsIGluaXRpYXRlLCBjb21wbGV0ZSkgLT5cblxuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnc2NyaXB0J1xuICAgIGVsLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0J1xuICAgIGVsLnNyYyA9IHNjcmlwdFxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIgJ2xvYWQnICwgKGUpIC0+XG4gICAgICBjb21wbGV0ZSgpIGlmIHR5cGVvZiBjb21wbGV0ZSBpcyAnZnVuY3Rpb24nXG4gICAgICB3aW5kb3dbaW5pdGlhdGVdLmkoKSBpZiBpbml0aWF0ZSBpc250IHVuZGVmaW5lZCBhbmQgaW5pdGlhdGUgaXNudCBmYWxzZVxuICAgICwgZmFsc2VcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpXG5cbiAgamluaXQ6IC0+XG4gICAgJC5hamF4U2V0dXBcbiAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuXG4gIHBhdGNoOiAodXJsLCBkYXRhKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpwYXRjaCA9ICQuYWpheFxuICAgICAgdXJsOiB1cmxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICAgIHR5cGU6ICdQQVRDSCdcblxuICAgIGpwYXRjaC5mYWlsIChyZXNwb25zZSkgLT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwYXRjaFxuXG4gIGdldDogKGFyZ3MuLi4pIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAgamdldCA9ICQuZ2V0IGFyZ3MuLi5cblxuICAgIGpnZXQuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcbiAgICAgIGpnZXQuZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqZ2V0XG5cbiAgcG9zdDogKGFyZ3MuLi4pIC0+XG5cbiAgICBqcG9zdCA9ICQucG9zdCBhcmdzLi4uXG5cbiAgICBqcG9zdC5mYWlsIChyZXNwb25zZSkgPT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuICAgICAganBvc3QuZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcG9zdFxuXG4gIGZhaWw6IChyZXNwb25zZSkgLT5cblxuICAgIGVycm9yID0gcmVzcG9uc2UucmVzcG9uc2VKU09OPy5lcnJvcnM/WzBdXG4gICAgaWYgZXJyb3IgaXMgdW5kZWZpbmVkXG4gICAgICByZXR1cm4gUHJvbXB0LmkgcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5zdGF0dXNUZXh0XG5cbiAgICBwdWcgPSBlcnJvci5tZXNzYWdlLm1hdGNoIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspL1xuICAgIGlmIHB1ZyBpc250IG51bGxcbiAgICAgIGVycm9yLm1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlLnJlcGxhY2UgL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKykvLCAnJ1xuICAgICAgZXJyb3IuZmlsZSA9IHB1Z1sxXVxuICAgICAgZXJyb3IubGluZSA9IHB1Z1syXVxuXG4gICAgZmlsZSA9IEBlbmNvZGUgXCIje2Vycm9yLmZpbGV9XCJcblxuICAgIHN3aXRjaCBjb25maWcuYXBwLmVkaXRvclxuICAgICAgd2hlbiAnbWFjdmltJyB0aGVuIGVkaXRvciA9ICdtdmltOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3N1YmxpbWUnIHRoZW4gZWRpdG9yID0gJ3N1Ymw6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnZW1hY3MnIHRoZW4gZWRpdG9yID0gJ2VtYWNzOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3RleHRtYXRlJyB0aGVuIGVkaXRvciA9ICd0ZXh0bWF0ZTovL29wZW4vP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAncGhwc3Rvcm0nIHRoZW4gZWRpdG9yID0gJ3BocHN0b3JtOi8vb3Blbj9maWxlPSdcblxuICAgIGlmIGVycm9yLmZpbGUgaXNudCBudWxsXG4gICAgICBib2R5ID0gXCJcIlwiXG4gICAgICAgIDxwcmU+I3tlcnJvci5tZXNzYWdlfTwvcHJlPlxuICAgICAgICA8YSBocmVmPVwiI3tlZGl0b3J9I3tmaWxlfSZsaW5lPSN7ZXJyb3IubGluZX1cIj48Yj4je2Vycm9yLmZpbGV9OiN7ZXJyb3IubGluZX08L2I+PC9hPlxuICAgICAgXCJcIlwiXG4gICAgZWxzZVxuICAgICAgYm9keSA9IGVycm9yLm1lc3NhZ2VcblxuICAgIFByb21wdC5pIGVycm9yLnR5cGUsIGJvZHksIFsnT0snXVxuXG4gIG1ldGhvZHM6IChvYmopIC0+XG4gICAgcmVzID0gW11cbiAgICBmb3IgaSxtIG9mIG9ialxuICAgICAgaWYgdHlwZW9mIG0gaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICByZXMucHVzaCBtXG4gICAgcmV0dXJuIHJlc1xuXG4gIGxsYzogLT5cbiAgICBhc2NpaSA9IFwiXCJcIlxuXG4gICAgICAlY21tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLi4uLi06Oi8vOjotLi4uLi4uLi06Ojo6Ojo6Ojo6Ojo6LS4uLi4uLi4uLTo6Ly8vOi0ub21tXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uOit5aGRkZGRkZGh5Ky0uLi4uL2RkZGRkZGRkZGRkZGQrLi4uLi4uL3NoZGRkZGRkZHlvZG1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi1obW1taHl5eXlkbW1taDouLi4vbW1tbWhoaGhoaGhoaCsuLi4uOnlkbW1kaHl5eWhkZG9vbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi1zczotLi4uLi15bW1teS4uLi9tbW1tLS0tLS0tLS0tLi4uLjpkbW1tczotLi4uLTovLi1tXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLnltbW15Li4uL21tbW0tLytvb28rOi0uLi4ueW1tbXktOitvb28rLy0uLmRcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzbW1tZDouLi4vbW1tbWhtbW1tbW1kaCsuLi5kbW1tc2hkbW1tbW1taHMtaFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzZG1tZHk6Li4uLjpoaGRobysvLyt5bW1tbSsuLmRtbW1keW8vLytzZG1tbWhoXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLSt5ZG1tZHkvLi4uLi4uLi0tOi4uLi4uLi5zbW1taC4ueW1tbXMuLi4uLi46bW1tbW1cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tOnNobW1tZHMvLS0tLS0uLi4uOnMvLS0uLi4tOmhtbW1zLi46ZG1tZC8tLi4uLW9tbW1tbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLmhtbW1tbW1oaGhoaGhoaC4uLitkbW1kaHl5eWhkbW1teS0uLi4vaG1tbWh5eXlobW1tZGhtXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uZGRkZGRkZGRkZGRkZGRkLi4uLStzaGRkZGRkZGRoeS8tLi4uLi4tb3lkZGRkZGRkaG86ZG1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi46Ojo6Ojo6Ojo6Ojo6OjouLi4uLi4uLTovLy86Oi0uLi4uLi4uLi4uLi06Ly8vOi0uLm9tbVxuICAgICAgbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG5cbiAgICAgIDo6IHN5bnRhY3RpYyBzdWdhciBieSAyNTZcbiAgICAgIDo6IGh0dHA6Ly8yNTYuaW8vXG4gICAgICA6OiAje2NvbmZpZy5tZXRhLnJlcG99XG4gICAgXCJcIlwiXG4gICAgY29uc29sZS5sb2cgYXNjaWksIFwiY29sb3I6IGdyZXk7IGZvbnQtZmFtaWx5OiBNZW5sbywgbW9ub3NwYWNlO1wiXG5cbiAgZGV0ZWN0OiAtPlxuICAgIGlmICgoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCkgPiAxMDApIHx8ICgod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCkgPiAxMDApKVxuICAgICAgQGxsYygpXG4gICAgICBjbGVhckludGVydmFsIEBjb25zb2xlXG5cbl8uaSgpXG4iLCJcbkJsdXJsb2FkID0gXG5cbiAgaTogLT5cblxuICAgICQoJy50aWxlcyA+IC50aWxlID4gLmltYWdlLm9mZicpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgc3JjID0gJChlbCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykucmVwbGFjZSgvdXJsXFwoXCI/KC4qPylcIj9cXCkvLCBcIiQxXCIpXG4gICAgICBpbWFnZSA9IG5ldyBJbWFnZSgpXG4gICAgICBpbWFnZS5zcmMgPSBzcmNcbiAgICAgIGltYWdlLm9ubG9hZCA9IC0+XG4gICAgICAgIF8ub24gZWxcblxuIiwiY29uZmlnID0ge1wiY29sb3JcIjp7XCJ3aGl0ZTFcIjpcIiNmZmZmZmZcIixcImJsYWNrMVwiOlwiIzAwMDAwMFwiLFwiZ29sZDFcIjpcIiNhZDk4NmVcIixcImJsdWUxXCI6XCIjNDY1MDYyXCIsXCJncmV5MVwiOlwiI2FjYTM5YVwifSxcImZvbnRcIjp7XCJoMVwiOntcImZvbnQtZmFtaWx5XCI6XCJlbmdyYXZlcnMgcmVndWxhclwiLFwiZm9udC1zaXplXCI6XCI0MHB4XCJ9LFwiaDJcIjp7XCJmb250LWZhbWlseVwiOlwiY2hyb25pY2xlIHJvbWFuXCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiM3B4XCIsXCJmb250LXNpemVcIjpcIjIwcHhcIn0sXCJoM1wiOntcImZvbnQtZmFtaWx5XCI6XCJjaHJvbmljbGUgcm9tYW5cIixcImxldHRlci1zcGFjaW5nXCI6XCIycHhcIixcImZvbnQtc2l6ZVwiOlwiMTVweFwifSxcImg0XCI6e1wiZm9udC1mYW1pbHlcIjpcInJldmlzdGEgc3RlbmNpbHJlZ3VsYXJcIixcImZvbnQtc2l6ZVwiOlwiNDBweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwifSxcImg1XCI6e1wiZm9udC1mYW1pbHlcIjpcImNocm9uaWNsZSByb21hblwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjNweFwiLFwiZm9udC1zaXplXCI6XCIyMHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMzJweFwifSxcImNvcHkxXCI6e1wiZm9udC1mYW1pbHlcIjpcImNocm9uaWNsZSByb21hblwiLFwiZm9udC1zaXplXCI6XCIxNnB4XCJ9LFwiY29weTJcIjp7XCJmb250LWZhbWlseVwiOlwiY2hyb25pY2xlIHJvbWFuXCIsXCJmb250LXNpemVcIjpcIjEycHhcIixcImxldHRlci1zcGFjaW5nXCI6XCIycHhcIn0sXCJjb3B5MnNcIjp7XCJmb250LWZhbWlseVwiOlwiY2hyb25pY2xlIHJvbWFuXCIsXCJmb250LXNpemVcIjpcIjhweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwifSxcImNvcHkzXCI6e1wiZm9udC1mYW1pbHlcIjpcImVuZ3JhdmVycyByZWd1bGFyXCIsXCJmb250LXNpemVcIjpcIjExcHhcIixcImxldHRlci1zcGFjaW5nXCI6XCIycHhcIixcImxpbmUtaGVpZ2h0XCI6XCIxOXB4XCJ9LFwiY29weTRcIjp7XCJmb250LWZhbWlseVwiOlwiZW5ncmF2ZXJzIHJlZ3VsYXJcIixcImZvbnQtc2l6ZVwiOlwiMTBweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwiLFwibGluZS1oZWlnaHRcIjpcIjEycHhcIn19LFwibWV0YVwiOntcInRpdGxlXCI6XCJEZXNpZ25zYWtlIFN0dWRpb1wiLFwidXJsXCI6XCJodHRwOi8vd3d3LmRlc2lnbnNha2VzdHVkaW8uY29tL1wiLFwiZGVzY3JpcHRpb25cIjpcIkJvdXRpcXVlIGRlc2lnbiBzdHVkaW8gdGhhdCBzcGVjaWFsaXplcyBpbiBicmFuZGluZywgcGFja2FnaW5nLCB3ZWIgZGVzaWduLCBhbmQgZGV2ZWxvcG1lbnRcIixcImtleXdvcmRzXCI6XCJkZXNpZ24sIGdyYXBoaWMgZGVzaWduLCBicmFuZGluZywgcGFja2FnaW5nLCB3ZWIgZGVzaWduLCB3ZWIgZGV2ZWxvcG1lbnQsIGFydCBkaXJlY3Rpb24sIGRlc2lnbnNha2UsXCIsXCJpbWFnZVwiOlwiaW1nL3NoYXJlLmpwZ1wiLFwicmVwb1wiOlwiaHR0cHM6Ly9naXRodWIuY29tL2FjaWRqYXp6L3Nha2UyXCIsXCJnbWFwXCI6XCJodHRwczovL2dvby5nbC9tYXBzL1NWM3J4RGlab0YyMlwifSxcInNvY2lhbFwiOntcImluc3RhZ3JhbVwiOlwiaHR0cDovL3d3dy5pbnN0YWdyYW0uY29tL2Rlc2lnbnNha2VzdHVkaW9cIixcImZhY2Vib29rXCI6XCJodHRwOi8vd3d3LmZhY2Vib29rLmNvbS9kZXNpZ25zYWtlc3R1ZGlvXCIsXCJwaW50ZXJlc3RcIjpcImh0dHA6Ly93d3cucGludGVyZXN0LmNvbS9kZXNpZ25zYWtlc2ZcIixcImRyaWJiYmxlXCI6XCJodHRwczovL2RyaWJiYmxlLmNvbS9kZXNpZ25zYWtlc3R1ZGlvXCIsXCJiZWhhbmNlXCI6XCJodHRwczovL3d3dy5iZWhhbmNlLm5ldC9kZXNpZ25zYWtlc3R1ZGlvXCIsXCJtYWlsXCI6XCJpbmZvQGRlc2lnbnNha2VzdHVkaW8uY29tXCIsXCJtYXBcIjpcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9wbGFjZS9EZXNpZ25zYWtlK1N0dWRpby9AMzcuNzY2NDYxNiwtMTIyLjQwNTY5OTQsMTd6L2RhdGE9ITNtMSE0YjEhNG01ITNtNCExczB4ODA4ZjdlMzI5MjcwZjdhZjoweGFiMDI3YjZkYzY2ZmFlNmMhOG0yITNkMzcuNzY2NDYxNiE0ZC0xMjIuNDAzNTEwN1wiLFwicGhvbmVcIjo0MTU1MDkzNTA4fSxcIndvcmtcIjp7XCJiZW5lZml0Y29zbWV0aWNzXCI6e1wiZm9sZGVyXCI6XCJiZW5lZml0Y29zbWV0aWNzXCIsXCJ0aXRsZVwiOlwiYmVuZWZpdCBjb3NtZXRpY3NcIixcImRlc2NyaXB0aW9uXCI6W1wiQmVuZWZpdCBDb3NtZXRpY3MgaGFzIGNvaW5lZCB0aGUgYm9sZCBhbmQgZ2lybHkgcGVyc29uYSBpbiB0aGUgY29zbWV0aWNzIGluZHVzdHJ5LiBBZnRlciAzMCBwbHVzIHllYXJzIG9mIGJ1c2luZXNzLCBCZW5lZml0IGRldmVsb3BlZCBhIHJpY2ggdmlzdWFsIGhpc3RvcnkgdGhhdCBjb250aW51ZXMgdG8gc2hhcGUgdGhlIGNvbXBhbnkncyBpZGVudGl0eSBhbmQgaW1wYWN0cyB0aGUgYmVhdXR5IGluZHVzdHJ5IGFyb3VuZCB0aGUgd29ybGQuXCIsXCJBcyBhIGJyYW5kLCBCZW5lZml0IGNvbnRpbnVlcyB0byBleHBlcmltZW50IHdpdGggY29sb3IsIHBhdHRlcm5zLCBhbmQgdHlwZSBldmVyeXdoZXJlIHBvc3NpYmxlLCB3aGV0aGVyIGl0IGJlIGluIHByb2R1Y3QgcGFja2FnaW5nIG9yIHJldGFpbCBzcGFjZXMsIGFsbCB0aGUgd2hpbGUgc3RheWluZyB0cnVlIHRvIGl0cyB1bmlxdWUgRE5BLiBGZWF0dXJlZCBoZXJlIGFyZSBzYW1wbGVzIG9mIHByb2R1Y3QgcGFja2FnaW5nIGFuZCBtYXJrZXRpbmcgY29sbGF0ZXJhbCB3ZSBjcmVhdGVkIGZvciB0aGUgY29tcGFueS5cIl0sXCJzZXJ2aWNlc1wiOltcInByaW50XCIsXCJwYWNrYWdpbmdcIl0sXCJwcmV2XCI6e1wibmFtZVwiOlwiZmpvcmRsaWZlXCIsXCJmb2xkZXJcIjpcImZqb3JkbGlmZVwifSxcIm5leHRcIjp7XCJuYW1lXCI6XCJ1cmJhbiBraXRjaGVuXCIsXCJmb2xkZXJcIjpcInVyYmFua2l0Y2hlblwifSxcInRpbGVzXCI6W3tcImltYWdlXCI6XCJCZW5lZml0XzEwNzl4NTUwcHhfMS5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjU1MCxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQmVuZWZpdF81Mjd4OTMwcHhfNC5qcGdcIixcInJpZ2h0XCI6dHJ1ZSxcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6OTMwfSx7XCJpbWFnZVwiOlwiQmVuZWZpdF81MjB4MzY2cHhfMi5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6MzY2LFwic3RhY2tcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQmVuZWZpdF81MjB4NTMycHhfMy5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6NTMyfSx7XCJpbWFnZVwiOlwiQmVuZWZpdF8xMDc5eDYzNHB4XzUuanBnXCIsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo2MzQsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJlbmVmaXRfNTIweDQ1NXB4XzYuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjQ1NSxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQmVuZWZpdF81Mjd4NDU1cHhfNy5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6NDU1fV19LFwiYnJvd25cIjp7XCJmb2xkZXJcIjpcImJyb3duXCIsXCJ0aXRsZVwiOlwiYnJvd24gZXN0YXRlXCIsXCJkZXNjcmlwdGlvblwiOltcIk5lc3RsZWQgaW4gdGhlIGVhc3Rlcm4gaGlsbHMgb2YgTmFwYSBWYWxsZXksIHRoZSBCcm93biBmYW1pbHkgY29udGludWVzIHRvIHByb2R1Y2UgY2hhcmlzbWF0aWMgd2luZXMsIHRoZSB1bmNvbnZlbnRpb25hbCB3YXkuXCIsXCJXaGVuIGFza2VkIHRvIHJldml2ZSB0aGUgYnJhbmTigJlzIGV4aXN0aW5nIGlkZW50aXR5LCB3ZSBkZXNpZ25lZCBzZXZlcmFsIGNvbmNlcHRzIHRoYXQgc3BvdGxpZ2h0IHRoZSBtZWFuaW5nZnVsIHN0b3JpZXMgYmVoaW5kIHRoZSBlc3RhdGUgYW5kIGl0cyBzeW1iaW90aWMgcmVsYXRpb25zaGlwIHRvIG1vdGhlciBuYXR1cmUuIFN1biBkcmVuY2hlZCBpbWFnZXJ5IGRlZmluZXMgYSByaWNoIHNlbnNlIG9mIHBsYWNlLCBteXN0ZXJpb3VzIGlsbHVzdHJhdGlvbnMgZGVwaWN0IEphbWFpY2FuIGZvbGtsb3JlLCBhbmQgY2xhc3NpYyB0eXBvZ3JhcGh5IHNwZWxscyBvdXQgcXVvdGVzIHRoYXQgdW52ZWlsIGEgdHJ1ZSBzZW5zZSBvZiBjaGFyYWN0ZXIuXCJdLFwic2VydmljZXNcIjpbXCJzdHJhdGVneVwiLFwiYnJhbmQgaWRlbnRpdHkgY29uY2VwdHNcIixcInByaW50IGNvbmNlcHRzXCIsXCJhcnQgZGlyZWN0aW9uXCJdLFwicHJldlwiOntcIm5hbWVcIjpcInN1bWlcIixcImZvbGRlclwiOlwic3VtaVwifSxcIm5leHRcIjp7XCJuYW1lXCI6XCJ2aWUgaGVhbGluZ1wiLFwiZm9sZGVyXCI6XCJ2aWVcIn0sXCJ0aWxlc1wiOlt7XCJpbWFnZVwiOlwiQnJvd25fMTA3OXg3MjVweF8xLmpwZ1wiLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NzI1LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJCcm93bl81MjB4NzYycHhfMi5qcGdcIixcImxlZnRcIjp0cnVlLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjo3NjJ9LHtcImltYWdlXCI6XCJCcm93bl81Mjd4MzY1cHhfMy5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6MzY1LFwic3RhY2tcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fNTI3eDM2NXB4XzQuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjM2NX0se1wiaW1hZ2VcIjpcIkJyb3duXzEwNzl4NjI1cHhfNS5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjYyNSxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fMzM5eDUzMHB4XzYuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6NTMwfSx7XCJpbWFnZVwiOlwiQnJvd25fMzM5eDUzMHB4XzcuanBnXCIsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjUzMCxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fMzM5eDUzMHB4XzguanBnXCIsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjUzMH0se1wiaW1hZ2VcIjpcIkJyb3duXzcwN3g3MDBweF8xMS5qcGdcIixcIndpZHRoXCI6NzA3LFwiaGVpZ2h0XCI6NzAwLFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fMzM5eDIyOXB4XzkuanBnXCIsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjIyOSxcInN0YWNrXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJyb3duXzY3OHg5MDBweF8xMC5qcGdcIixcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6NDM5LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJCcm93bl8xMDc5eDYyNXB4XzEyLmpwZ1wiLFwiZnVsbFwiOnRydWUsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo2MjV9LHtcImltYWdlXCI6XCJCcm93bl81MjB4NzYycHhfMTMuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjc2MixcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fNTI3eDM2NXB4XzE0LmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjozNjUsXCJzdGFja1wiOnRydWV9LHtcImltYWdlXCI6XCJCcm93bl81Mjd4MzY1cHhfMTUuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjM2NX1dfSxcImVsZGVzdGlsYWRvXCI6e1wiZm9sZGVyXCI6XCJlbGRlc3RpbGFkb1wiLFwidGl0bGVcIjpcImVsIGRlc3RpbGFkb1wiLFwiZGVzY3JpcHRpb25cIjpbXCJUaGUgYmVzdC1rZXB0IHNlY3JldCBhbW9uZ3N0IGxvY2FscyBhbmQgbWV6Y2FsIHNlZWtpbmcgYWZpY2lvbmFkb3MsIEVsIERlc3RpbGFkbyBpcyBhIE9heGFjYSBiYXNlZCBzcGVha2Vhc3kgYW5kIG1lemNhbGVyaWEgYmxlbmRpbmcgdGhlIHRydWVzdCBmbGF2b3JzIG9mIE1leGljbyB3aXRoIHByb2dyZXNzaXZlIGdhc3Ryb25vbXkuXCIsXCJWaWJyYW50IGNvbG9ycyBhbmQgdGV4dHVyZXMgb2YgcGFwZXIgYW5kIHBhaW50IGltYnVlIHRoZSByZXN0YXVyYW50J3MgaWRlbnRpdHkgd2l0aCBhIHJpY2ggc2Vuc2Ugb2YgY3VsaW5hcnkgdHJhZGl0aW9ucyBhbmQgZmxhdm9ycy4gVGhlIGNvcHBlciBzdGlsbCBsb2dvLCBjYXN1YWwga3JhZnQtcGFwZXIgbWVudXMsIGFnYXZlIHN0YW1wZWQgY29hc3RlcnMsIGFuZCBwbGF5ZnVsIHZpbnRhZ2UgcG9zdGNhcmRzIHNlYXNvbiB0aGUgaW50aW1hdGUgc3BhY2UsIGludml0aW5nIGxvY2FscyBhbmQgdmlzaXRvcnMgYWxpa2UgdG8gcGFydGFrZSBpbiBhbiBhdXRoZW50aWMgZm9vZCBleHBlcmllbmNlLiA8YSBocmVmPVxcXCJodHRwOi8vd3d3LmVsZGVzdGlsYWRvLmNvbS9cXFwiPnd3dy5lbGRlc3RpbGFkby5jb208L2E+XCJdLFwic2VydmljZXNcIjpbXCJicmFuZCBpZGVudGl0eVwiLFwicHJpbnRcIixcIldlYiBEZXNpZ25cIl0sXCJwcmV2XCI6e1wibmFtZVwiOlwiRnVsbCBTdW5cIixcImZvbGRlclwiOlwiZnVsbHN1blwifSxcIm5leHRcIjp7XCJuYW1lXCI6XCJzdWZmZXJmZXN0IGJlZXIgY29cIixcImZvbGRlclwiOlwic3VmZmVyZmVzdFwifSxcInRpbGVzXCI6W3tcImltYWdlXCI6XCJFbERlc3RpbGFkb18xMDc2eDU1MHB4XzEuanBnXCIsXCJ3aWR0aFwiOjEwNzYsXCJoZWlnaHRcIjo1NTAsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzUyMHgzNjZweF8yLmpwZ1wiLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjozNjYsXCJzdGFja1wiOnRydWUsXCJsZWZUXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzUyN3g5MzBweF8zLmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjo5MzAsXCJyaWdodFwiOnRydWV9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb181MjB4NTMycHhfNC5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6NTMyfSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fMTA3Nng2MzRweF81LmpwZ1wiLFwid2lkdGhcIjoxMDc2LFwiaGVpZ2h0XCI6NjM0LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb181MjB4NDU1cHhfNi5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6NDU1LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb181Mjd4NDU1cHhfNy5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6NDU1fSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTIweDY0MXB4XzguanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcImNsZWFyXCI6dHJ1ZSxcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6NjQxfSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fMjQ3eDMwNHB4XzkuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcIndpZHRoXCI6MjQ3LFwiaGVpZ2h0XCI6MzA0fSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fMjQ3eDMwNHB4XzEwLmpwZ1wiLFwid2lkdGhcIjoyNDcsXCJoZWlnaHRcIjozMDR9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb181Mjh4MzA0cHhfMTEuanBnXCIsXCJ3aWR0aFwiOjUyOCxcImhlaWdodFwiOjMwNH0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzUyMHg0NDVweF8xMi5qcGdcIixcImxlZnRcIjp0cnVlLFwiY2xlYXJcIjp0cnVlLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjo0NDV9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb181Mjd4NDQ1cHhfMTMuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjQ0NX0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzEwNzZ4NTk2cHhfMTIuanBnXCIsXCJ3aWR0aFwiOjEwNzYsXCJoZWlnaHRcIjo1OTZ9XX0sXCJmam9yZGxpZmVcIjp7XCJmb2xkZXJcIjpcImZqb3JkbGlmZVwiLFwidGl0bGVcIjpcImZqb3JkbGlmZVwiLFwiZGVzY3JpcHRpb25cIjpbXCJBIHN1c3RhaW5hYmxlIHdvbWVuc3dlYXIgYnJhbmQgb3V0IHRvIGNsZWFuIHVwIHRoZSBmYXNoaW9uIGFuZCBiZWF1dHkgaW5kdXN0cnkuXCIsXCJUaGUgYnJhbmQgaWRlbnRpdHkgYW5kIGUtY29tbWVyY2Ugc2l0ZSByZWZsZWN0IHRoZSBvcmdhbmljIGxhbmRzY2FwZSBvZiBub3JkaWMgZmpvcmRzIHRocm91Z2ggYSBuYXR1cmFsIGNvbG9yIHBhbGV0dGUgYW5kIG1pbmltYWwgbGF5b3V0LiBNb2Rlcm4gYW5kIGdlb21ldHJpYyB0eXBvZ3JhcGh5IHByb3ZpZGUgYSBjbGVhbiBsYW5kc2NhcGUgZm9yIHBvcHMgb2YgaW1hZ2VyeSwgdHJhbnNwb3J0aW5nIHNob3BwZXJzIGJlaGluZCB0aGUgc2VhbXMgdG8gbWVldCB0aGUgcGVvcGxlIGFuZCBwbGFjZXMgd2hvIGFyZSBtYWtpbmcgYSBkaWZmZXJlbmNlLiA8YSBocmVmPVxcXCJodHRwczovL3d3dy5mam9yZGxpZmUuY2EvXFxcIj53d3cuZmpvcmRsaWZlLmNhPC9hPlwiXSxcInNlcnZpY2VzXCI6W1wiU3RyYXRlZ3lcIixcIkJyYW5kIElkZW50aXR5XCIsXCJQcmludFwiLFwiV2Vic2l0ZSBEZXNpZ24gKyBEZXZlbG9wbWVudFwiXSxcInByZXZcIjp7XCJuYW1lXCI6XCJ2aWUgaGVhbGluZ1wiLFwiZm9sZGVyXCI6XCJ2aWVcIn0sXCJuZXh0XCI6e1wibmFtZVwiOlwiYmVuZWZpdCBjb3NtZXRpY3MgXCIsXCJmb2xkZXJcIjpcImJlbmVmaXRjb3NtZXRpY3NcIn0sXCJ0aWxlc1wiOlt7XCJpbWFnZVwiOlwiRmpvcmRsaWZlXzEwNzl4Njc1cHhfMS5qcGdcIixcImZ1bGxcIjp0cnVlLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6Njc1fSx7XCJpbWFnZVwiOlwiRmpvcmRsaWZlXzU4OXg2MDBweF80LmpwZ1wiLFwicmlnaHRcIjp0cnVlLFwid2lkdGhcIjo1ODksXCJoZWlnaHRcIjo2MDB9LHtcImltYWdlXCI6XCJGam9yZGxpZmVfNDU2eDI4NHB4XzIuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcIndpZHRoXCI6NDU2LFwiaGVpZ2h0XCI6Mjg0fSx7XCJpbWFnZVwiOlwiRmpvcmRsaWZlXzQ1NngyODRweF8zLmpwZ1wiLFwid2lkdGhcIjo0NTYsXCJoZWlnaHRcIjoyODR9LHtcImltYWdlXCI6XCJGam9yZGxpZmVfMTA3OXg1MzZweF81LmpwZ1wiLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NTM2LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJGam9yZGxpZmVfNTg3eDkxOHB4XzguanBnXCIsXCJ3aWR0aFwiOjU4NyxcImhlaWdodFwiOjkxOCxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkZqb3JkbGlmZV80NTZ4NjQycHhfNi5qcGdcIixcIndpZHRoXCI6NDU2LFwiaGVpZ2h0XCI6NjQyLFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJGam9yZGxpZmVfNDU2eDI0M3B4XzcuanBnXCIsXCJ3aWR0aFwiOjQ1NixcImhlaWdodFwiOjI0M30se1wiaW1hZ2VcIjpcIkZqb3JkbGlmZV8xMDc5eDIwMzFweF85LmpwZ1wiLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6MjAzMSxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRmpvcmRsaWZlXzU4OXg2MDBweF8xMC5qcGdcIixcIndpZHRoXCI6NTg5LFwiaGVpZ2h0XCI6NjAwLFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJGam9yZGxpZmVfNDU2eDU5OXB4XzExLmpwZ1wiLFwid2lkdGhcIjo0NTYsXCJoZWlnaHRcIjo1OTl9XX0sXCJmdWxsc3VuXCI6e1wiZm9sZGVyXCI6XCJmdWxsc3VuXCIsXCJ0aXRsZVwiOlwiZnVsbCBzdW5cIixcImRlc2NyaXB0aW9uXCI6W1wiSW5zcGlyZWQgYnkgQ2FsaWZvcm5pYeKAmXMgd2FybSBhbmQgaW52aWdvcmF0aW5nIHN1bnNoaW5lLCBGdWxsIFN1biBpcyBhIDEwMCUgYWxsLW5hdHVyYWwsIHN1c3RhaW5hYmx5IGZhcm1lZCBjYW5uYWJpcy4gUHJvdWRseSByYWlzZWQgdW5kZXIgdGhlIHN1bmJlbHQgb2YgSHVtYm9sZHQgQ291bnR5LCB0aGlzIGJyYW5k4oCZcyBwcm9kdWN0IGxpbmUgaXMgYSByZXN1bHQgb2YgbWVsbG93IG9jZWFuIGJyZWV6ZXMsIHRvd2VyaW5nIFJlZHdvb2RzIGFuZCBzdW4tZHJlbmNoZWQgaGlsbHNpZGVzLCB5aWVsZGluZyBjYW5uYWJpcyBvZiB1bnBhcmFsbGVsZWQgcXVhbGl0eSwgdGFzdGUsIGFuZCBwZXJmb3JtYW5jZS5cIixcIldlIHNhdyBhbiBvcHBvcnR1bml0eSB0byBzaGFrZSB1cCB0aGUgZXZlci1ncm93aW5nIGNhbm5hYmlzIHNwYWNlIHdpdGggYSBmcmVzaCBhcHByb2FjaCBmdWxsIG9mIENhbGlmb3JuaWEgc291bC4gVGhlIHByb2R1Y3QgcGFja2FnaW5nIHBhaXJzIHJldHJvIHR5cG9ncmFwaHkgd2l0aCBicmlnaHQgY29sb3JzIGFuZCBtb2Rlcm4gZ2VvbWV0cmljIHBhdHRlcm5zLiBBIGJvbGQgZ3JhZGllbnQgaW5zcGlyZWQgYnkgbmF0dXJl4oCZcyBza2llcyBhbmQgc3BsYXNoZXMgb2YgZ29sZCBmb2lsIGFkZCBhIGJ1cnN0IG9mIHByZW1pdW0gc2hpbmUuIDxhIGhyZWY9XFxcImh0dHBzOi8vd3d3LmZ1bGwtc3VuLmNvbVxcXCI+d3d3LmZ1bGwtc3VuLmNvbTwvYT5cIl0sXCJzZXJ2aWNlc1wiOltcImJyYW5kIGlkZW50aXR5XCIsXCJwYWNrYWdpbmdcIixcImNvcHl3cml0aW5nXCIsXCJ3ZWIgZGVzaWduICsgZGV2ZWxvcG1lbnRcIixcIk1vYmlsZSBBcHBzXCJdLFwibmV4dFwiOntcIm5hbWVcIjpcIkVsIERlc3RpbGFkb1wiLFwiZm9sZGVyXCI6XCJlbGRlc3RpbGFkb1wifSxcInRpbGVzXCI6W3tcImltYWdlXCI6XCJGdWxsU3VuXzY4NHg1MjVweF8xLmpwZ1wiLFwid2lkdGhcIjo2ODQsXCJoZWlnaHRcIjo1MjUsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkZ1bGxTdW5fMzY0eDUyNXB4XzIuanBnXCIsXCJ3aWR0aFwiOjM2NCxcImhlaWdodFwiOjUyNX0se1wiaW1hZ2VcIjpcIkZ1bGxTdW5fMTA3OHg1MzdweF8zLmpwZ1wiLFwid2lkdGhcIjoxMDc4LFwiaGVpZ2h0XCI6NTM3LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJGdWxsU3VuXzUxMng0NTNweF80LmpwZ1wiLFwibGVmdFwiOnRydWUsXCJ3aWR0aFwiOjUxMixcImhlaWdodFwiOjQ1M30se1wiaW1hZ2VcIjpcIkZ1bGxTdW5fNTM2eDQ1M3B4XzUuanBnXCIsXCJ3aWR0aFwiOjUzNSxcImhlaWdodFwiOjQ1M30se1wiaW1hZ2VcIjpcIkZ1bGxTdW5fMTA3OHg1MzdweF82LmpwZ1wiLFwiZnVsbFwiOnRydWUsXCJ3aWR0aFwiOjEwNzgsXCJoZWlnaHRcIjo1Mzd9LHtcImltYWdlXCI6XCJGdWxsU3VuXzUxMng0NTNweF83LmpwZ1wiLFwibGVmdFwiOnRydWUsXCJ3aWR0aFwiOjUxMixcImhlaWdodFwiOjQ1M30se1wiaW1hZ2VcIjpcIkZ1bGxTdW5fNTM2eDIwOHB4XzguanBnXCIsXCJ3aWR0aFwiOjUzNixcImhlaWdodFwiOjIwOCxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRnVsbFN1bl81MzZ4MjA4cHhfOS5qcGdcIixcIndpZHRoXCI6NTM2LFwiaGVpZ2h0XCI6MjA4fV19LFwic3VmZmVyZmVzdFwiOntcImZvbGRlclwiOlwic3VmZmVyZmVzdFwiLFwidGl0bGVcIjpcInN1ZmZlcmZlc3RcIixcImRlc2NyaXB0aW9uXCI6W1wiU3VmZmVyZmVzdCBCZWVyIENvbXBhbnkgd2FzIGJvcm4gb3V0IG9mIGEgbmVlZCB0byBwcm92aWRlIGEgZ2x1dGVuLXJlbW92ZWQgYmVlciB0aGF0IGRvZXNu4oCZdCBjb21wcm9taXNlIG9uIHRhc3RlIG9yIHF1YWxpdHkuXCIsXCJXZSBwYXJ0bmVyZWQgd2l0aCBTdWZmZXJmZXN0IHRvIGRlc2lnbiBhIGJlZXIgdGhhdCBjZWxlYnJhdGVzIHRoZSBjb21wYW554oCZcyBtYW50cmE6IOKAnG1lZGFscyBmb3IgYSBqb2Igd2VsbCBkb25lLuKAnSBUaGUgdmljdG9yaW91cyBmaXN0IGljb24gY29tbXVuaWNhdGVzIHRoZSBicmFuZOKAmXMgYWJpbGl0eSB0byBvdmVyY29tZSB0aGUgbGltaXRhdGlvbnMgb2YgdXNpbmcgYmFybGV5IGluIGEgZ2x1dGVuLWZyZWUgYmVlci4gQ3Jpc3Agd2hpdGUgY2FucyBmZWF0dXJpbmcgYSBsaW5lIG9mIGRpc3Rpbmd1aXNoZWQgY29sb3IgcmliYm9ucyBhbmQgYm9sZCB0eXBvZ3JhcGh5IGNyZWF0ZSBhIHdpbm5pbmcgY29tYmluYXRpb24uXCJdLFwic2VydmljZXNcIjpbXCJicmFuZCBpZGVudGl0eVwiLFwic3RyYXRlZ3lcIixcInBhY2thZ2luZ1wiLFwicHJpbnRcIl0sXCJwcmV2XCI6e1wibmFtZVwiOlwiRWwgRGVzdGlsYWRvXCIsXCJmb2xkZXJcIjpcImVsZGVzdGlsYWRvXCJ9LFwibmV4dFwiOntcIm5hbWVcIjpcInN1bWlcIixcImZvbGRlclwiOlwic3VtaVwifSxcInRpbGVzXCI6W3tcImltYWdlXCI6XCJTdWZmZXJmZXN0XzY4NHg1MjVweF8xLmpwZ1wiLFwid2lkdGhcIjo2ODQsXCJoZWlnaHRcIjo1MjUsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfMzY0eDUyNXB4XzIuanBnXCIsXCJ3aWR0aFwiOjM2NCxcImhlaWdodFwiOjUyNX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfNTIweDM2NnB4XzMuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjM2NixcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF81Mjh4MzY2cHhfNC5qcGdcIixcIndpZHRoXCI6NTI4LFwiaGVpZ2h0XCI6MzY2LFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF8zMzl4NTMwcHhfNS5qcGdcIixcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6NTMwLFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJTdWZmZXJmZXN0XzMzOXg1MzBweF82LmpwZ1wiLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjo1MzAsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfMzM5eDUzMHB4XzcuanBnXCIsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjUzMH0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfMTA3Mng2MzBweF84LmpwZ1wiLFwid2lkdGhcIjoxMDcyLFwiaGVpZ2h0XCI6NjMwLFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJTdWZmZXJmZXN0XzUxOXg0NTdweF85LmpwZ1wiLFwid2lkdGhcIjo1MTksXCJoZWlnaHRcIjo0NTcsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfNTI2eDIwN3B4XzEwLmpwZ1wiLFwid2lkdGhcIjo1MjYsXCJoZWlnaHRcIjoyMDcsXCJzdGFja1wiOnRydWV9LHtcImltYWdlXCI6XCJTdWZmZXJmZXN0XzUyNngyMDdweF8xMS5qcGdcIixcIndpZHRoXCI6NTI2LFwiaGVpZ2h0XCI6MjA3fV19LFwic3VtaVwiOntcImZvbGRlclwiOlwic3VtaVwiLFwidGl0bGVcIjpcInN1bWlcIixcImRlc2NyaXB0aW9uXCI6W1wiQSBjYXN1YWwtY2hpYyBraW1vbm8gY28uLCBTdW1pIGNyZWF0ZXMgYW5kIHByb2R1Y2VzIHNpbGsgYW5kIGNoYXJtZXVzZSBib3RhbmljYWwgcHJpbnQga2ltb25vcy4gRWFjaCByb2JlIGZlYXR1cmVzIGFuIG9yaWdpbmFsIHBhdHRlcm4sIGZpcnN0IHNrZXRjaGVkIGJ5IGhhbmQsIHRoZW4gc2F0dXJhdGVkIGluIHJpY2ggd2F0ZXJjb2xvcnMgdXNpbmcgYSB0cmFkaXRpb25hbCBzdW1pIHBhaW50YnJ1c2guXCIsXCJUaGUgY29tcGxldGUgcmVkZXNpZ24gb2YgdGhlIGJyYW5k4oCZcyB2aXN1YWwgaWRlbnRpdHkgc3lzdGVtIGJlZ2FuIHdpdGggYSBuZXcgbmFtZTogU1VNSS4gSW5zcGlyZWQgYnkgdGhlIHBhaW50YnJ1c2ggdXNlZCB0byBjcmVhdGUgZWFjaCBraW1vbm9zIGRlc2lnbnMsIHRoZSBuZXcgbmFtZSB1bnZlaWxzIGEgZGVlcGVyIGNvbm5lY3Rpb24gdG8gdGhlIHRyYWRpdGlvbnMgYmVoaW5kIENoaW5lc2UgYnJ1c2h3b3JrIGluIGNhbGxpZ3JhcGh5IGFuZCBwYWludGluZy4gTW9kZXJuIHR5cG9ncmFwaHkgY291cGxlZCB3aXRoIGV0aGVyZWFsIGZsb3JhbCBkZXNpZ25zIGFuZCBhIHNvZnQgY29sb3IgcGFsZXR0ZSwgdGhlIGJyYW5k4oCZcyBuZXcgaWRlbnRpdHkgaXMgdGFpbG9yZWQgdG8gdGhlIHRyYWRpdGlvbiBvZiB0aGVpciB0aW1lbGVzcyBraW1vbm9zLlwiXSxcInNlcnZpY2VzXCI6W1wic3RhdGVneVwiLFwibmFtaW5nXCIsXCJjb3B5d3JpdGluZ1wiLFwiYnJhbmQgaWRlbnRpdHlcIixcInByaW50XCJdLFwicHJldlwiOntcIm5hbWVcIjpcInN1ZmZlcmZlc3QgYmVlciBjb1wiLFwiZm9sZGVyXCI6XCJzdWZmZXJmZXN0XCJ9LFwibmV4dFwiOntcIm5hbWVcIjpcImJyb3duIGVzdGF0ZVwiLFwiZm9sZGVyXCI6XCJicm93blwifSxcInRpbGVzXCI6W3tcImltYWdlXCI6XCJTdW1pXzUyMHg3NjJweF8xLmpwZ1wiLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjo3NjIsXCJsZWZUXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfNTI3eDM2NXB4XzIuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjM2NSxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfNTI3eDM2NXB4XzMuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjM2NSxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfMTA3OXg2MjVweF80LmpwZ1wiLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NjI1LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJTdW1pXzcxMHg3MTBweF83LmpwZ1wiLFwid2lkdGhcIjo3MTAsXCJoZWlnaHRcIjo3MTAsXCJyaWdodFwiOnRydWV9LHtcImltYWdlXCI6XCJTdW1pXzMzOXgyMjlweF81LmpwZ1wiLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjoyMjksXCJzdGFja1wiOnRydWV9LHtcImltYWdlXCI6XCJTdW1pXzMzOXg0NTBweF82LmpwZ1wiLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjo0NTB9LHtcImltYWdlXCI6XCJTdW1pXzEwNzl4NjI1cHhfOC5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjYyNSxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV81MjB4NzYycHhfOS5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6NzYyLFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJTdW1pXzUyN3gzNjVweF8xMC5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6MzY1LFwic3RhY2tcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV81Mjd4MzY1cHhfMTEuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjM2NX0se1wiaW1hZ2VcIjpcIlN1bWlfNzEweDUzMHB4XzEyLmpwZ1wiLFwid2lkdGhcIjo3MTAsXCJoZWlnaHRcIjo1MzAsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfMzM5eDUzMHB4XzEzLmpwZ1wiLFwid2lkdGhcIjozMzgsXCJoZWlnaHRcIjo1MzAsXCJyaWdodFwiOnRydWV9XX0sXCJ1cmJhbmtpdGNoZW5cIjp7XCJmb2xkZXJcIjpcInVyYmFua2l0Y2hlblwiLFwidGl0bGVcIjpcInVyYmFua2l0Y2hlblwiLFwiZGVzY3JpcHRpb25cIjpbXCJBIGNvbGxhYm9yYXRpdmUgY3VsaW5hcnkga2l0Y2hlbiB0ZWFjaGluZyBpdHMgbmVpZ2hib3JzIGZyb20gYXJvdW5kIExBIGhvdyB0byBzYXZvciB0aGUgbW9tZW50LlwiLFwiVGhlIHJlZGVzaWduIG9mIHRoZSBicmFuZOKAmXMgaWRlbnRpdHkgYmVnYW4gd2l0aCByZWNvbm5lY3RpbmcgdG8gdGhlIG93bmVy4oCZcyBJdGFsaWFuIHJvb3RzLiBWaWJyYW50IGJsdWVzIGFuZCByZWRzIG5vZCB0byB0aGUgYmFyb3F1ZSB0aWxlcyBhbmQgdGVycmFjb3R0YSB3YWxscyBmb3VuZCBpbiB0cmFkaXRpb25hbCBJdGFsaWFuIGtpdGNoZW5zLiBUaGUgbG9nb3R5cGUgaXMgaW5zcGlyZWQgYnkgMTkzMOKAmXMgdmludGFnZSBJdGFsaWFuIHBhc3RhIHBhY2thZ2luZy4gSW1hZ2VyeSBvZiB0aGUgc3BhY2UgYW5kIGNhbmRpZHMgb2YgdGhlIHBlb3BsZSB3aG8gZmlsbCBpdCBnYXJuaXNoIHRoZSBlY29tbWVyY2Ugc2l0ZSwgaWxsdW1pbmF0aW5nIHRoZSBlbW90aW9uYWwgYm9uZHMgY3JlYXRlZCBvdmVyIGZvb2QuPGEgaHJlZj1cXFwiaHR0cHM6Ly93d3cudXJiYW5raXRjaGVuLWxhLmNvbS9cXFwiPnd3dy51cmJhbmtpdGNoZW4tbGEuY29tPC9hPlwiXSxcInNlcnZpY2VzXCI6W1wic3RyYXRlZ3lcIixcImJyYW5kIGlkZW50aXR5XCIsXCJwcmludFwiLFwiV2Vic2l0ZSBEZXNpZ24gKyBEZXZlbG9wbWVudFwiLFwiUGhvdG9ncmFwaHlcIl0sXCJwcmV2XCI6e1wibmFtZVwiOlwiYmVuZWZpdCBjb3NtZXRpY3MgXCIsXCJmb2xkZXJcIjpcImJlbmVmaXRjb3NtZXRpY3NcIn0sXCJuZXh0XCI6e1wibmFtZVwiOlwiZnVsbCBzdW5cIixcImZvbGRlclwiOlwiZnVsbHN1blwifSxcInRpbGVzXCI6W3tcImltYWdlXCI6XCJVcmJhbl82ODR4NTI1cHhfMS5qcGdcIixcImxlZnRcIjp0cnVlLFwid2lkdGhcIjo2ODQsXCJoZWlnaHRcIjo1MjV9LHtcImltYWdlXCI6XCJVcmJhbl8zNjR4NTI1cHhfMi5qcGdcIixcIndpZHRoXCI6MzY0LFwiaGVpZ2h0XCI6NTI1fSx7XCJpbWFnZVwiOlwiVXJiYW5fMTA3OXg1MzdweF8zLmpwZ1wiLFwiZnVsbFwiOnRydWUsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo1Mzd9LHtcImltYWdlXCI6XCJVcmJhbl81MzR4NzM3cHhfNC5qcGdcIixcIndpZHRoXCI6NTM0LFwiaGVpZ2h0XCI6NzM3LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJVcmJhbl81MTd4MzU2cHhfNS5qcGdcIixcIndpZHRoXCI6NTE0LFwiaGVpZ2h0XCI6MzU2LFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVXJiYW5fNTE3eDM1MnB4XzYuanBnXCIsXCJ3aWR0aFwiOjUxNCxcImhlaWdodFwiOjM1MixcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlVyYmFuXzEwNzl4NjU1cHhfNy5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjY1NSxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVXJiYW5fNTA4eDY4OHB4XzguanBnXCIsXCJ3aWR0aFwiOjUwOCxcImhlaWdodFwiOjY4OCxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVXJiYV81NDN4Njg4cHhfOS5qcGdcIixcIndpZHRoXCI6NTQwLFwiaGVpZ2h0XCI6Njg4LFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVXJiYW5fMzcweDUyNXB4XzEwLmpwZ1wiLFwid2lkdGhcIjozNzAsXCJoZWlnaHRcIjo1MjUsXCJsZWZ0XCI6dHJ1ZSxcImNsZWFyXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlVyYmFuXzY4MXg1MjVweF8xMS5qcGdcIixcIndpZHRoXCI6Njc4LFwiaGVpZ2h0XCI6NTI1fSx7XCJpbWFnZVwiOlwiVXJiYW5fMTA3OXg1MzdweF8xMi5qcGdcIixcImZ1bGxcIjp0cnVlLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NTM3fV19LFwidmllXCI6e1wiZm9sZGVyXCI6XCJ2aWVcIixcInRpdGxlXCI6XCJ2aWUgaGVhbGluZ1wiLFwiZGVzY3JpcHRpb25cIjpbXCJBIGhvbGlzdGljIGhlYWxpbmcgYXBwcm9hY2ggdGhhdCBicmluZ3MgaGFybW9ueSB0byB0aGUgbWluZCwgYm9keSwgYW5kIHNwaXJpdC5cIixcIlRoZSBpZGVudGl0eSBhbmQgcGFja2FnaW5nIGRyYXdzIG9uIG9yZ2FuaWMgY29sb3JzIGFuZCB0ZXh0dXJlcyBmb3VuZCBpbiBsb29zZSBsZWFmIHRlYXMgYW5kIGhlcmJhbCBzdXBwbGVtZW50cy4gQm9sZCB0eXBvZ3JhcGh5LCB0b25lIG9uIHRvbmUgbGF5ZXJpbmcsIGFuZCBkZWxpY2F0ZSBsaW5lcyBvZiBnb2xkIGZvaWwgZXZva2UgYSBuZXcgc29waGlzdGljYXRpb24gdG8gaG9tZSByZW1lZGllcyBmb3IgZXZlcnlkYXkgaGVhbGluZy4gPGEgaHJlZj1cXFwiaHR0cHM6Ly93d3cudmllaGVhbGluZy5jb20vXFxcIj53d3cudmllaGVhbGluZy5jb208L2E+XCJdLFwic2VydmljZXNcIjpbXCJzdHJhdGVneVwiLFwiYnJhbmQgaWRlbnRpdHlcIixcInBhY2thZ2luZ1wiLFwicHJpbnRcIixcInByb2R1Y3QgZGV2ZWxvcG1lbnRcIixcIldlYnNpdGUgRGVzaWduICsgRGV2ZWxvcG1lbnRcIixcIlBob3RvZ3JhcGh5XCJdLFwicHJldlwiOntcIm5hbWVcIjpcImJyb3duIGVzdGF0ZVwiLFwiZm9sZGVyXCI6XCJicm93blwifSxcIm5leHRcIjp7XCJuYW1lXCI6XCJmam9yZGxpZmVcIixcImZvbGRlclwiOlwiZmpvcmRsaWZlXCJ9LFwidGlsZXNcIjpbe1wiaW1hZ2VcIjpcIlZpZV8xMDc5eDUzN3B4XzEuanBnXCIsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo1MzcsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlZpZV82ODR4NTI1cHhfMi5qcGdcIixcIndpZHRoXCI6Njg0LFwiaGVpZ2h0XCI6NTI1LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJWaWVfMzY0eDUyNXB4XzMuanBnXCIsXCJ3aWR0aFwiOjM2NCxcImhlaWdodFwiOjUyNX0se1wiaW1hZ2VcIjpcIlZpZV81MTJ4NDUzcHhfNC5qcGdcIixcImxlZnRcIjp0cnVlLFwid2lkdGhcIjo1MTIsXCJoZWlnaHRcIjo0NTN9LHtcImltYWdlXCI6XCJWaWVfNTM2eDQ1M3B4XzUuanBnXCIsXCJ3aWR0aFwiOjUzNixcImhlaWdodFwiOjQ1M30se1wiaW1hZ2VcIjpcIlZpZV8xMDc5eDUzN3B4XzYuanBnXCIsXCJmdWxsXCI6dHJ1ZSxcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjUzN30se1wiaW1hZ2VcIjpcIlZpZV82ODN4NjI2cHhfNy5qcGdcIixcIndpZHRoXCI6NjgzLFwiaGVpZ2h0XCI6NjI2fSx7XCJpbWFnZVwiOlwiVmllXzM2NngyMDhweF84LmpwZ1wiLFwid2lkdGhcIjozNjYsXCJoZWlnaHRcIjoyMDgsXCJyaWdodFwiOnRydWV9LHtcImltYWdlXCI6XCJWaWVfMzY2eDM4N3B4XzkuanBnXCIsXCJ3aWR0aFwiOjM2NixcImhlaWdodFwiOjM4NyxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlZpZV8zNjR4NTI1cHhfMTAuanBnXCIsXCJ3aWR0aFwiOjM2NCxcImhlaWdodFwiOjUyNSxcImNsZWFyXCI6dHJ1ZSxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVmllXzY4NHg1MjVweF8xMS5qcGdcIixcIndpZHRoXCI6Njg0LFwiaGVpZ2h0XCI6NTI1LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJWaWVfMTA3OXg1MzdweF8xMi5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjUzNyxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVmllXzM2NHg2MjZweF8xMy5qcGdcIixcIndpZHRoXCI6MzY0LFwiaGVpZ2h0XCI6NjI2LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJWaWVfNjg1eDYyNnB4XzE0LmpwZ1wiLFwid2lkdGhcIjo2ODQsXCJoZWlnaHRcIjo2MjYsXCJyaWdodFwiOnRydWV9XX19fTsiLCJJbmRleCA9XG5cbiAgaTogLT5cbiAgICBCbHVybG9hZC5pKClcblxuICAgIEBoYW5kbGVycygpXG5cbiAgaGFuZGxlcnM6IC0+XG5cbiAgICAkKCcuYnVyZ2VyJykuY2xpY2sgQG1vYmlsZVxuXG5cbiAgbW9iaWxlOiAtPlxuXG4gICAgXy5zd2FwICcuYnVyZ2VyJ1xuICAgIF8uc3dhcCAnLm1vYmlsZSdcbiJdfQ==
