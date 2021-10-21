var textos;
var categorias;
var lstProds;

$(document).ready(function () {

	var latestProduct = ``;
	var nextProduct = ``;

	$.post(url + "/site/getLatest", { qty: 8 }, function (data, status, xhr) {

		if (status == "error") {
			console.log(xhr)
		}

		if (data && data.lastproductos) {

			lstProds = data.lastproductos;

			data.lastproductos.forEach(function callback(producto, index, array) {

				latestProduct += `<div class="col-lg-3 col-md-6">
												<div class="single-product">
													<div class="zoom">
													<a href="single-product.html?id=` + producto.prod_id + `" >
														<img src="` + url + `/upload/avatar/` + producto.picname + `"  onError="this.src = 'img/nophoto.png' " alt="">
													</a>
													</div>
													<div class="product-details">
														<h6>` + producto.marca + `   ` + producto.nombre + `
														` + producto.categoria + `</h6>
														<div class="price">
															<h6>` + (producto.precio > 0 ? '$' + producto.precio : 'N/D') + `</h6>
															<h6 class="l-through"></h6>
														</div>
														<div class="prd-bottom">
															<a href="#" class="social-info"  onclick="fncAddToBag(` + producto.prod_id + `, event)">
																<span class="ti-bag"></span>
																<p class="hover-text">add to bag</p>
															</a>
															<a href="#" class="social-info" onclick="addToWishes(` + producto.prod_id + `, event)">
																<span class="lnr lnr-heart"></span>
																<p class="hover-text">Wishlist</p>
															</a>
															<a href="single-product.html?id=` + producto.prod_id + `" class="social-info">
																<span class="lnr lnr-move"></span>
																<p class="hover-text">view more</p>
															</a>
														</div>
													</div>
												</div>
											</div>`;

			})

		}

		if (data && data.nextproductos) {

			data.nextproductos.forEach(function callback(producto, index, array) {

				nextProduct += `        
									<div class="col-lg-3 col-md-6">
										<div class="single-product">
											<a href="single-product.html?id=` + producto.prod_id + `">
												<img src="` + url + `/upload/avatar/` + producto.picname + `"  onError="this.src = 'img/nophoto.png' " alt="">
											</a>
											<div class="product-details">
												<h6>` + producto.marca + `   ` + producto.nombre + `
													` + producto.categoria + `</h6>
												<div class="price">
													<h6>` + (producto.precio > 0 ? '$' + producto.precio : 'N/D') + `</h6>
													<h6 class="l-through"></h6>
												</div>
												<div class="prd-bottom">
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

		}


		$("#latestProducts").html(latestProduct);
		$("#nextProducts").html(nextProduct);

		$(".active-product-area").owlCarousel({
			items: 1,
			autoplay: false,
			autoplayTimeout: 5000,
			loop: true,
			nav: true,
			navText: ["<img src='img/product/prev.png'>", "<img src='img/product/next.png'>"],
			dots: false
		});

	});

	if (!textos) {
		$.post(url + "/site/getTexts", { pagina: 'index' }, function (data, status, xhr) {

			if (status == "error") {
				console.log(xhr)
			}

			if (data && data.textos) {
				textos = data.textos
				categorias = data.categorias
				printText()
			}
		});
	} else {
		printText()
	}

	$('.open-popup-link').magnificPopup({
		type:'inline',
		midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	  });


});

function fncAddToBag (prod_id, event){
	const producto = lstProds.find((prd)=> prd.prod_id == prod_id);

	addToCart(producto, event);
}


function printText() {

	let carouselContent = ''
	let i = 1
	let carItem = textos.find(x => x.nombre == 'bigItems_pic1')
	while (carItem) {
		let picId = 'bigItems_pic' + i
		carouselContent += `<div class="row single-slide align-items-center d-flex">
										<div class="col-lg-12">
											<div class="banner-img">
												<img class="img-fluid" src="` + carItem.texto + `" alt="">
											</div>
										</div>
									</div>`
		i++
		carItem = textos.find(x => x.nombre == ('bigItems_pic' + i))
	}

	$("#bigCarrousel").html(carouselContent);

	var carOptions = {
		items: 1,
		autoplay: false,
		autoplayTimeout: 5000,
		nav: true,
		navText: ["<img src='img/banner/prev.png'>", "<img src='img/banner/next.png'>"],
		dots: false
	};

	if (i > 2) carOptions.loop = true;


	$("#bigCarrousel").owlCarousel(carOptions);

	if (categorias) {
		let i = 1
		categorias.forEach(function (value, index, arr) {
			const posf = i === 5 ? 'b' : (i === 2 || i === 3) ? 'p' :'g';
			$("#cat" + i).prop('href', 'category.html?cat=' + value.id)
			$("#imgcat" + i).attr('src', `img/category/cat_${value.id}_${posf}.jpg?${Math.random()}`).load(function(){});
			$("#cat" + i + " div h6").text(value.name);
			i++;
		})
	}


}