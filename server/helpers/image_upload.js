var multer = require('multer');
var path = require('path')
const appRoot = require('app-root-path');

const storage = multer.diskStorage({
    fileFilter: (req, file, cb) => {
      if (!file) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      else if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
    destination: (req, file, cb) => {
        cb(null, appRoot + '/views/uploads')
    },
    filename: (req, file, cb) => {
      console.log(file.fieldname);
        cb(null, Date.now() + path.extname(file.originalname))
        // cb(null, file.fieldname + '-' + Date.now())
        
    }
});

module.exports = multer({ storage: storage });




 
