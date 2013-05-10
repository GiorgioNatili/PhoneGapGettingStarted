var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
        
    },
    orientationChanged: function(){

	var element = document.querySelector('#currentorientation');
	element.innerHTML = '<p>' + window.orientation + '</p>';

    },
    updateOrientation: function(event){
	
	var alpha = event.alpha,
            beta = event.beta,
            gamma = event.gamma;

	var element = document.querySelector('#orientation');
	var style = element.style;
	var rotation = 'rotateZ(' + alpha + 'deg) rotateX(' + beta + 'deg) rotateY(' + gamma + 'deg)';
	
	switch(true){
	
	    case style.webkitTransform != null:
	    style.webkitTransform = rotation;
	    break;

	    case style.mozTransform != null:
	    style.mozTransform = rotation;
	    break;

	    case style.msTransform != null	:
	    style.msTransform = rotation;
	    break;

	    default:
	    style.transform = rotation;
	    break;

	}

	document.querySelector('#currentposition').innerHTML = '(alpha/beta/gamma) ' +  alpha + '/' + beta + '/' + gamma;


    },
    orientationSupported: function(){
	
	try {
          return 'DeviceOrientationEvent' in window && window['DeviceOrientationEvent'] !== null;
        } catch (e) {
          return false;
        }

    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');

	if(app.orientationSupported){
		
		window.addEventListener("deviceorientation", app.updateOrientation);		
		window.addEventListener("orientationchange", app.orientationChanged);

		 app.orientationChanged();

	}else{

		navigator.notification.alert('Orientation not supported!', null, 'Attention!', 'OK');	
	
	}		
	   	
    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};
