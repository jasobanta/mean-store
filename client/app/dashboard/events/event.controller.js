'use strict';

export default class eventController {
	$http;
	$state;
	$timeout;
	$stateParams;
	submitted = false;
	event:Object[];
	newEvent: Object[];
	vendors: Object[];
	Events: Object[];
	//url;

	/*@ngInject*/
	constructor($state, $http, $timeout, $stateParams) {
		this.$http = $http;
		this.$state = $state;
		this.$timeout = $timeout;
		this.$stateParams = $stateParams;
		//this.url = $location.url();
	}
	$onInit(){
		this.$http.get(`/api/events`)
		.then(allevents => {
			this.Events = allevents.data;
			
			console.log('all events ', this.Events);
			console.log('url ', this.url);
		});

		if (this.$stateParams.id) {
			console.log('event id='+this.$stateParams.id)
			this.$http.get(`/api/events/${this.$stateParams.id}`)
			.then(resevent => {
				this.newEvent = resevent.data;
			});

		}

		

	}
	creatEvent(form) {
		this.submitted = true;
		if (form.$valid) {
			console.log(this.newEvent);
			if (this.newEvent._id) {
				this.$http.put(`/api/events/${this.newEvent._id}`, this.newEvent)
				.then(resevent => {
					this.$state.go('eventlist');
				});
			} else {
				this.$http.post(`/api/events/`, this.newEvent)
				.then(resevent => {
					this.$state.go('eventlist');
				});
			}

		} else {
			//	console.log('dfasdfsa');
			// do not do anything
		}
	}
  delete(event) {
		this.$http.delete(`/api/events/${event._id}`)
		.then(res => {
			this.$state.go('eventlist');
		});
  }
  eventlen(newStr){
  	 var evtCount;
  	 var strLen;
     var lastChr = newStr.substr(newStr.length-1);
     if(lastChr===','){
     	 var newStr =newStr.substr(0,newStr.length-1);
     }
     strLen = newStr.split(',');
     return strLen.length;
  };
}
