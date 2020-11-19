<template>
  <div class="outer">
    <el-container class="el">
      <el-header>
        <slot name="header"></slot>
        {{title}}
      </el-header>
      <el-container>
        <!--<el-aside width="130px">
          <slot name="aside"></slot>
        </el-aside>-->
        <el-main>
          <slot name="main"></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name:"Container",
  props:{
    title:{
      type:String,
      default:""
    } 
  }
};
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.outer {
  width: 1050px;
  height: 600px;
  margin: auto;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: rgba(233, 238, 243,.2);
  color: #333; 
  overflow: hidden;
}

.el-container {
  /*margin-bottom: 40px;*/
  min-height: 500px;
}

/*
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 130px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}*/
</style>