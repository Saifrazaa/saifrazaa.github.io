
var bag = getCookie('deseos');
var serverData;

if (bag) {
	bag = JSON.parse(bag);

	var bagList = bag.items.map(function (x) {
		return x.id;
	})
	if (bagList.length > 0)
		$.post(url + "/site/getCart", { products_id: bagList }, function (data, status, xhr) {
			if (status == "error") {
				console.log(xhr)
			}
			var listado = ''
			if (data) {
				serverData = data;
				if (data && data.producto) {
					data.producto.forEach(function callback(producto, index, array) {
						listado += `<tr id="bagProduct_` + producto.prod_id + `">
                                <td>
									<div class="media">
										<a href="single-product.html?id=` + producto.prod_id + `">
											<div class="d-flex">
												<img height="100"  src="${url}/upload/avatar/product_` + producto.prod_id + `.jpg"  alt="" onError="this.src = 'img/nophoto.png' ">
											</div>
										</a>
                                        <div class="media-body">
                                            <p>` + producto.producto + `</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>` + (producto.precio > 0 ? '' + formatMoney(producto.precio) : 'No disponible') + `</h5>
                                </td>
                                <td>
									<div class="single-product">
										<div class="product-details">
											<div class="prd-bottom">
												<a href="#" class="social-info" onclick="removeFrom('deseos', ` + producto.prod_id + `); wishRemoveProd(` + producto.prod_id + `)"}>
													<span class="ti-trash"></span>
													<p class="hover-text">Remover</p>
												</a>
												<br>
												<a href="" class="social-info" onclick="removeFrom('deseos', ` + producto.prod_id + `); wishRemoveProd(` + producto.prod_id + `); fncAddToBag(` + producto.prod_id + `, event);">
													<span class="ti-bag"></span>
													<p class="hover-text">A la bolsa</p>
												</a>
											</div>
										</div>
									</div>
									</div>
								</td>
                            </tr>`;
					})
				}
				$("#cartList  tr:first").after(listado);
			}
		});
}

function fncAddToBag(prod_id, event) {
	const producto = serverData.producto.find((prd) => prd.prod_id == prod_id);
	addToCart(producto, event);
}

function wishRemoveProd(id) {
	$('#bagProduct_' + id).remove();
}

function formatMoney(value) {
	return parseInt(value).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })
}