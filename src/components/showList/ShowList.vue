<template>
  <div class="outer">
    <div class="explain">
    {{ tip[status] }}
    <el-button type="primary" plain icon="el-icon-sort" @click="dataList.reverse()"></el-button>
    </div>
    <div class="itemOuter" ref="itemOuter" v-show="!editShow">
      <div class="item" v-for="(item, index) in dataList" :key="index" :title="'创建日期：'+item.createDate">
        <p class="itemTitle">{{ item.title }}</p>
        <div class="content">{{ item.content }}</div>
        <div class="itemDate" v-if="item.status === 0" style="text-align: center;">{{ item.handleDate }}处理</div>
        <div class="itemDate" v-if="item.status === 1" style="color:red; text-align: center;">请尽快处理哦</div>
        <div class="itemDate" v-if="item.status === 2" style="text-align: center;">已经完成的事件</div>
        <div class="operation" v-if="status === 0">
          <button
            @click="
              editShow = true;
              itemData = item;
            "
          >
            修改
          </button>
          <button class="del" @click="del(item)">删除</button>
        </div>
        <div class="operation" v-if="status === 1">
          <button @click="editShow = true ; itemData = item;">修改</button>
          <button @click="finish(item)">完成</button>
          <button class="del" @click="del(item)">删除</button>
        </div>
        <div class="operation" v-if="status === 2">
          <button class="del" @click="del(item)">删除</button>
        </div>
      </div>
    </div>
    <div class="edit" v-if="editShow">
      <div class="btndiv">
        <button @click="editShow = false">X</button>
      </div>
      <div class="editdiv">
        <Edit @editdata="edit" :todoData="itemData" />
      </div>
    </div>

  </div>
</template>

<script>
import Edit from "@/components/edit/Edit";

export default {
  name: "ShowList",
  components: {
    Edit,
  },
  data() {
    return {
      itemData: {},
      editShow: false,
      editItem: {},
      tip: ["待办", "待处理", "已完成"],
      centerDialogVisible:false
    };
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    edit(item) {
      this.$emit("edit", item);
      this.editShow = false;
    },
    del(item) {
      //console.log(item,"del")
      if(confirm(`确认删除： ${item.title}？`)){
        this.$emit("del", item);
      }
      
    },
    finish(item) {
      this.$emit("finish", item);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.outer {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 155, 0.2);
}

.explain {
  position: relative;
  width: 100%;
  height: 35px;
  text-align: center;
  line-height: 30px;
  background-color: rgba(100, 149, 237, 0.4);
}

.explain .el-button{
  height: 30px;
  position: absolute;
  right: 0;
}

.itemOuter {
  width: 100%;
  height: 370px;
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
}

.item {
  width: 140px;
  max-height: 183px;
  margin: 5px 5px 10px 12px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 1px 1px 2px 3px rgba(125, 125, 125, 0.2);
}

.edit {
  position: relative;
  width: 100%;
  height: 350px;
  background-color: whitesmoke;
  border: 0.1px solid rgba(255, 0, 155, 0);
}

.edit .btndiv {
  position: relative;
  height: 50px;
  margin-bottom: 20px;
}

.edit .editdiv {
  padding-right: 12%;
  width: 100%;
  margin-left: -25px;
}

.btndiv button {
  position: absolute;
  right: 0;
  z-index: 100;
}

.itemOuter::-webkit-scrollbar {
  display: none;
}
.itemOuter::-ms-scrollbar {
  display: none;
}
.itemOuter::-o-scrollbar {
  display: none;
}

.itemOuter::scrollbar {
  display: none;
}



.operation {
  width: 100%;
  height: 23px;
  background-color: rgba(138, 43, 226, 0.1);
  display: flex;
  justify-content: space-around;
  align-content: space-around;
}

.operation button {
  border: none;
  background-color: rgba(50, 89, 196, 0.5);
  border-radius: 10%;
}

.operation button:hover {
  background-color: rgb(135, 206, 235);
}

.del {
  color: red;
}

.itemTitle {
  margin: 0;
  width: 100%;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 16px;
  background-color: rgba(255, 125, 125, 0.2);
}

.content {
  width: 100%;
  height: 120px;
  overflow-y: scroll;
  text-align: left;
  background-color: rgba(222, 255, 255, 0.2);
}

.content::-webkit-scrollbar {
  display: none;
}
.content::-ms-scrollbar {
  display: none;
}
.content::-o-scrollbar {
  display: none;
}
.content::scrollbar {
  display: none;
}

.itemDate {
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
}

</style>