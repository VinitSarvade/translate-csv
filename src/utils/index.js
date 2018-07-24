import axios from 'axios';
import XLSX from 'xlsx';
import _ from 'lodash';

export const parseExcelSheet = file => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      const canReadAsBinary = !!reader.readAsBinaryString;
      reader.onload = (e) => {
        const binaryString = e.target.result;
        const wb = XLSX.read(binaryString, { type: canReadAsBinary ? 'binary' : 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]]; // get first sheet
        resolve(_.filter(XLSX.utils.sheet_to_json(ws, { header: 1 }), row => !_.isEmpty(row)));
      };
      canReadAsBinary ? reader.readAsBinaryString(file) : reader.readAsArrayBuffer(file);
    }
    catch (e) {
      reject(e);
    }
  });
};

export const exportFile = (data, filename) => {
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws);
  XLSX.writeFile(wb, filename);
}

export const translate = ({ contents, input_column, output_column }) => {
  return axios.post('/api/translate', { data: contents, input_column, output_column })
    .then(response => response.data)
    .catch(error => { throw error })
};
