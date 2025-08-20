'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { getCurrentUser } from '@/lib/auth/auth';
import { Message } from '@/types';
import { formatDateTime } from '@/lib/utils';

// Mock data for demonstration
const mockMessages: Message[] = [
  {
    id: '1',
    sender_id: '1',
    recipient_id: '2',
    subject: 'Max Training Progress Update',
    content: 'Hi Sarah, I wanted to update you on Max\'s progress. He\'s doing really well with his recall training and has shown great improvement in the last few sessions. He\'s responding well to the positive reinforcement techniques we\'ve been using.',
    is_announcement: false,
    created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    updated_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    sender_id: '2',
    recipient_id: '1',
    subject: 'Luna Behavioral Session Request',
    content: 'Hi Mike, I\'ve noticed Luna has been showing some anxiety around other dogs during our walks. I think a behavioral session would be really helpful. When would be a good time to schedule this?',
    is_announcement: false,
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    sender_id: '3',
    recipient_id: '1',
    subject: 'Buddy Daycare Schedule',
    content: 'Hi Lisa, I wanted to confirm Buddy\'s daycare schedule for next week. He\'ll be coming in on Monday, Wednesday, and Friday. Please let me know if you need any special arrangements for his hip dysplasia.',
    is_announcement: false,
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updated_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '4',
    sender_id: '1',
    recipient_id: undefined,
    subject: 'Holiday Schedule Update',
    content: 'Hi everyone, just a reminder that we\'ll be closed for the holidays from December 24th to January 2nd. All sessions will resume on January 3rd. Happy holidays!',
    is_announcement: true,
    target_roles: ['parent', 'trainer'],
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    updated_at: new Date(Date.now() - 259200000).toISOString(),
  },
];

const mockUsers = [
  { id: '1', name: 'Sarah Johnson', role: 'parent' },
  { id: '2', name: 'Mike Smith', role: 'parent' },
  { id: '3', name: 'Lisa Brown', role: 'parent' },
  { id: '4', name: 'John Trainer', role: 'trainer' },
  { id: '5', name: 'Admin User', role: 'admin' },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        
        // Filter messages based on user role
        if (currentUser?.role === 'parent') {
          // Parents see messages they sent or received
          setMessages(mockMessages.filter(msg => 
            msg.sender_id === currentUser.id || 
            msg.recipient_id === currentUser.id ||
            msg.is_announcement
          ));
        } else if (currentUser?.role === 'trainer') {
          // Trainers see messages they sent or received
          setMessages(mockMessages.filter(msg => 
            msg.sender_id === currentUser.id || 
            msg.recipient_id === currentUser.id ||
            msg.is_announcement
          ));
        } else {
          // Admins see all messages
          setMessages(mockMessages);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadMessages = messages.filter(message => !message.read_at);
  const recentMessages = messages.slice(0, 5);

  const getSenderName = (senderId: string) => {
    const sender = mockUsers.find(u => u.id === senderId);
    return sender?.name || 'Unknown User';
  };

  const getReceiverName = (receiverId?: string) => {
    if (!receiverId) return 'All Users';
    const receiver = mockUsers.find(u => u.id === receiverId);
    return receiver?.name || 'Unknown User';
  };

  const getMessageTypeColor = (isAnnouncement: boolean) => {
    if (isAnnouncement) {
      return 'bg-purple-100 text-purple-800';
    }
    return 'bg-blue-100 text-blue-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">
            Communicate with trainers, parents, and administrators
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <PlusIcon className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <ChatBubbleLeftRightIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
            <p className="text-xs text-muted-foreground">
              All messages
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadMessages.length}</div>
            <p className="text-xs text-muted-foreground">
              Messages to read
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent</CardTitle>
            <UserGroupIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentMessages.length}</div>
            <p className="text-xs text-muted-foreground">
              Last 5 messages
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card 
            key={message.id} 
            className={`hover:shadow-md transition-shadow cursor-pointer ${
              !message.read_at ? 'border-blue-200 bg-blue-50' : ''
            }`}
            onClick={() => setSelectedMessage(message)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {!message.read_at && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                    <h3 className="font-semibold text-lg">{message.subject}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMessageTypeColor(message.is_announcement)}`}>
                      {message.is_announcement ? 'Announcement' : 'Message'}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">From:</span> {getSenderName(message.sender_id)}
                      {!message.is_announcement && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="font-medium">To:</span> {getReceiverName(message.recipient_id)}
                        </>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDateTime(message.created_at)}
                    </p>
                  </div>

                  <p className="text-gray-700 line-clamp-2">
                    {message.content}
                  </p>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button size="sm">
                    View
                  </Button>
                  {!message.read_at && (
                    <Button size="sm" variant="outline">
                      Mark Read
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms.' : 'Start a conversation by sending your first message.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{selectedMessage.subject}</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedMessage(null)}
                >
                  Close
                </Button>
              </div>
              <CardDescription>
                From {getSenderName(selectedMessage.sender_id)} to {getReceiverName(selectedMessage.recipient_id)} • {formatDateTime(selectedMessage.created_at)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMessageTypeColor(selectedMessage.is_announcement)}`}>
                  {selectedMessage.is_announcement ? 'Announcement' : 'Message'}
                </span>
              </div>
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
              </div>
              <div className="flex space-x-2 mt-6">
                <Button>Reply</Button>
                <Button variant="outline">Forward</Button>
                {!selectedMessage.read_at && (
                  <Button variant="outline">Mark as Read</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
