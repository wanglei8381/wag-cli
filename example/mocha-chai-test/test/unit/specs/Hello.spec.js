import Vue from 'vue'
import Hello from 'pages/home/src/App.vue'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent)
      .to.equal('this is template body')
  })
})
