import React, { Component } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

class FooterSide extends Component {
  render() {
    return (
      <footer className="footer-side">
        <h2>POS System - Restaurant</h2>
        <hr />
        <div className="d-flex">
          <div className="p-2 w-80">
            <ul>
              <li>Bach Khoa Univesity</li>
              <li>Oppen from 8am to 17pm </li>
              <li>Oppen from 8am to 17pm </li>
            </ul>
          </div>
          <div className="p-2 flex-shrink-1">
            <ul>
              <li>Bach Khoa Univesity</li>
              <li>Oppen from 8am to 17pm </li>
              <li>Oppen from 8am to 17pm </li>
            </ul>
          </div>
        </div>
        <div className="icon">
          <AiFillFacebook className="icon-item" />
          <AiFillInstagram className="icon-item" />
          <AiFillYoutube className="icon-item" />
          <AiOutlineTwitter className="icon-item" />
        </div>
      </footer>
    );
  }
}

export default FooterSide;
