;define('main', ['i18n!nls/connection'], (function(connection){

    var currentLanguage, currentLocale;

    var bindEvents = function() {

        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {

            document.addEventListener('deviceready', onDeviceReady, false);

        } else {

            onDeviceReady(); // Running is the browser

        }

        console.log('ready!', connection);
        console.log('navigator.language', navigator.language);
        console.log('navigator.userLanguage', navigator.userLanguage);

    };

    var onDeviceReady = function(evt){

        document.querySelector('#deviceready .pending').className += ' hide';
        var completeElem = document.querySelector('#deviceready .complete');
        completeElem.className = completeElem.className.split('hide').join('');

        navigator.globalization.getPreferredLanguage(onPreferredLanguage, onGlobalizationError);

    };

    var onPreferredLanguage = function(locale){

        console.log('onPreferredLanguage', locale);

        currentLanguage = locale.value;
        navigator.globalization.getLocaleName(onLocaleName, onGlobalizationError);

    };

    var onLocaleName = function(locale){

        currentLocale = locale.value;
        console.log('onLocaleName', locale);

        renderData();

    };

    var renderData = function(){

        var deviceready = document.querySelector('#deviceready');

        var element = document.createElement('span');

        element.innerHTML = 'The current language is <b>' + currentLanguage + '</b> and the locale is <b>' + currentLocale + '</b>';
        deviceready.appendChild(element);

        deviceready.innerHTML += '<br><br>';

        element = document.createElement('span');

        element.innerHTML += 'The cannotConnect message is:<i>' + connection.cannotConnect + '</i><br>';
        element.innerHTML += 'The connectionSlow message is:<i>' + connection.connectionSlow + '</i><br>';
        element.innerHTML += 'The connectionError message is:<i>' + connection.connectionError + '</i><br>';

        deviceready.appendChild(element);

    };

    var onGlobalizationError = function(error) {

        navigator.notification.alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n', null);

    };

    var init = function(){

        bindEvents();

    };

    return{

        init: init

    }

}));




