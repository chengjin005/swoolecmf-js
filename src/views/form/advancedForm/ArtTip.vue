<template>
  <a-modal
    title="编辑分类"
    :width="450"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='分类名'
          hasFeedback
        >
          <a-input placeholder='' v-decorator="[ 'id', {rules: []} ]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { getPermissions } from '@/api/manage'
  import { actionToObject } from '@/utils/permissions'
  import pick from 'lodash.pick'

  export default {
    name: 'RoleModal',
    data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        visible: false,
        confirmLoading: false,
        mdl: {},

        form: this.$form.createForm(this),
        permissions: []
      }
    },
    created () {
      this.loadPermissions()
    },
    methods: {
      add () {
        this.edit({ id: 0 })
      },
      edit (record) {
        this.mdl = Object.assign({}, record)
        this.visible = true

        // this.$nextTick(() => {
        //   this.form.setFieldsValue(pick(this.mdl, 'id', 'name', 'status', 'describe'))
        // })
        console.log('this.mdl', this.mdl)

      },
      close () {
        this.$emit('close')
        this.visible = false
      },
      handleOk () {
        const _this = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          // 验证表单没错误
          if (!err) {
            console.log('form values', values)

            _this.confirmLoading = true
            // 模拟后端请求 2000 毫秒延迟
            new Promise((resolve) => {
              setTimeout(() => resolve(), 2000)
            }).then(() => {
              // Do something
              _this.$message.success('保存成功')
              _this.$emit('ok')
            }).catch(() => {
              // Do something
            }).finally(() => {
              _this.confirmLoading = false
              _this.close()
            })
          }
        })
      },
      handleCancel () {
        this.close()
      },
      onChangeCheck (permission) {
        permission.indeterminate = !!permission.selected.length && (permission.selected.length < permission.actionsOptions.length)
        permission.checkedAll = permission.selected.length === permission.actionsOptions.length
      },
      onChangeCheckAll (e, permission) {
        Object.assign(permission, {
          selected: e.target.checked ? permission.actionsOptions.map(obj => obj.value) : [],
          indeterminate: false,
          checkedAll: e.target.checked
        })
      },
      loadPermissions () {
        getPermissions().then(res => {
          const result = res.result
          this.permissions = result.map(permission => {
            const options = actionToObject(permission.actionData)
            permission.checkedAll = false
            permission.selected = []
            permission.indeterminate = false
            permission.actionsOptions = options.map(option => {
              return {
                label: option.describe,
                value: option.action
              }
            })
            return permission
          })
        })
      }

    }
  }
</script>

<style scoped>

</style>
