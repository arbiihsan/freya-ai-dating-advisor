<template>
    <div class="side-card-list" id="chat-container">
        <button class="detail-bookmark-button" @click.prevent="doClear"><span class="icon material-symbols-outlined me-2">note_stack_add</span> New Chat Room</button>
        <div class="chat-card-section" @click.prevent="getDiscovery">
            <h2>Self-Discovery</h2>
            <p class="card-description" >Understand yourself better, identify your values, interests, and goals, which will guide you in finding compatible partners.</p>
        </div>
        <div class="chat-card-section" @click.prevent="getBuilding">
            <h2>Building Connections</h2>
            <p class="card-description" >Teach techniques to establish emotional connections, share stories, and show genuine interest in your date's life..</p>
        </div>
        <div class="chat-card-section" @click.prevent="getFirst">
            <h2>First Impressions</h2>
            <p class="card-description" > Offer guidance on dressing appropriately, choosing suitable venues, and displaying confident body language on dates.</p>
        </div>
        <div class="chat-card-section" @click.prevent="getNavigating">
            <h2>Navigating Online Dating</h2>
            <p class="card-description" > Provide tips on selecting the right dating apps/sites, crafting engaging messages, and recognizing red flags.</p>
        </div>
        <div class="chat-card-section" @click.prevent="getDatingEtiquette">
            <h2>Dating Etiquette</h2>
            <p class="card-description" > Educate about proper dating etiquette, including punctuality, gratitude, and respectful behavior towards your date.</p>
        </div>
        <div class="chat-card-section" @click.prevent="getProfileEnhance">
            <h2>Profile Enhancement</h2>
            <p class="card-description" > Create an appealing and authentic online dating profile that showcases your personality and interests while highlighting your best qualities.</p>
        </div>
        <div class="chat-card-section" @click.prevent="getConflictRes">
            <h2>Conflict Resolution</h2>
            <p class="card-description" > Provide strategies to address conflicts and disagreements in a healthy and respectful manner, promoting open communication.</p>
        </div>
        <div class="chat-card-section" @click.prevent="getEmbraceReject">
            <h2>Embracing Rejection</h2>
            <p class="card-description" > Help cope with rejection positively, learning from experiences, and using them as stepping stones toward future success.</p>
        </div>
        
    </div>
</template>
    
<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
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
        // ...mapWritableState(useChatStore, [''])
    },
    methods: {
        ...mapActions(useChatStore, ['fetchAnswer', 'clearMessage']),
        getAnswer() {
            this.fetchAnswer(this.question)
        },
        getDiscovery() {
            this.fetchAnswer('how to Understand yourself better, identify your values, interests, and goals, which will guide you in finding compatible partners.')
        },
        getBuilding() {
            this.fetchAnswer("Teach me techniques on how to establish emotional connections, share stories, and show genuine interest in your date's life..")
        },
        getFirst() {
            this.fetchAnswer(`Offer me a guidance on how to dressing appropriately, choosing suitable venues, and displaying confident body language on dates.`)
        },
        getNavigating() {
            this.fetchAnswer(`Provide me some tips on selecting the right dating apps/sites, crafting engaging messages, and recognizing red flags.`)
        },
        getDatingEtiquette() {
            this.fetchAnswer(`Educate me about proper dating etiquette, including punctuality, gratitude, and respectful behavior towards your date.`)
        },
        getProfileEnhance() {
            this.fetchAnswer(`how to create an appealing and authentic online dating profile that showcases your personality and interests while highlighting your best qualities.`)
        },
        getConflictRes() {
            this.fetchAnswer(`Provide me strategies to address conflicts and disagreements in a healthy and respectful manner, promoting open communication.`)
        },
        getEmbraceReject() {
            this.fetchAnswer(`Help me cope with rejection positively, learning from experiences, and using them as stepping stones toward future success.`)
        },
        doClear() {
            this.clearMessage()
        }
    },
    components: { Chat },
}
</script>