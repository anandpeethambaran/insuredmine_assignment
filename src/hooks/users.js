const { Worker, workerData } = require('worker_threads');
const path = require('path')

exports.uploadFileToDB = (data) => {
  return new Promise((resolve, reject) => {
    data["__basedir"] = __basedir
    const worker = new Worker(path.join(__basedir, '/hooks/user-csv-worker.js'), {
      workerData: data
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}