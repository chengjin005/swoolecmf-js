<template>
  <a-card>
    <a-form :form="form">
      <a-form-item label="存储类型">
    <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <!-- <a-select-option value="disabled" disabled>Disabled</a-select-option> -->
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
    <a-button style="margin-left: 10px;">保存</a-button>
  </a-form-item>
  </a-form>
  </a-card>
</template>
<script>
export default {
  methods: {
    handleChange(value) {
      // console.log(`selected ${value}`);
    }
  }
}
</script>
