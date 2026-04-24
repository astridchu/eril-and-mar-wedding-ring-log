"use client";

import type { SessionData, SessionName } from "./types";
import { buildPreferencesJson, getAllPhotos, buildReadme } from "./storage";

// Dynamically import JSZip + FileSaver to keep SSR safe
async function getZip() {
  const [{ default: JSZip }, { saveAs }] = await Promise.all([
    import("jszip"),
    import("file-saver"),
  ]);
  return { JSZip, saveAs };
}

export async function exportSession(data: SessionData): Promise<void> {
  const { JSZip, saveAs } = await getZip();
  const name = data.name as SessionName;
  const displayName = name === "eril" ? "Eril" : "Mar";

  const zip = new JSZip();
  const root = `exports/${name}/`;

  // 1. Preferences JSON
  const prefsJson = buildPreferencesJson(data);
  zip.file(`${root}${name}-preferences.json`, JSON.stringify(prefsJson, null, 2));

  // 2. Photos + manifest
  const photos = getAllPhotos(data);
  const manifest: Record<string, unknown>[] = [];

  for (const photo of photos) {
    const folder = `${root}photos/${photo.section}/`;
    // dataUrl → binary
    const base64 = photo.dataUrl.split(",")[1] ?? photo.dataUrl;
    zip.file(`${folder}${photo.filename}`, base64, { base64: true });

    manifest.push({
      filename: photo.filename,
      section: photo.section,
      caption: photo.caption ?? "",
      timestamp: photo.timestamp,
    });
  }

  zip.file(`${root}photo-manifest.json`, JSON.stringify(manifest, null, 2));

  // 3. README
  zip.file(`${root}README.md`, buildReadme(name));

  // 4. Download
  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${name}-photos.zip`);
}

// Download JSON only (no photos) — used to save the preferences file
export async function downloadPreferencesJson(data: SessionData): Promise<void> {
  const { saveAs } = await getZip();
  const name = data.name;
  const json = buildPreferencesJson(data);
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
  saveAs(blob, `${name}-preferences.json`);
}
