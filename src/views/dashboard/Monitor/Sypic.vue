<template>
<a-card
  title="图片上传配置"
>
  <a-form @submit="handleSubmit" :form="form">
    <a-form-item v-bind="formItemLayout" label='默认上传方式'>
      <a-radio-group name="radioGroup" :defaultValue="1">
        <a-radio :value="1">AWS s3</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label='储存空间名称 Bucket'>
      <a-input v-decorator="[
          'Bucket',
          { rules: [{ required: true, message: 'Please input your Bucket!' }] }
        ]"/>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label='KEY key'>
      <a-input v-decorator="[
          'key',
          { rules: [{ required: true, message: 'Please input your key!' }] }
        ]"/>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label='SECRET secret'>
      <a-input v-decorator="[
          'secret',
          { rules: [{ required: true, message: 'Please input your secret!' }] }
        ]"/>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label='REGION region'>
      <a-input placeholder="例如：cn-northwest-1 " v-decorator="[
          'region',
          { rules: [{ required: true, message: 'Please input your region!' }] }
        ]"/>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label='空间域名 Domain'>
      <a-input placeholder="例如：https://static.cloud.com " v-decorator="[
          'Domain',
          { rules: [{ required: true, message: 'Please input your Domain!' }] }
        ]"/>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button type='primary' htmlType='submit'>提交</a-button>
    </a-form-item>
  </a-form>
</a-card>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  data() {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 5
          },
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 19
          },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    }
  },
  methods: {
    handleSubmit(e) {
      console.log(e);
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
  },
}
</script>
