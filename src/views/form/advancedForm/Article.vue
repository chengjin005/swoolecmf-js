<template>
<a-card :body-style="{padding: '24px 32px'}" :bordered="false">
  <a-button class="editable-add-btn" @click="handleAdd">添加</a-button>
  <a-table bordered :dataSource="dataSource" :columns="columns">
    <editable-cell :text="text" @change="onCellChange(record.key, 'name')" />
    <template slot="operation" slot-scope="text, record">
      <!-- <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="() => onDelete(record.key)"> -->
        <a href="javascript:;" @click="() => $refs.modal.edit(record)">编辑</a>
      <!-- </a-popconfirm> -->
      <a-divider type="vertical" />
      <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="() => onDelete(record.key)">
        <a href="javascript:;"style="color: red">删除</a>
      </a-popconfirm>
    </template>
  </a-table>
  <ArtTip ref="modal" @ok="handleOk"></ArtTip>
</a-card>
</template>
<script>
import ArtTip from './ArtTip'
/*
 * EditableCell Code https://github.com/vueComponent/ant-design-vue/blob/master/components/table/demo/EditableCell.vue
 */
export default {
  components: {
    ArtTip
  },
  data() {
    return {
      name: 'BaseForm',
      description: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
      dataSource: [{
        key: '0',
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
      }, {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
      }],
      count: 2,
      columns: [{
        title: '序号',
        dataIndex: 'name',
        width: '30%',
        scopedSlots: {
          customRender: 'name'
        },
      }, {
        title: 'ID',
        dataIndex: 'age',
      }, {
        title: '分类名',
        dataIndex: 'address',
      }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: {
          customRender: 'operation'
        },
      }],
    }
  },
  methods: {
    onCellChange(key, dataIndex) {
      return (value) => {
        const dataSource = [...this.dataSource]
        const target = dataSource.find(item => item.key === key)
        if (target) {
          target[dataIndex] = value
          this.dataSource = dataSource
        }
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.key !== key)
    },
    handleOk () {
      // 新增/修改 成功时，重载列表
      this.$refs.table.refresh()
    },
    handleAdd() {
      const {
        count,
        dataSource
      } = this
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: 32,
        address: `London, Park Lane no. ${count}`,
      }
      this.dataSource = [...dataSource, newData]
      this.count = count + 1
    },
  },
}
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
