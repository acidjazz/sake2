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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJibHVybG9hZC5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsQ0FBQTtFQUFBOzs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUNULEtBQUMsQ0FBQSxJQUFELENBQU0sRUFBTixFQUFVLFFBQVYsRUFBb0IsS0FBcEI7aUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQjtRQUZTO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFYLEVBR0UsQ0FBQyxDQUFDLE9BQUYsR0FBVSxJQUFWLEdBQWlCLEdBSG5CLEVBSEY7S0FBQSxNQUFBO01BU0UsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQixFQVRGOztFQUZHLENBcEJMO0VBbUNBLEVBQUEsRUFBSSxTQUFDLEVBQUQsRUFBSyxDQUFMO1dBQ0YsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsS0FBVixFQUFpQixJQUFqQjtFQURFLENBbkNKO0VBc0NBLElBQUEsRUFBTSxTQUFDLEVBQUQsRUFBSyxDQUFMO0lBRUosSUFBRyxDQUFBLENBQUEsRUFBQSxZQUFrQixNQUFsQixDQUFIO01BQ0UsRUFBQSxHQUFLLENBQUEsQ0FBRSxFQUFGLEVBRFA7O0lBR0EsSUFBRyxFQUFFLENBQUMsUUFBSCxDQUFZLEtBQVosQ0FBSDtNQUNFLElBQUMsQ0FBQSxFQUFELENBQUksRUFBSixFQUFRLENBQVIsRUFERjtLQUFBLE1BQUE7TUFHRSxJQUFDLENBQUEsR0FBRCxDQUFLLEVBQUwsRUFBUyxDQUFULEVBSEY7O0VBTEksQ0F0Q047RUFrREEsTUFBQSxFQUFRLFNBQUMsR0FBRDtBQUNOLFdBQU8sa0JBQUEsQ0FBbUIsR0FBbkIsQ0FDTCxDQUFDLE9BREksQ0FDSSxJQURKLEVBQ1UsS0FEVixDQUVMLENBQUMsT0FGSSxDQUVJLElBRkosRUFFVSxLQUZWLENBR0wsQ0FBQyxPQUhJLENBR0ksS0FISixFQUdXLEtBSFgsQ0FJTCxDQUFDLE9BSkksQ0FJSSxLQUpKLEVBSVcsS0FKWCxDQUtMLENBQUMsT0FMSSxDQUtJLEtBTEosRUFLVyxLQUxYLENBTUwsQ0FBQyxPQU5JLENBTUksTUFOSixFQU1ZLEdBTlo7RUFERCxDQWxEUjtFQTJEQSxDQUFBLEVBQUcsU0FBQyxRQUFELEVBQVcsTUFBWCxFQUFtQixLQUFuQixFQUEwQixLQUExQjtXQUNELElBQUksQ0FBQyxJQUFMLENBQVUsQ0FBQyxhQUFELEVBQWdCLFFBQWhCLEVBQTBCLE1BQTFCLEVBQWtDLEtBQWxDLEVBQXlDLEtBQXpDLENBQVY7RUFEQyxDQTNESDtFQThEQSxJQUFBLEVBQU0sU0FBQyxHQUFELEVBQU0sR0FBTjtBQUNKLFdBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFJLENBQUMsTUFBTCxDQUFBLENBQUEsR0FBZ0IsR0FBM0IsQ0FBQSxHQUFrQztFQURyQyxDQTlETjtFQWlFQSxLQUFBLEVBQU8sU0FBQyxLQUFELEVBQVEsR0FBUjtBQUNMLFFBQUE7SUFBQSxNQUFBLEdBQVM7QUFDVCxTQUFXLHFHQUFYO01BQ0UsTUFBTSxDQUFDLElBQVAsQ0FBWSxHQUFaO0FBREY7V0FFQTtFQUpLLENBakVQO0VBdUVBLEdBQUEsRUFBSyxTQUFDLFFBQUQsRUFBVyxTQUFYLEVBQXNCLFFBQXRCLEVBQWdDLFNBQWhDO0FBQ0gsUUFBQTtJQUFBLEtBQUEsR0FBUSxJQUFJLENBQUMsR0FBTCxDQUFTLFFBQUEsR0FBVyxRQUFwQixFQUE4QixTQUFBLEdBQVksU0FBMUM7V0FDUjtNQUFBLEtBQUEsRUFBTyxRQUFBLEdBQVMsS0FBaEI7TUFBdUIsTUFBQSxFQUFRLFNBQUEsR0FBVSxLQUF6Qzs7RUFGRyxDQXZFTDtFQTJFQSxPQUFBLEVBQVMsU0FBQyxHQUFEO0FBQ1AsUUFBQTtJQUFBLE1BQUEsR0FBUywyQ0FBMkMsQ0FBQyxJQUE1QyxDQUFpRCxHQUFqRDtXQUNUO01BQUEsQ0FBQSxFQUFHLFFBQUEsQ0FBUyxNQUFPLENBQUEsQ0FBQSxDQUFoQixFQUFvQixFQUFwQixDQUFIO01BQ0EsQ0FBQSxFQUFHLFFBQUEsQ0FBUyxNQUFPLENBQUEsQ0FBQSxDQUFoQixFQUFvQixFQUFwQixDQURIO01BRUEsQ0FBQSxFQUFHLFFBQUEsQ0FBUyxNQUFPLENBQUEsQ0FBQSxDQUFoQixFQUFvQixFQUFwQixDQUZIOztFQUZPLENBM0VUO0VBaUZBLElBQUEsRUFBTSxTQUFDLEdBQUQ7QUFDSixRQUFBO1dBQUE7O0FBQUM7V0FBQSxRQUFBOztxQkFBQTtBQUFBOztRQUFELENBQW9CLENBQUM7RUFEakIsQ0FqRk47RUFvRkEsSUFBQSxFQUFNLFNBQUMsTUFBRCxFQUFTLFFBQVQsRUFBbUIsUUFBbkI7QUFFSixRQUFBO0lBQUEsRUFBQSxHQUFLLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCO0lBQ0wsRUFBRSxDQUFDLElBQUgsR0FBVTtJQUNWLEVBQUUsQ0FBQyxHQUFILEdBQVM7SUFDVCxFQUFFLENBQUMsZ0JBQUgsQ0FBb0IsTUFBcEIsRUFBNkIsU0FBQyxDQUFEO01BQzNCLElBQWMsT0FBTyxRQUFQLEtBQW1CLFVBQWpDO1FBQUEsUUFBQSxDQUFBLEVBQUE7O01BQ0EsSUFBd0IsUUFBQSxLQUFjLE1BQWQsSUFBNEIsUUFBQSxLQUFjLEtBQWxFO2VBQUEsTUFBTyxDQUFBLFFBQUEsQ0FBUyxDQUFDLENBQWpCLENBQUEsRUFBQTs7SUFGMkIsQ0FBN0IsRUFHRSxLQUhGO1dBS0EsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFkLENBQTBCLEVBQTFCO0VBVkksQ0FwRk47RUFnR0EsS0FBQSxFQUFPLFNBQUE7V0FDTCxDQUFDLENBQUMsU0FBRixDQUNFO01BQUEsUUFBQSxFQUFVLE1BQVY7S0FERjtFQURLLENBaEdQO0VBb0dBLEtBQUEsRUFBTyxTQUFDLEdBQUQsRUFBTSxJQUFOO0FBRUwsUUFBQTtJQUFBLElBQUMsQ0FBQSxLQUFELENBQUE7SUFFQSxNQUFBLEdBQVMsQ0FBQyxDQUFDLElBQUYsQ0FDUDtNQUFBLEdBQUEsRUFBSyxHQUFMO01BQ0EsSUFBQSxFQUFNLElBRE47TUFFQSxJQUFBLEVBQU0sT0FGTjtLQURPO0lBS1QsTUFBTSxDQUFDLElBQVAsQ0FBWSxTQUFDLFFBQUQ7YUFDVixJQUFDLENBQUEsSUFBRCxDQUFNLFFBQU47SUFEVSxDQUFaO0FBR0EsV0FBTztFQVpGLENBcEdQO0VBa0hBLEdBQUEsRUFBSyxTQUFBO0FBRUgsUUFBQTtJQUZJO0lBRUosSUFBQyxDQUFBLEtBQUQsQ0FBQTtJQUVBLElBQUEsR0FBTyxDQUFDLENBQUMsR0FBRixVQUFNLElBQU47SUFFUCxJQUFJLENBQUMsSUFBTCxDQUFVLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxRQUFEO1FBQ1IsS0FBQyxDQUFBLElBQUQsQ0FBTSxRQUFOO2VBQ0EsSUFBSSxDQUFDLElBQUwsQ0FBVSxRQUFWO01BRlE7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVY7QUFJQSxXQUFPO0VBVkosQ0FsSEw7RUE4SEEsSUFBQSxFQUFNLFNBQUE7QUFFSixRQUFBO0lBRks7SUFFTCxLQUFBLEdBQVEsQ0FBQyxDQUFDLElBQUYsVUFBTyxJQUFQO0lBRVIsS0FBSyxDQUFDLElBQU4sQ0FBVyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsUUFBRDtRQUNULEtBQUMsQ0FBQSxJQUFELENBQU0sUUFBTjtlQUNBLEtBQUssQ0FBQyxJQUFOLENBQVcsUUFBWDtNQUZTO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFYO0FBSUEsV0FBTztFQVJILENBOUhOO0VBd0lBLElBQUEsRUFBTSxTQUFDLFFBQUQ7QUFFSixRQUFBO0lBQUEsS0FBQSw2RUFBdUMsQ0FBQSxDQUFBO0lBQ3ZDLElBQUcsS0FBQSxLQUFTLE1BQVo7QUFDRSxhQUFPLE1BQU0sQ0FBQyxDQUFQLENBQVMsUUFBUSxDQUFDLE1BQWxCLEVBQTBCLFFBQVEsQ0FBQyxVQUFuQyxFQURUOztJQUdBLEdBQUEsR0FBTSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWQsQ0FBb0IsMkJBQXBCO0lBQ04sSUFBRyxHQUFBLEtBQVMsSUFBWjtNQUNFLEtBQUssQ0FBQyxPQUFOLEdBQWdCLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZCxDQUFzQiwyQkFBdEIsRUFBbUQsRUFBbkQ7TUFDaEIsS0FBSyxDQUFDLElBQU4sR0FBYSxHQUFJLENBQUEsQ0FBQTtNQUNqQixLQUFLLENBQUMsSUFBTixHQUFhLEdBQUksQ0FBQSxDQUFBLEVBSG5COztJQUtBLElBQUEsR0FBTyxJQUFDLENBQUEsTUFBRCxDQUFRLEVBQUEsR0FBRyxLQUFLLENBQUMsSUFBakI7QUFFUCxZQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBbEI7QUFBQSxXQUNPLFFBRFA7UUFDcUIsTUFBQSxHQUFTO0FBQXZCO0FBRFAsV0FFTyxTQUZQO1FBRXNCLE1BQUEsR0FBUztBQUF4QjtBQUZQLFdBR08sT0FIUDtRQUdvQixNQUFBLEdBQVM7QUFBdEI7QUFIUCxXQUlPLFVBSlA7UUFJdUIsTUFBQSxHQUFTO0FBQXpCO0FBSlAsV0FLTyxVQUxQO1FBS3VCLE1BQUEsR0FBUztBQUxoQztJQU9BLElBQUcsS0FBSyxDQUFDLElBQU4sS0FBZ0IsSUFBbkI7TUFDRSxJQUFBLEdBQU8sT0FBQSxHQUNFLEtBQUssQ0FBQyxPQURSLEdBQ2dCLG9CQURoQixHQUVNLE1BRk4sR0FFZSxJQUZmLEdBRW9CLFFBRnBCLEdBRTRCLEtBQUssQ0FBQyxJQUZsQyxHQUV1QyxRQUZ2QyxHQUU4QyxLQUFLLENBQUMsSUFGcEQsR0FFeUQsR0FGekQsR0FFNEQsS0FBSyxDQUFDLElBRmxFLEdBRXVFLFdBSGhGO0tBQUEsTUFBQTtNQU1FLElBQUEsR0FBTyxLQUFLLENBQUMsUUFOZjs7V0FRQSxNQUFNLENBQUMsQ0FBUCxDQUFTLEtBQUssQ0FBQyxJQUFmLEVBQXFCLElBQXJCLEVBQTJCLENBQUMsSUFBRCxDQUEzQjtFQTdCSSxDQXhJTjtFQXVLQSxPQUFBLEVBQVMsU0FBQyxHQUFEO0FBQ1AsUUFBQTtJQUFBLEdBQUEsR0FBTTtBQUNOLFNBQUEsUUFBQTs7TUFDRSxJQUFHLE9BQU8sQ0FBUCxLQUFZLFVBQWY7UUFDRSxHQUFHLENBQUMsSUFBSixDQUFTLENBQVQsRUFERjs7QUFERjtBQUdBLFdBQU87RUFMQSxDQXZLVDtFQThLQSxHQUFBLEVBQUssU0FBQTtBQUNILFFBQUE7SUFBQSxLQUFBLEdBQVEsMmhDQUFBLEdBbUJELE1BQU0sQ0FBQyxJQUFJLENBQUM7V0FFbkIsT0FBTyxDQUFDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CLDZDQUFuQjtFQXRCRyxDQTlLTDtFQXNNQSxNQUFBLEVBQVEsU0FBQTtJQUNOLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLE1BQU0sQ0FBQyxXQUE3QixDQUFBLEdBQTRDLEdBQTdDLENBQUEsSUFBcUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFQLEdBQW9CLE1BQU0sQ0FBQyxVQUE1QixDQUFBLEdBQTBDLEdBQTNDLENBQXpEO01BQ0UsSUFBQyxDQUFBLEdBQUQsQ0FBQTthQUNBLGFBQUEsQ0FBYyxJQUFDLENBQUEsT0FBZixFQUZGOztFQURNLENBdE1SOzs7QUEyTUYsQ0FBQyxDQUFDLENBQUYsQ0FBQTs7QUM1TUEsSUFBQTs7QUFBQSxRQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUVELENBQUEsQ0FBRSw2QkFBRixDQUFnQyxDQUFDLElBQWpDLENBQXNDLFNBQUMsQ0FBRCxFQUFJLEVBQUo7QUFDcEMsVUFBQTtNQUFBLEdBQUEsR0FBTSxDQUFBLENBQUUsRUFBRixDQUFLLENBQUMsR0FBTixDQUFVLGtCQUFWLENBQTZCLENBQUMsT0FBOUIsQ0FBc0MsZ0JBQXRDLEVBQXdELElBQXhEO01BQ04sS0FBQSxHQUFRLElBQUksS0FBSixDQUFBO01BQ1IsS0FBSyxDQUFDLEdBQU4sR0FBWTthQUNaLEtBQUssQ0FBQyxNQUFOLEdBQWUsU0FBQTtlQUNiLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTDtNQURhO0lBSnFCLENBQXRDO0VBRkMsQ0FBSDs7O0FDSEYsSUFBQTs7QUFBQSxNQUFBLEdBQVM7RUFBQyxPQUFBLEVBQVE7SUFBQyxRQUFBLEVBQVMsU0FBVjtJQUFvQixRQUFBLEVBQVMsU0FBN0I7SUFBdUMsT0FBQSxFQUFRLFNBQS9DO0lBQXlELE9BQUEsRUFBUSxTQUFqRTtJQUEyRSxPQUFBLEVBQVEsU0FBbkY7R0FBVDtFQUF1RyxNQUFBLEVBQU87SUFBQyxJQUFBLEVBQUs7TUFBQyxhQUFBLEVBQWMsaUJBQWY7TUFBaUMsV0FBQSxFQUFZLE1BQTdDO0tBQU47SUFBMkQsSUFBQSxFQUFLO01BQUMsYUFBQSxFQUFjLGlCQUFmO01BQWlDLGdCQUFBLEVBQWlCLEtBQWxEO01BQXdELFdBQUEsRUFBWSxNQUFwRTtLQUFoRTtJQUE0SSxJQUFBLEVBQUs7TUFBQyxhQUFBLEVBQWMsaUJBQWY7TUFBaUMsZ0JBQUEsRUFBaUIsS0FBbEQ7TUFBd0QsV0FBQSxFQUFZLE1BQXBFO0tBQWpKO0lBQTZOLElBQUEsRUFBSztNQUFDLGFBQUEsRUFBYyx3QkFBZjtNQUF3QyxXQUFBLEVBQVksTUFBcEQ7TUFBMkQsZ0JBQUEsRUFBaUIsS0FBNUU7S0FBbE87SUFBcVQsSUFBQSxFQUFLO01BQUMsYUFBQSxFQUFjLGlCQUFmO01BQWlDLGdCQUFBLEVBQWlCLEtBQWxEO01BQXdELFdBQUEsRUFBWSxNQUFwRTtNQUEyRSxhQUFBLEVBQWMsTUFBekY7S0FBMVQ7SUFBMlosT0FBQSxFQUFRO01BQUMsYUFBQSxFQUFjLGlCQUFmO01BQWlDLFdBQUEsRUFBWSxNQUE3QztLQUFuYTtJQUF3ZCxPQUFBLEVBQVE7TUFBQyxhQUFBLEVBQWMsaUJBQWY7TUFBaUMsV0FBQSxFQUFZLE1BQTdDO01BQW9ELGdCQUFBLEVBQWlCLEtBQXJFO0tBQWhlO0lBQTRpQixRQUFBLEVBQVM7TUFBQyxhQUFBLEVBQWMsaUJBQWY7TUFBaUMsV0FBQSxFQUFZLEtBQTdDO01BQW1ELGdCQUFBLEVBQWlCLEtBQXBFO0tBQXJqQjtJQUFnb0IsT0FBQSxFQUFRO01BQUMsYUFBQSxFQUFjLG1CQUFmO01BQW1DLFdBQUEsRUFBWSxNQUEvQztNQUFzRCxnQkFBQSxFQUFpQixLQUF2RTtNQUE2RSxhQUFBLEVBQWMsTUFBM0Y7S0FBeG9CO0lBQTJ1QixPQUFBLEVBQVE7TUFBQyxhQUFBLEVBQWMsbUJBQWY7TUFBbUMsV0FBQSxFQUFZLE1BQS9DO01BQXNELGdCQUFBLEVBQWlCLEtBQXZFO01BQTZFLGFBQUEsRUFBYyxNQUEzRjtLQUFudkI7R0FBOUc7RUFBcThCLE1BQUEsRUFBTztJQUFDLE9BQUEsRUFBUSxtQkFBVDtJQUE2QixLQUFBLEVBQU0sa0NBQW5DO0lBQXNFLGFBQUEsRUFBYyw2RkFBcEY7SUFBa0wsVUFBQSxFQUFXLHNHQUE3TDtJQUFvUyxPQUFBLEVBQVEsZUFBNVM7SUFBNFQsTUFBQSxFQUFPLG1DQUFuVTtJQUF1VyxNQUFBLEVBQU8sa0NBQTlXO0dBQTU4QjtFQUE4MUMsUUFBQSxFQUFTO0lBQUMsV0FBQSxFQUFZLDJDQUFiO0lBQXlELFVBQUEsRUFBVywwQ0FBcEU7SUFBK0csV0FBQSxFQUFZLHVDQUEzSDtJQUFtSyxVQUFBLEVBQVcsdUNBQTlLO0lBQXNOLFNBQUEsRUFBVSwwQ0FBaE87SUFBMlEsTUFBQSxFQUFPLDJCQUFsUjtJQUE4UyxLQUFBLEVBQU0sZ0xBQXBUO0lBQXFlLE9BQUEsRUFBUSxVQUE3ZTtHQUF2MkM7RUFBZzJELE1BQUEsRUFBTztJQUFDLGtCQUFBLEVBQW1CO01BQUMsUUFBQSxFQUFTLGtCQUFWO01BQTZCLE9BQUEsRUFBUSxtQkFBckM7TUFBeUQsYUFBQSxFQUFjLENBQUMsOFBBQUQsRUFBZ1Esd1NBQWhRLENBQXZFO01BQWluQixVQUFBLEVBQVcsQ0FBQyxPQUFELEVBQVMsV0FBVCxDQUE1bkI7TUFBa3BCLE1BQUEsRUFBTztRQUFDLE1BQUEsRUFBTyxXQUFSO1FBQW9CLFFBQUEsRUFBUyxXQUE3QjtPQUF6cEI7TUFBbXNCLE1BQUEsRUFBTztRQUFDLE1BQUEsRUFBTyxlQUFSO1FBQXdCLFFBQUEsRUFBUyxjQUFqQztPQUExc0I7TUFBMnZCLE9BQUEsRUFBUTtRQUFDO1VBQUMsT0FBQSxFQUFRLDBCQUFUO1VBQW9DLE9BQUEsRUFBUSxJQUE1QztVQUFpRCxRQUFBLEVBQVMsR0FBMUQ7VUFBOEQsTUFBQSxFQUFPLElBQXJFO1NBQUQsRUFBNEU7VUFBQyxPQUFBLEVBQVEseUJBQVQ7VUFBbUMsT0FBQSxFQUFRLElBQTNDO1VBQWdELE9BQUEsRUFBUSxHQUF4RDtVQUE0RCxRQUFBLEVBQVMsR0FBckU7U0FBNUUsRUFBc0o7VUFBQyxPQUFBLEVBQVEseUJBQVQ7VUFBbUMsT0FBQSxFQUFRLEdBQTNDO1VBQStDLFFBQUEsRUFBUyxHQUF4RDtVQUE0RCxPQUFBLEVBQVEsSUFBcEU7U0FBdEosRUFBZ087VUFBQyxPQUFBLEVBQVEseUJBQVQ7VUFBbUMsT0FBQSxFQUFRLEdBQTNDO1VBQStDLFFBQUEsRUFBUyxHQUF4RDtTQUFoTyxFQUE2UjtVQUFDLE9BQUEsRUFBUSwwQkFBVDtVQUFvQyxPQUFBLEVBQVEsSUFBNUM7VUFBaUQsUUFBQSxFQUFTLEdBQTFEO1VBQThELE1BQUEsRUFBTyxJQUFyRTtTQUE3UixFQUF3VztVQUFDLE9BQUEsRUFBUSx5QkFBVDtVQUFtQyxPQUFBLEVBQVEsR0FBM0M7VUFBK0MsUUFBQSxFQUFTLEdBQXhEO1VBQTRELE1BQUEsRUFBTyxJQUFuRTtTQUF4VyxFQUFpYjtVQUFDLE9BQUEsRUFBUSx5QkFBVDtVQUFtQyxPQUFBLEVBQVEsR0FBM0M7VUFBK0MsUUFBQSxFQUFTLEdBQXhEO1NBQWpiO09BQW53QjtLQUFwQjtJQUF1d0MsT0FBQSxFQUFRO01BQUMsUUFBQSxFQUFTLE9BQVY7TUFBa0IsT0FBQSxFQUFRLGNBQTFCO01BQXlDLGFBQUEsRUFBYyxDQUFDLCtIQUFELEVBQWlJLGtYQUFqSSxDQUF2RDtNQUE0aUIsVUFBQSxFQUFXLENBQUMsVUFBRCxFQUFZLHlCQUFaLEVBQXNDLGdCQUF0QyxFQUF1RCxlQUF2RCxDQUF2akI7TUFBK25CLE1BQUEsRUFBTztRQUFDLE1BQUEsRUFBTyxNQUFSO1FBQWUsUUFBQSxFQUFTLE1BQXhCO09BQXRvQjtNQUFzcUIsTUFBQSxFQUFPO1FBQUMsTUFBQSxFQUFPLGFBQVI7UUFBc0IsUUFBQSxFQUFTLEtBQS9CO09BQTdxQjtNQUFtdEIsT0FBQSxFQUFRO1FBQUM7VUFBQyxPQUFBLEVBQVEsd0JBQVQ7VUFBa0MsT0FBQSxFQUFRLElBQTFDO1VBQStDLFFBQUEsRUFBUyxHQUF4RDtVQUE0RCxNQUFBLEVBQU8sSUFBbkU7U0FBRCxFQUEwRTtVQUFDLE9BQUEsRUFBUSx1QkFBVDtVQUFpQyxNQUFBLEVBQU8sSUFBeEM7VUFBNkMsT0FBQSxFQUFRLEdBQXJEO1VBQXlELFFBQUEsRUFBUyxHQUFsRTtTQUExRSxFQUFpSjtVQUFDLE9BQUEsRUFBUSx1QkFBVDtVQUFpQyxPQUFBLEVBQVEsR0FBekM7VUFBNkMsUUFBQSxFQUFTLEdBQXREO1VBQTBELE9BQUEsRUFBUSxJQUFsRTtTQUFqSixFQUF5TjtVQUFDLE9BQUEsRUFBUSx1QkFBVDtVQUFpQyxPQUFBLEVBQVEsR0FBekM7VUFBNkMsUUFBQSxFQUFTLEdBQXREO1NBQXpOLEVBQW9SO1VBQUMsT0FBQSxFQUFRLHdCQUFUO1VBQWtDLE9BQUEsRUFBUSxJQUExQztVQUErQyxRQUFBLEVBQVMsR0FBeEQ7VUFBNEQsTUFBQSxFQUFPLElBQW5FO1NBQXBSLEVBQTZWO1VBQUMsT0FBQSxFQUFRLHVCQUFUO1VBQWlDLE1BQUEsRUFBTyxJQUF4QztVQUE2QyxPQUFBLEVBQVEsR0FBckQ7VUFBeUQsUUFBQSxFQUFTLEdBQWxFO1NBQTdWLEVBQW9hO1VBQUMsT0FBQSxFQUFRLHVCQUFUO1VBQWlDLE9BQUEsRUFBUSxHQUF6QztVQUE2QyxRQUFBLEVBQVMsR0FBdEQ7VUFBMEQsTUFBQSxFQUFPLElBQWpFO1NBQXBhLEVBQTJlO1VBQUMsT0FBQSxFQUFRLHVCQUFUO1VBQWlDLE9BQUEsRUFBUSxHQUF6QztVQUE2QyxRQUFBLEVBQVMsR0FBdEQ7U0FBM2UsRUFBc2lCO1VBQUMsT0FBQSxFQUFRLHdCQUFUO1VBQWtDLE9BQUEsRUFBUSxHQUExQztVQUE4QyxRQUFBLEVBQVMsR0FBdkQ7VUFBMkQsT0FBQSxFQUFRLElBQW5FO1NBQXRpQixFQUErbUI7VUFBQyxPQUFBLEVBQVEsdUJBQVQ7VUFBaUMsT0FBQSxFQUFRLEdBQXpDO1VBQTZDLFFBQUEsRUFBUyxHQUF0RDtVQUEwRCxPQUFBLEVBQVEsSUFBbEU7U0FBL21CLEVBQXVyQjtVQUFDLE9BQUEsRUFBUSx3QkFBVDtVQUFrQyxPQUFBLEVBQVEsR0FBMUM7VUFBOEMsUUFBQSxFQUFTLEdBQXZEO1VBQTJELE1BQUEsRUFBTyxJQUFsRTtTQUF2ckIsRUFBK3ZCO1VBQUMsT0FBQSxFQUFRLHlCQUFUO1VBQW1DLE1BQUEsRUFBTyxJQUExQztVQUErQyxPQUFBLEVBQVEsSUFBdkQ7VUFBNEQsUUFBQSxFQUFTLEdBQXJFO1NBQS92QixFQUF5MEI7VUFBQyxPQUFBLEVBQVEsd0JBQVQ7VUFBa0MsT0FBQSxFQUFRLEdBQTFDO1VBQThDLFFBQUEsRUFBUyxHQUF2RDtVQUEyRCxNQUFBLEVBQU8sSUFBbEU7U0FBejBCLEVBQWk1QjtVQUFDLE9BQUEsRUFBUSx3QkFBVDtVQUFrQyxPQUFBLEVBQVEsR0FBMUM7VUFBOEMsUUFBQSxFQUFTLEdBQXZEO1VBQTJELE9BQUEsRUFBUSxJQUFuRTtTQUFqNUIsRUFBMDlCO1VBQUMsT0FBQSxFQUFRLHdCQUFUO1VBQWtDLE9BQUEsRUFBUSxHQUExQztVQUE4QyxRQUFBLEVBQVMsR0FBdkQ7U0FBMTlCO09BQTN0QjtLQUEvd0M7SUFBa2dHLGFBQUEsRUFBYztNQUFDLFFBQUEsRUFBUyxhQUFWO01BQXdCLE9BQUEsRUFBUSxjQUFoQztNQUErQyxhQUFBLEVBQWMsQ0FBQyxnTUFBRCxFQUFrTSx1WkFBbE0sQ0FBN0Q7TUFBd3BCLFVBQUEsRUFBVyxDQUFDLGdCQUFELEVBQWtCLE9BQWxCLEVBQTBCLFlBQTFCLENBQW5xQjtNQUEyc0IsTUFBQSxFQUFPO1FBQUMsTUFBQSxFQUFPLFVBQVI7UUFBbUIsUUFBQSxFQUFTLFNBQTVCO09BQWx0QjtNQUF5dkIsTUFBQSxFQUFPO1FBQUMsTUFBQSxFQUFPLG9CQUFSO1FBQTZCLFFBQUEsRUFBUyxZQUF0QztPQUFod0I7TUFBb3pCLE9BQUEsRUFBUTtRQUFDO1VBQUMsT0FBQSxFQUFRLDhCQUFUO1VBQXdDLE9BQUEsRUFBUSxJQUFoRDtVQUFxRCxRQUFBLEVBQVMsR0FBOUQ7VUFBa0UsTUFBQSxFQUFPLElBQXpFO1NBQUQsRUFBZ0Y7VUFBQyxPQUFBLEVBQVEsNkJBQVQ7VUFBdUMsT0FBQSxFQUFRLEdBQS9DO1VBQW1ELFFBQUEsRUFBUyxHQUE1RDtVQUFnRSxPQUFBLEVBQVEsSUFBeEU7VUFBNkUsTUFBQSxFQUFPLElBQXBGO1NBQWhGLEVBQTBLO1VBQUMsT0FBQSxFQUFRLDZCQUFUO1VBQXVDLE9BQUEsRUFBUSxHQUEvQztVQUFtRCxRQUFBLEVBQVMsR0FBNUQ7VUFBZ0UsT0FBQSxFQUFRLElBQXhFO1NBQTFLLEVBQXdQO1VBQUMsT0FBQSxFQUFRLDZCQUFUO1VBQXVDLE9BQUEsRUFBUSxHQUEvQztVQUFtRCxRQUFBLEVBQVMsR0FBNUQ7U0FBeFAsRUFBeVQ7VUFBQyxPQUFBLEVBQVEsOEJBQVQ7VUFBd0MsT0FBQSxFQUFRLElBQWhEO1VBQXFELFFBQUEsRUFBUyxHQUE5RDtVQUFrRSxNQUFBLEVBQU8sSUFBekU7U0FBelQsRUFBd1k7VUFBQyxPQUFBLEVBQVEsNkJBQVQ7VUFBdUMsT0FBQSxFQUFRLEdBQS9DO1VBQW1ELFFBQUEsRUFBUyxHQUE1RDtVQUFnRSxNQUFBLEVBQU8sSUFBdkU7U0FBeFksRUFBcWQ7VUFBQyxPQUFBLEVBQVEsNkJBQVQ7VUFBdUMsT0FBQSxFQUFRLEdBQS9DO1VBQW1ELFFBQUEsRUFBUyxHQUE1RDtTQUFyZCxFQUFzaEI7VUFBQyxPQUFBLEVBQVEsNkJBQVQ7VUFBdUMsTUFBQSxFQUFPLElBQTlDO1VBQW1ELE9BQUEsRUFBUSxJQUEzRDtVQUFnRSxPQUFBLEVBQVEsR0FBeEU7VUFBNEUsUUFBQSxFQUFTLEdBQXJGO1NBQXRoQixFQUFnbkI7VUFBQyxPQUFBLEVBQVEsNkJBQVQ7VUFBdUMsTUFBQSxFQUFPLElBQTlDO1VBQW1ELE9BQUEsRUFBUSxHQUEzRDtVQUErRCxRQUFBLEVBQVMsR0FBeEU7U0FBaG5CLEVBQTZyQjtVQUFDLE9BQUEsRUFBUSw4QkFBVDtVQUF3QyxPQUFBLEVBQVEsR0FBaEQ7VUFBb0QsUUFBQSxFQUFTLEdBQTdEO1NBQTdyQixFQUErdkI7VUFBQyxPQUFBLEVBQVEsOEJBQVQ7VUFBd0MsT0FBQSxFQUFRLEdBQWhEO1VBQW9ELFFBQUEsRUFBUyxHQUE3RDtTQUEvdkIsRUFBaTBCO1VBQUMsT0FBQSxFQUFRLDhCQUFUO1VBQXdDLE1BQUEsRUFBTyxJQUEvQztVQUFvRCxPQUFBLEVBQVEsSUFBNUQ7VUFBaUUsT0FBQSxFQUFRLEdBQXpFO1VBQTZFLFFBQUEsRUFBUyxHQUF0RjtTQUFqMEIsRUFBNDVCO1VBQUMsT0FBQSxFQUFRLDhCQUFUO1VBQXdDLE9BQUEsRUFBUSxHQUFoRDtVQUFvRCxRQUFBLEVBQVMsR0FBN0Q7U0FBNTVCLEVBQTg5QjtVQUFDLE9BQUEsRUFBUSwrQkFBVDtVQUF5QyxPQUFBLEVBQVEsSUFBakQ7VUFBc0QsUUFBQSxFQUFTLEdBQS9EO1NBQTk5QjtPQUE1ekI7S0FBaGhHO0lBQWczSixXQUFBLEVBQVk7TUFBQyxRQUFBLEVBQVMsV0FBVjtNQUFzQixPQUFBLEVBQVEsV0FBOUI7TUFBMEMsYUFBQSxFQUFjLENBQUMsaUZBQUQsRUFBbUYsdVhBQW5GLENBQXhEO01BQW9nQixVQUFBLEVBQVcsQ0FBQyxVQUFELEVBQVksZ0JBQVosRUFBNkIsT0FBN0IsRUFBcUMsOEJBQXJDLENBQS9nQjtNQUFvbEIsTUFBQSxFQUFPO1FBQUMsTUFBQSxFQUFPLGFBQVI7UUFBc0IsUUFBQSxFQUFTLEtBQS9CO09BQTNsQjtNQUFpb0IsTUFBQSxFQUFPO1FBQUMsTUFBQSxFQUFPLG9CQUFSO1FBQTZCLFFBQUEsRUFBUyxrQkFBdEM7T0FBeG9CO01BQWtzQixPQUFBLEVBQVE7UUFBQztVQUFDLE9BQUEsRUFBUSw0QkFBVDtVQUFzQyxNQUFBLEVBQU8sSUFBN0M7VUFBa0QsT0FBQSxFQUFRLElBQTFEO1VBQStELFFBQUEsRUFBUyxHQUF4RTtTQUFELEVBQThFO1VBQUMsT0FBQSxFQUFRLDJCQUFUO1VBQXFDLE9BQUEsRUFBUSxJQUE3QztVQUFrRCxPQUFBLEVBQVEsR0FBMUQ7VUFBOEQsUUFBQSxFQUFTLEdBQXZFO1NBQTlFLEVBQTBKO1VBQUMsT0FBQSxFQUFRLDJCQUFUO1VBQXFDLE1BQUEsRUFBTyxJQUE1QztVQUFpRCxPQUFBLEVBQVEsR0FBekQ7VUFBNkQsUUFBQSxFQUFTLEdBQXRFO1NBQTFKLEVBQXFPO1VBQUMsT0FBQSxFQUFRLDJCQUFUO1VBQXFDLE9BQUEsRUFBUSxHQUE3QztVQUFpRCxRQUFBLEVBQVMsR0FBMUQ7U0FBck8sRUFBb1M7VUFBQyxPQUFBLEVBQVEsNEJBQVQ7VUFBc0MsT0FBQSxFQUFRLElBQTlDO1VBQW1ELFFBQUEsRUFBUyxHQUE1RDtVQUFnRSxNQUFBLEVBQU8sSUFBdkU7U0FBcFMsRUFBaVg7VUFBQyxPQUFBLEVBQVEsMkJBQVQ7VUFBcUMsT0FBQSxFQUFRLEdBQTdDO1VBQWlELFFBQUEsRUFBUyxHQUExRDtVQUE4RCxPQUFBLEVBQVEsSUFBdEU7U0FBalgsRUFBNmI7VUFBQyxPQUFBLEVBQVEsMkJBQVQ7VUFBcUMsT0FBQSxFQUFRLEdBQTdDO1VBQWlELFFBQUEsRUFBUyxHQUExRDtVQUE4RCxNQUFBLEVBQU8sSUFBckU7U0FBN2IsRUFBd2dCO1VBQUMsT0FBQSxFQUFRLDJCQUFUO1VBQXFDLE9BQUEsRUFBUSxHQUE3QztVQUFpRCxRQUFBLEVBQVMsR0FBMUQ7U0FBeGdCLEVBQXVrQjtVQUFDLE9BQUEsRUFBUSw2QkFBVDtVQUF1QyxPQUFBLEVBQVEsSUFBL0M7VUFBb0QsUUFBQSxFQUFTLElBQTdEO1VBQWtFLE1BQUEsRUFBTyxJQUF6RTtTQUF2a0IsRUFBc3BCO1VBQUMsT0FBQSxFQUFRLDRCQUFUO1VBQXNDLE9BQUEsRUFBUSxHQUE5QztVQUFrRCxRQUFBLEVBQVMsR0FBM0Q7VUFBK0QsTUFBQSxFQUFPLElBQXRFO1NBQXRwQixFQUFrdUI7VUFBQyxPQUFBLEVBQVEsNEJBQVQ7VUFBc0MsT0FBQSxFQUFRLEdBQTlDO1VBQWtELFFBQUEsRUFBUyxHQUEzRDtTQUFsdUI7T0FBMXNCO0tBQTUzSjtJQUEwMk0sU0FBQSxFQUFVO01BQUMsUUFBQSxFQUFTLFNBQVY7TUFBb0IsT0FBQSxFQUFRLFVBQTVCO01BQXVDLGFBQUEsRUFBYyxDQUFDLDRWQUFELEVBQThWLDhXQUE5VixDQUFyRDtNQUFtd0IsVUFBQSxFQUFXLENBQUMsZ0JBQUQsRUFBa0IsV0FBbEIsRUFBOEIsYUFBOUIsRUFBNEMsMEJBQTVDLEVBQXVFLGFBQXZFLENBQTl3QjtNQUFvMkIsTUFBQSxFQUFPO1FBQUMsTUFBQSxFQUFPLGNBQVI7UUFBdUIsUUFBQSxFQUFTLGFBQWhDO09BQTMyQjtNQUEwNUIsT0FBQSxFQUFRO1FBQUM7VUFBQyxPQUFBLEVBQVEseUJBQVQ7VUFBbUMsT0FBQSxFQUFRLEdBQTNDO1VBQStDLFFBQUEsRUFBUyxHQUF4RDtVQUE0RCxNQUFBLEVBQU8sSUFBbkU7U0FBRCxFQUEwRTtVQUFDLE9BQUEsRUFBUSx5QkFBVDtVQUFtQyxPQUFBLEVBQVEsR0FBM0M7VUFBK0MsUUFBQSxFQUFTLEdBQXhEO1NBQTFFLEVBQXVJO1VBQUMsT0FBQSxFQUFRLDBCQUFUO1VBQW9DLE9BQUEsRUFBUSxJQUE1QztVQUFpRCxRQUFBLEVBQVMsR0FBMUQ7VUFBOEQsTUFBQSxFQUFPLElBQXJFO1NBQXZJLEVBQWtOO1VBQUMsT0FBQSxFQUFRLHlCQUFUO1VBQW1DLE1BQUEsRUFBTyxJQUExQztVQUErQyxPQUFBLEVBQVEsR0FBdkQ7VUFBMkQsUUFBQSxFQUFTLEdBQXBFO1NBQWxOLEVBQTJSO1VBQUMsT0FBQSxFQUFRLHlCQUFUO1VBQW1DLE9BQUEsRUFBUSxHQUEzQztVQUErQyxRQUFBLEVBQVMsR0FBeEQ7U0FBM1IsRUFBd1Y7VUFBQyxPQUFBLEVBQVEsMEJBQVQ7VUFBb0MsTUFBQSxFQUFPLElBQTNDO1VBQWdELE9BQUEsRUFBUSxJQUF4RDtVQUE2RCxRQUFBLEVBQVMsR0FBdEU7U0FBeFYsRUFBbWE7VUFBQyxPQUFBLEVBQVEseUJBQVQ7VUFBbUMsTUFBQSxFQUFPLElBQTFDO1VBQStDLE9BQUEsRUFBUSxHQUF2RDtVQUEyRCxRQUFBLEVBQVMsR0FBcEU7U0FBbmEsRUFBNGU7VUFBQyxPQUFBLEVBQVEseUJBQVQ7VUFBbUMsT0FBQSxFQUFRLEdBQTNDO1VBQStDLFFBQUEsRUFBUyxHQUF4RDtVQUE0RCxNQUFBLEVBQU8sSUFBbkU7U0FBNWUsRUFBcWpCO1VBQUMsT0FBQSxFQUFRLHlCQUFUO1VBQW1DLE9BQUEsRUFBUSxHQUEzQztVQUErQyxRQUFBLEVBQVMsR0FBeEQ7U0FBcmpCO09BQWw2QjtLQUFwM007SUFBMDRQLFlBQUEsRUFBYTtNQUFDLFFBQUEsRUFBUyxZQUFWO01BQXVCLE9BQUEsRUFBUSxZQUEvQjtNQUE0QyxhQUFBLEVBQWMsQ0FBQyw4SEFBRCxFQUFnSSxtV0FBaEksQ0FBMUQ7TUFBK2hCLFVBQUEsRUFBVyxDQUFDLGdCQUFELEVBQWtCLFVBQWxCLEVBQTZCLFdBQTdCLEVBQXlDLE9BQXpDLENBQTFpQjtNQUE0bEIsTUFBQSxFQUFPO1FBQUMsTUFBQSxFQUFPLGNBQVI7UUFBdUIsUUFBQSxFQUFTLGFBQWhDO09BQW5tQjtNQUFrcEIsTUFBQSxFQUFPO1FBQUMsTUFBQSxFQUFPLE1BQVI7UUFBZSxRQUFBLEVBQVMsTUFBeEI7T0FBenBCO01BQXlyQixPQUFBLEVBQVE7UUFBQztVQUFDLE9BQUEsRUFBUSw0QkFBVDtVQUFzQyxPQUFBLEVBQVEsR0FBOUM7VUFBa0QsUUFBQSxFQUFTLEdBQTNEO1VBQStELE1BQUEsRUFBTyxJQUF0RTtTQUFELEVBQTZFO1VBQUMsT0FBQSxFQUFRLDRCQUFUO1VBQXNDLE9BQUEsRUFBUSxHQUE5QztVQUFrRCxRQUFBLEVBQVMsR0FBM0Q7U0FBN0UsRUFBNkk7VUFBQyxPQUFBLEVBQVEsNEJBQVQ7VUFBc0MsT0FBQSxFQUFRLEdBQTlDO1VBQWtELFFBQUEsRUFBUyxHQUEzRDtVQUErRCxNQUFBLEVBQU8sSUFBdEU7U0FBN0ksRUFBeU47VUFBQyxPQUFBLEVBQVEsNEJBQVQ7VUFBc0MsT0FBQSxFQUFRLEdBQTlDO1VBQWtELFFBQUEsRUFBUyxHQUEzRDtVQUErRCxPQUFBLEVBQVEsSUFBdkU7U0FBek4sRUFBc1M7VUFBQyxPQUFBLEVBQVEsNEJBQVQ7VUFBc0MsT0FBQSxFQUFRLEdBQTlDO1VBQWtELFFBQUEsRUFBUyxHQUEzRDtVQUErRCxNQUFBLEVBQU8sSUFBdEU7U0FBdFMsRUFBa1g7VUFBQyxPQUFBLEVBQVEsNEJBQVQ7VUFBc0MsT0FBQSxFQUFRLEdBQTlDO1VBQWtELFFBQUEsRUFBUyxHQUEzRDtVQUErRCxNQUFBLEVBQU8sSUFBdEU7U0FBbFgsRUFBOGI7VUFBQyxPQUFBLEVBQVEsNEJBQVQ7VUFBc0MsT0FBQSxFQUFRLEdBQTlDO1VBQWtELFFBQUEsRUFBUyxHQUEzRDtTQUE5YixFQUE4ZjtVQUFDLE9BQUEsRUFBUSw2QkFBVDtVQUF1QyxPQUFBLEVBQVEsSUFBL0M7VUFBb0QsUUFBQSxFQUFTLEdBQTdEO1VBQWlFLE1BQUEsRUFBTyxJQUF4RTtTQUE5ZixFQUE0a0I7VUFBQyxPQUFBLEVBQVEsNEJBQVQ7VUFBc0MsT0FBQSxFQUFRLEdBQTlDO1VBQWtELFFBQUEsRUFBUyxHQUEzRDtVQUErRCxNQUFBLEVBQU8sSUFBdEU7U0FBNWtCLEVBQXdwQjtVQUFDLE9BQUEsRUFBUSw2QkFBVDtVQUF1QyxPQUFBLEVBQVEsR0FBL0M7VUFBbUQsUUFBQSxFQUFTLEdBQTVEO1VBQWdFLE9BQUEsRUFBUSxJQUF4RTtTQUF4cEIsRUFBc3VCO1VBQUMsT0FBQSxFQUFRLDZCQUFUO1VBQXVDLE9BQUEsRUFBUSxHQUEvQztVQUFtRCxRQUFBLEVBQVMsR0FBNUQ7U0FBdHVCO09BQWpzQjtLQUF2NVA7SUFBaTRTLE1BQUEsRUFBTztNQUFDLFFBQUEsRUFBUyxNQUFWO01BQWlCLE9BQUEsRUFBUSxNQUF6QjtNQUFnQyxhQUFBLEVBQWMsQ0FBQyx5T0FBRCxFQUEyTyw2YUFBM08sQ0FBOUM7TUFBd3NCLFVBQUEsRUFBVyxDQUFDLFNBQUQsRUFBVyxRQUFYLEVBQW9CLGFBQXBCLEVBQWtDLGdCQUFsQyxFQUFtRCxPQUFuRCxDQUFudEI7TUFBK3dCLE1BQUEsRUFBTztRQUFDLE1BQUEsRUFBTyxvQkFBUjtRQUE2QixRQUFBLEVBQVMsWUFBdEM7T0FBdHhCO01BQTAwQixNQUFBLEVBQU87UUFBQyxNQUFBLEVBQU8sY0FBUjtRQUF1QixRQUFBLEVBQVMsT0FBaEM7T0FBajFCO01BQTAzQixPQUFBLEVBQVE7UUFBQztVQUFDLE9BQUEsRUFBUSxzQkFBVDtVQUFnQyxPQUFBLEVBQVEsR0FBeEM7VUFBNEMsUUFBQSxFQUFTLEdBQXJEO1VBQXlELE1BQUEsRUFBTyxJQUFoRTtTQUFELEVBQXVFO1VBQUMsT0FBQSxFQUFRLHNCQUFUO1VBQWdDLE9BQUEsRUFBUSxHQUF4QztVQUE0QyxRQUFBLEVBQVMsR0FBckQ7VUFBeUQsT0FBQSxFQUFRLElBQWpFO1NBQXZFLEVBQThJO1VBQUMsT0FBQSxFQUFRLHNCQUFUO1VBQWdDLE9BQUEsRUFBUSxHQUF4QztVQUE0QyxRQUFBLEVBQVMsR0FBckQ7VUFBeUQsT0FBQSxFQUFRLElBQWpFO1NBQTlJLEVBQXFOO1VBQUMsT0FBQSxFQUFRLHVCQUFUO1VBQWlDLE9BQUEsRUFBUSxJQUF6QztVQUE4QyxRQUFBLEVBQVMsR0FBdkQ7VUFBMkQsTUFBQSxFQUFPLElBQWxFO1NBQXJOLEVBQTZSO1VBQUMsT0FBQSxFQUFRLHNCQUFUO1VBQWdDLE9BQUEsRUFBUSxHQUF4QztVQUE0QyxRQUFBLEVBQVMsR0FBckQ7VUFBeUQsT0FBQSxFQUFRLElBQWpFO1NBQTdSLEVBQW9XO1VBQUMsT0FBQSxFQUFRLHNCQUFUO1VBQWdDLE9BQUEsRUFBUSxHQUF4QztVQUE0QyxRQUFBLEVBQVMsR0FBckQ7VUFBeUQsT0FBQSxFQUFRLElBQWpFO1NBQXBXLEVBQTJhO1VBQUMsT0FBQSxFQUFRLHNCQUFUO1VBQWdDLE9BQUEsRUFBUSxHQUF4QztVQUE0QyxRQUFBLEVBQVMsR0FBckQ7U0FBM2EsRUFBcWU7VUFBQyxPQUFBLEVBQVEsdUJBQVQ7VUFBaUMsT0FBQSxFQUFRLElBQXpDO1VBQThDLFFBQUEsRUFBUyxHQUF2RDtVQUEyRCxNQUFBLEVBQU8sSUFBbEU7U0FBcmUsRUFBNmlCO1VBQUMsT0FBQSxFQUFRLHNCQUFUO1VBQWdDLE9BQUEsRUFBUSxHQUF4QztVQUE0QyxRQUFBLEVBQVMsR0FBckQ7VUFBeUQsTUFBQSxFQUFPLElBQWhFO1NBQTdpQixFQUFtbkI7VUFBQyxPQUFBLEVBQVEsdUJBQVQ7VUFBaUMsT0FBQSxFQUFRLEdBQXpDO1VBQTZDLFFBQUEsRUFBUyxHQUF0RDtVQUEwRCxPQUFBLEVBQVEsSUFBbEU7U0FBbm5CLEVBQTJyQjtVQUFDLE9BQUEsRUFBUSx1QkFBVDtVQUFpQyxPQUFBLEVBQVEsR0FBekM7VUFBNkMsUUFBQSxFQUFTLEdBQXREO1NBQTNyQixFQUFzdkI7VUFBQyxPQUFBLEVBQVEsdUJBQVQ7VUFBaUMsT0FBQSxFQUFRLEdBQXpDO1VBQTZDLFFBQUEsRUFBUyxHQUF0RDtVQUEwRCxNQUFBLEVBQU8sSUFBakU7U0FBdHZCLEVBQTZ6QjtVQUFDLE9BQUEsRUFBUSx1QkFBVDtVQUFpQyxPQUFBLEVBQVEsR0FBekM7VUFBNkMsUUFBQSxFQUFTLEdBQXREO1VBQTBELE9BQUEsRUFBUSxJQUFsRTtTQUE3ekI7T0FBbDRCO0tBQXg0UztJQUFpcFcsY0FBQSxFQUFlO01BQUMsUUFBQSxFQUFTLGNBQVY7TUFBeUIsT0FBQSxFQUFRLGNBQWpDO01BQWdELGFBQUEsRUFBYyxDQUFDLGlHQUFELEVBQW1HLCtkQUFuRyxDQUE5RDtNQUFrb0IsVUFBQSxFQUFXLENBQUMsVUFBRCxFQUFZLGdCQUFaLEVBQTZCLE9BQTdCLEVBQXFDLDhCQUFyQyxFQUFvRSxhQUFwRSxDQUE3b0I7TUFBZ3VCLE1BQUEsRUFBTztRQUFDLE1BQUEsRUFBTyxvQkFBUjtRQUE2QixRQUFBLEVBQVMsa0JBQXRDO09BQXZ1QjtNQUFpeUIsTUFBQSxFQUFPO1FBQUMsTUFBQSxFQUFPLFVBQVI7UUFBbUIsUUFBQSxFQUFTLFNBQTVCO09BQXh5QjtNQUErMEIsT0FBQSxFQUFRO1FBQUM7VUFBQyxPQUFBLEVBQVEsdUJBQVQ7VUFBaUMsTUFBQSxFQUFPLElBQXhDO1VBQTZDLE9BQUEsRUFBUSxHQUFyRDtVQUF5RCxRQUFBLEVBQVMsR0FBbEU7U0FBRCxFQUF3RTtVQUFDLE9BQUEsRUFBUSx1QkFBVDtVQUFpQyxPQUFBLEVBQVEsR0FBekM7VUFBNkMsUUFBQSxFQUFTLEdBQXREO1NBQXhFLEVBQW1JO1VBQUMsT0FBQSxFQUFRLHdCQUFUO1VBQWtDLE1BQUEsRUFBTyxJQUF6QztVQUE4QyxPQUFBLEVBQVEsSUFBdEQ7VUFBMkQsUUFBQSxFQUFTLEdBQXBFO1NBQW5JLEVBQTRNO1VBQUMsT0FBQSxFQUFRLHVCQUFUO1VBQWlDLE9BQUEsRUFBUSxHQUF6QztVQUE2QyxRQUFBLEVBQVMsR0FBdEQ7VUFBMEQsTUFBQSxFQUFPLElBQWpFO1NBQTVNLEVBQW1SO1VBQUMsT0FBQSxFQUFRLHVCQUFUO1VBQWlDLE9BQUEsRUFBUSxHQUF6QztVQUE2QyxRQUFBLEVBQVMsR0FBdEQ7VUFBMEQsT0FBQSxFQUFRLElBQWxFO1NBQW5SLEVBQTJWO1VBQUMsT0FBQSxFQUFRLHVCQUFUO1VBQWlDLE9BQUEsRUFBUSxHQUF6QztVQUE2QyxRQUFBLEVBQVMsR0FBdEQ7VUFBMEQsT0FBQSxFQUFRLElBQWxFO1NBQTNWLEVBQW1hO1VBQUMsT0FBQSxFQUFRLHdCQUFUO1VBQWtDLE9BQUEsRUFBUSxJQUExQztVQUErQyxRQUFBLEVBQVMsR0FBeEQ7VUFBNEQsTUFBQSxFQUFPLElBQW5FO1NBQW5hLEVBQTRlO1VBQUMsT0FBQSxFQUFRLHVCQUFUO1VBQWlDLE9BQUEsRUFBUSxHQUF6QztVQUE2QyxRQUFBLEVBQVMsR0FBdEQ7VUFBMEQsTUFBQSxFQUFPLElBQWpFO1NBQTVlLEVBQW1qQjtVQUFDLE9BQUEsRUFBUSxzQkFBVDtVQUFnQyxPQUFBLEVBQVEsR0FBeEM7VUFBNEMsUUFBQSxFQUFTLEdBQXJEO1VBQXlELE9BQUEsRUFBUSxJQUFqRTtTQUFuakIsRUFBMG5CO1VBQUMsT0FBQSxFQUFRLHdCQUFUO1VBQWtDLE9BQUEsRUFBUSxHQUExQztVQUE4QyxRQUFBLEVBQVMsR0FBdkQ7VUFBMkQsTUFBQSxFQUFPLElBQWxFO1VBQXVFLE9BQUEsRUFBUSxJQUEvRTtTQUExbkIsRUFBK3NCO1VBQUMsT0FBQSxFQUFRLHdCQUFUO1VBQWtDLE9BQUEsRUFBUSxHQUExQztVQUE4QyxRQUFBLEVBQVMsR0FBdkQ7U0FBL3NCLEVBQTJ3QjtVQUFDLE9BQUEsRUFBUSx5QkFBVDtVQUFtQyxNQUFBLEVBQU8sSUFBMUM7VUFBK0MsT0FBQSxFQUFRLElBQXZEO1VBQTRELFFBQUEsRUFBUyxHQUFyRTtTQUEzd0I7T0FBdjFCO0tBQWhxVztJQUE4MFosS0FBQSxFQUFNO01BQUMsUUFBQSxFQUFTLEtBQVY7TUFBZ0IsT0FBQSxFQUFRLGFBQXhCO01BQXNDLGFBQUEsRUFBYyxDQUFDLGdGQUFELEVBQWtGLDJUQUFsRixDQUFwRDtNQUFtYyxVQUFBLEVBQVcsQ0FBQyxVQUFELEVBQVksZ0JBQVosRUFBNkIsV0FBN0IsRUFBeUMsT0FBekMsRUFBaUQscUJBQWpELEVBQXVFLDhCQUF2RSxFQUFzRyxhQUF0RyxDQUE5YztNQUFta0IsTUFBQSxFQUFPO1FBQUMsTUFBQSxFQUFPLGNBQVI7UUFBdUIsUUFBQSxFQUFTLE9BQWhDO09BQTFrQjtNQUFtbkIsTUFBQSxFQUFPO1FBQUMsTUFBQSxFQUFPLFdBQVI7UUFBb0IsUUFBQSxFQUFTLFdBQTdCO09BQTFuQjtNQUFvcUIsT0FBQSxFQUFRO1FBQUM7VUFBQyxPQUFBLEVBQVEsc0JBQVQ7VUFBZ0MsT0FBQSxFQUFRLElBQXhDO1VBQTZDLFFBQUEsRUFBUyxHQUF0RDtVQUEwRCxNQUFBLEVBQU8sSUFBakU7U0FBRCxFQUF3RTtVQUFDLE9BQUEsRUFBUSxxQkFBVDtVQUErQixPQUFBLEVBQVEsR0FBdkM7VUFBMkMsUUFBQSxFQUFTLEdBQXBEO1VBQXdELE1BQUEsRUFBTyxJQUEvRDtTQUF4RSxFQUE2STtVQUFDLE9BQUEsRUFBUSxxQkFBVDtVQUErQixPQUFBLEVBQVEsR0FBdkM7VUFBMkMsUUFBQSxFQUFTLEdBQXBEO1NBQTdJLEVBQXNNO1VBQUMsT0FBQSxFQUFRLHFCQUFUO1VBQStCLE1BQUEsRUFBTyxJQUF0QztVQUEyQyxPQUFBLEVBQVEsR0FBbkQ7VUFBdUQsUUFBQSxFQUFTLEdBQWhFO1NBQXRNLEVBQTJRO1VBQUMsT0FBQSxFQUFRLHFCQUFUO1VBQStCLE9BQUEsRUFBUSxHQUF2QztVQUEyQyxRQUFBLEVBQVMsR0FBcEQ7U0FBM1EsRUFBb1U7VUFBQyxPQUFBLEVBQVEsc0JBQVQ7VUFBZ0MsTUFBQSxFQUFPLElBQXZDO1VBQTRDLE9BQUEsRUFBUSxJQUFwRDtVQUF5RCxRQUFBLEVBQVMsR0FBbEU7U0FBcFUsRUFBMlk7VUFBQyxPQUFBLEVBQVEscUJBQVQ7VUFBK0IsT0FBQSxFQUFRLEdBQXZDO1VBQTJDLFFBQUEsRUFBUyxHQUFwRDtTQUEzWSxFQUFvYztVQUFDLE9BQUEsRUFBUSxxQkFBVDtVQUErQixPQUFBLEVBQVEsR0FBdkM7VUFBMkMsUUFBQSxFQUFTLEdBQXBEO1VBQXdELE9BQUEsRUFBUSxJQUFoRTtTQUFwYyxFQUEwZ0I7VUFBQyxPQUFBLEVBQVEscUJBQVQ7VUFBK0IsT0FBQSxFQUFRLEdBQXZDO1VBQTJDLFFBQUEsRUFBUyxHQUFwRDtVQUF3RCxPQUFBLEVBQVEsSUFBaEU7U0FBMWdCLEVBQWdsQjtVQUFDLE9BQUEsRUFBUSxzQkFBVDtVQUFnQyxPQUFBLEVBQVEsR0FBeEM7VUFBNEMsUUFBQSxFQUFTLEdBQXJEO1VBQXlELE9BQUEsRUFBUSxJQUFqRTtVQUFzRSxNQUFBLEVBQU8sSUFBN0U7U0FBaGxCLEVBQW1xQjtVQUFDLE9BQUEsRUFBUSxzQkFBVDtVQUFnQyxPQUFBLEVBQVEsR0FBeEM7VUFBNEMsUUFBQSxFQUFTLEdBQXJEO1VBQXlELE1BQUEsRUFBTyxJQUFoRTtTQUFucUIsRUFBeXVCO1VBQUMsT0FBQSxFQUFRLHVCQUFUO1VBQWlDLE9BQUEsRUFBUSxJQUF6QztVQUE4QyxRQUFBLEVBQVMsR0FBdkQ7VUFBMkQsTUFBQSxFQUFPLElBQWxFO1NBQXp1QixFQUFpekI7VUFBQyxPQUFBLEVBQVEsc0JBQVQ7VUFBZ0MsT0FBQSxFQUFRLEdBQXhDO1VBQTRDLFFBQUEsRUFBUyxHQUFyRDtVQUF5RCxNQUFBLEVBQU8sSUFBaEU7U0FBanpCLEVBQXUzQjtVQUFDLE9BQUEsRUFBUSxzQkFBVDtVQUFnQyxPQUFBLEVBQVEsR0FBeEM7VUFBNEMsUUFBQSxFQUFTLEdBQXJEO1VBQXlELE9BQUEsRUFBUSxJQUFqRTtTQUF2M0I7T0FBNXFCO0tBQXAxWjtHQUF2MkQ7OztBQ0FULElBQUE7O0FBQUEsS0FBQSxHQUVFO0VBQUEsQ0FBQSxFQUFHLFNBQUE7SUFDRCxRQUFRLENBQUMsQ0FBVCxDQUFBO1dBRUEsSUFBQyxDQUFBLFFBQUQsQ0FBQTtFQUhDLENBQUg7RUFLQSxRQUFBLEVBQVUsU0FBQTtXQUVSLENBQUEsQ0FBRSxTQUFGLENBQVksQ0FBQyxLQUFiLENBQW1CLElBQUMsQ0FBQSxNQUFwQjtFQUZRLENBTFY7RUFVQSxNQUFBLEVBQVEsU0FBQTtJQUVOLENBQUMsQ0FBQyxJQUFGLENBQU8sU0FBUDtXQUNBLENBQUMsQ0FBQyxJQUFGLENBQU8sU0FBUDtFQUhNLENBVlIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXyA9XG5cbiAgaTogLT5cbiAgICBAY29uc29sZSA9IHNldEludGVydmFsKEBkZXRlY3QuYmluZChAKSwgMjAwKVxuXG4gIHA6XG4gICAgb2ZmaW5nOiBmYWxzZVxuICAgIG9mZnRpbWU6IDBcblxuICB0dXJuOiAoZWwsIHJlbW92ZT1mYWxzZSwgYWRkPWZhbHNlKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiByZW1vdmUgaXNudCBmYWxzZVxuICAgICAgZWwucmVtb3ZlQ2xhc3MocmVtb3ZlKVxuXG4gICAgaWYgYWRkIGlzbnQgZmFsc2VcbiAgICAgIGVsLmFkZENsYXNzKGFkZClcblxuICAgIHJldHVybiB0cnVlXG5cbiAgb2ZmOiAoZWwsIHA9e30pIC0+XG5cbiAgICBpZiBwLm9mZmluZyBhbmQgcC5vZmZ0aW1lID4gMFxuXG4gICAgICBAdHVybiBlbCwgZmFsc2UsICdvZmZpbmcnXG4gICAgICBzZXRUaW1lb3V0ID0+XG4gICAgICAgIEB0dXJuIGVsLCAnb2ZmaW5nJywgZmFsc2VcbiAgICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG4gICAgICAsIHAub2ZmdGltZSoxMDAwICsgMTAwXG5cbiAgICBlbHNlXG4gICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcblxuICAgIHJldHVyblxuXG4gIG9uOiAoZWwsIHApIC0+XG4gICAgQHR1cm4gZWwsICdvZmYnLCAnb24nXG5cbiAgc3dhcDogKGVsLCBwKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiBlbC5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgQG9uIGVsLCBwXG4gICAgZWxzZVxuICAgICAgQG9mZiBlbCwgcFxuXG4gICAgcmV0dXJuXG5cbiAgZW5jb2RlOiAoc3RyKSAtPlxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgICAgLnJlcGxhY2UoLyEvZywgJyUyMScpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJTI3JylcbiAgICAgIC5yZXBsYWNlKC9cXCgvZywgJyUyOCcpXG4gICAgICAucmVwbGFjZSgvXFwpL2csICclMjknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcbiAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxuXG4gIHQ6IChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIC0+XG4gICAgX2dhcS5wdXNoIFsnX3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVdXG5cbiAgcmFuZDogKG1pbiwgbWF4KSAtPlxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluXG5cbiAgcmFuZ2U6IChzdGFydCwgZW5kKSAtPlxuICAgIHJlc3VsdCA9IFtdXG4gICAgZm9yIG51bSBpbiBbc3RhcnQuLmVuZF1cbiAgICAgIHJlc3VsdC5wdXNoIG51bVxuICAgIHJlc3VsdFxuXG4gIGZpdDogKHNyY1dpZHRoLCBzcmNIZWlnaHQsIG1heFdpZHRoLCBtYXhIZWlnaHQpIC0+XG4gICAgcmF0aW8gPSBNYXRoLm1pbihtYXhXaWR0aCAvIHNyY1dpZHRoLCBtYXhIZWlnaHQgLyBzcmNIZWlnaHQpXG4gICAgd2lkdGg6IHNyY1dpZHRoKnJhdGlvLCBoZWlnaHQ6IHNyY0hlaWdodCpyYXRpb1xuXG4gIGhleDJyZ2I6IChoZXgpIC0+XG4gICAgcmVzdWx0ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleClcbiAgICByOiBwYXJzZUludChyZXN1bHRbMV0sIDE2KSxcbiAgICBnOiBwYXJzZUludChyZXN1bHRbMl0sIDE2KSxcbiAgICBiOiBwYXJzZUludChyZXN1bHRbM10sIDE2KVxuIFxuICBvYmpjOiAob2JqKSAtPlxuICAgIChrIGZvciBvd24gayBvZiBvYmopLmxlbmd0aFxuXG4gIGxvYWQ6IChzY3JpcHQsIGluaXRpYXRlLCBjb21wbGV0ZSkgLT5cblxuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnc2NyaXB0J1xuICAgIGVsLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0J1xuICAgIGVsLnNyYyA9IHNjcmlwdFxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIgJ2xvYWQnICwgKGUpIC0+XG4gICAgICBjb21wbGV0ZSgpIGlmIHR5cGVvZiBjb21wbGV0ZSBpcyAnZnVuY3Rpb24nXG4gICAgICB3aW5kb3dbaW5pdGlhdGVdLmkoKSBpZiBpbml0aWF0ZSBpc250IHVuZGVmaW5lZCBhbmQgaW5pdGlhdGUgaXNudCBmYWxzZVxuICAgICwgZmFsc2VcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpXG5cbiAgamluaXQ6IC0+XG4gICAgJC5hamF4U2V0dXBcbiAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuXG4gIHBhdGNoOiAodXJsLCBkYXRhKSAtPlxuXG4gICAgQGppbml0KClcblxuICAgIGpwYXRjaCA9ICQuYWpheFxuICAgICAgdXJsOiB1cmxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICAgIHR5cGU6ICdQQVRDSCdcblxuICAgIGpwYXRjaC5mYWlsIChyZXNwb25zZSkgLT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuXG4gICAgcmV0dXJuIGpwYXRjaFxuXG4gIGdldDogKGFyZ3MuLi4pIC0+XG5cbiAgICBAamluaXQoKVxuXG4gICAgamdldCA9ICQuZ2V0IGFyZ3MuLi5cblxuICAgIGpnZXQuZmFpbCAocmVzcG9uc2UpID0+XG4gICAgICBAZmFpbChyZXNwb25zZSlcbiAgICAgIGpnZXQuZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqZ2V0XG5cbiAgcG9zdDogKGFyZ3MuLi4pIC0+XG5cbiAgICBqcG9zdCA9ICQucG9zdCBhcmdzLi4uXG5cbiAgICBqcG9zdC5mYWlsIChyZXNwb25zZSkgPT5cbiAgICAgIEBmYWlsKHJlc3BvbnNlKVxuICAgICAganBvc3QuZmFpbChyZXNwb25zZSlcblxuICAgIHJldHVybiBqcG9zdFxuXG4gIGZhaWw6IChyZXNwb25zZSkgLT5cblxuICAgIGVycm9yID0gcmVzcG9uc2UucmVzcG9uc2VKU09OPy5lcnJvcnM/WzBdXG4gICAgaWYgZXJyb3IgaXMgdW5kZWZpbmVkXG4gICAgICByZXR1cm4gUHJvbXB0LmkgcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5zdGF0dXNUZXh0XG5cbiAgICBwdWcgPSBlcnJvci5tZXNzYWdlLm1hdGNoIC9QdWcgRXJyb3I6ICguKj8pOihbMC05XSspL1xuICAgIGlmIHB1ZyBpc250IG51bGxcbiAgICAgIGVycm9yLm1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlLnJlcGxhY2UgL1B1ZyBFcnJvcjogKC4qPyk6KFswLTldKykvLCAnJ1xuICAgICAgZXJyb3IuZmlsZSA9IHB1Z1sxXVxuICAgICAgZXJyb3IubGluZSA9IHB1Z1syXVxuXG4gICAgZmlsZSA9IEBlbmNvZGUgXCIje2Vycm9yLmZpbGV9XCJcblxuICAgIHN3aXRjaCBjb25maWcuYXBwLmVkaXRvclxuICAgICAgd2hlbiAnbWFjdmltJyB0aGVuIGVkaXRvciA9ICdtdmltOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3N1YmxpbWUnIHRoZW4gZWRpdG9yID0gJ3N1Ymw6Ly9vcGVuP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAnZW1hY3MnIHRoZW4gZWRpdG9yID0gJ2VtYWNzOi8vb3Blbj91cmw9ZmlsZTovLydcbiAgICAgIHdoZW4gJ3RleHRtYXRlJyB0aGVuIGVkaXRvciA9ICd0ZXh0bWF0ZTovL29wZW4vP3VybD1maWxlOi8vJ1xuICAgICAgd2hlbiAncGhwc3Rvcm0nIHRoZW4gZWRpdG9yID0gJ3BocHN0b3JtOi8vb3Blbj9maWxlPSdcblxuICAgIGlmIGVycm9yLmZpbGUgaXNudCBudWxsXG4gICAgICBib2R5ID0gXCJcIlwiXG4gICAgICAgIDxwcmU+I3tlcnJvci5tZXNzYWdlfTwvcHJlPlxuICAgICAgICA8YSBocmVmPVwiI3tlZGl0b3J9I3tmaWxlfSZsaW5lPSN7ZXJyb3IubGluZX1cIj48Yj4je2Vycm9yLmZpbGV9OiN7ZXJyb3IubGluZX08L2I+PC9hPlxuICAgICAgXCJcIlwiXG4gICAgZWxzZVxuICAgICAgYm9keSA9IGVycm9yLm1lc3NhZ2VcblxuICAgIFByb21wdC5pIGVycm9yLnR5cGUsIGJvZHksIFsnT0snXVxuXG4gIG1ldGhvZHM6IChvYmopIC0+XG4gICAgcmVzID0gW11cbiAgICBmb3IgaSxtIG9mIG9ialxuICAgICAgaWYgdHlwZW9mIG0gaXMgJ2Z1bmN0aW9uJ1xuICAgICAgICByZXMucHVzaCBtXG4gICAgcmV0dXJuIHJlc1xuXG4gIGxsYzogLT5cbiAgICBhc2NpaSA9IFwiXCJcIlxuXG4gICAgICAlY21tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLi4uLi06Oi8vOjotLi4uLi4uLi06Ojo6Ojo6Ojo6Ojo6LS4uLi4uLi4uLTo6Ly8vOi0ub21tXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uOit5aGRkZGRkZGh5Ky0uLi4uL2RkZGRkZGRkZGRkZGQrLi4uLi4uL3NoZGRkZGRkZHlvZG1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi1obW1taHl5eXlkbW1taDouLi4vbW1tbWhoaGhoaGhoaCsuLi4uOnlkbW1kaHl5eWhkZG9vbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi1zczotLi4uLi15bW1teS4uLi9tbW1tLS0tLS0tLS0tLi4uLjpkbW1tczotLi4uLTovLi1tXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLnltbW15Li4uL21tbW0tLytvb28rOi0uLi4ueW1tbXktOitvb28rLy0uLmRcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzbW1tZDouLi4vbW1tbWhtbW1tbW1kaCsuLi5kbW1tc2hkbW1tbW1taHMtaFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzZG1tZHk6Li4uLjpoaGRobysvLyt5bW1tbSsuLmRtbW1keW8vLytzZG1tbWhoXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLSt5ZG1tZHkvLi4uLi4uLi0tOi4uLi4uLi5zbW1taC4ueW1tbXMuLi4uLi46bW1tbW1cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tOnNobW1tZHMvLS0tLS0uLi4uOnMvLS0uLi4tOmhtbW1zLi46ZG1tZC8tLi4uLW9tbW1tbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLmhtbW1tbW1oaGhoaGhoaC4uLitkbW1kaHl5eWhkbW1teS0uLi4vaG1tbWh5eXlobW1tZGhtXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uZGRkZGRkZGRkZGRkZGRkLi4uLStzaGRkZGRkZGRoeS8tLi4uLi4tb3lkZGRkZGRkaG86ZG1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi46Ojo6Ojo6Ojo6Ojo6OjouLi4uLi4uLTovLy86Oi0uLi4uLi4uLi4uLi06Ly8vOi0uLm9tbVxuICAgICAgbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG5cbiAgICAgIDo6IHN5bnRhY3RpYyBzdWdhciBieSAyNTZcbiAgICAgIDo6IGh0dHA6Ly8yNTYuaW8vXG4gICAgICA6OiAje2NvbmZpZy5tZXRhLnJlcG99XG4gICAgXCJcIlwiXG4gICAgY29uc29sZS5sb2cgYXNjaWksIFwiY29sb3I6IGdyZXk7IGZvbnQtZmFtaWx5OiBNZW5sbywgbW9ub3NwYWNlO1wiXG5cbiAgZGV0ZWN0OiAtPlxuICAgIGlmICgoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCkgPiAxMDApIHx8ICgod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCkgPiAxMDApKVxuICAgICAgQGxsYygpXG4gICAgICBjbGVhckludGVydmFsIEBjb25zb2xlXG5cbl8uaSgpXG4iLCJcbkJsdXJsb2FkID0gXG5cbiAgaTogLT5cblxuICAgICQoJy50aWxlcyA+IC50aWxlID4gLmltYWdlLm9mZicpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgc3JjID0gJChlbCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykucmVwbGFjZSgvdXJsXFwoXCIoLio/KVwiXFwpLywgXCIkMVwiKVxuICAgICAgaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuICAgICAgaW1hZ2Uuc3JjID0gc3JjXG4gICAgICBpbWFnZS5vbmxvYWQgPSAtPlxuICAgICAgICBfLm9uIGVsXG5cbiIsImNvbmZpZyA9IHtcImNvbG9yXCI6e1wid2hpdGUxXCI6XCIjZmZmZmZmXCIsXCJibGFjazFcIjpcIiMwMDAwMDBcIixcImdvbGQxXCI6XCIjYWQ5ODZlXCIsXCJibHVlMVwiOlwiIzQ2NTA2MlwiLFwiZ3JleTFcIjpcIiNhY2EzOWFcIn0sXCJmb250XCI6e1wiaDFcIjp7XCJmb250LWZhbWlseVwiOlwiY2hyb25pY2xlIHJvbWFuXCIsXCJmb250LXNpemVcIjpcIjQwcHhcIn0sXCJoMlwiOntcImZvbnQtZmFtaWx5XCI6XCJjaHJvbmljbGUgcm9tYW5cIixcImxldHRlci1zcGFjaW5nXCI6XCIzcHhcIixcImZvbnQtc2l6ZVwiOlwiMjBweFwifSxcImgzXCI6e1wiZm9udC1mYW1pbHlcIjpcImNocm9uaWNsZSByb21hblwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwiLFwiZm9udC1zaXplXCI6XCIxNXB4XCJ9LFwiaDRcIjp7XCJmb250LWZhbWlseVwiOlwicmV2aXN0YSBzdGVuY2lscmVndWxhclwiLFwiZm9udC1zaXplXCI6XCI0MHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMnB4XCJ9LFwiaDVcIjp7XCJmb250LWZhbWlseVwiOlwiY2hyb25pY2xlIHJvbWFuXCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiM3B4XCIsXCJmb250LXNpemVcIjpcIjIwcHhcIixcImxpbmUtaGVpZ2h0XCI6XCIzMnB4XCJ9LFwiY29weTFcIjp7XCJmb250LWZhbWlseVwiOlwiY2hyb25pY2xlIHJvbWFuXCIsXCJmb250LXNpemVcIjpcIjE2cHhcIn0sXCJjb3B5MlwiOntcImZvbnQtZmFtaWx5XCI6XCJjaHJvbmljbGUgcm9tYW5cIixcImZvbnQtc2l6ZVwiOlwiMTJweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwifSxcImNvcHkyc1wiOntcImZvbnQtZmFtaWx5XCI6XCJjaHJvbmljbGUgcm9tYW5cIixcImZvbnQtc2l6ZVwiOlwiOHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMnB4XCJ9LFwiY29weTNcIjp7XCJmb250LWZhbWlseVwiOlwiZW5ncmF2ZXJzIHJlZ3VsYXJcIixcImZvbnQtc2l6ZVwiOlwiMTFweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwiLFwibGluZS1oZWlnaHRcIjpcIjE5cHhcIn0sXCJjb3B5NFwiOntcImZvbnQtZmFtaWx5XCI6XCJlbmdyYXZlcnMgcmVndWxhclwiLFwiZm9udC1zaXplXCI6XCIxMHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMnB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMTJweFwifX0sXCJtZXRhXCI6e1widGl0bGVcIjpcIkRlc2lnbnNha2UgU3R1ZGlvXCIsXCJ1cmxcIjpcImh0dHA6Ly93d3cuZGVzaWduc2FrZXN0dWRpby5jb20vXCIsXCJkZXNjcmlwdGlvblwiOlwiQm91dGlxdWUgZGVzaWduIHN0dWRpbyB0aGF0IHNwZWNpYWxpemVzIGluIGJyYW5kaW5nLCBwYWNrYWdpbmcsIHdlYiBkZXNpZ24sIGFuZCBkZXZlbG9wbWVudFwiLFwia2V5d29yZHNcIjpcImRlc2lnbiwgZ3JhcGhpYyBkZXNpZ24sIGJyYW5kaW5nLCBwYWNrYWdpbmcsIHdlYiBkZXNpZ24sIHdlYiBkZXZlbG9wbWVudCwgYXJ0IGRpcmVjdGlvbiwgZGVzaWduc2FrZSxcIixcImltYWdlXCI6XCJpbWcvc2hhcmUuanBnXCIsXCJyZXBvXCI6XCJodHRwczovL2dpdGh1Yi5jb20vYWNpZGphenovc2FrZTJcIixcImdtYXBcIjpcImh0dHBzOi8vZ29vLmdsL21hcHMvU1YzcnhEaVpvRjIyXCJ9LFwic29jaWFsXCI6e1wiaW5zdGFncmFtXCI6XCJodHRwOi8vd3d3Lmluc3RhZ3JhbS5jb20vZGVzaWduc2FrZXN0dWRpb1wiLFwiZmFjZWJvb2tcIjpcImh0dHA6Ly93d3cuZmFjZWJvb2suY29tL2Rlc2lnbnNha2VzdHVkaW9cIixcInBpbnRlcmVzdFwiOlwiaHR0cDovL3d3dy5waW50ZXJlc3QuY29tL2Rlc2lnbnNha2VzZlwiLFwiZHJpYmJibGVcIjpcImh0dHBzOi8vZHJpYmJibGUuY29tL2Rlc2lnbnNha2VzdHVkaW9cIixcImJlaGFuY2VcIjpcImh0dHBzOi8vd3d3LmJlaGFuY2UubmV0L2Rlc2lnbnNha2VzdHVkaW9cIixcIm1haWxcIjpcImluZm9AZGVzaWduc2FrZXN0dWRpby5jb21cIixcIm1hcFwiOlwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tYXBzL3BsYWNlL0Rlc2lnbnNha2UrU3R1ZGlvL0AzNy43NjY0NjE2LC0xMjIuNDA1Njk5NCwxN3ovZGF0YT0hM20xITRiMSE0bTUhM200ITFzMHg4MDhmN2UzMjkyNzBmN2FmOjB4YWIwMjdiNmRjNjZmYWU2YyE4bTIhM2QzNy43NjY0NjE2ITRkLTEyMi40MDM1MTA3XCIsXCJwaG9uZVwiOjQxNTUwOTM1MDh9LFwid29ya1wiOntcImJlbmVmaXRjb3NtZXRpY3NcIjp7XCJmb2xkZXJcIjpcImJlbmVmaXRjb3NtZXRpY3NcIixcInRpdGxlXCI6XCJiZW5lZml0IGNvc21ldGljc1wiLFwiZGVzY3JpcHRpb25cIjpbXCJCZW5lZml0IENvc21ldGljcyBoYXMgY29pbmVkIHRoZSBib2xkIGFuZCBnaXJseSBwZXJzb25hIGluIHRoZSBjb3NtZXRpY3MgaW5kdXN0cnkuIEFmdGVyIDMwIHBsdXMgeWVhcnMgb2YgYnVzaW5lc3MsIEJlbmVmaXQgZGV2ZWxvcGVkIGEgcmljaCB2aXN1YWwgaGlzdG9yeSB0aGF0IGNvbnRpbnVlcyB0byBzaGFwZSB0aGUgY29tcGFueSdzIGlkZW50aXR5IGFuZCBpbXBhY3RzIHRoZSBiZWF1dHkgaW5kdXN0cnkgYXJvdW5kIHRoZSB3b3JsZC5cIixcIkFzIGEgYnJhbmQsIEJlbmVmaXQgY29udGludWVzIHRvIGV4cGVyaW1lbnQgd2l0aCBjb2xvciwgcGF0dGVybnMsIGFuZCB0eXBlIGV2ZXJ5d2hlcmUgcG9zc2libGUsIHdoZXRoZXIgaXQgYmUgaW4gcHJvZHVjdCBwYWNrYWdpbmcgb3IgcmV0YWlsIHNwYWNlcywgYWxsIHRoZSB3aGlsZSBzdGF5aW5nIHRydWUgdG8gaXRzIHVuaXF1ZSBETkEuIEZlYXR1cmVkIGhlcmUgYXJlIHNhbXBsZXMgb2YgcHJvZHVjdCBwYWNrYWdpbmcgYW5kIG1hcmtldGluZyBjb2xsYXRlcmFsIHdlIGNyZWF0ZWQgZm9yIHRoZSBjb21wYW55LlwiXSxcInNlcnZpY2VzXCI6W1wicHJpbnRcIixcInBhY2thZ2luZ1wiXSxcInByZXZcIjp7XCJuYW1lXCI6XCJmam9yZGxpZmVcIixcImZvbGRlclwiOlwiZmpvcmRsaWZlXCJ9LFwibmV4dFwiOntcIm5hbWVcIjpcInVyYmFuIGtpdGNoZW5cIixcImZvbGRlclwiOlwidXJiYW5raXRjaGVuXCJ9LFwidGlsZXNcIjpbe1wiaW1hZ2VcIjpcIkJlbmVmaXRfMTA3OXg1NTBweF8xLmpwZ1wiLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NTUwLFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJCZW5lZml0XzUyN3g5MzBweF80LmpwZ1wiLFwicmlnaHRcIjp0cnVlLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjo5MzB9LHtcImltYWdlXCI6XCJCZW5lZml0XzUyMHgzNjZweF8yLmpwZ1wiLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjozNjYsXCJzdGFja1wiOnRydWV9LHtcImltYWdlXCI6XCJCZW5lZml0XzUyMHg1MzJweF8zLmpwZ1wiLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjo1MzJ9LHtcImltYWdlXCI6XCJCZW5lZml0XzEwNzl4NjM0cHhfNS5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjYzNCxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQmVuZWZpdF81MjB4NDU1cHhfNi5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6NDU1LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJCZW5lZml0XzUyN3g0NTVweF83LmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjo0NTV9XX0sXCJicm93blwiOntcImZvbGRlclwiOlwiYnJvd25cIixcInRpdGxlXCI6XCJicm93biBlc3RhdGVcIixcImRlc2NyaXB0aW9uXCI6W1wiTmVzdGxlZCBpbiB0aGUgZWFzdGVybiBoaWxscyBvZiBOYXBhIFZhbGxleSwgdGhlIEJyb3duIGZhbWlseSBjb250aW51ZXMgdG8gcHJvZHVjZSBjaGFyaXNtYXRpYyB3aW5lcywgdGhlIHVuY29udmVudGlvbmFsIHdheS5cIixcIldoZW4gYXNrZWQgdG8gcmV2aXZlIHRoZSBicmFuZOKAmXMgZXhpc3RpbmcgaWRlbnRpdHksIHdlIGRlc2lnbmVkIHNldmVyYWwgY29uY2VwdHMgdGhhdCBzcG90bGlnaHQgdGhlIG1lYW5pbmdmdWwgc3RvcmllcyBiZWhpbmQgdGhlIGVzdGF0ZSBhbmQgaXRzIHN5bWJpb3RpYyByZWxhdGlvbnNoaXAgdG8gbW90aGVyIG5hdHVyZS4gU3VuIGRyZW5jaGVkIGltYWdlcnkgZGVmaW5lcyBhIHJpY2ggc2Vuc2Ugb2YgcGxhY2UsIG15c3RlcmlvdXMgaWxsdXN0cmF0aW9ucyBkZXBpY3QgSmFtYWljYW4gZm9sa2xvcmUsIGFuZCBjbGFzc2ljIHR5cG9ncmFwaHkgc3BlbGxzIG91dCBxdW90ZXMgdGhhdCB1bnZlaWwgYSB0cnVlIHNlbnNlIG9mIGNoYXJhY3Rlci5cIl0sXCJzZXJ2aWNlc1wiOltcInN0cmF0ZWd5XCIsXCJicmFuZCBpZGVudGl0eSBjb25jZXB0c1wiLFwicHJpbnQgY29uY2VwdHNcIixcImFydCBkaXJlY3Rpb25cIl0sXCJwcmV2XCI6e1wibmFtZVwiOlwic3VtaVwiLFwiZm9sZGVyXCI6XCJzdW1pXCJ9LFwibmV4dFwiOntcIm5hbWVcIjpcInZpZSBoZWFsaW5nXCIsXCJmb2xkZXJcIjpcInZpZVwifSxcInRpbGVzXCI6W3tcImltYWdlXCI6XCJCcm93bl8xMDc5eDcyNXB4XzEuanBnXCIsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo3MjUsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJyb3duXzUyMHg3NjJweF8yLmpwZ1wiLFwibGVmdFwiOnRydWUsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjc2Mn0se1wiaW1hZ2VcIjpcIkJyb3duXzUyN3gzNjVweF8zLmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjozNjUsXCJzdGFja1wiOnRydWV9LHtcImltYWdlXCI6XCJCcm93bl81Mjd4MzY1cHhfNC5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6MzY1fSx7XCJpbWFnZVwiOlwiQnJvd25fMTA3OXg2MjVweF81LmpwZ1wiLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NjI1LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJCcm93bl8zMzl4NTMwcHhfNi5qcGdcIixcImxlZnRcIjp0cnVlLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjo1MzB9LHtcImltYWdlXCI6XCJCcm93bl8zMzl4NTMwcHhfNy5qcGdcIixcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6NTMwLFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJCcm93bl8zMzl4NTMwcHhfOC5qcGdcIixcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6NTMwfSx7XCJpbWFnZVwiOlwiQnJvd25fNzA3eDcwMHB4XzExLmpwZ1wiLFwid2lkdGhcIjo3MDcsXCJoZWlnaHRcIjo3MDAsXCJyaWdodFwiOnRydWV9LHtcImltYWdlXCI6XCJCcm93bl8zMzl4MjI5cHhfOS5qcGdcIixcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6MjI5LFwic3RhY2tcIjp0cnVlfSx7XCJpbWFnZVwiOlwiQnJvd25fNjc4eDkwMHB4XzEwLmpwZ1wiLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjo0MzksXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJyb3duXzEwNzl4NjI1cHhfMTIuanBnXCIsXCJmdWxsXCI6dHJ1ZSxcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjYyNX0se1wiaW1hZ2VcIjpcIkJyb3duXzUyMHg3NjJweF8xMy5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6NzYyLFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJCcm93bl81Mjd4MzY1cHhfMTQuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjM2NSxcInN0YWNrXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkJyb3duXzUyN3gzNjVweF8xNS5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6MzY1fV19LFwiZWxkZXN0aWxhZG9cIjp7XCJmb2xkZXJcIjpcImVsZGVzdGlsYWRvXCIsXCJ0aXRsZVwiOlwiZWwgZGVzdGlsYWRvXCIsXCJkZXNjcmlwdGlvblwiOltcIlRoZSBiZXN0LWtlcHQgc2VjcmV0IGFtb25nc3QgbG9jYWxzIGFuZCBtZXpjYWwgc2Vla2luZyBhZmljaW9uYWRvcywgRWwgRGVzdGlsYWRvIGlzIGEgT2F4YWNhIGJhc2VkIHNwZWFrZWFzeSBhbmQgbWV6Y2FsZXJpYSBibGVuZGluZyB0aGUgdHJ1ZXN0IGZsYXZvcnMgb2YgTWV4aWNvIHdpdGggcHJvZ3Jlc3NpdmUgZ2FzdHJvbm9teS5cIixcIlZpYnJhbnQgY29sb3JzIGFuZCB0ZXh0dXJlcyBvZiBwYXBlciBhbmQgcGFpbnQgaW1idWUgdGhlIHJlc3RhdXJhbnQncyBpZGVudGl0eSB3aXRoIGEgcmljaCBzZW5zZSBvZiBjdWxpbmFyeSB0cmFkaXRpb25zIGFuZCBmbGF2b3JzLiBUaGUgY29wcGVyIHN0aWxsIGxvZ28sIGNhc3VhbCBrcmFmdC1wYXBlciBtZW51cywgYWdhdmUgc3RhbXBlZCBjb2FzdGVycywgYW5kIHBsYXlmdWwgdmludGFnZSBwb3N0Y2FyZHMgc2Vhc29uIHRoZSBpbnRpbWF0ZSBzcGFjZSwgaW52aXRpbmcgbG9jYWxzIGFuZCB2aXNpdG9ycyBhbGlrZSB0byBwYXJ0YWtlIGluIGFuIGF1dGhlbnRpYyBmb29kIGV4cGVyaWVuY2UuIDxhIGhyZWY9XFxcImh0dHA6Ly93d3cuZWxkZXN0aWxhZG8uY29tL1xcXCI+d3d3LmVsZGVzdGlsYWRvLmNvbTwvYT5cIl0sXCJzZXJ2aWNlc1wiOltcImJyYW5kIGlkZW50aXR5XCIsXCJwcmludFwiLFwiV2ViIERlc2lnblwiXSxcInByZXZcIjp7XCJuYW1lXCI6XCJGdWxsIFN1blwiLFwiZm9sZGVyXCI6XCJmdWxsc3VuXCJ9LFwibmV4dFwiOntcIm5hbWVcIjpcInN1ZmZlcmZlc3QgYmVlciBjb1wiLFwiZm9sZGVyXCI6XCJzdWZmZXJmZXN0XCJ9LFwidGlsZXNcIjpbe1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzEwNzZ4NTUwcHhfMS5qcGdcIixcIndpZHRoXCI6MTA3NixcImhlaWdodFwiOjU1MCxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTIweDM2NnB4XzIuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjM2NixcInN0YWNrXCI6dHJ1ZSxcImxlZlRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTI3eDkzMHB4XzMuanBnXCIsXCJ3aWR0aFwiOjUyNyxcImhlaWdodFwiOjkzMCxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzUyMHg1MzJweF80LmpwZ1wiLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjo1MzJ9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb18xMDc2eDYzNHB4XzUuanBnXCIsXCJ3aWR0aFwiOjEwNzYsXCJoZWlnaHRcIjo2MzQsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzUyMHg0NTVweF82LmpwZ1wiLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjo0NTUsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzUyN3g0NTVweF83LmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjo0NTV9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb181MjB4NjQxcHhfOC5qcGdcIixcImxlZnRcIjp0cnVlLFwiY2xlYXJcIjp0cnVlLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjo2NDF9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb18yNDd4MzA0cHhfOS5qcGdcIixcImxlZnRcIjp0cnVlLFwid2lkdGhcIjoyNDcsXCJoZWlnaHRcIjozMDR9LHtcImltYWdlXCI6XCJFbERlc3RpbGFkb18yNDd4MzA0cHhfMTAuanBnXCIsXCJ3aWR0aFwiOjI0NyxcImhlaWdodFwiOjMwNH0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzUyOHgzMDRweF8xMS5qcGdcIixcIndpZHRoXCI6NTI4LFwiaGVpZ2h0XCI6MzA0fSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fNTIweDQ0NXB4XzEyLmpwZ1wiLFwibGVmdFwiOnRydWUsXCJjbGVhclwiOnRydWUsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjQ0NX0se1wiaW1hZ2VcIjpcIkVsRGVzdGlsYWRvXzUyN3g0NDVweF8xMy5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6NDQ1fSx7XCJpbWFnZVwiOlwiRWxEZXN0aWxhZG9fMTA3Nng1OTZweF8xMi5qcGdcIixcIndpZHRoXCI6MTA3NixcImhlaWdodFwiOjU5Nn1dfSxcImZqb3JkbGlmZVwiOntcImZvbGRlclwiOlwiZmpvcmRsaWZlXCIsXCJ0aXRsZVwiOlwiZmpvcmRsaWZlXCIsXCJkZXNjcmlwdGlvblwiOltcIkEgc3VzdGFpbmFibGUgd29tZW5zd2VhciBicmFuZCBvdXQgdG8gY2xlYW4gdXAgdGhlIGZhc2hpb24gYW5kIGJlYXV0eSBpbmR1c3RyeS5cIixcIlRoZSBicmFuZCBpZGVudGl0eSBhbmQgZS1jb21tZXJjZSBzaXRlIHJlZmxlY3QgdGhlIG9yZ2FuaWMgbGFuZHNjYXBlIG9mIG5vcmRpYyBmam9yZHMgdGhyb3VnaCBhIG5hdHVyYWwgY29sb3IgcGFsZXR0ZSBhbmQgbWluaW1hbCBsYXlvdXQuIE1vZGVybiBhbmQgZ2VvbWV0cmljIHR5cG9ncmFwaHkgcHJvdmlkZSBhIGNsZWFuIGxhbmRzY2FwZSBmb3IgcG9wcyBvZiBpbWFnZXJ5LCB0cmFuc3BvcnRpbmcgc2hvcHBlcnMgYmVoaW5kIHRoZSBzZWFtcyB0byBtZWV0IHRoZSBwZW9wbGUgYW5kIHBsYWNlcyB3aG8gYXJlIG1ha2luZyBhIGRpZmZlcmVuY2UuIDxhIGhyZWY9XFxcImh0dHBzOi8vd3d3LmZqb3JkbGlmZS5jYS9cXFwiPnd3dy5mam9yZGxpZmUuY2E8L2E+XCJdLFwic2VydmljZXNcIjpbXCJTdHJhdGVneVwiLFwiQnJhbmQgSWRlbnRpdHlcIixcIlByaW50XCIsXCJXZWJzaXRlIERlc2lnbiArIERldmVsb3BtZW50XCJdLFwicHJldlwiOntcIm5hbWVcIjpcInZpZSBoZWFsaW5nXCIsXCJmb2xkZXJcIjpcInZpZVwifSxcIm5leHRcIjp7XCJuYW1lXCI6XCJiZW5lZml0IGNvc21ldGljcyBcIixcImZvbGRlclwiOlwiYmVuZWZpdGNvc21ldGljc1wifSxcInRpbGVzXCI6W3tcImltYWdlXCI6XCJGam9yZGxpZmVfMTA3OXg2NzVweF8xLmpwZ1wiLFwiZnVsbFwiOnRydWUsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo2NzV9LHtcImltYWdlXCI6XCJGam9yZGxpZmVfNTg5eDYwMHB4XzQuanBnXCIsXCJyaWdodFwiOnRydWUsXCJ3aWR0aFwiOjU4OSxcImhlaWdodFwiOjYwMH0se1wiaW1hZ2VcIjpcIkZqb3JkbGlmZV80NTZ4Mjg0cHhfMi5qcGdcIixcImxlZnRcIjp0cnVlLFwid2lkdGhcIjo0NTYsXCJoZWlnaHRcIjoyODR9LHtcImltYWdlXCI6XCJGam9yZGxpZmVfNDU2eDI4NHB4XzMuanBnXCIsXCJ3aWR0aFwiOjQ1NixcImhlaWdodFwiOjI4NH0se1wiaW1hZ2VcIjpcIkZqb3JkbGlmZV8xMDc5eDUzNnB4XzUuanBnXCIsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo1MzYsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkZqb3JkbGlmZV81ODd4OTE4cHhfOC5qcGdcIixcIndpZHRoXCI6NTg3LFwiaGVpZ2h0XCI6OTE4LFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRmpvcmRsaWZlXzQ1Nng2NDJweF82LmpwZ1wiLFwid2lkdGhcIjo0NTYsXCJoZWlnaHRcIjo2NDIsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkZqb3JkbGlmZV80NTZ4MjQzcHhfNy5qcGdcIixcIndpZHRoXCI6NDU2LFwiaGVpZ2h0XCI6MjQzfSx7XCJpbWFnZVwiOlwiRmpvcmRsaWZlXzEwNzl4MjAzMXB4XzkuanBnXCIsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjoyMDMxLFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJGam9yZGxpZmVfNTg5eDYwMHB4XzEwLmpwZ1wiLFwid2lkdGhcIjo1ODksXCJoZWlnaHRcIjo2MDAsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkZqb3JkbGlmZV80NTZ4NTk5cHhfMTEuanBnXCIsXCJ3aWR0aFwiOjQ1NixcImhlaWdodFwiOjU5OX1dfSxcImZ1bGxzdW5cIjp7XCJmb2xkZXJcIjpcImZ1bGxzdW5cIixcInRpdGxlXCI6XCJmdWxsIHN1blwiLFwiZGVzY3JpcHRpb25cIjpbXCJJbnNwaXJlZCBieSBDYWxpZm9ybmlh4oCZcyB3YXJtIGFuZCBpbnZpZ29yYXRpbmcgc3Vuc2hpbmUsIEZ1bGwgU3VuIGlzIGEgMTAwJSBhbGwtbmF0dXJhbCwgc3VzdGFpbmFibHkgZmFybWVkIGNhbm5hYmlzLiBQcm91ZGx5IHJhaXNlZCB1bmRlciB0aGUgc3VuYmVsdCBvZiBIdW1ib2xkdCBDb3VudHksIHRoaXMgYnJhbmTigJlzIHByb2R1Y3QgbGluZSBpcyBhIHJlc3VsdCBvZiBtZWxsb3cgb2NlYW4gYnJlZXplcywgdG93ZXJpbmcgUmVkd29vZHMgYW5kIHN1bi1kcmVuY2hlZCBoaWxsc2lkZXMsIHlpZWxkaW5nIGNhbm5hYmlzIG9mIHVucGFyYWxsZWxlZCBxdWFsaXR5LCB0YXN0ZSwgYW5kIHBlcmZvcm1hbmNlLlwiLFwiV2Ugc2F3IGFuIG9wcG9ydHVuaXR5IHRvIHNoYWtlIHVwIHRoZSBldmVyLWdyb3dpbmcgY2FubmFiaXMgc3BhY2Ugd2l0aCBhIGZyZXNoIGFwcHJvYWNoIGZ1bGwgb2YgQ2FsaWZvcm5pYSBzb3VsLiBUaGUgcHJvZHVjdCBwYWNrYWdpbmcgcGFpcnMgcmV0cm8gdHlwb2dyYXBoeSB3aXRoIGJyaWdodCBjb2xvcnMgYW5kIG1vZGVybiBnZW9tZXRyaWMgcGF0dGVybnMuIEEgYm9sZCBncmFkaWVudCBpbnNwaXJlZCBieSBuYXR1cmXigJlzIHNraWVzIGFuZCBzcGxhc2hlcyBvZiBnb2xkIGZvaWwgYWRkIGEgYnVyc3Qgb2YgcHJlbWl1bSBzaGluZS4gPGEgaHJlZj1cXFwiaHR0cHM6Ly93d3cuZnVsbC1zdW4uY29tXFxcIj53d3cuZnVsbC1zdW4uY29tPC9hPlwiXSxcInNlcnZpY2VzXCI6W1wiYnJhbmQgaWRlbnRpdHlcIixcInBhY2thZ2luZ1wiLFwiY29weXdyaXRpbmdcIixcIndlYiBkZXNpZ24gKyBkZXZlbG9wbWVudFwiLFwiTW9iaWxlIEFwcHNcIl0sXCJuZXh0XCI6e1wibmFtZVwiOlwiRWwgRGVzdGlsYWRvXCIsXCJmb2xkZXJcIjpcImVsZGVzdGlsYWRvXCJ9LFwidGlsZXNcIjpbe1wiaW1hZ2VcIjpcIkZ1bGxTdW5fNjg0eDUyNXB4XzEuanBnXCIsXCJ3aWR0aFwiOjY4NCxcImhlaWdodFwiOjUyNSxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiRnVsbFN1bl8zNjR4NTI1cHhfMi5qcGdcIixcIndpZHRoXCI6MzY0LFwiaGVpZ2h0XCI6NTI1fSx7XCJpbWFnZVwiOlwiRnVsbFN1bl8xMDc4eDUzN3B4XzMuanBnXCIsXCJ3aWR0aFwiOjEwNzgsXCJoZWlnaHRcIjo1MzcsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIkZ1bGxTdW5fNTEyeDQ1M3B4XzQuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcIndpZHRoXCI6NTEyLFwiaGVpZ2h0XCI6NDUzfSx7XCJpbWFnZVwiOlwiRnVsbFN1bl81MzZ4NDUzcHhfNS5qcGdcIixcIndpZHRoXCI6NTM1LFwiaGVpZ2h0XCI6NDUzfSx7XCJpbWFnZVwiOlwiRnVsbFN1bl8xMDc4eDUzN3B4XzYuanBnXCIsXCJmdWxsXCI6dHJ1ZSxcIndpZHRoXCI6MTA3OCxcImhlaWdodFwiOjUzN30se1wiaW1hZ2VcIjpcIkZ1bGxTdW5fNTEyeDQ1M3B4XzcuanBnXCIsXCJsZWZ0XCI6dHJ1ZSxcIndpZHRoXCI6NTEyLFwiaGVpZ2h0XCI6NDUzfSx7XCJpbWFnZVwiOlwiRnVsbFN1bl81MzZ4MjA4cHhfOC5qcGdcIixcIndpZHRoXCI6NTM2LFwiaGVpZ2h0XCI6MjA4LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJGdWxsU3VuXzUzNngyMDhweF85LmpwZ1wiLFwid2lkdGhcIjo1MzYsXCJoZWlnaHRcIjoyMDh9XX0sXCJzdWZmZXJmZXN0XCI6e1wiZm9sZGVyXCI6XCJzdWZmZXJmZXN0XCIsXCJ0aXRsZVwiOlwic3VmZmVyZmVzdFwiLFwiZGVzY3JpcHRpb25cIjpbXCJTdWZmZXJmZXN0IEJlZXIgQ29tcGFueSB3YXMgYm9ybiBvdXQgb2YgYSBuZWVkIHRvIHByb3ZpZGUgYSBnbHV0ZW4tcmVtb3ZlZCBiZWVyIHRoYXQgZG9lc27igJl0IGNvbXByb21pc2Ugb24gdGFzdGUgb3IgcXVhbGl0eS5cIixcIldlIHBhcnRuZXJlZCB3aXRoIFN1ZmZlcmZlc3QgdG8gZGVzaWduIGEgYmVlciB0aGF0IGNlbGVicmF0ZXMgdGhlIGNvbXBhbnnigJlzIG1hbnRyYTog4oCcbWVkYWxzIGZvciBhIGpvYiB3ZWxsIGRvbmUu4oCdIFRoZSB2aWN0b3Jpb3VzIGZpc3QgaWNvbiBjb21tdW5pY2F0ZXMgdGhlIGJyYW5k4oCZcyBhYmlsaXR5IHRvIG92ZXJjb21lIHRoZSBsaW1pdGF0aW9ucyBvZiB1c2luZyBiYXJsZXkgaW4gYSBnbHV0ZW4tZnJlZSBiZWVyLiBDcmlzcCB3aGl0ZSBjYW5zIGZlYXR1cmluZyBhIGxpbmUgb2YgZGlzdGluZ3Vpc2hlZCBjb2xvciByaWJib25zIGFuZCBib2xkIHR5cG9ncmFwaHkgY3JlYXRlIGEgd2lubmluZyBjb21iaW5hdGlvbi5cIl0sXCJzZXJ2aWNlc1wiOltcImJyYW5kIGlkZW50aXR5XCIsXCJzdHJhdGVneVwiLFwicGFja2FnaW5nXCIsXCJwcmludFwiXSxcInByZXZcIjp7XCJuYW1lXCI6XCJFbCBEZXN0aWxhZG9cIixcImZvbGRlclwiOlwiZWxkZXN0aWxhZG9cIn0sXCJuZXh0XCI6e1wibmFtZVwiOlwic3VtaVwiLFwiZm9sZGVyXCI6XCJzdW1pXCJ9LFwidGlsZXNcIjpbe1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfNjg0eDUyNXB4XzEuanBnXCIsXCJ3aWR0aFwiOjY4NCxcImhlaWdodFwiOjUyNSxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF8zNjR4NTI1cHhfMi5qcGdcIixcIndpZHRoXCI6MzY0LFwiaGVpZ2h0XCI6NTI1fSx7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF81MjB4MzY2cHhfMy5qcGdcIixcIndpZHRoXCI6NTIwLFwiaGVpZ2h0XCI6MzY2LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJTdWZmZXJmZXN0XzUyOHgzNjZweF80LmpwZ1wiLFwid2lkdGhcIjo1MjgsXCJoZWlnaHRcIjozNjYsXCJyaWdodFwiOnRydWV9LHtcImltYWdlXCI6XCJTdWZmZXJmZXN0XzMzOXg1MzBweF81LmpwZ1wiLFwid2lkdGhcIjozMzksXCJoZWlnaHRcIjo1MzAsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfMzM5eDUzMHB4XzYuanBnXCIsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjUzMCxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF8zMzl4NTMwcHhfNy5qcGdcIixcIndpZHRoXCI6MzM5LFwiaGVpZ2h0XCI6NTMwfSx7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF8xMDcyeDYzMHB4XzguanBnXCIsXCJ3aWR0aFwiOjEwNzIsXCJoZWlnaHRcIjo2MzAsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfNTE5eDQ1N3B4XzkuanBnXCIsXCJ3aWR0aFwiOjUxOSxcImhlaWdodFwiOjQ1NyxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VmZmVyZmVzdF81MjZ4MjA3cHhfMTAuanBnXCIsXCJ3aWR0aFwiOjUyNixcImhlaWdodFwiOjIwNyxcInN0YWNrXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1ZmZlcmZlc3RfNTI2eDIwN3B4XzExLmpwZ1wiLFwid2lkdGhcIjo1MjYsXCJoZWlnaHRcIjoyMDd9XX0sXCJzdW1pXCI6e1wiZm9sZGVyXCI6XCJzdW1pXCIsXCJ0aXRsZVwiOlwic3VtaVwiLFwiZGVzY3JpcHRpb25cIjpbXCJBIGNhc3VhbC1jaGljIGtpbW9ubyBjby4sIFN1bWkgY3JlYXRlcyBhbmQgcHJvZHVjZXMgc2lsayBhbmQgY2hhcm1ldXNlIGJvdGFuaWNhbCBwcmludCBraW1vbm9zLiBFYWNoIHJvYmUgZmVhdHVyZXMgYW4gb3JpZ2luYWwgcGF0dGVybiwgZmlyc3Qgc2tldGNoZWQgYnkgaGFuZCwgdGhlbiBzYXR1cmF0ZWQgaW4gcmljaCB3YXRlcmNvbG9ycyB1c2luZyBhIHRyYWRpdGlvbmFsIHN1bWkgcGFpbnRicnVzaC5cIixcIlRoZSBjb21wbGV0ZSByZWRlc2lnbiBvZiB0aGUgYnJhbmTigJlzIHZpc3VhbCBpZGVudGl0eSBzeXN0ZW0gYmVnYW4gd2l0aCBhIG5ldyBuYW1lOiBTVU1JLiBJbnNwaXJlZCBieSB0aGUgcGFpbnRicnVzaCB1c2VkIHRvIGNyZWF0ZSBlYWNoIGtpbW9ub3MgZGVzaWducywgdGhlIG5ldyBuYW1lIHVudmVpbHMgYSBkZWVwZXIgY29ubmVjdGlvbiB0byB0aGUgdHJhZGl0aW9ucyBiZWhpbmQgQ2hpbmVzZSBicnVzaHdvcmsgaW4gY2FsbGlncmFwaHkgYW5kIHBhaW50aW5nLiBNb2Rlcm4gdHlwb2dyYXBoeSBjb3VwbGVkIHdpdGggZXRoZXJlYWwgZmxvcmFsIGRlc2lnbnMgYW5kIGEgc29mdCBjb2xvciBwYWxldHRlLCB0aGUgYnJhbmTigJlzIG5ldyBpZGVudGl0eSBpcyB0YWlsb3JlZCB0byB0aGUgdHJhZGl0aW9uIG9mIHRoZWlyIHRpbWVsZXNzIGtpbW9ub3MuXCJdLFwic2VydmljZXNcIjpbXCJzdGF0ZWd5XCIsXCJuYW1pbmdcIixcImNvcHl3cml0aW5nXCIsXCJicmFuZCBpZGVudGl0eVwiLFwicHJpbnRcIl0sXCJwcmV2XCI6e1wibmFtZVwiOlwic3VmZmVyZmVzdCBiZWVyIGNvXCIsXCJmb2xkZXJcIjpcInN1ZmZlcmZlc3RcIn0sXCJuZXh0XCI6e1wibmFtZVwiOlwiYnJvd24gZXN0YXRlXCIsXCJmb2xkZXJcIjpcImJyb3duXCJ9LFwidGlsZXNcIjpbe1wiaW1hZ2VcIjpcIlN1bWlfNTIweDc2MnB4XzEuanBnXCIsXCJ3aWR0aFwiOjUyMCxcImhlaWdodFwiOjc2MixcImxlZlRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV81Mjd4MzY1cHhfMi5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6MzY1LFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV81Mjd4MzY1cHhfMy5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6MzY1LFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV8xMDc5eDYyNXB4XzQuanBnXCIsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo2MjUsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfNzEweDcxMHB4XzcuanBnXCIsXCJ3aWR0aFwiOjcxMCxcImhlaWdodFwiOjcxMCxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfMzM5eDIyOXB4XzUuanBnXCIsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjIyOSxcInN0YWNrXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfMzM5eDQ1MHB4XzYuanBnXCIsXCJ3aWR0aFwiOjMzOSxcImhlaWdodFwiOjQ1MH0se1wiaW1hZ2VcIjpcIlN1bWlfMTA3OXg2MjVweF84LmpwZ1wiLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NjI1LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJTdW1pXzUyMHg3NjJweF85LmpwZ1wiLFwid2lkdGhcIjo1MjAsXCJoZWlnaHRcIjo3NjIsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlN1bWlfNTI3eDM2NXB4XzEwLmpwZ1wiLFwid2lkdGhcIjo1MjcsXCJoZWlnaHRcIjozNjUsXCJzdGFja1wiOnRydWV9LHtcImltYWdlXCI6XCJTdW1pXzUyN3gzNjVweF8xMS5qcGdcIixcIndpZHRoXCI6NTI3LFwiaGVpZ2h0XCI6MzY1fSx7XCJpbWFnZVwiOlwiU3VtaV83MTB4NTMwcHhfMTIuanBnXCIsXCJ3aWR0aFwiOjcxMCxcImhlaWdodFwiOjUzMCxcImxlZnRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiU3VtaV8zMzl4NTMwcHhfMTMuanBnXCIsXCJ3aWR0aFwiOjMzOCxcImhlaWdodFwiOjUzMCxcInJpZ2h0XCI6dHJ1ZX1dfSxcInVyYmFua2l0Y2hlblwiOntcImZvbGRlclwiOlwidXJiYW5raXRjaGVuXCIsXCJ0aXRsZVwiOlwidXJiYW5raXRjaGVuXCIsXCJkZXNjcmlwdGlvblwiOltcIkEgY29sbGFib3JhdGl2ZSBjdWxpbmFyeSBraXRjaGVuIHRlYWNoaW5nIGl0cyBuZWlnaGJvcnMgZnJvbSBhcm91bmQgTEEgaG93IHRvIHNhdm9yIHRoZSBtb21lbnQuXCIsXCJUaGUgcmVkZXNpZ24gb2YgdGhlIGJyYW5k4oCZcyBpZGVudGl0eSBiZWdhbiB3aXRoIHJlY29ubmVjdGluZyB0byB0aGUgb3duZXLigJlzIEl0YWxpYW4gcm9vdHMuIFZpYnJhbnQgYmx1ZXMgYW5kIHJlZHMgbm9kIHRvIHRoZSBiYXJvcXVlIHRpbGVzIGFuZCB0ZXJyYWNvdHRhIHdhbGxzIGZvdW5kIGluIHRyYWRpdGlvbmFsIEl0YWxpYW4ga2l0Y2hlbnMuIFRoZSBsb2dvdHlwZSBpcyBpbnNwaXJlZCBieSAxOTMw4oCZcyB2aW50YWdlIEl0YWxpYW4gcGFzdGEgcGFja2FnaW5nLiBJbWFnZXJ5IG9mIHRoZSBzcGFjZSBhbmQgY2FuZGlkcyBvZiB0aGUgcGVvcGxlIHdobyBmaWxsIGl0IGdhcm5pc2ggdGhlIGVjb21tZXJjZSBzaXRlLCBpbGx1bWluYXRpbmcgdGhlIGVtb3Rpb25hbCBib25kcyBjcmVhdGVkIG92ZXIgZm9vZC48YSBocmVmPVxcXCJodHRwczovL3d3dy51cmJhbmtpdGNoZW4tbGEuY29tL1xcXCI+d3d3LnVyYmFua2l0Y2hlbi1sYS5jb208L2E+XCJdLFwic2VydmljZXNcIjpbXCJzdHJhdGVneVwiLFwiYnJhbmQgaWRlbnRpdHlcIixcInByaW50XCIsXCJXZWJzaXRlIERlc2lnbiArIERldmVsb3BtZW50XCIsXCJQaG90b2dyYXBoeVwiXSxcInByZXZcIjp7XCJuYW1lXCI6XCJiZW5lZml0IGNvc21ldGljcyBcIixcImZvbGRlclwiOlwiYmVuZWZpdGNvc21ldGljc1wifSxcIm5leHRcIjp7XCJuYW1lXCI6XCJmdWxsIHN1blwiLFwiZm9sZGVyXCI6XCJmdWxsc3VuXCJ9LFwidGlsZXNcIjpbe1wiaW1hZ2VcIjpcIlVyYmFuXzY4NHg1MjVweF8xLmpwZ1wiLFwibGVmdFwiOnRydWUsXCJ3aWR0aFwiOjY4NCxcImhlaWdodFwiOjUyNX0se1wiaW1hZ2VcIjpcIlVyYmFuXzM2NHg1MjVweF8yLmpwZ1wiLFwid2lkdGhcIjozNjQsXCJoZWlnaHRcIjo1MjV9LHtcImltYWdlXCI6XCJVcmJhbl8xMDc5eDUzN3B4XzMuanBnXCIsXCJmdWxsXCI6dHJ1ZSxcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjUzN30se1wiaW1hZ2VcIjpcIlVyYmFuXzUzNHg3MzdweF80LmpwZ1wiLFwid2lkdGhcIjo1MzQsXCJoZWlnaHRcIjo3MzcsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlVyYmFuXzUxN3gzNTZweF81LmpwZ1wiLFwid2lkdGhcIjo1MTQsXCJoZWlnaHRcIjozNTYsXCJyaWdodFwiOnRydWV9LHtcImltYWdlXCI6XCJVcmJhbl81MTd4MzUycHhfNi5qcGdcIixcIndpZHRoXCI6NTE0LFwiaGVpZ2h0XCI6MzUyLFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVXJiYW5fMTA3OXg2NTVweF83LmpwZ1wiLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NjU1LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJVcmJhbl81MDh4Njg4cHhfOC5qcGdcIixcIndpZHRoXCI6NTA4LFwiaGVpZ2h0XCI6Njg4LFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJVcmJhXzU0M3g2ODhweF85LmpwZ1wiLFwid2lkdGhcIjo1NDAsXCJoZWlnaHRcIjo2ODgsXCJyaWdodFwiOnRydWV9LHtcImltYWdlXCI6XCJVcmJhbl8zNzB4NTI1cHhfMTAuanBnXCIsXCJ3aWR0aFwiOjM3MCxcImhlaWdodFwiOjUyNSxcImxlZnRcIjp0cnVlLFwiY2xlYXJcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVXJiYW5fNjgxeDUyNXB4XzExLmpwZ1wiLFwid2lkdGhcIjo2NzgsXCJoZWlnaHRcIjo1MjV9LHtcImltYWdlXCI6XCJVcmJhbl8xMDc5eDUzN3B4XzEyLmpwZ1wiLFwiZnVsbFwiOnRydWUsXCJ3aWR0aFwiOjEwNzksXCJoZWlnaHRcIjo1Mzd9XX0sXCJ2aWVcIjp7XCJmb2xkZXJcIjpcInZpZVwiLFwidGl0bGVcIjpcInZpZSBoZWFsaW5nXCIsXCJkZXNjcmlwdGlvblwiOltcIkEgaG9saXN0aWMgaGVhbGluZyBhcHByb2FjaCB0aGF0IGJyaW5ncyBoYXJtb255IHRvIHRoZSBtaW5kLCBib2R5LCBhbmQgc3Bpcml0LlwiLFwiVGhlIGlkZW50aXR5IGFuZCBwYWNrYWdpbmcgZHJhd3Mgb24gb3JnYW5pYyBjb2xvcnMgYW5kIHRleHR1cmVzIGZvdW5kIGluIGxvb3NlIGxlYWYgdGVhcyBhbmQgaGVyYmFsIHN1cHBsZW1lbnRzLiBCb2xkIHR5cG9ncmFwaHksIHRvbmUgb24gdG9uZSBsYXllcmluZywgYW5kIGRlbGljYXRlIGxpbmVzIG9mIGdvbGQgZm9pbCBldm9rZSBhIG5ldyBzb3BoaXN0aWNhdGlvbiB0byBob21lIHJlbWVkaWVzIGZvciBldmVyeWRheSBoZWFsaW5nLiA8YSBocmVmPVxcXCJodHRwczovL3d3dy52aWVoZWFsaW5nLmNvbS9cXFwiPnd3dy52aWVoZWFsaW5nLmNvbTwvYT5cIl0sXCJzZXJ2aWNlc1wiOltcInN0cmF0ZWd5XCIsXCJicmFuZCBpZGVudGl0eVwiLFwicGFja2FnaW5nXCIsXCJwcmludFwiLFwicHJvZHVjdCBkZXZlbG9wbWVudFwiLFwiV2Vic2l0ZSBEZXNpZ24gKyBEZXZlbG9wbWVudFwiLFwiUGhvdG9ncmFwaHlcIl0sXCJwcmV2XCI6e1wibmFtZVwiOlwiYnJvd24gZXN0YXRlXCIsXCJmb2xkZXJcIjpcImJyb3duXCJ9LFwibmV4dFwiOntcIm5hbWVcIjpcImZqb3JkbGlmZVwiLFwiZm9sZGVyXCI6XCJmam9yZGxpZmVcIn0sXCJ0aWxlc1wiOlt7XCJpbWFnZVwiOlwiVmllXzEwNzl4NTM3cHhfMS5qcGdcIixcIndpZHRoXCI6MTA3OSxcImhlaWdodFwiOjUzNyxcImZ1bGxcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVmllXzY4NHg1MjVweF8yLmpwZ1wiLFwid2lkdGhcIjo2ODQsXCJoZWlnaHRcIjo1MjUsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlZpZV8zNjR4NTI1cHhfMy5qcGdcIixcIndpZHRoXCI6MzY0LFwiaGVpZ2h0XCI6NTI1fSx7XCJpbWFnZVwiOlwiVmllXzUxMng0NTNweF80LmpwZ1wiLFwibGVmdFwiOnRydWUsXCJ3aWR0aFwiOjUxMixcImhlaWdodFwiOjQ1M30se1wiaW1hZ2VcIjpcIlZpZV81MzZ4NDUzcHhfNS5qcGdcIixcIndpZHRoXCI6NTM2LFwiaGVpZ2h0XCI6NDUzfSx7XCJpbWFnZVwiOlwiVmllXzEwNzl4NTM3cHhfNi5qcGdcIixcImZ1bGxcIjp0cnVlLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NTM3fSx7XCJpbWFnZVwiOlwiVmllXzY4M3g2MjZweF83LmpwZ1wiLFwid2lkdGhcIjo2ODMsXCJoZWlnaHRcIjo2MjZ9LHtcImltYWdlXCI6XCJWaWVfMzY2eDIwOHB4XzguanBnXCIsXCJ3aWR0aFwiOjM2NixcImhlaWdodFwiOjIwOCxcInJpZ2h0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlZpZV8zNjZ4Mzg3cHhfOS5qcGdcIixcIndpZHRoXCI6MzY2LFwiaGVpZ2h0XCI6Mzg3LFwicmlnaHRcIjp0cnVlfSx7XCJpbWFnZVwiOlwiVmllXzM2NHg1MjVweF8xMC5qcGdcIixcIndpZHRoXCI6MzY0LFwiaGVpZ2h0XCI6NTI1LFwiY2xlYXJcIjp0cnVlLFwibGVmdFwiOnRydWV9LHtcImltYWdlXCI6XCJWaWVfNjg0eDUyNXB4XzExLmpwZ1wiLFwid2lkdGhcIjo2ODQsXCJoZWlnaHRcIjo1MjUsXCJmdWxsXCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlZpZV8xMDc5eDUzN3B4XzEyLmpwZ1wiLFwid2lkdGhcIjoxMDc5LFwiaGVpZ2h0XCI6NTM3LFwiZnVsbFwiOnRydWV9LHtcImltYWdlXCI6XCJWaWVfMzY0eDYyNnB4XzEzLmpwZ1wiLFwid2lkdGhcIjozNjQsXCJoZWlnaHRcIjo2MjYsXCJsZWZ0XCI6dHJ1ZX0se1wiaW1hZ2VcIjpcIlZpZV82ODV4NjI2cHhfMTQuanBnXCIsXCJ3aWR0aFwiOjY4NCxcImhlaWdodFwiOjYyNixcInJpZ2h0XCI6dHJ1ZX1dfX19OyIsIkluZGV4ID1cblxuICBpOiAtPlxuICAgIEJsdXJsb2FkLmkoKVxuXG4gICAgQGhhbmRsZXJzKClcblxuICBoYW5kbGVyczogLT5cblxuICAgICQoJy5idXJnZXInKS5jbGljayBAbW9iaWxlXG5cblxuICBtb2JpbGU6IC0+XG5cbiAgICBfLnN3YXAgJy5idXJnZXInXG4gICAgXy5zd2FwICcubW9iaWxlJ1xuIl19
