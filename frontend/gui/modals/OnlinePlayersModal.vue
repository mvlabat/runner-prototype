<script>
import VkModal from 'vuikit/src/library/modal/components/modal';
import VkModalTitle from 'vuikit/src/library/modal/components/modal--title';
import VkModalClose from 'vuikit/src/library/modal/components/modal--close';
import VkTable from 'vuikit/src/library/table/components/table';
import VkTableColumn from 'vuikit/src/library/table/components/table--column';
import { createNamespacedHelpers } from 'vuex';

import PlayerModel from 'common/Models/PlayerModel';

import { modalWatchHelper } from '../utils/modal';
import StoreMuddle from '../../StoreMuddle';

const { mapState, mapGetters } = createNamespacedHelpers('players');

const muddle = new StoreMuddle();

/**
 * @type PlayerModel
 */
const playerModel = muddle.common[PlayerModel];

export default {
  name: 'OnlinePlayersModal',
  components: {
    VkTableColumn,
    VkTable,
    VkModalClose,
    VkModalTitle,
    VkModal,
  },
  props: [
    'show',
  ],

  data: () => ({
    showModal: false,
    test: [],
  }),

  watch: {
    ...modalWatchHelper('show', 'showModal'),
  },

  computed: {
    arr() {
      return this.test;
    },

    ...mapState({
      activePlayers: state => state.allPlayers,
    }),

    ...mapGetters({
      playersOnlineCount: 'count',
    }),
  },

  methods: {
    /**
     * @param {PlayerModel} row
     * @return {string}
     */
    isCurrentPlayer(row) {
      return row.clientId === playerModel.clientId ? 'current-player' : '';
    },
  },
};
</script>

<template>
    <vk-modal center :show.sync="showModal">
        <vk-modal-close></vk-modal-close>
        <vk-modal-title>Online Players ({{ playersOnlineCount }})</vk-modal-title>

        <div id="online-players-table-wrapper">
            <vk-table :data="activePlayers" :row-class="isCurrentPlayer" narrowed>
            <vk-table-column title="ID" cell="clientId"></vk-table-column>
            <vk-table-column title="Display Name" cell="displayName"></vk-table-column>
            <vk-table-column title="Latency" cell="latency">
                <div slot-scope="{ cell }">
                    {{ cell }} ms
                </div>
            </vk-table-column>
            </vk-table>
        </div>
    </vk-modal>
</template>

<style lang="scss">
    .current-player {
        font-weight: bold;
    }
</style>
