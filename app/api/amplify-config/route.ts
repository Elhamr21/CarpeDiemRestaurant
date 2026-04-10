import { readFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const OUTPUTS_FILE = path.join(process.cwd(), "amplify_outputs.json")
const MISSING_OUTPUTS_ERROR =
  "Die Datei `amplify_outputs.json` fehlt. Führen Sie `pnpm run amplify:sandbox:once` aus oder deployen Sie das Amplify-Backend, bevor Sie Reservierungen oder den Admin-Bereich verwenden."

export async function GET() {
  try {
    const rawOutputs = await readFile(OUTPUTS_FILE, "utf8")
    return NextResponse.json(JSON.parse(rawOutputs))
  } catch (error) {
    console.error("Unable to load amplify_outputs.json:", error)

    return NextResponse.json(
      { error: MISSING_OUTPUTS_ERROR },
      { status: 503 },
    )
  }
}
