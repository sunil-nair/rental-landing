'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import DashboardCard from '@/components/ui/Card';
import SearchBar from '@/components/ui/SearchBar';
import FormattedResponse from '@/components/ui/FormattedResponse';

export default function DashboardPage() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: any }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (question: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: question }]);
    setLoading(true);

    try {
      const res = await fetch('https://n8n-nova-u37847.vm.elestio.app/webhook/59c6eaad-854c-46cd-b84c-170eb561ce11', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const result = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: result }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: { error: 'Failed to fetch response' } }]);
    } finally {
      setLoading(false);
      setQuery('');
    }
  };

  return (
    <Tabs defaultValue="dashboard" className="w-full p-6">
      <TabsList className="mb-4">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="assistant">Ask Assistant</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard title="Expenses (Last 10)">
          <ul className="text-sm text-gray-700 space-y-1">
            <li>🛠 Plumbing — $120</li>
            <li>🔧 Repairs — $150</li>
            <li>🧹 Cleaning — $90</li>
          </ul>
        </DashboardCard>
        <DashboardCard title="Rent Collection">
          <p className="text-sm">Total Collected: $4,500</p>
          <p className="text-sm text-gray-500">2 vacant units • Agent: Maya</p>
        </DashboardCard>
        <DashboardCard title="Late Payments">
          <ul className="text-sm">
            <li>John Doe • 555-1234 <button className="text-blue-600 underline ml-2 text-xs">Send Email</button></li>
            <li>Jane Smith • 555-9876 <button className="text-blue-600 underline ml-2 text-xs">Send Email</button></li>
          </ul>
        </DashboardCard>
      </TabsContent>

      <TabsContent value="assistant">
        <div className="max-w-3xl mx-auto space-y-6">
          <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} loading={loading} />
          <div className="bg-white border rounded-lg p-4 shadow-sm max-h-[400px] overflow-y-auto space-y-4 text-sm">
            {messages.map((msg, idx) => (
              <div key={idx}>
                <p className="font-semibold mb-1">{msg.role === 'user' ? 'You' : 'Assistant'}:</p>
                {msg.role === 'assistant' ? (
                  <FormattedResponse data={msg.content} />
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            ))}
            {loading && <p className="text-gray-500 italic">Assistant is thinking...</p>}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
