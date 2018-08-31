<template>
    <div id="player-info-bar">
        <div id="bar-left">
            <div id="help">
                Press W/A/S/D to move camera or player,
                ESC to switch to player or builder mode.
            </div>
        </div>
        <div id="bar-right">
            <div id="ping">Latency: {{ playerPing }}</div>
        </div>
    </div>
</template>

<script>
import LocalGameState from '../game/LocalGameState';

export default {
  name: 'PlayerInfoBar',

  data: () => ({
    playerModel: LocalGameState.getPlayerModel(),
  }),

  computed: {
    playerPing() {
      return `${Math.round(this.playerModel.latency)}ms`;
    },
  },
};
</script>

<style scoped lang="scss">
    #player-info-bar {
        top: 0;
        left: 0;
        right: 0;

        background-color: #fefefe;
        box-shadow: 0 0.5px 5px 0 #666;

        font-size: 0.8em;
        color: #333;

        > * {
            padding: 1em;
        }
    }

    #bar-left {
        float: left;
    }

    #bar-right {
        text-align: right;
    }
</style>
