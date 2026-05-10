import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DataTable = ({ 
  columns, 
  data, 
  itemsPerPage = 5,
  loading = false,
  emptyMessage = "No records found."
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-20 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Loading records...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className={`py-6 px-10 font-black text-gray-400 text-xs tracking-widest uppercase ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-20 text-gray-400 font-bold italic">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              currentData.map((item, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50/50 transition-colors group">
                  {columns.map((col, colIdx) => (
                    <td 
                      key={colIdx} 
                      className={`py-5 px-10 ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                    >
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="bg-gray-50/50 p-6 px-10 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            Showing <span className="text-gray-800">{startIndex + 1}</span> to <span className="text-gray-800">{Math.min(startIndex + itemsPerPage, data.length)}</span> of <span className="text-gray-800">{data.length}</span>
          </p>
          
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-green-500 hover:text-green-600 transition-all shadow-sm"
            >
              <FaChevronLeft size={12} />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-black text-sm transition-all shadow-sm ${
                  currentPage === i + 1 
                  ? "bg-green-600 text-white shadow-green-600/20" 
                  : "bg-white border border-gray-200 text-gray-600 hover:border-green-500"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-green-500 hover:text-green-600 transition-all shadow-sm"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
