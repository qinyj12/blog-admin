<template>
    <div class="editor-container">
        <div id="vditor"></div>
    </div>
</template>
<script>
import Vditor from "vditor";
import "vditor/dist/index.css";
import { uploadIllustration } from '@/api/article'
export default {
    data() {
        return {
            contentEditor: '',
        };
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
            cache: {
                enable: false
            },
            icon: "ant",
            preview: {
                delay: 1000, // 延时预览
                actions: [] // 分屏预览时的菜单栏，保持为空
            },
            upload: {
                accept: 'image/*,.mp3, .wav, .rar',
                token: 'test',
                max: 5 * 1024 * 1024,
                url: '/hhh',
                // linkToImgUrl: 'https://sm.ms/api/upload',
                handler(file) {
                    that.uploadFunc(file)
                },
            },
            after: () => {
                this.contentEditor.setValue("hello, Vditor + Vue!");
            }
        });
    },
    methods: {
        uploadFunc(file) {
            alert(1)
            return {
                "msg": "",  
                "code": 0,  
                "data": {  
                    "errFiles": ['filename', 'filename2'],  
                    "succMap": {  
                        "filename3": "filepath3",  
                        "filename3": "filepath3"  
                    }
                }
            }
            // const formData = new FormData()
            // formData.append('illustration', file[0])
            // uploadIllustration(formData).then(resp => {
            //     // console.log(resp)
            // })
        }
    }
};
</script>

<style lang="scss" scoped>
.editor-container {
    margin: 30px;
    display: flex;
    justify-content: center;
}
</style>
