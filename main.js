import Vue from 'vue';
import App from './gui/App.vue';

import Game from './game/Game';
import { hello } from './platformio_common/Cargo.toml';

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
});

hello();
Game();
