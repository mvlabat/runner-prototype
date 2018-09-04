<script>
import VkModal from 'vuikit/src/library/modal/components/modal';
import VkModalTitle from 'vuikit/src/library/modal/components/modal--title';
import VkModalClose from 'vuikit/src/library/modal/components/modal--close';
import VkTable from 'vuikit/src/library/table/components/table';
import VkTableColumn from 'vuikit/src/library/table/components/table--column';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapGetters } = createNamespacedHelpers('players');

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
    test: [],
  }),

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
};
</script>

<template>
    <vk-modal center :show.sync="show">
        <vk-modal-close></vk-modal-close>
        <vk-modal-title>Online Players ({{ playersOnlineCount }})</vk-modal-title>

        <vk-table :data="activePlayers" narrowed>
            <vk-table-column title="ID" cell="clientId"></vk-table-column>
            <vk-table-column title="Display Name" cell="displayName"></vk-table-column>
            <vk-table-column title="Latency" cell="latency">
                <div slot-scope="{ cell }">
                    {{ cell }} ms
                </div>
            </vk-table-column>
        </vk-table>
    </vk-modal>
</template>
