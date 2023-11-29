const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: './keyFile.json', // Path to your JSON key file
});

// bucket list
storage
  .getBuckets()
  .then((data) => {
    const buckets = data[0];
    console.log('Buckets:');
    buckets.forEach((bucket) => {
      console.log(bucket.name);
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
