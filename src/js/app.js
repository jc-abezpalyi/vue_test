// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

import Vuelidate from 'vuelidate';
import vueApp from './modules/vueApp';

Vue.use(Vuelidate);
(($) => {
  // When DOM is ready
  $(() => {
    vueApp();
  });
})(jQuery);
