<template>
    <div class="editor-container">
        <div id="vditor"></div>
        <button @click="demo">123</button>
    </div>
</template>
<script>
import Vditor from "vditor";
import "vditor/dist/index.css";
import { uploadIllustrationUrl } from '@/api/article'

require('../../api/lute')
export default {
    data() {
        return {
            contentEditor: '',
            demovalue: '',
            defaultValue: 'hello world!'
        };
    },
    props: {
        setDefaultValue: {
            type: Function,
            default: function() {
                return {value: this.defaultValue}
            }
        }
    },
    methods: {
        demo() {
            console.log(this.contentEditor.vditor)
        },
        // 做一个接收父组件信号的函数，当父组件准备完毕后，才开始生成vditor编辑器，以此来接收父组件设置的content
        receiveSignalFromFather() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(console.log('父组件接收完毕！'))
                }, 2000);
            })
        },
        createVditor() {
            console.log('creating Vditor')
            let that = this
            this.contentEditor = new Vditor("vditor", {
                height: 360,
                width: "100%",
                toolbarConfig: {
                    pin: true
                },
                toolbar: [
                    "emoji",
                    "headings",
                    "bold",
                    "italic",
                    "strike",
                    "link",
                    "|",
                    "list",
                    "ordered-list",
                    "check",
                    "outdent",
                    "indent",
                    "|",
                    "quote",
                    "line",
                    "code",
                    "inline-code",
                    // "insert-before",
                    // "insert-after",
                    "|",
                    "upload",
                    // "record",
                    "table",
                    "|",
                    "undo",
                    "redo",
                    "|",
                    "fullscreen",
                    "edit-mode",
                    {
                        name: "more",
                        toolbar: [
                            "both",
                            "code-theme",
                            "content-theme",
                            "export",
                            "outline",
                            "preview",
                            "devtools",
                            "info",
                            "help"
                        ]
                    }
                ],
                value: that.defaultValue,
                cache: {
                    enable: false
                },
                icon: "ant",
                preview: {
                    delay: 1000, // 延时预览
                    actions: [] // 分屏预览时的菜单栏，保持为空
                },
                upload: { // 上传的选项
                    accept: 'image/*,.mp3, .wav, .rar', 
                    token: 'test', // 头为 X-Upload-Token
                    max: 5 * 1024 * 1024,
                    url: uploadIllustrationUrl(), // 上传的url接口
                    multiple: false, // 是否上传多个文件
                    fieldName: 'illustration', // formdata里面的字段名称
                    // linkToImgUrl: 'https://sm.ms/api/upload',
                },
                input(value) {
                    // console.log(value)
                    // that.demovalue = value
                    that.demovalue = that.onMarkdown(value)
                }
            });
        },
        onMarkdown(it) {
            let lute = Lute.New();
            const result = lute.MarkdownStr("", it);
            return result
            // document.getElementById('output').innerHTML = result;
            // console.log(lute.HTML2Md(result))
        }
    },
    async mounted() {
        let getFatherValue = await this.setDefaultValue()
        this.defaultValue = getFatherValue.value
        this.createVditor()        
    },
    
};
</script>

<style lang="scss" scoped>
.editor-container {
    margin: 30px 0;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .button-area {
        padding: 10px 0;
        display: flex;
        justify-content: flex-end;
    }
}
</style>
