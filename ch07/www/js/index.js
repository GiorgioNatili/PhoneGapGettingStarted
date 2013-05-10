var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
        document.addEventListener("orientationchange", this.updateOrientation);
    },
    updateOrientation: function(event){
	
	var alpha = event.alpha,
            beta = event.beta,
            gamma = event.gamma;

	var style = document.querySelector('#orientation').style;
	var rotation = 'rotateZ(' + alpha + 'deg) rotateX(' + beta + 'deg) rotateY(' + gamma + 'deg)';

	switch(true){
	
	    case: style.webkitTransform:
	    style.webkitTransform = rotation;
	    break;

	    case: style.mozTransform:
	    style.mozTransform = rotation;
	    break;

	    case: style.msTransform:
	    style.msTransform = rotation;
	    break;

	    default:
	    style.transform = rotation;
	    break;

	}

    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};
