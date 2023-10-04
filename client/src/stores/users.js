import { defineStore } from "pinia"
import axios from "axios"
import router from '../router'
import Swal from 'sweetalert2'

const baseUrl = "https://freya-server.arbiihsan.xyz"

export const useUserStore = defineStore('users', {
    state: () => {
        return {
            isLogged: '' || localStorage.getItem("access_token") ? true : false,
            currentUser: '' || localStorage.getItem("username")
        }
    },
    actions: {
        async login(payload) {
            try {
                // console.log(payload);
                const { data } = await axios({
                    method: "POST",
                    url: `${baseUrl}/login`,
                    data: payload,
                });
                const { access_token, username } = data;
                // console.log(username, '<<<<');
                localStorage.setItem("access_token", access_token);
                localStorage.setItem("username", username)
                this.currentUser = username
                this.isLogged = true
                router.push("/");
                this.showLoginAlert();
            } catch (err) {
                console.log(err);
                this.showLoginError(err.response.data.message)
            }
        },
        async register(payload) {
            try {
                console.log(payload, '<<<< di stores');
                const { data } = await axios({
                    method: "POST",
                    url: `${baseUrl}/register`,
                    data: payload,
                });
                router.push("/signin")
                this.showRegisterAlert()
            } catch (err) {
                console.log(err);
                this.showLoginError(err.response.data.message)
            }
        },
        logout() {
            localStorage.clear();
            this.isLogged = false
            this.showLogoutAlert()
        },
        async googleLogin(response) {
            try {
                const { data } = await axios({
                    method: "POST",
                    url: `${baseUrl}/glogin`,
                    headers: {
                        google_token: response.credential
                    },
                })

                const { access_token, username } = data;
                // console.log(username, '<<<<');
                
                localStorage.setItem("access_token", access_token);
                localStorage.setItem("username", username)

                this.currentUser = username

                this.isLogged = true
                router.push('/')
                this.showLoginAlert();
            } catch (err) {
                console.log(err);
                this.showLoginError(err.response.data.message)
            }
        },
        showLoginAlert() {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            })
        },
        showLogoutAlert() {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Signed out successfully'
            })
        },
        showRegisterAlert() {
            Swal.fire({
                icon: 'success',
                title: 'Your Account Has Been Created',
            })
        },
        showLoginError(message) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: message
            })
        },
    },
})