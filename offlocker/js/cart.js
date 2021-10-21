


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('id')

var carro = getCookie('carrito');
var bag = JSON.parse(carro);
var counter = 0;
var hasPayu = true;


if (carro) {

	var modal = document.getElementById("modalNotEnough");

	var serverInfo = []

	var bagList = bag.items.map(function (x) {
		return x.product_id || x.prod_id;
	})

	$.post(url + "/site/getCart", { products_id: bagList }, function (data, status, xhr) {

		if (status == "error") {
			console.log(xhr)
		}

		var listado = ''

		if (data) {

			serverInfo = data

			if (data && data.producto) {

				var subtotal = 0;
				var mayor = ''
				data.producto.forEach(function callback(producto, index, array) {

					subtotal += parseInt(producto.precio)
					if (producto.precio <= 0)
						mayor = '<b>&gt;</b>&nbsp;';
					listado += `<tr id="bagProduct_` + producto.prod_id + `">
								<td>
									
									<div class="media">
										<a href="single-product.html?id=` + producto.prod_id + `">
											<div class="d-flex">
												<img height="100"  src="` + url + `/upload/avatar/product_` + producto.prod_id + `.jpg"  alt="" onError="this.src = 'img/nophoto.png' ">
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
								<td id="colsize_${producto.prod_id}">
									` + getColorsAndSizes(producto.prod_id) + `
                                </td>
								<td id="subTot_${producto.prod_id}">
								</td>
								<td>
									<div class="single-product">
										<div class="product-details">
											<div class="prd-bottom">
												<a href="#" class="social-info" onclick="removeFrom('carrito', ` + producto.prod_id + `); cartRemoveProd(` + producto.prod_id + `); updateCarQty()"}>
													<span class="ti-trash"></span>
													<p class="hover-text">Remover</p>
												</a>
												<br>
												<a href="" class="social-info" onclick="removeFrom('carrito', ` + producto.prod_id + `); cartRemoveProd(` + producto.prod_id + `); addToWishes(` + producto.prod_id + `, event); updateCarQty()">
													<span class="lnr lnr-heart"></span>
													<p class="hover-text">A deseos</p>
												</a>
											</div>
										</div>
									</div>
									</div>
								</td>
                            </tr>`
				})
			}

			$("#cartList  tr:first").after(listado);
			recalculate();
			$(document).on("click", ".nice-select .option:not(.disabled)", function (t) {
				var s = $(this),
				n = s.closest(".nice-select");
				const prid = n.data("producto-id");
				const newColor = s.data("value");
				$(`#colsize_${prid}`).empty();
				$(`#colsize_${prid}`).append(getColorsAndSizes(prid, newColor));
			})
		}
	});
}

function getColorsAndSizes(id, selColor) {
	data = serverInfo;
	if (data.dispo) {
		var tabla = `<table >
							<tbody >`;

		var dispo = data.dispo.filter(x => x.id == id);

		const colors = [...new Set(dispo.map(item => item.color))];
		const tallas = dispo.filter(x => x.color_id == (selColor || dispo[0].color_id));
		const producto = data.producto.find((pr) => pr.prod_id == id);

		let curCol = dispo.find(x=> x.color_id == (selColor || dispo[0].color_id)).color;

		var prodColors = `<div class="nice-select" data-producto-id="${id}"><span class="current">${curCol}</span>
									<ul class="list">`

		colors.map((dispcolor) => {
			const col = dispo.find((discol) => discol.color == dispcolor);
			prodColors += `<li data-value="${col.color_id}" class="option">${col.color}</li>`;
		});

		prodColors += '</ul></div>';
		let currTallas = `<table ><tbody >`;

		tallas.map((seltalla) => {
			let qtysel = 0;
			const currentBag = bag.items.find((prod) => prod.product_id == id || prod.prod_id == id);
			if(currentBag.colors){
				const curCol = currentBag.colors.find(x=> x.color_id == (selColor || dispo[0].color_id));
				if(curCol){
					const curTalla = curCol.tallas.find(x=> x.talla_id == seltalla.talla_id);
					qtysel = ( curTalla && curTalla.cantidad ) || 0; 
				}
				
			}

			currTallas += `<tr >
				<td valign="top">Talla  ${seltalla.talla}: </td>
				<td ><div  class="product_count">
						<input type="text" data-qty="${seltalla.cantidad}" data-precio="${producto.precio}" 
							data-talla-id="${seltalla.talla_id}" data-talla="${seltalla.talla}" 
							data-color="${seltalla.color}" data-color-id="${seltalla.color_id}"  data-prod-id="${producto.prod_id}"
							id="sst${seltalla.color_id}_${seltalla.talla_id}" maxlength="12" value="${qtysel}"
							title="Cantidad" class="input-text tallas" />
						<button
							onclick="recalculate('sst${seltalla.color_id}_${seltalla.talla_id}', 'up');"
							class="increase items-count" type="button"><i
								class="lnr lnr-chevron-up"></i></button>
						<button
							onclick="recalculate('sst${seltalla.color_id}_${seltalla.talla_id}');"
							class="reduced items-count" type="button"><i
								class="lnr lnr-chevron-down"></i></button>
					</div>
				</td>
			</tr>`;
		});

		currTallas += `</table></tbody >`;
		tabla += `<tr><td class="prodcolor">${prodColors}</td><td class="prodtallas">${currTallas}</td></tr>`;

		return `${tabla}</tbody></table>`;
	}
	return '<div>Ya no hay disponibilidad para este producto</div>';
}

