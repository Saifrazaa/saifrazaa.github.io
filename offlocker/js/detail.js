//$(document).ready(function(){

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('id');

var modal = document.getElementById("modalNotEnough");

var selectedProduct;
var selectedColors = [];

$.post(url + "/site/getDetail", { product_id: product }, function (data, status, xhr) {

	const colors = [...new Set(data.stock.map(item => item.color))];

	if (status == "error") {
		console.log(xhr)
	}

	if (data) {

		var pics = ""
		selectedProduct = data;
		if (data.pics) {
			data.pics.forEach(function callback(pic, index, array) {
				pics += `<div class="single-prd-item">
											<img class="img-fluid" src="${url}/upload/avatar/${pic}" alt="">
										</div>`
			});
		} else {

			pics = `<div class="single-prd-item">
											<img class="img-fluid" src="img/nophoto.png" alt="">
										</div>`
		}

		$('#detailPics').html(pics);

		$("#p_producto").text(data.producto.producto);
		$("#p_categoria").html('<a class="active" href="#"><span>Categoría</span > : ' + data.producto.categoria + '</a>');
		$("#p_price").text(data.producto.precio > 0 ? `$${new Intl.NumberFormat("es-CO").format(data.producto.precio)}` : "Precio No Disponible");
		//$("#p_disponibilidad").text(data.producto.);

		$("#p_descripcion").text(data.producto.descripcion);

		var colores = `<div class="nice-select" id="selColor" tabindex="0" ><span class="current" >` + colors[0] + `</span>
											<ul class="list">`;

		var tallas = '';

		var firstCl = "selected"

		colors.map((x) => {
			const col = data.stock.find((y) => y.color == x);
			colores += '<li data-value="' + col.color_id + '" class="option ' + firstCl + '" onclick="fncChangeColor(event)">' + col.color + '</li>';
			firstCl = '';

			var precio = data.producto.precio;
		});

		const tallasInfo = data.stock.filter((y) => y.color == colors[0]);

		tallasInfo.map((t) => {
			tallas += `<tr >
							<td valign="top">Talla  ` + t.talla + `: </td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td >
								<div  class="product_count">
									
									<input type="text" data-qty="` + t.cantidad + `" data-precio="` + data.producto.precio + `" 
										data-talla-id="` + t.talla_id + `" data-talla="` + t.talla + `" 
										id="sst` + t.talla_id + `" maxlength="12" value="0"
										title="Cantidad" class="input-text tallas"
										onchange="recalculate('sst${t.talla_id}', 'undefined');" />
									<button
										onclick="recalculate('sst` + t.talla_id + `', 'up');"
										class="increase items-count" type="button"><i
											class="lnr lnr-chevron-up"></i></button>
									<button
										onclick="recalculate('sst` + t.talla_id + `');"
										class="reduced items-count" type="button"><i
											class="lnr lnr-chevron-down"></i></button>
								</div>
							</td>
						</tr>`;
		});

		$("#divColors").html(colores + '</ul></div>');
		$("#price-list").html(tallas);

		$("#tobag").click(function (event) {
			event.preventDefault();
			var producto = selectedProduct.producto;
			producto.colors = selectedColors;
			addToCart(producto);
		});

		$("#towish").click(function (event) {
			addToWishes(product, event)

		});

		var options = {
			items: 1,
			autoplay: true,
			autoplayTimeout: 5000,
			nav: false,
			dots: true
		};

		if (data.pics && data.pics.length > 1) {
			options.loop = true;
		}

		$("#detailPics").owlCarousel(options);

	}
});


function fncChangeColor(e) {
	const sel = $(e.target).data("value");
	var tallas = '';
	const tallasInfo = selectedProduct.stock.filter((y) => y.color_id == sel);
	//selectedColors

	const selCol = selectedColors.find((sc)=> sc.color == tallasInfo[0].color);

	tallasInfo.map((t) => {
		
		const selTalla = selCol && selCol.tallas.find((st)=> st.talla_id == t.talla_id);
		
		tallas += `<tr >
					<td valign="top">Talla  ${t.talla}: </td>
					<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
					<td >
						<div  class="product_count">
							
							<input type="text" data-qty="${t.cantidad}" data-precio="${selectedProduct.producto.precio}" 
								data-talla-id="${t.talla_id}" data-talla="${t.talla}" 
								id="sst${t.talla_id}" maxlength="12" value="${(selTalla && selTalla.cantidad)||0}"
								title="Cantidad" class="input-text tallas"
								onchange="recalculate('sst${t.talla_id}', 'undefined');" />
							<button
								onclick="recalculate('sst${t.talla_id}', 'up');"
								class="increase items-count" type="button"><i
									class="lnr lnr-chevron-up"></i></button>
							<button
								onclick="recalculate('sst${t.talla_id}');"
								class="reduced items-count" type="button"><i
									class="lnr lnr-chevron-down"></i></button>
						</div>
					</td>
				</tr>`;
	});

	$("#price-list").html(tallas);
}


function recalculate(id, dir) {
	const element = $("#" + id);
	const sel = $("#selColor span");
	if (dir && dir == 'undefined') {
		if (isNaN(element.val())) {
			element.val(0);
			return;
		}
		if (element.val() > element.data("qty")) {
			$("#modalproducto").html(selectedProduct.producto.producto);
			$("#modalText").html(`Para el color <b>${sel.text()}</b> y talla <b>${element.data("talla")}</b> se tienen disponibles <b>${element.data("qty")}</b> unidades`);
			modal.style.display = "block";
			element.val(Number(element.data("qty")));
			return false;
		}
	} else if (dir && dir == 'up') {
		if (element.val() >= element.data("qty")) {
			$("#modalproducto").html(selectedProduct.producto.producto);
			$("#modalText").html(`Para el color <b>${sel.text()}</b> y talla <b>${element.data("talla")}</b> se tienen disponibles <b>${element.data("qty")}</b> unidades`);
			modal.style.display = "block";
			return false;
		}
		element.val(Number(element.val()) + 1)
	} else {
		if (element.val() <= 0) return false;
		element.val(Number(element.val()) - 1)
	}
	
	const selColor = selectedProduct.stock.find((sl) => sl.color == sel.text());
	var newcolor = { color: selColor.color, color_id: selColor.color_id, tallas: [] }
	
	$(".tallas").each(function (index, valor) {
		var element = $(valor);
		newcolor.tallas.push({ talla: element.data("talla"), talla_id: element.data("tallaId"), cantidad: Number(element.val()) });
	});

	selectedColors = selectedColors.filter((x) => x.color != sel.text());
	selectedColors.push(newcolor);

	var total = 0;
	selectedColors.map((sc) =>{
		sc.tallas.map((st) => {
			if(st.cantidad > 0){
				total += st.cantidad * Number(selectedProduct.producto.precio);
			}
		});
	} );

	const totalPrice = total > 0 ? new Intl.NumberFormat("es-CO").format(total) : 'N/D';

	$("#tobag").text(`A la bolsa $${totalPrice}`);
}
