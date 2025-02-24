"use client";
import { axios, setBearerToken } from "@/app/lib/axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const QuotationForm = ({ meta, token, workspace_id }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  // Main data state
  const [data, setData] = useState({
    formTitle: "Quotation",
    formAddress: "company address here",
    formLogo: "/zamnet.jpg",
    attention: {
      name: "John Doe",
      business: "Business Example",
      address: "lusaka zambia",
      phone: "000",
      email: "john@dms.com",
    },
    date: "",
    reference: "",
    items: [
      { id: "", description: "", quantity: 0, unitPrice: 0, total: 0 },
    ],
    totalZMW: 0,
    subTotalZMW: 0,
    VAT: 0,
    preparedBy: {
      name: "",
      phone: "",
      email: "",
    },
    termsAndConditions: "",
  });

  const VAT_RATE = 0.16;

  // Add a new row to the items table
  const addRow = () => {
    setData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        { id: "", description: "", quantity: 0, unitPrice: 0, total: 0 },
      ],
    }));
  };

  // Handle changes in item fields
  const handleItemChange = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;

    // Recalculate total if quantity or unitPrice changes
    if (field === "quantity" || field === "unitPrice") {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    }

    setData((prevData) => ({
      ...prevData,
      items: newItems,
    }));
  };

  // Calculate subtotal, VAT, and total whenever items change
  useEffect(() => {
    const subTotalZMW = data.items.reduce((sum, item) => sum + item.total, 0);
    const VAT = subTotalZMW * VAT_RATE;
    const totalZMW = subTotalZMW + VAT;

    setData((prevData) => ({
      ...prevData,
      subTotalZMW,
      VAT,
      totalZMW,
    }));
  }, [data.items]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage("");

    const doc = {
      title: meta.title,
      tags: meta.tags.join(),
      type: 1,
      content: JSON.stringify(data),
      isForm: true,
      workspace_id: workspace_id,
    };

    try {
      setBearerToken(token);
      const response = await axios.post("documents", JSON.stringify(doc));
      const document = response.data.data;
      router.push(`/dashboard/documents/${document.id}`);
    } catch (error) {
      console.error("handleSubmit::error: ", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      className="p-6 w-[8.27in] mx-auto bg-white shadow-lg flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      {/* Hidden inputs for metadata */}
      <div>
        <input type="hidden" name="type" value={1} />
        <input type="hidden" name="tag" value={1} />
        <input type="hidden" name="tag" value={2} />
        <input type="hidden" name="tag" value={3} />
        <input type="hidden" name="title" value={meta.title} />
      </div>

      {/* Form Title */}
      <div>
        <h2 className="text-2xl font-bold p-4 mb-6 bg-blue-800 text-neutral-50">
          {data.formTitle}
        </h2>
      </div>

      {/* Attention Section */}
      <fieldset>
        <legend className="text-lg font-semibold">Attention</legend>
        <div className="flex flex-col gap-4">
          {Object.entries(data.attention).map(([key, value]) => (
            <input
              key={key}
              className="border px-4 py-2"
              type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={value}
              onChange={(e) =>
                setData({
                  ...data,
                  attention: { ...data.attention, [key]: e.target.value },
                })
              }
            />
          ))}
        </div>
      </fieldset>

      {/* Date and Reference Section */}
      <div className="flex flex-col gap-4">
        <input
          type="date"
          name="date"
          className="px-4 py-2 border"
          value={data.date}
          onChange={(e) => setData({ ...data, date: e.target.value })}
        />
        <input
          type="text"
          name="reference"
          placeholder="Reference"
          className="px-4 py-2 border"
          value={data.reference}
          onChange={(e) => setData({ ...data, reference: e.target.value })}
        />
      </div>

      {/* Items Section */}
      <fieldset className="mb-6">
        <legend className="text-xl font-semibold mb-4 text-gray-700">Items</legend>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="w-1/12 border border-gray-300">Item</th>
                <th className="w-5/12 border border-gray-300">Description</th>
                <th className="w-1/12 border border-gray-300">Qty</th>
                <th className="w-2/12 border border-gray-300">Unit Price</th>
                <th className="w-3/12 border border-gray-300">Total ZMW</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="p-0 border border-gray-300">
                    <input
                      type="number"
                      placeholder="Item ID"
                      name={`id-${index}`}
                      className="w-full p-2 rounded border-none"
                      value={item.id}
                      onChange={(e) =>
                        handleItemChange(index, "id", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-0 border border-gray-300">
                    <input
                      type="text"
                      placeholder="Description"
                      name={`description-${index}`}
                      className="w-full p-2 rounded border-none"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-0 border border-gray-300">
                    <input
                      type="number"
                      placeholder="Quantity"
                      name={`quantity-${index}`}
                      className="w-full p-2 rounded border-none"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", parseFloat(e.target.value))
                      }
                    />
                  </td>
                  <td className="p-0 border border-gray-300">
                    <input
                      type="number"
                      placeholder="Unit Price"
                      name={`unitPrice-${index}`}
                      className="w-full p-2 rounded border-none"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleItemChange(index, "unitPrice", parseFloat(e.target.value))
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    {item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"></td>
                <td className="border border-gray-300 p-2 font-semibold text-gray-700">
                  SubTotal:
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {data.subTotalZMW.toFixed(2)} ZMW
                </td>
              </tr>
              <tr>
                <td colSpan="3"></td>
                <td className="border border-gray-300 p-2 font-semibold text-gray-700">
                  VAT (16%):
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {data.VAT.toFixed(2)} ZMW
                </td>
              </tr>
              <tr className="bg-gray-200 font-bold">
                <td colSpan="3"></td>
                <td className="p-2 text-gray-700">Total:</td>
                <td className="p-2 text-right text-blue-600">
                  {data.totalZMW.toFixed(2)} ZMW
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Add Item Button */}
        <button
          type="button"
          onClick={addRow}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Item
        </button>
      </fieldset>

      {/* Prepared By Section */}
      <fieldset>
        <legend className="text-lg font-semibold">Prepared By</legend>
        <div className="flex flex-col gap-4">
          {Object.entries(data.preparedBy).map(([key, value]) => (
            <input
              key={key}
              className="border px-4 py-2"
              type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={value}
              onChange={(e) =>
                setData({
                  ...data,
                  preparedBy: { ...data.preparedBy, [key]: e.target.value },
                })
              }
            />
          ))}
        </div>
      </fieldset>

      {/* Terms and Conditions Section */}
      <fieldset>
        <legend className="text-lg font-semibold">Terms and Conditions</legend>
        <textarea
          className="w-full p-2 border rounded-lg"
          rows="4"
          placeholder="Enter terms and conditions..."
          value={data.termsAndConditions}
          onChange={(e) =>
            setData({ ...data, termsAndConditions: e.target.value })
          }
        />
      </fieldset>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-300"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex h-8 items-end space-x-1" aria-live="polite">
          <span className="h-5 w-5 text-red-500">!</span>
          <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
      )}
    </form>
  );
};

export default QuotationForm;