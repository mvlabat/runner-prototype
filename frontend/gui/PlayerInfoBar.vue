<script>
import VkNavbar from 'vuikit/src/library/navbar/components/navbar';
import VkNavbarItem from 'vuikit/src/library/navbar/components/navbar--item';
import VkNavbarLogo from 'vuikit/src/library/navbar/components/navbar--logo';
import { createNamespacedHelpers } from 'vuex';

import LocalGameState from '../game/LocalGameState';
import HelpModal from './modals/HelpModal.vue';
import OnlinePlayersModal from './modals/OnlinePlayersModal.vue';

const { mapGetters } = createNamespacedHelpers('players');

export default {
  name: 'PlayerInfoBar',
  components: {
    OnlinePlayersModal,
    HelpModal,
    VkNavbarItem,
    VkNavbarLogo,
    VkNavbar,
  },
  data: () => ({
    playerModel: LocalGameState.getPlayerModel(),
    showHelp: false,
    showOnlinePlayers: false,
  }),

  computed: {
    playerPing() {
      return `${Math.round(this.playerModel.latency)} ms`;
    },

    ...mapGetters({
      playersOnlineCount: 'count',
    }),
  },

  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'F1') {
        this.showHelp = !this.showHelp;
      } else if (e.key === 'F2') {
        this.showOnlinePlayers = !this.showOnlinePlayers;
      }
    });
  },
};
</script>

<template>
    <vk-navbar id="navbar">
        <vk-navbar-logo slot="center">
            muddle.run
        </vk-navbar-logo>

        <vk-navbar-item v-on:click="showHelp = !showHelp" slot="right">
            Help <span class="hotkey">F1</span>
        </vk-navbar-item>

        <vk-navbar-item v-on:click="showHelp = !showHelp" slot="right">
            Players Online ({{playersOnlineCount}}) <span class="hotkey">F2</span>
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
        }

        .uk-navbar-right > * {
            border-right: 1px solid #ddd;

            &:last-child {
                border-right: none;
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
