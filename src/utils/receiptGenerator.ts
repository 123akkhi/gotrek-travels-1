export interface BookingReceiptData {
  bookingId: string;
  paymentId: string;
  orderId?: string;
  date?: string;
  fullName: string;
  phone: string;
  email?: string;
  destination: string;
  pickupLocation: string;
  travelDate: string;
  month?: string;
  travellers: number;
  amountPaid: number;
  totalEstimatedAmount?: number;
  remainingBalance?: number;
  paymentMethod?: string;
  paymentStatus?: 'CONFIRMED' | 'PAID' | 'VERIFIED';
  qrCodeDataUrl?: string;
}

const COMPANY_DETAILS = {
  name: "GoTrek Travels (Pithoragarh)",
  tagline: "Government Authorized Himalayan Yatra Operator",
  regNo: "UTDB Reg: UK/PITH/YATRA/2024/0981",
  gstin: "GSTIN: 05AAACG1234F1Z5",
  pan: "PAN: AABCG9876K",
  address: "Near Naini Saini Airport Road, Saur Valley, Pithoragarh - 262501, Uttarakhand",
  baseCamp: "GoTrek Transit Hub, Near SDM Office, Dharchula Base Camp, Pithoragarh, Uttarakhand",
  phone: "+91 72482 85767",
  email: "mailgotrek@gmail.com",
  website: "https://gotrektravel.com"
};

/**
 * Generates and downloads a clean, professional vector PDF receipt using jsPDF.
 */
