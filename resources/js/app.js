(function($) {
$.fn.donetyping = function(callback){
    var _this = $(this);
    var x_timer;    
    _this.keyup(function (){
        clearTimeout(x_timer);
        x_timer = setTimeout(clear_timer, 500);
    }); 

    function clear_timer(){
        clearTimeout(x_timer);
        callback.call(_this);
    }
}
})(jQuery);

var $special = 'Special Order';
var DEV_MODE = false;
var preloader = $('<svg width="30px"  height="30px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;"><circle cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" stroke="#ffffff" stroke-width="10" r="25" stroke-dasharray="117.80972450961724 41.269908169872416" transform="rotate(41.2639 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>');
var DEBOUNCE_TIME = 1000;
var APP_DOMAIN = 'https://'+window.location.hostname;

String.prototype.replaceAll = function(search,replacement) {
	var target = this;
	return target.replace(new RegExp(search,'g'), replacement);
}



function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, '').toLowerCase(); // trim
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
    return str;
}
function formatCurrency(number) {
    if(number == "") return;
    number = parseFloat(number).toFixed(2);
    var n = number.split('').reverse().join("");
    console.log(n);
    var n2 = n.replace(/\d\d\d(?!$)/g, "$&,");    
    return '$' + n2.split('').reverse().join('');
}
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
function showHide() {
	var draftOrders = '#create-draft-order',
	draftOrderProduct = '.draft-order__item',
	productListItem = '.product-list__product',
	clearButton = '#clear-results',
	productList = '.product-list__hidden';

	$(draftOrderProduct).length ? fadeIn(draftOrders) : fadeOut(draftOrders);
	$(productListItem).length ? fadeIn(clearButton) : fadeOut(clearButton);
	$(productListItem).length ? fadeIn(productList) : fadeOut(productList);
	if($(productListItem).length) {
	} else {
		$('#add-product').val('');
	} 
}
function fadeIn(obj) {
	$(obj).fadeIn();
}
function fadeOut(obj) {
	$(obj).fadeOut()
}
var objectifier = function(splits, create, context) {
	var result = context || window;
	for(var i = 0, s; result && (s = splits[i]); i++) {
		result = (s in result ? result[s] : (create ? result[s] = {} : undefined));
	}
	return result;
};


function addSpecialInputs(inputs) {
	/* Color */
	var colorOptions = ['Oil Rubbed Bronze','Heavy Bronze','Silver Pewter','Black','Pewter'];
	var color = $('<div class="special__input grid__item field"><label>Color</label><select class="color" name="color[]"></select></div>').appendTo(inputs);
	$.each(colorOptions,function(index,value) {
		$(color).find('select').append('<option value="'+value.replace('"','\"')+'">'+value+'</option>');
	});

	/* Glass */
	var glassOptions = ['Low-E','Sandblast/Frost','Flemish','Rain','Aquatex','Rainbow','Ford Blue','Tea','Water Cube'];
	var glass = $('<div class="special__input grid__item field"><label>Glass</label><select class="glass" name="glass[]"></select></div>').appendTo(inputs);
	$.each(glassOptions,function(index,value) {
		$(glass).find('select').append('<option value="'+value.replace('"','\"')+'">'+value+'</option>');
	});

	/* Swing */
	var swingOptions = ['Left-Hand - In swing','Left-Hand - Out swing','Right-Hand - In swing','Right-Hand - Out swing'];
	var swing = $('<div class="special__input grid__item field"><label>Swing</label><select name="swing[]"></select></div>').appendTo(inputs);
	$.each(swingOptions,function(index,value) {
		$(swing).find('select').append('<option value="'+value.replace('"','\"')+'">'+value+'</option>');
	});
}

// Gets or sets an object
jQuery.obj = function(name, value, create, context) {
	// Setter
	if(value != undefined) {
		var splits = name.split("."), s = splits.pop(), result = objectifier(splits, true, context);
		return result && s ? (result[s] = value) : undefined;
	} else {
		return objectifier(name.split("."), create, context);
	}
};

