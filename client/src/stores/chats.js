import { defineStore } from "pinia"
import axios from "axios"
import router from '../router'
import Swal from 'sweetalert2'
import { io } from "socket.io-client";

const baseUrl = "https://freya-server.arbiihsan.xyz"

const socket = io.connect("https://freya-server.arbiihsan.xyz")

export const useChatStore = defineStore('chats', {
    state: () => {
        return {
            //openai
            answer: '',
            loading: false,
            wrapper: [],
            qrCode: {},
            urlQrCode: '',
            //socket.io
            messageReceived: '',

            currentMessage: "",
            messageList: [],
            username: '' || localStorage.getItem("username"),


            // messages: [], 
            // message: '',
            // username: '',
            // state: 0
        }
    },

    actions: {
        async fetchAnswer(question) {
            try {
                this.loading = true
                console.log(question, '<<<<<di stores');
                this.wrapper.push({
                    isAi: false,
                    value: question
                })

                this.wrapper.push({
                    isAi: true,
                    value: 'Loading...'
                })

                const res = await fetch('https://freya-server.arbiihsan.xyz/fetch-answer', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        access_token: localStorage.getItem("access_token")
                    },
                    body: JSON.stringify({
                        question: question
                    })
                })
                // console.log(res, '<<<di storeeee');
                const data = await res.json()
                // console.log(data);
                this.answer = data.answer.content
                console.log(this.answer, '<<<di stores');
                this.wrapper.pop()
                this.wrapper.push({
                    isAi: true,
                    value: this.answer
                })
                // console.log(this.wrapper[1], '<<<<wrapper');
                // console.log(JSON.parse(JSON.stringify(this.wrapper)));
            } catch (err) {
                console.log(err);
            }
            // finally {
            //     this.loading = false
            // }
        },
        async generateQr() {
            // console.log('MASUKKK');
            this.urlQrCode = "https://freya-777.web.app/signin"
            const qr_code_text = this.urlQrCode
            console.log(qr_code_text, '<<<<<DI STOREEE');
            try {
                const { data } = await axios({
                    method: "POST",
                    url: `${baseUrl}/generate-qr`,
                    data: { qr_code_text }
                })
                console.log(data, "<<<<<ININININI");
                this.qrCode = data
            } catch (err) {
                console.log(err);
            }
        },
        async socket() {
            // console.log('<<<MASUKKKK');
            socket.on("connect", () => console.log('socket connected!'))
        },
        async sendMessage(message) {
            this.currentMessage = message
            if (this.currentMessage !== "") {
                const messageData = {
                    author: this.username,
                    message: this.currentMessage,
                    // time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                };

                socket.emit("send_message", messageData);
                this.messageList.push(messageData);
                this.currentMessage = "";
            }
        },
        // async sendMessage(message) {
        //     // console.log("<<<<INNNN");
        //     socket.emit("send_message", { message: message })
        // },
        async receiveMessage() {
            socket.on("receive_message", (data) => {
                // alert(data.message)
                this.messageReceived = data
                this.messageList.push(this.messageReceived);
            })
        },
        clearMessage() {
            this.messageList = []
        }
    },
})