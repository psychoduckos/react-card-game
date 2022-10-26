import {makeAutoObservable} from "mobx";

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }
    userList = [];
    leader = {};

    initUser(users) {
        this.userList = users
    }

    initLeader(user) {
        this.userList = user
    }

}

export default new UserStore()
