import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const app = express();
const url = process.env.SCRAPING_URL;

axios(url)
	.then((response) => {
		{
			const html = response.data;
			const $ = cheerio.load(html);
			const apartments = [];
			$('.css-wmzjt6', html).each(function () {
				const description = $(this).text();
				const imgUri = $(this).find('img', 'css-8wsg1m').attr('src');
				apartments.push({
					description,
					imgUri,
				});
			});

			console.log(apartments);
		}
	})
	.catch((err) => console.log(err));

const PORT = 3000;
app.listen(PORT, () => console.log('listening on port', PORT));
