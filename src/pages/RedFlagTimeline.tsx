import React, { useState } from 'react';
import { Card, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Flag, TrendingDown, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimelineEvent {
  id: string;
  date: string;
  description: string;
  severity: number;
  impact: number;
}

export const RedFlagTimeline = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [newEvent, setNewEvent] = useState({
    date: '',
    description: '',
    severity: 1,
    impact: 1
  });

  const addEvent = () => {
    if (!newEvent.date || !newEvent.description) return;

    setEvents([
      ...events,
      {
        id: crypto.randomUUID(),
        ...newEvent
      }
    ]);

    setNewEvent({
      date: '',
      description: '',
      severity: 1,
      impact: 1
    });
  };

  const chartData = events.map(event => ({
    date: event.date,
    trustLevel: 100 - (event.severity * event.impact * 10)
  }));

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Red Flag Timeline</h1>
        <p className="text-gray-300 mb-8">
          Track concerning events and visualize how they affect trust over time.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardTitle>Add New Event</CardTitle>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 bg-black/30 border border-gray-700 rounded-lg"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    What happened?
                  </label>
                  <textarea
                    className="w-full p-2 bg-black/30 border border-gray-700 rounded-lg"
                    rows={3}
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Severity (1-5)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    className="w-full"
                    value={newEvent.severity}
                    onChange={(e) => setNewEvent({ ...newEvent, severity: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Impact on Trust (1-5)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    className="w-full"
                    value={newEvent.impact}
                    onChange={(e) => setNewEvent({ ...newEvent, impact: Number(e.target.value) })}
                  />
                </div>

                <Button onClick={addEvent} fullWidth>
                  Add to Timeline
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardTitle>Trust Decay Chart</CardTitle>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111',
                        border: '1px solid #333',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="trustLevel"
                      stroke="#e11d48"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card variant="glass">
          <CardTitle className="flex items-center gap-2">
            <Flag className="text-red-400" size={20} />
            Timeline Events
          </CardTitle>
          <CardContent>
            {events.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                No events added yet. Start tracking red flags above.
              </p>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 bg-black/30 rounded-lg border border-red-900/30"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-400">{event.date}</span>
                        </div>
                        <p className="text-white">{event.description}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flag size={16} className="text-red-400" />
                        <span className="text-sm text-red-400">
                          Level {event.severity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};