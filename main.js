import Vue from 'vue';
import App from './gui/App.vue';

import Game from './game/Game';

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
});

Game();
