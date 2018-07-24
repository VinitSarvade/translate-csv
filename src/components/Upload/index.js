import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, FormGroup, Input, FormText, Button } from 'reactstrap';

class Upload extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  }
  state = {
    file: '',
    input_column: '',
    output_column: '',
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFileSelect = e => {
    this.setState({ [e.target.name]: e.target.files[0] })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.fileInputRef.value = '';
    this.setState({ file: '', input_column: '', output_column: '' });
    const { file, input_column, output_column } = this.state,
      { onSubmit } = this.props;
    onSubmit({ file, input_column, output_column });
  }

  render() {
    const { input_column, output_column } = this.state;
    return (
      <Card body outline color='info' className='upload my-5'>
        <Form onSubmit={this.handleFormSubmit}>
          <div className='row'>
            <div className='col'>
              <FormGroup>
                <Input type='file' name='file' innerRef={ref => { this.fileInputRef = ref }} onChange={this.handleFileSelect} accept=".xls,.xlsx" required />
                <FormText color='muted'>
                  Upload a CSV file
                </FormText>
              </FormGroup>
            </div>
            <div className='col'>
              <FormGroup>
                <Input type='number' name='input_column' value={input_column} min='1' onChange={this.handleInput} required />
                <FormText color='muted'>
                  Column number of the Input text in the File
                </FormText>
              </FormGroup>
            </div>
            <div className='col'>
              <FormGroup>
                <Input type='number' name='output_column' value={output_column} min='1' onChange={this.handleInput} required />
                <FormText color='muted'>
                  Column number of the Output text in the File
                </FormText>
              </FormGroup>
            </div>
          </div>
          <Button type='submit' color='info'>Translate</Button>
        </Form>
      </Card>
    )
  }
}

export default Upload
