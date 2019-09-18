(function() {
  
  var mX, mY, distance,
    $proximity = $('#proximity'),
    $distance = $('#distance'),
    $element  = $('#element'),
    $speed = $('#speed');
  
  // proximity threshold
  var proximity = 150;
  $proximity.text(proximity);

  function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(
      Math.sqrt(
        Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) +
        Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)
      )
    ) - Math.round(elem.width()/2);
  }

  $(document).mousemove(function(e) {  
    mX = e.pageX;
    mY = e.pageY;
    distance = calculateDistance($element, mX, mY);
    $distance.text(distance);
    
    if (distance < proximity) {
      //$element.addClass("fast");
      $speed.addClass("fast");
    } else {
      //$element.removeClass("faster");
      $speed.removeClass("fast");
    }
  });

})();