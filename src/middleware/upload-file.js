const upload = require('./multer-config')

let uplaodFile = upload.single('file');

exports.uploadFile = async (req, res, next) => {
  uplaodFile(req, res, function (err) {
    if (err) {
      return res.status(500).json({
        error: 'Internal Server Error',
        code: 500,
        errorCode: "INTERNAL_SERVER_ERROR",
        message: err,
        Endpoint: req.originalUrl
      })
    }
    next()
  })
}