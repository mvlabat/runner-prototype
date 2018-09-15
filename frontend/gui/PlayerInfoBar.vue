<script>
import ResizeSensor from 'vue-resizesensor';
import VkNavbar from 'vuikit/src/library/navbar/components/navbar';
import VkNavbarItem from 'vuikit/src/library/navbar/components/navbar--item';
import VkNavbarLogo from 'vuikit/src/library/navbar/components/navbar--logo';
import { createNamespacedHelpers } from 'vuex';

import PlayerModel from 'common/Models/PlayerModel';

import HelpModal from './modals/HelpModal.vue';
import OnlinePlayersModal from './modals/OnlinePlayersModal.vue';
import ClientMuddle from '../ClientMuddle';

const { mapGetters: mapPlayersGetters } = createNamespacedHelpers('players');
const { mapMutations: mapGameUiMutations } = createNamespacedHelpers('gameUi');

/**
 * @type PlayerModel
 */
const playerModel = ClientMuddle.common[PlayerModel];

const LARGE_WIDTH = 1000;
const MEDIUM_WIDTH = 600;

export default {
  name: 'PlayerInfoBar',
  components: {
    OnlinePlayersModal,
    HelpModal,
    ResizeSensor,
    VkNavbarItem,
    VkNavbarLogo,
    VkNavbar,
  },
  data: () => ({
    playerModel,
    showHelp: false,
    showOnlinePlayers: false,
    navbarWidth: 0,
  }),

  computed: {
    // Data fields.
    playerPing() {
      return `${Math.round(this.playerModel.latency)} ms`;
    },

    ...mapGameUiMutations(['showModal', 'hideModal']),

    ...mapPlayersGetters({
      playersOnlineCount: 'count',
    }),

    // Style props.
    logoSlot() {
      return this.navbarWidth > LARGE_WIDTH ? 'center' : 'left';
    },

    logoIsShown() {
      return this.navbarWidth > MEDIUM_WIDTH;
    },
  },

  methods: {
    updateNavbarWidth() {
      this.navbarWidth = this.$refs.navbar.offsetWidth;
    },
  },

  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'F2' && playerModel.authenticated) {
        this.showOnlinePlayers = !this.showOnlinePlayers;
      }
    });
  },
};
</script>

<template>
    <vk-navbar ref="navbar" id="navbar">
        <resize-sensor @resized="updateNavbarWidth"></resize-sensor>
        <vk-navbar-logo :slot="logoSlot" v-show="logoIsShown">
            muddle.run
        </vk-navbar-logo>

        <vk-navbar-item v-on:click="showHelp = !showHelp" slot="right" class="nav-clickable">
            Help
        </vk-navbar-item>

        <vk-navbar-item v-on:click="showOnlinePlayers = !showOnlinePlayers" slot="right"
                        class="nav-clickable">
            Online Players ({{playersOnlineCount}}) <span class="hotkey">F2</span>
        </vk-navbar-item>

        <vk-navbar-item slot="right">
            <div id="ping">Latency: {{ playerPing }}</div>
        </vk-navbar-item>

        <help-modal :show.sync="showHelp"></help-modal>
        <online-players-modal :show.sync="showOnlinePlayers"></online-players-modal>
    </vk-navbar>
</template>

<style scoped lang="scss">
    #navbar {
        left: 0;
        right: 0;

        .uk-navbar-nav > li > a,
        .uk-navbar-item,
        .uk-navbar-toggle {
            height: 4em;

            &.uk-logo {
                height: auto;
            }
        }

        .uk-navbar-right > * {
            border-right: 1px solid #ddd;

            &:last-child {
                border-right: none;
            }
        }

        .nav-clickable {
            cursor: pointer;
            transition: background-color .3s ease-out;
            &:hover {
                background-color: #eee;
            }
        }
    }

    #ping {
        width: 120px;
    }

    span.hotkey {
        padding: 0 2px;
        margin-left: 5px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
</style>