function checkSelects(me) {
	// obj.find()
	var $this = me,
	selected = $this.find('option:selected'),
	selectedText = '',
	siblings = $this.parent().siblings(),
	obj = $this.closest('.product-list__product'),
	select = obj.find('.variant-list__variants'),
	opt0 = [],
	opt1 = [],
	opt2 = [];

	// if($this.hasClass('option-0')
	var myIndex = $this.attr('class').split('-')[1];
	// console.log(myIndex);

	if(myIndex == 0) {
		obj.find('.option-1').empty();
		obj.find('.option-2').empty();
		selectedText = selected.text();
	}
	if(myIndex == 1) {
		obj.find('.option-2').empty();
		selectedText = obj.find('.option-0 option:selected').text() + ' / ' + selected.text();
	}
	// console.log(selectedText);
	
	select.find('option').each(function(i,v) {
		var myText = $(v).text();
		if(myText.indexOf(selectedText) > -1) {
			var vSplit = $(v).text().split(' / ');
			$.each(vSplit,function(vi,vo) {
				// 1st one changed
				let viVal = vSplit[vi].replaceAll('"','˝');
				if(myIndex == 0) {
					if(vi==1 && opt1.indexOf(vo) == -1) {
						obj.find('.option-'+vi).append('<option value="'+viVal+'">'+vSplit[vi]+'</option>');
						opt1.push(vo);
					}
					if(vi==2 && opt2.indexOf(vo) == -1) {
						obj.find('.option-'+vi).append('<option value="'+viVal+'">'+vSplit[vi]+'</option>');
						opt2.push(vo);
					}
				}
				// 2nd one changed
				if(myIndex == 1) {
					if(vi==2 && opt2.indexOf(vo) == -1) {
						obj.find('.option-'+vi).append('<option value="'+viVal+'">'+vSplit[vi]+'</option>');
						opt2.push(vo);
					}
				}
			});
		} 
	});
	//Update the Master Select
	var selectedValues = [];
	obj.find('.regular__input').each(function(i,v) {
		var $this = $(this);
		selectedValues.push($this.find('option:selected').text());
	});
	var mySelectedValues = selectedValues.join(' / ');
	obj.find('option').filter(function() {
		return $(this).text() === mySelectedValues;
	}).prop('selected',true)
	// console.log(mySelectedValues);
}

