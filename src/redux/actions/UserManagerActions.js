import { add_user, delete_user, edit_user, update_user } from "../types/UserManagerTypes";

export const addUser = (user) => ({
    type: add_user,
    user,
})

export const deleteUser = account => ({
    type: delete_user,
    account,
})

export const editUser = user => ({
    type: edit_user,
    user
})

export const updateUser = user => ({
    type: update_user,
    user
})