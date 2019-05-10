import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AnyPtrRecord, AnyPtrRecord } from 'dns'

export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }
  state = {
    animationScale: [],
    isScale: false,
    animationFade: [],
    isFade: false,
    animationSlide: Taro.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
      // transformOrigin: '0 0'
    })
      .translate3d(0, '100%', 0)
      .step()
      .export(),
    isSlide: false
  }
  animation: any

  toggleScale = () => {
    const animation = Taro.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
      // transformOrigin: '0 0'
    })

    this.state.isScale
      ? animation.scale(1, 1).step()
      : animation.scale(0.1, 0.1).step()

    this.setState({
      isScale: !this.state.isScale,
      animationScale: animation.export()
    })
  }
  toggleFade = () => {
    const name = 'Fade'
    const animation = Taro.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
      // transformOrigin: '0 0'
    })

    this.state[`is${name}`]
      ? animation.opacity(1).step()
      : animation.opacity(0).step()

    this.setState({
      [`is${name}`]: !this.state[`is${name}`],
      [`animation${name}`]: animation.export()
    })
  }
  toggleSlide = () => {
    const name = 'Slide'
    const animation = Taro.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })

    this.state[`is${name}`]
      ? animation.translate3d(0, '100%', 0).step()
      : animation.translate3d(0, 0, 0).step()

    this.setState({
      [`is${name}`]: !this.state[`is${name}`],
      [`animation${name}`]: animation.export()
    })
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='index'>
        <View
          className='box'
          animation={this.state.animationScale}
          onClick={this.toggleScale}
        >
          <Text>Scale</Text>
        </View>
        <View
          className='box'
          animation={this.state.animationFade}
          onClick={this.toggleFade}
        >
          <Text>Fade</Text>
        </View>
        <View
          className='box'
          animation={this.state.animationSlide}
          onClick={this.toggleSlide}
        >
          <Text>Slide</Text>
        </View>
      </View>
    )
  }
}
