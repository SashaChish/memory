const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth.js');
const { nanoid } = require('nanoid');

const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

//Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('fra1.digitaloceanspaces.com');
const s3 = new aws.S3({
	endpoint: spacesEndpoint,
	accessKeyId: 'DOKCN6VQRCRYUIROTYP4',
	secretAccessKey: 'y+AyQP3kOZM2wuFW/eKq+gn0Iedyy4L55wkqKhuoH+A',
});

// function getExtension(filename) {
//     var ext = path.extname(filename||'').split('.');
//     return ext[ext.length - 1];
// }

//@route	POST api/shared/host
//@desc		Host file for post
//@access	Private
router.post('/host', auth, async (req, res) => {
	try {
		const filePath = path.join(
			__dirname + '\\temporaryFileStorage',
			`file.img`
		);
		const stream = fs.createWriteStream(filePath);
		console.log(stream);
		stream.on('open', () => req.pipe(stream));
		const fileId = nanoid();

		stream.on('close', () => {
			// Send a success response back to the client
			const file = fs.readFileSync(filePath);

			const params = {
				Bucket: 'asd-internship',
				Key: `${req.user.id}.${fileId}.mp4`,
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
				Key: `${req.user.id}.${fileId}.mp4`,
			});
			res.send(url.substring(0, url.indexOf('?')));
		});

		stream.on('error', (err) => {
			console.error(err);
			res.status(500).send({ status: 'error', err });
		});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
