const { google } = require('googleapis');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, phone, email, age, coverage, health, smoker } = req.body || {};

  if (!name || !phone || !email || !age || !coverage || !health || !smoker) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        // Vercel env vars store literal \n as two characters, so convert them back to real newlines
        private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Leads!A:H',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[
          new Date().toISOString(),
          name,
          phone,
          email,
          age,
          coverage,
          health,
          smoker,
        ]],
      },
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Sheets append failed:', err.message);
    res.status(500).json({ error: 'Could not save lead. Please try again.' });
  }
};
