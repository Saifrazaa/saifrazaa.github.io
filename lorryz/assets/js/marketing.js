$(document).ready((function(){$(".shipment-type .shipment-type-selection").on("click",(function(){$(this).siblings().removeClass("active"),$(this).addClass("active")})),$(".track-shipment").on("click",(function(){$(".live-tracking-page .loader-wrapper").removeClass("d-none"),setTimeout((()=>{$(".live-tracking-page .loader-wrapper").addClass("d-none"),$(".live-tracking-page .live-tracking-wrapper").addClass("d-none"),$(".live-tracking-page .tracked-shipment-detail").removeClass("d-none")}),2e3)})),$("#careers-file-upload").on("click",(function(){$(".file-input-careers").click()})),$(".file-input-careers").on("change",(function(){const e=$(this).prop("files")[0];$(".career-resume").val(e.name)})),$(".mark-popup .overlay,.mark-popup .close-popup-btn").on("click",(function(){$(".mark-popup").removeClass("show")})),$(".login-btn").on("click",(function(){$(".mark-popup").removeClass("show"),$(".mark-login-popup").addClass("show")})),$(".signup-btn").on("click",(function(){$(".mark-popup").removeClass("show"),$(".signup-options-wrapper-popup").addClass("show")})),$(".signup-options-wrapper-popup .signup-option").on("click",(function(){var e=$(this).children("span").text();console.log(e),$(".signup-options-wrapper-popup").removeClass("show"),"CUSTOMER"===e?$(".signup-form-customers-popup").addClass("show"):$(".signup-form-carriers-popup").addClass("show")}));var e=60;$(".next-btn-signup-popup").on("click",(function(){setInterval((()=>{e>0?($(".resend-otp-code .resend-timer span").text(e+"s"),e-=1):($(".resend-otp-code .resend-timer").addClass("d-none"),$(".resend-otp-code .resend-code-btn").removeClass("d-none"))}),1e3),$(".mark-popup").removeClass("show"),$(".enter-signup-otp-popup").addClass("show")})),$(".resend-code-btn").on("click",(function(){$(this).parent().children(".resend-timer").removeClass("d-none"),$(this).parent().children(".resend-code-btn").addClass("d-none"),$(this).parent().find(".resend-timer span").text("60s"),e=60})),$(".digit-group").find("input").each((function(){$(this).attr("maxlength",1),$(this).on("keyup",(function(e){var o=$($(this).parent());if(8===e.keyCode||37===e.keyCode){var s=o.find("input#"+$(this).data("previous"));s.length&&$(s).select()}else if(e.keyCode>=48&&e.keyCode<=57||e.keyCode>=65&&e.keyCode<=90||e.keyCode>=96&&e.keyCode<=105||39===e.keyCode){var n=o.find("input#"+$(this).data("next"));n.length?$(n).select():o.data("autosubmit")&&o.submit()}}))})),$(".OTP-confirmation-btn").on("click",(function(){$(".mark-popup").removeClass("show"),$(".signup-success-popup").addClass("show")})),$(".forgot-password-btn").on("click",(function(){$(".mark-popup").removeClass("show"),$(".mark-forgotpaswrd-popup").addClass("show")})),$(".back-to-signup-choices").on("click",(function(){$(".mark-popup").removeClass("show"),$(".signup-options-wrapper-popup").addClass("show")})),$(".sign-up-as-customers").on("click",(function(){$(".signup-form-customers-popup").addClass("show")})),$(".sign-up-as-carrier").on("click",(function(){$(".signup-form-carriers-popup").addClass("show")})),$("#request-for-rate-btn").on("click",(function(){$(".request-for-rate-popup").addClass("show")})),$(".request-btn-popup").on("click",(function(){setInterval((()=>{e>0?($(".resend-otp-code.requestRate .resend-timer span").text(e+"s"),e-=1):($(".resend-otp-code.requestRate .resend-timer").addClass("d-none"),$(".resend-otp-code.requestRate .resend-code-btn").removeClass("d-none"))}),1e3),$(".request-for-rate-popup").removeClass("show"),$(".otp-for-rate-request").addClass("show")})),$(".rate-request-otp-confirm").on("click",(function(){$(".otp-for-rate-request").removeClass("show"),$(".estimated-cost-popup").addClass("show")})),$(".back-to-request-form").on("click",(function(){$(".otp-for-rate-request").removeClass("show"),$(".request-for-rate-popup").addClass("show")})),$(".book-shipment-popup-btn").on("click",(function(){$(".mark-popup").removeClass("show"),$(".shipment-booking-form-popup").addClass("show")})),$(".finalise-booking-btn").on("click",(function(){$(".mark-popup").removeClass("show"),$(".shipment-booking-success-popup").addClass("show")})),$(".dropdown .dropdown-selected").on("click",(function(){$(this).next().hasClass("show")?$(this).next().removeClass("show"):$(this).next().addClass("show")})),$(".country-selection-dropdown .dropdown-menu").on("click",(function(){$(this).parent().removeClass("show"),$(this).parent().children(".dropdown-menu").removeClass("selected"),$(this).addClass("selected"),$(this).attr("value");var e=$(this).children("img").attr("src");$(".country-selection-dropdown").find(".dropdown-selected img").attr("src",e)})),window.screen.width<=990&&(new SimpleBar(document.querySelector(".signup-options-wrapper-popup .mark-popup-body")),new SimpleBar(document.querySelector(".signup-form-customers-popup .mark-popup-body")),new SimpleBar(document.querySelector(".signup-form-carriers-popup .mark-popup-body")),new SimpleBar(document.querySelector(".shipment-booking-form")))}));