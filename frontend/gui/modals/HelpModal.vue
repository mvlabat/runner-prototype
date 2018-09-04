<script>
import VkModal from 'vuikit/src/library/modal/components/modal';
import VkModalTitle from 'vuikit/src/library/modal/components/modal--title';
import VkModalClose from 'vuikit/src/library/modal/components/modal--close';

export default {
  name: 'HelpModal',
  components: {
    VkModalClose,
    VkModalTitle,
    VkModal,
  },
  props: [
    'show',
  ],
};
</script>

<template>
    <vk-modal center :show.sync="show">
        <vk-modal-close></vk-modal-close>
        <vk-modal-title>Help</vk-modal-title>
        <p>
            Press W/A/S/D to move camera or player, ESC to switch to player or builder mode.
        </p>
    </vk-modal>
</template>
