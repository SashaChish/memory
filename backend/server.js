const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');

const app = express();

//Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('fra1.digitaloceanspaces.com');
const s3 = new aws.S3({
	endpoint: spacesEndpoint,
	accessKeyId: 'DOKCN6VQRCRYUIROTYP4',
	secretAccessKey: 'y+AyQP3kOZM2wuFW/eKq+gn0Iedyy4L55wkqKhuoH+A',
});

// use it before all route definitions
app.use(cors());

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/users', require('./routes/api/users.js'));
app.use('/api/auth', require('./routes/api/auth.js'));
app.use('/api/posts', require('./routes/api/posts.js'));
app.use('/api/profile', require('./routes/api/profile.js'));

app.get('/upload', (req, res) => {
	const file = fs.readFileSync(
		'C:/Users/dvory/OneDrive/Робочий стіл/NO MR_STOCK FOOTAGE NO MR (290)_preview.mp4'
	);

	s3.putObject(
		{
			Bucket: 'asd-internship',
			Key: 'test-video.mp4',
			Body: file,
			ACL: 'public-read',
		},
		(err, data) => {
			if (err) return console.log(err);
			console.log('Your video has been uploaded successfully!', data);
		}
	);

	res.json('Success');
});

app.get('/getFile', (req, res) => {
	const url = s3.getSignedUrl('getObject', {
		Bucket: 'asd-internship',
		Key: `test-video.mp4`,
	});
	res.send(url);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
