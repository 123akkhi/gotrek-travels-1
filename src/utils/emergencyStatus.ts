/**
 * GoTrek Ground Control Emergency SOS Dispatcher
 * 
 * Aggregates the user's last known status:
 * - Pilgrim identity & contact
 * - Next-of-kin emergency nominee & phone
 * - Active Yatra booking ID & circuit
 * - Medical clearance & blood group
 * - Real-time or last-cached GPS coordinates (with Google Maps link)
 * - Battery percentage and network connectivity
 * - Dispatches pre-filled SOS WhatsApp message to GoTrek Ground Control (+91 72482 85767)
 */

export interface UserEmergencyStatus {
  pilgrimName: string;
  phone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bookingId?: string;
  circuit: string;
  bloodGroup?: string;
  medicalClearanceId?: string;
  lastKnownLocation: string;
  gpsCoords?: {
    latitude: number;
    longitude: number;
    accuracyMeters?: number;
    mapsUrl: string;
  };
  batteryLevel?: string;
  networkStatus: string;
  timestamp: string;
}

export const GOTREK_GROUND_CONTROL_PHONE = "917248285767";
export const GOTREK_GROUND_CONTROL_DISPLAY = "+91 72482 85767";

/**
 * Gathers user's last known status from all available storage & device APIs
 */
export function getUserLastKnownStatus(options?: {
  currentCircuit?: string;
  overrideLocation?: string;
}): UserEmergencyStatus {
  // 1. Pilgrim User Profile from LocalStorage
  let pilgrimUser: any = null;
  try {
    const raw = localStorage.getItem("gotrek_pilgrim_user");
    if (raw) pilgrimUser = JSON.parse(raw);
  } catch {}

  // 2. Latest Booking from LocalStorage
  let latestBooking: any = null;
  try {
    const raw = localStorage.getItem("gotrek_latest_booking");
    if (raw) latestBooking = JSON.parse(raw);
  } catch {}

  // 3. Medical Fitness Data from LocalStorage
  let medicalData: any = null;
  try {
    const raw = localStorage.getItem("gotrek_medical_fitness_data_v1");
    if (raw) medicalData = JSON.parse(raw);
  } catch {}

  // 4. Cached GPS Coordinates
  let cachedGps: { latitude: number; longitude: number; accuracyMeters?: number; mapsUrl: string } | undefined = undefined;
  try {
    const raw = localStorage.getItem("gotrek_last_gps_coords");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.latitude && parsed.longitude) {
        cachedGps = {
          latitude: parsed.latitude,
          longitude: parsed.longitude,
          accuracyMeters: parsed.accuracy,
          mapsUrl: `https://maps.google.com/?q=${parsed.latitude},${parsed.longitude}`,
        };
      }
    }
  } catch {}

  // 5. Derive Name
  const pilgrimName =
    pilgrimUser?.fullName ||
    pilgrimUser?.name ||
    latestBooking?.devoteeName ||
    latestBooking?.fullName ||
    medicalData?.pilgrimName ||
    "Yatri / Pilgrim on Route";

  // 6. Derive Phone
  const phone =
    pilgrimUser?.phone ||
    latestBooking?.devoteePhone ||
    latestBooking?.phone ||
    "Not registered on device";

  // 7. Derive Emergency Nominee Contact
  const emergencyContactName =
    pilgrimUser?.emergencyContactName ||
    medicalData?.emergencyContact ||
    latestBooking?.emergencyContact ||
    "Not provided";

  const emergencyContactPhone =
    pilgrimUser?.emergencyContactPhone ||
    medicalData?.emergencyPhone ||
    latestBooking?.emergencyPhone ||
    "Not provided";

  // 8. Derive Booking ID
  const bookingId = latestBooking?.bookingId || undefined;

  // 9. Derive Circuit
  const circuit =
    options?.currentCircuit ||
    latestBooking?.circuit ||
    latestBooking?.destinationTitle ||
    pilgrimUser?.preferredYatra ||
    "Adi Kailash & Om Parvat Sacred Circuit (Vyas Valley)";

  // 10. Derive Medical Info
  const bloodGroup = medicalData?.bloodGroup || undefined;
  const medicalClearanceId = medicalData?.clearanceId || undefined;

  // 11. Network Status
  const networkStatus = typeof navigator !== "undefined" && !navigator.onLine
    ? "⚠️ Offline / Low-Signal Satellite Mode"
    : "📶 Online (Cellular Data)";

  // 12. Timestamp in Indian Standard Time (IST)
  const now = new Date();
  const timestamp = now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }) + " IST";

  // 13. Last Known Location
  const lastKnownLocation =
    options?.overrideLocation ||
    cachedGps
      ? `GPS Coordinates: ${cachedGps?.latitude.toFixed(4)}° N, ${cachedGps?.longitude.toFixed(4)}° E`
      : "Vyas Valley Transit Route (Dharchula - Gunji - Jolingkong Sector)";

  return {
    pilgrimName,
    phone,
    emergencyContactName,
    emergencyContactPhone,
    bookingId,
    circuit,
    bloodGroup,
    medicalClearanceId,
    lastKnownLocation,
    gpsCoords: cachedGps,
    networkStatus,
    timestamp,
  };
}

