!function(t){var e={};function r(a){if(e[a])return e[a].exports;var o=e[a]={i:a,l:!1,exports:{}};return t[a].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(a,o,function(e){return t[e]}.bind(null,o));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/",r(r.s=0)}({0:function(t,e,r){r("bUC5"),t.exports=r("pyCd")},bUC5:function(t,r){!function(t){t.fn.donetyping=function(e){var r,a=t(this);function o(){clearTimeout(r),e.call(a)}a.keyup(function(){clearTimeout(r),r=setTimeout(o,500)})}}(jQuery);var a=$('<svg width="30px"  height="30px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;"><circle cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" stroke="#ffffff" stroke-width="10" r="25" stroke-dasharray="117.80972450961724 41.269908169872416" transform="rotate(41.2639 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>'),o="https://"+window.location.hostname;function n(t){return t=(t=t.replace(/^\s+|\s+$/g,"").toLowerCase()).replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}function d(t,e,r){var a;return function(){var o=this,n=arguments,d=function(){a=null,r||t.apply(o,n)},i=r&&!a;clearTimeout(a),a=setTimeout(d,e),i&&t.apply(o,n)}}function i(){$(".draft-order__item").length?s("#create-draft-order"):c("#create-draft-order"),$(".product-list__product").length?s("#clear-results"):c("#clear-results"),$(".product-list__product").length?s(".product-list__hidden"):c(".product-list__hidden"),$(".product-list__product").length||$("#add-product").val("")}function s(t){$(t).fadeIn()}function c(t){$(t).fadeOut()}String.prototype.replaceAll=function(t,e){return this.replace(new RegExp(t,"g"),e)};var u=function(t,e,r){for(var a,o=r||window,n=0;o&&(a=t[n]);n++)o=a in o?o[a]:e?o[a]={}:void 0;return o};jQuery.obj=function(t,e,r,a){if(null!=e){var o=t.split("."),n=o.pop(),d=u(o,!0,a);return d&&n?d[n]=e:void 0}return u(t.split("."),r,a)},$(function(){$("#add-product__form").submit(function(t){t.preventDefault()}),$("#addCustomerForm").submit(function(t){t.preventDefault()});var t="",r="#add-product";$(r).focus(),$(r).donetyping(function(e){var r=$(this).val().replace(/ /g,"+");if(console.log(r),r.length>=3&&t!=r){$(".main-preloader").fadeIn(),t=r;var a=!!$("#hide-special-order:checked").length;console.log(a),$.ajax({url:o+"/products/"+r,success:function(t){$(".product-list__hidden").empty(),t.length?($(t).find(".product-list__product").appendTo($(".product-list__hidden")),a&&$(".product-list__product.special-order").hide(),i(),$(".main-preloader").fadeOut(),$(".no-results").hide()):($(".main-preloader").fadeOut(),$(".product-list__hidden").hide(),$(".no-results").fadeIn())},error:function(t){console.log(t)}})}}),$("#custom-height,#custom-width").keyup(d(function(){$(this).val();""!=$("#custom-height").val()&&""!=$("#custom-width").val()&&$(".calculate--square-footage").trigger("click")},250));var s=["Reference","Style","Room","Location","Qty","Type","Width","Height","Description","Construction","Glass","Swing","Color","Bore Holes","Top","Mounting","Roller Catch","Threshold","Jamb","Sidelights","Transoms","Screen","Extended Price","Base Price"];function c(){$("#current-customer > .flex").remove(),$("#current-customer").hide(),$("#addCustomerForm").show().find("input").val("").focus()}$(".custom-product__grid").hasClass("dev")&&($("#custom-reference").val("Cool Title, Bro"),$("#custom-style").val("Custom Style Value"),$("#custom-room").val("Custom Room Value"),$("#custom-location").val("Custom Location Value"),$("#custom-description").val("Custom Description Value"),$("#custom-construction").val("Custom Construction Value"),$("#custom-qty").val(1),$("#custom-width").val(61),$("#custom-height").val(81),$("#custom-extended-price").val(3567),$("#custom-base-price").val(170.5),$("#custom-weight").val(2e3),$("#custom-jamb").val("6˝"),$("#custom-glass").val("Low-e"),$("#custom-color").val("Brushed Steel"),$(".calculate--square-footage").trigger("click")),$("#custom-qty").val(1),$("#custom-base-price").val(170.5),$("#custom-base-price").addClass("money-input"),$("#custom-extended-price").addClass("money-input"),$(document).on("blur",".money-input",function(){if(""!=$(this).val()){var t=parseInt($(this).val()).toFixed(2);t=Number.parseFloat($(this).val()).toFixed(2);console.log(t),$(this).attr("data-price-value",$(this).val()),$(this).val(t)}}),$(document).on("paste",".money-input",function(){var t=e.originalEvent.clipboardData||window.clipboardData;$.isNumeric(t.getData("text"))||e.preventDefault()}),$(".money-input").blur(),$("#custom-extended-price").on("keyup",function(){$(this).val()?$(this).removeClass("error"):$(this).addClass("error")}),$("#custom-base-price").on("keyup",function(){$(this).val()?($(this).removeClass("error"),$(".calculate--square-footage").trigger("click")):$(this).addClass("error")}),$(document).on("click",".custom--create-btn",function(t){t.preventDefault();var e=$(this),r=($("#custom-title").val(),e.text());if($info=[],$properties=[],""==$("#custom-extended-price").val())return $("#custom-extended-price").addClass("error"),!1;e.text("Adding...");var a=$("#custom-width").val(),o=$("#custom-height").val(),d=parseInt($("#custom-quantity").val()),i=a+"˝x"+o+"˝",c=$(".custom--square-footage").text();$properties.push(i);$("#custom-base-price").val();var u=$("#custom-extended-price").val(),l=(new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(u),$("#custom-weight").val(),$('<div class="draft-order__item draft-order__custom-product" style="display: none;"></div>').appendTo(".draft-order__saved-products"));$.each(s,function(t,e){var r=n(e),a=$("#custom-"+r).val();a&&($(l).attr("data-"+r,a),$properties.push(a),"Glass"!==e&&"Swing"!==e||$info.push(a)),console.log(r,a)}),a&&l.attr("data-width",a+"˝"),o&&l.attr("data-height",o+"˝"),c&&l.attr("data-square-footage",c),$('<div class="draft-order__title"><h5>Custom Product</h5></div>').appendTo(l).append('<span class="draft-order__variant">'+i+" / "+$info.join(" / ")+"</span>");var p=$('<div class="flex flex--wrap grid--half-gutters"></div>').appendTo(l);d=$('<div class="grid__item field inline--label"><label>Qty</label><input class="variant-quantity" name="quantity[]" type="number" value="'+d+'"></div>').appendTo(p);$("#create-draft-order").fadeIn();$('<a class="draft-order__remove" href="#">&times;</a>').appendTo(l);l.fadeIn(),setTimeout(function(){e.text(r)},500)}),$(document).on("click",".custom--clear",function(t){t.preventDefault(),$(".custom-product__grid input").val(""),$(".custom--square-footage").html("&nbsp;"),$("#custom-glass,#custom-swing").val("TBD"),$("#custom-qty").val(1),$("#custom-base-price").val(170)}),$(document).on("click",".product-list__add",function(t){t.preventDefault();var e=$(this).closest(".product-list__product"),r=e.find(".variant-list__variants option:selected"),a=r.data("variant-id").split("/").pop(),o=r.data("product-title"),n=r.data("variant-title"),d=r.data("image"),s=e.find(".special__input"),c=$('<div class="draft-order__item draft-order__saved-product flex" style="display: none;"></div>').appendTo(".draft-order__saved-products"),u=($('<div class="draft-order__image"><img src="'+d+'"></div>').appendTo(c),$('<div class="draft-order__description"></div>').appendTo(c)),l=$('<div class="draft-order__title"><h5>'+o+"</h5></div>").appendTo(u),p=($("<div>"+n+"</div>").appendTo(l),$('<div class="flex flex--wrap grid--half-gutters"></div>').appendTo(u));$('<div class="grid__item field inline--label"><label>Qty</label><input class="variant-quantity" name="quantity[]" type="number" value="1"></div>').appendTo(p),$('<input type="hidden" value="'+a+'" class="variant-id" name="variant_id[]">').appendTo(p);if(s.length){var f=[];s.each(function(t,e){var r=$(this).find("option:selected").text().replaceAll('"',"˝");myProperty=$(this).find("label").text(),f.push(r),p.append('<input type="hidden" class="'+myProperty.toLowerCase()+'" name="properties['+myProperty+']" value="'+r.replace('"',"˝")+'">')});$("<p>"+f.join(" / ")+"</p>").appendTo(l)}$('<a class="draft-order__remove" href="#">&times;</a>').appendTo(u);$(c).fadeIn(),i()}),$(document).on("click",".btn--download-csv",function(t){t.preventDefault();var e="data:text/csv;charset=utf-8,Reference,Style,Room,Location,Qty,Type,W,H,Description,Construction,Glass,Swing,Extended Price,Base Price,SQ FT\n",r=0,a=0,o=0;$(".draft-order__custom-product").each(function(t,d){var i=$(this),c=t==$(".draft-order__custom-product").length-1;$.each(s,function(t,r){var a=n(r);i.data(a)&&(e+='"'+i.data(a)+'"'),e+=","}),i.data("square-footage")&&(e+=i.data("square-footage")),c||(e+="\n"),i.data("extended-price")&&(r+=parseFloat(i.data("extended-price"))),i.data("base-price")&&(a+=parseFloat(i.data("base-price"))),i.data("square-footage")&&(o+=parseFloat(i.data("square-footage")))}),e+="\n,,,,,,,,,,,,"+r+","+a+","+o;var d=encodeURI(e);window.open(d)}),$(document).on("click",".export--draft-orders",function(t){t.preventDefault();var e="data:text/csv;charset=utf-8,Order,Date,Total\n";$(".order-row").each(function(t,r){var a=$(this);$(".order-row").length;e+='"'+a.find(".order__id").text().trim().replace("#","")+'"',e+=",",e+='"'+a.find(".order__created-at").text().trim()+'"',e+=",",e+='"'+a.find(".order__total").text().trim()+'"',e+="\n"}),console.log(e);var r=encodeURI(e);window.open(r)}),$(document).on("click",".export--sales",function(t){t.preventDefault();var e="data:text/csv;charset=utf-8,Order,Date,Total\n";$(".order-row").each(function(t,r){var a=$(this);$(".order-row").length;e+='"'+a.find(".order__id").text().trim().replace("#","")+'",',e+='"'+a.find(".order__created-at").text().trim()+'",',e+='"'+a.find(".order__total").text().trim()+'"\n'}),console.log(e);var r=encodeURI(e);window.open(r)}),$("#clear-results").on("click",function(t){t.preventDefault(),$(".product-list__hidden").empty(),i()}),$(document).on("click",".draft-order__remove",function(t){t.preventDefault();var e=$(this).closest(".draft-order__item");e.fadeOut("fast",function(){e.remove(),i()})}),$(document).on("click",".main-nav a",function(){console.log("do the thing"),$(".main-preloader").show()}),$("#create-draft-order").submit(function(t){$("#createDraftOrder").empty().append(a),t.preventDefault();var e={draft_order:{line_items:[]}};$(".draft-order__custom-product").each(function(t,r){var a=$(this),o=a.find(".draft-order__title h5").text(),d=a.find(".draft-order__variant").text(),i=a.find(".variant-quantity").val(),c=(a.data("color"),a.data("size"),a.data("jamb"),a.data("glass"),a.data("weight"),a.data("square-footage")),u=(parseInt(a.data("base-price")),parseInt(a.data("extended-price"))),l=(Math.random().toString(36).substring(2,15),Math.random().toString(36).substring(2,15),{custom:!0,quantity:parseInt(i),title:o,price:u,variant_title:d,variant_id:null,taxable:!0,requires_shipping:!0,properties:[]});e.draft_order.line_items.push(l);var p=l.properties;$.each(s,function(t,e){var r=n(e);if(""!=a.data(r)&&"Extended Price"!=e&&"Base Price"!=e&&"Qty"!=e){var o={name:e,value:a.data(r)};p.push(o)}});var f={name:"Sq. Ft",value:c};p.push(f)});var r=$(".draft-order__saved-product").length;if($(".draft-order__saved-product").each(function(t,a){t===r-1&&$(this).addClass(".last");var o=$(this),n=o.find(".variant-id").val(),d=o.find(".variant-quantity").val(),i=o.find(".color").length?o.find(".color").val():"",s=o.find(".glass").length?o.find(".glass").val():"",c=o.find(".swing").length?o.find(".swing").val():"",u={variant_id:parseInt(n),quantity:parseInt(d),properties:[]};e.draft_order.line_items.push(u);var l=u.properties;if(i){var p={name:"Color",value:i};l.push(p)}if(s){p={name:"Glass",value:s};l.push(p)}if(c){p={name:"Swing",value:c};l.push(p)}}),$("#current-customer .user-list__user-info").length){var o={id:$("#current-customer").data("customer-id")};e.draft_order.customer=o,e.draft_order.use_customer_default_address=!0}$("#salesperson").val()&&(e.draft_order.tags="Salesperson:"+$("#salesperson").val(),e.draft_order.tags+=",_email:"+$("#salesperson-email").val()),$("#hide-payment-options").is(":checked")&&(e.draft_order.tags+=",no_payment_options"),$.ajaxSetup({headers:{"X-CSRF-TOKEN":$('input[name="_token"]').val()}}),$.ajax({method:"POST",headers:{"X-CSRF-TOKEN":$('input[name="_token"]').val()},url:"/draft-order",dataType:"json",contentType:"application/json; charset=UTF-8",data:JSON.stringify(e),success:function(t){console.log("successfully sent!"),$("#createDraftOrder").hide(),$("#createDraftOrder").find("svg").hide();var e=t.body.draft_order.id,r=$("#gotoDraftOrder a").attr("href")+e;$("#gotoDraftOrder").show().find("a").attr("href",r).attr("data-name",t.body.draft_order.name),$(".btn--download-csv").attr("download","order-"+t.body.draft_order.name+".csv").fadeIn()},error:function(t){console.log("errr, nope")}})}),$(document).on("click",".btn--start-over",function(t){t.preventDefault(),$(".draft-order__saved-products").empty(),$("#gotoDraftOrder").hide(),$("#createDraftOrder").html("Create Draft Order").show(),$(".product-list__hidden").empty(),$(".custom-product__build").hide(),c(),$("#add-product").val("").focus(),$("#custom-width,#custom-height,#custom-extended-price,#custom-swing").val(""),$(".custom--square-footage").html("&nbsp;"),i()}),$(document).on("click",".add-custom-product",function(t){t.preventDefault(),$(".product-list__hidden").hide().empty(),$(".custom-product__build").fadeIn()}),$(document).on("click",".custom--cancel",function(t){t.preventDefault(),$(".custom-product__build").fadeOut()}),$(document).on("click",".calculate--square-footage",function(t){t.preventDefault();var e=parseInt($("#custom-width").val())/12,r=parseInt($("#custom-height").val()/12);if(e>0&&r>0){var a=e*r;a=Math.round(100*a)/100,$(".custom--square-footage").html(a+" ft&#178;").fadeIn();var o=Number.parseFloat($("#custom-base-price").val()).toFixed(2);$("#custom-extended-price").val(a*o).blur()}}),$("#addCustomerForm").submit(function(t){return t.preventDefault(),!1}),$(".add-customer-form__input").keyup(d(function(){var e=$(this).val(),r=".customer-form__loader";if(e.length>=3&&t!=e){$(r).fadeIn(),t=e;$.ajax({url:o+"/customer/"+e,success:function(e){$(".add-customer-form__results").empty(),e.length?($(".customer--no-results").fadeOut(),$(e).each(function(t,e){var a=e.node.displayName,o=e.node.id.replace("gid://shopify/Customer/","");$email=e.node.email,$gravatar=e.node.hash;var n=$('<div class="user-list__user-wrapper"></div>').appendTo(".add-customer-form__results"),d=$('<button data-customer-id="'+o+'" class="user-list__user"></button>').appendTo(n),i=$('<div class="relative flex flex--align-center"></div>').appendTo(d),s=($('<div class="user-list__user-image"><img width="40" src="'+$gravatar+'"></div>').appendTo(i),$('<div data-customer-id="'+o+'" class="user-list__user-info"></div>').appendTo(i));$('<div class="user-list__name">'+a+"</div>").appendTo(s),$('<div class="user-list__name">'+$email+"</div>").appendTo(s);$(r).fadeOut()}),$(".add-customer-form__results").fadeIn(),t="",i()):($(r).fadeOut(),$(".customer--no-results").fadeIn())},error:function(t){console.log(t)}})}},1e3)),$(document).on("click",".user-list__user",function(t){t.preventDefault();var e=$(this),r=e.data("customer-id"),a=e.html();$("#addCustomerForm").hide(),$(".btn--add-customer").hide(),$(".add-customer-form__results").hide().empty(),$("#current-customer").append(a).fadeIn().attr("data-customer-id",r),$("#current-customer .flex").append('<a href="#" class="current-customer__close">&times;</a>')}),$(document).on("click",".current-customer__close",function(t){t.preventDefault(),c()}),i(),$(document).on("click",".send-invoice",function(t){t.preventDefault();var e=$(this).attr("href");return console.log(e),!1}),$(document).on("change","#hide-special-order",function(){!!$("#hide-special-order:checked").length?$(".product-list__product.special-order").hide():$(".product-list__product.special-order").show()}),$(document).on("click",".custom-product__edit-link",function(t){return $(this).closest(".box").find(".product-list__details").slideToggle(),!1}),$(document).on("click",".draft-order__product-link",function(t){console.log(".draft-order__product-link");var e=$(this).data("product-id").split("/Product/")[1],r=$(this).closest(".product-list__product"),a=!1;void 0!==$(this).data("button-text")&&(a=$(this).data("button-text"));var n=r.find(".product-list__details");return console.log(e),r.hasClass("has-data")?n.slideToggle():$.ajax({url:o+"/product/"+e,success:function(t){r.addClass("has-data"),n.html($(t).find(".product-list__details").html()).fadeIn(),a&&n.find(".btn").text(a).attr("href","/drafts/"+e+"/")}}),!1})})},pyCd:function(t,e){}});