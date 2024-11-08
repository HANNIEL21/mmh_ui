import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { CHEMISTRY, culture, HAEMATOLOGY } from '../../../utils/constant';

const Investigation = () => {
  const contentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef,
    pageStyle: `
        @page {
            margin : 1rem
        }
        `,
    documentTitle: 'Lab Request Form',
    onAfterPrint: () => alert('Document printed successfully!'),
  });

  return (
    <div>
      {/* Reference the component directly in the div below */}
      <div ref={contentRef}>
        <div className='flex flex-col gap-6'>
          <h1 className='text-5xl text-center text-appColor font-extrabold'>MERCY MEMORIAL HOSPITAL</h1>
          <p className='font-bold text-xl text-center'>LAB REQUEST FORM</p>
          <div>
            <form className='grid grid-cols-3 gap-4'>
              <div className="w-full">
                <label>
                  <p className='font-bold capitalize text-appColor'>Full Name</p>
                  <input type="text" className='border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md' />
                </label>
              </div>
              <div className="w-full">
                <label>
                  <p className='font-bold capitalize text-appColor'>Reference Number</p>
                  <input type="text" className='border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md' />
                </label>
              </div>
              <div className="w-full">
                <label>
                  <p className='font-bold capitalize text-appColor'>Phone Number</p>
                  <input type="tel" className='border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md' />
                </label>
              </div>
              <div className="w-full">
                <label>
                  <p className='font-bold capitalize text-appColor'>Gender</p>
                  <input type="text" className='border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md' />
                </label>
              </div>
              <div className="w-full">
                <label>
                  <p className='font-bold capitalize text-appColor'>Age</p>
                  <input type="text" className='border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md' />
                </label>
              </div>
              <div className="w-full">
                <label>
                  <p className='font-bold capitalize text-appColor'>Date</p>
                  <input type="date" className='border-2 p-2 block w-full sm:text-sm border-slate-300 rounded-md' />
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* Tables Section */}
        <div className='grid grid-cols-2 gap-8 mt-6'>
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-appColor text-center">HAEMATOLOGY</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="border-b" style={{ backgroundColor: 'var(--appColor)' }}>
                    <th className="px-4 py-2 text-left text-black">Test</th>
                    <th className="px-4 py-2 text-left">Value</th>
                    <th className="px-4 py-2 text-left">Range</th>
                  </tr>
                </thead>
                <tbody>
                  {HAEMATOLOGY.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="px-4 py-2 uppercase">{item.test}</td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          className="border rounded p-1 w-full focus:outline-none focus:border-appColor"
                          placeholder="Enter value"
                        />
                      </td>
                      <td className="px-4 py-2">{item.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-appColor text-center">CHEMISTRY</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="border-b" style={{ backgroundColor: 'var(--appColor)' }}>
                    <th className="px-4 py-2 text-left">Test</th>
                    <th className="px-4 py-2 text-left">Value</th>
                    <th className="px-4 py-2 text-left">Range</th>
                  </tr>
                </thead>
                <tbody>
                  {CHEMISTRY.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="px-4 py-2 uppercase">{item.test}</td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          className="border rounded p-1 w-full focus:outline-none focus:border-appColor"
                          placeholder="Enter value"
                        />
                      </td>
                      <td className="px-4 py-2">{item.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side: Culture & Sensitivity Table */}
            <div>
              <h2 className="text-2xl font-bold text-appColor mb-4">CULTURE & SENSITIVITY</h2>
              <div>
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Antibiotic</th>
                      <th className="px-4 py-2 text-left">Sensitivity (S)</th>
                      <th className="px-4 py-2 text-left">Resistance (R)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {culture.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            className="border rounded p-1 w-full"
                            placeholder="Enter sensitivity (S)"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            className="border rounded p-1 w-full"
                            placeholder="Enter resistance (R)"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right side: Textarea */}
            <div className="flex flex-col">
              <label htmlFor="notes" className="text-xl font-semibold mb-2">Notes/Comments</label>
              <textarea
                id="notes"
                rows="10"
                className="border rounded p-2 w-full h-full resize-none"
                placeholder="Enter additional notes or comments here..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          console.log("Button clicked");
          handlePrint();
        }}
        className="my-4 p-2 px-8 bg-appColor rounded-md text-white font-bold"
      >
        PRINT TO PDF
      </button>
    </div>
  );
};

export default Investigation;
