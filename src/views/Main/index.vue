<template>
    <div>主页</div>
</template>
<script>

    
export default {
    beforeRouteLeave (to, from, next) {
        sessionStorage.removeItem('uname')
        next();
    }
}
</script>
<style scoped>

</style>