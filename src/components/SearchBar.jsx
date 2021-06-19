import { InputGroup, FormControl, Button } from "react-bootstrap";
import { FcSearch } from "react-icons/fc";

export default function SearchBar(props) {
    return (
      <InputGroup className="mt-3">
        <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">Tìm kiếm</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl placeholder="Tên món ăn" onChange={props.onChange}/>
        <Button variant="info">
        <FcSearch style={{ fontSize: "20pt" }} />
        </Button>
      </InputGroup>
    );
}