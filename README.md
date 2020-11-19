# todo

##基本介绍

###基本逻辑

事件：事件以对象形式保存，所有事件保存在数组中，组成一个事件列表

    1·事件对象属性
        {
            id：number,
            status:number,//状态属性取值分别为0（代表待办事件），1（代表待处理事件），2（代表已完成事件）
            handleDate：string,//处理日期
            createDate:string,//创建日期
            titil:string,//标题
            content:string//内容

        }

    2·事件有三种状态的转换
        （1）不同状态的事件分别保存在三个不同的列表中todoList(保存待办事件),handleList(保存待处理事件),finishList(保存已完成事件)
        （2）待办事件在到达处理时间后状态码将从0变为1，并从todoList转移到handleList中，事件处理完成后可点击完成按钮，事件状态码将从1变为2，并从handleList转移到finishList中

    3·事件增，删，改
        （1）新建事件
        （2）修改：待办事件和待处理事件可修改        
        （3）删除：待办，待处理，完成事件均可删除

    4·事件排序
        （1）排序方式：事件可以选择以创建时间和处理时间排序均是以时间升序排序，此为默认排序方式，对三种状态列表均生效
        （2）三个不同状态的列表均可单独进行反转排序
        （3）所有事件列表的元素如有增删均会触发默认排序方式重新排序

###基本组件
    /*页面使用的element UI制作*/
    1·Container.vue:页面布局组件，完成页面基本布局
    2·Todo.vue:页面主容器组件，完成页面的显示
    3·Main.vue:主内容区组件，页面内容的显示
    4.Edit.vue:子组件，新增和修改事件时调用的组件
    5.ShowList.vue:子组件，显示事件列表的组件

###基本函数
    ergodic()//遍历todoList列表，时间到达处理时间时将事件对象转到handleList
    sort(list:Array)//排序函数，可根据创建时间和处理时间排序
    finish(item:Object)//将完成的事件放到finishList列表中
    editWork(arr:Array, item:Object)//编辑事件对象,并保存到对应列表中
    delWork(arr:Array, item:Object)//删除事件对象
    add(data:Object)//新建事件时将事件添加到todoList列表中









## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


