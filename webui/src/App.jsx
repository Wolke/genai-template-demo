import { useState } from 'react'
import './App.css'
import InvoiceCalculator from './components/InvoiceCalculator'
import TextOccurrenceCounter from './components/TextOccurrenceCounter'

function App() {
  const [activeTab, setActiveTab] = useState('invoice')

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">内部功能 Web 介面</h1>
        
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button 
              className={`py-2 px-4 ${activeTab === 'invoice' ? 'bg-white border-t border-l border-r rounded-t-lg text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('invoice')}
            >
              發票計算器
            </button>
            <button 
              className={`py-2 px-4 ml-2 ${activeTab === 'counter' ? 'bg-white border-t border-l border-r rounded-t-lg text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('counter')}
            >
              文字出現次數計算器
            </button>
          </div>
        </div>
        
        {activeTab === 'invoice' && <InvoiceCalculator />}
        {activeTab === 'counter' && <TextOccurrenceCounter />}
      </div>
    </div>
  )
}

export default App
