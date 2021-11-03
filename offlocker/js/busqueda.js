
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cat = urlParams.get('cat');
const searchValue = urlParams.get('search');

var serverData =  []

var categoria_id = cat?cat:0;
var marca_id=0;
var pagina =1;
var cantidad = 9;
var searchVal = searchValue ? searchValue : "";


function filterList(search, categoria, marca_id, precioMin,precioMax, order, qty, pag, firstLoad){
	$.post(url + "/site/getList", {search, categoria, marca_id, precioMin, precioMax, order, qty, pag}, function(data,status,xhr){
		
		let categoryList = ''
		let marcasList = ''
		let productResultList = ''
		let paginacion = ''
		
		if(status == "error"){
				console.log(xhr)
			}
			
		serverData = data
		
		if(data && data.categorias){
			data.categorias.forEach(function callback(categoria, index, array) {
				categoryList += `<li class="main-nav-list"><a data-toggle="collapse" href="" onclick="fncSelectCat(event, ` + categoria.categoria_id + `)" aria-expanded="false" aria-controls="` + categoria.categoria + `"><span
								 class="lnr lnr-arrow-right"></span>` + categoria.categoria + `<span class="number">(` + categoria.qty + `)</span></a>
						</li>
						`
			})
			
			$("#categoryList").html(categoryList)
		}
		
		if(data && data.marcas){
			data.marcas.forEach(function callback(marca, index, array) {
				marcasList += '<li class="filter-list"><input class="pixel-radio" type="radio" onclick="fncSelectBrand(' + marca.marca_id + ')"  value="' + marca.marca_id + '" id="' + marca.marca_id + '" name="marca"><label for="' + marca.marca_id + '">' + marca.marca + '<span>&nbsp(' + marca.qty + ')</span></label></li>'
									   
			})
			
			$("#marcasList").html(marcasList)
			
			if(marca_id !=0){
				let selected = $('input:radio[name=marca][value=' + marca_id + ']')
				if(selected)
					selected.prop('checked', true)
			}
		}
		
		if(data && data.result && data.result.length > 0){
			data.result.forEach(function callback(producto, index, array) {
				productResultList += `<div class="col-lg-4 col-md-6 col-sm-4 col-6">
							<div class="single-product">
								<a href="single-product.html?id=` + producto.prod_id + `">
									<img class="img-fluid" src="` + url + `/upload/avatar/` + producto.picname + `"  onError="this.src = 'img/nophoto.png' "  alt="">
								</a>
								<div class="product-details">
									<h6>` + producto.marca + `   ` + producto.nombre + `
													` + producto.categoria + `</h6>
									<div class="price">
										<h6>` + (producto.precio>0?'$' + producto.precio:'N/D') + `</h6>
										
									</div>
									<div class="prd-bottom">

										<a href="#" class="social-info" onclick="fncAddToBag(` + producto.prod_id + `, event)">
														<span class="ti-bag"></span>
														<p class="hover-text">A la bolsa</p>
													</a>
													<a href="" class="social-info" onclick="addToWishes(` + producto.prod_id + `, event)">
														<span class="lnr lnr-heart"></span>
														<p class="hover-text">A deseos</p>
													</a>
													<a href="single-product.html?id=` + producto.prod_id + `" class="social-info">
														<span class="lnr lnr-move"></span>
														<p class="hover-text">Ver más</p>
													</a>
									</div>
								</div>
							</div>
						</div>`
									   
			})
		
			var totalPages =0
			
			if(data && data.totalResult && data.totalResult >0){
				totalPages = Math.ceil( data.totalResult / cantidad)
			}
			
			if(totalPages>1){
			
				paginacion = `<a href="" class="prev-arrow" onclick="fncChangePage(event, ` + ( pagina - 1 ) + `)"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a>`
				
				if(pagina > 3)
					paginacion += `<a href="" onclick="fncChangePage(event, 1)" >1</a>
										  <a href="#" class="dot-dot" onclick="fncChangePage(event, ` + ( pagina - 3 ) + `)"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>`

				let ini=pagina<3?1:pagina -1
				let fin = pagina +1>totalPages? totalPages: pagina +1
				let i=0

				for( i=ini; i<=fin; i++){
					paginacion += `<a href="" onclick="fncChangePage(event, ` + i +`)" ` +  (pagina == i ? `class="active"` : ``) + `>` + i +`</a>`
				}

				if(totalPages  > pagina +2){
						paginacion += `<a href="#" class="dot-dot" onclick="fncChangePage(event, ` + ( pagina + 3 ) + `)"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
											  <a href="" onclick="fncChangePage(event, ` + totalPages+ `)">`+ totalPages + `</a>`
				}					

				paginacion += `<a href="" class="next-arrow" onclick="fncChangePage(event, ` + ( pagina +1 > totalPages ? totalPages: pagina +1 ) + `)"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>`
			}
						
			$("div.pagination").html(paginacion)
		}else{
			productResultList = '<div><b>No se encuentran productos con estas caracteristicas</b></div>'
		}
		
		$("#resultRow").html(productResultList);
		if(!firstLoad)
			document.getElementById("category").scrollIntoView({behavior: "smooth"});
		
	})
}

