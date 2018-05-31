<template>
    <div id="canvas-wrapper">
        <div id="gui-wrapper">
            <div id="builder-bar">
                <p>GUI placeholder</p>
                <p>
                    Press W/A/S/D to move camera or player,
                    ESC to switch to player or builder mode.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App!',
    };
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
            pointer-events: all;
        }
    }

    #builder-bar {
        position: absolute;
        bottom: 0;
        height: 6em;
        font-size: 1.5em;
        text-align: center;
        width: 100%;

        background: rgba(0.2, 0.2, 0.2, 0.1);
    }
</style>
