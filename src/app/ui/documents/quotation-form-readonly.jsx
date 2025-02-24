"use client";
import React from "react";

const QuotationFormReadonly = ({ meta, data }) => {
  return (
    <form className="p-6 w-[8.27in] mx-auto bg-white shadow-lg flex flex-col gap-4">
      <div>
        <input type="hidden" name="type" value={1} />
        <input type="hidden" name="tag" value={1} />
        <input type="hidden" name="tag" value={2} />
        <input type="hidden" name="tag" value={3} />
        <input type="hidden" name="title" value={meta.title} />
      </div>
      <div>
        <h2 className="text-2xl font-bold p-4 mb-6 bg-blue-800 text-neutral-50">
          {data.formTitle}
        </h2>
      </div>

      {/* Attention Section */}
      <fieldset>
        <legend className="text-lg font-semibold">Attention</legend>
        <div className="flex flex-col gap-4">
          <input
            className="border px-4 py-2"
            type="text"
            name="attentionName"
            placeholder="Name"
            value={data.attention.name}
            readOnly
          />
          <input
            className="border px-4 py-2"
            type="text"
            name="business"
            placeholder="Business"
            value={data.attention.business}
            readOnly
          />

          <input
            className="border px-4 py-2"
            type="text"
            name="address"
            placeholder="Address"
            value={data.attention.address}
            readOnly
          />

          <input
            className="border px-4 py-2"
            type="number"
            name="phone"
            placeholder="Phone"
            value={data.attention.phone}
            readOnly
          />

          <input
            className="border px-4 py-2"
            type="text"
            name="email"
            placeholder="Email"
            value={data.attention.email}
            readOnly
          />
        </div>
      </fieldset>

      {/* Date and Reference Section */}
      <div className="flex flex-col gap-4">
        <input
          type="date"
          name="date"
          className="px-4 py-2 border"
          value={data.date}
          readOnly
        />
        <input
          type="text"
          name="reference"
          placeholder="Reference"
          className="px-4 py-2 border"
          value={data.reference}
          readOnly
        />
      </div>

      {/* Items Section */}
      <fieldset className="mb-6">
        <legend className="text-xl font-semibold mb-4 text-gray-700">Items</legend>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="w-1/12 border border-gray-300">item</th>
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
                      readOnly
                    />
                  </td>
                  <td className="p-0 border border-gray-300">
                    <input
                      type="text"
                      placeholder="Description"
                      name={`description-${index}`}
                      className="w-full p-2 rounded border-none"
                      value={item.description}
                      readOnly
                    />
                  </td>
                  <td className="p-0 border border-gray-300">
                    <input
                      type="number"
                      placeholder="Quantity"
                      name={`quantity-${index}`}
                      className="w-full p-2 rounded border-none"
                      value={item.quantity}
                      readOnly
                    />
                  </td>
                  <td className="p-0 border border-gray-300">
                    <input
                      type="number"
                      placeholder="Unit Price"
                      name={`unitPrice-${index}`}
                      className="w-full p-2 rounded border-none"
                      value={item.unitPrice}
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300">{item.total.toFixed(2)}</td>
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
                  {data.subtotal.toFixed(2)} ZMW
                </td>
              </tr>
              <tr>
                <td colSpan="3"></td>
                <td className="border border-gray-300 p-2 font-semibold text-gray-700">
                  VAT (16%):
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {data.vat.toFixed(2)} ZMW
                </td>
              </tr>
              <tr className="bg-gray-200 font-bold">
                <td colSpan="3"></td>
                <td className="p-2 text-gray-700">Total:</td>
                <td className="p-2 text-right text-blue-600">
                  {data.total.toFixed(2)} ZMW
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </fieldset>

      {/* Prepared By Section */}
      <fieldset>
        <legend className="text-lg font-semibold">Prepared By</legend>
        <div className="flex flex-col gap-4">
          <input
            className="border px-4 py-2"
            type="text"
            name="preparedByName"
            placeholder="Name"
            value={data.preparedBy.name}
            readOnly
          />
          <input
            className="border px-4 py-2"
            type="number"
            name="preparedByPhone"
            placeholder="Phone"
            value={data.preparedBy.phone}
            readOnly
          />
          <input
            className="border px-4 py-2"
            type="email"
            name="preparedByEmail"
            placeholder="Email"
            value={data.preparedBy.email}
            readOnly
          />
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
          readOnly
        />
      </fieldset>
    </form>
  );
};

export default QuotationFormReadonly;
