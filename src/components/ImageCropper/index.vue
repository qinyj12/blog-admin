<template>
    <div class="image-cropper-container">
        <!-- element 上传图片按钮 -->
        <el-upload
            class="upload-demo"
            action=""
            drag
            :auto-upload="false"
            :show-file-list="false"
            :on-change="changeUpload"
        >
            <img v-if="imageCutInside" :src="imageCutInside" class="image-cut"> <!--这个显示剪裁好以后的图片-->
            <div class="el-upload-icon-text">
                <i class="el-icon-upload" />
                <div class="el-upload__text">点击上传</div>
                <!-- <div class="el-upload__tip">最大5MB</div> -->
            </div>

        </el-upload>

        <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
            <div class="cropper-content">
                <div class="cropper" style="text-align:center">
                    <vueCropper
                        ref="cropper"
                        :img="option.img"
                        :outputSize="option.size"
                        :outputType="option.outputType"
                        :info="true"
                        :full="option.full"
                        :canMove="option.canMove"
                        :canMoveBox="option.canMoveBox"
                        :original="option.original"
                        :autoCrop="option.autoCrop"
                        :autoCropWidth="option.autoCropWidth"
                        :autoCropHeight="option.autoCropHeight"
                        :fixedBox="option.fixedBox"
                    >
                    </vueCropper>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" :loading="loading" @click="finish">确 认</el-button>
            </div>
        </el-dialog>

        <div>
            <el-button @click="ConfirmImage" :disabled="HideUpdateIco" class="confirm-button">确认上传</el-button>
        </div>
    </div>
