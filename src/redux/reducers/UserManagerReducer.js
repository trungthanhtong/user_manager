import { add_user, delete_user, edit_user, update_user } from "../types/UserManagerTypes"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    userList: [
        {id:'01', account: 'acc', name: 'name', password: 'pw', phone: '01', email: 'trungthanhtong@gmail.com', userType: 1},
        {id:'02', account: 'acc2', name: 'name2', password: 'pw2', phone: '02', email: '2@gmail.com', userType: 2}
    ],
    userEdit: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case add_user: {
            let userListUpdate = [...state.userList];
            userListUpdate.push(action.user)
            return {...state, userList: userListUpdate}
        }

        case delete_user: {
            return {...state, userList: state.userList.filter(user => user.account !== action.account)}
        }

        case edit_user: {
            return {...state, userEdit: action.user}
        }

        case update_user: {
            state.userEdit = {...action.user}
            let userListUpdate = [...state.userList];
            let index = userListUpdate.findIndex(user => user.id === action.user.id);
            if (index !== -1) {
                userListUpdate[index] = {...action.user}
            }
            return {...state, userList: [...userListUpdate]}
        }

    default:
        return {...state}
    }
}
