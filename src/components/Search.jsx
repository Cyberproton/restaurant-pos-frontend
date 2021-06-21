import React from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import { FcSearch } from "react-icons/fc";

class Search extends React.Component {
  state = {
    searchString: "",
    selectType: "",
    selectRegions: "",
    selectSort: "",
  };

  handleChange = (event) => {
    // console.log(event.target.value);
    this.setState({ searchString: event.target.value });
    // event.preventDefault();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSearch(this.state.searchString);
  };

  render() {
    return (
      <Container className="search-side">
        <InputGroup className="search-string">
          <FormControl
            name="searchString"
            placeholder="Tìm kiếm món ăn"
            className="search-string-input"
            value={this.state.searchString}
            onChange={this.handleChange}
          />
          <Button variant="info" onClick={this.handleSubmit}>
            <FcSearch style={{ fontSize: "20pt" }} />
          </Button>
        </InputGroup>

        <Dropdown>
          <Dropdown.Toggle
            variant="info"
            id="dropdown1"
            className="select-option"
          >
            Xuất xứ món: {this.state.selectRegions}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                this.setState({ selectRegions: "Châu Á" });
                this.props.handleRegions("Châu Á");
              }}
            >
              Châu Á
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ selectRegions: "Châu Âu" });
                this.props.handleRegions("Châu Âu");
              }}
            >
              Châu Âu
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ selectRegions: "Châu Mỹ" });
                this.props.handleRegions("Châu Mỹ");
              }}
            >
              Châu Mỹ
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ selectRegions: "" });
                this.props.handleRegions("");
              }}
            >
              Không chọn
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle
            variant="warning"
            id="dropdown2"
            className="select-option"
          >
            Loại món ăn: {this.state.selectType}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                this.setState({ selectType: "Món mặn" });
                this.props.handleType("Món mặn");
              }}
            >
              Món mặn
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ selectType: "Món ngọt" });
                this.props.handleType("Món ngọt");
              }}
            >
              Món ngọt
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ selectType: "Món chay" });
                this.props.handleType("Món chay");
              }}
            >
              Món chay
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ selectType: "" });
                this.props.handleType("");
              }}
            >
              Không chọn
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown3"
            className="select-option"
          >
            Sắp xếp theo: {this.state.selectSort}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                this.setState({ selectSort: "Giá giảm dần" });
                this.props.handleSort("Giá giảm dần");
              }}
            >
              Giá giảm dần
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ selectSort: "Giá tăng dần" });
                this.props.handleSort("Giá tăng dần");
              }}
            >
              Giá tăng dần
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.setState({ selectSort: "" });
                this.props.handleSort("");
              }}
            >
              Không chọn
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    );
  }
}

export default Search;
