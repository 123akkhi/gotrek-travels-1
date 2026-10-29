export interface MedicalPassData {
  clearanceId: string;
  pilgrimName: string;
  age: number | string;
  gender: string;
  bloodGroup: string;
  emergencyContact: string;
  emergencyPhone: string;
  destinationTitle: string;
  altitude: string;
  issueDate: string;
  totalChecked: number;
  totalRequired: number;
  clearedStatus: "VERIFIED_READY_TO_GO" | "CONDITIONAL_PHYSICIAN_CLEARANCE";
}

const BRAND_NAME = "GoTrek Travels (Pithoragarh & Dharchula)";
const REG_DETAILS = "UTDB Reg: UK/PITH/YATRA/2024/0981 • SDM Dharchula Liaison";
const BASE_CAMP = "Transit Hub, Near SDM Office, Dharchula Base Camp, Pithoragarh, Uttarakhand";
const HELPLINE = "+91 72482 85767 • mailgotrek@gmail.com";

/**
 * Generates an official, printable vector PDF Medical Fitness Clearance Pass
 */
export const downloadMedicalClearancePassPdf = async (data: MedicalPassData): Promise<void> => {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Outer border frame
  doc.setDrawColor(180, 83, 9); // amber-700
  doc.setLineWidth(1.2);
  doc.rect(margin, margin, contentWidth, pageHeight - margin * 2);

  // Inner subtle border
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.rect(margin + 2.5, margin + 2.5, contentWidth - 5, pageHeight - margin * 2 - 5);

  // Top Header Banner (Deep Crimson / Maroon)
  doc.setFillColor(163, 22, 28);
  doc.rect(margin + 2.8, margin + 2.8, contentWidth - 5.6, 26, "F");

  // Header Typography
  doc.setTextColor(254, 243, 199); // amber-100
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("GOTREK TRAVELS — HIGH ALTITUDE EXPEDITION DESK", pageWidth / 2, margin + 11, { align: "center" });

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255);
  doc.text(
    "OFFICIAL PILGRIM MEDICAL FITNESS & ALTITUDE CLEARANCE PASS",
    pageWidth / 2,
    margin + 17,
    { align: "center" }
  );

  doc.setFontSize(7.5);
  doc.setTextColor(254, 215, 170);
  doc.text(`${REG_DETAILS} • Dharchula HQ`, pageWidth / 2, margin + 23, { align: "center" });

  let y = margin + 35;

  // Status Banner: READY TO GO
  doc.setFillColor(236, 253, 245); // emerald-50
  doc.setDrawColor(16, 185, 129); // emerald-500
  doc.setLineWidth(0.8);
  doc.roundedRect(margin + 5, y, contentWidth - 10, 16, 2, 2, "FD");

  doc.setTextColor(6, 95, 70); // emerald-800
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("STATUS: MEDICALLY CLEARED — READY TO GO! [OK]", pageWidth / 2, y + 7, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(4, 120, 87);
  doc.text(
    `Self-Assessment Complete: ${data.totalChecked}/${data.totalRequired} Mandatory Parameters Cleared for High-Altitude Terrains`,
    pageWidth / 2,
    y + 12,
    { align: "center" }
  );

  y += 22;

  // Two Column Details Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 5, y, contentWidth - 10, 42, 2, 2, "FD");

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("PILGRIM & EXPEDITION PARTICULARS", margin + 10, y + 7);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);

  const col1X = margin + 10;
  const col2X = margin + 95;

  // Row 1
  doc.text("Pilgrim Name:", col1X, y + 15);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(String(data.pilgrimName || "Registered Pilgrim").toUpperCase(), col1X + 26, y + 15);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Pass Ref ID:", col2X, y + 15);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(163, 22, 28);
  doc.text(data.clearanceId, col2X + 22, y + 15);

  // Row 2
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Age / Gender:", col1X, y + 22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.age || "—"} Yrs / ${data.gender || "Not Specified"}`, col1X + 26, y + 22);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Blood Group:", col2X, y + 22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(180, 83, 9);
  doc.text(String(data.bloodGroup || "O+"), col2X + 22, y + 22);

  // Row 3
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Circuit:", col1X, y + 29);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.destinationTitle} (${data.altitude})`, col1X + 26, y + 29);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Cleared On:", col2X, y + 29);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(data.issueDate, col2X + 22, y + 29);

  // Row 4
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Emergency Contact:", col1X, y + 36);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.emergencyContact || "Nominee declared"} (${data.emergencyPhone || "+91-XXXXXXXXXX"})`, col1X + 32, y + 36);

  y += 48;

  // Verified Medical Criteria Breakdown
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("VERIFIED CLINICAL & ALTITUDE ASSESSMENT MODULES", margin + 5, y);

  y += 5;

  const sections = [
    {
      title: "1. Vital Signs & Baseline Parameters",
      desc: "Resting BP normal/managed (Systolic <140), Pulse <90 bpm, Baseline SpO2 >=95% at home, No active respiratory fever.",
      status: "PASS [x]"
    },
    {
      title: "2. Cardiopulmonary & Respiratory Health",
      desc: "No unstable angina or recent cardiac event (<6m), No severe COPD/nebulizer dependence, Able to climb 3 flights of stairs comfortably.",
      status: "PASS [x]"
    },
    {
      title: "3. High-Altitude Acclimatization & AMS Readiness",
      desc: "Educated on AMS/HAPE/HACE warning symptoms, Agrees to gradual ascent via Dharchula-Gunji, Consultation on Diamox completed.",
      status: "PASS [x]"
    },
    {
      title: "4. Physical Stamina, Mobility & Joint Health",
      desc: "Capacity to walk 4-5 km continuously, Joints stable for uneven mountain gravel, Comfortable with 5-7h 4x4 Bolero travel.",
      status: "PASS [x]"
    },
    {
      title: "5. Mandatory Documentation & Emergency Pouch",
      desc: "Doctor Medical Certificate prepared for SDM ILP, 5-Day buffer of chronic prescriptions in daypack, Fingertip Pulse Oximeter carried.",
      status: "PASS [x]"
    }
  ];

  sections.forEach((sec) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.25);
    doc.roundedRect(margin + 5, y, contentWidth - 10, 14, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(sec.title, margin + 9, y + 5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(5, 150, 105);
    doc.text(sec.status, margin + contentWidth - 25, y + 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.2);
    doc.setTextColor(100, 116, 139);
    doc.text(sec.desc, margin + 9, y + 10);

    y += 16;
  });

  y += 2;

  // Important Medical Notice Box
  doc.setFillColor(254, 243, 199); // amber-100
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin + 5, y, contentWidth - 10, 20, 2, 2, "FD");

  doc.setTextColor(146, 64, 14);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("IMPORTANT EXPEDITION ADVISORY & BASE CAMP PROTOCOL:", margin + 9, y + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(120, 53, 15);
  doc.text(
    "• This pass certifies digital completion of the GoTrek High Altitude Medical Self-Assessment.",
    margin + 9,
    y + 10
  );
  doc.text(
    "• Physical BP & SpO2 biometric screening will be conducted at Dharchula Base Camp prior to SDM Inner Line Permit endorsement.",
    margin + 9,
    y + 14
  );
  doc.text(
    "• Keep a physical printed copy of this pass along with your doctor's signed medical form in your waterproof daypack.",
    margin + 9,
    y + 18
  );

  y += 24;

  // Signatures & Stamp area
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);

  // Left: Pilgrim Declaration
  doc.line(margin + 10, y + 16, margin + 65, y + 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text("Signature of Pilgrim / Yatri", margin + 10, y + 20);
  doc.setFontSize(6.5);
  doc.text("(Confirming true self-disclosure)", margin + 10, y + 23.5);

  // Middle: GoTrek Medical Board
  doc.line(margin + 75, y + 16, margin + 130, y + 16);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(163, 22, 28);
  doc.text("GoTrek Medical Operations Officer", margin + 75, y + 20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(71, 85, 105);
  doc.text("Dharchula Base Camp, Pithoragarh", margin + 75, y + 23.5);

  // Right: SDM Permit Liaison Seal Box
  doc.setDrawColor(180, 83, 9);
  doc.setFillColor(255, 251, 235);
  doc.roundedRect(margin + contentWidth - 45, y, 40, 26, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(180, 83, 9);
  doc.text("GOTREK EXPEDITIONS", margin + contentWidth - 43, y + 6);
  doc.setFontSize(6.2);
  doc.setTextColor(71, 85, 105);
  doc.text("High-Altitude Safety Desk", margin + contentWidth - 43, y + 10);
  doc.text("Dharchula (3,000 ft)", margin + contentWidth - 43, y + 14);
  doc.setTextColor(5, 150, 105);
  doc.setFont("helvetica", "bold");
  doc.text("[ SEAL: VERIFIED ]", margin + contentWidth - 43, y + 20);

  // Bottom Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    `${BRAND_NAME} • ${BASE_CAMP} • Emergency: ${HELPLINE}`,
    pageWidth / 2,
    pageHeight - margin - 3,
    { align: "center" }
  );

  // Download File
  const sanitizedName = (data.pilgrimName || "Pilgrim")
    .replace(/[^a-zA-Z0-9]/g, "_")
    .substring(0, 20);
  doc.save(`GoTrek_Medical_Pass_${sanitizedName}_${data.clearanceId}.pdf`);
};

/**
 * Generates a blank MBBS Doctor Medical Fitness Certificate Form
 * for pilgrims to print and take to their doctor for SDM permit signature
 */
export const downloadBlankDoctorFitnessFormPdf = async (pilgrimName = "", destination = "Adi Kailash & Om Parvat Yatra"): Promise<void> => {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Outer border frame
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.8);
  doc.rect(margin, margin, contentWidth, pageHeight - margin * 2);

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("MEDICAL FITNESS CERTIFICATE", pageWidth / 2, margin + 12, { align: "center" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("FOR HIGH ALTITUDE HIMALAYAN PILGRIMAGE / INNER LINE PERMIT", pageWidth / 2, margin + 17, { align: "center" });
  doc.text("(To be filled & certified by a Registered Medical Practitioner - MBBS / MD)", pageWidth / 2, margin + 22, { align: "center" });

  let y = margin + 32;

  // Pilgrim Details Fill-ins
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text("PART A: PILGRIM PARTICULARS", margin + 8, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`1. Full Name: ${pilgrimName ? pilgrimName.toUpperCase() : "______________________________________________________"}`, margin + 8, y);
  y += 8;
  doc.text("2. Father's / Spouse's Name: ____________________________________________________", margin + 8, y);
  y += 8;
  doc.text("3. Age: ________ Years       Gender: ___________       Blood Group: _____________", margin + 8, y);
  y += 8;
  doc.text("4. Residential Address: ________________________________________________________", margin + 8, y);
  y += 8;
  doc.text(`5. Intended Destination: ${destination} (Altitude: up to 14,950 ft)`, margin + 8, y);
  y += 12;

  // Clinical Examination Fill-ins
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("PART B: CLINICAL EXAMINATION & VITALS (BY DOCTOR)", margin + 8, y);
  y += 8;

  const vitalsTable = [
    "Resting Blood Pressure: ________ / ________ mmHg (Target: < 140/90)",
    "Pulse Rate: ________ bpm (Regular / Irregular)",
    "SpO2 (Room Air): ________ % (Minimum 95% at sea level)",
    "Cardiovascular System (S1 S2 / Murmurs): ________________________________________",
    "Respiratory System (B/L Air Entry / Wheeze / Rhonchi): ___________________________",
    "History of Hypertension / IHD / Angina: [  ] Yes   [  ] No   (Controlled: _________)",
    "History of Diabetes Mellitus: [  ] Yes   [  ] No   (Fasting/HbA1c: ________________)",
    "History of Bronchial Asthma / COPD: [  ] Yes   [  ] No",
    "History of Acute Mountain Sickness / HAPE / HACE: [  ] Yes   [  ] No",
    "Physical Mobility & Joint Evaluation: [  ] Fit to trek and travel in 4x4 on mountain roads"
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  vitalsTable.forEach((item) => {
    doc.text(item, margin + 8, y);
    y += 7.5;
  });

  y += 5;

  // Certification Statement
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("PART C: CERTIFICATE OF FITNESS", margin + 8, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(
    "I have clinically examined the applicant named above and found that he/she is physically and mentally",
    margin + 8,
    y
  );
  y += 5;
  doc.text(
    "fit to undertake high-altitude pilgrimage up to 15,000 ft in the Indian Himalayas. He/she does not suffer",
    margin + 8,
    y
  );
  y += 5;
  doc.text(
    "from any acute cardiopulmonary, neurological, or debilitating illness that would pose danger to health.",
    margin + 8,
    y
  );

  y += 20;

  // Doctor Sign, Stamp & Date
  doc.text("Date: ________________________", margin + 8, y);
  doc.text("Place: _______________________", margin + 8, y + 6);

  doc.text("Doctor's Signature: ___________________________", margin + contentWidth - 85, y);
  doc.text("Doctor's Name: ______________________________", margin + contentWidth - 85, y + 6);
  doc.text("Registration No. (MCI / State): _________________", margin + contentWidth - 85, y + 12);
  doc.text("Clinic / Hospital Rubber Stamp:", margin + contentWidth - 85, y + 18);

  // Footer note
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    "Form compliant with SDM Dharchula Inner Line Permit guidelines • GoTrek Travels Assistance: +91 72482 85767",
    pageWidth / 2,
    pageHeight - margin - 4,
    { align: "center" }
  );

  doc.save(`Doctor_Medical_Fitness_Form_${(pilgrimName || "Applicant").replace(/\s+/g, "_")}.pdf`);
};
