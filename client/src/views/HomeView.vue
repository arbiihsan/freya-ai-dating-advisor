<script>
import CardChat from "@/components/CardChat.vue";
import ChatBox from "@/components/ChatBox.vue"

const baseUrl = "http://localhost:3000"

export default {
  name: 'Home',
  components: {
    CardChat,
    ChatBox
  }
}
</script>

<template>
  <div class="container">
    
    <CardChat />
    <ChatBox />
    

  </div>
</template>
