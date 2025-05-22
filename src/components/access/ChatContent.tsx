
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare } from 'lucide-react';

const ChatContent: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          Chat Support Portal
        </CardTitle>
        <CardDescription>
          Handle live chat support for riders and drivers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1 border rounded-md h-[400px] overflow-y-auto">
            <div className="p-3 font-medium border-b">
              Active Chats (5)
            </div>
            <div className="divide-y">
              <div className="p-3 bg-brand-primary/10 cursor-pointer">
                <div className="font-medium">Arun Mehta</div>
                <div className="text-sm text-gray-500 truncate">Need help with my booking...</div>
              </div>
              <div className="p-3 hover:bg-gray-50 cursor-pointer">
                <div className="font-medium">Seema Verma</div>
                <div className="text-sm text-gray-500 truncate">Driver didn't arrive at pickup...</div>
              </div>
              <div className="p-3 hover:bg-gray-50 cursor-pointer">
                <div className="font-medium">Rahul Kumar</div>
                <div className="text-sm text-gray-500 truncate">Payment issue with last ride...</div>
              </div>
              <div className="p-3 hover:bg-gray-50 cursor-pointer">
                <div className="font-medium">Priya Sharma</div>
                <div className="text-sm text-gray-500 truncate">How do I update my profile?</div>
              </div>
              <div className="p-3 hover:bg-gray-50 cursor-pointer">
                <div className="font-medium">Manoj Singh</div>
                <div className="text-sm text-gray-500 truncate">Need to report an item left in car...</div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3 border rounded-md h-[400px] flex flex-col">
            <div className="p-3 border-b bg-gray-50">
              <div className="font-medium">Arun Mehta</div>
              <div className="text-sm text-gray-500">Mumbai • Rider since Jan 2023</div>
            </div>
            
            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                  <p>Hi, I need help with my booking. The driver canceled but I was still charged.</p>
                  <div className="text-xs text-gray-500 mt-1 text-right">10:32 AM</div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-brand-primary text-white p-3 rounded-lg max-w-[80%]">
                  <p>Hello Arun, I'm sorry to hear about that. Let me check your recent bookings.</p>
                  <div className="text-xs text-brand-light mt-1 text-right">10:33 AM</div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-brand-primary text-white p-3 rounded-lg max-w-[80%]">
                  <p>I can see your booking #RB45678 was canceled by the driver at 9:45 AM. You're right, there was an erroneous charge of ₹150.</p>
                  <div className="text-xs text-brand-light mt-1 text-right">10:35 AM</div>
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                  <p>Yes, that's the one. Can you refund it please?</p>
                  <div className="text-xs text-gray-500 mt-1 text-right">10:36 AM</div>
                </div>
              </div>
            </div>
            
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button>Send</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatContent;
