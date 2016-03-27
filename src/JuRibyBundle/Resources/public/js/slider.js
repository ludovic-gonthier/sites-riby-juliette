(function($){
	/*

	 */
	$.fn.slider = function(){
        var _this = this;
		var list;
        var SCALE_WIDTH = 862;
        var SCALE_HEIGHT = 646;
        var MAX_WIDTH;
        var MAX_HEIGHT;
        var display = $(_this).find(".display");

        function center_image(element){
            var margin_x = (MAX_WIDTH - element.width()) / 2;
            var margin_y = (MAX_HEIGHT - element.height()) / 2;

            element[0].style.marginLeft = margin_x + "px";
            element[0].style.marginTop = margin_y + "px";
        }
        function dispatch_media_render(element){
            function loading(element){
                element.addClass("loading");
            }
            function loaded(element){
                element.removeClass("loading");
            }
            function resize_nav_arrows(height){
                display.parent().find(".nav").css({
                    "height" : height
                });
            }
            function render_picture(element){
                function resize_and_center_image(element){
                    var img_w = element.width(),
                        img_h = element.height(),
                        ratio_w = MAX_WIDTH / img_w,
                        ratio_h = MAX_HEIGHT / img_h,
                        margin_x, margin_y;

                    if (img_w > MAX_WIDTH && img_h > MAX_HEIGHT){
                        if (img_w > img_h) {
                            element.width(ratio_w * img_w).height(ratio_w * img_h);
                        } else {
                            element.width(ratio_h * img_w).height(ratio_h * img_h);
                        }
                        center_image(element);

                        return true;
                    }
                    if (img_w > MAX_WIDTH) {
                        element.width(ratio_w * img_w).height(ratio_w * img_h);
                    } else if (img_h > MAX_HEIGHT) {
                        element.width(ratio_h * img_w).height(ratio_h * img_h);
                    }

                    center_image(element);

                    return false;
                }
                loading(display);
                display.empty();
                $("#loading_image")
                    .attr("src", element.attr("data-url"))
                    .on("load", function() {
                    loaded(display);
                    resize_and_center_image($(this));
                    display.append($(this).removeAttr("id"));
                    resize_nav_arrows($(this).outerHeight());
                    $("<img id='loading_image'/>").insertBefore($("#project"));
                });
            }
            function render_video(element){
                loading(display);
                display.empty()
                       .append('<iframe width="' + MAX_WIDTH + '"\
                                         height="' + MAX_HEIGHT + '"\
                                         scrolling="no"\
                                         frameborder="no"\
                                         src="' + element.attr("data-source") + '">\
                                 </iframe>');
                resize_nav_arrows(MAX_HEIGHT);
                loaded(display);
            }
            function render_sound(element){
                loading(display);
                display.empty()
                       .append('<iframe width="' + MAX_WIDTH + '"\
                                         height="' + MAX_HEIGHT + '"\
                                         scrolling="no"\
                                         frameborder="no"\
                                         src="' + element.attr("data-source") + '">\
                                 </iframe>');
                resize_nav_arrows(MAX_HEIGHT);
                loaded(display);
            }
            switch (element.attr("data-type")){
                case "video":
                    render_video(element);
                break;
                case "sound":
                    render_sound(element);
                break;
                case "picture": default:
                    render_picture(element);
                break;
            }
        }

        function resize_display_panel(){
            var desc_w = $("#project .description").outerWidth(),
                wind_w = $(window).width(),
                nav_w = $("#project .render .nav").width();
            var panel_w = wind_w - desc_w;
            MAX_WIDTH = panel_w - nav_w - nav_w;
            MAX_HEIGHT = (MAX_WIDTH / SCALE_WIDTH) * SCALE_HEIGHT;
            $("#project .render").css({
                width : panel_w,
                left : desc_w
            }).find(".display").css({
                width : MAX_WIDTH,
                height : MAX_HEIGHT
            }).children().first().css({
                width : MAX_WIDTH,
                height : MAX_HEIGHT
            });
            console.log('resizing');
            center_image($("#project .render .display").children().first());
        }

        function bind_navigation_events(element){
            function	next(element){
                var to_load = element.next();
                if (to_load.length === 0)
                    to_load = element.parent().children().first();
                dispatch_media_render(to_load);
                element.parent().find(".selected").removeClass("selected");
                to_load.addClass("selected");
    		}

    		function	previous(element){
                var to_load = element.prev();
                if (to_load.length === 0)
                    to_load = element.parent().children().last();
                dispatch_media_render(to_load);
                element.parent().find(".selected").removeClass("selected");
                to_load.addClass("selected");
    		}

            element.find(".container .element").first().addClass("selected");
            element.find(".container").off("click", ".element").on("click", ".element", function(){
                $(this).parent().find(".selected").removeClass("selected");
                $(this).addClass("selected");
                dispatch_media_render($(this));
            });
            $(window).on("resize", function(){
                resize_display_panel();
            });
            element.off("click", ".nav-left").on("click", ".nav-left", function(){
                previous(element.find(".container .element.selected"));
            }).off("click", ".nav-right").on("click", ".nav-right", function(){
                next(element.find(".container .element.selected"));
            });
        }

        resize_display_panel();
        bind_navigation_events($(this));
        display.find('.img').on('load', function () {
            $(this).find(".container .element.selected").click();
        }.bind(this));
		return this;
	};

	$(document).ready(function(){
		$("#project .render").slider();
	});
})(jQuery);
