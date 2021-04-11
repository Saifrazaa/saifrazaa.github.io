$(document).ready(function () {

    //Notifications Bell Btn Click
    $('#notifications-btn').on('click', function () {
        $('.notifications-sidebar').addClass('show');
        $('.sidebar-wrapper .overlay').removeClass('d-none');
    })

    //New Shipment Button Click
    $('#new-shipment-btn,#new-shipment-fab-btn').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.new-shipment-sidebar').removeClass('show');
            $('.sidebar-wrapper .overlay').addClass('d-none');
        }
        else {
            $(this).addClass('active');
            $('.new-shipment-sidebar').addClass('show');
            $('.sidebar-wrapper .overlay').removeClass('d-none');
        }
    })

    //Cancel New Shipment Creation Btn Click
    $('#cancel-newshipment-creation-btn').on('click', function () {
        $('.new-shipment-sidebar').removeClass('show');
        $('#new-shipment-btn,#new-shipment-fab-btn').removeClass('active');
    })

    //Currency Coverter Btn Click
    $('#currency-converter-btn').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.currency-converter-sidebar').removeClass('show');
            $('.sidebar-wrapper .overlay').addClass('d-none');
        }
        else {
            $(this).addClass('active');
            $('.currency-converter-sidebar').addClass('show');
            $('.sidebar-wrapper .overlay').removeClass('d-none');
        }
    })

    // Cancel Btn Click Currency Converter Sidebar
    $('#cancel-currency-converter-btn').on('click', function () {
        $('.currency-converter-sidebar').removeClass('show');
        $('#currency-converter-btn').removeClass('active');
    })

    //Close Sidebar Button for Mobile and Tablet Click
    $('#mobile-tablet-close-sidebar-btn').on('click', function () {
        $('.sidebar-wrapper').removeClass('show');
    })

    //Right panel overlay click
    $('.sidebar-wrapper .overlay').on('click', function () {
        $(this).addClass('d-none');
        $('.sidebar-wrapper').removeClass('show');
        $('#new-shipment-btn,#currency-converter-btn').removeClass('active');
    })

    //User Avatar Click
    $('#user-avatar-btn').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parent().find('.user-profile-dropdown').removeClass('show');
        }
        else {
            $(this).addClass('active');
            $(this).parent().find('.user-profile-dropdown').addClass('show');
        }
    })

    //Topbar Right Overlay Click
    $('.topbar-right .overlay').on('click', function () {
        $('#notifications-btn').removeClass('active');
        $('.notifications-panel').removeClass('show');
        $('.notifications-wrapper .pointer').addClass('d-none');
        $(this).addClass('d-none');
    })

    //Profile Settings button Click
    $('#profile-settings-btn').on('click', function () {
        $('.profile-settings-popup').addClass('show');
        $('.profile-settings-popup .overlay').removeClass('d-none');
    })

    //Profile Settings Panel Overlay Click
    $('.profile-settings-popup .overlay').on('click', function () {
        $('.profile-settings-popup').removeClass('show');
        $('.profile-settings-popup .overlay').addClass('d-none');
    })

    //Cancel Profile Settings Panel Button Click
    $('#cancel-profile-settings-panel').on('click', function () {
        $('.profile-settings-popup').removeClass('show');
        $('.profile-settings-popup .overlay').addClass('d-none');
    })

    //Save Profile Settings Changes Panel Button Click
    $('#save-profile-settings-changes').on('click', function () {
        $('.profile-settings-popup').removeClass('show');
        $('.profile-settings-popup .overlay').addClass('d-none');
    })

    //Menu Button Click on Topbar For Tablet and Mobile
    $('#menu-btn-tab-mobile').on('click', function () {
        $('.tablet-mobile-sidebar-menu').addClass('show');
        $('.tablet-mobile-sidebar-menu .overlay').removeClass('d-none');
    })

    //Tablet and Mobile Close Button click
    $('#close-tablet-mobile-sidebar').on('click', function () {
        $('.tablet-mobile-sidebar-menu').removeClass('show');
    })

    // Single Date Picker Customization

    $('input[name="singledate"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901,
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });

    $('input[name="singledate"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MMMM DD, YYYY'));
    });

    $('input[name="singledate"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });

    // Date Range Picker Customization
    $('input[name="daterange"]').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });

    $('input[name="daterange"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MMM DD, YYYY') + ' - ' + picker.endDate.format('MMM DD, YYYY'));
    });

    $('input[name="daterange"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });

    // Time Picker
    $('input[name="timepicker"]').mdtimepicker();


    //New Shipment Form Next Button Click
    $('#new-shipment-next-btn').on('click', function () {
        if (!($('.step.step-1').hasClass('completed'))) {
            $('.step.step-1').removeClass('active');
            $('.step.step-1').addClass('completed');
            $('.step.step-2').addClass('active');
            $('#new-shipment-back-btn').removeClass('d-none');

            // New Shipment Form Level 1 Hide and Level 2 Show
            $('.new-shipment-form .step-1-form').addClass('d-none');
            $('.new-shipment-form .step-2-form').removeClass('d-none');
        }
        else if (!($('.step.step-2').hasClass('completed'))) {
            $(this).addClass('d-none');
            $('.step.step-2').removeClass('active');
            $('.step.step-2').addClass('completed');
            $('.step.step-3').addClass('active');
            $('#new-shipment-finish-btn').removeClass('d-none');

            // New Shipment Form Level 2 Hide and Level 3 Show
            $('.new-shipment-form .step-2-form').addClass('d-none');
            $('.new-shipment-form .step-3-form').removeClass('d-none');
        }
    })

    //New Shipment Form Back Button Click
    $('#new-shipment-back-btn').on('click', function () {
        if ($('.step.step-3').hasClass('active')) {
            $('.step.step-3').removeClass('active');
            $('.step.step-2').removeClass('completed');
            $('.step.step-2').addClass('active');
            $('#new-shipment-next-btn').removeClass('d-none');
            $('#new-shipment-finish-btn').addClass('d-none');

            // New Shipment Form Level 3 Hide and Level 2 Show
            $('.new-shipment-form .step-3-form').addClass('d-none');
            $('.new-shipment-form .step-2-form').removeClass('d-none');
        }
        else if ($('.step.step-2').hasClass('active')) {
            $('.step.step-2').removeClass('active');
            $('.step.step-1').removeClass('completed');
            $('.step.step-1').addClass('active');
            $(this).addClass('d-none');

            // New Shipment Form Level 2 Hide and Level 1 Show
            $('.new-shipment-form .step-2-form').addClass('d-none');
            $('.new-shipment-form .step-1-form').removeClass('d-none');
        }
    })

    //Select Vehicle images on new shipment form
    $('.ship-vehicle-images-wrap .vehicle-img').on('click', function () {
        if (!($(this).hasClass('selected'))) {
            $('.ship-vehicle-images-wrap .vehicle-img').removeClass('selected')
            $(this).addClass('selected');
        }
    })

    //Finish Button Click New Shipment Creation
    $('#new-shipment-finish-btn').on('click', function () {
        $('.new-shipment-sidebar').removeClass('show');
        $('.step').removeClass('active completed');
        $('.step.step-1').addClass('active');
        $('#new-shipment-btn').removeClass('active');
        $('.new-shipment-form .step-2-form,.new-shipment-form .step-3-form').addClass('d-none');
        $('.new-shipment-form .step-1-form').removeClass('d-none');
        $(this).addClass('d-none');
        $('#new-shipment-next-btn').removeClass('d-none');
        $('.snack-bar-wrapper').removeClass('d-none');
        $('.snack-bar-msg-wrapper').text('New Shipment Created !!!');
        $('#new-shipment-fab-btn').removeClass('active');
    })

    //Cancel Profile Settings Panel Button Click
    $('#cancel-profile-settings-panel').on('click', function () {
        $('.profile-settings-popup').removeClass('show');
        $('.profile-settings-popup .overlay').addClass('d-none');
    })

    // Dropdown menu Script
    $('.dropdown-btn').on('focus', function () {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
        }
        else {
            $(this).parent().addClass('active');
        }
    })
    $('.dropdown-btn').on('focusout', function () {
        $(this).parent().removeClass('active');
    })

    //Profile Settings Button Mobile/Tablet Sidebar Menu
    $('#profile-settings-btn-mobile-tab').on('click', function () {
        $('.tablet-mobile-sidebar-menu').removeClass('show');
        $('.profile-settings-popup').addClass('show');
    })

    // Dashboard Filter Buttons Click
    $('.dashboard-filter-btn').on('click', function () {
        $('.dashboard-filter-btn').removeClass('active');
        $(this).addClass('active');
    })

    //Custom Filter Button Click on Dashboard
    $('#dashboard-custom-filter-btn').on('click', function () {
        $('.dashboard-filter-btn').removeClass('active');
        $(this).addClass('active');
        $('.dashboard-filter-panel').addClass('show');
    })

    //Discard Custom Filter
    $('#discard-custom-filter').on('click', function () {
        $('#dashboard-custom-filter-btn').removeClass('active');
        $('.dashboard-filter-panel').removeClass('show');
    })

    //Apply Button Click Custom Filter
    $('#apply-filter-dashboard-btn').on('click', function () {
        $('.dashboard-filter-panel').removeClass('show');
        $('#dashboard-custom-filter-btn').removeClass('active');
        $('.loader-wrapper').removeClass('d-none');
        setTimeout(() => {
            $('.loader-wrapper').addClass('d-none');
            $('.applied-filters-section').removeClass('d-none');
        }, 3000)
    })

    // Clear Dashboard Applied Filters
    $('#clear-dashboard-applied-filters').on('click', function () {
        $('.loader-wrapper').removeClass('d-none');
        setTimeout(() => {
            $('.loader-wrapper').addClass('d-none');
            $('.applied-filters-section').addClass('d-none');
        }, 1500)
    })

    //Close Snack Bar Cross Click
    $('.close-snack-bar').on('click', function () {
        $(this).parent().children('.snack-bar-msg-wrapper').text('')
        $(this).parent().addClass('d-none');
    })

})