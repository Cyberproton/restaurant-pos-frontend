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
        <ul>
          <li>Bach Khoa Univesity - Restaurant POS</li>
          <li>Giờ mở cửa : từ 8h sáng đến 10h tối</li>
          <li>Phục vụ vào tất cả các ngày trong tuần</li>
          <li>Cập nhật các món mới hằng tháng</li>
          <br />
          <li>Tiêu chuẩn: 5 sao</li>
          <li>Địa chỉ: 123 Trần Văn A - TP Hồ Chí Minh</li>
          <li>Liên hệ: 0123456789</li>
          <li>Email: email@gmail.com.vn</li>
        </ul>
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