function fncAddToBag (prod_id, event){

	const producto = serverData.result.find((prd)=> prd.prod_id == prod_id);

	addToCart(producto, event);
}

function fncChangePage(event, page){
	event.preventDefault()
	
	if(page < 1)
		return;
	pagina =page
	
	setFilters()
}

function fncSelectCat(event, id){
	event.preventDefault()
	
	categoria_id = id
	marca_id = 0
	pagina =1
	
	setFilters()
}

function fncSelectBrand( id){
	
	marca_id = id
	pagina =1
	
	setFilters()
}

function setFilters(){
	
	let minPrice = $("#lower-value").html()
	let maxPrice = $("#upper-value").html()
	let order = $("#ordenar option:selected").val()
	let qty = cantidad = $("#mostrar option:selected").val()
	let page = pagina;
	
	filterList(searchVal, categoria_id,  marca_id, minPrice, maxPrice, order, qty,  page)
}

filterList( searchVal, categoria_id,  0, 0, 200000, 'prod.name', 9,  1, true)

   $(function(){

        if(document.getElementById("price-range")){
        
        var nonLinearSlider = document.getElementById('price-range');
        
        noUiSlider.create(nonLinearSlider, {
            connect: true,
            behaviour: 'tap',
            start: [ 0, 1000000 ],
            range: {
                // Starting at 500, step the value by 500,
                // until 4000 is reached. From there, step by 1000.
                'min': [ 0 ],
                '10%': [ 500, 500 ],
                '50%': [ 200000, 10000 ],
                'max': [ 1000000 ]
            }
        });


        var nodes = [
            document.getElementById('lower-value'), // 0
            document.getElementById('upper-value')  // 1
        ];

        // Display the slider value and how far the handle moved
        // from the left edge of the slider.
        nonLinearSlider.noUiSlider.on('update', function ( values, handle, unencoded, isTap, positions ) {
            nodes[handle].innerHTML = values[handle];
        });
		
		nonLinearSlider.noUiSlider.on('change.one', function () { setFilters (); });

        }

	});
	
	$(document).ready(function () {
		$("#catSpan").on('click', function(){
			if($("#categoryList").is(':visible'))
				$("#categoryList").hide();
			else $("#categoryList").show();
			
			$("#catSpan").removeClass("lnr-chevron-" + ($("#categoryList").is(':visible')? "down":"up"));
			$("#catSpan").addClass("lnr-chevron-" + ($("#categoryList").is(':visible')? "up":"down"));
		});

		$("#catSpanAll").on('click', function(){
			categoria_id = 0;
			setFilters();
		});

		$("#filterSpan").on('click', function(){
			if($("#filterList").is(':visible'))
				$("#filterList").hide();
			else $("#filterList").show();

			$("#filterSpan").removeClass("lnr-chevron-" + ($("#filterList").is(':visible')? "down":"up"));
			$("#filterSpan").addClass("lnr-chevron-" + ($("#filterList").is(':visible')? "up":"down"));
		});

		if($("#categoryList").is(':hidden')){
			$("#catSpan").removeClass("lnr-chevron-up");
			$("#catSpan").addClass("lnr-chevron-down");
		}

		if($("#filterList").is(':hidden')){
			$("#filterSpan").removeClass("lnr-chevron-up");
			$("#filterSpan").addClass("lnr-chevron-down");
		}
	});