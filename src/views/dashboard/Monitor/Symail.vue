<template>
  <a-card title="邮箱配置">
  <a-button type="primary" icon="plus" @click="()=>$refs.modal.edit('add')">添加邮箱</a-button>
  <a-table :columns="columns" :dataSource="data">
    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
    <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
    <span slot="tags" slot-scope="tags">
      <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
    </span>
    <span slot="action" slot-scope="text, record">
      <a href="javascript:;"@click="()=>$refs.modal.edit(record)">编辑</a>
      <a-divider type="vertical" />
      <a href="javascript:;">删除</a>
    </span>
  </a-table>
  <EditTip ref="modal" @ok="handleOk"></EditTip>
</a-card>
</template>
<script>
import EditTip from './EditTip'
const columns = [{
  dataIndex: 'name',
  key: 'name',
  title: '唯一标志' ,
  scopedSlots: { customRender: 'name' },
}, {
  title: '邮件标题',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '分类名',
  dataIndex: 'class',
  key: 'class',
}, {
  title: '描述',
  key: 'desc',
  dataIndex: 'desc',
  scopedSlots: { customRender: 'desc' },
},
{
  title: '排序',
  key: 'sort',
  dataIndex: 'sort',
  scopedSlots: { customRender: 'sort' },
},{
  title: '添加时间',
  key: 'time',
  dataIndex: 'time',
  scopedSlots: { customRender: 'time' },
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' },
}];

const data = [{
  key: '1',
  name: '唯一性',
  title: '我的唯一',
  class: '唯一性',
  desc: '唯一的',
  sort: 1,
  time: '2019.01.01'
}, {
  key: '2',
  name: '唯一性',
  title: '我的唯一',
  class: '唯一性',
  desc: '唯一的',
  sort: 1,
  time: '2019.01.01'
}, {
  key: '3',
  name: '唯一性',
  title: '我的唯一',
  class: '唯一性',
  desc: '唯一的',
  sort: 1,
  time: '2019.01.01'
},
];

export default {
  components: {
    EditTip
  },
  data() {
    return {
      data,
      columns,
    }
  },
  methods: {
    handleOk () {
      // 新增/修改 成功时，重载列表
      this.$refs.table.refresh()
    },
  }
}
</script>
