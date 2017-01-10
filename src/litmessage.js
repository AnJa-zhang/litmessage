(function ($) {

	'use strict';

	var _MESSAGE = '<div class="litMessage"><div class="msg-content"><div class="msg-type"></div><div class="msg-text"></div></div></div>';

	var litMessage = function () {};

	litMessage.prototype = $.extend(litMessage.prototype,{

		init : function (options) {
			var config = {
				triggerElement: "",
				content: "",
				duration: 4000,
				position: "up",
				size: "small",
				autohide: true
			};
			this.config = $.extend(config, options);
			this.triggerElement = $(this.config.triggerElement);
			this.content = this.config.content;
			this.position = this.config.position;
			this.duration = this.config.duration;
			this.autohide = this.config.autohide;
			this.size = this.config.size;
			this.pos_class = '';
			this._showMessage();
		},

		_setPosition : function () {
			switch(this.position) {
				case 'mouse':
					this.setPos_class = "";
					break;
				case 'up':
					this.setPos_class = "litMsgupper";
					break;
				case 'down':
					this.setPos_class = "litMsgdown";
					break;
				case 'middle':
				default:
					this.setPos_class = "litMsgmiddle";
					break;
			}
		},

		_setMsgSize : function () {
			switch(this.size) {
				case 'small':
					this.setSize_class = "litMsg-small";
					break;
				case 'mid':
					this.setSize_class = "litMsg-mid";
					break;
				case 'large':
				default:
					this.setSize_class = "litMsg-large";
					break;
			}
		},

		show : function(content, type, e) {
			var _MSG_TEMP = $(_MESSAGE).addClass(this.setPos_class + " " + this.setSize_class + " " + type);

			e = e || window.event;
			if(this.position === 'mouse'){
				$(_MSG_TEMP).css({
					top : e.clientY+"px",
					left: e.clientX + "px"
				})
			}
			_MSG_TEMP.find('.msg-text').text(content);
			this.message = $(_MSG_TEMP).appendTo($('body')).fadeIn(300);

			if (this.autohide) {
				setTimeout(function(){
					$(_MSG_TEMP).fadeOut(300, function() {
						this.remove();
					});
				}, this.duration);
			}
		},

		hide: function(){
			this.message.remove();
		},

		_showMessage : function () {
			this._setPosition();
			this._setMsgSize();

			var _self = this;	

			if(this.triggerElement){
				this.triggerElement.on('click', function () {
					_self.show(_self.content, '');
				});
			}
		}

	});	

	window.ala.litMessage = litMessage;

})(jQuery);