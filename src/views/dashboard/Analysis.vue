<template>
<a-card :body-style="{padding: '24px 32px'}" :bordered="false">
  <a-table :columns="columns" :dataSource="data" />
</a-card>
</template>
<script>
const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default {
  data() {
    return {
      data,
      columns
    }
  },
  computed: {

  },
  methods: {

  },
}
</script>
