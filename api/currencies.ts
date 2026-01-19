import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const response = await fetch(
      'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: 'PrivatBank API error' });
    }

    const data = await response.json();

    // 🔹 кеш на edge (60 сек)
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch currencies' });
  }
}
