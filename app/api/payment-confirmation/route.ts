import { NextRequest, NextResponse } from "next/server";

const GPU_PRICES = {
  "0.011": { gpu: "GPU 1", reward: "0.003" },
  "0.012": { gpu: "GPU 2", reward: "0.005" },
  "0.013": { gpu: "GPU 3", reward: "0.007" },
  "0.014": { gpu: "GPU 4", reward: "0.009" },
} as const;

type GpuPriceKey = keyof typeof GPU_PRICES;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { from, amount, txHash } = body;

    if (!from || !amount || !txHash) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const gpuInfo = GPU_PRICES[amount as GpuPriceKey];
    if (!gpuInfo) {
      return NextResponse.json({ error: "Invalid GPU payment amount" }, { status: 400 });
    }

    // TODO: Simpan ke DB, verifikasi txHash, dll
    console.log(`✅ Payment confirmed from ${from} for ${gpuInfo.gpu} (${amount} ETH), tx: ${txHash}`);

    return NextResponse.json({ status: "confirmed", gpu: gpuInfo });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: "Server error", message }, { status: 500 });
  }
}
