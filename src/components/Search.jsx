import React from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { FcSearch } from "react-icons/fc";

class Search extends React.Component {
  render() {
    return (
      <Container className="search-side">
        <div className="d-flex justify-content-between mt-2">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="option1"
            ></input>
            <label className="form-check-label">Món chay</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="option2"
            ></input>
            <label className="form-check-label">Món mặn</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox3"
              value="option3"
            ></input>
            <label className="form-check-label">Món ngọt</label>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-2 ">
          <div className="form-check form-check-inline ">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox4"
              value="option4"
            ></input>
            <label className="form-check-label">Châu Á</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox5"
              value="option5"
            ></input>
            <label className="form-check-label">Châu Âu</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox6"
              value="option6"
            ></input>
            <label className="form-check-label">Châu Mỹ</label>
          </div>
        </div>
        <InputGroup className="mt-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Tìm kiếm</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl placeholder="Tên món ăn" onChange={this.props.onFoodSearch}/>
          <Button variant="info">
            <FcSearch style={{ fontSize: "20pt" }} />
          </Button>
        </InputGroup>
      </Container>
    );
  }
}

export default Search;