/**
 * Attempts to capture real-time GPS coordinates with quick fallback timeout
 */
export async function captureCurrentGpsCoordinates(timeoutMs = 1200): Promise<{
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
  mapsUrl: string;
} | null> {
  if (typeof navigator === "undefined" || !navigator.geolocation) {
    return null;
  }

  return new Promise((resolve) => {
    let resolved = false;

    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(null);
      }
    }, timeoutMs);

    try {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (resolved) return;
          resolved = true;
          clearTimeout(timer);
          const coords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracyMeters: Math.round(pos.coords.accuracy),
            mapsUrl: `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`,
          };
          try {
            localStorage.setItem(
              "gotrek_last_gps_coords",
              JSON.stringify({
                latitude: coords.latitude,
                longitude: coords.longitude,
                accuracy: coords.accuracyMeters,
                timestamp: Date.now(),
              })
            );
          } catch {}
          resolve(coords);
        },
        () => {
          if (resolved) return;
          resolved = true;
          clearTimeout(timer);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: timeoutMs, maximumAge: 30000 }
      );
    } catch {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        resolve(null);
      }
    }
  });
}

/**
 * Query device battery status if supported
 */
export async function getDeviceBatteryLevel(): Promise<string | undefined> {
  try {
    if (typeof navigator !== "undefined" && "getBattery" in navigator) {
      const battery: any = await (navigator as any).getBattery();
      const level = Math.round(battery.level * 100);
      return `${level}%${battery.charging ? " (Charging)" : ""}`;
    }
  } catch {}
  return undefined;
}

/**
 * Compiles a pre-filled, high-clarity emergency SOS dispatch message for WhatsApp
 */
