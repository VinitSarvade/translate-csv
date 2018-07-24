import React, { Component } from 'react';
import { Navbar, NavbarBrand, Button, Table, Alert } from 'reactstrap';
import _ from 'lodash';

import logo from '../../logo.svg';
import './App.css';
import Upload from '../../components/Upload/index';
import Spinner from '../../components/Spinner';
import { parseExcelSheet, translate, exportFile } from '../../utils/index';

class App extends Component {
  state = {
    results: {}
  };

  handleSubmit = ({ file, input_column, output_column }) => {
    parseExcelSheet(file)
      .then((contents) => {
        this.updateResults(contents, true, {}, file.name);
        translate({ contents, input_column, output_column })
          .then(translatedJSON => this.updateResults(translatedJSON, false, {}, file.name))
          .catch(error => this.updateResults(contents, false, error, file.name));
      });
  }

  updateResults = (data, translating = true, error = {}, filename) => {
    const { results } = this.state;
    this.setState({
      results: {
        ...results,
        [filename]: { data, translating, error }
      }
    })
  }

  render() {
    const { results } = this.state;
    let slno = 1;

    return (
      <div className='App'>
        <Navbar color='dark' dark expand='md'>
          <div className='container'>
            <NavbarBrand href='/'> <img className='app-logo' src={logo} alt='' />Excel Translater</NavbarBrand>
          </div>
        </Navbar>
        <div className="container">
          <Upload onSubmit={this.handleSubmit} />

          <div className="results my-5">
            {!_.isEmpty(results) && (
              <Table striped hover responsive bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Filename</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {_.map(results, ((result, filename) => (
                    <tr key={filename}>
                      <th scope='row'>{slno++}</th>
                      <td>{filename}</td>
                      <td>
                        {!_.isEmpty(result.error)
                          ? <Alert color='danger'>{result.error.message || 'Failed!! Please Retry.'}</Alert>
                          : result.translating
                            ? <span>Translating&emsp;<Spinner /></span>
                            : <Button color='success' onClick={() => exportFile(result.data, filename)}>Download</Button>
                        }
                      </td>
                    </tr>
                  )))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
