import { useState } from 'react';
import { countOccurrences } from '@internal/count-occurrences';

const TextOccurrenceCounter = () => {
  const [text, setText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCount = () => {
    if (!text) {
      setError('請輸入文字');
      setResult(null);
      return;
    }

    if (!searchTerm) {
      setError('請輸入要搜尋的字詞');
      setResult(null);
      return;
    }

    setError('');
    const count = countOccurrences(text, searchTerm);
    setResult({
      count,
      searchTerm,
      text
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">文字出現次數計算器</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">文字內容</label>
        <textarea
          className="border rounded w-full p-2 h-40"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="請輸入要搜尋的文字內容..."
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">要搜尋的字詞</label>
        <input
          type="text"
          className="border rounded w-full p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="輸入要計算的字詞"
        />
      </div>
      
      {error && (
        <div className="mb-4 text-red-500">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <button
          onClick={handleCount}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          計算出現次數
        </button>
      </div>
      
      {result && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-2">計算結果</h3>
          <div className="bg-gray-100 p-4 rounded">
            <p className="mb-2">
              <span className="font-bold">搜尋字詞:</span> "{result.searchTerm}"
            </p>
            <p className="mb-2">
              <span className="font-bold">出現次數:</span> {result.count} 次
            </p>
            <div className="mt-4">
              <p className="font-bold mb-1">文字內容:</p>
              <div className="bg-white p-2 rounded border max-h-40 overflow-auto">
                {result.text.split(result.searchTerm).map((part, index, array) => {
                  // Don't render the searchTerm after the last part
                  if (index === array.length - 1) {
                    return <span key={index}>{part}</span>;
                  }
                  
                  return (
                    <span key={index}>
                      {part}
                      <span className="bg-yellow-200">{result.searchTerm}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextOccurrenceCounter;
