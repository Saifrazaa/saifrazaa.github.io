$(document).ready((function(){$(".shipment-type .shipment-type-selection").on("click",(function(){$(this).siblings().removeClass("active"),$(this).addClass("active")})),$(".track-shipment").on("click",(function(){$(".live-tracking-page .loader-wrapper").removeClass("d-none"),setTimeout((()=>{$(".live-tracking-page .loader-wrapper").addClass("d-none"),$(".live-tracking-page .live-tracking-wrapper").addClass("d-none"),$(".live-tracking-page .tracked-shipment-detail").removeClass("d-none")}),2e3)})),$("#careers-file-upload").on("click",(function(){$(".file-input-careers").click()})),$(".file-input-careers").on("change",(function(){const o=$(this).prop("files")[0];$(".career-resume").val(o.name)})),$(".mark-popup .overlay,.mark-popup .close-popup-btn").on("click",(function(){$(".mark-popup").removeClass("show"),setTimeout((()=>{$(".mark-sign-up-popup .mark-popup-body").addClass("d-none"),$(".signup-options-wrapper").removeClass("d-none"),$(".request-for-rate-popup .estimated-cost-popup").addClass("d-none"),$(".request-for-rate-popup .request-info-form").removeClass("d-none")}),300)})),$(".login-btn").on("click",(function(){$(".mark-popup").removeClass("show"),$(".mark-login-popup").addClass("show")})),$(".signup-btn").on("click",(function(){$(".mark-popup").removeClass("show"),$(".mark-sign-up-popup").addClass("show")})),$(".mark-sign-up-popup .signup-option").on("click",(function(){var o=$(this).children("span").text();console.log(o),$(".mark-sign-up-popup .signup-options-wrapper").addClass("d-none"),"CUSTOMER"===o?$(".mark-sign-up-popup .signup-form-customers").removeClass("d-none"):$(".mark-sign-up-popup .signup-form-carriers").removeClass("d-none")})),$(".next-btn-signup-popup").on("click",(function(){$(this).parents(".mark-popup-body").addClass("d-none"),$(".enter-signup-otp-code").removeClass("d-none")})),$(".digit-group").find("input").each((function(){$(this).attr("maxlength",1),$(this).on("keyup",(function(o){var n=$($(this).parent());if(8===o.keyCode||37===o.keyCode){var s=n.find("input#"+$(this).data("previous"));s.length&&$(s).select()}else if(o.keyCode>=48&&o.keyCode<=57||o.keyCode>=65&&o.keyCode<=90||o.keyCode>=96&&o.keyCode<=105||39===o.keyCode){var p=n.find("input#"+$(this).data("next"));p.length?$(p).select():n.data("autosubmit")&&n.submit()}}))})),$(".OTP-confirmation-btn").on("click",(function(){$(this).parents(".mark-popup-body").addClass("d-none"),$(".signup-success").removeClass("d-none")})),$(".forgot-password-btn").on("click",(function(){$(".mark-popup").removeClass("show"),$(".mark-forgotpaswrd-popup").addClass("show")})),$(".back-to-signup-choices").on("click",(function(){$(".mark-sign-up-popup .mark-popup-body").addClass("d-none"),$(".signup-options-wrapper").removeClass("d-none")})),$(".sign-up-as-customers").on("click",(function(){$(".mark-sign-up-popup .mark-popup-body").addClass("d-none"),$(".mark-sign-up-popup .signup-form-customers").removeClass("d-none"),$(".mark-sign-up-popup").addClass("show")})),$(".sign-up-as-carrier").on("click",(function(){$(".mark-sign-up-popup .mark-popup-body").addClass("d-none"),$(".mark-sign-up-popup .signup-form-carriers").removeClass("d-none"),$(".mark-sign-up-popup").addClass("show")})),$("#request-for-rate-btn").on("click",(function(){$(".request-for-rate-popup").addClass("show")})),$(".request-btn-popup").on("click",(function(){$(".request-info-form").addClass("d-none"),$(".estimated-cost-popup").removeClass("d-none")})),$(".book-shipment-popup-btn").on("click",(function(){$(".mark-popup").removeClass("show"),$(".shipment-booking-form").addClass("show")})),$(".finalise-booking-btn").on("click",(function(){$(".mark-popup").removeClass("show"),$(".shipment-booking-success-popup").addClass("show")}))}));