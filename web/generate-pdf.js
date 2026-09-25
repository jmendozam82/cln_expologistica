const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, 'public', 'logo-horizontal.jpg');
const logoBase64 = fs.readFileSync(logoPath, 'base64');
const logoDataUrl = `data:image/jpeg;base64,${logoBase64}`;

const EMPTY = { empty: true };

const SLOTS = [
  {
    time: "7:30 – 8:30 a.m.",
    mambacho: { kind: "plenary", title: "Registro de asistentes" },
    momotombo: EMPTY,
    telica: EMPTY,
  },
  {
    time: "8:30 – 9:00 a.m.",
    mambacho: { kind: "plenary", title: "Ceremonia de Apertura", sub: "EXPO LOGÍSTICA · CLN · 2026" },
    momotombo: EMPTY,
    telica: EMPTY,
  },
  {
    time: "9:00 – 9:50 a.m.",
    mambacho: { title: "De la Última Milla a la Última Experiencia (Oscar Soto)" },
    momotombo: { title: "Ciberseguridad y Continuidad Operativa (Cairo Quezada)" },
    telica: EMPTY,
  },
  {
    time: "9:50 – 10:30 a.m.",
    mambacho: { title: "Panel de Expertos: El Nuevo Líder de Supply Chain" },
    momotombo: { title: "Supply Chain Control Tower (Moises)" },
    telica: { title: "Logistic Talk 1: Tu Carrera en Supply Chain (Cesar Escobar)" },
  },
  {
    time: "10:30 – 11:00 a.m.",
    mambacho: EMPTY,
    momotombo: EMPTY,
    telica: { title: "Coffee Break AM · Visita a Stands de Patrocinadores" },
  },
  {
    time: "11:00 a.m. – 12:00 m.",
    mambacho: { title: "Magistral 1: Del Almacén Tradicional al Smart CEDIS (Luczy)" },
    momotombo: EMPTY,
    telica: EMPTY,
  },
  {
    time: "12:15 – 1:30 p.m.",
    mambacho: EMPTY,
    momotombo: { title: "Almuerzo Ejecutivo" },
    telica: EMPTY,
  },
  {
    time: "1:30 – 2:10 p.m.",
    mambacho: { title: "Centroamérica Conectada (SIECA)" },
    momotombo: { title: "Logística Verde que Sí Hace Negocio (Carlos Palomino)" },
    telica: { title: "Logistic Talk 2: E-commerce y Última Milla (Mauricio Urroz)" },
  },
  {
    time: "2:10 – 2:40 p.m.",
    mambacho: EMPTY,
    momotombo: EMPTY,
    telica: { title: "Coffee Break PM · Visita a Stands de Patrocinadores" },
  },
  {
    time: "2:40 – 3:40 p.m.",
    mambacho: { title: "Magistral 2: IA en Logística (Antonio Espinoza)" },
    momotombo: EMPTY,
    telica: EMPTY,
  },
  {
    time: "3:40 – 4:00 p.m.",
    mambacho: EMPTY,
    momotombo: { title: "Actividad Patrocinadores · Reconocimiento CLN" },
    telica: EMPTY,
  },
  {
    time: "4:00 – 5:30 p.m.",
    mambacho: EMPTY,
    momotombo: { title: "Cóctel Networking de Cierre" },
    telica: EMPTY,
  },
];

let slotsHtml = SLOTS.map(slot => {
  const events = [];
  if (!slot.mambacho.empty) events.push({ room: 'Mambacho', title: slot.mambacho.title });
  if (!slot.momotombo.empty) events.push({ room: 'Momotombo', title: slot.momotombo.title });
  if (!slot.telica.empty) events.push({ room: 'Telica', title: slot.telica.title });

  let content = '';
  if (events.length === 1) {
    content = `<span style="font-size: 15px; font-weight: bold;">${events[0].title}</span>`;
  } else {
    content = events.map(e => `
      <div style="margin-bottom: 6px;">
        <span style="color: #0f8be7; font-weight: bold; font-size: 12px; text-transform: uppercase;">${e.room}</span><br/>
        <span style="font-size: 14px; font-weight: 500;">${e.title}</span>
      </div>
    `).join('');
  }

  return `
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 16px 8px; width: 150px; font-weight: bold; color: #00345b; vertical-align: top; font-size: 14px;">
        ${slot.time}
      </td>
      <td style="padding: 16px 8px; color: #334155; vertical-align: top;">
        ${content}
      </td>
    </tr>
  `;
}).join('');

const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 40px;
      color: #0f172a;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      max-width: 250px;
      margin-bottom: 15px;
    }
    h1 {
      color: #00345b;
      margin: 0;
      font-size: 26px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    p {
      color: #64748b;
      margin-top: 5px;
      font-size: 16px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 11px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="header">
    <img class="logo" src="${logoDataUrl}" />
    <h1>Agenda Oficial</h1>
    <p>Expo Logística · Comunidad Logística Nicaragüense · 2026</p>
  </div>
  <table>
    <tbody>
      ${slotsHtml}
    </tbody>
  </table>
  <div class="footer">
    * Este programa es preliminar y puede experimentar ajustes menores en horarios y contenidos.
  </div>
</body>
</html>
`;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: 'Agenda_Oficial_CLN.pdf',
    format: 'Letter',
    printBackground: true,
    margin: { top: '30px', bottom: '30px', left: '40px', right: '40px' }
  });
  await browser.close();
  console.log('PDF generado exitosamente: Agenda_Oficial_CLN.pdf');
})();
