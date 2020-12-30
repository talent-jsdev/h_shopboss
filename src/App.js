import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./App.css";

function App() {
  const [pNameForAdd, setPNameForAdd] = React.useState("");
  const [paramNames, setParamNames] = React.useState([]);
  const [paramValues, setParamValues] = React.useState([]);
  const [appName, setAppName] = React.useState("");
  const [returnUrl, setReturnUrl] = React.useState("");

  const prefix = "https://shopvinscan.com/";
  const addParam = () => {
    if (pNameForAdd == "") {
      alert("This parameter name is empty!");
    } else {
      if (paramNames.indexOf(pNameForAdd) > -1) {
        alert("This parameter name is existed!");
      } else {
        let names = paramNames.map((name) => name);
        names.push(pNameForAdd);
        let values = paramValues.map((name) => name);
        values.push("");
        setParamNames(names);
        setParamValues(values);
      }
      setPNameForAdd("");
    }
  };

  const handlePNameForAddChange = (e) => {
    setPNameForAdd(e.target.value);
  };

  const removeParam = (index) => {
    let names = paramNames.map((name) => name);
    names.splice(index, 1);
    let values = paramValues.map((name) => name);
    values.splice(index, 1);
    setParamNames(names);
    setParamValues(values);
  };

  const handleParamChange = (e, index) => {
    let values = paramValues.map((name) => name);
    values[index] = e.target.value;
    setParamValues(values);
  };

  const changeAppName = (e) => {
    setAppName(e.target.value);
  };

  const changeReturnUrl = (e) => {
    setReturnUrl(e.target.value);
  };

  const handleRun = () => {
    let res = prefix;
    res += "?appName=" + appName;
    res += "&returnUrl=" + returnUrl;
    paramNames.forEach((pName, index) => {
      res += "&" + pName + "=" + paramValues[index];
    });
    window.location.replace(res);
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
            <h1 className="text-center mt-5 mb-3">Test Vinscanner</h1>
            <Form>
              <Form.Group as={Row} controlId="appName">
                <Form.Label column sm="3">
                  App Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="App Name"
                    onChange={changeAppName}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="returnUrl">
                <Form.Label column sm="3">
                  Return Url
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Return Url"
                    onChange={changeReturnUrl}
                  />
                </Col>
              </Form.Group>
              <div className="param_wrapper">
                <h5>Additional Parameters</h5>
                <Form.Group as={Row} controlId="paramName">
                  <Form.Label column sm="3">
                    Param Name
                  </Form.Label>
                  <Col xs={8} sm="6">
                    <Form.Control
                      type="text"
                      placeholder="Param Name"
                      value={pNameForAdd}
                      onChange={handlePNameForAddChange}
                    />
                  </Col>
                  <Col xs={4} sm={3}>
                    <input
                      type="button"
                      className="btn btn-info add_param"
                      value="Add"
                      onClick={addParam}
                    />
                  </Col>
                </Form.Group>
                <hr />
                <div>
                  {paramNames.map((pName, index) => {
                    return (
                      <Form.Group key={index} as={Row} controlId={pName}>
                        <Form.Label column sm="3">
                          {pName}
                        </Form.Label>
                        <Col xs={8} sm="6">
                          <Form.Control
                            type="text"
                            placeholder={pName}
                            value={paramValues[index]}
                            onChange={(e) => handleParamChange(e, index)}
                          />
                        </Col>
                        <Col xs={4} sm={3}>
                          <input
                            type="button"
                            className="btn btn-danger"
                            value="Remove"
                            onClick={() => {
                              removeParam(index);
                            }}
                          />
                        </Col>
                      </Form.Group>
                    );
                  })}
                </div>
              </div>
            </Form>
            <div className="text-center mt-4">
              <input
                type="button"
                value="Run App"
                className="btn btn-success"
                onClick={handleRun}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
