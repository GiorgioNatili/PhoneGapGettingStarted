
require.config({

    paths: {
        text: 'libs/require/plugins/text',
        domReady: 'libs/require/plugins/domReady',
        i18n: 'libs/require/plugins/i18n'
    },

    waitSeconds: 10

});

require(['main'], function(main){

    main.init();

});