function recalculate(id, dir) {
	const element = $("#" + id);
	if(element.length) {
		if (dir && dir == 'up') {
			if (element.val() >= element.data("qty")) {
				const producto = serverInfo.producto.find((pr) => pr.prod_id == element.data("prodId"));

				$("#modalproducto").html(producto.producto);
				$("#modalText").html(`Para el color <b>${element.data("color")}</b> y talla <b>${element.data("talla")}</b> se tienen disponibles <b>${element.data("qty")}</b> unidades`);
				modal.style.display = "block";
				return false;
			}
			element.val(Number(element.val()) + 1)
		} else {
			if (element.val() <= 0) return false;
			element.val(Number(element.val()) - 1)
		}

		const updateItem = bag.items.find(x => x.prod_id == element.data('prod-id'));
		if(updateItem.colors) {
			const updateColor = updateItem.colors.find(x=> x.color_id == element.data('color-id'));
			if(updateColor){
				const updateTalla = updateColor.tallas.find(x => x.talla_id == element.data("talla-id"));
				if(updateTalla){
					updateTalla.cantidad = element.val();
				}else{
					updateColor.tallas.push({ talla_id: element.data("talla-id"), talla: element.data("talla"), cantidad: element.val() });
				}
			} else {
				updateItem.colors.push ({color: element.data('color'), color_id: element.data('color-id'), 
				tallas: [ { talla_id: element.data("talla-id"), talla: element.data("talla"), cantidad: element.val() }] });
			}
		} else {
			updateItem.colors = [ {color: element.data('color'), color_id: element.data('color-id'), 
									tallas: [ { talla_id: element.data("talla-id"), talla: element.data("talla"), cantidad: element.val() }] }];
		}
		setCookie('carrito', JSON.stringify(bag));
	}

	var mayor = '';
	var subtotal = 0;

	bag.items.map(item => {
		var valor = 0;
		item.colors && item.colors.map(color => {
			color.tallas.map(talla => {
				valor += talla.cantidad * item.precio;
				if(item.precio==0) mayor = '> ';
			});
		});
		subtotal += valor;
		$(`#subTot_${item.prod_id}`).text(item.precio > 0 ? `$${new Intl.NumberFormat("es-CO").format(valor)}` : 'N/D');
	});

	const totalPrice = new Intl.NumberFormat("es-CO").format(subtotal);
	$("#subtotal").html(`${mayor} $${totalPrice}`)

	return false;
}

function formatMoney(value) {
	return new Intl.NumberFormat("es-CO").format(value);
}

function cartRemoveProd(id) {
	$('#bagProduct_' + id).remove();
}

async function sendOrder(clear){
	bag.userId = 1; ///pendiente  registrar el usuario que es
	bag.formaPago = clear ? 0:1;  /// 0: pedido por whatsapp, 1: pago en linea

	if(!bag.pedidoId)
		await $.post(url + "/site/registerOrder", { bag }, function (data, status, xhr) {
			if(clear){
				clearCart();
			}else{
				bag.pedidoId = data.pedidoId;
				bag.referencia = data.referencia;
				setCookie('carrito', JSON.stringify(bag));
			}
		});

	return true;
}

function fncDoOrder(event) {

	if (event)
		event.preventDefault()

	$.post(url + "/site/getWhatsapp", {}, function (data, status, xhr) {
		let resumen = document.getElementById("resumenCompra");

		let whatsappNumbers = data.whatsapp.split(',');
		let whatsappNumber = whatsappNumbers[Math.floor(Math.random() * whatsappNumbers.length)];

		let resumenText = '';
		let whatsapp = `https://api.whatsapp.com/send?phone=57` + whatsappNumber + `&text=Hola, Estoy interesado en los siguientes productos que vi en su tienda: `

		bag.items.map((car) => {
			let hasQty = false;
			let innerresumenText = `<p><table><tr><th colspan="3">${car.categoria} - ${car.producto}</th></tr>`;
			let innerwhatsapp = `\n\nId: ${car.prod_id} - Producto: ${car.categoria} - ${car.producto}`;

			car.colors && car.colors.map((col) => {
				innerresumenText += `<tr><td ><b>Color:</b></td><td > ${col.color}</td></tr>`;
				innerwhatsapp += `\nColor: ${col.color}`;

				col.tallas.map((tall) => {
					if (tall.cantidad > 0) {
						hasQty=true;
						innerresumenText += `<tr><td></td><td><b>Talla:</b> ${tall.talla} </td><td>Cantidad: ${tall.cantidad}</td><td>Valor: ${tall.cantidad * car.precio}</td></tr>`;
						innerwhatsapp += `\nTalla: ${tall.talla} Cantidad:${tall.cantidad} Valor:${tall.cantidad * car.precio}`;
					}
				});
			});

			if(hasQty){
				resumenText += `${innerresumenText}</table></p>`;
				whatsapp += innerwhatsapp;
			}
			
		})

		$("#resumenBody").html(resumenText);
		if(!hasPayu)
			$("#payAndOrderBtn").css({ display: "none" });
		$("#doOrderBtn").attr('href', encodeURI(whatsapp));

		resumen.style.display = "block"
	});

}


function clearCart() {
	document.getElementById('resumenCompra').style.display = 'none';
	deleteCookie('carrito');
	document.location = 'index.html';
}

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}


$(document).ready(function () {

});

