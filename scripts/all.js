(function () {
    'use strict';
    
    var toggleSidebar = function () {
        jQuery('#toggle-sidebar').click(function () {
            jQuery('.sidebar').toggleClass( 'sidebarPushRight');
        })
    }
    
    var equalHeight = function (container) {
        
        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = [],
            topPosition = 0,
            el = "";
        
        jQuery(container).each(function () {
            el = jQuery(this);
            jQuery(el).height('auto');
            topPosition = el.position().top;
            
            if(currentRowStart !== topPosition) {
                for(var currentDiv = 0; currentDiv < rowDivs.length; currentDiv ++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0;
                currentRowStart = topPosition;
                currentTallest = el.height();
                rowDivs.push(el);
            } else {
                rowDivs.push(el);
                currentTallest = (currentTallest < el.height()) ? (el.height()) : (currentTallest);
            }
            
            for (var currentDiv = 0; currentDiv < rowDivs.length; currentDiv ++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    }
    
    
    
    jQuery(window).load(function() {
        toggleSidebar();
        equalHeight('.panel-body');
    });
    
    jQuery(window).resize(function() {
        equalHeight('.panel-body');
    });
    
})();