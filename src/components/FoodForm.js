export function FoodForm(prop) {
    return (
        <Form className="form-signin shadow-lg p-3" onSubmit={props.onSubmit}>
          <div className="form-label-group">
            <label htmlFor="inputUsername">Username</label>
            <input
              id="inputUsername"
              name="inputUsername"
              className="form-control"
              value={props.state.username}
              onChange={props.handleInputChange}
              required
            />
          </div>
          <Form.Group>
            <label htmlFor="inputType">Type</label>
            <select
              id="inputType"
              name="inputType"
              className="form-control"
              value={props.state.type}
              onChange={props.handleInputChange}
              required
              defaultValue="-"
            >
              <option value="-" disabled>
                ---
              </option>
              <option value="employee">Employee</option>
              <option value="admin">Administrator</option>
            </select>
          </Form.Group>
    
          <div className="form-label-group">
            <label htmlFor="inputStore">Related store</label>
            <select
              id="inputStore"
              name="inputStore"
              className="form-control"
              defaultValue={props.state.inputStore}
              onChange={props.handleInputChange}
              required
            >
              <option value="-" disabled>
                ---
              </option>
              <StoreList stores={props.state.stores}></StoreList>
            </select>
          </div>
    
          <div className="form-label-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              id="inputPassword"
              name="inputPassword"
              className="form-control"
              value={props.state.password}
              onChange={props.handleInputChange}
              required
            />
          </div>
          <div className="form-label-group">
            <label htmlFor="inputConfirmPassword">Confirm password</label>
            <input
              type="password"
              id="inputConfirmPassword"
              name="inputConfirmPassword"
              className="form-control"
              value={props.state.hashedpassword}
              onChange={props.handleInputChange}
              required
            />
          </div>
          <br />
          <Success success={props.state.success} />
          <Errors errors={props.state.errors} />
          <br />
          <Button className="btn btn-lg btn-green btn-block" type="submit">
            Add this employee
          </Button>
        </Form>
      );
}