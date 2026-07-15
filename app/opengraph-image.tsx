import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Kagelin — Work quietly. Own everything.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const icon = await readFile(
    join(process.cwd(), "public/kagelin-icon.png"),
  );
  const iconBase64 = `data:image/png;base64,${icon.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1A1A",
          color: "#E5E5E5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <img
            src={iconBase64}
            width={120}
            height={120}
            alt=""
            style={{ borderRadius: 24 }}
          />
          <div style={{ fontSize: 96, fontWeight: 600 }}>Kagelin</div>
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 40,
            color: "#A1A1A1",
          }}
        >
          Work quietly. Own everything.
        </div>
      </div>
    ),
    size,
  );
}
