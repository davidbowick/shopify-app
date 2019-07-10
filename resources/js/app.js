var $special = 'Joy';

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
	/* Jamb */
	var jambOptions = ['6\"','4\"','8\"'];
	var jamb = $('<div class="special__input grid__item field"><label>Jamb</label><select class="jamb" name="jamb[]"></select></div>').appendTo(inputs);
	$.each(jambOptions,function(index,value) {
		$(jamb).find('select').append('<option value="'+value.replace('"','\"')+'">'+value+'</option>');
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
var APP_DOMAIN = 'https://db.burrow.io',
SHOP_DOMAIN = '//ard-dev.myshopify.com';
$(function() {
	var MIN_LENGTH = 3,
	CURRENT_QUERY = '',
	FIELD = '#add-product';

	$(FIELD).focus();

	$(FIELD).keyup(debounce(function(){
		var keyword = $(this).val();
		if (keyword.length >= MIN_LENGTH && CURRENT_QUERY != keyword) {
			CURRENT_QUERY = keyword;
			$.ajax({
				url: APP_DOMAIN + '/products/'+keyword,
				success: function(d) {
					// console.log(d);
					$('.product-list__hidden').empty();
					$(d).each(function(i,p) {
						// console.log(d);
						var $title = p.node.title,
							id = p.node.id,
							handle = p.node.handle,
							imageSrc = p.node.featuredImage.transformedSrc;

						var obj = $('<div class="product-list__product flex"></div>');
						var image = $('<div class="product-list__image"><img src="'+imageSrc+'" width="90" /></div>').appendTo(obj);
						var details = $('<div class="product-list__details"></div></div>').appendTo(obj);
						var title = $('<div class="draft-order__title"><h5>'+$title+'</h5></div>').appendTo(details);
						var select = $('<select class="variant-list__variants"></select>').appendTo(details);
						var inputs = $('<div class="flex flex--wrap grid--half-gutters"></div>').appendTo(details);
						// var qty = $('<div class="grid__item field"><label>Qty</label><input class="variant-quantity" name="quantity[]" type="number" value="1"></div>').appendTo(details);
						
						if($title.indexOf($special) > -1) {
							addSpecialInputs(inputs);
						}
						// var ul = $('<ul class="variant-list__variant"></ul>').appendTo(details);
						$('.product-list__hidden').append(obj);
						$(p.node.variants.edges).each(function(i,v) {
							// console.log(v);
							var vTitle = v.node.displayName,
								vId = v.node.id;
							$(select).append('<option data-image="'+imageSrc+'" data-title="'+vTitle+'" data-variant-id="'+vId+'" value="'+vId+'">'+vTitle.split(' - ')[1]+'</option>');
							// $(ul).append('<li><a class="product-list__link" href="#" data-image="'+imageSrc+'" data-title="'+vTitle+'" data-variant-id="'+vId+'">'+vTitle+'</a></li>');
						});
						$(select).wrap('<div class="field"/>');
						var addBtn = $('<a href="#" class="product-list__add btn">Add</a>').appendTo(details);
					});
					showHide();
				},
				error: function(e) {
					console.log(e);
				}
			});
		}
	},250));

	

	$(document).on('click','.product-list__add',function(e){
		e.preventDefault();
		var $this = $(this),
			$parent = $this.closest('.product-list__product'),
			$select = $parent.find('.variant-list__variants option:selected'),
			$id = $select.data('variant-id').split('/').pop(),
			$title = $select.data('title'),
			$image = $select.data('image'),
			$savedProducts = '.draft-order__saved-products',
			$specialInputs = $parent.find('.special__input'),
			$special = 'Joy';

		// console.log($id,$title);
		var titleSplit = $title.split(' - ');

		var obj = $('<div class="draft-order__saved-product flex" style="display: none;"></div>').appendTo($savedProducts);
		var img = $('<div class="draft-order__image"><img src="'+$image+'"></div>').appendTo(obj);
		var desc = $('<div class="draft-order__description"></div>').appendTo(obj);
		var title = $('<div class="draft-order__title"><h5>'+titleSplit[0]+'</h5></div>').appendTo(desc);
		var inputs = $('<div class="flex flex--wrap grid--half-gutters"></div>').appendTo(desc);
		var qty = $('<div class="grid__item field"><label>Qty</label><input class="variant-quantity" name="quantity[]" type="number" value="1"></div>').appendTo(inputs);
		var hiddenInput = $('<input type="hidden" value="'+$id+'" class="variant-id" name="variant_id[]">').appendTo(inputs);
		if($title.indexOf($special) > -1) {
			$(title).append('<b>'+titleSplit[1]+'</b>');
		}
		if($specialInputs.length) {
			var specialArray = [];
			$specialInputs.each(function(index,value) {
				var myVal = $(this).find('option:selected').text();
					myProperty = $(this).find('label').text();
				specialArray.push(myVal);
				// var myVal = $(this).val();
				inputs.append('<input type="hidden" class="'+myProperty.toLowerCase()+'" name="properties['+myProperty+']" value="'+myVal.replace('"','˝')+'">');
			});
			var specialString = $('<p>'+specialArray.join(' / ')+'</p>').appendTo(title);
		}
		var remove = $('<a class="draft-order__remove" href="#">Remove</a>').appendTo(desc);
		$(obj).fadeIn();
		showHide();
	});

	$('#clear-results').on('click',function(e) {
		e.preventDefault();
		$('.product-list__hidden').empty();
		showHide();
	});

	$(document).on('click','.draft-order__remove',function(e) {
		e.preventDefault();
		$(this).closest('.draft-order__saved-product').remove();
		showHide();
	});

	// $(document).on('click','')
	
	$('#create-draft-order').submit(function(e) {

		e.preventDefault();
		var obj = {
			"draft_order": {
				"line_items": []
			}
		};
	
		// var obj = [];
		var totalSaved =  $('.draft-order__saved-product').length;
		$('.draft-order__saved-product').each(function(index,value) {
			if (index === totalSaved - 1) {
        		$(this).addClass('.last');
 		    }

			var $this = $(this),
				variantId = $this.find('.variant-id').val(),
				variantQty = $this.find('.variant-quantity').val(),
				variantJamb = $this.find('.jamb').length ? $this.find('.jamb').val() : '',
				variantGlass = $this.find('.glass').length ? $this.find('.glass').val() : '',
				variantSwing = $this.find('.swing').length ? $this.find('.swing').val() : '';

		    // var output = input.split(/[, ]+/).pop();
			// obj['draft_order']['line_items'][index]['variant_id'] = 

			// var obj = {key1: "value1", key2: "value2"};
			// var pair = {key3: "value3"};
			// obj = {...obj, ...pair};
			var $lineItem = {
				"variant_id": parseInt(variantId),
				"quantity": parseInt(variantQty),
				"properties":[]
			};
			var $lineItems = obj.draft_order.line_items;
			$lineItems.push($lineItem);

			// obj.draft_order.line_items[index].variant_id = parseInt(variantId);
			// obj.draft_order.line_items[index].quantity = parseInt(variantQty);
			// obj.draft_order.line_items[index].properties["Jamb"] = variantJamb;
			// obj.draft_order.line_items[index].properties["Glass"] = variantGlass;
			// obj.draft_order.line_items[index].properties["Swing"] = variantSwing;

			var props = $lineItem.properties;
			if(variantJamb) {
				var properties = {
					"name":"Jamb",
					"value":variantJamb 
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
			console.log(props);

			
		});
		//console.log(obj);
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('input[name="_token"]').val()
			}
		});
		// console.log(JSON.parse(obj));
		// console.log($.parseJSON(obj));
		// var jsonObj = JSON.stringify(obj);
		// var result = Object.keys(obj).map(function(key) {
		// 	return [Number(key), obj[key]];
		// });
		console.log(obj);
		$.ajax({
			method:"POST",
			headers: {'X-CSRF-TOKEN': $('input[name="_token"]').val()},
			url:'/draft-order',
			dataType: 'json',
			contentType: 'application/json; charset=UTF-8',
			data: JSON.stringify(obj),
			success: function(data) {
				console.log('successfully sent!');
				console.log(data);
			},
			error: function(data){
				console.log('errr, nope');
				console.log(data);
			}
		});
	});
	
	showHide();
});