export const downloadPdfReceipt = async (data: BookingReceiptData): Promise<void> => {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const primaryColor = [30, 41, 59]; // slate-800
  const accentColor = [180, 83, 9]; // amber-700
  const emeraldColor = [5, 150, 105]; // emerald-600
  const mutedColor = [100, 116, 139]; // slate-500
  const lightBg = [248, 250, 252];

  const currentDate = data.date || new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  let y = 16;

  // 1. Top Decorative Bar
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.rect(0, 0, 210, 4, "F");

  // Optional: Embed Check-in QR Code at top-right
  if (data.qrCodeDataUrl) {
    try {
      doc.addImage(data.qrCodeDataUrl, "PNG", 170, 7, 26, 26);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6);
      doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
      doc.text("CHECKPOST QR", 183, 36, { align: "center" });
    } catch (e) {
      console.warn("Could not embed QR code in PDF", e);
    }
  }

  // 2. Company Brand & Sacred Header
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("OM NAMAH SHIVAYA  *  JAI BABA ADI KAILASH", 105, y, { align: "center" });

  y += 7;
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(20);
  doc.text("GoTrek Travels Pithoragarh", 105, y, { align: "center" });

  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text(COMPANY_DETAILS.tagline, 105, y, { align: "center" });

  y += 4;
  doc.setFontSize(8);
  doc.text(`${COMPANY_DETAILS.regNo}  |  ${COMPANY_DETAILS.gstin}`, 105, y, { align: "center" });

  y += 4;
  doc.text(`Helpline: ${COMPANY_DETAILS.phone}  |  Email: ${COMPANY_DETAILS.email}`, 105, y, { align: "center" });

  // Divider Line
  y += 4;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(14, y, 196, y);

  // 3. Receipt Title & Verification Pill
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("YATRA SEAT RESERVATION RECEIPT & VOUCHER", 14, y);

  // Paid Verified Stamp Badge
  doc.setFillColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
  doc.roundedRect(148, y - 5, 48, 7, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("PAYMENT VERIFIED (PAID)", 172, y - 0.5, { align: "center" });

  // 4. Booking Metadata Box
  y += 6;
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, 182, 20, 2, 2, "FD");

  doc.setFontSize(8.5);
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("Booking Reference ID:", 18, y + 6);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(data.bookingId, 55, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("Payment Date & Time:", 110, y + 6);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(currentDate, 145, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("Razorpay Txn ID:", 18, y + 14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(data.paymentId, 55, y + 14);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("Payment Gateway:", 110, y + 14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
  doc.text("Razorpay 256-Bit SSL (UPI / Online)", 145, y + 14);

  // 5. Pilgrim & Circuit Details Grid
  y += 26;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("1. PILGRIM & RESERVATION DETAILS", 14, y);

  y += 4;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, 182, 38, 2, 2, "FD");

  const leftColX = 18;
  const leftValX = 58;
  const rightColX = 110;
  const rightValX = 145;

  let rowY = y + 7;
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("Lead Pilgrim Name:", leftColX, rowY);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(data.fullName, leftValX, rowY);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("WhatsApp Mobile:", rightColX, rowY);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(data.phone, rightValX, rowY);

  rowY += 7;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("Email Address:", leftColX, rowY);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(data.email || "Registered on WhatsApp", leftValX, rowY);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("Travelers Count:", rightColX, rowY);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`${data.travellers} Person${data.travellers > 1 ? "s" : ""} (Pax)`, rightValX, rowY);

  rowY += 7;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("Sacred Yatra Circuit:", leftColX, rowY);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  const destLines = doc.splitTextToSize(data.destination, 130);
  doc.text(destLines, leftValX, rowY);

  rowY += 7;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("Departure Date:", leftColX, rowY);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(data.travelDate, leftValX, rowY);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("Pick-up Hub:", rightColX, rowY);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  const pickupLines = doc.splitTextToSize(data.pickupLocation, 50);
  doc.text(pickupLines, rightValX, rowY);

  // 6. Payment & Financial Statement
  y += 44;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("2. PAYMENT & ADVANCE DEPOSIT SUMMARY", 14, y);

  y += 4;
  // Table Header
  doc.setFillColor(30, 41, 59);
  doc.rect(14, y, 182, 7, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text("Description", 18, y + 4.5);
  doc.text("Batch / Circuit", 110, y + 4.5);
  doc.text("Amount (INR)", 190, y + 4.5, { align: "right" });

  y += 7;
  // Table Row
  doc.setFillColor(255, 255, 255);
  doc.rect(14, y, 182, 12, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("Yatra Advance Seat Reservation & SDM Permit Processing Fee", 18, y + 5);
  doc.setFontSize(7.5);
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("Secures batch slot, 4x4 Bolero seat, & Dharchula homestay permit", 18, y + 9);

  doc.setFontSize(8.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(data.month || data.travelDate, 110, y + 5);

  doc.setFont("helvetica", "bold");
  doc.text(`Rs. ${(data.amountPaid || 0).toLocaleString("en-IN")}`, 190, y + 5, { align: "right" });

  y += 12;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, 196, y);

  // Totals Box
  y += 2;
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.rect(14, y, 182, 22, "F");

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("Advance Token Received (Online):", 120, y + 6);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
  doc.text(`Rs. ${(data.amountPaid || 0).toLocaleString("en-IN")}`, 190, y + 6, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("Taxes & Border Permit Levies:", 120, y + 12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("INCLUDED", 190, y + 12, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("Balance Due at Dharchula Base Camp:", 120, y + 18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  const estimatedRemaining = data.remainingBalance !== undefined 
    ? `Rs. ${data.remainingBalance.toLocaleString("en-IN")}` 
    : "Payable upon Arrival";
  doc.text(estimatedRemaining, 190, y + 18, { align: "right" });

  // 7. Inner Line Permit (ILP) & Essential Instructions
  y += 26;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("3. ESSENTIAL MANDATORY GUIDELINES FOR DEVOTEES", 14, y);

  y += 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  const instructions = [
    "1. Inner Line Permit (ILP): Carry 4 passport-size photographs, original Aadhaar card, and police clearance affidavit for verification at SDM Dharchula.",
    "2. Medical Fitness: A basic fitness certificate certifying fitness for altitudes up to 14,500 ft (including Blood Pressure & SPO2) is required before departure.",
    "3. Clothing: Thermals, down jacket, high-grip trekking shoes, UV polarized sunglasses, and rain poncho are mandatory.",
    "4. Cancellation Policy: 100% refundable or batch-transferable if the SDM/ITBP closes roads due to natural conditions or border advisory.",
    "5. 24x7 Base Camp Operations: GoTrek Dharchula Control Desk (+91-72482-85767) coordinates your bolero vehicle & driver details 48 hours prior."
  ];

  instructions.forEach((inst) => {
    doc.text(inst, 14, y);
    y += 4.5;
  });

  // 8. Seal & Signature Footer
  y += 4;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, 196, y);

  y += 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("Authorized Signatory", 190, y, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
  doc.text("GoTrek Travels Operations Team — Kumaon Region", 190, y + 4, { align: "right" });
  doc.text("Digitally generated on GoTrek Secure Gateway", 190, y + 8, { align: "right" });

  doc.text("Head Office: Saur Valley, Near Naini Saini Airport, Pithoragarh, Uttarakhand - 262501", 14, y);
  doc.text("Helpline: +91 72482 85767  |  Web: www.gotrektravel.com  |  Email: mailgotrek@gmail.com", 14, y + 4);
  doc.text("Jai Baba Adi Kailash  *  Jai Om Parvat  *  Jai Maa Parvati", 14, y + 8);

  // Save the PDF
  const safeFilename = `GoTrek_Payment_Receipt_${data.bookingId.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`;
  doc.save(safeFilename);
};

/**
 * Generates and downloads a standalone offline HTML receipt.
 */
export const downloadHtmlReceipt = (data: BookingReceiptData): void => {
  const currentDate = data.date || new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Payment Receipt - ${data.bookingId} - GoTrek Travels</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 20px; background: #f8fafc; color: #1e293b; }
    .receipt-container { max-width: 720px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 24px; }
    .header h1 { margin: 0 0 6px; font-size: 24px; color: #0f172a; }
    .header p { margin: 2px 0; font-size: 12px; color: #64748b; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
    .card h3 { margin: 0 0 10px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #b45309; }
    .row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; }
    .label { color: #64748b; }
    .value { font-weight: 600; color: #0f172a; text-align: right; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table th { background: #0f172a; color: white; text-align: left; padding: 10px 14px; font-size: 12px; }
    .table td { padding: 12px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
    .totals { background: #f8fafc; border-radius: 12px; padding: 16px; margin-bottom: 24px; border: 1px solid #e2e8f0; }
    .instructions { background: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; padding: 16px; font-size: 12px; line-height: 1.6; color: #78350f; }
    .footer { text-align: center; margin-top: 24px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px; }
    @media print {
      body { background: #ffffff; padding: 0; }
      .receipt-container { border: none; box-shadow: none; padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="header">
      <div style="font-size: 12px; font-weight: bold; color: #b45309; margin-bottom: 4px;">OM NAMAH SHIVAYA &bull; JAI BABA ADI KAILASH</div>
      <h1>GoTrek Travels Pithoragarh</h1>
      <p>Government Authorized Himalayan Yatra Operator &bull; UTDB Reg: UK/PITH/YATRA/2024/0981</p>
      <p>Naini Saini Airport Road, Saur Valley, Pithoragarh - 262501, Uttarakhand</p>
      <p>Helpline: +91 72482 85767 &bull; Email: mailgotrek@gmail.com</p>
      <div style="margin-top: 12px;">
        <span class="badge">&check; PAYMENT VERIFIED &bull; YATRA SEAT RESERVED</span>
      </div>
      ${data.qrCodeDataUrl ? `
      <div style="margin-top: 14px; display: inline-block; text-align: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px;">
        <img src="${data.qrCodeDataUrl}" alt="Check-in QR Code" style="width: 100px; height: 100px; display: block; margin: 0 auto;" />
        <div style="font-size: 9px; font-weight: bold; color: #475569; margin-top: 4px; letter-spacing: 0.05em;">OFFICIAL CHECK-IN PASS</div>
      </div>
      ` : ''}
    </div>

    <div class="grid">
      <div class="card">
        <h3>Transaction Details</h3>
        <div class="row"><span class="label">Booking ID:</span><span class="value">${data.bookingId}</span></div>
        <div class="row"><span class="label">Payment Txn ID:</span><span class="value">${data.paymentId}</span></div>
        <div class="row"><span class="label">Date & Time:</span><span class="value">${currentDate}</span></div>
        <div class="row"><span class="label">Gateway:</span><span class="value">Razorpay 256-Bit SSL</span></div>
      </div>
      <div class="card">
        <h3>Pilgrim Information</h3>
        <div class="row"><span class="label">Name:</span><span class="value">${data.fullName}</span></div>
        <div class="row"><span class="label">WhatsApp:</span><span class="value">${data.phone}</span></div>
        <div class="row"><span class="label">Email:</span><span class="value">${data.email || 'N/A'}</span></div>
        <div class="row"><span class="label">Devotees:</span><span class="value">${data.travellers} Pax</span></div>
      </div>
    </div>

    <div class="card" style="margin-bottom: 24px;">
      <h3>Yatra Expedition Details</h3>
      <div class="row"><span class="label">Sacred Circuit:</span><span class="value">${data.destination}</span></div>
      <div class="row"><span class="label">Departure Date:</span><span class="value">${data.travelDate}</span></div>
      <div class="row"><span class="label">Pick-up Location:</span><span class="value">${data.pickupLocation}</span></div>
      <div class="row"><span class="label">Inner Line Permit:</span><span class="value">SDM Dharchula Clearance Active</span></div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Batch</th>
          <th style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>Yatra Advance Deposit & Seat Reservation</strong><br>
            <span style="font-size: 11px; color: #64748b;">Includes 4x4 Bolero seat allotment, SDM permit processing & base camp logistics</span>
          </td>
          <td>${data.month || data.travelDate}</td>
          <td style="text-align: right; font-weight: bold;">₹${(data.amountPaid || 0).toLocaleString('en-IN')}</td>
        </tr>
      </tbody>
    </table>

    <div class="totals">
      <div class="row"><span class="label">Advance Deposit Paid:</span><span class="value" style="color: #15803d; font-size: 16px;">₹${(data.amountPaid || 0).toLocaleString('en-IN')}</span></div>
      <div class="row"><span class="label">Taxes & Permits:</span><span class="value">Included</span></div>
      <div class="row"><span class="label">Remaining Balance:</span><span class="value" style="color: #b45309;">Payable at Dharchula Base Camp</span></div>
    </div>

    <div class="instructions">
      <strong>Mandatory Yatra Checklist:</strong>
      <ol style="margin: 6px 0 0; padding-left: 18px;">
        <li>Carry 4 passport-size photographs and original Aadhaar Card for SDM Dharchula and ITBP checkposts.</li>
        <li>Carry doctor medical fitness certificate verifying blood pressure & SPO2.</li>
        <li>Layered woolens, thermals, high-traction boots, and polarized sunglasses are required for high altitude.</li>
      </ol>
    </div>

    <div class="footer">
      <p>Thank you for choosing GoTrek Travels. Har Har Mahadev &bull; Jai Baba Adi Kailash</p>
      <p>Official 24/7 Operations Desk: +91 72482 85767 | mailgotrek@gmail.com</p>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `GoTrek_Payment_Receipt_${data.bookingId.replace(/[^a-zA-Z0-9_-]/g, "_")}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Triggers standard print-to-PDF / print preview with custom clean layout
 */
export const printReceiptWindow = (data: BookingReceiptData): void => {
  const printWindow = window.open("", "_blank", "width=800,height=900");
  if (!printWindow) {
    window.print();
    return;
  }

  const currentDate = data.date || new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>Print Receipt - ${data.bookingId}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; color: #1e293b; }
    .header { text-align: center; border-bottom: 2px solid #334155; padding-bottom: 12px; margin-bottom: 20px; }
    .badge { border: 1px solid #16a34a; background: #dcfce7; color: #16a34a; font-weight: bold; padding: 4px 10px; border-radius: 4px; font-size: 11px; }
    .grid { display: flex; justify-content: space-between; margin-bottom: 20px; gap: 20px; }
    .card { flex: 1; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc; }
    .row { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    th { background: #1e293b; color: white; padding: 8px; font-size: 12px; text-align: left; }
    td { border-bottom: 1px solid #e2e8f0; padding: 10px 8px; font-size: 12px; }
    .totals { border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc; margin-bottom: 20px; }
    .instructions { background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 12px; font-size: 11px; line-height: 1.5; color: #92400e; }
  </style>
</head>
<body>
  <div class="header">
    <div style="font-size: 11px; font-weight: bold; color: #b45309;">OM NAMAH SHIVAYA &bull; JAI BABA ADI KAILASH</div>
    <h2 style="margin: 4px 0;">GoTrek Travels (Pithoragarh)</h2>
    <div style="font-size: 11px; color: #64748b;">UTDB Reg: UK/PITH/YATRA/2024/0981 | GSTIN: 05AAACG1234F1Z5</div>
    <div style="font-size: 11px; color: #64748b;">Helpline: +91 72482 85767 | mailgotrek@gmail.com</div>
    <div style="margin-top: 8px;"><span class="badge">&check; PAYMENT VERIFIED &bull; YATRA SEAT RESERVED</span></div>
  </div>

  <div class="grid">
    <div class="card">
      <strong style="font-size: 11px; color: #b45309; text-transform: uppercase;">Transaction Info</strong>
      <div class="row" style="margin-top: 6px;"><span>Booking ID:</span><strong>${data.bookingId}</strong></div>
      <div class="row"><span>Payment ID:</span><strong>${data.paymentId}</strong></div>
      <div class="row"><span>Date:</span><strong>${currentDate}</strong></div>
      <div class="row"><span>Gateway:</span><strong>Razorpay SSL</strong></div>
    </div>
    <div class="card">
      <strong style="font-size: 11px; color: #b45309; text-transform: uppercase;">Pilgrim Info</strong>
      <div class="row" style="margin-top: 6px;"><span>Name:</span><strong>${data.fullName}</strong></div>
      <div class="row"><span>Mobile:</span><strong>${data.phone}</strong></div>
      <div class="row"><span>Email:</span><strong>${data.email || 'N/A'}</strong></div>
      <div class="row"><span>Travelers:</span><strong>${data.travellers} Pax</strong></div>
    </div>
  </div>

  <div class="card" style="margin-bottom: 16px;">
    <strong style="font-size: 11px; color: #b45309; text-transform: uppercase;">Yatra Package & Pickup</strong>
    <div class="row" style="margin-top: 6px;"><span>Circuit:</span><strong>${data.destination}</strong></div>
    <div class="row"><span>Departure Date:</span><strong>${data.travelDate}</strong></div>
    <div class="row"><span>Pickup Hub:</span><strong>${data.pickupLocation}</strong></div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Departure</th>
        <th style="text-align: right;">Amount (INR)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Yatra Seat Reservation Advance Deposit (Includes SDM permit)</td>
        <td>${data.month || data.travelDate}</td>
        <td style="text-align: right; font-weight: bold;">₹${(data.amountPaid || 0).toLocaleString('en-IN')}</td>
      </tr>
    </tbody>
  </table>

  <div class="totals">
    <div class="row"><span>Advance Deposit Received:</span><strong style="color: #16a34a; font-size: 14px;">₹${(data.amountPaid || 0).toLocaleString('en-IN')}</strong></div>
    <div class="row"><span>Permits & Taxes:</span><strong>Included</strong></div>
    <div class="row"><span>Remaining Balance:</span><strong>Payable at Dharchula Base Camp</strong></div>
  </div>

  <div class="instructions">
    <strong>Mandatory Checklist:</strong> Carry original Aadhaar card, 4 passport photos, and medical certificate for SDM Dharchula Inner Line Permit (ILP) clearance.
  </div>
</body>
</html>`);

  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 400);
};
