export function generateRegionInfo(serverInfo: {
  name: string;
  address: string;
  port: number;
  url: string;
}) {
  const regions = [
    {
      $type: "StaticHttpRegionInfo, Assembly-CSharp",
      Name: serverInfo.name,
      PingServer: serverInfo.address,
      Servers: [
        {
          Name: "http-1",
          Ip: serverInfo.url,
          Port: serverInfo.port,
          UseDtls: false,
        },
      ],
      TranslateName: 1003,
    },
  ];

  const jsonServerData = {
    CurrentRegionIdx: 3,
    Regions: regions,
  };

  return JSON.stringify(jsonServerData, null, 4);
}

export function openApp(data: {
  protocol: string;
  address: string;
  port: string;
  name: string;
}) {
  const params = new URLSearchParams({
    servername: data.name,
    serverport: data.port,
    serverip: `${data.protocol}://${data.address}`,
    usedtls: "false",
  });

  const url = `amongus://init?${params.toString()}`;
  window.location.href = url;
}

export async function testServerConnection(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD", redirect: "follow" });
    console.log(response);

    return response.ok;
  } catch (error) {
    console.error("Error testing server connection:", error);
    return false;
  }
}
