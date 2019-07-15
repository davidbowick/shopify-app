/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var $special = 'Special Order';
var preloader = $('<svg width="30px"  height="30px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;"><circle cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" stroke="#ffffff" stroke-width="10" r="25" stroke-dasharray="117.80972450961724 41.269908169872416" transform="rotate(41.2639 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>');
var DEBOUNCE_TIME = 500;

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

;

function showHide() {
  var draftOrders = '#create-draft-order',
      draftOrderProduct = '.draft-order__saved-product',
      productListItem = '.product-list__product',
      clearButton = '#clear-results',
      productList = '.product-list__hidden';
  $(draftOrderProduct).length ? fadeIn(draftOrders) : fadeOut(draftOrders);
  $(productListItem).length ? fadeIn(clearButton) : fadeOut(clearButton);
  $(productListItem).length ? $(productList).removeClass('nopacity') : $(productList).addClass('nopacity');
}

function fadeIn(obj) {
  $(obj).fadeIn();
}

function fadeOut(obj) {
  $(obj).fadeOut();
}

var objectifier = function objectifier(splits, create, context) {
  var result = context || window;

  for (var i = 0, s; result && (s = splits[i]); i++) {
    result = s in result ? result[s] : create ? result[s] = {} : undefined;
  }

  return result;
};

function addSpecialInputs(inputs) {
  /* Jamb */

  /*
  var jambOptions = ['6\"','4\"','8\"'];
  var jamb = $('<div class="special__input grid__item field"><label>Jamb</label><select class="jamb" name="jamb[]"></select></div>').appendTo(inputs);
  $.each(jambOptions,function(index,value) {
  	$(jamb).find('select').append('<option value="'+value.replace('"','\"')+'">'+value+'</option>');
  });
  */

  /* Glass */
  var colorOptions = ['Oil Rubbed Bronze', 'Heavy Bronze', 'Silver Pewter', 'Black', 'Pewter'];
  var color = $('<div class="special__input grid__item field"><label>Color</label><select class="color" name="color[]"></select></div>').appendTo(inputs);
  $.each(colorOptions, function (index, value) {
    $(color).find('select').append('<option value="' + value.replace('"', '\"') + '">' + value + '</option>');
  });
  /* Glass */

  var glassOptions = ['Low-E', 'Sandblast/Frost', 'Flemish', 'Rain', 'Aquatex', 'Rainbow', 'Ford Blue', 'Tea', 'Water Cube'];
  var glass = $('<div class="special__input grid__item field"><label>Glass</label><select class="glass" name="glass[]"></select></div>').appendTo(inputs);
  $.each(glassOptions, function (index, value) {
    $(glass).find('select').append('<option value="' + value.replace('"', '\"') + '">' + value + '</option>');
  });
  /* Swing */

  var swingOptions = ['Left-Hand - In swing', 'Left-Hand - Out swing', 'Right-Hand - In swing', 'Right-Hand - Out swing'];
  var swing = $('<div class="special__input grid__item field"><label>Swing</label><select name="swing[]"></select></div>').appendTo(inputs);
  $.each(swingOptions, function (index, value) {
    $(swing).find('select').append('<option value="' + value.replace('"', '\"') + '">' + value + '</option>');
  });
} // Gets or sets an object


jQuery.obj = function (name, value, create, context) {
  // Setter
  if (value != undefined) {
    var splits = name.split("."),
        s = splits.pop(),
        result = objectifier(splits, true, context);
    return result && s ? result[s] = value : undefined;
  } else {
    return objectifier(name.split("."), create, context);
  }
};

var APP_DOMAIN = 'https://draftorders.wick-apps.com'; // SHOP_DOMAIN = '//ard-dev.myshopify.com';

