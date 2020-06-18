var base_url = 'https://kreaserv.com/quizapp/index.php/api/';
var image_url = 'https://kreaserv.com/quizapp/assets/uploads/upload_image/';

var token = Lockr.get('token');
var user_data;
var email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var phone_regex = /^\d{10}$/;

var calendarDefault;

var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

var myApp = new Framework7({
    // swipePanel: 'left',
    material: true,
    preloadPreviousPage: false,
    uniqueHistory: true,
    uniqueHistoryIgnoreGetParameters: true,
    modalTitle: 'Pettato',
    imagesLazyLoadPlaceholder: 'img/lazyload.jpg',
    imagesLazyLoadThreshold: 50,
    statusbar: {
        iosOverlaysWebView: true,
    },
});


var mainView = myApp.addView('.view-main', {});

myApp.onPageInit('index', function(page) {
});

myApp.onPageInit('login', function(page) {
});

myApp.onPageInit('register', function(page) {
    load_city('#user_register-city_select', function(){});
});

myApp.onPageInit('main', function(page) {
});

myApp.onPageInit('subcategory', function(page) {
});