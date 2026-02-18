// src/components/Chatbot.jsx
import React, { useState } from 'react';
import axios from 'axios';

// A few simple FAQs to start with
const faqs = [
  { q: "How do I book an appointment?", a: "You can book an appointment by navigating to the 'All Doctors' page, selecting a doctor, and choosing an available time slot." },
  { q: "Can I reschedule my appointment?", a: "Yes, you can reschedule from your user dashboard under the 'My Appointments' section." },
  { q: "Is my personal information secure?", a: "Absolutely. We use industry-standard encryption to protect all your data." },
  // New FAQ
  { q: "What payment methods are accepted?", a: "We accept all major credit cards, debit cards, and UPI for secure online payments." },
  // New FAQ
  { q: "Are the doctors verified?", a: "Yes, every doctor on HealthMate goes through a rigorous verification process to ensure they are licensed and qualified." },
  // New FAQ
  { q: "How do I receive a prescription?", a: "If the doctor provides a prescription, it will be digitally sent to your account and can be downloaded from your dashboard." },
  // New FAQ
  { q: "What is the cancellation policy?", a: "You can cancel up to 24 hours in advance for a full refund. Cancellations made within 24 hours of the appointment may be subject to a fee." }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! How can I help you today? Check out our FAQs or ask me a question.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSendMessage = async (userMessage) => {
    // Add user message to chat
    setMessages(prev => [...prev, { from: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Send message to backend
      const { data } = await axios.post(`${backendUrl}/api/chatbot/ask`, {
        question: userMessage
      });
      // Add bot response to chat
      setMessages(prev => [...prev, { from: 'bot', text: data.answer }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages(prev => [...prev, { from: 'bot', text: 'Sorry, I am having trouble connecting. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFaqClick = (faq) => {
    setMessages(prev => [
      ...prev,
      { from: 'user', text: faq.q },
      { from: 'bot', text: faq.a }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInput = e.target.elements.message.value.trim();
    if (userInput) {
      handleSendMessage(userInput);
      e.target.reset();
    }
  };

  return (
    <div>
      {/* Floating Button */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
          Chat
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-lg">HealthMate Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="font-bold text-xl">&times;</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`my-2 p-3 rounded-lg max-w-[80%] ${msg.from === 'bot' ? 'bg-gray-200 text-black self-start' : 'bg-blue-500 text-white self-end ml-auto'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && <div className="p-3 rounded-lg bg-gray-200">...</div>}
          </div>
          
          {/* FAQs */}
          <div className="p-2 border-t">
              <p className="text-sm text-gray-500 mb-2">Or try our FAQs:</p>
              <div className="flex flex-wrap gap-2">
                {faqs.map((faq, index) => (
                    <button key={index} onClick={() => handleFaqClick(faq)} className="text-xs bg-blue-100 text-blue-800 p-2 rounded-lg hover:bg-blue-200">
                        {faq.q}
                    </button>
                ))}
              </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t flex">
            <input name="message" type="text" placeholder="Ask a question..." className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;