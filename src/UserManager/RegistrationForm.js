import React, { Component } from "react";
import { Dropdown } from "./Components/Dropdown";
import { Head } from "./Components/Head";
import { TextField } from "./Components/TextField";
import { addUser, updateUser } from "../redux/actions/UserManagerActions";
import { connect } from "react-redux";

class RegistrationForm extends Component {
    state = {
        values: {
            account: "",
            name: "",
            password: "",
            phone: "",
            email: "",
            userType: 1
        },
        errors: {
            account: "",
            name: "",
            password: "",
            phone: "",
            email: "",
        },
    };

    handleChangeValue = (event) => {
        let { value, name, type } = event.target;
        let newValues = { ...this.state.values, [name]: value };
        let newErrors = { ...this.state.errors };
        if (value.trim() === "") {
            newErrors[name] = name + " is required";
        } else {
            newErrors[name] = "";
        }
        this.setState({
            values: newValues,
            errors: newErrors,
        });
        if (type === "email") {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            regex.test(String(value).toLowerCase())
                ? (newErrors[name] = "")
                : (newErrors[name] = "Email is not valid");
        }
        if (type === "tel") {
            const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            regex.test(value)
                ? (newErrors[name] = "")
                : (newErrors[name] = "Phone number is not valid");
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let { values, errors: errorsUpdate } = this.state;
        let valid = true;
        for (let key in values) {
            if (values[key].trim() === "") {
                valid = false;
                errorsUpdate[key] = key + " is valid";
            }
        }
        for (let key in errorsUpdate) {
            if (errorsUpdate[key].trim() !== "") {
                valid = false;
            }
        }
        let index = this.props.userList.findIndex(
            (user) => user.account === this.state.values.account
        );
        if (index !== -1) {
            valid = false;
            errorsUpdate["account"] = "account is already existed!";
        }
        if (!valid) {
            this.setState({
                errors: errorsUpdate,
            });
        } else {
            let newUser = {
                id: Date.now(),
                ...values,
                userType: this.state.userType,
            };
            this.props.dispatch(addUser(newUser));
            return;
        }
    };

    render() {
        return (
            <div className="container-fluid mb-5 p-0">
                <form
                    onSubmit={this.handleSubmit}
                    style={{ border: "1px solid black", paddingBottom: "20px" }}
                >
                    <Head>Form đăng ký</Head>
                    <div className="row">
                        <div className="col-6 px-5 mb-3">
                            <TextField
                                onChange={this.handleChangeValue}
                                name="account"
                                label="Tải Khoản *"
                                error={this.state.errors.account}
                                type="text"
                                value={this.state.values.account}
                            />
                        </div>
                        <div className="col-6 px-5 mb-3">
                            <TextField
                                onChange={this.handleChangeValue}
                                name="name"
                                label="Họ tên *"
                                error={this.state.errors.name}
                                type="text"
                                value={this.state.values.name}
                            />
                        </div>
                        <div className="col-6 px-5 mb-3">
                            <TextField
                                onChange={this.handleChangeValue}
                                name="password"
                                label="Mật khẩu *"
                                error={this.state.errors.password}
                                type="password"
                                value={this.state.values.password}
                            />
                        </div>
                        <div className="col-6 px-5 mb-3">
                            <TextField
                                onChange={this.handleChangeValue}
                                name="phone"
                                label="Số điện thoại *"
                                error={this.state.errors.phone}
                                type="tel"
                                value={this.state.values.phone}
                            />
                        </div>
                        <div className="col-6 px-5 mb-3">
                            <TextField
                                onChange={this.handleChangeValue}
                                name="email"
                                label="Email *"
                                error={this.state.errors.email}
                                type="email"
                                value={this.state.values.email}
                            />
                        </div>
                        <div className="col-6 px-5 mb-3">
                            <Dropdown
                                onChange={(e) => {
                                    this.setState({
                                        values:{...this.state.values, userType: parseInt(e.target.value)},
                                    }, () => {console.log(this.state)});
                                }}
                                label="Loại người dùng"
                                value={this.state.values.userType}
                            >
                                <option value="1">Khách hàng</option>
                                <option value="2">Admin</option>
                            </Dropdown>
                        </div>
                    </div>
                    <button className="ms-4 btn btn-success me-2">
                        Đăng ký
                    </button>
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => {
                            let { values } = this.state;
                            let valuesUpdate = { ...this.state.values };
                            for (let key in valuesUpdate) {
                                valuesUpdate[key] = "";
                            }
                            console.log('value ', {...valuesUpdate})
                            Object.assign(this.state.values, valuesUpdate);
                            console.log('state values', this.state.values);
                            this.setState(
                                {
                                    // values: {...values.updateUser}
                                    // values: {...Object.assign(this.state.values, valuesUpdate)},
                                },
                                () => {
                                    this.props.dispatch(updateUser(values));
                                }
                            );
                        }}
                    >
                        Cập nhật
                    </button>
                </form>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.userEdit.id !== this.state.values.id) {
            this.setState({
                values: this.props.userEdit,
            });
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userList: state.UserManagerReducer.userList,
        userEdit: state.UserManagerReducer.userEdit,
    };
};

export default connect(mapStateToProps)(RegistrationForm);
