<template>
    <div id="gui-wrapper">
        <player-info-bar></player-info-bar>
    </div>
</template>

<script>
import PlayerInfoBar from './PlayerInfoBar.vue';

export default {
  name: 'app',
  components: {
    PlayerInfoBar,
  },
};
</script>

<style lang="scss">
    html, body, #canvas-wrapper, #canvas-wrapper canvas {
        display: block;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    #canvas-wrapper {
        position: relative;
    }

    #gui-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;

        > * {
            position: absolute;
            pointer-events: all;
        }
    }
</style>
