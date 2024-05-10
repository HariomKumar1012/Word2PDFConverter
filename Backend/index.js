const express = require("express");
const multer = require("multer");
const docxToPDF = require("docx-pdf");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
//Creating the storage to upload the file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

app.get('/',(req,res)=>{
  res.send('Word to PDF Converter');
})

const upload = multer({ storage: storage });

//Main code to convert word to pdf
app.post("/ConvertFile", upload.single("file"), function (req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please Upload the file",
      });
    }

    //Defining the output path
    let outputPath = path.join(__dirname, "files", `${req.file.originalname}.pdf`);

    docxToPDF(req.file.path, outputPath, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error in Converting to pdf",
        });
      }
      res.download(outputPath, () => {
        console.log("file downloaded");
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(port, () => {
  console.log(`Listing on port ${port}`);
});
