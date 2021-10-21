function setCookie(name, value) {
	document.cookie = name + "=" + encodeURIComponent(value) + ";";
}

function getCookie(name) {
	var ca = decodeURIComponent(document.cookie).split(';');

	let searched = ca.find(x => x.includes(name + "="));

	if (searched) {
		return searched.substring(searched.indexOf('=') + 1);
	}

	return "";
}

function addToCart(producto, event) {

	if (event) event.preventDefault();

	var carrito = getCookie("carrito");
	var jsonCarrito;
	if (carrito) {
		jsonCarrito = JSON.parse(carrito);
		var currProducto = jsonCarrito.items.find((x) => x.producto == producto.producto && x.categoria == producto.categoria);
		if(!currProducto) {
			jsonCarrito.items.push(producto);
		}else{
			producto.colors.map((x) => {
				var selcolor = currProducto.colors.find((c) => c.color == x.color);
				if(selcolor){
					x.tallas.map((t) => {
						var seltalla = selcolor.tallas.find((it)=> it.talla_id == t.talla_id);
						if(seltalla){
							seltalla.cantidad += t.cantidad;
						}else{
							seltalla.push(t);
						}
					});
				}else{
					selcolor.push(x);
				}
			});
		}
	} else {
		jsonCarrito = { items: [{ ...producto }] };
	}

	setCookie('carrito', JSON.stringify(jsonCarrito));
	updateCarQty();

	let modalCart = document.getElementById("modalBagAdded");
	$("#mbaText").html(`Se ha adicionado a la bolsa el producto <b>${producto.producto}</b>`);
	if (modalCart)
		modalCart.style.display = "block";
}

function addToWishes(pr_id, event) {
	if (event)
		event.preventDefault()

	addTo('deseos', pr_id, 1);
}

function addTo(name, id, qty) {

	removeFrom(name, id)

	let jsonCook
	let cook = getCookie(name)

	if (cook) {
		jsonCook = JSON.parse(cook)
	} else {
		jsonCook = { items: [] }
	}

	jsonCook.items.push({ id, qty })
	setCookie(name, JSON.stringify(jsonCook))

}

function removeFrom(name, id) {

	let jsonCook
	let cook = getCookie(name)

	if (cook) {
		jsonCook = JSON.parse(cook)

		jsonCook.items = jsonCook.items.filter(x => x.id != id && x.prod_id != id);

		setCookie(name, JSON.stringify(jsonCook))
	}

}


function appendCookie(name, value) {
	let jsonCook
	let cook = getCookie(name)

	if (cook) {
		jsonCook = JSON.parse(cook)
	} else {
		jsonCook = {}
	}

	jsonCook.push(value)

	setCookie(name, JSON.stringify(jsonCook))
}

function deleteCookie(name) {
	document.cookie = name + "=; max-age=0; ";
}