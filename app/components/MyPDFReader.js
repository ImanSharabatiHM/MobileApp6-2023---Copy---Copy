import PDFReader from "rn-pdf-reader-js";

class MyPDFReader extends PDFReader {
    constructor(props) {
      super(props);
      this.state = { ...this.state, renderedOnce: true };
    }
  }


  export default MyPDFReader;