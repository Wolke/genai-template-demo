import { useState } from 'react';
import { calcInvoice } from '@internal/billing';

const InvoiceCalculator = () => {
  const [invoiceData, setInvoiceData] = useState({
    id: '',
    date: new Date().toISOString().split('T')[0],
    currency: 'TWD',
    lines: [{ description: '', quantity: 1, unitPrice: 0 }]
  });
  const [taxRate, setTaxRate] = useState(0.05);
  const [result, setResult] = useState(null);

  const handleAddLine = () => {
    setInvoiceData({
      ...invoiceData,
      lines: [...invoiceData.lines, { description: '', quantity: 1, unitPrice: 0 }]
    });
  };

  const handleRemoveLine = (index) => {
    const newLines = [...invoiceData.lines];
    newLines.splice(index, 1);
    setInvoiceData({
      ...invoiceData,
      lines: newLines
    });
  };

  const handleLineChange = (index, field, value) => {
    const newLines = [...invoiceData.lines];
    
    // Convert to number if field is quantity or unitPrice
    if (field === 'quantity' || field === 'unitPrice') {
      value = parseFloat(value) || 0;
    }
    
    newLines[index][field] = value;
    setInvoiceData({
      ...invoiceData,
      lines: newLines
    });
  };

  const handleFieldChange = (field, value) => {
    setInvoiceData({
      ...invoiceData,
      [field]: value
    });
  };

  const calculateInvoice = () => {
    const invoice = {
      id: invoiceData.id,
      date: invoiceData.date,
      currency: invoiceData.currency,
      lines: invoiceData.lines.map(line => ({
        description: line.description,
        quantity: parseFloat(line.quantity),
        unitPrice: parseFloat(line.unitPrice)
      }))
    };

    const result = calcInvoice(invoice, { taxRate: parseFloat(taxRate) });
    setResult(result);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">發票計算器</h2>
      
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">發票編號</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            value={invoiceData.id}
            onChange={(e) => handleFieldChange('id', e.target.value)}
            placeholder="INV-001"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
          <input
            type="date"
            className="border rounded w-full p-2"
            value={invoiceData.date}
            onChange={(e) => handleFieldChange('date', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">貨幣</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            value={invoiceData.currency}
            onChange={(e) => handleFieldChange('currency', e.target.value)}
            placeholder="TWD"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">稅率 (%)</label>
          <input
            type="number"
            className="border rounded w-full p-2"
            value={taxRate * 100}
            onChange={(e) => setTaxRate(parseFloat(e.target.value) / 100 || 0)}
            min="0"
            step="0.1"
          />
        </div>
      </div>

      <h3 className="text-lg font-medium mb-2">項目明細</h3>
      
      <div className="mb-4">
        <div className="grid grid-cols-12 gap-2 font-medium mb-2">
          <div className="col-span-6">描述</div>
          <div className="col-span-2">數量</div>
          <div className="col-span-3">單價</div>
          <div className="col-span-1"></div>
        </div>
        
        {invoiceData.lines.map((line, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 mb-2">
            <div className="col-span-6">
              <input
                type="text"
                className="border rounded w-full p-2"
                value={line.description}
                onChange={(e) => handleLineChange(index, 'description', e.target.value)}
                placeholder="項目描述"
              />
            </div>
            
            <div className="col-span-2">
              <input
                type="number"
                className="border rounded w-full p-2"
                value={line.quantity}
                onChange={(e) => handleLineChange(index, 'quantity', e.target.value)}
                min="1"
              />
            </div>
            
            <div className="col-span-3">
              <input
                type="number"
                className="border rounded w-full p-2"
                value={line.unitPrice}
                onChange={(e) => handleLineChange(index, 'unitPrice', e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="col-span-1">
              {invoiceData.lines.length > 1 && (
                <button
                  onClick={() => handleRemoveLine(index)}
                  className="bg-red-500 text-white p-2 rounded w-full"
                >
                  X
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <button
          onClick={handleAddLine}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          新增項目
        </button>
        
        <button
          onClick={calculateInvoice}
          className="bg-green-500 text-white p-2 rounded"
        >
          計算發票
        </button>
      </div>

      {result && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-2">計算結果</h3>
          
          <table className="w-full mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">描述</th>
                <th className="text-right p-2">數量</th>
                <th className="text-right p-2">單價</th>
                <th className="text-right p-2">小計</th>
                <th className="text-right p-2">稅金</th>
                <th className="text-right p-2">總計</th>
              </tr>
            </thead>
            <tbody>
              {result.lines.map((line, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{line.description}</td>
                  <td className="text-right p-2">{line.quantity}</td>
                  <td className="text-right p-2">{line.unitPrice.toFixed(2)}</td>
                  <td className="text-right p-2">{line.lineSubtotal.toFixed(2)}</td>
                  <td className="text-right p-2">{line.lineTax.toFixed(2)}</td>
                  <td className="text-right p-2">{line.lineTotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-1">
                <span>小計:</span>
                <span>{result.subtotal.toFixed(2)} {invoiceData.currency}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>稅金:</span>
                <span>{result.tax.toFixed(2)} {invoiceData.currency}</span>
              </div>
              <div className="flex justify-between py-1 font-bold">
                <span>總金額:</span>
                <span>{result.grandTotal.toFixed(2)} {invoiceData.currency}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceCalculator;
