import React, { useState } from 'react';
import { MessageSquareIcon, MinimizeIcon, XIcon, SendIcon } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    conversations,
    currentConversation,
    messages,
    sendMessage,
    setCurrentConversation,
    markAsRead
  } = useChat();
  const {
    currentUser
  } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentConversation) return;
    // Find recipient ID from the current conversation
    const conversation = conversations.find(c => c.id === currentConversation);
    if (!conversation) return;
    const recipientId = conversation.participants.find(id => id !== currentUser?.id) || '';
    sendMessage(recipientId, newMessage);
    setNewMessage('');
  };
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  return <>
      {/* Chat Button */}
      {!isOpen && <button onClick={toggleChat} className="fixed bottom-6 right-6 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg focus:outline-none">
          <MessageSquareIcon className="h-6 w-6" />
        </button>}
      {/* Chat Window */}
      {isOpen && <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col z-50" style={{
      height: '500px'
    }}>
          {/* Chat Header */}
          <div className="px-4 py-3 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Messages</h3>
            <div className="flex space-x-2">
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-blue-700 rounded">
                <MinimizeIcon className="h-4 w-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-blue-700 rounded">
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          {/* Chat Content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {!currentConversation ? <div className="flex-1 overflow-y-auto p-4">
                <h4 className="text-gray-600 dark:text-gray-400 font-medium mb-3">
                  Recent Conversations
                </h4>
                {conversations.length === 0 ? <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No conversations yet
                  </p> : <div className="space-y-2">
                    {conversations.map(conversation => {
              // Find the other participant (not current user)
              const otherParticipantId = conversation.participants.find(id => id !== currentUser?.id);
              // This is simplified - in a real app you'd fetch user details from a database
              const otherParticipantName = otherParticipantId === 'user2' ? 'Jane Doe' : 'David Kim';
              const avatar = otherParticipantId === 'user2' ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
              return <button key={conversation.id} onClick={() => setCurrentConversation(conversation.id)} className="w-full flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                            <img src={avatar} alt={otherParticipantName} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {otherParticipantName}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              {conversation.lastMessage?.content}
                            </p>
                          </div>
                          {conversation.unreadCount > 0 && <div className="ml-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                              {conversation.unreadCount}
                            </div>}
                        </button>;
            })}
                  </div>}
              </div> : <>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="flex items-center mb-4">
                    <button onClick={() => setCurrentConversation(null)} className="mr-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      &larr;
                    </button>
                    <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Jane Doe" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Jane Doe
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">
                        Online
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {messages.map(message => <div key={message.id} className={`flex ${message.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] px-4 py-2 rounded-lg ${message.senderId === currentUser?.id ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'}`}>
                          <p className="text-sm">{message.content}</p>
                          <div className="text-xs mt-1 opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>
                <form onSubmit={handleSendMessage} className="border-t dark:border-gray-700 p-3 flex">
                  <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 bg-gray-100 dark:bg-gray-700 border-0 rounded-l-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white" />
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg">
                    <SendIcon className="h-5 w-5" />
                  </button>
                </form>
              </>}
          </div>
        </div>}
    </>;
};
export default ChatWidget;