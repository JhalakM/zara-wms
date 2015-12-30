(function($){
	jQuery.fn.captchaWord = function(options){
	
		var element = this; 
		
		var button = $(this).find('input[type=button]');
		$('<canvas id="canvas" width="500" height="100" style="border: none;padding-left:0;padding-right:0;margin-left:auto;margin-right:auto;display:block;width: 100%;"><label id="captcha_text"></label></canvas>').insertBefore(button)
		$('<input type="text" class="textbox" id="captcha_input"/><br/><br/>').insertBefore(button);
		var input = this.find('#captcha_input'); 
		var label = this.find('#captcha_text'); 
		
		$(element).find('input[type=button]').attr('disabled','disabled'); 
			
		var i = 0;
		var j = 6;
		var randomNumber = 0;
		var randomMessage = '';
		
		while(i<j)
		{
			randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
			  if ((randomNumber >=33) && (randomNumber <=47)) { continue; }
			  if ((randomNumber >=58) && (randomNumber <=64)) { continue; }
			  if ((randomNumber >=91) && (randomNumber <=96)) { continue; }
			  if ((randomNumber >=123) && (randomNumber <=126)) { continue; }
			randomMessage += String.fromCharCode(randomNumber);
			i++;
		}
	

		var c = document.getElementById("canvas");
		var ctx = c.getContext("2d");
		ctx.font="20px Tahoma";
		ctx.textBaseline="alphabetic";
		ctx.fillText(randomMessage, 190, 70);
	
		$(input).keyup(function(){

			var textvalue = $(this).val();
			if(textvalue==randomMessage)
			{
				$(element).find('input[type=button]').removeAttr('disabled');				
			}
			else{
				$(element).find('input[type=button]').attr('disabled','disabled');
			}
			
		});

		$(document).keypress(function(e)
		{
			if(e.which==13)
			{
				if((element).find('input[type=button]').is(':disabled')==true)
				{
					e.preventDefault();
					return false;
				}
			}

		});

	};

})(jQuery);