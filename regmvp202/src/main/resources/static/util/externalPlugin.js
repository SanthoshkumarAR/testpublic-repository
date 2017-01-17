	(function($){
			$(window).load(function(){
				
				/* Page Scroll to id fn call */
				$("#navigation-menu a,a[href='#top'],a[rel='m_PageScroll2id']").mPageScroll2id({
					highlightSelector:"#navigation-menu a",
					clickEvents:false
				});
				
				/* jquery.address fn */
				$.address.change(function(event) {
					var hash=event.value.split("/")[1] || "#top";
					$.mPageScroll2id("scrollTo",hash,{
						clicked:$("a[href='"+hash+"']")
					});
                });
				
				$("#navigation-menu a,a[href='#top'],a[rel='m_PageScroll2id']").click(function(e) {
                    e.preventDefault();
                    var href=$(this).attr("href");
                    if($.address.value()==="/"+href){
                    	$.address.history(false); 
                    	$.address.value("#");
                    }else{
                    	$.address.history(true); 
                    }
					$.address.value($(this).attr("href"));
                });
				
				/* demo functions */
				$("a[rel='next']").click(function(e){
					e.preventDefault();
					var val="#"+$(this).parent().parent("section").next().attr("id");
					$.address.value(val);
				});
				
				
				// start up after 2sec no matter what
				window.setTimeout(function(){
				$('body').removeClass("RHS_Section").addClass('loaded');
				}, 2000);

				
			});
		})(jQuery);
	
	$(window).scroll(function() {
		$('#sectransition').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+400) {
				$(this).addClass("slideUp");
			}
		});
	});