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
            userType: 1,
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
        let { values } = this.state;
        console.log('state', this.state);
        let errorsUpdate = {...this.state.errors}
        let valid = true;
        console.log('value', values)
        for (let key in values) {
            if (values[key].toString().trim() === "") {
                valid = false;
                errorsUpdate[key] = key + " is valid";
            } else {
                errorsUpdate[key] = '';
            }
        }
        for (let key in errorsUpdate) {
            if (errorsUpdate[key].toString().trim() !== "") {
                valid = false;
            }
        }
        let index = this.props.userList.findIndex(
            (user) => user.account === this.state.values.account
        );
        if (index !== -1) {
            valid = false;

            errorsUpdate["account"] = "account is already existed!";
        } else {
            errorsUpdate["account"] = '';
        }
        if (!valid) {
            this.setState({
                errors: {...errorsUpdate},
            });
        } else {
            let newUser = {
                id: Date.now(),
                ...values,
            };
            let updatedValues = { ...this.state.values };
            for (let key in updatedValues) {
                updatedValues[key] = "";
            }
            this.setState(
                {
                    values: { ...updatedValues, userType: 1 },
                    
                },
                () => {
                    this.props.dispatch(addUser(newUser));
                }
            );
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
                                        values: {
                                            ...this.state.values,
                                            userType: parseInt(e.target.value),
                                        },
                                    });
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
                    {this.props.disabled ? (
                        <button
                            disabled
                            className="btn btn-primary"
                            type="button"
                        >
                            Cập nhật
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => {
                                let currentValues = { ...this.state.values };
                                let updatedValues = { ...this.state.values };
                                let updatedErrors = { ...this.state.errors };
                                for (let key in updatedValues) {
                                    updatedValues[key] = "";
                                }
                                for (let key in updatedErrors) {
                                    updatedErrors[key] = "";
                                }
                                this.setState(
                                    {
                                        values: { ...updatedValues },
                                        // values: {
                                        //     ...Object.assign(
                                        //         this.state.values,
                                        //         updatedValues
                                        //     ),
                                        // },
                                        errors: {
                                            ...Object.assign(
                                                this.state.errors,
                                                updatedErrors
                                            ),
                                        },
                                    },
                                    () => {
                                        this.props.dispatch(
                                            updateUser(currentValues)
                                        );
                                    }
                                );
                            }}
                        >
                            Cập nhật
                        </button>
                    )}
                </form>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.userEdit.id !== prevProps.userEdit.id) {
            this.setState({
                values: { ...this.props.userEdit },
            });
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userList: state.UserManagerReducer.userList,
        userEdit: state.UserManagerReducer.userEdit,
        disabled: state.UserManagerReducer.disableButton,
    };
};

export default connect(mapStateToProps)(RegistrationForm);
