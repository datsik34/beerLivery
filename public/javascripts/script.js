function findAddress() {
  var input = document.getElementById('search-bar');
  var options = {
    types: ['geocode'],
    componentRestrictions: {
      country: "fr"
    }
  };
  autocomplete = new google.maps.places.Autocomplete(input, options);
}

let bieres = document.querySelector('.container-bieres')
let emptyBeerImg = '/images/beer-empty-160-513.svg';
let fullBeerImg = '/images/beer-full-160-513.svg'
for (let biere of bieres.children) {
  let rate = biere.querySelector('.rating-bar');
  for (b of rate.children) {
    b.addEventListener('click', (function(b_selector) {
      return function() {
        let id = b_selector.dataset.id;
        let val = b_selector.dataset.value;
        for (i of b_selector.parentElement.children) {/* Reset */
          i.querySelector('img').src = emptyBeerImg;
        }
        if (document.querySelector('#b' + id).value == val) {/* Decrease if clicked val == 1 */
          for (i of b_selector.parentElement.children) {
            i.querySelector('img').src = emptyBeerImg;
          }
          val = 0;
          document.querySelector('#b' + id).value = val;
          b_selector.querySelector('img').src = emptyBeerImg;
        } else {/* Increase */
          for (let i = 0; i < val; i++) {
            b_selector.parentElement.children[i].querySelector('img').src = fullBeerImg;
          }
          document.querySelector('#b' + id).value = val;
          b_selector.querySelector('img').src = fullBeerImg;
        }
        document.querySelector('#val' + id).value = val;
        jQuery.ajax(location.protocol + '//' + location.host + '/catalogue', {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          data: JSON.stringify({name: b_selector.parentElement.parentElement.parentElement.parentElement.querySelector('h4').innerText, quantity: b_selector.parentElement.parentElement.querySelector('input[name=quantity]').value, price: b_selector.parentElement.parentElement.querySelector('input[name=price]').value})
        });
      }
    })(b));
  }
}
