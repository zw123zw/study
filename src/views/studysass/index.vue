<template>
    <div class="container">
        <div class="title">标题</div>
        <div class="container-tip">提示</div>
        <div class="container-content">这里是内容</div>
        <div class="container-text">
            <span>文本</span>
            <p class="container-text-wrap">文本标题</p>
        </div>
        <div class="foo">import导入scss文件测试</div>
        <div class="foo2">
            <a href="javascript:;">继承title与foo的样式</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Study',
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
    beforeDestroy() {},
    destroyed() {},
};
</script>
<style lang="scss" scoped>
/* 
css注释
容器样式
*/

@import 'foo.scss', 'foo1.scss';

$left: left;
$right: right;
$color-default: red;
$color-bg-primty: #09fb48;
$margin-normal: 10px 20px 30px 40px;
$box-shadow-normal: 1px 5px 10px red, 1px -5px 10px greenyellow;
$font15: 15px;
$font5: 5px;
$text-name: wrap;

.container {
    text-align: $left;

    .title {
        color: $color-default;
        margin: $margin-normal;
        box-shadow: $box-shadow-normal;

        &:hover {
            background: $color-bg-primty;
        }
    }

    &-tip {
        text-align: $right;
        font-size: 20px;
    }

    &-content {
        font: {
            size: 24px;
            weight: 600;
        }
    }

    &-text {
        font-size: $font15 + $font5;
        width: 10em + (3em * 3);

        &::after {
            content: 'test' + hhh;
            font-family: sans + '-serif';
        }

        &::before {
            content: 'I are #{1 + 1} ge shen';
        }

        &-#{$text-name} {
            color: #ff05d5;
        }
    }

    .foo2 {
        @extend .title;
        @extend .foo;
    }
}
</style>
