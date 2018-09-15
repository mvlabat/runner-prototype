// eslint-disable-next-line import/prefer-default-export
export function modalWatchHelper(propName, dataName) {
  return {
    [propName](newState) {
      if (newState !== this.showModal) {
        this.showModal = newState;
      }
    },
    [dataName](newState) {
      if (newState !== this.show) {
        this.$emit('update:show', newState);
      }
    },
  };
}
