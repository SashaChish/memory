const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

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

app.post('/readfile', (req, res) => {
	const filePath = path.join(__dirname, '/file.jpg');
	const stream = fs.createWriteStream(filePath);
	stream.on('open', () => req.pipe(stream));

	stream.on('close', () => {
		// Send a success response back to the client
		const file = fs.readFileSync(filePath);

		const params = {
			Bucket: 'asd-internship',
			Key: 'stream.mp4',
			Body: file,
			ACL: 'public-read',
		};

		//check for type
		s3.putObject(params, (err, data) => {
			if (err) return console.log(err);
			console.log('Your stream img has been uploaded successfully!', data);
		});

		const url = s3.getSignedUrl('getObject', {
			Bucket: 'asd-internship',
			Key: `stream.mp4`,
		});
		res.send(url);
	});

	stream.on('error', (err) => {
		console.error(err);
		res.status(500).send({ status: 'error', err });
	});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
