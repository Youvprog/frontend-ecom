<template>
    <ul class="menu">
        <li v-for="menu in menus" :key="menu.id">
            <button class="button is-white" @click="toggle(menu.id)">
                {{menu.name}}
                <ion-icon name="chevron-down-outline"></ion-icon>
            </button>
            <div class="dropdown" v-show="menu.id === open">
                <div v-for="(item, index) in menu.subMenu" :key="index" @click="open = null">
                    <div class="options" @click="item.funct">
                        <ion-icon :name="item.iconName"></ion-icon>
                        {{item.name}}
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'user-dashboard',
    props: {
        method: {
            type: Function
        },
        showOrders: {
            type: Function
        },
        showUser: {
            type: Function
        },
        showDash:{
            type: Function
        }
    },
    data() {
        return {
            open: null,
            orderOpen: false,
            menus: [
                {
                    id: 1,
                    name: 'My Profile',
                    subMenu: [
                        {name: 'Dashboard', iconName:"desktop-outline", funct: this.showDash}, 
                        {name:'My Profile', iconName:"person-outline", funct: this.showUser}, 
                        {name: 'Logout', iconName:"log-out-outline", funct: this.method}
                    ]
                },
                {
                    id: 2,
                    name: ' My Orders',
                    subMenu: [
                        {name: 'Order', iconName:"bag-check-outline", funct: this.showOrders}
                    ]
                }
            ],
            
        }
    },
    created() {
        window.addEventListener("click", this.close);
    },
    beforeDestroy() {
        window.removeEventListener("click", this.close);
    },
    methods: {
        toggle(id) {
            this.open = this.open === id ? null : id
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
            this.open = false;
            }
        },
    }
}
</script>

<style scoped>
    .menu {
        border-bottom: 1px solid rgb(205, 204, 204);
        display: flex;
        justify-content: center;
    }
    .menu li {
        display: block;
        color: #737779;
    }
    .menu li button:hover {
        background-color: #d7d8da;
        border-radius: 2px;
    }
    .dropdown {
        background-color: white;
        padding: 0.7rem 0;
        display: flex;
        flex-direction: column;
        border: 1px solid rgb(205, 204, 204);
        border-radius: 5px;
        position: absolute;
        gap: 0.5rem;
        box-shadow: 0 7px 7px rgb(159, 158, 158);
    }
    .dropdown div {
        padding: 0 10px;
    }
    .dropdown div:hover {
        background-color: #d7d8da;
    }
    .options {
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;
    }
    ion-icon {
        font-size: 20px;
    }
</style>