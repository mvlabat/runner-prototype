<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import VkModal from 'vuikit/src/library/modal/components/modal';
import VkModalTitle from 'vuikit/src/library/modal/components/modal--title';
import VkButton from 'vuikit/src/library/button/components/button';
import VkNotification from 'vuikit/src/library/notification/components/notification';

import AuthenticationRequestMessage from 'common/NetworkMessages/AuthenticationRequestMessage';

import LocalGameState from '../../game/LocalGameState';

export default {
  name: 'AuthenticationModal',
  mixins: [validationMixin],
  components: {
    VkNotification,
    VkButton,
    VkModalTitle,
    VkModal,
  },

  data: () => ({
    displayName: '',
    playerModel: LocalGameState.getPlayerModel(),
    messages: [],
    messageCounter: 0,
  }),

  computed: {
    showAuthenticate() {
      return !process.env.DISPLAY_NAME && !this.playerModel.authenticated;
    },
    clientId() {
      return this.playerModel.clientId;
    },
  },

  watch: {
    clientId(newClientId) {
      if (typeof newClientId === 'string') {
        this.messages.push({ message: newClientId, messageCounter: this.messageCounter });
        this.messageCounter += 1;
        this.playerModel.clientId = null;
      }
    },
  },

  methods: {
    sendAuthenticationRequest() {
      this.$v.$touch();
      if (this.$v.$anyError) {
        return;
      }
      this.playerModel.displayName = this.displayName;
      LocalGameState
        .getNetworkController()
        .send(new AuthenticationRequestMessage(this.displayName));
    },
  },

  validations: {
    displayName: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(20),
    },
  },

  mounted() {
    if (process.env.DISPLAY_NAME) {
      this.displayName = process.env.DISPLAY_NAME;
      this.sendAuthenticationRequest();
    } else {
      this.displayName = localStorage.getItem('displayName');
    }
  },
};
</script>

<template>
    <div>
        <vk-modal center stuck :show.sync="showAuthenticate">
            <vk-modal-title>Authentication</vk-modal-title>

            <p>
                Welcome to the Muddle! Enjoy your time here ;)
            </p>

            <form ref="loginForm"
                  v-on:submit.prevent="sendAuthenticationRequest">
                <div class="uk-form-row">
                    <label for="input-name" class="uk-form-label">Display name</label>
                    <input v-model.trim="$v.displayName.$model"
                           id="input-name"
                           class="uk-input"
                           :class="{ 'uk-form-danger': $v.displayName.$error }"
                    />
                </div>
                <div class="error-group">
                    <div class="error" v-if="!$v.displayName.required">Field is required</div>
                    <div class="error" v-if="!$v.displayName.minLength">
                        Display name must have at least
                        {{$v.displayName.$params.minLength.min}} letters.
                    </div>
                    <div class="error" v-if="!$v.displayName.maxLength">
                        Display name can't have more than
                        {{$v.displayName.$params.maxLength.min}} letters.
                    </div>
                </div>
            </form>

            <vk-button v-on:click="sendAuthenticationRequest"
                       id="login-button"
                       type="primary"
                       class="uk-button uk-button-default uk-modal-close">Login</vk-button>
        </vk-modal>

        <vk-notification
                position="bottom-right"
                status="danger"
                :messages.sync="messages"></vk-notification>
    </div>
</template>

<style scoped lang="scss">
    #login-button {
        margin-top: 1em;
    }

    .error-group {
        height: 25px;
    }
</style>