$(function () {
  var MIN_LENGTH = 3,
      CURRENT_QUERY = '',
      FIELD = '#add-product';
  $(FIELD).focus();
  /* Find Products */

  $(FIELD).keyup(debounce(function () {
    var keyword = $(this).val();

    if (keyword.length >= MIN_LENGTH && CURRENT_QUERY != keyword) {
      CURRENT_QUERY = keyword;
      $('.main-preloader').fadeIn();
      $.ajax({
        url: APP_DOMAIN + '/products/' + keyword,
        success: function success(d) {
          // console.log(d);
          $('.product-list__hidden').empty();
          $(d).each(function (i, p) {
            console.log(p);
            var $title = p.node.title,
                id = p.node.id,
                handle = p.node.handle,
                imageSrc = p.node.featuredImage.transformedSrc;
            var obj = $('<div class="product-list__product flex"></div>');
            var image = $('<div class="product-list__image"><img src="' + imageSrc + '" width="90" /></div>').appendTo(obj);
            var details = $('<div class="product-list__details"></div></div>').appendTo(obj);
            var title = $('<div class="draft-order__title"><h5>' + $title + '</h5></div>').appendTo(details);
            var select = $('<select class="variant-list__variants"></select>').appendTo(details);
            var inputs = $('<div class="flex flex--wrap grid--half-gutters"></div>').appendTo(details); // var qty = $('<div class="grid__item field"><label>Qty</label><input class="variant-quantity" name="quantity[]" type="number" value="1"></div>').appendTo(details);

            if ($title.indexOf($special) > -1) {
              addSpecialInputs(inputs);
            } // var ul = $('<ul class="variant-list__variant"></ul>').appendTo(details);


            $('.product-list__hidden').append(obj);
            $(p.node.variants.edges).each(function (i, v) {
              // console.log(v);
              var vTitle = v.node.title,
                  vId = v.node.id;
              $(select).append('<option data-image="' + imageSrc + '" data-product-title="' + $title + '" data-variant-title="' + vTitle + '" data-variant-id="' + vId + '" value="' + vId + '">' + vTitle + '</option>'); // $(ul).append('<li><a class="product-list__link" href="#" data-image="'+imageSrc+'" data-title="'+vTitle+'" data-variant-id="'+vId+'">'+vTitle+'</a></li>');
            });
            $(select).wrap('<div class="field"/>');
            var addBtn = $('<a href="#" class="product-list__add btn">Add</a>').appendTo(details);
            $('.main-preloader').fadeOut();
          });
          showHide();
        },
        error: function error(e) {
          console.log(e);
        }
      });
    }
  }, DEBOUNCE_TIME));
  /* on Product list add click */

  $(document).on('click', '.product-list__add', function (e) {
    e.preventDefault();
    var $this = $(this),
        $parent = $this.closest('.product-list__product'),
        $select = $parent.find('.variant-list__variants option:selected'),
        $id = $select.data('variant-id').split('/').pop(),
        $title = $select.data('product-title'),
        $variantTitle = $select.data('variant-title'),
        $image = $select.data('image'),
        $savedProducts = '.draft-order__saved-products',
        $specialInputs = $parent.find('.special__input'),
        $special = 'Joy';
    console.log($id, $title); // var titleSplit = $title.split(' - ');

    var obj = $('<div class="draft-order__saved-product flex" style="display: none;"></div>').appendTo($savedProducts);
    var img = $('<div class="draft-order__image"><img src="' + $image + '"></div>').appendTo(obj);
    var desc = $('<div class="draft-order__description"></div>').appendTo(obj);
    var title = $('<div class="draft-order__title"><h5>' + $title + '</h5></div>').appendTo(desc);
    var variantTItle = $('<div>' + $variantTitle + '</div>').appendTo(title);
    var inputs = $('<div class="flex flex--wrap grid--half-gutters"></div>').appendTo(desc);
    var qty = $('<div class="grid__item field"><label>Qty</label><input class="variant-quantity" name="quantity[]" type="number" value="1"></div>').appendTo(inputs);
    var hiddenInput = $('<input type="hidden" value="' + $id + '" class="variant-id" name="variant_id[]">').appendTo(inputs);

    if ($specialInputs.length) {
      var specialArray = [];
      $specialInputs.each(function (index, value) {
        var myVal = $(this).find('option:selected').text();
        myProperty = $(this).find('label').text();
        specialArray.push(myVal); // var myVal = $(this).val();

        inputs.append('<input type="hidden" class="' + myProperty.toLowerCase() + '" name="properties[' + myProperty + ']" value="' + myVal.replace('"', '˝') + '">');
      });
      var specialString = $('<p>' + specialArray.join(' / ') + '</p>').appendTo(title);
    }

    var remove = $('<a class="draft-order__remove" href="#">Remove</a>').appendTo(desc);
    $(obj).fadeIn();
    showHide();
  });
  $('#clear-results').on('click', function (e) {
    e.preventDefault();
    $('.product-list__hidden').empty();
    showHide();
  });
  $(document).on('click', '.draft-order__remove', function (e) {
    e.preventDefault();
    $(this).closest('.draft-order__saved-product').remove();
    showHide();
  }); //$('#createDraftOrder').append(preloader);
  // $(document).on('click','')

  $('#create-draft-order').submit(function (e) {
    var createDraftOrderBtn = '#createDraftOrder';
    $(createDraftOrderBtn).empty().append(preloader);
    e.preventDefault();
    var obj = {
      "draft_order": {
        "line_items": []
      }
    }; // var obj = [];

    var totalSaved = $('.draft-order__saved-product').length;
    $('.draft-order__saved-product').each(function (index, value) {
      if (index === totalSaved - 1) {
        $(this).addClass('.last');
      }

      var $this = $(this),
          variantId = $this.find('.variant-id').val(),
          variantQty = $this.find('.variant-quantity').val(),
          variantColor = $this.find('.color').length ? $this.find('.color').val() : '',
          variantGlass = $this.find('.glass').length ? $this.find('.glass').val() : '',
          variantSwing = $this.find('.swing').length ? $this.find('.swing').val() : '';
      var $lineItem = {
        "variant_id": parseInt(variantId),
        "quantity": parseInt(variantQty),
        "properties": []
      };
      var $lineItems = obj.draft_order.line_items;
      $lineItems.push($lineItem);
      var props = $lineItem.properties;

      if (variantColor) {
        var properties = {
          "name": "Color",
          "value": variantColor
        };
        props.push(properties);
      }

      if (variantGlass) {
        var properties = {
          "name": "Glass",
          "value": variantGlass
        };
        props.push(properties);
      }

      if (variantSwing) {
        var properties = {
          "name": "Swing",
          "value": variantSwing
        };
        props.push(properties);
      }

      if ($('#current-customer .user-list__user-info').length) {
        var customerId = $('#current-customer').data('customer-id');
        var customerNode = {
          "id": customerId
        };
        obj.draft_order.customer = customerNode;
        obj.draft_order.use_customer_default_address = true;
      }
    }); //console.log(obj);

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('input[name="_token"]').val()
      }
    });
    console.log(obj);
    $.ajax({
      method: "POST",
      headers: {
        'X-CSRF-TOKEN': $('input[name="_token"]').val()
      },
      url: '/draft-order',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(obj),
      success: function success(data) {
        console.log('successfully sent!');
        $(createDraftOrderBtn).hide();
        $(createDraftOrderBtn).find('svg').hide();
        var myId = data.body.draft_order.id;
        var myHref = $('#gotoDraftOrder a').attr('href') + myId;
        $('#gotoDraftOrder').show().find('a').attr('href', myHref);
      },
      error: function error(data) {
        console.log('errr, nope'); // console.log(data);
      }
    });
  });
  $(document).on('click', '.btn--start-over', function (e) {
    e.preventDefault();
    $('.draft-order__saved-products').empty();
    $('.product-list__hidden').empty(); // $(this).closest('.draft-order__saved-product').remove();

    showHide();
  });
  $('#addCustomerForm').submit(function (e) {
    e.preventDefault();
    return false;
  });
  /* Search for Users */

  $('.add-customer-form__input').keyup(debounce(function () {
    var keyword = $(this).val();

    if (keyword.length >= MIN_LENGTH && CURRENT_QUERY != keyword) {
      CURRENT_QUERY = keyword; // $('.main-preloader').fadeIn();

      var customerResults = '.add-customer-form__results';
      $.ajax({
        url: APP_DOMAIN + '/customer/' + keyword,
        success: function success(d) {
          // console.log(d);
          $(customerResults).empty();
          $(d).each(function (i, p) {
            console.log(p.node.displayName);
            var $name = p.node.displayName,
                $id = p.node.id.replace('gid://shopify/Customer/', '');
            $email = p.node.email, $gravatar = p.node.hash;
            var obj = $('<div class="user-list__user-wrapper"></div>').appendTo('.add-customer-form__results');
            var btn = $('<button data-customer-id="' + $id + '" class="user-list__user"></button>').appendTo(obj);
            var flexwrapper = $('<div class="flex flex--align-center"></div>').appendTo(btn);
            var imagewrapper = $('<div class="user-list__user-image"><img width="40" src="' + $gravatar + '"></div>').appendTo(flexwrapper);
            var datawrapper = $('<div data-customer-id="' + $id + '" class="user-list__user-info"></div>').appendTo(flexwrapper);
            var name = $('<div class="user-list__name">' + $name + '</div>').appendTo(datawrapper);
            var email = $('<div class="user-list__name">' + $email + '</div>').appendTo(datawrapper);
            $('.main-preloader').fadeOut();
          });
          $(customerResults).fadeIn();
          showHide();
        },
        error: function error(e) {
          console.log(e);
        }
      });
    }
  }, DEBOUNCE_TIME));
  $(document).on('click', '.user-list__user', function (e) {
    e.preventDefault();
    var $this = $(this),
        myId = $this.data('customer-id'),
        myContent = $this.html();
    $('#addCustomerForm').hide();
    $('.btn--add-customer').hide();
    $('.add-customer-form__results').hide().empty();
    $('#current-customer').append(myContent).fadeIn().attr('data-customer-id', myId);
  });
  showHide();
});

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/davidbowick/code/shopify_app/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /Users/davidbowick/code/shopify_app/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });