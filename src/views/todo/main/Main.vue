<template>
  <div class="outer">
    <el-dialog class="addDialog" title="新增待办" :visible.sync="addVisible">
      <div class="dialogDiv">
        <Edit v-if="addVisible" @editdata="add" />
      </div>
    </el-dialog>

    <div class="navbar">
      <div class="editBtn">
      新建：
        <el-button
          @click="addVisible = true"
          title="新增待办"
          type="primary"
          icon="el-icon-edit"
          circle
        ></el-button>
      </div>
      <div class="selectItem">
        <el-checkbox v-model="todoShwo">待办</el-checkbox>
        <el-checkbox v-model="handleShow">待处理</el-checkbox>
        <el-checkbox v-model="completeShow">已处理</el-checkbox>
      </div>
      <div class="sortSelect">
        排序方式：
        <el-select
          v-model="sortMode"
          placeholder="请选择排序方式"
          @change="sortModeChanged()"
        >
          <el-option
            v-for="item in options"
            :key="item.sortMode"
            :label="item.label"
            :value="item.sortMode"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="todoList">
      <div v-show="todoShwo">
        <ShowList :dataList="todoList" :status="0" @del="del" @edit="edit" />
      </div>
      <div v-show="handleShow">
        <ShowList
          :dataList="handleList"
          :status="1"
          @del="del"
          @edit="edit"
          @finish="finish"
        />
      </div>
      <div v-show="completeShow">
        <ShowList :dataList="finishList" :status="2" @del="del" @edit="edit" />
      </div>
    </div>
  </div>
</template>

<script>
import ShowList from "@/components/showList/ShowList";

import Edit from "@/components/edit/Edit";

export default {
  name: "Main",
  components: {
    ShowList,
    Edit,
  },
  data() {
    return {
      handleShow: true,
      todoShwo: true,
      completeShow: false,
      addVisible: false,
      todoList: [],
      handleList: [],
      finishList: [],
      timer: 0,
      options: [
        {
          sortMode: 1,
          label: "创建时间排序",
        },
        {
          sortMode: 2,
          label: "处理时间排序",
        },
      ],
      sortMode: 1,
      // todoList: [{name:"lll"}, {name:"ly"}, {name:"lf"}, {name:"yyl"}, {name:"dsf"}],
    };
  },
  methods: {
    created() {
      this.sortModeChanged();
      this.ergodic();
    },

    ergodic() {
      clearInterval(this.timer);
      if (this.todoList.length > 0) {
        this.timer = setInterval(() => {
          this.todoList.forEach((item, index, arr) => {
            //每5秒遍历一次待办列表，当有事件到达处理时间时，将其加入处理列表中
            if (new Date(item.date).getTime() <= new Date().getTime()) {
              item.status = 1;
              this.handleList.push(item);
              this.sort(this.handleList);
              arr.splice(index, 1);
              if (this.todoList.length === 0) {
                clearInterval(this.timer);
              }
            }
          });
        }, 5000);
      }
    },
    //当排序方式改变时将所有列表重新排序
    sortModeChanged() {
      this.sort(this.todoList);
      this.sort(this.handleList);
      this.sort(this.finishList);
    },

    sort(list) {
      let temp = {};
      if (list&&list.length > 1) {
        for (let i = 0; i < list.length; i++) {
          for (let j = 0; j < list.length; j++) {
            if (list[j] && list[j + 1]) {
              if (this.sortMode === 1) {
                if (
                  (new Date(list[j + 1].createDate)).getTime() <
                  (new Date(list[j].createDate)).getTime()
                ) {
                  temp = list[j + 1];
                  this.$set(list, j + 1, list[j]);
                  this.$set(list, j, temp);
                }
              }else if (this.sortMode === 2){
                if (
                  (new Date(list[j + 1].handleDate)).getTime() <
                  (new Date(list[j].handleDate)).getTime()
                ) {
                  temp = list[j + 1];
                  this.$set(list, j + 1, list[j]);
                  this.$set(list, j, temp);
                }
              }
            }
          }
        }
      }
    },

    add(data) {
      //console.log(data)
      if (data) {
        this.todoList.push(data);
        this.reSort();
      }
      this.addVisible = false;
    },

    edit(data) {
      if (data.status === 0) {
        this.editWork(this.todoList, data);
      } else if (data.status === 1) {
        this.editWork(this.handleList, data);
      } 
      // else if (data.status === 2) {
      //   this.editWork(this.finishList, data);
      // }
    },

    del(data) {
      if (data.status === 0) {
        //console.log(data,"main...")
        this.delWork(this.todoList, data);
        //console.log(this.todoList,"mainlll...")
      } else if (data.status === 1) {
        this.delWork(this.handleList, data);
      } else if (data.status === 2) {
        this.delWork(this.finishList, data);
      }
    },

    finish(item) {
      item.status = 2;
      this.finishList.push(item);
      this.sort(this.finishList);
      this.delWork(this.handleList, item);
    },

    editWork(arr, item) {
      arr.forEach((v, index, arr) => {
        if (item.id === v.id) {
          //当处于待处理状态的事件修改了时间，改为了未到处理时间时
          if (
            item.status === 1 &&
            new Date(item.date).getTime() > new Date().getTime()
          ) {
            item.status = 0;
            this.todoList.push(item);
            this.reSort();
            arr.splice(index, 1);
          } else {
            this.$set(arr, index, item);
            this.reSort();
          }
          return;
        }
      });
    },

    delWork(arr, item) {
      arr.forEach((v, index, arr) => {
        if (item.id === v.id) {
          arr.splice(index, 1);
          return;
        }
      });
    },

    reSort() {
      clearInterval(this.timer);
      this.sort(this.todoList);
      this.ergodic();
    },
  },
};
</script>

<style scoped>
.outer {
  margin: 0;
  padding: 0;
  width: 100%;
}

.el-dialog {
  width: 100%;
  height: 400px;
  margin: auto;
}
.dialogDiv {
  width: 75%;
  margin-left: 40px;
}
.navbar,
.todoList {
  width: 100%;
  margin-top: 15px;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-content: center;
}

.navbar {
  margin-top: -10px;
  height: 49px;
  justify-content: start;
  background-color: rgba(125, 125, 125, 0.1);
}

.sortSelect {
  height: 100%;
  display: flex;
  line-height: 49px;
  margin-left: 200px;
  align-content: space-around;
}

.editBtn {
  width: 10%;
  margin-top: 5px;
  margin-left: 20px;
}

.selectItem {
  height: 100%;
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-content: center;
  background-color: rgba(185, 185, 200, 0.1);
  margin-left: 30px;
}

.selectItem .el-checkbox {
  margin-top: 15px;
}

.todoList div {
  width: 320px;
  height: 420px;
  background-color: rgba(13, 46, 236, 0.1);
}
</style>