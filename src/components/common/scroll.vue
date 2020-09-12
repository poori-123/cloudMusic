<template>
    <div class="scroll-box" ref="scroll_box">
        <div class="scroll-wrap">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        scrollX: {
            type: Boolean,
            default: false
        }
    },
    mounted(){
        var scroll = new IScroll(this.$refs.scroll_box,{
            click: true,
            tap: true,
            scrollX: this.scrollX,
            scrollY: !this.scrollX
        });
        scroll.on('beforeScrollStart' , () => {
            scroll.refresh();
        })
    }
}
</script>

<style>

</style>