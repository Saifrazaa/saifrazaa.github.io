$(document).ready(function () {
  // Shipment Type Selection
  $(".shipment-type .shipment-type-selection").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });
});
