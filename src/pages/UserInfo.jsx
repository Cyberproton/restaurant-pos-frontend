import React, { Component } from "react";
import { Container, Row, Col, Button, Form, Toast } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { FaUserEdit, FaLock, FaSignOutAlt } from 'react-icons/fa'
import { checkLogin, formatDate, getDate } from "../untils/functions";
import axios from "../axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.toggleProfileEditor = this.toggleProfileEditor.bind(this);
    this.exitProfileEditor = this.exitProfileEditor.bind(this);
    this.togglePasswordEditor = this.togglePasswordEditor.bind(this);
    this.exitPasswordEditor = this.exitPasswordEditor.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.dateInputChange = this.dateInputChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  state = {
    user: {},
    userForm: {},
    currentPassword: null,
    newPassword: null,
    rePassword: null,
    isEditingProfile: false,
    isEditingPassword: false,
    showError: false,
    errorMessage: "",
    showErrorPassword: false,
    errorMessagePassword: "",
    showSuccess: false,
    successMessage: "",
    showSuccessPassword: false,
    successMessagePassword: "",
    requireLogin: false,
  };

  componentDidMount() {
    if (!checkLogin()) {
      return;
    }

    axios
      .get("/api/user")
      .then(res => {
        const user = res.data;
        if (!user) {
          return;
        }
        this.setState({
          user: user,
          userForm: Object.assign({}, user)
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  handleLogout() {
    localStorage.removeItem("token");
    this.setState({
      requireLogin: true
    });
  }

  clearInputs() {
    document.getElementById("input-current-password").value = "";
    document.getElementById("input-new-password").value = "";
    document.getElementById("input-repassword").value = "";
  }

  updateProfile() {
    if (!checkLogin()) {
      this.setState({
        requireLogin: true
      });
    }

    const userForm = this.state.userForm;
    const body = {};
    const fullname = userForm.fullname;
    if (fullname != null) {
      body.fullname = fullname.trim();
    }
    const phonenumber = userForm.phonenumber;
    if (phonenumber != null) {
      body.phonenumber = phonenumber.trim();
    }
    const birthday = userForm.birthday;
    if (birthday != null) {
      body.birthday = birthday.trim();
    }
    const address = userForm.address;
    if (address != null) {
      body.address = address.trim();
    }

    axios
      .put("/api/user/profile", body)
      .then(res => {
        const newUser = res.data.user;
        console.log(newUser);
        this.setState({
          user: newUser,
          userForm: Object.assign({}, newUser),
          showSuccess: true,
          successMessage: "Th??ng tin c???a b???n ???? ???????c c???p nh???t",
          isEditingProfile: false,
          isEditingPassword: false,
          currentPassword: null,
          newPassword: null,
          rePassword: null,
        });
        this.clearInputs();
      })
      .catch(err => {
        const message = err.response ? err.response.data.message : "";
        this.setState({
          showError: true,
          errorMessage: message,
          currentPassword: null,
          newPassword: null,
          rePassword: null,
        })
        this.clearInputs();
      })
  }

  updatePassword() {
    if (!checkLogin()) {
      this.setState({
        requireLogin: true
      });
    }

    const currentPassword = this.state.currentPassword;
    const newPassword = this.state.newPassword;
    const rePassword = this.state.rePassword;

    if (!currentPassword || !currentPassword.match(".{6,}")) {
      this.setState({
        currentPassword: null,
        newPassword: null,
        rePassword: null,
        showErrorPassword: true,
        errorMessagePassword: "M???t kh???u hi???n t???i kh??ng h???p l???, ph???i c?? t??? 6 k?? t??? tr??? l??n"
      });
      this.clearInputs();
      return;
    }

    if (!newPassword || !newPassword.match(".{6,}")) {
      this.setState({
        currentPassword: null,
        newPassword: null,
        rePassword: null,
        showErrorPassword: true,
        errorMessagePassword: "M???t kh???u m???i kh??ng h???p l???, ph???i c?? t??? 6 k?? t??? tr??? l??n"
      });
      this.clearInputs();
      return;
    }

    if (rePassword !== newPassword) {
      this.setState({
        currentPassword: null,
        newPassword: null,
        rePassword: null,
        showErrorPassword: true,
        errorMessagePassword: "Vui l??ng x??c nh???n l???i m???t kh???u"
      });
      this.clearInputs();
      return;
    }

    axios
      .put("/api/user/password", {
        currentPassword: currentPassword,
        newPassword: newPassword,
        rePassword: rePassword,
      })
      .then(res => {
        const newUser = res.data.user;
        if (!newUser) {
          return;
        }
        this.setState({
          user: newUser,
          userForm: Object.assign({}, newUser),
          showSuccessPassword: true,
          successMessagePassword: "M???t kh???u c???a b???n ???? ???????c c???p nh???t",
          isEditingPassword: false,
          currentPassword: null,
          newPassword: null,
          rePassword: null,
        });
        this.clearInputs();
      })
      .catch(err => {
        let message = err.response ? err.response.data.message : "";
        if (message.includes("Current password")) {
          message = "M???t kh???u hi???n t???i kh??ng ????ng";
        } else if (message.includes("New password")) {
          message = "M???t kh???u m???i v?? nh???p l???i m???t kh???u kh??ng tr??ng";
        }
        this.setState({
          showErrorPassword: true,
          errorMessagePassword: message,
          currentPassword: null,
          newPassword: null,
          rePassword: null,
        })
        this.clearInputs();
      });

    this.clearInputs();
  }

  inputChange(event, key) {
    const userForm = this.state.userForm;
    userForm[key] = event.target.value;
    this.setState(prev => ({
      userForm: userForm
    }));
  }

  dateInputChange(date) {
    const userForm = this.state.userForm;
    userForm.birthday = formatDate(date);

    this.setState({
      userForm: userForm
    });
  }

  toggleProfileEditor(event) {
    event.preventDefault();
    this.setState(prev => ({
      isEditingProfile: !prev.isEditingProfile
    }));
  }

  exitProfileEditor(event) {
    event.preventDefault();
    const d1 = document.getElementById("phonenumber-input");
    d1.value = d1.defaultValue;
    const d2 = document.getElementById("fullname-input");
    d2.value = d2.defaultValue;
    const d3 = document.getElementById("address-input");
    d3.value = d3.defaultValue;
    this.setState(prev => ({
      isEditingProfile: false,
      userForm: Object.assign({}, prev.user)
    }));
  }

  togglePasswordEditor(event) {
    event.preventDefault();
    this.setState(prev => ({
      isEditingPassword: !prev.isEditingPassword
    }));
  }

  exitPasswordEditor(event) {
    event.preventDefault();
    this.setState(prev => ({
      isEditingPassword: false,
      currentPassword: null,
      newPassword: null,
      rePassword: null
    }));
    this.clearInputs();
  }

  render() {
    if (!checkLogin()) {
      return <Redirect to="/login"/>
    }

    const user = this.state.user;
    const userForm = this.state.userForm;
    const username = user.fullname ? user.fullname.trim() ? user.fullname : user.username : user.username;
    const title = username ? (
      <Container className="mb-3 d-flex justify-content-center">
          <h3>Xin ch??o {username}</h3>
      </Container>
    ) : (
      undefined
    );

    const editProfileButton = !this.state.isEditingProfile ? (
      <Button 
        variant="warning" 
        onClick={this.toggleProfileEditor}
      >
        S???a ?????i th??ng tin
      </Button>
    ) : (
      <Button 
        variant="danger" 
        onClick={this.exitProfileEditor}
      >
        H???y thay ?????i
      </Button>
    );

    const saveProfileButton = !this.state.isEditingProfile ? (
      <Button 
        variant="primary"
        disabled="true"
      >
        L??u thay ?????i
      </Button>
    ) : (
      <Button 
        variant="primary"
        onClick={this.updateProfile}
      >
        L??u thay ?????i
      </Button>
    );

    const editPasswordButton = !this.state.isEditingPassword ? (
      <Button 
        variant="warning" 
        onClick={this.togglePasswordEditor}
      >
        S???a m???t kh???u
      </Button>
    ) : (
      <Button 
        variant="danger" 
        onClick={this.exitPasswordEditor}
      >
        H???y thay ?????i
      </Button>
    );

    const savePasswordButton = !this.state.isEditingPassword ? (
      <Button 
        variant="primary"
        disabled="true"
      >
        L??u thay ?????i
      </Button>
    ) : (
      <Button 
        variant="primary"
        onClick={this.updatePassword}
      >
        L??u thay ?????i
      </Button>
    );

    const toastSuccess = (
      <Toast show={this.state.showSuccess} onClose={() => { this.setState({ showSuccess: false, successMessage: "" }) }} delay="5000" autohide style={{ minWidth: "100%" }} className="bg-primary text-light">
        <Toast.Header className="bg-primary text-light">
            <h5 className="mr-auto">Th??nh c??ng</h5>
        </Toast.Header>
        <Toast.Body>
            {this.state.successMessage}
        </Toast.Body>
      </Toast>
    );

    const toastSuccessPassword = (
      <Toast show={this.state.showSuccessPassword} onClose={() => { this.setState({ showSuccessPassword: false, successMessagePassword: "" }) }} delay="5000" autohide style={{ minWidth: "100%" }} className="bg-primary text-light">
        <Toast.Header className="bg-primary text-light">
            <h5 className="mr-auto">Th??nh c??ng</h5>
        </Toast.Header>
        <Toast.Body>
            {this.state.successMessagePassword}
        </Toast.Body>
      </Toast>
    );

    const toastError = (
      <Toast show={this.state.showError} onClose={() => { this.setState({ showError: false, errorMessage: "" }) }} delay="5000" autohide style={{ minWidth: "100%" }} className="bg-danger text-light">
        <Toast.Header className="bg-danger text-light">
            <h5 className="mr-auto">C?? l???i x???y ra</h5>
        </Toast.Header>
        <Toast.Body>
            Chi ti???t: {this.state.errorMessage}
        </Toast.Body>
      </Toast>
    );

    const toastErrorPassword = (
      <Toast show={this.state.showErrorPassword} onClose={() => { this.setState({ showErrorPassword: false, errorMessagePassword: "" }) }} delay="5000" autohide style={{ minWidth: "100%" }} className="bg-danger text-light">
        <Toast.Header className="bg-danger text-light">
            <h5 className="mr-auto">C?? l???i x???y ra</h5>
        </Toast.Header>
        <Toast.Body>
            Chi ti???t: {this.state.errorMessagePassword}
        </Toast.Body>
      </Toast>
    );

    return (
      <Container className="mt-5">
        <Container className="mb-3">
          {toastSuccess}
          {toastError}
        </Container>
        { title }
        <hr style={{ border: "1px solid grey" }}/>
        <Container>
          <Row className="my-3">
            <Col>
              <h5><FaUserEdit/> Th??ng tin c???a b???n</h5>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>T??n ????ng nh???p:</Col>
            <Col>
              <input defaultValue={user.username} disabled/>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>H??? v?? T??n:</Col>
            <Col>
              <input 
                id="fullname-input"
                defaultValue={user.fullname} 
                onChange={(e) => this.inputChange(e, "fullname")}
                disabled={!this.state.isEditingProfile}
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col>S??? ??i???n tho???i:</Col>
            <Col>
              <input 
                id="phonenumber-input"
                defaultValue={user.phonenumber} 
                type="number"
                onChange={(e) => this.inputChange(e, "phonenumber")}
                disabled={!this.state.isEditingProfile}/>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>Ng??y sinh:</Col>
            <Col>
              <ReactDatePicker 
                selected={getDate(userForm.birthday)} 
                onChange={(date) => this.dateInputChange(date)}
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                disabled={!this.state.isEditingProfile}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col>?????a ch???:</Col>
            <Col>
              <input 
                id="address-input"
                defaultValue={user.address} 
                onChange={(e) => this.inputChange(e, "address")}
                disabled={!this.state.isEditingProfile}
              />
            </Col>
          </Row>
          <Row className="mt-5 mb-3">
            <Col className="d-flex justify-content-around">
              {editProfileButton}
            </Col>
            <Col className="d-flex justify-content-around">
              {saveProfileButton}
            </Col>
          </Row>
          <hr/>
          <Container className="mb-3">
            {toastSuccessPassword}
            {toastErrorPassword}
          </Container>
          <Row className="my-3">
            <Col>
              <h5><FaLock/> ?????i m???t kh???u</h5>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>M???t kh???u hi???n t???i:</Col>
            <Col>
              <input 
                id="input-current-password"
                type="password" 
                disabled={!this.state.isEditingPassword}
                onChange={(e) => { 
                  this.setState({ currentPassword: e.target.value })
                }}
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col>Nh???p m???t kh???u m???i:</Col>
            <Col>
              <input 
                id="input-new-password"
                type="password" 
                disabled={!this.state.isEditingPassword}
                onChange={(e) => { 
                  this.setState({ newPassword: e.target.value })
                }}
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col>Nh???p l???i m???t kh???u:</Col>
            <Col>
              <input 
                id="input-repassword"
                type="password" 
                disabled={!this.state.isEditingPassword}
                onChange={(e) => { 
                  this.setState({ rePassword: e.target.value })
                }}
              />
            </Col>
          </Row>
          <Row className="mt-5 mb-5">
            <Col className="d-flex justify-content-around">
              {editPasswordButton}
            </Col>
            <Col className="d-flex justify-content-around">
              {savePasswordButton}
            </Col>
          </Row>

          <hr/>
          <Row className="my-3">
            <Col>
              <h5><FaSignOutAlt/> ????ng xu???t</h5>
            </Col>
          </Row>
          <Row className="my-3 d-flex justify-content-center">
            <Button variant="danger" block onClick={this.handleLogout} style={{ width: "70%" }}>????ng xu???t</Button>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default UserInfo;
