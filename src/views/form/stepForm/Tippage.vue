<template>
<a-modal title="编辑" :width="800" :visible="visible" :confirmLoading="confirmLoading" @ok="handleOk" @cancel="handleCancel">
  <a-spin :spinning="confirmLoading">
    <a-form :form="form">

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='标题' hasFeedback>
        <a-input placeholder='' v-decorator="[ 'title', {rules: [{ required: true, message: 'title' }]} ]" />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='发布人' hasFeedback>
        <a-input placeholder='' v-decorator="[ 'name', {rules: [{ required: true, message: '不起一个名字吗？' }] }]" />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='关键字' hasFeedback>
        <a-input placeholder='' v-decorator="[ 'keyword', {rules: [{ required: true, message: 'keyword' }] }]" />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='内容' hasFeedback>
        <quill-editor ref="textEditor" v-model="content" :option="editorOption" v-decorator="[ 'content', {rules: [{ required: true, message: 'content' }] }]"></quill-editor>
        <!-- 富文本资料https://blog.csdn.net/senmage/article/details/82388728 -->
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='相册' hasFeedback>
        <div class="clearfix">
          <a-upload action="//jsonplaceholder.typicode.com/posts/" listType="picture-card" :fileList="fileList" @preview="handlePreviewPic" @change="handleChangePic">
            <div v-if="fileList.length < 3">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelPic">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='文件上传' hasFeedback>
        <a-upload action="//jsonplaceholder.typicode.com/posts/" directory>
          <a-button>
            <a-icon type="upload" /> Upload Directory
          </a-button>
        </a-upload>
      </a-form-item>


    </a-form>
  </a-spin>
</a-modal>
</template>

<script>
import {
  getPermissions
} from '@/api/manage'
import {
  actionToObject
} from '@/utils/permissions'
import pick from 'lodash.pick'
import {
  quillEditor
} from 'vue-quill-editor' // 导入quillEditor组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'RoleModal',
  components: {
    quillEditor
  },
  data() {
    return {
      // 图片
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],

      content: '', // 编辑器的内容
      editorOption: { // 编辑器的配置
        // something config
      },

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
          span: 16
        },
      },
      visible: false,
      confirmLoading: false,
      mdl: {},

      form: this.$form.createForm(this),
      permissions: []
    }
  },
  created() {
    this.loadPermissions()
  },
  methods: {
    add() {
      this.edit({
        id: 0
      })
    },
    edit(record) {
      // console.log(record);
      this.mdl = Object.assign({}, record)
      this.visible = true

      // 有权限表，处理勾选
      if (this.mdl.permissions && this.permissions) {
        // 先处理要勾选的权限结构
        const permissionsAction = {}
        this.mdl.permissions.forEach(permission => {
          permissionsAction[permission.permissionId] = permission.actionEntitySet.map(entity => entity.action)
        })
        // 把权限表遍历一遍，设定要勾选的权限 action
        this.permissions.forEach(permission => {
          permission.selected = permissionsAction[permission.id]
        })
      }

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'id', 'name', 'status', 'describe'))
      })
      console.log('this.mdl', this.mdl)

    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
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
    handleCancel() {
      this.close()
    },
    onChangeCheck(permission) {
      permission.indeterminate = !!permission.selected.length && (permission.selected.length < permission.actionsOptions.length)
      permission.checkedAll = permission.selected.length === permission.actionsOptions.length
    },
    onChangeCheckAll(e, permission) {
      Object.assign(permission, {
        selected: e.target.checked ? permission.actionsOptions.map(obj => obj.value) : [],
        indeterminate: false,
        checkedAll: e.target.checked
      })
    },
    loadPermissions() {
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
    },

    // 图片上传
    handleCancelPic() {
      this.previewVisible = false
    },
    handlePreviewPic(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChangePic({
      fileList
    }) {
      this.fileList = fileList
    },


  }
}
</script>

<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
