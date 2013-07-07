/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    g: null,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        app.receivedEvent('deviceready');

        app.g = navigator.globalization;

        app.g.getPreferredLanguage(app.onGetPreferredLanguage, app.onGlobalizationError);

    },

    onGetPreferredLanguage: function(language){

        console.log('getPreferredLanguage', language);

        app.g.getLocaleName(app.onGetLocaleName, app.onGlobalizationError);

    },

    onGetLocaleName: function(language){

        console.log('getLocaleName', language);

        app.g.dateToString(new Date(), app.onDateToString, app.onGlobalizationError);

    },

    onDateToString: function(data){

        console.log('dateToString', data);

        app.g.stringToDate('06/18/2013 11:29 AM', app.onStringToDate, app.onGlobalizationError);

    },

    onStringToDate: function(data){

        console.log('stringToDate', data);

        app.g.getDatePattern(app.onDatePattern, app.onGlobalizationError);

    },

    onDatePattern: function(data){

        console.log('getDatePattern', data);

        app.g.getDateNames(app.onGetDateNames, app.onGlobalizationError);

    },

    onGetDateNames: function(data){

        console.log('getDateNames', data);

        app.g.isDayLightSavingsTime(new Date(), app.onDayLightSavingTime, app.onGlobalizationError);

    },

    onDayLightSavingTime: function(data){

        console.log('isDayLightSavingsTime', data);

        app.g.getFirstDayOfWeek(app.onGetFirstDayOfWeek, app.onGlobalizationError);

    },

    onGetFirstDayOfWeek: function(data){

        console.log('getFirstDayOfWeek', data);

        app.g.numberToString(12456246, app.onNumberToString, app.onGlobalizationError);

    },

    onNumberToString: function(data){

        console.log('numberToString', data);

        app.g.stringToNumber('1,250.04', app.onStringToNumber, app.onGlobalizationError);

    },

    onStringToNumber: function (data) {

        console.log('stringToNumber', data);

        app.g.getNumberPattern(app.onGetNumberPattern, app.onGlobalizationError);

    },

    onGetNumberPattern: function(data){

        console.log('getNumberPattern', data);
        app.g.getCurrencyPattern('EUR', app.onGetCurrencyPattern, app.onGlobalizationError);

    },

    onGetCurrencyPattern: function(data){

        console.log('getCurrencyPattern', data);

    },

    onGlobalizationError: function(error){

        console.log(error.code);
        console.log(error.message);

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