</template>
<script>
// 引入vuex
import store from '@/store'
// // 引入上传头像的接口
// import { uploadAvatar } from '@/api/user'
export default {
    data() {
        return {
            dialogVisible: false,
            // 裁剪组件的基础配置option
            option: {
                img: '', // 裁剪图片的地址
                info: true, // 裁剪框的大小信息
                size: 0.8, // 裁剪生成图片的质量
                outputType: 'jpeg', // 裁剪生成图片的格式
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                autoCropWidth: this.CropWidth, // 默认生成截图框宽度
                autoCropHeight: this.CropHeight, // 默认生成截图框高度
                fixedBox: true, // 固定截图框大小 不允许改变
                fixed: true, // 是否开启截图框宽高固定比例
                fixedNumber: [7, 5], // 截图框的宽高比例
                full: true, // 是否输出原图比例的截图
                canMoveBox: false, // 截图框能否拖动
                original: false, // 上传图片按照原始比例渲染
                centerBox: false, // 截图框是否被限制在图片里面
                infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            },
            picsList: [], // 页面显示的数组
            // 防止重复提交
            loading: false,
            // vue2.0中props只能从外向内单向改变，子组件内部无法改变，所以用额外的变量来储存props的值
            imageCutInside: '',
            imageCutForAPI: '', // 已经剪裁好的图片，用于传送到后端
            HideUpdateIco: true, // 隐藏确认上传的按钮
            ImgUrlReturned: '' // 传送img到后端保存后，后端返回的img的url
        }
    },
    // 这是截图框的宽高，从父元素传值。
    // props:['CropWidth', 'CropHeight', 'UploadFunc'],
    props: {
        // 定义组件的大小
        CropWidth: String,
        CropHeight: String,
        // 接收父组件传来的后端接口，调用这个后端接口，上传图片
        UploadFunc: {
            // 如果父组件没有传值，调用初始值
            default() {
                return function() {
                    alert('没有定义上传函数')
                }
            }
        },
        // 定义在裁剪框中显示的图像，接收外部的值，来制造初始图像
        imageCutOutside: {
            type: String,
            default: ''
        },
        // 确定给数据库的哪条记录做修改
        TargetId: {
            type: String,
            default: ''
        }
    },
    watch: {
        // 由于imageCutOutside定义在prop中，只能从外部单向改变，不能从子组件内部改变
        // 所以创造imageCutInside变量，并且实时监控外部传值imageCutOutside的变化进行改变
        imageCutOutside() {
            this.imageCutInside = this.imageCutOutside
        }
    },
    methods: {
        // 上传按钮   限制图片大小
        changeUpload(file, fileList) {
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                this.$message.error('上传文件大小不能超过 5MB!')
                return false
            }
            this.fileinfo = file
            // 获取的是blob对象
            const url = URL.createObjectURL(file.raw)

            // 上传成功后将图片地址赋值给裁剪框显示图片
            this.$nextTick(() => {
                this.option.img = url
                this.dialogVisible = true
                console.log('上传图片完成')
                console.log(this.option.img)
            })
        },
        // 点击裁剪，这一步是可以拿到处理后的地址
        finish() {
            this.$refs.cropper.getCropBlob((data) => {
                console.log('拿到裁剪后的图片')
                console.log(data)
                // var fileName = "goods" + this.fileinfo.uid
                this.dialogVisible = false
                this.imageCutInside = URL.createObjectURL(data) // 把剪裁好的图片放在上传框里
                this.imageCutForAPI = data // 把data赋值给imageCutForAPI，用于传送给后端
                this.HideUpdateIco = false // 显示“确认上传”的按钮
            })
        },
        // 上传到服务器
        uploadHeadUrl_c(file) {
            console.log('调用上传服务器')
            console.log('targetid是')
            console.log(this.TargetId)
            const formData = new FormData()
            // 上传剪切后的图像
            formData.append('img', file, 'img.png') // 用img来确定修改成什么头像/封面（及剪切后的图像）
            // 加入'img.png'参数，完全是为了欺骗flask-uploads库，因为如果不加的话，flask-uploads库会默认前端传来的blob格式的图片保存名字为'blob'，没有后缀，这是不科学的，所以flask-uploads无法通过
            formData.append('id', this.TargetId) // 用id来确定给数据库的哪条记录做修改
            // UploadFunc定义的api是在父组件中定义的
            console.log('cropper组件接受到的uploadfunc是')
            console.log(this.UploadFunc)
            this.UploadFunc(formData).then(response => {
                // 把后端返回的img url赋值给imgUrlReturned，然后传送到父组件
                this.ImgUrlReturned = response.data
                this.SendImgUrlToParent(this.ImgUrlReturned)
                // 更新token
                this.$store.dispatch('user/updateToken')
            })
            // 释放内存
            window.URL.revokeObjectURL(file)
        },
        // 调整剪切框、剪切后的图片等元素的大小
        CropperSize(size) {
            document.querySelector('.image-cropper-container').style.setProperty('--CropWidth', size.width)
            document.querySelector('.image-cropper-container').style.setProperty('--CropHeight', size.height)
        },
        // 确认上传裁剪后的图片
        ConfirmImage() {
            // 上传图片
            this.uploadHeadUrl_c(this.imageCutForAPI)
            this.$message({
                showClose: true,
                message: '成功调用ConfirmImage函数，但没有验证后端返回结果',
                type: 'success'
            });
            // 清除imageCut
            // this.imageCutInside = ''
        },
        // 把img url传参给父组件
        SendImgUrlToParent(data) {
            this.$emit('getImgUrl', data)
        }
    },
    mounted() {
        // 动态设置cropper的宽和高
        this.CropperSize({width: this.CropWidth, height: this.CropHeight})
    },
    // cropper组件销毁，vuex的状态清除，这样才能CroppedImageInStore函数才能每次都生效
    destroyed() {
        // this.$store.dispatch('cropper/CropImage', '')
    },
}
</script>
<style lang="scss">
$CropWidth: var(--CropWidth);
$CropHeight: var(--CropHeight);

.image-cropper-container {
    width: $CropWidth;
}

// 这是头像修改框
.el-upload-dragger {
    width: $CropWidth;
    height: $CropHeight;
    box-sizing: border-box;
}

// 这是选择要剪切的图片后，跳出来的选择框里图片的大小
.cropper {
    width: auto;
    height: 300px;
}

// 这是剪切完成后的图片
.image-cut {
    width: $CropWidth;
    height: $CropHeight;
}

// 实现相对父元素居右
.confirm-button {
    display:flex;
    flex:1;
    margin-left:auto;
    margin-top: 10px;
}

// 这是图标和文字
.el-upload-icon-text {
    padding: 0 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .el-icon-upload {
        margin: 0px;
    }

    .el-upload__text {
        margin-top: 5px;
    }
}

</style>
