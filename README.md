# xi-wxUi
原生小程序Ui组件
#### 2021.01.13
  1. `A` _新增_ 组件 `xi-calendar`, 日历组件完成 
#### 2019.05.25
  1. `F` _修复_ `CSS`
    ```html
      view {
        box-sizing: border-box;
      }
    ```导致 progress 样式混乱
#### 2019.05.18
  1. `A` _新增_ `API` 抽屉动画， XScroll.wxs 
#### 2019.05.15
  1. `U` _修改_ `API` WxUtil.js `getScrollViewFixedTop`方法采用 top 属性进行计算干扰值
#### 2019.05.14
  1. `A` _新增_ 样式 `base.less`，全局初始化样式 
#### 2019.05.13
  1. `A` _新增_ 组件 `xi-checkbox`，checkbox 
### 修订信息
#### 2019.04.29
  1. `A` _新增_ 组件 `xi-bottom-line`，分割线 
#### 2019.04.27
  1. `F` _修复_ 组件 `province-group`，父组件无法获取子组件提交的数据 
  2. `A` _新增_ 组件 `xi-skeleton`，骨架屏加载动画 
#### 2019.04.23
  1. `F` _修复_ API `fetch.interceptors.request` 请求拦截器未处理 `return config`报错信息，导致的无法使用情况
#### 2019.04.22
  1. `A` _新增_ 组件 ```<xi-progress>``` 环形进度条功能
  2. `U` _修改_ 组件 ```<xi-swiper-group>```环形指针进度条功能
  3. `F` _修复_ API `relations.js`文件无法获取 父子组件示例问题
#### 2019.04.20
  1. `A` _新增_ 组件 ```<xi-swiper-group>```
    ```html
      <xi-swiper-group>
        <!-- 可以通过，来添加轮播指针 -->
        <xi-swiper-dots></xi-swiper-dots>
      </xi-swiper-group>
    ```
#### 2019.04.19
  1. `U` _修改_ 组件 ```<xi-dialog>``` 弹框按钮样式
  2. `U` _修改_ 组件 ```<xi-modal>``` 弹框样式动画效果
  3. `U` _修改_ 组件 ```<xi-papaw>``` 为全屏效果,不可自定义高度
  4. `F` _修复_ 组件 ```<province-group>``` 获取缓慢,导致文字弹蹦展示
#### 2019.04.18
  1. `A` _新增_ _版本_ 描述文件
#### 2019.04.16
  1. `A` _新增_ 组件 ```<message-close>```  手动关闭顶部弹框  
  2. `U` _修改_ 组件 ```<poster-canvas>``` 添加图片到`canvas`中