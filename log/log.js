class PrettyLog {
  constructor() {
    this.isProduction = false // 是否为生产环境
    this.defaultTitle = 'custom log' // 定义 title 的默认值
    this.defaultContent = 'default content' // 定义 title 的默认值
  }

  // 判断值是否为空
  isEmpty(value) {
    return value == null || value === ''
  }

  // 美化打印
  prettyPrint(title, text, color) {
    if (this.isProduction) return
    const styles = [
      `background:${color};border:1px solid ${color};padding:1px;border-radius:2px 0 0 2px;color:#fff;`,
      `border:1px solid ${color};padding:1px;border-radius:0 2px 2px 0;color:${color};`,
      'background:transparent'
    ]
    console.log(`%c ${title} %c ${text} %c`, ...styles)
  }

  // 通用打印方法
  logMessage(content, color) {
    const resolvedText = this.isEmpty(content) ? this.defaultContent : content // 决定正文
    this.prettyPrint(this.defaultTitle, resolvedText, color)
  }

  // 日志方法
  info(content = '') {
    this.logMessage(content, '#909399')
  }

  error(content = '') {
    this.logMessage(content, '#F56C6C')
  }

  warning(content = '') {
    this.logMessage(content, '#E6A23C')
  }

  success(content = '') {
    this.logMessage(content, '#67C23A')
  }

  // 表格打印
  table(data) {
    console.table(data)
  }
}

// 创建 PrettyLog 实例
const log = new PrettyLog()

log.info('info')
log.error('info')
log.warning('info')
log.success('info')
log.table([{ name: '张三', age: 18, gender: '男', address: '北京', phone: '12345678901' }])
