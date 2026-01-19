import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    console.error('Proxy error:', e);
    res.status(500).json({ error: 'Proxy failed' });
  }
}
