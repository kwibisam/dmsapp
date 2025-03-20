"use client";
import React, { useRef } from "react";
const QuotationView = ({ data }) => {
  const pdfRef = useRef();

  const handlePrint = () => {
    const content = pdfRef.current;
    const printWindow = window.open(" ", "_blank");
    // Add print-specific styles
    const printStyles = `
      <style>
        @page {
          size: A4;
          margin: 1cm;
          @bottom-center {
            content: "Page " counter(page) " of " counter(pages);
            font-size: 10px;
            color: #666;
          }
        }

        @media print {
          body {
            width: 8.27in !important;
            height: 11.69in !important;
            margin: 0 auto !important;
            padding: 32px !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: 'Times New Roman', serif;
          }

          .print-footer {
            display: block !important;
            position: fixed;
            bottom: 20px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            color: #666;
          }

          .avoid-break {
            page-break-inside: avoid;
          }

          .section-break {
            margin-top: 20px;
            page-break-before: always;
          }

          table {
            page-break-inside: avoid;
          }

          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
        }

        .print-only {
          display: none;
        }

        button {
          display: none;
        }
      </style>
    `;

    printWindow.document.write(`
      <html>
        <head>
          <title>Quotation - ${data.reference}</title>
          ${printStyles}
        </head>
        <body>
          ${content.innerHTML}
          <div class="print-footer print-only">
            ${data.companyName} | ${data.contactInfo} | VAT No: ${data.vatNumber}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    };
  };

  return (
    <div>
      <button
        onClick={handlePrint}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
      >
        Print Quotation
      </button>

      {/* <button
        onClick={() => window.print()}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
      >
        Direct Print
      </button> */}

      {/* Wrap the content in a ref for PDF generation */}
      <div
        ref={pdfRef}
        style={{
          width: "8.27in",
          height: "11.69in",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "32px",
        }}
      >
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1
            style={{ fontSize: "24px", fontWeight: "bold", color: "#1e40af" }}
          >
            {data.formTitle}
          </h1>
          <p style={{ fontSize: "12px", color: "#4b5563" }}>
            {data.formAddress}
          </p>
        </div>

        {/* Attention Section */}
        <div
          style={{
            backgroundColor: "#f9fafb",
            padding: "24px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "16px",
            }}
          >
            Attention
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
            }}
          >
            {Object.entries(data.attention).map(([key, value]) => (
              <div
                key={key}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#4b5563",
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                <span style={{ fontSize: "14px", color: "#1f2937" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Date and Reference Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{ fontSize: "12px", fontWeight: "500", color: "#4b5563" }}
            >
              Date
            </span>
            <span style={{ fontSize: "14px", color: "#1f2937" }}>
              {data.date}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{ fontSize: "12px", fontWeight: "500", color: "#4b5563" }}
            >
              Reference
            </span>
            <span style={{ fontSize: "14px", color: "#1f2937" }}>
              {data.reference}
            </span>
          </div>
        </div>

        {/* Items Section */}
        <div
          style={{
            backgroundColor: "#f9fafb",
            padding: "24px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "16px",
            }}
          >
            Items
          </h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#e5e7eb" }}>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    fontSize: "12px",
                    color: "#374151",
                  }}
                >
                  Item
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    fontSize: "12px",
                    color: "#374151",
                  }}
                >
                  Description
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    fontSize: "12px",
                    color: "#374151",
                  }}
                >
                  Qty
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    fontSize: "12px",
                    color: "#374151",
                  }}
                >
                  Unit Price
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    fontSize: "12px",
                    color: "#374151",
                  }}
                >
                  Total ZMW
                </th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f3f4f6",
                  }}
                >
                  <td
                    style={{
                      padding: "8px",
                      fontSize: "12px",
                      color: "#1f2937",
                    }}
                  >
                    {item.id}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      fontSize: "12px",
                      color: "#1f2937",
                    }}
                  >
                    {item.description}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      fontSize: "12px",
                      color: "#1f2937",
                    }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      fontSize: "12px",
                      color: "#1f2937",
                    }}
                  >
                    {item.unitPrice.toFixed(2)}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      fontSize: "12px",
                      color: "#1f2937",
                    }}
                  >
                    {item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="4"
                  style={{
                    padding: "8px",
                    textAlign: "right",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  SubTotal:
                </td>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "right",
                    fontSize: "12px",
                    color: "#1f2937",
                  }}
                >
                  {data.subTotalZMW.toFixed(2)} ZMW
                </td>
              </tr>
              <tr>
                <td
                  colSpan="4"
                  style={{
                    padding: "8px",
                    textAlign: "right",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  VAT (16%):
                </td>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "right",
                    fontSize: "12px",
                    color: "#1f2937",
                  }}
                >
                  {data.VAT.toFixed(2)} ZMW
                </td>
              </tr>
              <tr style={{ backgroundColor: "#e5e7eb", fontWeight: "bold" }}>
                <td
                  colSpan="4"
                  style={{
                    padding: "8px",
                    textAlign: "right",
                    fontSize: "12px",
                    color: "#374151",
                  }}
                >
                  Total:
                </td>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "right",
                    fontSize: "12px",
                    color: "#1e40af",
                  }}
                >
                  {data.totalZMW.toFixed(2)} ZMW
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Prepared By Section */}
        <div
          style={{
            backgroundColor: "#f9fafb",
            padding: "24px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "16px",
            }}
          >
            Prepared By
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
            }}
          >
            {Object.entries(data.preparedBy).map(([key, value]) => (
              <div
                key={key}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#4b5563",
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                <span style={{ fontSize: "14px", color: "#1f2937" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Terms and Conditions Section */}
        <div
          style={{
            backgroundColor: "#f9fafb",
            padding: "24px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "16px",
            }}
          >
            Terms and Conditions
          </h2>
          <p
            style={{
              fontSize: "12px",
              color: "#1f2937",
              whiteSpace: "pre-line",
            }}
          >
            {data.termsAndConditions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuotationView;
