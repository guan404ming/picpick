import React from 'react';
import './chatDesign.css'; // Make sure the path is correct
import { randomFill } from 'crypto';

export default function ChatPage() {
  const username = "Annie"; // This will be the placeholder for the dynamic username
  const date = "Today, 12/01";
  const question = "QuestionQuestionQuestionQuestionQuestionQuestionQuestion";

  return (
    <div className="chat-page">
        <div className="chat-header">
          <span className="chatbot-icon">ICON</span>
          <span className="chatbot-name">品牌或機器人名字</span>
        </div>
      <div className="chat-box">
        <div className="date">
          <span className="chat-date">{date}</span>
        </div>

        <div className="chat-message bot-message">
          <div className="constant-message">
            "Hello, {username}. I'm Abby. Nice to meet you. Are you ready to get started?
          </div>
          <div className="chat-options">
            <button className="chat-option-button">Yes</button>
          </div>
        </div>

        <div className="chat-message user-message">
          <span className="message-content">Yes</span>
        </div>

        <div className="chat-message bot-message">
          <div className="constant-message">
            Here's the first question: 
          </div>
          <div className="random-question">
            {question}
          </div>
          <div className="chat-options">
              <button className="chat-option-button">option1</button>
              <button className="chat-option-button">option2</button>
              <button className="chat-option-button">option3</button>
          </div>
        </div>

        <div className="chat-message user-message">
          <span className="message-content">Option1</span>
        </div>

        <div className="chat-message bot-message">
          <div className="constant-message">
            Here's the first question: 
          </div>
          <div className="random-question">
            {question}
          </div>
          <div className="chat-options">
              <button className="chat-option-button">option1</button>
              <button className="chat-option-button">option2</button>
              <button className="chat-option-button">option3</button>
          </div>
        </div>

        <div className="chat-message user-message">
          <span className="message-content">Option2</span>
        </div>

        <div className="chat-message bot-message">
          <div className="constant-message">
            Here's the first question: 
          </div>
          <div className="random-question">
            {question}
          </div>
          <div className="chat-options">
              <button className="chat-option-button">option1</button>
              <button className="chat-option-button">option2</button>
              <button className="chat-option-button">option3</button>
          </div>
        </div>

        <div className="chat-message user-message">
          <span className="message-content">Option1</span>
        </div>

        {/* /* At the end of the chat */}
        <div className="chat-message bot-message">
          <div className="constant-message">
            Dear {username},
          </div>
          <div className="constant-message">
            here's the picture book of the day: {/* Put your dynamic book name here */}
          </div>
          <div className="chat-book-display">
            {/* Placeholder for book image */}
            <div className="chat-book-image"></div>
          </div>
          <div className="constant-message">
            Title:{/* Title of the book */}
          </div>
          <div className="chat-options-for-recommendation">
            <button className="chat-option-button">Read</button>
            <button className="chat-option-button">More</button>
          </div>
        </div>
      </div>
    </div>
  );
}
