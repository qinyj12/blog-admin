<template>
    <div class="editor-container">
        <div id="vditor"></div>
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
        };
    },
    props: {
        contentValueFromFather: {
            default: 'hello world!'
        }
    },
    computed: {
        // 判断前端传来的值，如果前端传来的是不是null，如果是null，代表前端无意修改content，而是要求采用子组件默认的content
        contentValueInThisPage() {
            // 如果父组件传过来有效值
            if (this.contentValueFromFather) {
                // 那就把这个值赋给contentValueFromFather
                return this.contentValueFromFather
            // 如果父组件没有传过来有效值
            } else {
                // 那就contentValueFromFather = hello world!
                return 'hello world!'
            }
        }
    },
    methods: {
        onMarkdown(it) {
            let lute = Lute.New();
            const result = lute.MarkdownStr("", it);
            return result
            // document.getElementById('output').innerHTML = result;
            // console.log(lute.HTML2Md(result))
        }
    },
    mounted() {
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
            value: this.contentValueInThisPage,
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
