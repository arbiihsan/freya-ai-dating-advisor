<script>
import { mapActions, mapState } from 'pinia';
import { useChatStore } from '../stores/chats';
import Chat from './Chat.vue';

export default {
    data() {
        return {
            question: "",
        };
    },
    computed: {
        ...mapState(useChatStore, ['answer', 'loading', 'wrapper']),
    },
    methods: {
        ...mapActions(useChatStore, ['fetchAnswer']),
        getAnswer() {
            this.fetchAnswer(this.question)
            this.question = ''
        },
    },
    components: { Chat },
}
</script>

<template>
    <div class="lodging-details">
        <h3>Chat Box</h3>
        <div class="chat-display" id="chat-container">
            <!-- <pre>{{ answer }}</pre> -->
            <div v-for="(chat, i) in wrapper" :key="i" class="wrapper" :class="{ ai: chat.isAi }">
                <Chat :chat="chat" :key="i" />
            </div>
        </div>

        <form class="input-container" @submit.prevent="getAnswer">
            <input v-model="question" type="text" id="user-input" placeholder="Ask me anything...">
            <button id="send-button">
                <span class="icon material-symbols-outlined me-2">send</span>
            </button>
        </form>
    </div>
</template>