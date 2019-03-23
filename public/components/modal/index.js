// public/components/modal/modal.js
import behavior from '../../../utils/behaviors/behaviors';

Component({

  externalClass: ['xi-class'],

  behaviors: [behavior],

  properties: {
    visiable: Boolean,
    title: String,
    cancel: String,
    confirm: String,
    border: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    handleBtn ({ detail }) {
      const { target } = detail;

      this.trigger('click', {
        confirm: target === 'confirm',
        cancel: target === 'cancel'
      })
    }
  }
})
