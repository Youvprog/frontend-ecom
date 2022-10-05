<template>
    <div class="container">
        <login-modal/>
    </div>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue';

    export default {
        name: 'Login',
        components: {
            LoginModal
        }
}

</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;
    }
</style>