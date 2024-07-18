# my-pocket-book
*  从0写一个react项目，学习完入门知识之后完成的第一个项目，特点如下
*  0.整体情况React18 Hook+Redux9+Redux ToolKit+redux-persist+Router6+echarts+json-server+antD Mobile+scss
*  1.React18，0类组件，纯Hook
*  2.Redux+RTK+redux-persist，实现数据持久化
*  3.Routev6，使用声明式语法配置路由
*  4.antd-mobile、echarts，练习组件库的使用和开发文档的阅读
*  5.首先素材中矢量图来自https://www.iconfont.cn/
*  6.页面结构参考
*  https://github.com/Nick930826/juejue-vite-h5
*  https://www.bilibili.com/video/BV1ZB4y1Z7o8/?p=163&vd_source=b2d394eec10e8ecfd1eec9adc8cc6630
*  https://github.com/*Blackn-L/day-day-account-book-frontend/tree/main?tab=readme-ov-file

## 工具包
* `react-router-dom v6.24.1` 路由切换
* `@reduxjs/toolkit` 通过RTK实现快速生成action Creater、reducer、异步action creater，自定义Selector，实体适配器简化操作等
* `axios` 接口请求库，进行二次封装，配置基地址、拦截axios请求添加请求头、拦截axios响应初步判断权限
* `scss` 转换scss到css
* `antd-mobile` https://mobile.ant.design/zh 开源组件库
* `react-simple-captcha` 生成、验证验证码的开源工具包
* `echarts` 一个开源的基于 JavaScript 的开源可视化图表库
* `classnames` 简化JSX中设置类名的操作
* `dayjs` 格式化时间、解析、验证、操作和显示日期和时间
* `uuid` 生成通用唯一标识符
* `redux-persist` redux数据持久化
* `lodash` 开放源码的JavaScript函式库，透过函数式编程模式提供开发者常用的函数
* `json-server` 模拟后端接口
* `json-server-auth` 模拟后端返回token和权限验证

## 功能
* 登录（已完成）
  - [√] 使用防抖、正则验证邮箱的格式，xxxxx@xxx.xxx格式
  - [√] 生成验证码校验人机
  - [√] 登录成功显示弹窗，延迟显示主界面
  - [√] 记录token

* 注册（已完成）
  - [x] 使用防抖、正则验证邮箱的格式，xxxxx@xxx.xxx格式
  - [x] 使用防抖进行密码校验 length>6
  - [x] 使用防抖进行确认密码校验 password===confirmPassword
  - [x] 生成验证码校验人机
  - [x] 注册成功跳转登录


* 月度账单列表（已完成）
  - [x] 计算月度总收入、支出
  - [x] 计算日收入、支出
  - [x] 点击显示每日详情
  - [x] 点击浮标创建新账单

* 年度账单统计（部分完成）
  - [x] 饼状图显示年度收入支出
  - [x] 点击判断权限下载年度数据 (待完成)
  - [x] 点击判断权限弹出广告充会员 (待完成)

* 个人中心(部分完成)
  - [x] 显示个人信息（头像、签名、用户名）
  - [x] 显示个人信息（头像、签名、用户名）
  - [x] 修改密码（json-server-auth的限制目前无法完成）(待完成)
  - [x] 修改个人信息 (待完成)
  - [x] 退出登录

* 权限校验（部分完成）
  - [x] 全局路由守卫，验证 token，无 token 自动跳转登录页
  - [x] 401 状态码，token 过期，自动跳转登录页
  - [x] 再次进入有 token 情况下，打开登录页，直接跳转 '/' (待完成)
  - [x] 未匹配路由跳转 '/' (待完成)

* 性能优化（部分完成）
  - [x] useMemo避免不必要的计算
  - [x] 路由懒加载
  - [x] 配置cdn (待完成)
  - [x] 图片资源懒加载 (待完成)

