<template>
<a-form @submit="handleSubmit" :form="form">
  <a-card title="短信通知(阿里云短信)">
    <a-form-item v-bind="formItemLayout" label='AccessKeyId'>
      <a-input v-decorator="[
          'AccessKeyId',
          { rules: [{ required: true, message: 'Please input your AccessKeyId!' }] }
        ]" />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label='AccessKeySecret'>
      <a-input v-decorator="[
          'AccessKeySecret',
          { rules: [{ required: true, message: 'Please input your AccessKeySecret!' }] }
        ]" />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label='短信签名'>
      <a-input v-decorator="[
          'msg',
          { rules: [{ required: true, message: 'Please input your msg!' }] }
        ]" />
    </a-form-item>
  </a-card>
  <a-card title="短信通知" style="margin-top: 20px;">
    <a-form-item v-bind="formItemLayout" label='是否开启短信息提醒'>
      <a-radio-group name="radioGroup" :defaultValue="1">
        <a-radio :value="1">开启</a-radio>
        <a-radio :value="2">关闭</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label='模板ID Template Code'>
      <a-input placeholder="例如：cn-northwest-1 " v-decorator="[
          'Template',
          { rules: [{ required: true, message: 'Please input your Template!' }] }
        ]" />
        <span>例如：SMS_139800030 </span>
        <span style="display: block">模板内容：您有一条新订单，订单号为：${order_no}，请注意查看。</span>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label='接收手机号'>
      <a-input placeholder="例如：https://static.cloud.com " v-decorator="[
          'phone',
          { rules: [{ required: true, message: 'Please input your phone!' }] }
        ]" />
        接受测试: <a href="javascript:;">点击发送</a>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button type='primary' htmlType='submit'>提交</a-button>
    </a-form-item>
  </a-card>
</a-form>
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
