document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    myApp.showIndicator();
    document.addEventListener("backbutton", function(e) {
        e.preventDefault();
        var page = myApp.getCurrentView().activePage;
        image_from_device = '';
        console.log(page.name);
        if (page.name == "main" || page.name == "index") {
            myApp.confirm('Are you sure you want to exit the app?', function() {
                navigator.app.clearHistory();
                navigator.app.exitApp();
            });
        } else {
            mainView.router.back({});
        }
    }, false);

    user_data = token;
    if (token === undefined) {
        myApp.hideIndicator();
        goto_page('index.html');
    } else {
        myApp.hideIndicator();
        mainView.router.load({
            url: 'main.html',
            query: {
                id: token
            },
            ignoreCache: true,
        });
    }
}

function j2s(json) {
    return JSON.stringify(json);
}

function toggleMenu() {
    $(".toggleSubMenu").toggleClass('hide');
}

function goto_page(page) {
    mainView.router.load({
        url: page,
        ignoreCache: true,
    });
}

function logout() {
    Lockr.flush();
    token = false;
    mainView.router.load({
        url: 'index.html',
        ignoreCache: false,
    });
}

function continue_btn_signin() {
    if (token === undefined) {
        mainView.router.load({
            url: 'login.html',
            ignoreCache: true,
        });
    } else {
        mainView.router.load({
            url: 'main.html',
            ignoreCache: true,
        });
    }
}

function goto_register() {
    if (token === undefined) {
        mainView.router.load({
            url: 'register.html',
            ignoreCache: true,
        });
    } else {
        mainView.router.load({
            url: 'main.html',
            ignoreCache: true,
        });
    }
}

function login() {
    var email = $('#login-username').val().trim();
    var password = $('#login-password').val().trim();
    if (email == '') {
        myApp.alert('Please enter email id');
        return false;
    }

    if (password == '') {
        myApp.alert('Please enter password');
        return false;
    }

    myApp.showIndicator();
    $.ajax({
        url: base_url + 'login',
        type: 'POST',
        crossDomain: true,
        data: {
            identity: email,
            password: password,
            push_id: Lockr.get('push_key'),
        },
    })
    .done(function(res) {
        myApp.hideIndicator();
        if (res.status == 'success') {
            Lockr.set('token', res.response);
            token = res.response;
            user_data = res.response;
            account_default_id = user_data.id;
            mainView.router.load({
                url: 'main.html',
                ignoreCache: true,
            });
        } else {
            myApp.alert(res.api_msg);
        }
    })
    .fail(function(err) {
        myApp.hideIndicator();
        myApp.alert('Some error occured while processing your request, Please try again later.');
    })
    .always(function() {});
}

function register_user() {
    var name = $('#user_register-name').val().trim();
    var email = $('#user_register-email').val().trim();
    var mobile = $('#user_register-mobile').val().trim();
    var password = $('#user_register-password').val().trim();
    var confirm_password = $('#user_register-confirm_password').val().trim();
    var city_id = $('#user_register-city_select').val();

    if (name == '') {
        myApp.alert('Please enter name');
        return false;
    }

    if (email == '') {
        myApp.alert('Please enter email id');
        return false;
    }

    if (!email.match(email_regex)) {
        myApp.alert('Please enter valid email id');
        return false;
    }

    if (password == '') {
        myApp.alert('Please enter password');
        return false;
    }

    if (confirm_password == '') {
        myApp.alert('Please confirm password');
        return false;
    }

    if (password!=confirm_password) {
        myApp.alert('Password does not match');
        return false;
    }

    if (mobile == '') {
        myApp.alert('Please enter mobile');
        return false;
    }

    if (city_id == '') {
        myApp.alert('Please select city');
        return false;
    }

    if (!$("#user_register-tnc").is(":checked")) {
        myApp.alert('Please agree the terms and conditions!');
        return false;
    }

    myApp.showIndicator();
    $.ajax({
        url: base_url + 'create_user',
        type: 'POST',
        dataType: 'json',
        crossDomain: true,
        data: {
            first_name: name,
            username: email,
            email: email,
            password: password,
            mobile: mobile,
            city_id: city_id,
            medium: 'register',
        },
    }).done(function(res) {
        myApp.hideIndicator();
        if (res.status == 'success') {
            Lockr.set('token', res.response);
            token = res.response;
            user_data = res.response;
            mainView.router.load({
                url: 'main.html',
                ignoreCache: true,
                query: {
                    register: true
                },
            });
        } else {
            myApp.alert(res.api_msg);
        }
    }).fail(function(err) {
        myApp.hideIndicator();
        myApp.alert('Some error occured while processing your request, Please try again later.');
    }).always(function() {
    });
}

function load_city(selecter, callBack) {
    myApp.showIndicator();
    $.ajax({
        url: base_url + 'get_city_master',
        type: 'POST',
        crossDomain: true,
        async: false,
        data: {},
    })
    .done(function(res) {
        myApp.hideIndicator();
        if (res.status == 'Success') {
            html = '<option value="">Select City</option>';
            $.each(res.response, function(index, val) {
                html += '<option value="' + val.id + '" >' + val.name + '</option>';
            });
            $(selecter).append(html);
            callBack();
        } else {}
    }).fail(function(err) {
        myApp.hideIndicator();
        myApp.alert('Somthing went wrong, Please try again later!');
    }).always();
}