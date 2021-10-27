<template>
  <div class="m-add-edit-addr module">
    <el-dialog
      class="m-dialog"
      width="660px"
      :title="title"
      :visible.sync="dialogVisible"
    >
      <div class="m-content">
        <el-form :model="addParams" ref="addParams" :rules="rules">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item prop="receiverName">
                <el-input v-model="addParams.receiverName" placeholder="姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="receiverMobile">
                <el-input v-model="addParams.receiverMobile" placeholder="手机号"></el-input>
              </el-form-item>            
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-form-item prop="receiverAddresses">
              <el-col :span="8">
                <el-cascader v-model="addParams.receiverAddresses" :options="options" @change="handleChange" clearable></el-cascader>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row :gutter="10">
            <el-form-item prop="receiverAddress">
              <el-col :span="24">
                <el-input
                  v-model="addParams.receiverAddress"
                  type="textarea"
                >
                </el-input>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row :gutter="10">
            <el-form-item prop="receiverZip">
              <el-col :span="8">
                <el-input v-model="addParams.receiverZip" placeholder="邮编"></el-input>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
        <span class="m-footer dialog-footer">
          <button class="m-footer__button" @click="handleSubmit">确 定</button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '新增地址',
      dialogVisible: false,
      addParams: {
        id: 0,
        receiverName: '',
        receiverMobile: '',
        receiverProvince: '',
        receiverCity: '',
        receiverDistrict: '',
        receiverAddress: '',
        receiverZip: '',
        receiverAddresses: [],
        receiverAddrText: ''
      },
      options: 
      [
        {
          value: '北京',
          label: '北京',
          children: [{
            value: '北京',
            label: '北京',
            children: [{
              value: '昌平区',
              label: '昌平区'
            }]
          }]
        },
        {
          value: '天津',
          label: '天津',
          children: [{
            value: '天津',
            label: '天津',
            children: [{
              value: '海淀区',
              label: '海淀区'
            },
            {
              value: '房山区',
              label: '房山区'
            }]
          }]
        },
        {
          value: '河北',
          label: '河北',
          children: [{
            value: '石家庄',
            label: '石家庄',
            children: [{
              value: '东城区',
              label: '东城区'
            },
            {
              value: '顺义区',
              label: '顺义区'
            }]
          }]
        }
      ],
      rules: {
        receiverName: [
          { required: true, message: '请输入收货人', trigger: 'blur' },
        ],
        receiverMobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
        ],
        receiverAddresses: [{ type:'array', required: true, message: '请选择地区', trigger: 'change' },],
        receiverAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
        receiverZip: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' },
        ],
      },
      isAdd: true,
    }
  },
  name: 'add-edit-addr',
  components: {
  },
  methods: {
    handleOpen(addr) {
      this.dialogVisible = true;
      if (addr) {
        this.addParams.id = addr.id;
        this.addParams.receiverName = addr.receiverName;
        this.addParams.receiverMobile = addr.receiverMobile;
        this.addParams.receiverProvince = addr.receiverProvince;
        this.addParams.receiverCity = addr.receiverCity;
        this.addParams.receiverDistrict = addr.receiverDistrict;
        this.addParams.receiverAddresses = [addr.receiverProvince || '', addr.receiverCity || '', addr.receiverDistrict || ''];
        this.addParams.receiverAddress = addr.receiverAddress;
        this.addParams.receiverZip = addr.receiverZip;
        this.$forceUpdate();
        this.isAdd = false;
      }
    },

    async handleSubmit() {
      const isValid = await this.$refs.addParams.validate();
      if (isValid) {
        const params = {
          receiverName: this.addParams.receiverName,
          receiverMobile: this.addParams.receiverMobile,
          receiverProvince: this.addParams.receiverProvince,
          receiverCity: this.addParams.receiverCity,
          receiverDistrict: this.addParams.receiverDistrict,
          receiverAddress: this.addParams.receiverAddress,
          receiverZip: this.addParams.receiverZip,
        }
        if (this.isAdd) {
          this.axios.post('/shippings', params).then((res) => {
            if (res?.status === 0) {
              this.$message.success(res.msg);
              this.$emit('refresh');
            } else {
              this.$message.error('新增地址失败');
            }
          });
        } else {
          this.axios.put(`/shippings/${this.addParams.id}`, params).then((res) => {
            if (res?.status === 0) {
              this.$message.success(res.data);
              this.$emit('refresh');
            } else {
              this.$message.error('修改地址失败');
            }
          });
        }
        this.dialogVisible = false;
      }
    },
    
    handleChange(value) {
      if (value.length === 3) {
        this.addParams.receiverProvince = value[0];
        this.addParams.receiverCity = value[1];
        this.addParams.receiverDistrict = value[2];
        this.addParams.receiverAddrText = value.join(' ');
      }
    }
  },

}
</script>

<style lang="scss" scoped>
.m-add-edit-addr.module {
  .m {
    &-dialog {
      ::v-deep {
        &.el-dialog__title {
          font-size: 16px;
          background-color: #f5f5f5;
        }

        &.el-dialog__header {
          background-color: #f5f5f5;
        }
      }
    }

    &-content {
      padding-bottom: 82px;
    }

    &-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 82px;
      line-height: 82px;
      background-color: #f5f5f5;
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;

      &__button {
        display: inline-block;
        width: 110px;
        height: 30px;
        text-align: center;
        background-color: #f60;
        color: #fff;
        border: none;
        cursor: pointer;
      }
    }
  }
}
</style>