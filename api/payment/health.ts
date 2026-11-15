export default function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.status(200).json({ status: "ok", app: "GoTrek Travels - Yatra & CRM (Vercel Serverless)" });
}
