// import './jquery';

import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Vuikit from 'vuikit';
import VuikitIcons from '@vuikit/icons';

// eslint-disable-next-line import/extensions
import '@vuikit/theme';

import App from './gui/App.vue';

import Game from './game/Game';

const game = new Game();

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
});
Vue.use(Vuelidate);
Vue.use(Vuikit);
Vue.use(VuikitIcons);

game.startGameLoop();
