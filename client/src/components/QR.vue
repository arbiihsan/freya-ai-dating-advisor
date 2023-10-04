<script>
import { mapActions, mapState } from 'pinia';
import { useChatStore } from '../stores/chats';

export default {
    data() {
        return {
        };
    },
    computed: {
        ...mapState(useChatStore, ['qrCode']),
    },
    methods: {
        ...mapActions(useChatStore, ['generateQr']),
    },
    created() {
        this.generateQr()
        console.log(this.qrCode, '<<<<<di QR');
    }
}
</script>

<template>
    <!-- <div class="generator-details">
        <h3>Share This App!</h3>
        <div v-html="qrCode"></div>

        
    </div> -->
    <div class="side-info">

        <div class="side-info-qr">
            <h3>Share This Lodging!</h3>
            <div v-html="qrCode"></div>
        </div>

    </div>
</template>