const data = "#867198059727390#MT710#0000#AUTO#1#38#$GPRMC,105721.00,A,2238.3071,N,11401.7575,E,,96.70,250321,,,A*74"
const h_fields = data.split('#');
const g_fields = data.split(',');

function parseString(string)
{
  const imei = h_fields[1];
  const username = h_fields[2];
  const pwd = h_fields[3];
  const event = h_fields[4];
  const interval = h_fields[5];
  const voltage = h_fields[6];

  console.log(`imei: ${imei}, name: ${username}, pwd: ${pwd}, event: ${event}, interval: ${interval}, voltage: ${voltage}`);

  const time = g_fields[1];
  const status = g_fields[2];
  const lat = g_fields[3];
  const latDir = g_fields[4];
  const lng = g_fields[5];
  const lngDir = g_fields[6];
  const speed = g_fields[7];
  const trackAngle = g_fields[8];
  const date = g_fields[9];
  const r1 = g_fields[10];
  const r2 = g_fields[11];
  const checksum = g_fields[12];

  console.log(`Time: ${time}, Status: ${status}, Latitude: ${lat} ${latDir}, Longitude: ${lng} ${lngDir}, Speed: ${speed}, Anlge: ${trackAngle}, Date: ${date}, Checksum: ${checksum}`);
}

module.exports = parseString;

// parseString(data);