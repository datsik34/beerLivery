

function findAddress() {
  var input = document.getElementById('search-bar');
  var options = {
    types: ['geocode'],
    componentRestrictions: { country: "fr" }
  };
  autocomplete = new google.maps.places.Autocomplete(input, options);
}