// SHOP_DOMAIN = '//ard-dev.myshopify.com';
$(function() {
	// Disable form submission
	$('#add-product__form').submit(function(e){
		e.preventDefault();
		// return false;
	});
	$('#addCustomerForm').submit(function(e){
		e.preventDefault();
		// return false;
	});
	// alert('not cached');
	var MIN_LENGTH = 3,
	CURRENT_QUERY = '',
	FIELD = '#add-product';
	$(FIELD).focus();
	/* Find Products */

		$(FIELD).donetyping(function(callback){
        //your code goes here.
		var keyword = $(this).val().replace(/ /g, '+');
		console.log(keyword);
		if (keyword.length >= MIN_LENGTH && CURRENT_QUERY != keyword) {
			$('.main-preloader').fadeIn();
			CURRENT_QUERY = keyword;
			var hideSpecialOrder = $('#hide-special-order:checked').length ? true : false;
			console.log(hideSpecialOrder);
			
			$.ajax({
				url: APP_DOMAIN + '/products/'+keyword,
				success: function(d) {
					$('.product-list__hidden').empty();
					if(d.length) {
						// var obj = $('<div class="product-list__product"></div>').appendTo('.product-list__hidden');
						$(d).find('.product-list__product').appendTo($('.product-list__hidden'));	
						if(hideSpecialOrder) {
							$('.product-list__product.special-order').hide();
						}
						showHide();
						$('.main-preloader').fadeOut();
						// console.log(d);
						$('.no-results').hide();
					} else {
						$('.main-preloader').fadeOut();
						$('.product-list__hidden').hide();
						$('.no-results').fadeIn();
					}
				},
				error: function(e) {
					console.log(e);
				}
			});
		}
	});


	$('#custom-height,#custom-width').keyup(debounce(function(){
		var keyword = $(this).val();
		if($('#custom-height').val() != '' && $('#custom-width').val() != '') {
			$('.calculate--square-footage').trigger('click');

		}
	},250));

	var customFormElements = ['Reference','Style','Room','Location','Qty','Type','Width','Height','Description','Construction','Glass','Swing','Color','Bore Holes','Top','Mounting','Roller Catch','Threshold','Jamb','Sidelights','Transoms','Screen','Extended Price','Base Price'];

	if(DEV_MODE) {
		$(FIELD).val('beverly flat').keyup();	
	}

	if($('.custom-product__grid').hasClass('dev')) {
		$('#custom-reference').val('Cool Title, Bro');
		$('#custom-style').val('Custom Style Value');
		$('#custom-room').val('Custom Room Value');
		$('#custom-location').val('Custom Location Value');
		$('#custom-description').val('Custom Description Value');
		$('#custom-construction').val('Custom Construction Value');
		$('#custom-qty').val(1);
		$('#custom-width').val(61);
		$('#custom-height').val(81);
		$('#custom-extended-price').val(3567.00);
		$('#custom-base-price').val(170.50);
		$('#custom-weight').val(2000);
		$('#custom-jamb').val('6˝');
		$('#custom-glass').val('Low-e');
		$('#custom-color').val('Brushed Steel');
		$('.calculate--square-footage').trigger('click');
	}
	$('#custom-quantity').val(1);
	$('#custom-base-price').val(170.50);

	$('#custom-base-price').addClass('money-input');
	$('#custom-extended-price').addClass('money-input');

	$(document).on('blur','.money-input',function() {
		if($(this).val() == '') return;
		var valToFixed = parseInt($(this).val()).toFixed(2);
		var valToFixed = Number.parseFloat($(this).val()).toFixed(2);
		console.log(valToFixed);
		$(this).attr('data-price-value',$(this).val());

		$(this).val(valToFixed);
		//$(this).val(formatCurrency($(this).val().replace(/[,$]/g,'')));
	});
	$(document).on('paste','.money-input',function() {
		var cb = e.originalEvent.clipboardData || window.clipboardData;      
    	if(!$.isNumeric(cb.getData('text'))) e.preventDefault();
	});
	// $('#custom-base-price').attr('data-price-value',170).val(formatCurrency(170));
	$('.money-input').blur();
	
	// $(document).on('blur')
	$('#custom-extended-price').on('keyup',function() {
		if( !$(this).val() ) {
			$(this).addClass('error');
		} else {
			$(this).removeClass('error');
		}
	});

	$('#custom-base-price').on('keyup',function() {
		if( !$(this).val() ) {
			$(this).addClass('error');
		} else {
			$(this).removeClass('error');
			$('.calculate--square-footage').trigger('click');
		}
	});
	
	$(document).on('click','.custom--create-btn',function(e) {
		e.preventDefault();
		var $this = $(this),
			$title = $('#custom-title').val(),
			currentText = $this.text(),
			$savedProducts = '.draft-order__saved-products';
			$info= [],
			$properties = [];

		if($('#custom-extended-price').val() == '') {
			$('#custom-extended-price').addClass('error');
			return false;
		}

		$this.text('Adding...');

		var w = $('#custom-width').val(); 
		var h = $('#custom-height').val();
		var qty = parseInt($('#custom-quantity').val());
		var size = w+'˝x'+h+'˝';
		var squareFootage = $('.custom--square-footage').text();
		$properties.push(size);

		var basePrice = $('#custom-base-price').val();
		var extendedPrice = $('#custom-extended-price').val();
		// var priceCurrency = '$'+price+'.00';
		// Create our number formatter.
		var formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		});

		var priceCurrency = formatter.format(extendedPrice); /* $2,500.00 */
		var weight = $('#custom-weight').val();

		var obj = $('<div class="draft-order__item draft-order__custom-product" style="display: none;"></div>').appendTo($savedProducts);

		$.each(customFormElements,function(i,v) {
			var slug = slugify(v),
				val = $('#custom-'+slug).val();
			if(val) {
				$(obj).attr('data-'+slug,val);
				if(v != "Extended Price " && v != "Base Price");
				$properties.push(val);
				if(v === 'Glass' || v === 'Swing') {
					$info.push(val);
				}
			}
			console.log(slug,val);
		});

		w ? obj.attr('data-width',w+'˝') : '';
		h ? obj.attr('data-height',h+'˝') : '';
		squareFootage ? obj.attr('data-square-footage',squareFootage) : '';



		//basePrice ? obj.attr('data-base-price',basePrice) : '';

		var title = $('<div class="draft-order__title"><h5>Custom Product</h5></div>').appendTo(obj);
		// var properties = $('<div class="draft-order__properties"></div>').appendTo(obj);
		title.append('<span class="draft-order__variant">'+size+' / ' + $info.join(' / ') + '</span>');
		// var priceWeight = $('<div class="draft-order__priceWeight"></div>').appendTo(obj);
		// title.append('<br>' + priceCurrency + ' / ' + weight + 'lbs');
		var inputs = $('<div class="flex flex--wrap grid--half-gutters"></div>').appendTo(obj);
		var qty = $('<div class="grid__item field inline--label"><label>Qty</label><input class="variant-quantity" name="quantity[]" type="number" value="'+qty+'"></div>').appendTo(inputs);
		//var hiddenInput = $('<input type="hidden" value="'+$id+'" class="variant-id" name="variant_id[]">').appendTo(inputs);
		$('#create-draft-order').fadeIn();
		var remove = $('<a class="draft-order__remove" href="#">&times;</a>').appendTo(obj);
		obj.fadeIn();
		setTimeout(function(){ 
			$this.text(currentText); 
		}, 500);
	});

	$(document).on('click','.custom--clear',function(e) {
		e.preventDefault();
		$('.custom-product__grid input').val('');
		$('.custom--square-footage').html('&nbsp;');
		$('#custom-glass,#custom-swing').val('TBD');
		$('#custom-qty').val(1);
		$('#custom-base-price').val(170);
	});

	

	/* on Product list add click */
	$(document).on('click','.product-list__add',function(e){
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

		// console.log($id,$title);
		// var titleSplit = $title.split(' - ');

		var obj = $('<div class="draft-order__item draft-order__saved-product flex" style="display: none;"></div>').appendTo($savedProducts);
		var img = $('<div class="draft-order__image"><img src="'+$image+'"></div>').appendTo(obj);
		var desc = $('<div class="draft-order__description"></div>').appendTo(obj);
		var title = $('<div class="draft-order__title"><h5>'+$title+'</h5></div>').appendTo(desc);
		var variantTitle = $('<div>'+$variantTitle+'</div>').appendTo(title);
		var inputs = $('<div class="flex flex--wrap grid--half-gutters"></div>').appendTo(desc);
		var qty = $('<div class="grid__item field inline--label"><label>Qty</label><input class="variant-quantity" name="quantity[]" type="number" value="1"></div>').appendTo(inputs);
		var hiddenInput = $('<input type="hidden" value="'+$id+'" class="variant-id" name="variant_id[]">').appendTo(inputs);
		if($specialInputs.length) {
			var specialArray = [];
			$specialInputs.each(function(index,value) {
				var myVal = $(this).find('option:selected').text().replaceAll('"','˝');
					myProperty = $(this).find('label').text();
				specialArray.push(myVal);
				// var myVal = $(this).val();
				inputs.append('<input type="hidden" class="'+myProperty.toLowerCase()+'" name="properties['+myProperty+']" value="'+myVal.replace('"','˝')+'">');
			});
			var specialString = $('<p>'+specialArray.join(' / ')+'</p>').appendTo(title);
		}
		var remove = $('<a class="draft-order__remove" href="#">&times;</a>').appendTo(desc);
		$(obj).fadeIn();
		showHide();
	});

	$(document).on('click','.btn--download-csv',function(e) {
		e.preventDefault();
		// var draftOrderName = $('#gotoDraftOrder .btn').data('name')
		// $(this).attr('download','order-'+draftOrderName+'.csv');
		var csv = 'data:text/csv;charset=utf-8,Reference,Style,Room,Location,Qty,Type,W,H,Description,Construction,Glass,Swing,Extended Price,Base Price,SQ FT\n';
		var extendedTotal = 0;
		var baseTotal = 0;
		var squareFootageTotal = 0;
		$('.draft-order__custom-product').each(function(i,v) {
			// Loop through and add all the stuff
			var $this = $(this);
			var isLastProduct = i == $('.draft-order__custom-product').length - 1;
			$.each(customFormElements,function(c,v) {
				var slug = slugify(v);
				var isLastElement = c == customFormElements.length - 1;
				// $this.data(slug)
				if($this.data(slug)) {
					csv += '"'+$this.data(slug)+'"';
				} 
				// if($)
				// extendedTotal +=
				csv += ",";
			});

			$this.data('square-footage') ? csv += $this.data('square-footage') : '';
			if(isLastProduct) {
				
			} else {
				csv += "\n";
			}
			// Totals
			$this.data('extended-price') ? extendedTotal +=  parseFloat($this.data('extended-price')) : '';
			$this.data('base-price') ? baseTotal += parseFloat($this.data('base-price')) : '';
			$this.data('square-footage') ? squareFootageTotal += parseFloat($this.data('square-footage')) : squareFootageTotal;
		});
		csv += '\n,,,,,,,,,,,,'+extendedTotal+','+baseTotal+','+squareFootageTotal;
		var encodedUri = encodeURI(csv);
		window.open(encodedUri);
	});
	$(document).on('click','.export--draft-orders',function(e) {
		e.preventDefault();
		var csv = 'data:text/csv;charset=utf-8,Order,Date,Total\n';
		$('.order-row').each(function(i,v) {
			// Loop through and add all the stuff
			var $this = $(this);
			var isLastProduct = i == $('.order-row').length - 1;
			csv += '"' + $this.find('.order__id').text().trim().replace('#','') + '"';
			csv += ',';
			csv += '"' + $this.find('.order__created-at').text().trim() + '"';
			csv += ',';
			csv += '"' + $this.find('.order__total').text().trim() + '"';
			csv += '\n';

		});
		console.log(csv);
		// return false;
		var encodedUri = encodeURI(csv);
		window.open(encodedUri);
	});
	$(document).on('click','.export--sales',function(e) {
		e.preventDefault();
		var csv = 'data:text/csv;charset=utf-8,Order,Date,Total\n';
		$('.order-row').each(function(i,v) {
			// Loop through and add all the stuff
			var $this = $(this);
			var isLastProduct = i == $('.order-row').length - 1;
			csv += '"' + $this.find('.order__id').text().trim().replace('#','') + '",';
			// csv += ',';
			csv += '"' + $this.find('.order__created-at').text().trim() + '",';
			// csv += ',';
			csv += '"' + $this.find('.order__total').text().trim() + '"\n';
			// csv += '\n';

		});
		console.log(csv);
		// return false;
		var encodedUri = encodeURI(csv);
		window.open(encodedUri);
	});
	$('#clear-results').on('click',function(e) {
		e.preventDefault();
		$('.product-list__hidden').empty();
		showHide();
	});

	$(document).on('click','.draft-order__remove',function(e) {
		e.preventDefault();
		var myItem = $(this).closest('.draft-order__item');
		myItem.fadeOut('fast',function() {
			myItem.remove();
			showHide();
		});
		
	});
	//$('#createDraftOrder').append(preloader);


	// $(document).on('click','')

	$(document).on('click','.main-nav a',function() {
		console.log('do the thing');
		$('.main-preloader').show();
	});
	
	$('#create-draft-order').submit(function(e) {
		var createDraftOrderBtn = '#createDraftOrder';
		$(createDraftOrderBtn).empty().append(preloader);
		e.preventDefault();
		var obj = {
			"draft_order": {
				"line_items": []
			}
		};
		// var obj = [];
		$('.draft-order__custom-product').each(function(index,value) {
			var $this = $(this),
				customTitle = $this.find('.draft-order__title h5').text(),
				customVariantTitle = $this.find('.draft-order__variant').text(),
				customQty = $this.find('.variant-quantity').val(),
				customColor = $this.data('color'),
				customSize = $this.data('size'),
				customJamb = $this.data('jamb'),
				customGlass = $this.data('glass'),
				customWeight = $this.data('weight'),
				customSquareFootage = $this.data('square-footage'),
				customBasePrice = parseInt($this.data('base-price')),
				customExtendedPrice = parseInt($this.data('extended-price')),
				customPrice = customExtendedPrice;

			var randomSku =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

			var $lineItem = {
				"custom": true,
				"quantity": parseInt(customQty),
				"title": customTitle,
				"price": customPrice,
				"variant_title": customVariantTitle,
				"variant_id":null,
				"taxable": true,
				"requires_shipping":true,
				"properties": []
			}

			var $lineItems = obj.draft_order.line_items;
			$lineItems.push($lineItem);

			var props = $lineItem.properties;
			$.each(customFormElements,function(i,v) {
				var slug = slugify(v);
				if($this.data(slug) != '' && v != 'Extended Price' && v != 'Base Price' && v != 'Qty') {
					var properties = {
						"name":v,
						"value":$this.data(slug)
					}
					props.push(properties);
				}
			});
			var squareFootage = {
				"name":"Sq. Ft",
				"value":customSquareFootage
			}
			props.push(squareFootage);
		});
		var totalSaved =  $('.draft-order__saved-product').length;
		$('.draft-order__saved-product').each(function(index,value) {
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
				"properties":[]
			};
			var $lineItems = obj.draft_order.line_items;
			$lineItems.push($lineItem);

			var props = $lineItem.properties;
			if(variantColor) {
				var properties = {
					"name":"Color",
					"value":variantColor
				};
				props.push(properties);
				
			}
			if(variantGlass) {
				var properties = {
					"name":"Glass",
					"value":variantGlass 
				};
				props.push(properties);
			}
			if(variantSwing) {
				var properties = {
					"name":"Swing",
					"value":variantSwing 
				};
				props.push(properties);
			}
		});
		if($('#current-customer .user-list__user-info').length) {
			var customerId = $('#current-customer').data('customer-id');
			var customerNode = {
				"id": customerId
			}
			obj.draft_order.customer = customerNode;
			obj.draft_order.use_customer_default_address = true;
		}
		if($('#salesperson').val()){
			obj.draft_order.tags = "Salesperson:"+$('#salesperson').val();
			obj.draft_order.tags += ",_email:"+$('#salesperson-email').val();
		}
		if($('#hide-payment-options').is(':checked')) {
			obj.draft_order.tags += ',no_payment_options';
		}
		// console.log(obj);
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('input[name="_token"]').val()
			}
		});
		// console.log(obj);
		$.ajax({
			method:"POST",
			headers: {'X-CSRF-TOKEN': $('input[name="_token"]').val()},
			url:'/draft-order',
			dataType: 'json',
			contentType: 'application/json; charset=UTF-8',
			data: JSON.stringify(obj),
			success: function(data) {
				console.log('successfully sent!');
				$(createDraftOrderBtn).hide();
				$(createDraftOrderBtn).find('svg').hide();
				// console.log(data);
				var myId = data.body.draft_order.id;
				var myHref = $('#gotoDraftOrder a').attr('href') + myId;
				$('#gotoDraftOrder').show().find('a').attr('href',myHref).attr('data-name',data.body.draft_order.name);
				$('.btn--download-csv').attr('download','order-'+data.body.draft_order.name+'.csv').fadeIn();
			},
			error: function(data){
				console.log('errr, nope');
				// console.log(data);
			}
		});
	});

	$(document).on('click','.btn--start-over',function(e) {
		e.preventDefault();
		$('.draft-order__saved-products').empty();
		$('#gotoDraftOrder').hide();
		$('#createDraftOrder').html('Create Draft Order').show();

		$('.product-list__hidden').empty();
		$('.custom-product__build').hide();
		removeCustomer();
		$('#add-product').val('').focus();
		$('#custom-width,#custom-height,#custom-extended-price,#custom-swing').val('');
		$('.custom--square-footage').html('&nbsp;');
		// $(this).closest('.draft-order__saved-product').remove();
		showHide();
	});

	$(document).on('click','.add-custom-product',function(e) {
		e.preventDefault();
		$('.product-list__hidden').hide().empty();
		$('.custom-product__build').fadeIn();
	});

	$(document).on('click','.custom--cancel',function(e) {
		e.preventDefault();
		$('.custom-product__build').fadeOut();
	});

	$(document).on('click','.calculate--square-footage',function(e) {
		e.preventDefault();
		var w = parseInt($('#custom-width').val()) / 12;
		var h = parseInt($('#custom-height').val() / 12);
		if(w > 0 && h > 0) {
			var squareFootage = w * h;
			squareFootage = Math.round(squareFootage * 100) / 100;
			//$(this).hide();
			$('.custom--square-footage').html(squareFootage + ' ft&#178;').fadeIn();

			// var basePrice = parseInt($('#custom-base-price').val());
			var basePrice = Number.parseFloat($('#custom-base-price').val()).toFixed(2);
			$('#custom-extended-price').val(squareFootage*basePrice).blur();
		} 
	});

	$('#addCustomerForm').submit(function(e) {
		e.preventDefault();
		return false;
	});
	/* Search for Users */
	$('.add-customer-form__input').keyup(debounce(function(){
		var keyword = $(this).val(),
			spinner = '.customer-form__loader';
		if (keyword.length >= MIN_LENGTH && CURRENT_QUERY != keyword) {
			$(spinner).fadeIn();
			CURRENT_QUERY = keyword;
			// $('.main-preloader').fadeIn();
			var customerResults = '.add-customer-form__results';
			$.ajax({
				url: APP_DOMAIN + '/customer/'+keyword,
				success: function(d) {
					// console.log(d);
					$(customerResults).empty();
					if(d.length) {
						$('.customer--no-results').fadeOut();
						$(d).each(function(i,p) {
							// console.log(p);
							var $name = p.node.displayName,
								$id = p.node.id.replace('gid://shopify/Customer/','')
								$email = p.node.email,
								$gravatar = p.node.hash;
							var obj = $('<div class="user-list__user-wrapper"></div>').appendTo(customerResults);
							var btn = $('<button data-customer-id="'+$id+'" class="user-list__user"></button>').appendTo(obj);
							var flexwrapper = $('<div class="relative flex flex--align-center"></div>').appendTo(btn);
							var imagewrapper = $('<div class="user-list__user-image"><img width="40" src="'+$gravatar+'"></div>').appendTo(flexwrapper);
							var datawrapper = $('<div data-customer-id="'+$id+'" class="user-list__user-info"></div>').appendTo(flexwrapper);
							var name = $('<div class="user-list__name">'+$name+'</div>').appendTo(datawrapper);
							var email = $('<div class="user-list__name">'+$email+'</div>').appendTo(datawrapper);
							// var defaultAddress
							$(spinner).fadeOut();
						});
						$(customerResults).fadeIn();
						CURRENT_QUERY = '';
						showHide();
					} else {
						$(spinner).fadeOut();
						$('.customer--no-results').fadeIn();
					}
				},
				error: function(e) {
					console.log(e);
				}
			});
		}
	},DEBOUNCE_TIME));

	$(document).on('click','.user-list__user',function(e){
		e.preventDefault();
		var $this = $(this),
			myId = $this.data('customer-id'),
			myContent = $this.html();
		$('#addCustomerForm').hide();
		$('.btn--add-customer').hide();
		$('.add-customer-form__results').hide().empty();
		$('#current-customer').append(myContent).fadeIn().attr('data-customer-id',myId);
		$('#current-customer .flex').append('<a href="#" class="current-customer__close">&times;</a>');
		
	});
	$(document).on('click','.current-customer__close',function(e) {
		e.preventDefault();
		removeCustomer();
	});
	function removeCustomer() {
		$('#current-customer > .flex').remove();
		$('#current-customer').hide();
		$('#addCustomerForm').show().find('input').val('').focus();
	}
	showHide();

	$(document).on('click','.send-invoice',function(e) {
		e.preventDefault();
		var id = $(this).attr('href');
		console.log(id);
		return false;
		/*
		$.post('/draft-order/'+id+'/send-invoice',function(data) {
			console.log(data);
		});
		*/
	});
	$(document).on('change','#hide-special-order',function() {
		var hideSpecialOrder = $('#hide-special-order:checked').length ? true : false;
		if(hideSpecialOrder) {
			$('.product-list__product.special-order').hide();
		} else {
			$('.product-list__product.special-order').show();
		}
	});

	$(document).on('click','.custom-product__edit-link',function(e) {
		$(this).closest('.box').find('.product-list__details').slideToggle();
		return false;
	});
	$(document).on('click','.draft-order__product-link',function(e) {
		console.log('.draft-order__product-link');
		var id = $(this).data('product-id').split('/Product/')[1];
		var el = $(this).closest('.product-list__product');
		// var txt = 'Add';
		var txtChange = false;
		if (typeof $(this).data('button-text') !== 'undefined') {
			txtChange = $(this).data('button-text');
			// var changeText = 
		}

		var vars = el.find('.product-list__details');
		console.log(id);
		if(el.hasClass('has-data')) {
			vars.slideToggle();
		} else {
			$.ajax({
				url: APP_DOMAIN + '/product/'+id,
				success: function(d) {
					// console.log()
					// console.log(d);
					el.addClass('has-data');
					vars.html($(d).find('.product-list__details').html()).fadeIn();
					if(txtChange) {
						vars.find('.btn').text(txtChange).attr('href','/drafts/'+id+'/');
					}
				}
			});
		}
		return false;
	});
});








