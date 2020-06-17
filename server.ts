import express, { Request, Response } from 'express';
import cheerio from 'cheerio';
import axios from 'axios';
const app = express();

app.get('/api/v1/brasil', async (req: Request, res: Response) => {
  const { data: response } = await axios.get('https://news.google.com/covid19/map?hl=pt-BR&gl=BR&ceid=BR:pt-419');
  const covid19 = cheerio.load(response);

  const brasil = covid19('.T4LgNb').find('.ppcUXd').find('.sgXwHf + .wdLSAe + .YvL7re').first();
  const country = String(brasil.find('.l3HOY').find('.TWa0lb').find('.pcAJd').text());
  const confirmed = Number(brasil.find('.l3HOY').eq(1).text());
  const recovered = Number(brasil.find('.l3HOY').eq(3).text());
  const deaths = Number(brasil.find('.l3HOY').eq(4).text());
  
  return res.json({ country, confirmed, recovered, deaths });
});

app.listen(3333, () => console.log('http://localhost:3333/'));
