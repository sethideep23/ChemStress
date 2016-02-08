$(document).ready(function() {
    
    $('#one').click(function() {
        $('#chemresearch').animate({
            top:"0px"
        });
    });

    $('#two').click(function() {
        $('#reactionpredictor').animate({
            top:"0px"
        });
    });

    $('#three').click(function() {
        $('#molarmass').animate({
            top:"0px"
        });
    });

    $('#four').click(function() {
        $('#nameconverter').animate({
            top:"0px"
        });
    });


    $('#scrollUpFour').click(function(){
        $('#nameconverter').animate({
            top:"-100%"
        });
    });

    $('#scrollUpThree').click(function(){
        $('#molarmass').animate({
            top:"-100%"
        });
    });

    $('#scrollUpTwo').click(function(){
        $('#reactionpredictor').animate({
            top:"-100%"
        });
    });

    $('#scrollUpOne').click(function(){
        $('#chemresearch').animate({
            top:"-100%"
        });
    });

});
