<script>
import { mapActions, mapState } from 'pinia';
import { useChatStore } from '../stores/chats';
import Chat from './Chat.vue';

export default {
    data() {
        return {
            message: "",
        };
    },
    computed: {
        ...mapState(useChatStore, ['answer', 'loading', 'wrapper', 'messageReceived', 'messageList']),
    },
    methods: {
        ...mapActions(useChatStore, ['fetchAnswer', 'socket', 'sendMessage', 'receiveMessage']),
        // getAnswer() {
        //     this.fetchAnswer(this.question)
        // },
        send() {
            this.sendMessage(this.message)
            this.message = ''
        }
    },
    components: { Chat },
    created() {
        this.socket()
        this.receiveMessage()
    }
}
</script>

<template>
    <div class="lodging-details">
        <h3>Community</h3>
        <div class="chat-community-display" id="chat-container">
            <!-- <pre>{{ messageReceived }}</pre> -->
            <div v-for="(messageContent, index) in messageList" :key="index">
                <div>
                    <div class="message-author">
                        <p id="author">{{ messageContent.author }}</p>
                    </div>
                    <div class="message-content">
                        <p>{{ messageContent.message }}</p>
                    </div>
                </div>
            </div>
            <!-- <div v-for="(chat, i) in wrapper" :key="i" class="wrapper" :class="{ ai: chat.isAi }">
                <Chat :chat="chat" :key="i" />
            </div> -->
        </div>

        <form class="input-container" @submit.prevent="send">
            <input v-model="message" type="text" id="user-input" placeholder="Ask me anything...">
            <button id="send-button">
                <span class="icon material-symbols-outlined me-2">send</span>
            </button>
        </form>
    </div>
</template>