export function formatEmergencyWhatsAppMessage(status: UserEmergencyStatus): string {
  const lines: string[] = [
    "🚨 *EMERGENCY SOS — GOTREK GROUND CONTROL* 🚨",
    "*Priority: IMMEDIATE ASSISTANCE REQUIRED*",
    "",
    `👤 *Pilgrim / Devotee:* ${status.pilgrimName}`,
    `📞 *Contact Number:* ${status.phone}`,
  ];

  if (status.emergencyContactName !== "Not provided" || status.emergencyContactPhone !== "Not provided") {
    lines.push(`🆘 *Emergency Nominee:* ${status.emergencyContactName} (${status.emergencyContactPhone})`);
  }

  if (status.bookingId) {
    lines.push(`📋 *Booking Reference:* ${status.bookingId}`);
  }

  lines.push(`🏔️ *Yatra Circuit:* ${status.circuit}`);

  if (status.bloodGroup) {
    lines.push(`🩸 *Blood Group:* ${status.bloodGroup}`);
  }

  if (status.medicalClearanceId) {
    lines.push(`🩺 *Medical Clearance Pass:* ${status.medicalClearanceId}`);
  }

  if (status.gpsCoords) {
    lines.push(`🧭 *GPS Location:* ${status.gpsCoords.latitude.toFixed(5)}° N, ${status.gpsCoords.longitude.toFixed(5)}° E`);
    if (status.gpsCoords.accuracyMeters) {
      lines.push(`🎯 *GPS Accuracy:* ±${status.gpsCoords.accuracyMeters} meters`);
    }
    lines.push(`📍 *Live Google Maps Pin:* ${status.gpsCoords.mapsUrl}`);
  } else {
    lines.push(`📍 *Last Known Sector:* ${status.lastKnownLocation}`);
  }

  if (status.batteryLevel) {
    lines.push(`🔋 *Device Battery:* ${status.batteryLevel}`);
  }

  lines.push(`📶 *Connectivity:* ${status.networkStatus}`);
  lines.push(`⏱️ *SOS Time:* ${status.timestamp}`);
  lines.push("");
  lines.push("⚠️ *SITUATION & REQUEST:*");
  lines.push("Immediate medical / altitude sickness (AMS) / logistics / evacuation support required on trail.");
  lines.push("Please acknowledge receipt and alert the nearest GoTrek Dharchula Operations Desk or ITBP Gunji Post.");

  return lines.join("\n");
}

/**
 * Synchronously generates the emergency status and pre-filled WhatsApp payload
 * without any blocking delays, ensuring 0ms instant UI rendering
 */
export function createEmergencyPayloadSync(options?: {
  currentCircuit?: string;
  overrideLocation?: string;
}): { status: UserEmergencyStatus; message: string; whatsappUrl: string } {
  const status = getUserLastKnownStatus(options);
  const message = formatEmergencyWhatsAppMessage(status);
  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${GOTREK_GROUND_CONTROL_PHONE}?text=${encoded}`;
  return { status, message, whatsappUrl };
}

/**
 * Safely attempts to open WhatsApp in a new tab/window without breaking iframe context
 */
export function openEmergencyWhatsApp(whatsappUrl: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const win = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (win) {
      win.opener = null;
      return true;
    }
  } catch (err) {
    console.warn("Direct window.open blocked or restricted in iframe:", err);
  }
  return false;
}

/**
 * Background enhancement: attempts to enrich status with live GPS & battery in parallel
 */
export async function refreshEmergencyStatusWithGps(
  currentStatus: UserEmergencyStatus
): Promise<{ status: UserEmergencyStatus; message: string; whatsappUrl: string }> {
  const updated: UserEmergencyStatus = { ...currentStatus };

  try {
    const [gpsResult, batteryResult] = await Promise.allSettled([
      captureCurrentGpsCoordinates(1200),
      getDeviceBatteryLevel(),
    ]);

    if (gpsResult.status === "fulfilled" && gpsResult.value) {
      updated.gpsCoords = gpsResult.value;
      updated.lastKnownLocation = `GPS: ${gpsResult.value.latitude.toFixed(4)}° N, ${gpsResult.value.longitude.toFixed(4)}° E`;
    }
    if (batteryResult.status === "fulfilled" && batteryResult.value) {
      updated.batteryLevel = batteryResult.value;
    }
  } catch (e) {
    console.warn("Background emergency GPS enrichment skipped:", e);
  }

  const message = formatEmergencyWhatsAppMessage(updated);
  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${GOTREK_GROUND_CONTROL_PHONE}?text=${encoded}`;

  return { status: updated, message, whatsappUrl };
}

/**
 * Triggers the One-Click Emergency dispatch to GoTrek Ground Control via WhatsApp
 */
export function triggerOneClickEmergency(options?: {
  currentCircuit?: string;
  overrideLocation?: string;
}): { status: UserEmergencyStatus; message: string; whatsappUrl: string } {
  const payload = createEmergencyPayloadSync(options);

  // Attempt non-blocking window.open in new tab (never window.location.href in iframe)
  openEmergencyWhatsApp(payload.whatsappUrl);

  return payload;
}

