export interface ItineraryPdfData {
  title: string;
  subtitle?: string;
  duration?: string;
  altitude?: string;
  startingPoint?: string;
  endingPoint?: string;
  bestSeason?: string;
  difficulty?: string;
  price?: string | number;
  highlights?: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    stay?: string;
    altitude?: string;
    meals?: string;
    activities?: string[];
  }[];
  inclusions?: string[];
  exclusions?: string[];
  permitsRequired?: string[];
  importantNotes?: string[];
}

export async function generateItineraryPdf(data: ItineraryPdfData) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2; // 182mm
  const bottomMargin = 22; // 275mm max Y

  // Brand Palette
  const slate900 = [15, 23, 42];    // #0F172A
  const slate800 = [30, 41, 59];    // #1E293B
  const slate600 = [71, 85, 105];   // #475569
  const slate500 = [100, 116, 139]; // #64748B
  const amber600 = [217, 119, 6];   // #D97706
  const amber700 = [180, 83, 9];    // #B45309
  const emerald700 = [4, 120, 87];  // #047857
  const red700 = [185, 28, 28];     // #B91C1C
  const cardBg = [248, 250, 252];   // #F8FAFC
  const borderCol = [226, 232, 240];// #E2E8F0

  let y = 0;

  // Helper to check if a block fits on current page
  const ensureSpace = (requiredHeight: number): void => {
    if (y + requiredHeight > pageHeight - bottomMargin) {
      doc.addPage();
      y = 20; // Top padding on page 2+
    }
  };

  // --- 1. COVER HEADER BANNER ---
  doc.setFillColor(slate900[0], slate900[1], slate900[2]);
  doc.rect(0, 0, pageWidth, 36, "F");

  // Warm Amber Accent Bar
  doc.setFillColor(amber600[0], amber600[1], amber600[2]);
  doc.rect(0, 36, pageWidth, 2.5, "F");

  // Header Title & Logo Mark
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("GOTREK TRAVELS", marginX, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(253, 230, 138); // Amber 200
  doc.text("Sacred High-Altitude & Inner Line Expedition Specialists", marginX, 19);

  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225); // Slate 300
  doc.text("Govt. Reg. #UTTR/PITHORAGARH/04-2026/450066 | MSME UDYAM-UK-09-0011014 | GST 05CEQPB8319P1ZX", marginX, 24);
  doc.text("Helpline: +91 72482 85767 | Email: mailgotrek@gmail.com | Web: gotrek.in", marginX, 29);

  // Document Badge (Right Side)
  doc.setFillColor(slate800[0], slate800[1], slate800[2]);
  doc.roundedRect(pageWidth - marginX - 52, 8, 52, 22, 2, 2, "F");
  doc.setDrawColor(amber600[0], amber600[1], amber600[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(pageWidth - marginX - 52, 8, 52, 22, 2, 2, "S");

  doc.setTextColor(253, 230, 138);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("OFFICIAL EXPEDITION DOSSIER", pageWidth - marginX - 50, 14);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  doc.text(`Issued: ${today}`, pageWidth - marginX - 50, 19);
  doc.text("Status: 2027 Batches Open", pageWidth - marginX - 50, 24);

  // --- 2. EXPEDITION TITLE SECTION ---
  y = 44;
  doc.setTextColor(slate900[0], slate900[1], slate900[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  
  const titleLines = doc.splitTextToSize(data.title.toUpperCase(), contentWidth);
  doc.text(titleLines, marginX, y);
  y += titleLines.length * 6;

  if (data.subtitle) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(amber700[0], amber700[1], amber700[2]);
    const subtitleLines = doc.splitTextToSize(data.subtitle, contentWidth);
    doc.text(subtitleLines, marginX, y);
    y += subtitleLines.length * 4.5 + 2;
  } else {
    y += 2;
  }

  // --- 3. KEY SPECIFICATIONS MATRIX (6-BOX GRID) ---
  ensureSpace(28);
  const boxW = (contentWidth - 6) / 3; // 3 columns
  const boxH = 12;

  const specData = [
    { label: "DURATION", value: data.duration || "6 Days / 5 Nights" },
    { label: "MAX ALTITUDE", value: data.altitude || "14,500 ft (Jolingkong)" },
    { label: "STARTING BASE", value: data.startingPoint || "Kathgodam / Dharchula" },
    { label: "BEST SEASON", value: data.bestSeason || "May – June & Sept – Oct" },
    { label: "DIFFICULTY / ROUTE", value: data.difficulty || "Moderate (4x4 Expedition)" },
    { label: "PERMIT LIAISON", value: "SDM Dharchula & ITBP" },
  ];

  for (let i = 0; i < specData.length; i++) {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const bx = marginX + col * (boxW + 3);
    const by = y + row * (boxH + 2.5);

    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.roundedRect(bx, by, boxW, boxH, 1.5, 1.5, "F");

    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.setLineWidth(0.2);
    doc.roundedRect(bx, by, boxW, boxH, 1.5, 1.5, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(slate500[0], slate500[1], slate500[2]);
    doc.text(specData[i].label, bx + 3, by + 4.2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(slate800[0], slate800[1], slate800[2]);
    const valText = doc.splitTextToSize(specData[i].value, boxW - 6)[0] || "";
    doc.text(valText, bx + 3, by + 8.8);
  }

  y += Math.ceil(specData.length / 3) * (boxH + 2.5) + 4;

  // --- 4. SACRED HIGHLIGHTS (If present) ---
  if (data.highlights && data.highlights.length > 0) {
    const hlItems = data.highlights.slice(0, 6);
    const estimatedHeight = 10 + Math.ceil(hlItems.length / 2) * 6;
    ensureSpace(estimatedHeight);

    // Section Header
    doc.setFillColor(slate800[0], slate800[1], slate800[2]);
    doc.roundedRect(marginX, y, contentWidth, 6, 1, 1, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("EXPEDITION & PILGRIMAGE HIGHLIGHTS", marginX + 4, y + 4.2);
    y += 8;

    const colW = (contentWidth - 4) / 2;
    for (let i = 0; i < hlItems.length; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const hx = marginX + col * (colW + 4);
      const hy = y + row * 6;

      // Golden diamond bullet
      doc.setFillColor(amber600[0], amber600[1], amber600[2]);
      doc.circle(hx + 2, hy + 2, 1, "F");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(slate800[0], slate800[1], slate800[2]);
      const hlText = doc.splitTextToSize(hlItems[i], colW - 6)[0];
      doc.text(hlText, hx + 5, hy + 3);
    }

    y += Math.ceil(hlItems.length / 2) * 6 + 4;
  }

  // --- 5. DETAILED DAY-BY-DAY ITINERARY ---
  ensureSpace(12);
  doc.setFillColor(amber700[0], amber700[1], amber700[2]);
  doc.roundedRect(marginX, y, contentWidth, 6.5, 1, 1, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text("DAY-BY-DAY COMPREHENSIVE ITINERARY", marginX + 4, y + 4.5);
  y += 9;

  data.itinerary.forEach((item) => {
    const descLines = doc.splitTextToSize(item.description, contentWidth - 10);
    const descHeight = descLines.length * 3.6;
    const metaHeight = (item.stay || item.altitude || item.meals) ? 5 : 0;
    const activitiesHeight = (item.activities && item.activities.length > 0) ? (Math.min(item.activities.length, 3) * 4 + 2) : 0;
    const itemTotalHeight = 9 + metaHeight + descHeight + activitiesHeight + 4;

    ensureSpace(itemTotalHeight);

    // Day Container Card
    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.roundedRect(marginX, y, contentWidth, itemTotalHeight - 2, 1.5, 1.5, "F");

    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.setLineWidth(0.25);
    doc.roundedRect(marginX, y, contentWidth, itemTotalHeight - 2, 1.5, 1.5, "S");

    // Day Badge Pill
    doc.setFillColor(slate900[0], slate900[1], slate900[2]);
    doc.roundedRect(marginX + 2.5, y + 2.5, 14, 4.5, 1, 1, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.text(`DAY ${item.day}`, marginX + 3.8, y + 5.7);

    // Day Title
    doc.setTextColor(slate900[0], slate900[1], slate900[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    const dayTitle = doc.splitTextToSize(item.title, contentWidth - 22)[0];
    doc.text(dayTitle, marginX + 19, y + 5.8);

    let innerY = y + 9.5;

    // Metadata Strip (Stay / Altitude / Meals)
    if (item.stay || item.altitude || item.meals) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(slate600[0], slate600[1], slate600[2]);

      const metaParts: string[] = [];
      if (item.stay) metaParts.push(`Stay: ${item.stay}`);
      if (item.altitude) metaParts.push(`Altitude: ${item.altitude}`);
      if (item.meals) metaParts.push(`Meals: ${item.meals}`);

      doc.text(metaParts.join("  |  "), marginX + 3.5, innerY);
      innerY += 4.5;
    }

    // Description text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(slate800[0], slate800[1], slate800[2]);
    doc.text(descLines, marginX + 3.5, innerY);
    innerY += descHeight;

    // Activities tags if present
    if (item.activities && item.activities.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(amber700[0], amber700[1], amber700[2]);
      const actStr = `• Key Sights: ${item.activities.slice(0, 3).join(" • ")}`;
      const actLines = doc.splitTextToSize(actStr, contentWidth - 10);
      doc.text(actLines, marginX + 3.5, innerY + 1);
    }

    y += itemTotalHeight;
  });

  // --- 6. INCLUSIONS & EXCLUSIONS TABLE ---
  const defaultInclusions = [
    "4x4 Heavy Bolero / Camper with experienced high-altitude Himalayan driver",
    "All nights accommodation in standard/deluxe Rung community homestays / hotels",
    "All Sattvik vegetarian meals (Daily Breakfast, Hot Lunch, Evening Tea, Hot Dinner)",
    "Govt. Inner Line Permit (ILP) documentation, SDM liaison & ITBP border approvals",
    "Medical emergency kit, certified high-altitude oxygen cylinder in vehicle",
    "Dedicated local trip coordinator & 24/7 Pithoragarh base operations monitoring",
  ];

  const defaultExclusions = [
    "Personal expenses, laundry, mineral water, snacks, and extra beverages",
    "Pony, mule, porter, doli or palki charges during walking segments",
    "Emergency medical evacuation or unscheduled helicopter airlift expenses",
    "Any cost arising due to natural roadblocks, landslides, or weather delays",
    "5% GST and personal high-altitude travel insurance",
  ];

  const incList = (data.inclusions && data.inclusions.length > 0) ? data.inclusions : defaultInclusions;
  const excList = (data.exclusions && data.exclusions.length > 0) ? data.exclusions : defaultExclusions;

  const maxItems = Math.max(incList.length, excList.length);
  const incBoxH = 12 + maxItems * 4.8;
  ensureSpace(incBoxH + 8);

  const halfWidth = (contentWidth - 4) / 2;

  // Inclusions Box
  doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
  doc.roundedRect(marginX, y, halfWidth, incBoxH, 1.5, 1.5, "F");
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.setLineWidth(0.25);
  doc.roundedRect(marginX, y, halfWidth, incBoxH, 1.5, 1.5, "S");

  // Inclusions Header
  doc.setFillColor(emerald700[0], emerald700[1], emerald700[2]);
  doc.roundedRect(marginX, y, halfWidth, 6, 1.5, 1.5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text("WHAT'S INCLUDED IN PACKAGE", marginX + 3.5, y + 4.2);

  let incY = y + 9.5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(slate800[0], slate800[1], slate800[2]);
  incList.forEach((inc) => {
    doc.setTextColor(emerald700[0], emerald700[1], emerald700[2]);
    doc.text("✓", marginX + 3, incY);
    doc.setTextColor(slate800[0], slate800[1], slate800[2]);
    const lines = doc.splitTextToSize(inc, halfWidth - 9);
    doc.text(lines[0] || "", marginX + 7, incY);
    incY += 4.5;
  });

  // Exclusions Box
  const excX = marginX + halfWidth + 4;
  doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
  doc.roundedRect(excX, y, halfWidth, incBoxH, 1.5, 1.5, "F");
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.setLineWidth(0.25);
  doc.roundedRect(excX, y, halfWidth, incBoxH, 1.5, 1.5, "S");

  // Exclusions Header
  doc.setFillColor(red700[0], red700[1], red700[2]);
  doc.roundedRect(excX, y, halfWidth, 6, 1.5, 1.5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text("WHAT'S NOT INCLUDED (EXCLUSIONS)", excX + 3.5, y + 4.2);

  let excY = y + 9.5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  excList.forEach((exc) => {
    doc.setTextColor(red700[0], red700[1], red700[2]);
    doc.text("✗", excX + 3, excY);
    doc.setTextColor(slate800[0], slate800[1], slate800[2]);
    const lines = doc.splitTextToSize(exc, halfWidth - 9);
    doc.text(lines[0] || "", excX + 7, excY);
    excY += 4.5;
  });

  y += incBoxH + 4;

  // --- 7. PERMITS & ESSENTIAL PROTOCOLS (Bottom Guide) ---
  ensureSpace(28);
  doc.setFillColor(slate900[0], slate900[1], slate900[2]);
  doc.roundedRect(marginX, y, contentWidth, 24, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(253, 230, 138); // Amber 200
  doc.text("MANDATORY GOVT PERMIT & HIGH-ALTITUDE HEALTH GUIDELINES", marginX + 4, y + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  doc.setTextColor(241, 245, 249); // Slate 100
  doc.text("• Required Documents: Original Aadhar Card + 4 Photocopies, Medical Fitness Certificate by MBBS Doctor, Police Clearance.", marginX + 4, y + 9.5);
  doc.text("• Permit Authority: SDM Dharchula / District Administration Pithoragarh. GoTrek operations team handles filing in advance.", marginX + 4, y + 13.5);
  doc.text("• Acclimatization Note: Hydrate with 3-4 liters daily. Layer warm clothing (inner thermal + fleece + windproof jacket).", marginX + 4, y + 17.5);
  doc.text("• 24x7 Ground Control: Roadways Workshop Rd, Chandrabhaga, Pithoragarh, Uttarakhand. Direct Hotline: +91 72482 85767.", marginX + 4, y + 21.5);

  y += 28;

  // --- 8. GLOBAL RUNNING HEADERS & FOOTERS (All Pages) ---
  const totalPages = doc.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Running Header (Page 2+)
    if (i > 1) {
      doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
      doc.setLineWidth(0.3);
      doc.line(marginX, 12, pageWidth - marginX, 12);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(slate600[0], slate600[1], slate600[2]);
      doc.text("GOTREK TRAVELS PITHORAGARH — OFFICIAL EXPEDITION ITINERARY 2027", marginX, 9.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(amber700[0], amber700[1], amber700[2]);
      const shortTitle = data.title.length > 40 ? data.title.slice(0, 37) + "..." : data.title;
      doc.text(shortTitle, pageWidth - marginX - doc.getTextWidth(shortTitle), 9.5);
    }

    // Running Footer (Every Page)
    const footerY = pageHeight - 10;
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.setLineWidth(0.3);
    doc.line(marginX, footerY - 3, pageWidth - marginX, footerY - 3);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(slate600[0], slate600[1], slate600[2]);
    doc.text("GoTrek Travels • Pithoragarh HQ • +91 72482 85767 • gotrek.in", marginX, footerY + 1);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(slate500[0], slate500[1], slate500[2]);
    const pageStr = `Page ${i} of ${totalPages}`;
    doc.text(pageStr, pageWidth - marginX - doc.getTextWidth(pageStr), footerY + 1);
  }

  // Save the PDF
  const sanitizedTitle = data.title.toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 40);
  const filename = `gotrek_${sanitizedTitle}_itinerary_2027.pdf`;
  doc.save(filename);
}
