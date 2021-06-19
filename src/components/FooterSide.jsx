import React, { Component } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Button, Container, Row, Col, Footer } from "react-bootstrap";


class FooterSide extends Component {
  render() {
    const iconStyle = {
      color: "white",
      fontSize: "17pt",
    };

    return (
      <footer className="container-fluid text-light p-0" style={{ backgroundColor: "#212529" }}>
        <hr />
        <Container className="d-flex justify-content-center mt-3">
          <h3 style={{ 
            textShadow: "1px 1px 2px black, 0 0 1em rgb(229, 255, 0), 0 0 0.2em rgb(100, 109, 20)",
            color: "white",
           }}>
             POS System - Restaurant
          </h3>
        </Container>
        <hr />
        <div className="container-fluid">
          <div className="row">
            <div className="col p-0">
              <ul style={{ listStyle: "none" }} className="px-4">
                <li>Bach Khoa Univesity</li>
                <li>Oppen from 8am to 17pm </li>
                <li>Oppen from 8am to 17pm </li>
              </ul>
            </div>
            <div className="col p-0">
              <ul style={{ listStyle: "none" }} className="px-4">
                <li>Bach Khoa Univesity</li>
                <li>Oppen from 8am to 17pm </li>
                <li>Oppen from 8am to 17pm </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="container-fluid text-dark" style={{ backgroundColor: "rgb(207, 132, 20)" }}>
          <div className="row p-2">
            <div className="col d-flex justify-content-center" style={iconStyle}>
              <AiFillFacebook className="icon-item"/>
            </div>
            <div className="col d-flex justify-content-center" style={iconStyle}>
              <AiFillInstagram className="icon-item" />
            </div>
            <div className="col d-flex justify-content-center" style={iconStyle}>
              <AiFillYoutube className="icon-item"/>
            </div>
            <div className="col d-flex justify-content-center" style={iconStyle}>
              <AiOutlineTwitter className="icon-item"/>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default FooterSide;
