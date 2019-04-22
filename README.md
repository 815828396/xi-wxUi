# xi-wxUi
原生小程序Ui组件
### 修订信息
#### 2019.04.22
  1. `A` __新增__ 组件 ```<xi-progress>``` 环形进度条功能
  2. `U` __修改__ 组件 ```<xi-swiper-group>```环形指针进度条功能
  3. `F` __修复__ API `relations.js`文件无法获取 父子组件示例问题
#### 2019.04.20
  1. `A` 新增 组件 ```<xi-swiper-group>```
    ```html
      <xi-swiper-group>
        <!-- 可以通过，来添加轮播指针 -->
        <xi-swiper-dots></xi-swiper-dots>
      </xi-swiper-group>
    ```
#### 2019.04.19
  1. `U` 修改 组件 ```<xi-dialog>``` 弹框按钮样式
  2. `U` 修改 组件 ```<xi-modal>``` 弹框样式动画效果
  3. `U` 修改 组件 ```<xi-papaw>``` 为全屏效果,不可自定义高度
  4. `F` 修复 组件 ```<province-group>``` 获取缓慢,导致文字弹蹦展示
#### 2019.04.18
  1. `A` 新增 _版本_ 描述文件
#### 2019.04.16
  1. `A` 新增 组件 ```<message-close>```  手动关闭顶部弹框  
  2. `U` 修改 组件 ```<poster-canvas>``` 添加图片到`canvas`中