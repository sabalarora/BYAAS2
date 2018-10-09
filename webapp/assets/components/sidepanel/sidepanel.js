(function($){
    var sidePanel = $("sidepanel");
    var sidePanelButton = $("sidepanel-open, sidepanel-close");
    var isColorPickerOpen;
    function init(){
        $(".color-picker, .sidenav-trigger").click(function(event){
            if(!isColorPickerOpen){
                isColorPickerOpen = true
            }else{                 
                isColorPickerOpen = false
            }
            $(".color-picker").toggleClass("sidenav-offset-content", isColorPickerOpen)
            $(".sidenav").toggleClass("sidenav-open", isColorPickerOpen)
        })
    }
    $(document).ready(function(){
        init();
    });
})(jQuery);