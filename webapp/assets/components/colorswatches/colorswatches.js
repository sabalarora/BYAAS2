(function($){
    var colorSwatchContainer = $(".swatch-container");
    var colorSwatchColors = $(".swatch-colors");
    var colorSwatchTextures = $(".swatch-textures");
    var colorSwatchDescription = $(".swatch-description-name");
    var colorSwatchTargetColor = $(".swatch-target-color");
    function generateColorSwatches(colorList){
        var listItems = colorList.reduce(function(agg,value){
            return agg + "<li class=\"color hide-text color-selection\" style=\"background-color:"+value.color+"\">" + value.name + "</li>";   
        },"");
        return "<ul>"+listItems+"</ul>"
    }
    function generateTextureSwatches(textureList){
        var listItems = textureList.reduce(function(agg,value){
            return agg + "<li class=\"color hide-text color-selection "+ value.class+ "\" data-background-url=\""+value.url+"\" style=\"background-image: url("+value.url+")\">" + value.name + "</li>";   
        },"");
        return "<ul>"+listItems+"</ul>"
    }
    $.fn.colorSwatches = function(options){
        options = $.extend({}, $.fn.colorSwatches.defaults, options || {});
        var deferred = $.Deferred();
        if(options.url){       
            $.get(options.url).then(function(response){
                colorSwatchColors.html(generateColorSwatches(response.colors));
                colorSwatchTextures.html(generateTextureSwatches(response.textures));
                $(".color-selection").click(function(event){
                    var targetCSS = {};
                    if(event.target.textContent){
                        targetCSS = {
                            backgroundImage: '',
                            backgroundColor: event.target.textContent
                        }
                    }
                    var rs = $(event.currentTarget).data("background-url");
                    if(rs){
                        targetCSS = {
                            backgroundImage: "url(\""+rs+"\")"
                        }
                    }
                    $(".gallery-image").css(targetCSS);
                    //this.toggleClass("swatch-selected-item", true)
                    colorSwatchDescription.html(event.target.textContent);
                    $(".swatch-selected-item").removeClass("swatch-selected-item");
                    $(this).toggleClass("swatch-selected-item", true);
                })
                $(".swatch-colors ul li:nth-child(1)").toggleClass("swatch-selected-item", true)
                colorSwatchDescription.html(response.colors[0].name);
                $(".gallery-image").css({backgroundColor: response.colors[0].color});
                defer.resolve(response.colors[0]);
            });
        }
        return deferred.promise();
    };
    $.fn.colorSwatches.defaults = {
        url: null
    };
    $(document).ready(function(){
      
    });
})(jQuery);