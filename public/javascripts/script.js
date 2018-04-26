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

// let bieres = document.querySelector('.container-bieres')
// for (let biere of bieres.children) {
//   let rate = biere.querySelector('.rating-bar');
//   for (b of rate.children) {
//     b.addEventListener('click', (function(b_selector) {
//       return function() {
//         let id = b_selector.dataset.id;
//         let val = b_selector.dataset.value;
//         /* Reset & Decrease */
//         for (i of b_selector.parentElement.children) {
//           i.querySelector('img').src = "/images/beer-empty-160-513.svg";
//         }
//         console.log(b_selector, b_selector.parent)
//         /* Increase */
//         for (let i = 0; i < val; i++) {
//           b_selector.parentElement.children[i].querySelector('img').src = "/images/beer-full-160-513.svg";
//         }
//
//         console.log("changing value of ", document.querySelector('#b' + id), "to ", val)
//         document.querySelector('#b' + id).value = val;
//         b_selector.querySelector('img').src = "/images/beer-full-160-513.svg";
//       }
//     })(b));
//   }
// }

let bieres = document.querySelector('.container-bieres')
for (let biere of bieres.children) {
  let rate = biere.querySelector('.rating-bar');
  for (b of rate.children) {
    b.addEventListener('click', (function(b_selector) {
      return function() {
        let id = b_selector.dataset.id;
        let val = b_selector.dataset.value;
        for (i of b_selector.parentElement.children) { /* Reset */
          i.querySelector('img').src = "/images/beer-empty-160-513.svg";
        }
        if (document.querySelector('#b' + id).value == val) { /* Decrease if clicked val == 1 */
          for (i of b_selector.parentElement.children) {
            i.querySelector('img').src = "/images/beer-empty-160-513.svg";
          }
          val = 0;
          document.querySelector('#b' + id).value = val;
          b_selector.querySelector('img').src = "/images/beer-empty-160-513.svg";
        } else { /* Increase */
          for (let i = 0; i < val; i++) {
            b_selector.parentElement.children[i].querySelector('img').src = "/images/beer-full-160-513.svg";
          }
          document.querySelector('#b' + id).value = val;
          b_selector.querySelector('img').src = "/images/beer-full-160-513.svg";
        }
        document.querySelector('#val' + id).value = val;
      }
    })(b));
  }
}
