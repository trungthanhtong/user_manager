import React, { Component } from "react";
import { Head } from "./Components/Head";
import { connect } from "react-redux";
import { deleteUser, editUser } from "../redux/actions/UserManagerActions";

const userType = ["Khách hàng", "Admin"];

class UsersList extends Component {
    render() {
        return (
            <div>
                <Head>Danh sách người dùng</Head>
                <table className="table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tài khoản</th>
                            <th>Họ tên</th>
                            <th>Mật khẩu</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Loại người dùng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.userList.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.account}</td>
                                    <td>{user.name}</td>
                                    <td>{user.password}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{userType[user.userType - 1]}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary me-1"
                                            onClick={() => {
                                                this.props.dispatch(
                                                    editUser(user)
                                                );
                                            }}
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                this.props.dispatch(
                                                    deleteUser(user.account)
                                                );
                                            }}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userList: state.UserManagerReducer.userList,
    };
};

export default connect(mapStateToProps)(UsersList);
