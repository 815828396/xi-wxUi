// public/components/button/button.js
import behavior from '../../../utils/behaviors/behaviors'

Component({
  
  externalClasses: ['xi-class'],

  behaviors: [ behavior ],

  properties: {
    type: {
      type: String,
      value: 'primary'
    },
    iconClass: {
      type: String,
      value: 'icon-loading1'
    },
    small: Boolean,
    loading: Boolean
  },

  data: {

  },

  methods: {
    handleClick () {
      this.triggerEvent('click', {
        ...this.returnPro(),
        dataset: this.dataset || {}
      })
    }
  }
})
