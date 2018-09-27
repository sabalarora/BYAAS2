(function($){
    var swatchesColor =  $(".swatches-color");
    var swatchesTextures =  $(".swatches-texture");
    var swatchesDescriptionName = $(".swatches-description-name");
    function generateColorSwatches(colorList){
        var listItems = colorList.reduce(function(agg,value){
            return agg + "<li class=\"color hide-text color-selection\" style=\"background-color:"+value.color+"\">" + value.name + "</li>";   
        },"");
        return "<ul>"+listItems+"</ul>"
    }
    function generateTextureSwatches(textureList){
        var listItems = textureList.reduce(function(agg,value){
            return agg + "<li class=\"color hide-text color-selection "+ value.class+ "\" data-color=\""+value.class+"\">" + value.name + "</li>";   
        },"");
        return "<ul>"+listItems+"</ul>"
    }
    function onClickSelectedColor(event){
        $(".color-is-selected").removeClass("color-is-selected");
        $(this).addClass("color-is-selected");
        swatchesDescriptionName.html(event.target.textContent);
    }

    $.fn.colorSelector = function(options){
        var defer = $.Deferred();
        options = $.extend({}, $.fn.colorSelector.defaults, options || {});
        
        if(options.url){
            $.get(options.url).then(function(response){
                swatchesColor.html(generateColorSwatches(response.colors));
                swatchesTextures.html(generateTextureSwatches(response.textures));
                $(".color-selection").click(function(event){
                    onClickSelectedColor(event);
                    
                    options.onSwatchClicked.call(this, {
                        textContent : event.target.textContent,
                        colorCss: $(event.currentTarget).data("color")
                    })
                });
                defer.resolve(response.colors[0])
            });
        }
       
        return defer.promise();
    }
    
    $.fn.colorSelector.defaults = {
        url: null
    };
})(jQuery);