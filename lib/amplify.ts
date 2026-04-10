"use client"

import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/data"
import type { Schema } from "@/amplify/data/resource"

const DEFAULT_CONFIG_ERROR =
  "Amplify ist noch nicht konfiguriert. Generieren Sie zuerst `amplify_outputs.json` mit `pnpm run amplify:sandbox:once` oder deployen Sie das Amplify-Backend."

let isConfigured = false
let configurePromise: Promise<void> | null = null

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null

export const getAmplifyErrorMessage = (value: unknown) => {
  if (typeof value === "string" && value.trim()) {
    return value
  }

  if (value instanceof Error && value.message.trim()) {
    return value.message
  }

  if (isRecord(value) && typeof value.error === "string" && value.error.trim()) {
    return value.error
  }

  if (isRecord(value) && typeof value.message === "string" && value.message.trim()) {
    return value.message
  }

  return DEFAULT_CONFIG_ERROR
}

const loadAmplifyOutputs = async () => {
  const response = await fetch("/api/amplify-config", { cache: "no-store" })
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(getAmplifyErrorMessage(payload))
  }

  if (!isRecord(payload)) {
    throw new Error(DEFAULT_CONFIG_ERROR)
  }

  return payload
}

export const ensureAmplifyConfigured = async () => {
  if (isConfigured) {
    return
  }

  if (!configurePromise) {
    configurePromise = (async () => {
      const outputs = await loadAmplifyOutputs()
      Amplify.configure(outputs, { ssr: true })
      isConfigured = true
    })()
  }

  try {
    await configurePromise
  } catch (error) {
    configurePromise = null
    throw error
  }
}

export const getDataClient = async () => {
  await ensureAmplifyConfigured()
  return generateClient<Schema>()
}

export default Amplify
