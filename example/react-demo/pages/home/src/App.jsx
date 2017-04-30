import React from 'react'
import Header from 'components/header'
import './style.styl'

export class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      desc: '',
      phone: '183'
    }
  }

  onBack () {
    console.log('back')
  }

  onInputDesc (e) {
    this.setState({
      desc: e.target.value
    })
  }

  onInputPhone ({target}) {
    this.setState({
      phone: target.value
    })
  }

  submit () {
    this.setState({
      phone: 222
    })
  }

  render () {
    return (
      <div className="mod-hub">
        <Header
          onBack={this.onBack}
          name="需求单"
        />
        <div className="hub-body">
          <div className="hub-form">
            <div className="hub-desc">
              <textarea
                onInput={this::this.onInputDesc}
                className="textarea-clean"
                placeholder="留下您的采购信息，如钢材品类，数量，交货期等，商家将在5分钟内跟您联系并给您报价，请保持手机通畅。">
              </textarea>
              {
                this.state.desc.length > 100 ? <p className="err-pannel text-right">字数超过限制
                  <span className="desc-len">{this.state.desc.length}/100</span>
                </p> : ''
              }
            </div>

            <hr className="form-hr"/>
            <div className="hub-mobile">
              <input
                type="number"
                placeholder="请输入您的手机号"
                value={this.state.phone}
                maxLength="11"
                onChange={this::this.onInputPhone}
              />
            </div>

          </div>
          <div onClick={this::this.submit} className="btn-submit uf uf-center tap-active">提交需求</div>
        </div>
      </div>
    )
  }
}
