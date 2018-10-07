(function($){
    // var swatchesColor =  $(".swatches-color");
    // var swatchesTextures =  $(".swatches-texture");
    // var swatchesDescriptionName = $(".swatches-description-name");
    // function generateColorSwatches(colorList){
    //     var listItems = colorList.reduce(function(agg,value){
    //         return agg + "<li class=\"color hide-text color-selection\" style=\"background-color:"+value.color+"\">" + value.name + "</li>";   
    //     },"");
    //     return "<ul>"+listItems+"</ul>"
    // }
    // function generateTextureSwatches(textureList){
    //     var listItems = textureList.reduce(function(agg,value){
    //         return agg + "<li class=\"color hide-text color-selection "+ value.class+ "\" data-color=\""+value.class+"\">" + value.name + "</li>";   
    //     },"");
    //     return "<ul>"+listItems+"</ul>"
    // }

    // $.fn.colorSelector = function(options){
    //     var defer = $.Deferred();
    //     options = $.extend({}, $.fn.colorSelector.defaults, options || {});
        
    //     if(options.url){
    //         $.get(options.url).then(function(response){
    //             swatchesColor.html(generateColorSwatches(response.colors));
    //             swatchesTextures.html(generateTextureSwatches(response.textures));
    //             $(".color-selection").click(function(event){
    //                 $(".color-is-selected").removeClass("color-is-selected");
    //                 $(this).addClass("color-is-selected");
    //                 swatchesDescriptionName.html(event.target.textContent);
    //                 options.onSwatchClicked.call(this, {
    //                     textContent : event.target.textContent,
    //                     colorCss: $(event.currentTarget).data("color")
    //                 })
    //             });
    //             defer.resolve(response.colors[0])
    //         });
    //     }
       
    //     return defer.promise();
    // }
    
    // $.fn.colorSelector.defaults = {
    //     url: null,
    //     onSwatchClicked: null
    // };
//   <div class="swatches">
//     <div class="swatches-color"></div>
//     <div class="swatches-texture"></div>
//     <div class="swatches-description">
//       <h3>Color: <span class="swatches-description-name"></span></h3>
//     </div>
// </div> 
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
                    colorSwatchDescription.html(event.target.textContent);
                })
            
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