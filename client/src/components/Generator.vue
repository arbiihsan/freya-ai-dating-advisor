<script>
import { mapActions, mapState } from 'pinia';
import { useChatStore } from '../stores/chats';
import Chat from './Chat.vue';

export default {
    data() {
        return {
            question: "",
            purpose: "",
            mood: "",
            emotionalImpact: "",
            relationshipStatus: "",
            sendingTo: "",
            sentencesNumber: ""
        };
    },
    computed: {
        ...mapState(useChatStore, ['answer', 'loading', 'wrapper']),
    },
    methods: {
        ...mapActions(useChatStore, ['fetchAnswer', 'socket']),
        getAnswer() {
            this.question = `write a message that is ${this.mood} and makes the person ${this.emotionalImpact}, with the goal of ${this.purpose}. this message is for a ${this.sendingTo} i am ${this.relationshipStatus} with. this should be a short ${this.sentencesNumber} sentences message`
            // console.log(this.question);
            this.fetchAnswer(this.question)
        },
    },
    components: { Chat }
}
</script>

<template>
    <div class="generator-details">
        <h3>Generate Message</h3>
        <form class="message-form" id="chat-container" @submit.prevent="getAnswer">
            <!-- <pre>{{ answer }}</pre> -->
            <!-- <div v-for="(chat, i) in wrapper" :key="i" class="wrapper" :class="{ ai: chat.isAi }">
                <Chat :chat="chat" :key="i" />
            </div> -->
            <label for="">Purpose</label>
            <input v-model="purpose" class="form-input" type="text"
                placeholder="E.g. Asking someone for a date on Saturday night">

            <label for="">Mood</label>
            <select v-model="mood" class="form-select" name="" id="">
                <option value="Lighthearted">Lighthearted</option>
                <option value="Playful">Playful</option>
                <option value="Romantic">Romantic</option>
                <option value="Sweet">Sweet</option>
                <option value="Sincere">Sincere</option>
                <option value="Caring">Caring</option>
            </select>

            <label for="">Emotional Impact</label>
            <select v-model="emotionalImpact" class="form-select" name="" id="">
                <option value="Make them feel appreciated">Make them feel appreciated</option>
                <option value="Make them feel admired">Make them feel admired</option>
                <option value="Make them feel curious">Make them feel curious</option>
                <option value="Make them feel happy">Make them feel happy</option>
                <option value="Make them laugh">Make them laugh</option>
                <option value="Make them excited">Make them excited</option>
            </select>

            <label for="">Relationship Status</label>
            <select v-model="relationshipStatus" class="form-select" name="" id="">
                <option value="Committed Relationship">Committed Relationship</option>
                <option value="Had few dates in the past">Had few dates in the past</option>
                <option value="Actively Dating">Actively Dating</option>
                <option value="Recently Met">Recently Met</option>
                <option value="Married">Married</option>
            </select>

            <div>
                <div class="form-group-inner">
                    <div class="form-group-half">
                        <label for="">Sending to a...</label>
                        <select v-model="sendingTo" class="form-select" name="" id="">
                            <option value="Woman">Woman</option>
                            <option value="Man">Man</option>
                        </select>
                    </div>

                    <div class="form-group-half">
                        <label for="">Number of sentences</label>
                        <select v-model="sentencesNumber" class="form-select" name="" id="">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="button-message-form">
                <button type="submit" class="form-message-button">Create Message</button>
            </div>
        </form>
        <div class="message-results" id="chat-container">
            {{ answer }}
        </div>

        <!-- <form class="input-container" @submit.prevent="getAnswer">
            <input v-model="question" type="text" id="user-input" placeholder="Ask me anything...">
            <button id="send-button">
                <span class="icon material-symbols-outlined me-2">send</span>
            </button>
        </form> -->
    </div>
</template>