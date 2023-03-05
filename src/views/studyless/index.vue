<template>
    <div class="container">
        <div class="box">
            <div></div>
        </div>
        <p class="calc"></p>
        <div class="element">test</div>
        <div class="button"></div>
        <div id="page">
            <div id="header">123123</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'studyless',
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
<style lang="less" scoped>
@width: 100px;
@height: @width + 200px;
@base: 50%;
@var: 50vw;
@min768: ~'(min-width: 768px)';
@var: red;

#colors() {
    primary: blue;
    secondary: green;
}

.bordered {
    border-top: dotted 1px black;
    border-bottom: solid 2px black;
}

.container {
    .box {
        width: @width;
        height: @height;
        background: yellowgreen;
        .bordered();

        div {
            width: @base;
            height: @base;
            background: red;
        }
    }

    .calc {
        width: calc(50% + (@var - 20px));
        height: 200px;
        background: blue;
    }

    .element {
        @media @min768 {
            font-size: 1.2rem;
        }
    }

    .button {
        display: inline-block;
        width: 100px;
        height: 50px;
        color: #colors[primary];
        border: 1px solid #colors[secondary];
    }

    #page {
        @var: blue;
        #header {
            color: @var; // white
        }
    }
}
</style>
